package com.example.student.service;



import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import com.example.student.config.Constraints;
import com.example.student.dto.UserDataDTO;
import com.example.student.dto.StudentInfo;
import com.example.student.exception.CustomException;
import com.example.student.model.UserRole;
import com.example.student.model.Users;
import com.example.student.model.Student;
import com.example.student.repository.UserRepository;
import com.example.student.repository.StudentRepository;
import com.example.student.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate;

    /**
     * sign in with email and password and return a jwt token
     * @param email
     * @param password
     * @return
     */
    public String signin(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            Users appUser = userRepository.findByEmail(email);
            return jwtTokenProvider.createToken(email, appUser);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new CustomException("Invalid email/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * sign up with username, password
     * @param appUser
     * @return
     */
    public String signup(Users appUser) {
        if (!userRepository.existsByEmail(appUser.getEmail())) {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            Users users = userRepository.save(appUser);
            return jwtTokenProvider.createToken(appUser.getEmail(), appUser);
        } else {
            throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * sign up with username password and student information
     * @param dataDTO
     * @return
     */
    @Transactional
    public String signupWithStudent(UserDataDTO dataDTO) {
        Users appUser =  modelMapper.map(dataDTO, Users.class);

        if (!userRepository.existsByEmail(appUser.getEmail())) {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
            appUser.setAppUserRoles(new ArrayList<>(Arrays.asList(UserRole.STUDENT)));
            Users users = userRepository.save(appUser);

            Student student = new Student();
            student.setAddress(dataDTO.getAddress());
            student.setName(dataDTO.getName());
            student.setIsActive(true);
            student.setFathersName(dataDTO.getFathersName());
            student.setMothersName(dataDTO.getMothersName());
            student.setDescription(dataDTO.getDescription());
            student.setUsers(users);
            Student student1 = studentRepository.save(student);

            StudentInfo studentInfo = new StudentInfo();
            studentInfo.setStudentId(student1.getId());

            //when you register a student, the following will create two more accounts with library server and finance server
            Boolean acCreatedFinance = restTemplate.postForObject(Constraints.FINANCE_URL + "/api/finance/register/" + student1.getId(), null, Boolean.class);
            Boolean acCreatedLibrary = restTemplate.postForObject(Constraints.LIBRARY_URL + "/api/library/register/" + student1.getId(), null, Boolean.class);
            log.info("created account on library server " + acCreatedFinance);
            log.info("created account on library server " + acCreatedLibrary);

            return jwtTokenProvider.createToken(appUser.getEmail(), appUser);
        } else {
            throw new CustomException("Email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    /**
     * get user by email
     * @param email
     * @return
     */
    public Users search(String email) {
        Users appUser = userRepository.findByEmail(email);
        if (appUser == null) {
            throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
        }
        return appUser;
    }

    /**
     * current user information
     * @param
     * @return
     */
    public Users whoami(HttpServletRequest req) {
        return userRepository.findByEmail(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
    }

    /**
     * current student information
     * @return
     */
    public Student getStudentByCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Users users = userRepository.findByEmail(currentPrincipalName);
        Student student = studentRepository.findByUsers_Id(users.getId());
        if (student == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This user has no student account");
        }
        return student;
    }

}

package com.example.student.controller;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.example.student.dto.UserDataDTO;
import com.example.student.dto.UserResponseDTO;
import com.example.student.model.Users;
import com.example.student.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    /**
     * sign in
     * @param username
     * @param password
     * @return jwt token
     */
    @PostMapping("/signin")
    public String login(
            @RequestParam String username,
            @RequestParam String password) {
        return userService.signin(username, password);
    }

    /**
     * sign up with for student
     * @param user
     * @return jwt token
     */
    @PostMapping("/signup")
    public String signup(@RequestBody @Valid UserDataDTO user) {
        return userService.signupWithStudent(user);
    }

}

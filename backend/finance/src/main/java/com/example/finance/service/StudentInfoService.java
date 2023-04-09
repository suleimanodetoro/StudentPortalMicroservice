package com.example.finance.service;

import com.example.finance.model.StudentInfo;
import com.example.finance.repository.StudentInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StudentInfoService {

    @Autowired
    StudentInfoRepository studentInfoRepository;

    /**
     * register student
     * @param studentId
     * @return boolean value
     */
    public Boolean registerStudent(Long studentId){
        if (studentId == null || studentId ==0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student Id not valid");
        }
        StudentInfo studentInfo = new StudentInfo();
        studentInfo.setStudentId(studentId);
        studentInfoRepository.save(studentInfo);
        return true;
    }

}


package com.example.library.controller;

import com.example.library.service.StudentInfoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/library")
@AllArgsConstructor
public class StudentInfoResource {

    @Autowired
    private StudentInfoService studentInfoService;

    /**
     * register student on library server
     * @param studentId
     * @return boolean
     */
    @PostMapping("/register/{studentId}")
    public ResponseEntity<Boolean> registerStudent(@PathVariable Long studentId){
        return ResponseEntity.ok(studentInfoService.registerStudent(studentId));
    }
}

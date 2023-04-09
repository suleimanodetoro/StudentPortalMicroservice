package com.example.finance.controller;


import com.example.finance.service.StudentInfoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/finance")
@AllArgsConstructor
public class StudentInfoResource {
    @Autowired
    private StudentInfoService studentInfoService;

    /**
     * Register student on finance application
     * @param studentId
     * @return boolean
     */
    @PostMapping("/register/{studentId}")
    public ResponseEntity<Boolean> registerStudent(@PathVariable Long studentId){
        return ResponseEntity.ok(studentInfoService.registerStudent(studentId));
    }
}


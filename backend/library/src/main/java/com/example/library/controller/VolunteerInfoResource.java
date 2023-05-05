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
public class VolunteerInfoResource {

    @Autowired
    private StudentInfoService studentInfoService;

    /**
     * register volunter on library server
     * @param volunteerId
     * @return boolean
     */
    @PostMapping("/register/{volunteerId}")
    public ResponseEntity<Boolean> registerVolunteer(@PathVariable Long volunteerId){
        return ResponseEntity.ok(studentInfoService.registerStudent(volunteerId));
    }
}

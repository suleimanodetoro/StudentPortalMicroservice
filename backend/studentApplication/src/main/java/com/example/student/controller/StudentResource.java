package com.example.student.controller;


import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import com.example.student.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class StudentResource {

    private final Logger log = LoggerFactory.getLogger(StudentResource.class);
    private final StudentService studentService;
    private final StudentRepository studentRepository;

    public StudentResource(StudentService studentService, StudentRepository studentRepository) {
        this.studentService = studentService;
        this.studentRepository = studentRepository;
    }

    /**
     * update student
     * @param id
     * @param student
     * @return
     * @throws URISyntaxException
     */
    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody Student student
    ) throws URISyntaxException {
        log.debug("REST request to update student : {}, {}", id, student);
        if (student.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }
        if (!Objects.equals(id, student.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }

        if (!studentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Entity not found");
        }

        Student result = studentService.update(student);
        return ResponseEntity
                .ok()
                .body(result);
    }


    /**
     * get student with current user
     * @param httpServletRequest
     * @return a single student
     */
    @GetMapping("/students-by-user")
    public Student getStudents(HttpServletRequest httpServletRequest) {
        log.debug("REST request to get all Students");
        return studentService.findByUserId(httpServletRequest);
    }


    /**
     * get student with id
     * @param id
     * @return
     */
    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        Optional<Student> student = studentService.findOne(id);
        return ResponseEntity.ok(student.get());
    }

}

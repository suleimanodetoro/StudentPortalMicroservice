package com.example.library.repository;


import com.example.library.model.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentInfoRepository extends JpaRepository<StudentInfo, Long> {
    StudentInfo findByStudentId(Long studentId);
}

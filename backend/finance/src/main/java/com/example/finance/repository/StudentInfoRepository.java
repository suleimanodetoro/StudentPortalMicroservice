package com.example.finance.repository;

import com.example.finance.model.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentInfoRepository extends JpaRepository<StudentInfo, Long> {
    StudentInfo findByStudentId(Long studentId);
}


package com.example.finance.repository;

import com.example.finance.model.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInfoRepository extends JpaRepository<StudentInfo, Long> {
    StudentInfo findByStudentId(Long studentId);
}


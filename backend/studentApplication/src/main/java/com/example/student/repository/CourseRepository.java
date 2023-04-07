package com.example.student.repository;

import com.example.student.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {}
package com.example.student.repository;


import com.example.student.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    boolean existsByEmail(String email);
    Users findByEmail(String email);
}

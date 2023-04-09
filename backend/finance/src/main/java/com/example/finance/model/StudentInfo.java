package com.example.finance.model;
import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "student_info")
@Data
public class StudentInfo {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    Long studentId;
}

package com.example.library.model;


import lombok.Data;

import javax.persistence.*;

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

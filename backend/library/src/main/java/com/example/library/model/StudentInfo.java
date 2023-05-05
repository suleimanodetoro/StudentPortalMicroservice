package com.example.library.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "student_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentInfo {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    Long studentId;


}

package com.example.student.model;


import lombok.Data;
import javax.persistence.*;


@Entity
@Table(name = "course")
@Data
public class Course{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "course_price")
    private Double coursePrice;

    @Column(name = "is_active")
    private Boolean isActive;
}

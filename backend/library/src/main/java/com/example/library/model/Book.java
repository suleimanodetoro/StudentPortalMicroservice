package com.example.library.model;

import com.example.library.enumeration.BookStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    private String isbn;

    private LocalDateTime borrowedDateTime;

    private LocalDateTime returnDateTIme;

    @Enumerated(EnumType.STRING)
    private BookStatus bookStatus;

    @ManyToOne
    private StudentInfo studentInfo;

    @Column(name = "is_active")
    private Boolean isActive;
}

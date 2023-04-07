package com.example.student.dto.library;

import com.example.student.dto.StudentInfo;
import com.example.student.enumeration.BookStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Book {
    private Long id;
    private String name;
    private LocalDateTime borrowedDateTime;
    private LocalDateTime returnDateTIme;
    private StudentInfo studentInfo;
    private BookStatus bookStatus;
    private String isbn;
    private Boolean isActive;
}

package com.example.library.repository;


import com.example.library.model.Book;
import com.example.library.model.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByStudentInfo(StudentInfo studentInfo);

    @Query(nativeQuery = true, value = "select * from book where return_datetime < NOW() AND book_status = 'BORROWED'")
    List<Book> getAllLateBook();

}

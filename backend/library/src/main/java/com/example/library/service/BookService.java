package com.example.library.service;



import com.example.library.model.Book;
import com.example.library.model.StudentInfo;
import com.example.library.repository.BookRepository;
import com.example.library.repository.StudentInfoRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@AllArgsConstructor
public class BookService {

    private final Logger log = LoggerFactory.getLogger(BookService.class);
    private final BookRepository bookRepository;
    private final StudentInfoRepository studentInfoRepository;

    public Book save(Book book) {
        StudentInfo studentInfo = null;
        if (book.getStudentInfo() != null && book.getStudentInfo().getStudentId() != null){
            studentInfo = studentInfoRepository.findByStudentId(book.getStudentInfo().getStudentId());
            book.setStudentInfo(studentInfo);
        }

        if (studentInfo == null || book.getStudentInfo() == null || book.getStudentInfo().getStudentId() == null || book.getStudentInfo().getId().equals(0)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }

        log.debug("Request to save Book : {}", book);
        return bookRepository.save(book);
    }

    public Book update(Book book) {
        log.debug("Request to update Book : {}", book);
        return bookRepository.save(book);
    }

    @Transactional(readOnly = true)
    public List<Book> findAll() {
        log.debug("Request to get all Books");
        return bookRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Book> findAllByStudentId(Long studentId) {
        StudentInfo studentInfo = studentInfoRepository.findByStudentId(studentId);
        if (studentInfo == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }
        log.debug("Request to get all student wise Books");
        return bookRepository.findAllByStudentInfo(studentInfo);
    }

    @Transactional(readOnly = true)
    public Optional<Book> findOne(Long id) {
        log.debug("Request to get Book : {}", id);
        return bookRepository.findById(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete Book : {}", id);
        bookRepository.deleteById(id);
    }
}

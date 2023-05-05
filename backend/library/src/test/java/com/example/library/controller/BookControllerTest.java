package com.example.library.controller;

import com.example.library.enumeration.BookStatus;
import com.example.library.model.Book;
import com.example.library.model.StudentInfo;
import com.example.library.service.BookService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = BookControllerTest.class)
public class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookResource bookResource;
    @Test
    public void testCreateBook() throws Exception {
        // Arrange
        Book book = new Book(
                null,
                "The Great Gatsby",
                "978-3-16-148410-0",
                LocalDateTime.of(2023, 5, 4, 10, 30),
                LocalDateTime.of(2023, 5, 10, 12, 0),
                BookStatus.BORROWED,
                new StudentInfo(1l, 1l),
                true
        );

        Book savedBook = new Book(
                1l,
                "The Great Gatsby",
                "978-3-16-148410-0",
                LocalDateTime.of(2023, 5, 4, 10, 30),
                LocalDateTime.of(2023, 5, 10, 12, 0),
                BookStatus.BORROWED,
                new StudentInfo(1l, 1l),
                true
        );
        when(bookService.save(any(Book.class))).thenReturn(savedBook);
        // Act
        ResponseEntity<Book> response = bookResource.createBook(book);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedBook, response.getBody());
    }

    @Test
    public void testGetAllBooks() throws Exception {
        // Arrange
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book(1L, "The Great Gatsby", "978-3-16-148410-0", LocalDateTime.of(2023, 5, 4, 10, 30), LocalDateTime.of(2023, 5, 10, 12, 0), BookStatus.BORROWED, new StudentInfo(1l, 1l), true));
        expectedBooks.add(new Book(2L, "To Kill a Mockingbird", "978-3-16-148410-1", LocalDateTime.of(2023, 5, 5, 9, 0), LocalDateTime.of(2023, 5, 12, 14, 30), BookStatus.RETURNED, new StudentInfo(1l, 1l), true));
        when(bookService.findAll()).thenReturn(expectedBooks);
        // Act
        List<Book> actualBooks = bookResource.getAllBooks();
        // Assert
        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    public void testGetAllBooksByVolunteerId() throws Exception {
        // Arrange
        Long studentId = 1L;
        List<Book> expectedBooks = Arrays.asList(
                new Book(1L, "The Great Gatsby", "978-3-16-148410-0", LocalDateTime.of(2023, 5, 4, 10, 30), LocalDateTime.of(2023, 5, 10, 12, 0), BookStatus.BORROWED, new StudentInfo(1l, 1l), true),
                new Book(2L, "To Kill a Mockingbird", "978-3-16-148410-1", LocalDateTime.of(2023, 5, 5, 10, 30), LocalDateTime.of(2023, 5, 11, 12, 0), BookStatus.BORROWED, new StudentInfo(1l, 1l), true)
        );
        when(bookService.findAllByStudentId(studentId)).thenReturn(expectedBooks);
        // Act
        List<Book> actualBooks = bookResource.getAllBooksByVolunteerId(studentId);

        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    public void testGetBook() throws Exception {
        // Arrange
        Long bookId = 1L;
        Book expectedBook = new Book(1L, "The Great Gatsby", "978-3-16-148410-0", LocalDateTime.of(2023, 5, 4, 10, 30), LocalDateTime.of(2023, 5, 10, 12, 0), BookStatus.BORROWED, new StudentInfo(1l, 1l), true);
        when(bookService.findOne(bookId)).thenReturn(Optional.of(expectedBook));
        // Act
        ResponseEntity<Book> actualResponse = bookResource.getBook(bookId);
        // Assert
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedBook, actualResponse.getBody());
    }


    @Test
    public void testChangeBookStatus() {
        // create a mock book object
        Book book = new Book(1L, "The Great Gatsby", "978-3-16-148410-0", LocalDateTime.of(2023, 5, 4, 10, 30), LocalDateTime.of(2023, 5, 10, 12, 0), BookStatus.BORROWED, new StudentInfo(1l, 1l), true);
        when(bookService.findOne(1L)).thenReturn(Optional.of(book));
        when(bookService.save(book)).thenReturn(book);

        // create the controller and invoke the method being tested
        ResponseEntity<Boolean> response = bookResource.changeBookStatus(1L);

        // assert that the response is successful and the book's status was updated
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(BookStatus.RETURNED, book.getBookStatus());
    }



}

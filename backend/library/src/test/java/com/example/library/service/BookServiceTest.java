package com.example.library.service;

import com.example.library.controller.BookControllerTest;
import com.example.library.enumeration.BookStatus;
import com.example.library.model.Book;
import com.example.library.model.StudentInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.mockito.Mockito.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = BookControllerTest.class)
public class BookServiceTest {
    @Mock
    private BookService bookService;
    private Book book;
    private Book savedBook;


    @BeforeEach
    public void setup() {
        book = new Book();
        book.setName("Test Book");
        book.setIsbn("1234567890");
        book.setBorrowedDateTime(LocalDateTime.now());
        book.setReturnDateTIme(LocalDateTime.now().plusDays(7));
        book.setBookStatus(BookStatus.BORROWED);
        book.setStudentInfo(new StudentInfo(1l, 1l));

        savedBook = new Book();
        savedBook.setId(1l);
        savedBook.setName("Test Book");
        savedBook.setIsbn("1234567890");
        savedBook.setBorrowedDateTime(LocalDateTime.now());
        savedBook.setReturnDateTIme(LocalDateTime.now().plusDays(7));
        savedBook.setBookStatus(BookStatus.BORROWED);
        savedBook.setStudentInfo(new StudentInfo(1l, 1l));

    }

    @Test
    public void testSaveBook() {
        when(bookService.save(book)).thenReturn(savedBook);
        Book savedBook = bookService.save(book);
        assertNotNull(savedBook.getId());
        assertEquals(book.getName(), savedBook.getName());
        assertEquals(book.getIsbn(), savedBook.getIsbn());
        assertEquals(book.getBookStatus(), savedBook.getBookStatus());
        assertEquals(book.getStudentInfo(), savedBook.getStudentInfo());
    }


    @Test
    public void testFindAllBooks() {
        List<Book> books = new ArrayList<>();
        books.add(savedBook);
        when(bookService.findAll()).thenReturn(books);
        List<Book> booksAll = bookService.findAll();
        assertEquals(1, booksAll.size());
    }

    @Test
    public void testFindAllBooksByStudentId() {
        List<Book> books = new ArrayList<>();
        books.add(savedBook);
        when(bookService.findAllByStudentId(1l)).thenReturn(books);
        List<Book> booksAll = bookService.findAllByStudentId(1l);
        assertEquals(1, booksAll.size());
    }

    @Test
    public void testUpdateBook() {
        when(bookService.update(savedBook)).thenReturn(savedBook);
        savedBook.setName("Updated Book");
        Book updatedBook = bookService.update(savedBook);
        assertEquals(savedBook.getId(), updatedBook.getId());
        assertEquals("Updated Book", updatedBook.getName());
    }
}

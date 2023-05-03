package com.example.library.controller;

import com.example.library.enumeration.BookStatus;
import com.example.library.model.Book;
import com.example.library.service.BookService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class BookResource {
    private final Logger log = LoggerFactory.getLogger(BookResource.class);
    private final BookService bookService;

    /**
     * if any one borrow a book then it will be called
     * @param book
     * @return book object
     * @throws URISyntaxException
     */
    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to save Book : {}", book);
        if (book.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A new book cannot already have an ID");
        }
        Book result = bookService.save(book);
        return ResponseEntity
                .created(new URI("/api/books/" + result.getId()))
                .body(result);
    }

    /**
     * get all book
     * @return a list of book
     */
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        log.debug("REST request to get all Books");
        return bookService.findAll();
    }

    /**
     * get all books by student ID
     * @param studentId
     * @return  list of books
     */
    @GetMapping("/books-by-student")
    public List<Book> getAllBooksByStudentId(@RequestParam("studentId") Long studentId) {
        log.debug("REST request to get all Books");
        return bookService.findAllByStudentId(studentId);
    }

    /**
     * get book by id
     * @param id
     * @return a book object
     */
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        log.debug("REST request to get Book : {}", id);
        Optional<Book> book = bookService.findOne(id);
        return ResponseEntity.ok(book.get());
    }

    /**
     * return book return
     * @param bookId
     * @return
     */
    @PostMapping("/return-book")
    public ResponseEntity<Boolean> changeBookStatus(@RequestParam Long bookId) {
        log.debug("REST request to get Book : {}", bookId);
        Optional<Book> book = bookService.findOne(bookId);
        if (!book.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book is not found");
        }
        book.get().setBookStatus(BookStatus.RETURNED);
        bookService.save(book.get());
        return ResponseEntity.ok(true);
    }

}

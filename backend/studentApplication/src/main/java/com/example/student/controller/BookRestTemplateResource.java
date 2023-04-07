package com.example.student.controller;


import com.example.student.dto.library.Book;
import com.example.student.dto.library.BookRequestDto;
import com.example.student.service.BookRestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


/**
 * This class is responsible to connect with library server
 */
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class BookRestTemplateResource {
    public final BookRestService bookRestService;

    /**
     * save book if anyone borrows a book
     * @param bookRequestDto
     * @return a book object
     */
    @PostMapping("/save-book")
    public Book saveBook(@RequestBody BookRequestDto bookRequestDto){
        return bookRestService.saveBook(bookRequestDto);
    }

    /**
     * get all books with student.
     * @return list of books
     */
    @GetMapping("/get-books")
    public List<Book> getBookList(){
        return bookRestService.getAllBooksByStudentId();
    }

    @PostMapping("/return-book")
    public Boolean getBookList(@RequestParam Long bookId){
        return bookRestService.returnBook(bookId);
    }
}

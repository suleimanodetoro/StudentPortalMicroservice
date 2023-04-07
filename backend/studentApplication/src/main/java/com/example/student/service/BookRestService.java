package com.example.student.service;


import com.example.student.config.Constraints;
import com.example.student.dto.StudentInfo;
import com.example.student.dto.library.Book;
import com.example.student.dto.library.BookRequestDto;
import com.example.student.enumeration.BookStatus;
import com.example.student.model.Student;
import com.example.student.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * This class is responsible for connect with library -application
 */
@Service
@AllArgsConstructor
public class BookRestService {

    private final RestTemplate restTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    /**
     * save borrowed book
     * @param bookRequestDto
     * @return a book
     */
    public Book saveBook(BookRequestDto bookRequestDto){
        Student student = userService.getStudentByCurrentUser();
        Book book = new Book();
        book.setName(bookRequestDto.getName());
        book.setBorrowedDateTime(LocalDateTime.now());
        book.setBookStatus(BookStatus.BORROWED);
        book.setIsbn(bookRequestDto.getIsbn() == null ? "" : bookRequestDto.getIsbn());
        book.setReturnDateTIme(LocalDateTime.now().plusWeeks(2));
        book.setIsActive(true);
        book.setStudentInfo(new StudentInfo(null, student.getId()));
        try {
            String url = Constraints.LIBRARY_URL + "/api/books";
            Book book1 = restTemplate.postForObject(Constraints.LIBRARY_URL + "/api/books", book, Book.class);
            return book1;
        }catch (HttpStatusCodeException ex){
            ex.printStackTrace();
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map< String, Object > map = springParser.parseMap(ex.getResponseBodyAsString());
            String message = (String) map.get("message");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }

    /**
     * get all book by student Id
     * @return a list of book
     */
    public List<Book> getAllBooksByStudentId(){
        Boolean isRoleLibrarian = jwtTokenProvider.isRoleExist("ROLE_LIBRARIAN");
        if (isRoleLibrarian){
            return restTemplate.getForObject(Constraints.LIBRARY_URL + "/api/books", List.class);
        }
        Student student = userService.getStudentByCurrentUser();
        if (student == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }
        return restTemplate.getForObject(Constraints.LIBRARY_URL + "/api/books-by-student?studentId="+student.getId(), List.class);
    }


    public boolean returnBook(Long bookId){
        try {
            String url = Constraints.LIBRARY_URL + "/api/return-book?bookId=" +bookId;
            Boolean isPayment = restTemplate.postForObject(url, null, Boolean.class);
            return isPayment;
        }catch (HttpStatusCodeException ex){
            ex.printStackTrace();
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map< String, Object > map = springParser.parseMap(ex.getResponseBodyAsString());
            String message = (String) map.get("message");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }

}

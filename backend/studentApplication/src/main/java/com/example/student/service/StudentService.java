package com.example.student.service;


import com.example.student.dto.StudentInfo;
import com.example.student.dto.finance.Invoice;
import com.example.student.enumeration.InvoiceFor;
import com.example.student.enumeration.InvoiceType;
import com.example.student.model.Course;
import com.example.student.model.Users;
import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentService.class);
    private final StudentRepository studentRepository;
    private final UserService userService;
    private final FinanceRestService financeRestService;

    /**
     * update own profile
     * @param student
     * @return
     */
    @Transactional
    public Student update(Student student) {
        log.debug("Request to update Student : {}", student);
        Student student1 = studentRepository.save(student);

        if (student.getCourses() != null && !student.getCourses().isEmpty()){
            for (Course course : student1.getCourses()){
                Invoice invoice = new Invoice();
                final String uuid = UUID.randomUUID().toString().replace("-", "");
                invoice.setInvoiceNo(uuid);
                invoice.setName("course: " + course.getName());
                invoice.setInvoiceFor(InvoiceFor.COURSE);
                invoice.setAmount(course.getCoursePrice());
                invoice.setBookCourseId(course.getId());
                invoice.setInvoiceType(InvoiceType.PENDING);
                invoice.setStudentInfo(new StudentInfo(0l, student1.getId()));
                financeRestService.saveInvoice(invoice);
            }
        }
        return student1;
    }

    /**
     * Get student by userId
     * @param httpServletRequest
     * @return
     */
    @Transactional(readOnly = true)
    public Student findByUserId(HttpServletRequest httpServletRequest) {
        log.debug("Request to get all Students");

        Users user = userService.whoami(httpServletRequest);
        Student student = studentRepository.findByUsers_Id(user.getId());
        if (student == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid id");
        }
        return studentRepository.findByUsers_Id(user.getId());
    }

    /**
     * get student by id
     * @param id
     * @return
     */
    @Transactional(readOnly = true)
    public Optional<Student> findOne(Long id) {
        log.debug("Request to get Student : {}", id);
        return studentRepository.findById(id);
    }

}

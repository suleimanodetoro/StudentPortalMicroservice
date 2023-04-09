package com.example.finance.service;

import com.example.finance.enumeration.InvoiceFor;
import com.example.finance.enumeration.InvoiceType;
import com.example.finance.model.Invoice;
import com.example.finance.model.StudentInfo;
import com.example.finance.repository.InvoiceRepository;
import com.example.finance.repository.StudentInfoRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class InvoiceService {

    private final Logger log = LoggerFactory.getLogger(InvoiceService.class);
    private final InvoiceRepository invoiceRepository;
    private final StudentInfoRepository studentInfoRepository;

    /**
     * Create a invoice
     * @param invoice
     * @return a invoice
     */
    @Transactional
    public Invoice save(Invoice invoice) {
        log.debug("Request to save Invoice : {}", invoice);
        StudentInfo studentInfo = null;

        //Get student from student Id
        if (invoice.getStudentInfo() != null && invoice.getStudentInfo().getStudentId() != null){
            studentInfo = studentInfoRepository.findByStudentId(invoice.getStudentInfo().getStudentId());
            invoice.setStudentInfo(studentInfo);
        }

        //if ther have not student then it will throw an error with message
        if (invoice.getStudentInfo().getStudentId() == null || invoice.getStudentInfo().getId().equals(0)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }

        //If exist invoice then no need to add this invoice again
        if (studentInfo != null){
            List<Invoice> invoiceList = invoiceRepository.findAllByStudentInfoAndBookCourseId(studentInfo, invoice.getBookCourseId());
            if (!invoiceList.isEmpty()){
                return null;
            }
        }
        return invoiceRepository.save(invoice);
    }

    /**
     * pay to a invoice by invoiceNo and amount
     * @param invoiceNo
     * @param amount
     * @return a boolean value
     */
    public Boolean payment(String invoiceNo, Double amount) {
        Optional<Invoice> invoice = invoiceRepository.findByInvoiceNo(invoiceNo);
        if (!invoice.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invoice not found");
        }
        if (!invoice.get().getAmount().equals(amount)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have to exact amount");
        }
        invoice.get().setInvoiceType(InvoiceType.PAID);
        invoiceRepository.save(invoice.get());
        return true;
    }

    /**
     * Get all invoice
     * @return list of invoice
     */
    @Transactional(readOnly = true)
    public List<Invoice> findAll() {
        log.debug("Request to get all Invoices");
        return invoiceRepository.findAll();
    }

    /**
     * Get all invoice by studentId
     * @param studentId
     * @return List Of Invoice
     */
    @Transactional(readOnly = true)
    public List<Invoice> findAllInvoiceByStudentId(Long studentId) {
        log.debug("Request to get all Invoices");
        StudentInfo studentInfo = studentInfoRepository.findByStudentId(studentId);
        if (studentInfo == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }
        List<Invoice> allStudentInfoByStudentInfo = invoiceRepository.findAllByStudentInfo(studentInfo);
        if (allStudentInfoByStudentInfo == null){
            return new ArrayList<>();
        }
        return allStudentInfoByStudentInfo;
    }

    /**
     * Get the eligibility for graduate
     * @param studentId
     * @return a boolean value
     */
    @Transactional(readOnly = true)
    public Boolean isEligibleForGraduate(Long studentId) {
        log.debug("Request to get all Invoices");
        StudentInfo studentInfo = studentInfoRepository.findByStudentId(studentId);
        if (studentInfo == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }

        //Get all invoice by the course type. If he/she not get any course then an error will be thrown
        List<Invoice> allStudentInfoByStudentInfo = invoiceRepository.findAllByStudentInfoAndInvoiceFor(studentInfo, InvoiceFor.COURSE);
        if (allStudentInfoByStudentInfo.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You didn't get any course");
        }

        //If any pending invoice for course then throw a error
        List<Invoice> allStudentInfoByStudentInfoInvoiceListForCourse = invoiceRepository.findAllByStudentInfoAndInvoiceForAndInvoiceType(studentInfo, InvoiceFor.COURSE, InvoiceType.PENDING);
        if (!allStudentInfoByStudentInfoInvoiceListForCourse.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have to pay for your course");
        }

        //If any pending invoice for book then throw an error
        List<Invoice> allStudentInfoByStudentInfoInvoiceListForBook = invoiceRepository.findAllByStudentInfoAndInvoiceForAndInvoiceType(studentInfo, InvoiceFor.BOOK, InvoiceType.PENDING);
        if (!allStudentInfoByStudentInfoInvoiceListForBook.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have to pay fine for book");
        }
        return true;
    }

    /**
     *  find invoice
     * @param studentId
     * @param invoiceNo
     * @return a invoice
     */
    @Transactional(readOnly = true)
    public Invoice findInvoiceByStudentIdAndInvoiceNo(Long studentId, String invoiceNo) {
        log.debug("Request to get all Invoices");
        StudentInfo studentInfo = studentInfoRepository.findByStudentId(studentId);
        if (studentInfo == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student not found");
        }
        Invoice allStudentInfoByStudentInfo = invoiceRepository.findAllByStudentInfoAndInvoiceNo(studentInfo, invoiceNo);

        return allStudentInfoByStudentInfo;
    }

    /**
     * find invoice
     * @param id
     * @return a invoice
     */
    @Transactional(readOnly = true)
    public Optional<Invoice> findOne(Long id) {
        log.debug("Request to get Invoice : {}", id);
        return invoiceRepository.findById(id);
    }
}

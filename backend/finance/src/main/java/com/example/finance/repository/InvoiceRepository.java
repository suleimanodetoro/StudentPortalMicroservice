package com.example.finance.repository;

import com.example.finance.enumeration.InvoiceFor;
import com.example.finance.enumeration.InvoiceType;
import com.example.finance.model.Invoice;
import com.example.finance.model.StudentInfo;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Invoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findAllByStudentInfo(StudentInfo studentInfo);
    List<Invoice> findAllByStudentInfoAndInvoiceFor(StudentInfo studentInfo, InvoiceFor invoiceFor);
    List<Invoice> findAllByStudentInfoAndInvoiceForAndInvoiceType(StudentInfo studentInfo, InvoiceFor invoiceFor, InvoiceType invoiceType);
    Invoice findAllByStudentInfoAndInvoiceNo(StudentInfo studentInfo, String invoiceNo);
    Optional<Invoice> findByInvoiceNo(String invoiceNo);
    List<Invoice> findAllByStudentInfoAndBookCourseId(StudentInfo studentInfo, Long courseOrBookId);
}

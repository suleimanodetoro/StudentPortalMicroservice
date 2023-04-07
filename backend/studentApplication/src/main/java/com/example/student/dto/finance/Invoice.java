package com.example.student.dto.finance;

import com.example.student.dto.StudentInfo;
import com.example.student.enumeration.InvoiceFor;
import com.example.student.enumeration.InvoiceType;
import lombok.Data;

@Data
public class Invoice {
    private Long id;
    private String name;
    private Double amount;
    private InvoiceType invoiceType;
    private InvoiceFor invoiceFor;
    private Long bookCourseId;
    private StudentInfo studentInfo;
    private String invoiceNo;
}

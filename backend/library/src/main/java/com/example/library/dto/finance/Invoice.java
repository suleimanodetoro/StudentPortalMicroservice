package com.example.library.dto.finance;



import com.example.library.enumeration.InvoiceFor;
import com.example.library.enumeration.InvoiceType;
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

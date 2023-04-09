package com.example.student.controller;

import com.example.student.dto.finance.Invoice;
import com.example.student.model.Student;
import com.example.student.service.FinanceRestService;
import com.example.student.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * This class is responsible for connect with finance application
 */
@RestController
@RequestMapping("/api")
public class FinanceRestTemplateResource {

    @Autowired
    private FinanceRestService financeRestService;

    @Autowired
    private UserService userService;

    /**
     * get all invoice by student id
     * @return list of invoice
     */
    @GetMapping("/invoices")
    public List<Invoice> getAllInvoiceByStudent(){
        return financeRestService.getInvoiceListByStudentId();
    }

    /**
     * get  invoice by invoiceNo and current user
     * @param invoiceNo
     * @return single invoice
     */
    @GetMapping("/invoicesByUserInvoiceNo")
    public Invoice getAllInvoiceByStudentAndInvoiceNo(@RequestParam("invoiceNo") String invoiceNo){
        Student student = userService.getStudentByCurrentUser();
        return financeRestService.getInvoiceByStudentIdAndId(student.getId(), invoiceNo);
    }

    /**
     * payment with invoice No
     * @param amount
     * @param invoiceNo
     * @return a boolean
     */
    @PostMapping("/payment")
    public Boolean getPayment(@RequestParam("amount") Double amount, @RequestParam("invoiceNo") String invoiceNo){
        return financeRestService.getPayment(amount, invoiceNo);
    }

    /**
     * eligibility check for gradudate
     * @return a boolean value
     */
    @GetMapping("/is-graduate")
    public Boolean isGraduate(){
        Student student = userService.getStudentByCurrentUser();
        return financeRestService.isPermitForGraduate(student.getId());
    }
}
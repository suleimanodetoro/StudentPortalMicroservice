package com.example.finance.controller;

import com.example.finance.model.Invoice;
import com.example.finance.service.InvoiceService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@AllArgsConstructor

public class InvoiceResource {
    private final Logger log = LoggerFactory.getLogger(InvoiceResource.class);

    private final InvoiceService invoiceService;

    /**
     * Create Invoice with library and student application
     * @param invoice
     * @return
     * Invoice Object
     * @throws URISyntaxException
     */
    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        log.debug("REST request to save Invoice : {}", invoice);
        if (invoice.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A new invoice cannot already have an ID");
        }
        Invoice result = invoiceService.save(invoice);
        return ResponseEntity.ok(result);
    }

    /**
     * Getting all student invoice with their id
     * @param studentId
     * @return List of Invoice
     */
    @GetMapping("/student-invoices")
    public List<Invoice> getAllUserInvoices(@RequestParam("studentId") Long studentId) {
        log.debug("REST request to get all Invoices");
        return invoiceService.findAllInvoiceByStudentId(studentId);
    }

    /**
     * Check is this student eligible for graduate
     * @param studentId
     * @return
     */
    @GetMapping("/graduate-eligibility")
    public Boolean getStudentGraduateEligibility(@RequestParam("studentId") Long studentId) {
        log.debug("REST request to get all Invoices");
        return invoiceService.isEligibleForGraduate(studentId);
    }

    /**
     * Get Invoice by there student id and invoiceNo
     * @param studentId
     * @param invoiceNo
     * @return a Invoice
     */
    @GetMapping("/student-invoices-by-invoice-id-and-student-id")
    public Invoice getAllUserInvoicesByInvoiceIdAndStudentId(@RequestParam("studentId") Long studentId, @RequestParam("invoiceNo") String invoiceNo) {
        log.debug("REST request to get all Invoices");
        return invoiceService.findInvoiceByStudentIdAndInvoiceNo(studentId, invoiceNo);
    }

    /**
     * Pay for the invoice
     * @param invoiceNo
     * @param amount
     * @return boolean value
     */
    @PostMapping("/payment")
    public ResponseEntity<Boolean> payment(@RequestParam("invoiceNo") String invoiceNo, @RequestParam("amount") Double amount) {
        log.debug("REST request to save Invoice : {}", invoiceNo);
        return ResponseEntity.ok(invoiceService.payment(invoiceNo, amount));
    }

    /**
     * get all invoice list
     * @return list of inocice
     */
    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices() {
        log.debug("REST request to get all Invoices");
        return invoiceService.findAll();
    }


    /**
     * Invoice by invoice ID
     * @param id
     * @return a invoice
     */
    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        log.debug("REST request to get Invoice : {}", id);
        Optional<Invoice> invoice = invoiceService.findOne(id);
        return ResponseEntity.ok(invoice.get());
    }
}

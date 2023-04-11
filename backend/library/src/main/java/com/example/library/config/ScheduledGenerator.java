package com.example.library.config;

import com.example.library.dto.finance.Invoice;
import com.example.library.dto.finance.StudentInfo;
import com.example.library.enumeration.BookStatus;
import com.example.library.enumeration.InvoiceFor;
import com.example.library.enumeration.InvoiceType;
import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import com.example.library.service.FinanceRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;



@EnableAsync
@Component
public class ScheduledGenerator {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private FinanceRestService financeRestService;

    /**
     * Every 30 second, check is there any late book. If there have any late book then create a invoice for payment.
     */
    @Async
    @Scheduled(fixedRate = 30000)
    public void scheduleFixedRateTaskAsync() throws InterruptedException {
        System.out.println("Fixed rate task async - " + System.currentTimeMillis() / 1000);
        List<Book> bookList = bookRepository.getAllLateBook();

        for (Book book : bookList){
            book.setBookStatus(BookStatus.LATE);
            Book book1 = bookRepository.save(book);
            //Generate invoice
            Invoice invoice = new Invoice();
            final String uuid = UUID.randomUUID().toString().replace("-", "");
            invoice.setInvoiceNo(uuid);
            invoice.setName(book1.getName());
            invoice.setInvoiceFor(InvoiceFor.BOOK);
            invoice.setAmount(2d);
            invoice.setBookCourseId(book.getId());
            invoice.setInvoiceType(InvoiceType.PENDING);
            invoice.setStudentInfo(new StudentInfo(0l, book.getStudentInfo().getStudentId()));
            financeRestService.saveInvoice(invoice);
        }
    }

}

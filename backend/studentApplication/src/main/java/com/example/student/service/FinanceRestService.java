package com.example.student.service;

import com.example.student.config.Constraints;
import com.example.student.dto.finance.Invoice;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * This class is responsible for connect with finance server
 */
@Service
@AllArgsConstructor
public class FinanceRestService {
    private final RestTemplate restTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    /**
     * save invoice with finance application
     * @param invoice
     * @return  a invoice
     */
    public Invoice saveInvoice(Invoice invoice){
        try {
            Invoice invoice1 = restTemplate.postForObject(Constraints.FINANCE_URL + "/api/invoices", invoice, Invoice.class);
            return invoice1;
        }catch (HttpStatusCodeException ex){
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map< String, Object > map = springParser.parseMap(ex.getResponseBodyAsString());
            String message = (String) map.get("message");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }


    /**
     * list of invoice by student
     * @return list of invoice
     */
    public List<Invoice> getInvoiceListByStudentId(){
        try {
            Boolean isRoleFinance = jwtTokenProvider.isRoleExist("ROLE_FINANCE");
            List<Invoice> invoice1 = new ArrayList<>();
            if (isRoleFinance){
                invoice1 = restTemplate.getForObject(Constraints.FINANCE_URL + "/api/invoices", List.class);
            }else {
                Student student = userService.getStudentByCurrentUser();
                invoice1 = restTemplate.getForObject(Constraints.FINANCE_URL + "/api/student-invoices?studentId="+student.getId(), List.class);
            }
            return invoice1;
        }catch (HttpStatusCodeException ex){
            ex.printStackTrace();
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map< String, Object > map = springParser.parseMap(ex.getResponseBodyAsString());
            String message = (String) map.get("message");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }

    /**
     * get invoice by studentId and invoice No
     * @param studentId
     * @param invoiceNo
     * @return
     */
    public Invoice getInvoiceByStudentIdAndId(Long studentId, String invoiceNo){
        try {
            String url = Constraints.FINANCE_URL + "/api/student-invoices-by-invoice-id-and-student-id?studentId=" + studentId + "&invoiceNo=" + invoiceNo;
            Invoice invoice = restTemplate.getForObject(url, Invoice.class);
            return invoice;
        }catch (HttpStatusCodeException ex){
            ex.printStackTrace();
            JsonParser springParser = JsonParserFactory.getJsonParser();
            Map< String, Object > map = springParser.parseMap(ex.getResponseBodyAsString());
            String message = (String) map.get("message");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }


    /**
     * payment by invoice no
     * @param amount
     * @param invoiceNo
     * @return a boolean
     */
    public boolean getPayment(Double amount, String invoiceNo){
        try {
            String url = Constraints.FINANCE_URL + "/api/payment?amount=" + amount + "&invoiceNo=" + invoiceNo;
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

    /**
     * invoice eligibility
     * @param studentId
     * @return a boolean object
     */
    public boolean isPermitForGraduate(Long studentId){
        try {
            String url = Constraints.FINANCE_URL + "/api/graduate-eligibility?studentId=" + studentId;
            Boolean isPayment = restTemplate.getForObject(url, Boolean.class);
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

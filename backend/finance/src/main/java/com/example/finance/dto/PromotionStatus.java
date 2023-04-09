package com.example.finance.dto;

import lombok.Data;

@Data
public class PromotionStatus {
    private Boolean isEligibleForPromotion;
    private String cause;
}

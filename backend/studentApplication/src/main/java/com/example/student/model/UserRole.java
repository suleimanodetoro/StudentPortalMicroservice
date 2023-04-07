package com.example.student.model;
import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    STUDENT, FINANCE, LIBRARIAN;
    public String getAuthority() {
        return name();
    }

}

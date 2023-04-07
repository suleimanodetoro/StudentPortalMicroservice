package com.example.student.dto;
import java.util.List;

import com.example.student.model.Users;
import lombok.Data;

@Data
public class UserResponseDTO {
    private Integer id;
    private String username;
    private String email;
    List<Users> appUserRoles;
}

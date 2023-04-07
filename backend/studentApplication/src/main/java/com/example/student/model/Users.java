package com.example.student.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Size;

@Table(name = "users")
@Entity
@Data
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 8, message = "Minimum password length: 8 characters")
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    List<UserRole> appUserRoles;

}

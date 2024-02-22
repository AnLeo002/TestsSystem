package com.tests.system.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    @NotBlank
    private String email;
    private String phone;
    private boolean enabled;
    private String profile;
    @ManyToMany(fetch = FetchType.EAGER,targetEntity = RoleEntity.class,cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles;

    //Usuario de prueba
    /*
    * {
    "username":"britney",
    "password":"1234",
    "name":"britney",
    "lastName":"Saavedra",
    "email":"britney@gmail.com",
    "phone":"3173366916",
    "enabled":true,
    "profile":"yo.png",
    "roles":["INVITED"]
}*/
}

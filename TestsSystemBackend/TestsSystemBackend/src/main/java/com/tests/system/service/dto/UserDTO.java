package com.tests.system.service.dto;

import com.tests.system.entities.RoleEntity;

import java.util.List;
import java.util.Set;

public record UserDTO( Long id,
        String username,
         String password,
         String name,
         String lastName,
         String email,
         String phone,
         boolean enabled,
         String profile,
         Set<RoleEntity> roles) {

}

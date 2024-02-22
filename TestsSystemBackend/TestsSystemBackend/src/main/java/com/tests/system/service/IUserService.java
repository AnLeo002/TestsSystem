package com.tests.system.service;

import com.tests.system.entities.UserEntity;
import com.tests.system.service.dto.UserDTO;

public interface IUserService {
    UserEntity save(UserDTO userDTO);
    UserEntity findUserByUsername(String username);
    UserEntity updateUser(String username,UserDTO userDTO);
    void deleteUser(String username);
}

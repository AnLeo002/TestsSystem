package com.tests.system.service;

import com.tests.system.entities.UserEntity;
import com.tests.system.service.dto.UserDTO;

import java.util.List;
import java.util.Set;

public interface IUserService {
    UserEntity save(UserDTO userDTO);
    UserEntity findUserByUsername(String username);
    UserEntity updateUser(String username,UserDTO userDTO);
    void deleteUser(Long id);
    UserEntity updateUserById(Long id,UserDTO userDTO, boolean retry);
    List<UserEntity> findAllUsers();
}

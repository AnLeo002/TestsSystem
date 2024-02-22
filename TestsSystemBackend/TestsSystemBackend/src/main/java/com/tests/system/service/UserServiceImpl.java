package com.tests.system.service;

import com.tests.system.entities.ERole;
import com.tests.system.entities.RoleEntity;
import com.tests.system.entities.UserEntity;
import com.tests.system.repository.UserRepo;
import com.tests.system.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService{

    @Autowired
    private UserRepo repo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserEntity save(UserDTO userDTO) {
        Set<RoleEntity> roleEntities = new HashSet<>();
        if(userDTO.roles()==null){
            roleEntities.add(RoleEntity.builder()
                    .role(ERole.valueOf(ERole.USER.name()))
                    .build());
        }else {
            roleEntities = userDTO.roles().stream()
                    .map(role -> RoleEntity.builder()
                            .role(ERole.valueOf(role))
                            .build()
                    )
                    .collect(Collectors.toSet());
        }

        UserEntity user = UserEntity.builder()
                .name(userDTO.name())
                .lastName(userDTO.lastName())
                .email(userDTO.email())
                .phone(userDTO.phone())
                .profile(userDTO.profile())
                .enabled(userDTO.enabled())
                .username(userDTO.username())
                .password(passwordEncoder.encode(userDTO.password()))
                .roles(roleEntities)
                .build();
        return repo.save(user);
    }

    @Override
    public UserEntity findUserByUsername(String username) {
        return repo.findByUsername(username).orElseThrow();
    }

    @Override
    public UserEntity updateUser(String username,UserDTO userDTO) {
        /*Set<RoleEntity> roleEntities = userDTO.roles().stream()
                .map(role -> RoleEntity.builder()
                        .role(ERole.valueOf(String.valueOf(role)))
                        .build()
                )
                .collect(Collectors.toSet());*/

        UserEntity user = repo.findByUsername(username).get();

        user.setEmail(userDTO.email());
        user.setName(userDTO.name());
        user.setLastName(userDTO.lastName());
        user.setUsername(userDTO.username());
        user.setPassword(userDTO.password());
        user.setPhone(userDTO.phone());
        user.setProfile(userDTO.profile());
        user.setRoles(null);//THIS PROPERTY IS ERROR
        user.setEnabled(userDTO.enabled());

        return repo.save(user);
    }

    @Override
    public void deleteUser(String username) {
        try {
            Optional<UserEntity> user = repo.findByUsername(username);
            repo.deleteById(user.get().getId());
        }catch (Exception e){
            throw new RuntimeException("El Usuario no pudo ser eliminado "+e);
        }
    }
}

package com.tests.system.service;

import com.tests.system.entities.ERole;
import com.tests.system.entities.RoleEntity;
import com.tests.system.entities.UserEntity;
import com.tests.system.repository.RoleRepo;
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
    private RoleRepo roleRepo;
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
                            .role(ERole.valueOf(role.getRole().name()))
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
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        user.setPhone(userDTO.phone());
        user.setProfile(userDTO.profile());
        user.setRoles(null);//THIS PROPERTY IS ERROR
        user.setEnabled(userDTO.enabled());

        return repo.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        try {
            repo.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("El Usuario no pudo ser eliminado "+e);
        }
    }

    @Override
    public UserEntity updateUserById(Long id, UserDTO userDTO, boolean retry) {

        UserEntity user = repo.findById(id).get();

        Set<RoleEntity> roleEntities = new HashSet<>();

        userDTO.roles().forEach(role ->{
            if(roleRepo.findById(role.getId()).isPresent()){
                roleEntities.add(role);
            }else{
                roleEntities.add(RoleEntity.builder()
                        .role(ERole.valueOf(role.getRole().name()))
                        .build());
                }
            }
        );
        user.setEmail(userDTO.email());
        user.setName(userDTO.name());
        user.setLastName(userDTO.lastName());
        user.setUsername(userDTO.username());
        user.setPassword(retry ? passwordEncoder.encode(userDTO.password()) : userDTO.password());//If the user update information, the password will be encripted but if the admin change the variable enabled, the password will not be encripted
        user.setPhone(userDTO.phone());
        user.setProfile(userDTO.profile());
        user.setRoles(roleEntities);
        user.setEnabled(userDTO.enabled());

        return repo.save(user);
    }

    @Override
    public List<UserEntity> findAllUsers() {
        return (List<UserEntity>) repo.findAll();
    }
}

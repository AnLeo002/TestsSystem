package com.tests.system.controller;

import com.tests.system.entities.UserEntity;
import com.tests.system.repository.UserRepo;
import com.tests.system.security.filter.JwtAuthenticationFilter;
import com.tests.system.security.jwt.JwtUtils;
import com.tests.system.service.UserDetailsServiceImpl;
import com.tests.system.service.UserServiceImpl;
import com.tests.system.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/v1")
@CrossOrigin("*")//Me permite la comunicacion del frondEnd con el back(CORS), EL * permite cualquier peticion desde el front
public class UserController {

    @Autowired
    private UserRepo repo;
    @Autowired
    private UserServiceImpl service;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) throws URISyntaxException {
        Optional<UserEntity> user = repo.findByUsername(userDTO.username());
        if(user.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El nombre de usuario ya se encuentra registrado");
        }else {

            service.save(userDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("Message","Usuario creado correctamente");
            response.put("Usuario",userDTO);
            return ResponseEntity.created(new URI("/v1/createUser")).body(response);
        }

    }

    @GetMapping("/getUser")
    public ResponseEntity<?>getUserByUsername(@RequestParam String username){
        return ResponseEntity.ok(service.findUserByUsername(username));
    }
    @GetMapping("/findAll")
    public ResponseEntity<List<UserEntity>> findAllUsers(){
        return ResponseEntity.ok(service.findAllUsers());
    }

    @PutMapping("/updateEnabled")
    public ResponseEntity updateUser(@RequestBody UserDTO userDTO){
        service.updateUserById(userDTO.id(), userDTO,false);
        Map<String, Object> response = new HashMap<>();
        response.put("Message","Usuario actualizado correctamente");
        response.put("Usuario",userDTO);

        return ResponseEntity.ok(response);
    }
    @PutMapping("/updateUser")
    public ResponseEntity updateUserById(@RequestBody UserDTO userDTO){
        Optional<UserEntity> user = repo.findByUsername(userDTO.username());
        if(user.isPresent()){
            if (user.get().getId() == userDTO.id()){
                service.updateUserById(userDTO.id(),userDTO,true);
                Map<String, Object> response = new HashMap<>();
                response.put("user",userDTO);
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El nombre de usuario ya se encuentra registrado");
        }else {
            service.updateUserById(userDTO.id(), userDTO,true);
            Map<String, Object> response = new HashMap<>();
            response.put("user",userDTO);
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        service.deleteUser(id);
        Map<String, Object> response = new HashMap<>();
        response.put("Message","Usuario eliminado correctamente");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sessionUser")
    public UserEntity getSessionUser(Principal principal){
        return service.findUserByUsername(principal.getName());
    }

}

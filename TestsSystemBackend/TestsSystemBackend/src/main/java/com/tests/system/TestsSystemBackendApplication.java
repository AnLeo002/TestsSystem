package com.tests.system;

import com.tests.system.entities.RoleEntity;
import com.tests.system.service.UserServiceImpl;
import com.tests.system.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Set;

@SpringBootApplication
public class TestsSystemBackendApplication implements CommandLineRunner {
	@Autowired
	private UserServiceImpl service;

	public static void main(String[] args) {
		SpringApplication.run(TestsSystemBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		/*Set<String> roles = Set.of("ADMIN","INVITED");
		UserDTO user = new UserDTO("leomaster","1234","andre","saavedra","lulesaasoer@gmail.com","312446346",true,"leonard",roles);
		service.save(user);
		System.out.println("Usuario guardado");*/
	}
}

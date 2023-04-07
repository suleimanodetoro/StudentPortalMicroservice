package com.example.student;

import com.example.student.model.UserRole;
import com.example.student.model.Users;
import com.example.student.service.UserService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
@OpenAPIDefinition
public class StudentApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(StudentApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public RestTemplate restTemplate(){
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate;
	}

	/**
	 * create default user
	 * @param params
	 * @throws Exception
	 */
	@Override
	public void run(String... params) throws Exception {
		Users student = null;
		Users librarian = null;
		Users finance = null;
		try {
			student = userService.search("student@localhost");
			librarian = userService.search("librarian@localhost");
			finance = userService.search("finance@localhost");
		}catch (Exception ex){
			ex.printStackTrace();
		}
		if (student == null){
			Users admin = new Users();
			admin.setPassword("123456");
			admin.setEmail("student@localhost");
			admin.setAppUserRoles(new ArrayList<UserRole>(Arrays.asList(UserRole.STUDENT)));
			userService.signup(admin);
		}

		if (librarian == null){
			Users client = new Users();
			client.setPassword("123456");
			client.setEmail("librarian@localhost");
			client.setAppUserRoles(new ArrayList<UserRole>(Arrays.asList(UserRole.LIBRARIAN)));
			userService.signup(client);
		}

		if (finance == null){
			Users client = new Users();
			client.setPassword("123456");
			client.setEmail("finance@localhost");
			client.setAppUserRoles(new ArrayList<UserRole>(Arrays.asList(UserRole.FINANCE)));
			userService.signup(client);
		}
	}
}

package com.hit;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@MapperScan("com.hit.*.mapper")				//没有这个的话使用@Autowired注解将Mapper接口注入到其他组件中时，Spring容器将无法找到该接口的实现类
public class SpearApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpearApplication.class, args);
	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

}

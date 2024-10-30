package com.AMITH.rest.webservices.restfulwebservices;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.cors() // Enable CORS
				.and()
				.authorizeHttpRequests(auth -> auth.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.antMatchers(HttpMethod.POST, "/**").permitAll().antMatchers(HttpMethod.PUT, "/**").permitAll()
						.antMatchers(HttpMethod.DELETE, "/**").permitAll().anyRequest().authenticated())
				.httpBasic().and()
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).csrf()
				.disable().build();
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3000")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("*").allowCredentials(true);
	}
}

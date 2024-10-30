package com.AMITH.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
	List<Todo> findByUsername(String username);

	List<Todo> findByUsernameAndDone(String username, boolean done);

	List<Todo> findByProjectId(Integer projectId);

	List<Todo> findByProjectIdAndDone(Integer projectId, boolean done);
}
package com.AMITH.rest.webservices.restfulwebservices.todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}

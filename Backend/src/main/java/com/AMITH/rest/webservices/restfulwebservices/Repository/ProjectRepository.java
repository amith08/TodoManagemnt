package com.AMITH.rest.webservices.restfulwebservices.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AMITH.rest.webservices.restfulwebservices.Model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}

package com.AMITH.rest.webservices.restfulwebservices.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectResource {

	private final ProjectRepository projectRepository;

	public ProjectResource(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	@PostMapping("/users/{username}/projects")
	public Project createProject(@RequestBody Project project) {
		return projectRepository.save(project);
	}

//	@GetMapping("/users/{username}/projects")
//	public List<Project> listProjects() {
//		return projectRepository.findAll();
//	}
	@GetMapping("/users/{username}/projects")
	public ResponseEntity<List<Project>> listProjects(@PathVariable String username) {
	    try {
	        List<Project> projects = projectRepository.findAll();
	        return ResponseEntity.ok(projects);
	    } catch (Exception e) {
	        // Log the error
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
//	@GetMapping("/users/{username}/projects/{id}")
//	public ResponseEntity<Project> getProject(@PathVariable Integer id) {
//		Optional<Project> project = projectRepository.findById(id);
//		if (project.isPresent()) {
//			return ResponseEntity.ok(project.get()); // Ensure this returns the correct data
//		}
//		return ResponseEntity.notFound().build();
//	}
//}@GetMapping("/users/{username}/projects/{id}")
	public ResponseEntity<Project> getProject(@PathVariable String username, @PathVariable Integer id) {
	    Optional<Project> project = projectRepository.findById(id);
	    if (project.isPresent()) {
	        return ResponseEntity.ok(project.get());
	    }
	    return ResponseEntity.notFound().build();
	}
}

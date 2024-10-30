package com.AMITH.rest.webservices.restfulwebservices.todo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoJPAResource {

	private final TodoRepository todoRepository;
	private final ProjectRepository projectRepository;

	public TodoJPAResource(TodoRepository todoRepository, ProjectRepository projectRepository) {
		this.todoRepository = todoRepository;
		this.projectRepository = projectRepository;
	}

	@GetMapping("/projects/{projectId}/todos")
	public List<Todo> retrieveTodosByProject(@PathVariable Integer projectId) {
		return todoRepository.findByProjectId(projectId);
	}

	@GetMapping("/projects/{projectId}/todos/{id}")
	public ResponseEntity<Todo> retrieveTodoById(@PathVariable Integer projectId, @PathVariable int id) {
		Optional<Todo> todo = todoRepository.findById(id);
		return todo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping("/projects/{projectId}/todos")
	public ResponseEntity<Todo> createTodoForProject(@PathVariable Integer projectId, @RequestBody Todo todo) {
		Optional<Project> projectOptional = projectRepository.findById(projectId);
		if (!projectOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		Project project = projectOptional.get();
		todo.setProject(project);
		todo.setCreatedDate(LocalDateTime.now());
		  todo.setDone(false);
		Todo createdTodo = todoRepository.save(todo);

		return ResponseEntity.ok(createdTodo);
	}

	@DeleteMapping("/projects/{projectId}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable Integer projectId, @PathVariable int id) {
		if (!todoRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}

		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}


	
@PutMapping("/projects/{projectId}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable Integer projectId, @PathVariable int id,
	        @RequestBody Todo todo) {
	    Optional<Todo> existingTodoOptional = todoRepository.findById(id);

	    if (!existingTodoOptional.isPresent()) {
	        return ResponseEntity.notFound().build();
	    }

	    Todo existingTodo = existingTodoOptional.get();
	    existingTodo.setDescription(todo.getDescription());
	    existingTodo.setDone(todo.isDone());

	    
	    if (todo.isDone()) {
	        existingTodo.setUpdatedDate(LocalDateTime.now());
	    } else {
	        existingTodo.setUpdatedDate(null); 
	    }

	    Todo updatedTodo = todoRepository.save(existingTodo);
	    return ResponseEntity.ok(updatedTodo);
	}

	@GetMapping("/projects/{projectId}/todos/completed")
	public List<Todo> retrieveCompletedTodosByProject(@PathVariable Integer projectId) {
		return todoRepository.findByProjectIdAndDone(projectId, true);
	}

	@GetMapping("/projects/{projectId}/todos/pending")
	public List<Todo> retrievePendingTodosByProject(@PathVariable Integer projectId) {
		return todoRepository.findByProjectIdAndDone(projectId, false);
	}

	@GetMapping(path = "/basicauth")
	public String basicAuthCheck() {
		return "Success";
	}


	
}

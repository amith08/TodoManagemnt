package com.AMITH.rest.webservices.restfulwebservices.todo;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/users/{username}/projects/{projectId}")
public class ProjectExportController {

    private final ProjectRepository projectRepository;

    public ProjectExportController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportProjectSummary(@PathVariable String username, @PathVariable Integer projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (!projectOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOptional.get();
        StringBuilder markdownContent = new StringBuilder();

        // Construct the markdown content
        markdownContent.append("# Project: ").append(project.getTitle()).append("\n\n");
        long completedCount = project.getTodos().stream().filter(Todo::isDone).count();
        markdownContent.append("**Summary**: ").append(completedCount).append(" / ")
                .append(project.getTodos().size()).append(" completed.\n\n");
        markdownContent.append("## Pending Todos:\n");
        if (project.getTodos().stream().noneMatch(todo -> !todo.isDone())) {
            markdownContent.append("No pending todos.\n");
        } else {
            project.getTodos().stream().filter(todo -> !todo.isDone()).forEach(todo ->
                    markdownContent.append("- [ ] ").append(todo.getDescription())
                            .append(" (Created: ").append(todo.getCreatedDate()).append(")\n"));
        }

        markdownContent.append("\n## Completed Todos:\n");
        if (project.getTodos().stream().noneMatch(Todo::isDone)) {
            markdownContent.append("No completed todos.\n");
        } else {
            project.getTodos().stream().filter(Todo::isDone).forEach(todo ->
                    markdownContent.append("- [x] ").append(todo.getDescription())
                            .append(" (Created: ").append(todo.getCreatedDate())
                            .append(", Completed: ").append(todo.getUpdatedDate()).append(")\n"));
        }
        byte[] markdownBytes = markdownContent.toString().getBytes(StandardCharsets.UTF_8);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("text", "markdown", StandardCharsets.UTF_8));
        headers.setContentDispositionFormData("attachment", project.getTitle() + ".md");

        return new ResponseEntity<>(markdownBytes, headers, HttpStatus.OK);
    }
}
# Project Management Application

## Overview

This project is a web-based application for managing projects and todos, built with **Java Spring Boot** for the backend and **React.js** for the frontend. The application allows users to create projects, manage tasks within those projects, and export project summaries as markdown files.

## Objective

The primary objective of this application is to provide a seamless interface for managing projects and todos with the following capabilities:
1. Create a new project.
2. Manage todos within a project (Add, Edit, Update, and Mark as complete).
3. Export the project summary as a gist on GitHub.

## Features

### Core Functionalities
- **Project Creation**: Users can create new projects and assign todos to them.
- **Todo Management**: Users can add, edit, update, and mark todos as complete within a specific project.
- **Export to Gist**: Users can export the project summary as a markdown file to GitHub as a secret gist.

### Detailed Project View
- Editable project title.
- A list of todos, including their descriptions, creation dates, and completion status.
- Actions to add, update, and remove todos.
- Ability to mark todos as pending or complete.
- Export functionality to save project summaries locally as markdown files.

### Authentication
- The application implements Basic Authentication for user login, ensuring that only authorized users can access project data.

## Technologies Used

- **Backend**: Java, Spring Boot
- **Frontend**: JavaScript, React.js
- **Database**: MySQL
- **Version Control**: Git

## Application Structure

### Backend

The backend is developed using Spring Boot and is responsible for handling business logic, database interactions, and API endpoints. Below are key components of the backend:

#### 1. Entity Classes
- **Project**: Represents the project entity with attributes like unique ID, title, created date, and a list of todos.
- **Todo**: Represents the todo entity with attributes like unique ID, description, status, created date, and updated date.

#### 2. Repositories
- **ProjectRepository**: Interface for CRUD operations on Project entities.
- **TodoRepository**: Interface for CRUD operations on Todo entities.

#### 3. Controllers
- **ProjectResource**: REST controller to manage projects (create, view, update, delete).
- **TodoJPAResource**: REST controller to manage todos (add, edit, mark as complete).

#### 4. Security Configuration
- Implements Basic Authentication for securing API endpoints.

#### 5. Database Configuration
- The application uses MySQL as the database, configured in the `application.properties` file:

#### properties

spring.datasource.url=jdbc:mysql://localhost:3306/tododb
spring.datasource.username=root
spring.datasource.password=Amith007!
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.security.user.name=Your_database_username
spring.security.user.password=Your_database_password
logging.level.org.springframework=info

## Frontend

The frontend is developed using **React.js**, providing a user-friendly interface for interaction with the backend. Key components include:

### 1. Components
- **HomeComponent**: Displays a list of all projects and options to create a new project.
- **ProjectTodosComponent**: Displays details of a specific project, including todos and options to add, edit, or remove them.
- **LoginComponent**: Handles user authentication.

### 2. Routing
The application uses **React Router** for navigation between different views (home page, project details).

### 3. API Integration
**Axios** is used to make HTTP requests to the backend API for operations related to projects and todos.

### 4. State Management
The application uses **React hooks** for managing state and side effects within components.

## Getting Started

### Prerequisites
- Java 11 or higher
- Node.js and npm
- MySQL database server

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   
2.Backend Stetup
cd backend
./mvnw clean install

3. Configure MySQL Database
CREATE DATABASE tododb;

4. Run the Backend
./mvnw spring-boot:run

### Usage
Access the application by navigating to http://localhost:3000 in your browser.
 Log in using the default credentials:
•	Username: amith
•	Password: 123

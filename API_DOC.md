# Task Manager API Documentation

## Base URL
http://localhost:5000/api

### Endpoints:

#### 1. **User Authentication**
- **POST** `/auth/register`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "Zahra Ali",
      "email": "zahra@gmail.com",
      "password": "12345678"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User created successfully"
    }
    ```

- **POST** `/auth/login`
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "zahra@gmail.com",
      "password": "12345678"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

#### 2. **Task Management**
- **POST** `/tasks`
  - **Description**: Create a new task (requires authentication).
  - **Request Headers**:
    ```
    Authorization: Bearer <your_jwt_token>
    ```
  - **Request Body**:
    ```json
    {
      "title": "New Task",
      "description": "Details about the task",
      "dueDate": "2024-12-01"
    }
    ```
  - **Response**:
    ```json
    {
      "title": "New Task",
      "description": "Details about the task",
      "completed": false,
      "dueDate": "2024-12-01T00:00:00.000Z",
      "user": "<user_id>",
      "_id": "<task_id>"
    }
    ```
- **GET** `/tasks`
  - **Description**: Retrieve tasks for the authenticated user.
  - **Optional Query Params**: `?completed=true` to filter by status.
  - **Request Headers**:
    ```
    Authorization: Bearer <your_jwt_token>
    ```
  - **Response**:
    ```json
    [
      {
        "_id": "<task_id>",
        "title": "Task 1",
        "description": "Details",
        "completed": false,
        "dueDate": "2024-12-01T00:00:00.000Z",
        "user": "<user_id>"
      }
    ]
    ```
- **PUT** `/tasks/:taskId`
  - **Description**: Update a specific task (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "Updated Task Title",
      "completed": true
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "<task_id>",
      "title": "Updated Task Title",
      "description": "Description of Updated Task Title",
      "completed": true,
      "dueDate":"2024-12-01T00:00:00.000Z",
      "user": "<user_id>"
    }
    ```
- **DELETE** `/tasks/:taskId`
  - **Description**: Delete a specific task (requires authentication).
  - **Response**:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```
- **GET** `/tasks/filter`
  - **Description**: Retrieve tasks for the authenticated user.
  - **Request Headers**:
    ```
    Authorization: Bearer <your_jwt_token>
    ```
    - **Request Body**:
    ```json
    {
        "completed":true
    }
    ```
  - **Response**:
    ```json
    [
      {
        "_id": "<task_id>",
        "title": "Task 1",
        "description": "Details",
        "completed": false,
        "dueDate": "2024-12-01T00:00:00.000Z",
        "user": "<user_id>"
      }
    ]
    ```





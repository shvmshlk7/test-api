Task Management API
This is a simple RESTful API built with Node.js and Express.js to manage a collection of tasks (to-do items). The API supports basic CRUD operations (Create, Read, Update, Delete) and stores data in memory (no database required).
Table of Contents

Setup Instructions
API Endpoints
GET /tasks
GET /tasks/:id
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id



Setup Instructions
Prerequisites

Node.js: Ensure Node.js is installed on your machine. You can download it from nodejs.org. Version 14.x or higher is recommended.
Postman or curl: For testing the API endpoints.

Installation and Running the API

Clone or Download the Repository:

Clone this repository or download the source code.
Navigate to the project folder in your terminal:cd task-api




Install Dependencies:

Run the following command to install the required dependencies (Express.js):npm install




Start the Server:

Run the following command to start the API server:node index.js


The server will run on http://localhost:3000. You should see the message:Server is running on http://localhost:3000




Test the API:

Use Postman or curl to test the endpoints.
Example: To test if the server is running, send a GET request to http://localhost:3000/ using Postman or curl:curl http://localhost:3000/


Expected response: Task API is running!





API Endpoints
GET /tasks
Description: Retrieve a list of all tasks.

Method: GET
URL: http://localhost:3000/tasks
Sample Request:GET http://localhost:3000/tasks


Sample Response (Status: 200 OK):[
    {
        "id": 1,
        "title": "Sample Task 1",
        "description": "This is a sample task",
        "completed": false
    },
    {
        "id": 2,
        "title": "Sample Task 2",
        "description": "Another sample task",
        "completed": true
    }
]


Status Codes:
200 OK: Successfully retrieved the list of tasks.
500 Server Error: An unexpected error occurred.



GET /tasks/:id
Description: Retrieve a specific task by its ID.

Method: GET
URL: http://localhost:3000/tasks/:id (replace :id with the task ID, e.g., 1)
Sample Request:GET http://localhost:3000/tasks/1


Sample Response (Status: 200 OK):{
    "id": 1,
    "title": "Sample Task 1",
    "description": "This is a sample task",
    "completed": false
}


Error Response (Status: 404 Not Found):{
    "message": "Task not found"
}


Status Codes:
200 OK: Successfully retrieved the task.
404 Not Found: Task with the specified ID does not exist.
500 Server Error: An unexpected error occurred.



POST /tasks
Description: Create a new task.

Method: POST
URL: http://localhost:3000/tasks
Request Body (JSON):{
    "title": "New Task",
    "description": "This is a new task description",
    "completed": false
}


Sample Request:POST http://localhost:3000/tasks
Content-Type: application/json

{
    "title": "New Task",
    "description": "This is a new task description",
    "completed": false
}


Sample Response (Status: 201 Created):{
    "id": 3,
    "title": "New Task",
    "description": "This is a new task description",
    "completed": false
}


Error Response (Status: 400 Bad Request):{
    "message": "Title and description are required"
}


Status Codes:
201 Created: Task successfully created.
400 Bad Request: Missing required fields (title or description).
500 Server Error: An unexpected error occurred.



PUT /tasks/:id
Description: Update an existing task by its ID.

Method: PUT
URL: http://localhost:3000/tasks/:id (replace :id with the task ID, e.g., 1)
Request Body (JSON):{
    "title": "Updated Task 1",
    "description": "This is an updated task",
    "completed": true
}


Sample Request:PUT http://localhost:3000/tasks/1
Content-Type: application/json

{
    "title": "Updated Task 1",
    "description": "This is an updated task",
    "completed": true
}


Sample Response (Status: 200 OK):{
    "id": 1,
    "title": "Updated Task 1",
    "description": "This is an updated task",
    "completed": true
}


Error Response (Status: 404 Not Found):{
    "message": "Task not found"
}


Error Response (Status: 400 Bad Request):{
    "message": "Title and description are required"
}


Status Codes:
200 OK: Task successfully updated.
400 Bad Request: Missing required fields (title or description).
404 Not Found: Task with the specified ID does not exist.
500 Server Error: An unexpected error occurred.



DELETE /tasks/:id
Description: Delete a task by its ID.

Method: DELETE
URL: http://localhost:3000/tasks/:id (replace :id with the task ID, e.g., 2)
Sample Request:DELETE http://localhost:3000/tasks/2


Sample Response (Status: 204 No Content):
No response body.


Error Response (Status: 404 Not Found):{
    "message": "Task not found"
}


Status Codes:
204 No Content: Task successfully deleted.
404 Not Found: Task with the specified ID does not exist.
500 Server Error: An unexpected error occurred.




Additional Notes

Data Storage: Tasks are stored in memory (an array). Data will be reset when the server restarts.
Testing: Use Postman or curl to test the API endpoints as described above.
Error Handling: The API includes basic error handling for invalid requests and unexpected issues.

****

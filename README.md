# To-Do List API

A simple yet robust RESTful API for managing a to-do list, built with a focus on professional backend development practices including MVC architecture, Dependency Injection, and caching with Redis.

---

## Features

- ✅ **Create**, **Read**, **Update**, and **Delete** (CRUD) operations for tasks.
- ✅ **MVC Architecture** for clean, scalable, and maintainable code.
- ✅ **Dependency Injection (DI)** pattern for loosely coupled and testable controllers.
- ✅ **Redis Caching** implemented for `GET /todos` route to significantly improve performance.
- ✅ **Cache Invalidation** logic to ensure data consistency after any write operation (Create, Update, Delete).

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Caching:** Redis
- **Environment Variables:** `dotenv`
- **Version Control:** Git & GitHub

---

## API Endpoints

The base URL for the API is `http://localhost:3000`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/todos` | Retrieve all tasks (served from cache if available). |
| `GET` | `/todos/:id` | Retrieve a single task by its ID. |
| `POST` | `/todos` | Create a new task and invalidate the cache. |
| `PUT` | `/todos/:id` | Update an existing task and invalidate the cache. |
| `DELETE`| `/todos/:id` | Delete a task and invalidate the cache. |

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/MR-Ghavidel/todo-api.git](https://github.com/MR-Ghavidel/todo-api.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd todo-api
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your credentials:
    ```
    MONGO_URI=your_mongodb_connection_string
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    ```
5.  Start the server:
    ```bash
    node index.js
    ```
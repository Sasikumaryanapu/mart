# Project Name: Mart
## Description:
The E-Commerce MERN Application is a full-stack application designed to provide a seamless shopping experience. It includes a React frontend built with Vite and Material-UI, a Node.js/Express backend with authentication and authorization features, and uses MongoDB for data storage. Both the client and server are containerized using Docker and orchestrated with Docker Compose.

## Features:
- Authentication & Authorization: Secure login and registration with JWT-based authentication and role-based access control.
- State Management: Utilizes Redux Toolkit for efficient state management and data handling.
- Auto Login: Automatic handling of access and refresh tokens to keep users logged in.
- Responsive Design: Modern and responsive UI built with Material-UI (MUI) for a better user experience.
- E-Commerce Functionality: Features product listings, shopping cart, and checkout functionalities.

## Available Scripts

# Client
### `npm run dev`
To run the application

### `npm run build`
To build the client application for production.

# Server
### `npm start`
To run the server

# Docker
### `docker-compose up`
To start both client and server containers.

## Getting Started
 **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

**Start the Application:**

Ensure Docker and Docker Compose are installed on your system.
   ```bash
   docker-compose up
   ```
This command will build the Docker images if not already built, and start the containers for the client, server, and MongoDB.

**Access the Application:**

- The frontend client will be available at http://localhost:3000.
- The backend server will be accessible at http://localhost:5000.

**Using the Application:**

- Upon launching, you will see the main application interface.
- Users can register, log in, and interact with the e-commerce functionalities including browsing products, managing their cart, and checking out.


## Technologies Used
**Frontend:**

- React: JavaScript library for building user interfaces.
- Vite: Modern build tool for faster development.
- Material-UI (MUI): Component library for a modern UI design.

**Backend:**

- Node.js: JavaScript runtime for building the server-side application.
- Express.js: Web framework for Node.js to handle HTTP requests.
- MongoDB: NoSQL database for data storage.
- JWT: JSON Web Tokens for authentication and authorization.

**Docker:**

- Docker: Container platform for packaging and running the application.
- Docker Compose: Tool for defining and running multi-container Docker applications.

**Docker Setup:**
- Dockerfile (Client and Server): Defines the environment and setup for building client and server images.
- docker-compose.yml: Orchestrates the setup of client, server, and MongoDB services.

**Database**
- MongoDB: Used for storing application data. MongoDB is configured as a service in the Docker Compose setup.

**Database Schema:**

- Users: Collection for user information, including authentication data.
- Products: Collection for product information used in the e-commerce store.
- Cart: Collection for cart records.
- Orders: Collection for order records.

**Troubleshooting**
- Common Issues:
- Ensure Docker and Docker Compose are correctly installed and running.
- Verify that environment variables in .env files are correctly set for both client and server.
- Check Docker logs for any errors during container startup.




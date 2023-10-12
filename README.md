# Fidzulu-classB-books-backend
The backend for class B books

This service is implemented as a separate Node.js project, and making it run on 3034 port.

Running the Services
To run the services, we use the concurrently package to start them concurrently on different ports. Below are the available npm scripts in the main package.json.

clnI: Install dependencies for the main project and all three services.
start: Start the services without auto-reloading.
devStart: Start the services with auto-reloading using nodemon.
test: Run unit tests for all three services concurrently.
You can run these scripts using the following commands:

# Install dependencies for the main project and services
npm run clnI

# Start the services
npm start

# Start the services with auto-reloading
npm run devStart

# Run unit tests for all services
npm test

Circuit Breaker Design
In the application logic of the services, a circuit breaker design is implemented. If DynamoDB fails to connect or experiences issues, the circuit breaker is used to handle and manage these failures gracefully. Circuit breakers help prevent continuous attempts to access a failing service, which can overload the system and result in performance degradation.

DynamoDB
The services use DynamoDB as their NoSQL database. DynamoDB is a fully managed, multi-region, multi-master database that provides consistent single-digit millisecond latency, and offers built-in security, backup and restore, and in-memory caching. DynamoDB is a serverless database, which means that it automatically scales throughput capacity to meet workload demands, and does not require provisioning or managing servers.

Unit Testing and End-to-End Testing
Jasmine is used for unit testing and end-to-end testing. Unit tests are written for each service to test the application logic. End-to-end tests are written for each service to test the API endpoints. The tests are run concurrently using the concurrently package.

Service Specifics
Each service within the project has its own package.json file and dependencies. To manage and deploy each service separately, navigate to the specific service's directory and run the necessary npm scripts.

Service Deployment
Each Service is deployed on AWS EC2 instance. The EC2 instance is a virtual server in Amazon's Elastic Compute Cloud (EC2) for running applications on the AWS infrastructure. Each service runs in a docker container on the EC2 instance. Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. The services are deployed using the following steps:

- **DynamoDB - BookSercvices**: We use DynamoDB to store and manage our book product catalog. You can find the product data for books in the following regions:
   - **India Region**: [DynamoDB Book Catalog - IN](http://3.26.113.102:3034/books/all/IN)
   - **US Region**: [DynamoDB Book Catalog - US](http://3.26.113.102:3034/books/all/US-NC)
   - **Ireland Region**: [DynamoDB Book Catalog - IRELAND](http://3.26.113.102:3034/books/all/IE)

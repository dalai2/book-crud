# Book CRUD Application

This is a full-stack book CRUD application that consists of two parts:
- **Backend**: A NestJS-based API that manages the books.
- **Frontend**: A Next.js-based web interface to interact with the API.

## Requirements

Make sure you have the following installed before proceeding:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application with Docker Compose

### 1. Clone the Repository


git clone https://github.com/dalai2/book-crud.git
cd book-crud
### 2. Build and Run Containers
To build and start both the backend and frontend containers, simply run:

docker-compose up --build

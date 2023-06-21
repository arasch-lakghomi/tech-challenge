# Mapped Request-Response Websocket Server

## Overview
This implementation offers a solution to the following tech problem:
>WebSockets are great for bidirectional client-server communication, but they lack request-response mapping.
>-+ create a module that provides request-response mapping on top of WebSockts. Use ws server side
>-+ create a UI that lets the user experience what you have done

This package consists of a frontend and backend application. The backend application is a WebSocket server that provides a simple in-memory database for all request messages and maps them to responses using unique IDs. The frontend application is a demo UI that sends randomly generated messages to the server and displays the corresponding randomly generated responses. 
It also allows querying the server for the original request message based on the response.

## Features Implemented
- Frontend UI and Backend Server
- Extension of the standard WebSocket server to include the required functionality as a standalone class that can be imported into the application
- Frontend and Backend implemented as separate services, ensuring potential scalability in the future
- Docker Compose file for simplified local hosting

## Out of Scope
- Testing: Initially, an end-to-end (E2E) test with Cypress was planned. However, due to the time required for proper implementation and the relatively weak relevance of the test's validity for this particular application, the E2E test was outscoped.

## Setup Instructions
### Prerequisites
Make sure you have the following prerequisites installed:
- Docker (version 20.10.0 or higher)
- Docker Compose (version 2.3.4 or higher)

### Start the Application
From the terminal, cd into the project root folder and run the following command:
```console
docker-compose up
```

The UI will then be accessible through a web browser on http://localhost.
################### Challenge-Thought-Process WIP ######################

Challenge:
## Async WebSocket RPCs
WebSockets are great for bidirectional client-server communication, but they lack request-response mapping.
+ create a module that provides request-response mapping on top of WebSockts. Use ws server side
+ create a UI that lets the user experience what you have done

General considerations:
- development on main branch as single-person project
- all code will live in monorepo
- FE and BE will be split into seperate services to allow better scalability
- for local development, docker-compose file will be created and use volume binding to provision node_modules. respective npm scripts will be created.
- ideally, Cypress will be used for local E2E testing, if enough time is available, test will be created at the end of implementation.
  however, test scenario definition will be created first to simulate TTD
- ws-server:
  - 
- ui-client:
  - 
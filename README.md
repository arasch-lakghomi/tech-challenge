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


App idea:
Snackbar for waiting/connection/failure.
Snackbar app explanation.
UI will generate 10 random messages.
On user interaction (button) client sends a request for each request to server.
Server will generate specific response (Antwort auf: request1) and id for each request and persist (internally)+ Server will respond to each request within random time between 1-10 seconds (to simulate problem of request-response mapping due to asynchronosity) with this random message & id.
UI will display each response & id in the order it receives them, leading to a different order of responses than the order of requests.
Afterwards on user interaction, it will display the corresponding request for each row

- ui-client:

Request										      Response										Original reguest				
																								

request1										response1			id1							      request3				
																								
request2										response2			id2							      request7				
																								
request3										response3			id3							      request4				
																								
request4										response4			id4							      request8				
						Send requests										    Map to requests								
request5										response5			id5							      request6				
																								
request6										response6			id6							      request1				
																								
request7										response7			id7							      request10				
																								
request8										response8			id8							      request9				
																								
request9										response9			id9							      request2				
																								
request10										response10		id10							      request5				

- Map to requests button will only be active  if Response table full
																								
																								
- ws-server:
  - two events:
    - onMessage(message)
    - onGetRequestById(id): requestType
  - local 'database': Map between generated id to (request: '', response: '')

E2E Test:
- click on send requests
- as soon as map to requests button active: click
- check: portion of request-string in response is identical to the same row entry in original request
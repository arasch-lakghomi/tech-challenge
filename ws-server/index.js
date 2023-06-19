const randomWords = require('random-words');
const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 3000 })

let messageId = 0;
let messageDatabase = new Map();

wss.on("connection", ws => {
    console.log('Client connected');
    
    ws.on("message", message => handleRequest(ws, message));
    ws.on("close", () => console.log("Client disconnected"));
    ws.on("error", () => console.log("Some Error occurred"));
});

function handleRequest(ws, message) {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.event === 'sendRequest') {
        const responseMessage = randomWords();
        const responseTime = (Math.floor(Math.random() * 10) + 1) * 1;//000;
        const id = generateId(); 
        const response = {
            event: 'sendResponse',
            payload: {
                id: id,
                response: responseMessage
            }
        }
        saveMessage(id, parsedMessage, response);
        setTimeout(() => ws.send(JSON.stringify(response)), responseTime);
    }

    if (parsedMessage.event === 'GetById') {
        const { request: req, response: resp }  = getMessage(parsedMessage.payload.id);
        const response = {
            event: 'sendMap',
            payload: {request: req.payload.request, response: resp.payload.response}
        }
        ws.send(JSON.stringify(response));
    }
};

function saveMessage(id, request, response) {
    messageDatabase.set(id, {request: request, response: response});
    return messageDatabase;
};

function getMessage(id) {
    return messageDatabase.get(id);
};

function generateId() {
    return messageId++;
};

console.log("The WebSocket server is running on port 3000");
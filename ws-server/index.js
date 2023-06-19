const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 3000 })

let messageId = 0;
let messageDatabase = new Map();

wss.on("connection", ws => {
    console.log('Client connected');

    ws.on("message", message => {
        console.log(`Received message: ${message}`);
        const response = `Response to request: ${message}`;

        const responseTime = (Math.floor(Math.random() * 10) + 1) * 1000;

        const id = generateId(); 
        saveMessage(id, `${message}`, response);

        setTimeout(() => ws.send(JSON.stringify({ id: id, message: response})), responseTime);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("error", () => {
        console.log("Some Error occurred")
    });
});

function saveMessage(id, request, response) {
    messageDatabase.set(id, {request: request, response: response});
    return messageDatabase;
};

function generateId() {
    return messageId++;
};

console.log("The WebSocket server is running on port 3000");
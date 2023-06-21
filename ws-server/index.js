const randomWords = require('random-words');
const CustomWebSocketServer = require('./custom-websocket-server');

const wss = new CustomWebSocketServer({ port: 3000 });

wss.on("connection", ws => {
    console.log('Client connected');
    
    ws.on("message", message => handleRequest(ws, message));
    ws.on("close", () => handleError());
    ws.on("error", () => handleDisconnect());
});

function handleRequest(ws, message) {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.event === 'sendRequest') {
        const randomResponseMessage = {
            event: 'sendResponse',
            payload: { response: randomWords() }
        }

        wss.sendResponse(ws, parsedMessage, randomResponseMessage)
    }

    if (parsedMessage.event === 'GetById') {
        const { request: req, response: resp }  = wss.getMappedMessages(parsedMessage.payload.id);
        const response = {
            event: 'sendMap',
            payload: {request: req.payload.request, response: resp.payload.response}
        }
        ws.send(JSON.stringify(response));
    }

};

function handleError() {
    console.log("Some Error occurred");
};

function handleDisconnect() {
    console.log("Client disconnected.");
};

console.log("The WebSocket server is running on port 3000");
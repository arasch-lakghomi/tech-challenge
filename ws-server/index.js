const randomWords = require('random-words');
const CustomWebSocketServer = require('./custom-websocket-server');

const wss = new CustomWebSocketServer({ port: 3000 });

wss.on("connection", ws => {
    console.log('Client connected');
    
    ws.on("message", message => _handleRequest(ws, message));
    ws.on("close", () => console.log("Some Error occurred."));
    ws.on("error", () => console.log("Client disconnected."));
});

function _handleRequest(ws, message) {
    const parsedMessage = JSON.parse(message);

    switch (parsedMessage.event) {
        case 'sendRequest':
            const randomResponseMessage = {
                event: 'sendResponse',
                payload: { response: randomWords() }
            }
            wss.sendResponse(ws, parsedMessage, randomResponseMessage);
            break;

        case 'GetById':
            const { request: req, response: resp }  = wss.getMappedMessages(parsedMessage.payload.id);
            const response = {
                event: 'sendMap',
                payload: {request: req.payload.request, response: resp.payload.response}
            }
            ws.send(JSON.stringify(response));
            break;

        default:
            console.log('Client request event unknown.');
      }
};

console.log("The WebSocket server is running on port 3000");
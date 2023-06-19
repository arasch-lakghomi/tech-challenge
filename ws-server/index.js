const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 3000 })

wss.on("connection", ws => {
    console.log('Client connected');
    ws.send(JSON.stringify({ message: 'Welcome, you are connected!' }));

    ws.on("message", message => {
        console.log(`Received message: ${message}`);
        const response = `Response to request: ${message}`;

        const responseTime = (Math.floor(Math.random() * 10) + 1) * 1000;

        setTimeout(() => ws.send(JSON.stringify({ message: response})), responseTime);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("error", () => {
        console.log("Some Error occurred")
    });
});

console.log("The WebSocket server is running on port 3000");
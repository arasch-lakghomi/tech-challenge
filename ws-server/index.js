const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 3000 })

wss.on("connection", ws => {
    console.log("new client connected");
    ws.send('Welcome, you are connected!');

    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });

    ws.on("close", () => {
        console.log("the client has connected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

console.log("The WebSocket server is running on port 3000");
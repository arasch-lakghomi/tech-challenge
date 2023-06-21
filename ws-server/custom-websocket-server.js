const WebSocketServer = require('ws');

class CustomWebSocketServer extends WebSocketServer.Server {

    constructor(options) {
        super(options);
        this.messageId = 0;
        this.messageDatabase = new Map();
    }

    _generateId() {
        return this.messageId++;
    }

    _saveMessageAndGetId(requestMessage, responseMessage) {
        const id = this._generateId();
        this.messageDatabase.set(id, { request: requestMessage, response: responseMessage });

        return id;
    }

    sendResponse(ws, requestMessage, responseMessage) {
        const id = this._saveMessageAndGetId(requestMessage, responseMessage);

        const responseMessageWithId = {
            ...responseMessage,
            payload: {
                ...responseMessage.payload,
                id: id
            }
        };

        const responseTime = (Math.floor(Math.random() * 10) + 1) * 1000;  // simulate async websocket response
        setTimeout(() => ws.send(JSON.stringify(responseMessageWithId)), responseTime);
    }
    
    getMappedMessages(id) {
        return this.messageDatabase.get(id);
    }
    
}

module.exports = CustomWebSocketServer;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5501 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received message:', message.toString());

        // Echo the received message back to the client
        ws.send(message.toString());

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started at ws://localhost:5501');

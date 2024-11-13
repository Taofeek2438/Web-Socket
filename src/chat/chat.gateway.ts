// import { Logger } from "@nestjs/common";
// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from "@nestjs/websockets";

// import { Server } from "socket.io";

// @WebSocketGateway()
// export class ChatGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   private readonly logger = new Logger(ChatGateway.name);

//   @WebSocketServer() io: Server;

//   afterInit() {
//     this.logger.log("Initialized");
//   }

//   handleConnection(client: any, ...args: any[]) {
//     const { sockets } = this.io.sockets;

//     this.logger.log(`Client id: ${client.id} connected`);
//     this.logger.debug(`Number of connected clients: ${sockets.size}`);
//   }

//   handleDisconnect(client: any) {
//     this.logger.log(`Cliend id:${client.id} disconnected`);
//   }

//   @SubscribeMessage("ping")
//   handleMessage(client: any, data: any) {
//     this.logger.log(`Message received from client id: ${client.id}`);
//     this.logger.debug(`Payload: ${data}`);
//     return {
//       event: "pong",
//       data,
//     };
//   }
// }
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (modify for production)
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('welcome', 'Welcome to the WebSocket server!');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any) {
    console.log('Message received:', data);
    this.server.emit('receiveMessage', data);
  }
}

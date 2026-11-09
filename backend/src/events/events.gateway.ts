import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: ['https://localhost:8443','http://localhost:5173'], // ajouter 'https://adress_du_site.com', 
        credentials: true,
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket): void {
        this.server.emit('room', client.id + ' joined') 
    }

    handleDisconnect(client: Socket): void {
        this.server.emit('room', client.id + ' left')
    }

    @SubscribeMessage('customName')
    handleMessage(client: Socket, message: any): void {
        this.server.emit('room',`[${client.id}] -> ${message}`);
    }

    @SubscribeMessage('events')
    handleEvent(
        @MessageBody() data: unknown,
        //@ConnectedSocket() client: Socket,
     ): WsResponse<unknown> {
        // id === messageBody.id
        const event = 'events';
        return { event, data };
    }
}
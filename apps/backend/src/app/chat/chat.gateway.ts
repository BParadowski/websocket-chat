import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server = new Server();
  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() data: string): string {
    this.logger.log(data);
    this.server.emit('chat', data + 'from the server :D');
    return data;
  }
}

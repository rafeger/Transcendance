import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

// link Socket to user, specially useful to identify same user opening multiple windows

@Injectable()
export class SocketRegistryService {
  private readonly logger = new Logger(SocketRegistryService.name);
  private readonly users = new Map<number, Set<Socket>>();

  // create set if doesn't exist yet
  add(userId: number, client: Socket): void {
    let sockets = this.users.get(userId);
    if (!sockets) {
      sockets = new Set<Socket>();
      this.users.set(userId, sockets);
    }
    sockets.add(client);
    this.logger.debug(`Registry: +1 socket for user=${userId}
             (total:${this.count(userId)})`);
  }

  //delete socket
  remove(userId: number, client: Socket): void {
    const sockets = this.users.get(userId);
    if (!sockets) return;
    sockets.delete(client);
    if (sockets.size === 0) {
      this.users.delete(userId);
      this.logger.log(`Registry: user=${userId} completely disconnected`);
    }
  }

  getSockets(userId: number): Socket[] {
    return [...(this.users.get(userId) ?? [])];
  }

  count(userId: number): number {
    return this.users.get(userId)?.size ?? 0;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

// link Socket to user, specially useful to identify same user opening multiple windows

@Injectable()
export class SocketRegistryService {
    private readonly logger = new Logger(SocketRegistryService.name);
    private readonly users = new Map<string, Set<Socket>>();

    // create set if doesn't exist yet
    add(userId: string, client: Socket): void {
        if (!this.users.has(userId)) {
            this.users.set(userId, new Set())
        }
        this.users.get(userId).add(client);
        this.logger.debug(`Registry: +1 socket for user=${userId}
             (total:${this.count(userId)})`)
    }

    //delete socket
    remove(userId: string, client: Socket): void {
        const sockets = this.users.get(userId);
        if (!sockets)
            return;
        sockets.delete(client);
        if (sockets.size === 0) {
            this.users.delete(userId);
            this.logger.log(`Registry: user=${userId} completely disconnected`);
        }
    }

    getSockets(userId: string): Socket[] {
        return [...(this.users.get(userId) ?? [])];
    }

    count(userId: string): number {
        return this.users.get(userId)?.size ?? 0;
    }
}
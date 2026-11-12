import { createContext } from "react";
import type { Room, Player } from "../types/room";

export type RoomContextType = {
    rooms: Room[];
    createRoom: (
        name: string,
        maxPlayers: number
    ) => Room;
    joinRoom: (code: string) => Room | null;
    leaveRoom: (code: string) => void;
    removePlayer: (code: string, playerId: string) => boolean;
    startRoom: (code: string) => boolean;
    getRoom: (code: string) => Room | undefined;
    currentPlayer: Player;
};

export const RoomContext = createContext<RoomContextType | undefined>(undefined);
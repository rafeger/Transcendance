import { createContext } from "react";
import type { Room } from "../types/room";

export type RoomContextType = {
    rooms: Room[];
    createRoom: (
        name: string,
        maxPlayers: number
    ) => Room;
    joinRoom: (code: string) => Room | null;
    getRoom: (code: string) => Room | undefined;
};

export const RoomContext = createContext<RoomContextType | undefined>(undefined);
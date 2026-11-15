import { useState, type ReactNode } from "react";
import { RoomContext } from "./RoomContext";
import type { Room, Player } from "../types/room";

const initialRooms: Room[] = [
    {
        id: "1",
        code: "QUIZ42",
        name: "General Knowledge",
        host: "PlayerOne",
        players: [
            {
                id: "p1",
                username: "PlayerOne",
                avatar: "/avatars/player1.png",
                isHost: true,
                isReady: true,
            },
            {
                id: "p2",
                username: "PlayerTwo",
                avatar: "/avatars/player2.png",
                isHost: false,
                isReady: false,
            },
        ],
        maxPlayers: 4,
        status: "waiting",
    },
    {
        id: "2",
        code: "QUIZ99",
        name: "General",
        host: "PlayerOne",
        players: [
            {
                id: "p1",
                username: "PlayerOne",
                avatar: "/avatars/player1.png",
                isHost: true,
                isReady: true,
            },
            {
                id: "p2",
                username: "PlayerTwo",
                avatar: "/avatars/player2.png",
                isHost: false,
                isReady: true,
            },
        ],
        maxPlayers: 3,
        status: "waiting",
    },
];

export function RoomProvider({ children }: { children: ReactNode }) {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);

    const [currentPlayer] = useState<Player>(() => ({
        id: crypto.randomUUID(),
        username: "You",
        avatar: "/avatars/default.png",
        isHost: false,
        isReady: false,
    }));

    function createRoom(name: string, maxPlayers: number): Room {
        const newRoom: Room = {
            id: crypto.randomUUID(),
            code: crypto.randomUUID().slice(0, 6).toUpperCase(),
            name,
            host: currentPlayer.username,
            players: [
                {
                    ...currentPlayer,
                    isHost: true,
                },
            ],
            maxPlayers,
            status: "waiting",
        };

        setRooms((currentRooms) => [...currentRooms, newRoom]);
        return (newRoom);
    }

    function joinRoom(code: string): Room | null {
        const room = getRoom(code);
        if (!room || room.status !== "waiting") {
            return (null);
        }

        const alreadyJoined = room.players.some(
            (player) => player.id === currentPlayer.id
        );
        if (alreadyJoined) {
            return (room);
        }
        if (room.players.length >= room.maxPlayers) {
            return (null);
        }

        const updatedRoom: Room = {
            ...room, players: [ ...room.players, currentPlayer ],
        };
        setRooms((currentRooms) => currentRooms.map((currentRoom) => 
        currentRoom.id === room.id ? updatedRoom : currentRoom));
        return (updatedRoom);
    }

    function leaveRoom(code: string) {
        const room = getRoom(code);
        if (!room) return ;

        const remainingPlayers = room.players.filter(
            (player) => player.id !== currentPlayer.id
        );
        if (room.players.some((player) => player.id === currentPlayer.id && player.isHost)) {
            setRooms((currentRooms) => currentRooms.filter((currentRoom) => currentRoom.id !== room.id));
            return ;
        }
        setRooms((currentRooms) =>
            currentRooms.map((currentRoom) =>
                currentRoom.id === room.id
                    ? { ...currentRoom, players: remainingPlayers }
                    : currentRoom
            )
        );
    }

    function removePlayer(code: string, playerId: string): boolean {
        const room = getRoom(code);
        if (!room) return (false);

        const isHost = room.players.some(
            (player) => player.id === currentPlayer.id && player.isHost
        );
        if (!isHost || playerId === currentPlayer.id) {
            return (false);
        }
        const updatedPlayers = room.players.filter(
            (player) => player.id !== playerId
        );
        setRooms((currentRooms) =>
            currentRooms.map((currentRoom) =>
                currentRoom.id === room.id
                    ? { ...currentRoom, players: updatedPlayers }
                    : currentRoom));
        return (true);
    }

    function startRoom(code: string): boolean {
        const room = getRoom(code);

        if (!room || room.status !== "waiting") return (false);

        const isHost = room.players.some(
            (player) => player.id === currentPlayer.id && player.isHost
        );

        const allPlayersReady = room?.players.every(
            (player) => player.isReady
        );

        if (!isHost || room.players.length < 2 || !allPlayersReady) {
            return (false);
        }
        setRooms((currentRooms) =>
            currentRooms.map((currentRoom) =>
                currentRoom.id === room.id
                    ? { ...currentRoom, status: "waiting" }
                    : currentRoom));
        return (true);
    }

    function getRoom(code: string) {
        return (rooms.find((room) => room.code === code.toUpperCase()));
    }

    function toggleReady(code: string) {
        setRooms((currentRooms) => 
            currentRooms.map((room) => {
                if (room.code !== code) return (room);

                return {
                    ...room,
                    players: room.players.map((player) =>
                        player.id === currentPlayer.id ?
                            { ...player, isReady: !player.isReady}
                            : player),
                };
            }));
    }

    return (
        <RoomContext.Provider value={{ rooms, createRoom, joinRoom, leaveRoom,
        removePlayer, startRoom, getRoom, currentPlayer, toggleReady, }}>
            {children}
        </RoomContext.Provider>
    );
}
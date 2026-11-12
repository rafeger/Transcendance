export type Room = {
    id: string;
    code: string;
    name: string;
    host: string;
    players: Player[];
    maxPlayers: number;
    status: "waiting" | "playing";
};

export type Player = {
    id: string;
    username: string;
    isHost: boolean;
};
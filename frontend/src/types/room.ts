export type Room = {
    id: string;
    code: string;
    host: string;
    players: number;
    maxPlayers: number;
    status: "waiting" | "playing";
}
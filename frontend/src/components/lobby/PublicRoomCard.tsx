import type { Room } from "../../types/room";

type Props = {
    room: Room;
    onJoin: (code: string) => void;
};

export default function PublicRoomCard({ room, onJoin }: Props) {
    const isFull = room.players.length >= room.maxPlayers;
    const canJoin = room.status === "waiting" && !isFull;

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{room.name}</h3>
                <span className="text-sm text-green-400">
                    {room.status === "waiting" ? "Waiting" : "Playing"}
                </span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>Host: {room.host}</span>
                <span>{room.players.length}/{room.maxPlayers} players</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">Code: {room.code}</p>

            <button onClick={() =>onJoin(room.code)}
            disabled={!canJoin}
            className="mt-4 w-full rounded-lg border border-white/20 bg-blue-600 py-2
            hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40">
                {isFull ? "Room Full" : room.status === "playing" ? "Game started"
                : "Join Room"}
            </button>
        </div>
    );
}
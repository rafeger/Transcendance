import type { Room } from "../../types/room";

type Props = {
    room: Room;
    onJoin: (code: string) => void;
};

export default function PublicRoomCard({ room, onJoin }: Props) {
    const isFull = room.players >= room.maxPlayers;
    const canJoin = room.status === "waiting" && !isFull;

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{room.code}</h3>
                <span className="text-sm text-green-400">
                    {room.status === "waiting" ? "Waiting" : "Playing"}
                </span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>Host: {room.host}</span>
                <span>{room.players}/{room.maxPlayers} players</span>
            </div>

            <button onClick={() =>onJoin(room.code)}
            disabled={!canJoin}
            className="mt-4 w-full rounded-lg border border-white/20 bg-blue-600 p-2">
                {isFull ? "Room Full" : "Join room"}
            </button>
        </div>
    );
}
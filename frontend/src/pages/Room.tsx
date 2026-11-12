
import { useParams, useNavigate } from "react-router-dom";
import { useRoom } from "../contexts/useRoom";

function Room() {
    const { code } = useParams();
    const navigate = useNavigate();

    const {
        getRoom,
        currentPlayer,
        leaveRoom,
        removePlayer,
        startRoom,
    } = useRoom();

    const room = code ? getRoom(code) : undefined;

    if (!room) {
        return (
            <main className="min-h-screen bg-slate-950 p-10 text-white">
                <p>Room not found.</p>
                <button onClick={() => navigate("/lobby")}>
                    Back to Lobby
                </button>
            </main>
        );
    }

    const currentRoom = room;

    const isHost = room.players.some(
        (player) => player.id === currentPlayer.id && player.isHost
    );

    function handleLeaveRoom() {
        leaveRoom(currentRoom.code);
        navigate("/lobby");
    }

    function handleRemovePlayer(playerId: string) {
        const success = removePlayer(currentRoom.code, playerId);

        if (!success) {
            alert("Unable to remove this player.");
        }
    }

    function handleStartGame() {
        const success = startRoom(currentRoom.code);

        if (!success) {
            alert("You cannot start this game.");
            return;
        }

        alert("Game started!");
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-3xl">

                <h1 className="text-center text-4xl font-bold">
                    Waiting Room
                </h1>

                <p className="mt-4 text-center text-slate-400">
                    Room code: {room.code}
                </p>

                <section className="mt-10 rounded-2xl bg-indigo-900 p-6">

                    {/* Room information */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            {room.name}
                        </h2>

                        <span className="text-green-400">
                            {room.status}
                        </span>
                    </div>

                    <p className="mt-4 text-slate-300">
                        Host: {room.host}
                    </p>

                    {/* Players list */}
                    <h3 className="mt-8 text-xl font-semibold">
                        Players ({room.players.length}/{room.maxPlayers})
                    </h3>

                    <div className="mt-5 space-y-3">
                        {room.players.map((player) => (
                            <div
                                key={player.id}
                                className="flex items-center justify-between rounded-lg bg-indigo-950 p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span>{player.username}</span>

                                    {player.isHost && (
                                        <span className="text-yellow-400">
                                            Host
                                        </span>
                                    )}
                                </div>

                                {isHost && !player.isHost && (
                                    <button
                                        onClick={() => handleRemovePlayer(player.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Start game */}
                    {isHost && (
                        <button
                            onClick={handleStartGame}
                            disabled={room.players.length < 2}
                            className="mt-8 w-full rounded-lg bg-green-600 py-3 font-semibold hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Start Game
                        </button>
                    )}

                    {/* Leave room */}
                    <button
                        onClick={handleLeaveRoom}
                        className="mt-3 w-full rounded-lg border border-white/20 py-3 hover:bg-red-600"
                    >
                        Leave Room
                    </button>

                </section>
            </div>
        </main>
    );
}

export default Room;

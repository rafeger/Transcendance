import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Player = {
    id: string;
    username: string;
    isHost: boolean;
};

function Room() {
    const { code } = useParams();
    const navigate = useNavigate();

    const [players, setPlayers] = useState<Player[]>([
        {
            id: "1",
            username: "PlayerOne",
            isHost: true,
        },
        {
            id: "2",
            username: "PlayerTwo",
            isHost: false,
        },
    ]);

    const maxPlayers = 4;

    function handleAddPlayer() {
        if (players.length >= maxPlayers) {
            alert("The room is full");
            return ;
        }

        const newPlayer: Player = {
            id: crypto.randomUUID(),
            username: `Player${players.length + 1}`,
            isHost: false,
        };

        setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
    }

    function handleRemovePlayer(id: string) {
        setPlayers((currentPlayers) => currentPlayers.filter((player) => player.id !== id));
    }

    function handleLeaveRoom() {
        navigate("/lobby");
    }

    function handleStartGame() {
        if (players.length < 2) {
            alert("You need at least 2 players.");
            return ;
        }
        console.log("Game started!");
    }
    
    const isHost = players.some((player) => player.isHost);

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-center text-4xl font-bold">Waiting Room</h1>
                <p className="mt-4 text-center text-slate-400">Room code: {code}</p>

                <section className="mt-10 rounded-2xl border border-white/20
                bg-indigo-900 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Players({players.length}/{maxPlayers})</h2>
                        <span className="text-white">Waiting</span>
                    </div>

                    <div className="mt-6 space-y-3">
                        {players.map((player) => (
                            <div key={player.id} className="flex items-center
                            justify-between rounded-lg bg-indigo-950 p-4">
                                <div className="flex items-center gap-3">
                                    <span>{player.username}</span>
                                    {player.isHost && (
                                        <span className="text-yellow-400">Host</span>
                                    )}
                                </div>

                                {!player.isHost && (
                                    <button onClick={() => handleRemovePlayer(player.id)}
                                    className="text-red-400 hover:text-red-300">Remove</button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button onClick={handleAddPlayer} disabled={players.length >= maxPlayers}
                    className="mt-6 w-full rounded-lg border border-white/20 p-3 bg-blue-500
                    hover:bg-blue-600">Add player</button>

                    {isHost && (
                        <button onClick={handleStartGame} disabled={players.length < 2} 
                        className="mt-6 w-full rounded-lg bg-green-600 py-3 
                        hover:bg-green-500">Start Game</button>
                    )}

                    <button onClick={handleLeaveRoom} className="mt-3 w-full rounded-lg
                    border border-white/20 py-3 hover:bg-red-600">Leave Room</button>
                </section>
            </div>
        </main>
    );
}

export default Room;
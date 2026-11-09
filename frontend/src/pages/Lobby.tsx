import { useState } from "react";
import type { Room } from "../types/room";
import PublicRoomCard from "../components/lobby/PublicRoomCard";
import { useNavigate } from "react-router-dom";
import CreateRoomForm from "../components/lobby/CreateRoomForm";

function Lobby() {
    const navigate = useNavigate();
    const [codeQuiz, setCodeQuiz] = useState("");

    const [rooms, setRooms] = useState<Room[]>([
        {
            id: "1",
            code: "QUIZ42",
            name: "General knowledge",
            host: "PlayerOne",
            players: 2,
            maxPlayers: 4,
            status: "waiting",
        },
        {
            id: "2",
            code: "ABC123",
            name: "Video Games",
            host: "PlayerTwo",
            players: 3,
            maxPlayers: 6,
            status: "waiting",
        },
    ]);

    function handleJoinLobby(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (codeQuiz.trim() === "") {
            alert("Please enter a quiz code.");
            return ;
        }
        console.log("Quiz code: ", codeQuiz);
    }

    function handleRoom(code: string) {
        const room = rooms.find((room) => room.code === code);
        if (!room) {
            alert("Room not found.");
            return ;
        }
        if (room.status !== "waiting") {
            alert("This room is already playing.");
            return ;
        }
        if (room.players >= room.maxPlayers) {
            alert("This room is full.");
            return ;
        }
        navigate(`/room/${room.code}`);
    }

    function handleCreateRoom(name: string, maxPlayers: number) {
        const code = crypto.randomUUID().slice(0, 6).toUpperCase();
        const newRoom: Room = {
            id: crypto.randomUUID(),
            code, name, host: "You", players: 1, maxPlayers, status: "waiting",
        };

        setRooms((currentRooms) => [...currentRooms, newRoom]);
        navigate(`/room/${newRoom.code}`);
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <div className="mx-auto max-w-3xl">
            <h1 className="text-center text-4xl font-bold">Lobby Quiz Arena</h1>
                <p className="text-center mt-4 text-slate-400">Join your friends be ready to play!</p>
            </div>

            <section className="mt-10 rounded-2xl border border-white/20 bg-indigo-950 p-6">
                <CreateRoomForm onCreate={handleCreateRoom} />
            </section>

            <section className="mt-6 rounded-2xl border border-white/10 bg-indigo-900 p-4 w-100 mx-auto">
                <h2 className="text-2xl font-semibold text-center">Join a room</h2>

                <form onSubmit={handleJoinLobby} className="mt-6 space-y-4">
                    <input type="text" placeholder="Enter the quiz code" value={codeQuiz.toUpperCase()}
                    onChange={(event) =>setCodeQuiz(event.target.value)}
                    className="outline-none w-50 rounded-lg border border-white/50 bg-indigo-950
                    px-6 py-1 placeholder:text-slate-500 focus:border-blue-500"></input>

                    <button type="submit" className="w-20 py-1 rounded-lg border 
                    border-white/50 hover:bg-blue-500">Join</button>
                </form>
            </section>

            <section className="mx-auto mt-12 max-w-3xl">
                <h2 className="mb-6 text-2xl font-bold">Public Rooms</h2>
                <div className="grid gap-4 md:grod-cols-2">
                    {rooms.map((room) => (<PublicRoomCard key={room.id}
                    room={room} onJoin={handleRoom} />))}
                </div>
            </section>
        </main>
    );
}

export default Lobby;
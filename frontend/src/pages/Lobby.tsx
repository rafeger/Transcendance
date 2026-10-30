import { useState } from "react";

function Lobby() {
    const [codeQuiz, setCodeQuiz] = useState("");

    function handleJoinLobby(event: React.SubmitEvent) {
        event.preventDefault();

        if (codeQuiz.trim() === "") {
            alert("Please enter a quiz code.");
            return ;
        }
        console.log("Quiz code: ", codeQuiz);
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <div className="mx-auto max-w_3xl">
            <h1 className="text-center text-4xl font-bold">Lobby Quiz Arena</h1>
                <p className="text-center mt-4 text-slate-400">Join your friends be ready to play!</p>
            </div>

            <section className="mt-6 rounded-2xl border border-white/10 bg-indigo-900 p-2">
                <h2 className="text-2xl font-semibold text-center">Join a room</h2>

                <form onSubmit={handleJoinLobby} className="mt-6 space-y-4">
                    <input type="text" placeholder="Enter the quiz room"
                    onChange={(event) =>setCodeQuiz(event.target.value)}
                    className="outline-none w-50 rounded-lg border border-white/50 bg-indigo-950
                    px-6 py-1 placeholder:text-slate-500 focus:border-blue-500"></input>

                    <button type="submit" className="w-20 py-1 rounded-lg border border-white/50 hover:bg-blue-500">Join</button>
                </form>
            </section>
        </main>
    );
}

export default Lobby;
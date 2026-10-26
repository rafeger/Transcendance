import React, { useState } from "react";

type Friend = {
    id: number;
    username: string;
    online: boolean;
};

function Friends() {
    const [friends, setFriends] = useState<Friend[]>([
        {id: 1, username: "Thomas", online: true},
        {id: 2, username: "Raph", online: false},
    ]);

    const [username, setUsername] = useState("");
    const [error,setError] = useState("");

    function handleAddFriend(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = username.trim();
        if (!name) {
            setError("Error! Enter a username");
            return ;
        }

        const alreadyExist = friends.some((friend) =>
            friend.username.toLowerCase() === name.toLowerCase());
        if (alreadyExist) {
            setError("Username already exists");
            return ;
        }

        const newFriend: Friend = {
            id: Date.now(),
            username: name,
            online: false,
        };

        setFriends((currentFriends) => [...currentFriends, newFriend]);
        setUsername("");
        setError("");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <div className="mx-auto max-w_3xl">
                <h1 className="text-3xl font-bold">My Friends</h1>
            </div>

            <section className="mt-8 rounded-2xl border border-white/20 bg-slate-900 p-4">
                <h2 className="text-xl font-semibold">Add a friend</h2>

                <form onSubmit={handleAddFriend} className="mt-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input type="text" value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username" className="min-w-0 flex-1 rounded-lg
                        border border-white/20 bg-slate-950 placeholder: outline-none
                        focus:border-blue-500"/>

                        <button type="submit" className="rounded-lg bg-blue-600 px-5 py-1 
                        transition hover:bg-blue-500">
                            <span className="inline-flex items-center gap-2">Add</span>
                        </button>
                    </div>

                    {error && (
                        <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>
                    )}
                </form>
            </section>

            <section className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My friends list</h2>
                    <span className="text-sm text-slate-400">{friends.length} ami(s)</span>
                </div>

                <div className="mt-4 space-y-3">
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold">{friend.username}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Friends;
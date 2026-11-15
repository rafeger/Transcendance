import { useState, type SubmitEvent } from "react";

type CreateRoomProps = {
    onCreate: (
        name: string,
        maxPlayers: number,
    ) => void;
};

function CreateRoomForm({ onCreate }: CreateRoomProps) {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(4);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim()) {
            alert("Please enter a name.");
            return;
        }
        onCreate(name.trim(), maxPlayers);
    }

    return (
        <section className="">
            <h2 className="text-2xl font-bold">Create a Room</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    value={name} 
                    placeholder="Room Name"
                    onChange={(event) => setName(event.target.value)}
                    className="mt-6 w-full rounded-lg border border-white/20 bg-indigo-950 px-3 py-2" 
                />

                <select value={maxPlayers}
                onChange={(event) => setMaxPlayers(Number(event.target.value))}
                className="rounded-lg border border-white/20 bg-indigo-950 px-3 py-2">
                    <option value={2}>2 players</option>
                    <option value={3}>3 players</option>
                    <option value={4}>4 players</option>
                    <option value={5}>5 players</option>
                    <option value={6}>6 players</option>
                </select>

                <button type="submit" className="w-full rounded-lg bg-green-600 py-2
                font-semibold hover:bg-green-500">Create Room</button>
            </form>
        </section>
    );
}

export default CreateRoomForm;
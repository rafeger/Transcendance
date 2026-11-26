import { useState, type SubmitEvent } from "react";
import { Input, Button } from "../ui";

type CreateRoomProps = {
    onCreate: (
        name: string,
        maxPlayers: number,
    ) => void;
};

function CreateRoomForm({ onCreate }: CreateRoomProps) {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [error, setError] = useState("");

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const roomName = name.trim();

        if (!roomName) {
            setError("Please enter a room name!");
            return;
        }
        setError("");
        onCreate(roomName, maxPlayers);
    }

    return (
        <section>
            <h2 className="text-2xl font-bold">Create a Room</h2>
            <p className="mt-2 text-sm text-muted">
                Create a room and invite your friends to play
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <label htmlFor="roomName" className="mb-2 block text-sm font-medium">
                        Room name
                    </label>

                    <Input label="" id="roomName" type="text" value={name}
                    placeholder="Enter a room name"
                    onChange={(e) => setName(e.target.value)} />

                    {error && (
                        <p className="mt-2 text-sm text-error">{error}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="maxPlayers" className="mb-2 block text-sm font medium">
                        Maximum players
                    </label>

                    <select id="maxPlayers" value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-surface
                    px-3 py-2 text-fg">{[2, 3, 4, 5, 6].map((number) => (
                        <option key={number} value={number}>
                            {number} players
                        </option>
                    ))}
                    </select>
                </div>

                <div className="justify-end">
                    <Button type="submit" variant="primary" size="md">
                        Create a room
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default CreateRoomForm;
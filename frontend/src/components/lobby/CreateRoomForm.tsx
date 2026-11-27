import { useState, type SubmitEvent } from "react";
import { Input, Button, Select } from "../ui";

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
            <p className="mt-2 text-sm">
                Create a room and invite your friends to play
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <Input label="Room name" id="roomName" type="text" value={name}
                    placeholder="Enter a room name"
                    onChange={(e) => setName(e.target.value)} />

                    {error && (
                        <p className="mt-2 text-sm text-error">{error}</p>
                    )}
                </div>

                <div>
                    <Select label='Maximum players'
                    value={maxPlayers}
                    onChange={(event) => setMaxPlayers(Number(event.target.value))}>
                        <option value={2}>2 players</option>
                        <option value={3}>3 players</option>
                        <option value={4}>4 players</option>
                        <option value={5}>5 players</option>
                        <option value={6}>6 players</option>
                    </Select>
                    
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
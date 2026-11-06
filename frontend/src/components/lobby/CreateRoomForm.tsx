import { useState, type SubmitEvent } from "react";

type CreateRoomProps = {
    onCreate: (
        name: string,
        maxPlayers: number,
    ) => void;
};

function createRoomForm({ onCreate }: CreateRoomProps) {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(4);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim()) {
            alert("Please enter a name.");
            return ;
        }
        onCreate(name.trim(), maxPlayers);
    }

    return (
        <section className="">
            <h2 className="text-2xl font-bold">Create a Room</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input ></input>
            </form>
        </section>
    );
}
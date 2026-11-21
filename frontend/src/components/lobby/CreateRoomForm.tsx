import { useState, type SubmitEvent } from 'react';
import { Button, Input, Select } from '../ui';

type CreateRoomProps = {
  onCreate: (name: string, maxPlayers: number) => void;
};

function CreateRoomForm({ onCreate }: CreateRoomProps) {
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [error, setError] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const roomName = name.trim();
    if (!roomName) {
      setError('Please enter a room name!');
      return;
    }
    setError('');
    onCreate(roomName, maxPlayers);
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Create a Room</h2>
      <p className="mt-2 text-sm text-muted">
        Create a room and invite your friends to play
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="Room name"
          type="text"
          value={name}
          placeholder="Enter a room name"
          onChange={(e) => setName(e.target.value)}
          error={error || undefined}
        />

        <Select
          label="Maximum players"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6].map((number) => (
            <option key={number} value={number}>
              {number} players
            </option>
          ))}
        </Select>

        <Button type="submit" className="w-full">
          Create Room
        </Button>
      </form>
    </section>
  );
}

export default CreateRoomForm;

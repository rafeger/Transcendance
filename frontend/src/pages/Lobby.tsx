import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicRoomCard from '../components/lobby/PublicRoomCard';
import CreateRoomForm from '../components/lobby/CreateRoomForm';
import { useRoom } from '../contexts/useRoom';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Card, Input } from '../components/ui';

function Lobby() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [codeQuiz, setCodeQuiz] = useState('');
  const { rooms, createRoom, joinRoom } = useRoom();

  function handleJoinLobby(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const code = codeQuiz.trim();
    if (!code) {
      return;
    }

    const room = joinRoom(code);
    if (!room) {
      alert('Room not found, full or already started!');
      return;
    }
    navigate(`/room/${room.code}`);
  }

  function handleRoom(code: string) {
    const room = joinRoom(code);
    if (!room) {
      alert('This room cannot be joined!');
      return;
    }
    navigate(`/room/${room.code}`);
  }

  function handleCreateRoom(name: string, maxPlayers: number) {
    const newRoom = createRoom(name, maxPlayers);
    navigate(`/room/${newRoom.code}`);
  }

  return (
    <main
      className={`min-h-screen px-4 py-16 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-bold">Lobby Quiz Arena</h1>
        <p className="mt-4 text-center text-muted">
          Join your friends be ready to play!
        </p>
      </div>

      <section className="mx-auto mt-10 max-w-3xl">
        <Card padding="lg">
          <CreateRoomForm onCreate={handleCreateRoom} />
        </Card>
      </section>

      <section className="mx-auto mt-6 max-w-xl">
        <Card as="article" padding="lg" className="text-center">
          <h2 className="text-2xl font-bold">Join a Room</h2>
          <p className="mt-2 text-sm text-muted">
            Enter the quiz code to join your friends
          </p>

          <form
            onSubmit={handleJoinLobby}
            className="mt-6 flex flex-col gap-4 text-left sm:flex-row sm:items-end"
          >
            <Input
              label="Quiz code"
              type="text"
              placeholder="Enter the quiz code"
              value={codeQuiz}
              onChange={(e) => setCodeQuiz(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Join a room</Button>
          </form>
        </Card>
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Public Rooms</h2>
          <span className="text-sm text-muted">
            {rooms.length} rooms available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {rooms.map((room) => (
            <PublicRoomCard key={room.id} room={room} onJoin={handleRoom} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Lobby;

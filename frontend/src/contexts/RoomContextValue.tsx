import { useState, type ReactNode, useEffect } from 'react';
import { RoomContext } from './RoomContext';
import type { Room, Player } from '../types/room';
import { socket } from '../lib/socket';



const initialRooms: Room[] = [
  {
    id: '1',
    code: 'QUIZ42',
    name: 'General Knowledge',
    host: 'PlayerOne',
    players: [
      {
        id: 'p1',
        username: 'PlayerOne',
        avatar: '/avatars/player1.png',
        isHost: true,
        isReady: true,
        connected: true,
      },
      {
        id: 'p2',
        username: 'PlayerTwo',
        avatar: '/avatars/player2.png',
        isHost: false,
        isReady: false,
        connected: false,
      },
    ],
    maxPlayers: 4,
    status: 'waiting',
  },
  {
    id: '2',
    code: 'QUIZ99',
    name: 'General',
    host: 'PlayerOne',
    players: [
      {
        id: 'p1',
        username: 'PlayerOne',
        avatar: '/avatars/player1.png',
        isHost: true,
        isReady: true,
        connected: true,
      },
      {
        id: 'p2',
        username: 'PlayerTwo',
        avatar: '/avatars/player2.png',
        isHost: false,
        isReady: true,
        connected: true,
      },
    ],
    maxPlayers: 3,
    status: 'waiting',
  },
];

export function RoomProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const [rooms, setRooms] = useState<Room[]>(() => {
    const savedRooms = sessionStorage.getItem('rooms');
    if (!savedRooms) return initialRooms;

    try {
      return JSON.parse(savedRooms) as Room[];
    }
    catch {
      return initialRooms;
    }
  });

  useEffect(() => {
    sessionStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);


  const [currentPlayer] = useState<Player>(() => {

    let playerId = sessionStorage.getItem('playerId');

    if (!playerId || playerId.length !== 36) {
      playerId = crypto.randomUUID();
      sessionStorage.setItem('playerId', playerId);
    }

    return {
      id: playerId,
      username: 'You',
      avatar: '/avatars/default.png',
      isHost: false,
      isReady: false,
      connected: true,
    };
  });

  // listen to socket.io: connection + resynchronisation to room
  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);

      const activeRoomCode = sessionStorage.getItem('activRoom');
      if (activeRoomCode) {
        socket.emit('sync_room', { code: activeRoomCode});
      }
    };

    const onDisconnect = () => {
      setIsConnected(false); // déclenche bandeau "Reconnection..."
    };

    const onRoomList = (serverRooms: Room[]) => {
      setRooms(serverRooms);
    };

    const onRoomUpdated = (updatedRoom: Room) => {
      setRooms((prev) => {
        const exists = prev.some((r) => r.code === updatedRoom.code);
        return exists
        ? prev.map((r) => (r.code === updatedRoom.code ? updatedRoom : r))
        : [...prev, updatedRoom];
      });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('rooms_list', onRoomList);
    socket.on('room_updated', onRoomUpdated);

    return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    socket.off('rooms_list', onRoomList);
    socket.off('room_updated', onRoomUpdated);
    };

  }, []);

  function createRoom(name: string, maxPlayers: number): Room {
    const newRoom: Room = {
      id: crypto.randomUUID(),
      code: crypto.randomUUID().slice(0, 6).toUpperCase(),
      name,
      host: currentPlayer.username,
      players: [
        {
          ...currentPlayer,
          isHost: true,
          connected: true, 
        },
      ],
      maxPlayers,
      status: 'waiting',
    };

    setRooms((currentRooms) => [...currentRooms, newRoom]);

    sessionStorage.setItem('activRoom', newRoom.code);
    socket.emit('create_room', newRoom);
    return newRoom;
  }

  function joinRoom(code: string): Room | null {
    const room = getRoom(code);
    if (!room || room.status !== 'waiting') {
      return null;
    }
    
    const alreadyJoined = room.players.some(
      (player) => player.id === currentPlayer.id,
    );
    if (alreadyJoined) {
      sessionStorage.setItem('activRoom', room.code);
      socket.emit('join_room', { code: room.code, player: currentPlayer });
      return room;
    }
    if (room.players.length >= room.maxPlayers) {
      return null;
    }

    const updatedRoom: Room = {
      ...room,
      players: [...room.players, { ...currentPlayer, connected: true }],
    };
    setRooms((currentRooms) =>
      currentRooms.map((currentRoom) =>
        currentRoom.id === room.id ? updatedRoom : currentRoom,
      ),
    );
    sessionStorage.setItem('activRoom', room.code);
    socket.emit('join_room', { code: room.code, player: currentPlayer });
   
    return updatedRoom;
  }

  function leaveRoom(code: string) {
    sessionStorage.removeItem('activRoom');
    socket.emit('leave_room', { code });

    const room = getRoom(code);
    if (!room) return;
    
    const remainingPlayers = room.players.filter(
      (player) => player.id !== currentPlayer.id,
    );
    if (
      room.players.some(
        (player) => player.id === currentPlayer.id && player.isHost,
      )
    ) {
      setRooms((currentRooms) =>
        currentRooms.filter((currentRoom) => currentRoom.id !== room.id),
      );
      return;
    }
    setRooms((currentRooms) =>
      currentRooms.map((currentRoom) =>
        currentRoom.id === room.id
          ? { ...currentRoom, players: remainingPlayers }
          : currentRoom,
      ),
    );
  }

  function removePlayer(code: string, playerId: string): boolean {
    const room = getRoom(code);
    if (!room) return false;

    const isHost = room.players.some(
      (player) => player.id === currentPlayer.id && player.isHost,
    );
    if (!isHost || playerId === currentPlayer.id) {
      return false;
    }
    const updatedPlayers = room.players.filter(
      (player) => player.id !== playerId,
    );
    setRooms((currentRooms) =>
      currentRooms.map((currentRoom) =>
        currentRoom.id === room.id
          ? { ...currentRoom, players: updatedPlayers }
          : currentRoom,
      ),
    );
    socket.emit('remove_player', { code, playerId });

    return true;
  }

  function startRoom(code: string): boolean {
    const room = getRoom(code);

    if (!room || room.status !== 'waiting') return false;

    const isHost = room.players.some(
      (player) => player.id === currentPlayer.id && player.isHost,
    );

    const allPlayersReady = room?.players.every((player) => player.isReady);

    if (!isHost || room.players.length < 2 || !allPlayersReady) {
      return false;
    }
    setRooms((currentRooms) =>
      currentRooms.map((currentRoom) =>
        currentRoom.id === room.id
          ? { ...currentRoom, status: 'waiting' }
          : currentRoom,
      ),
    );
    socket.emit('start_room', { code });
    return true;
  }

  function getRoom(code: string) {
    return rooms.find((room) => room.code === code.toUpperCase());
  }

  function toggleReady(code: string) {
    setRooms((currentRooms) =>
      currentRooms.map((room) => {
        if (room.code !== code) return room;

        return {
          ...room,
          players: room.players.map((player) =>
            player.id === currentPlayer.id
              ? { ...player, isReady: !player.isReady }
              : player,
          ),
        };
      }),
    );
    socket.emit('toggle_ready', { code });
  }

  return (
    <RoomContext.Provider
      value={{
        rooms,
        createRoom,
        joinRoom,
        leaveRoom,
        removePlayer,
        startRoom,
        getRoom,
        currentPlayer,
        toggleReady,
        isConnected,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

// now send events to Websocketsocket.io

// function createRoom(name: string, maxPlayers: number): Room {
//    const newRoom: Room = {
//      id: crypto.randomUUID(),
//      code: crypto.randomUUID().slice(0, 6).toUpperCase(),
//      name,
//      host: currentPlayer.username,
//      players: [{ ...currentPlayer, isHost: true, connected: true }],
//      maxPlayers,
//      status: 'waiting',
//    };
//
//    sessionStorage.setItem('activRoom', newRoom.code);
//    socket.emit('create_room', newRoom);
//    setRooms((prev) => [...prev, newRoom]);
//    return newRoom;
//  }
//
//  function joinRoom(code: string): Room | null {
//    const formattedCode = code.toUpperCase();
//    sessionStorage.setItem('activRoom', formattedCode);
//    socket.emit('join_room', { code: formattedCode });
//    return getRoom(formattedCode) ?? null;
//  }
//
//  function leaveRoom(code: string) {
//    sessionStorage.removeItem('activRoom');
//    socket.emit('leave_room', { code });
//    setRooms((prev) => prev.filter((r) => r.code !== code));
//  }
//
//  function removePlayer(code: string, playerId: string): boolean {
//    socket.emit('remove_player', { code, playerId });
//    return true;
//  }
//
//  function startRoom(code: string): boolean {
//    socket.emit('start_room', { code });
//    return true;
//  }
//
//  function getRoom(code: string) {
//    return rooms.find((room) => room.code === code.toUpperCase());
//  }
//
//  function toggleReady(code: string) {
//    socket.emit('toggle_ready', { code });
//  }
//
//  return (
//    <RoomContext.Provider
//      value={{
//        rooms,
//        createRoom,
//        joinRoom,
//        leaveRoom,
//        removePlayer,
//        startRoom,
//        getRoom,
//        currentPlayer,
//        toggleReady,
//        isConnected, // <-- Exposé comme défini dans ton RoomContext.ts !
//      }}
//    >
//      {children}
//    </RoomContext.Provider>
//  );
//}
import { useState } from "react";
import { Card, Button } from "../components/ui";
import { useAuth } from "../contexts/useAuth";
import { useTheme } from "../contexts/ThemeContext";

type Player = {
    username: string;
    points: number;
    isCurrentUser?: boolean;
};

const listPlayers: Player[] = [
    { username: "Thomas", points: 2400 },
    { username: "Albert", points: 2200 },
    { username: "Theo", points: 1800 },
    { username: "Beatrice", points: 3500 },
    { username: "Lisa", points: 5800 },
    { username: "Franck", points: 4100 },
    { username: "Vero", points: 1200 },
    { username: "AAA", points: 200 },
    { username: "BBB", points: 400 },
    { username: "CCC", points: 9600 },
    { username: "DDD", points: 2500 },
    { username: "123", points: 6700 },
    { username: "456", points: 8100 },
    { username: "789", points: 4500 },
    { username: "Player111", points: 3600 },
];

function Ranking() {
    const { user } = useAuth();
    const { isDark } = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 8;
    const currentUsername = user?.userName || "GuestPlayer";
    const players: Player[] = [ ...listPlayers,
        { username: currentUsername, points: 1250, isCurrentUser: true },
    ];
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
    const rankedPlayers = sortedPlayers.map((player, index) => ({
        ...player, position: index + 1,
    }));
    const currentPlayer = rankedPlayers.find((player) => player.isCurrentUser);
    const totalPages = Math.ceil(rankedPlayers.length / playersPerPage);
    const startIndex = (currentPage - 1) * playersPerPage;
    const currentPlayers = rankedPlayers.slice(startIndex, startIndex + playersPerPage);

    return (
        <main className={`min-h-screen px-4 py-12 ${isDark ?
    "bg-gradient-to-r from-violet-700 via-indigo-700 to-cyan-700" :
    "bg-gradient-to-r bg-blue-200 via-cyan-200 to-emerald-200"}`}>
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-3xl font-bold">LeaderBoard</h1>
                <Card padding="md" className="mb-8">
                    <h2 className="mb-3 text-xl font-semibold">Your ranking</h2>

                    {currentPlayer ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">
                                    {currentPlayer.username}
                                </p>
                                <p className="text-sm text-muted">
                                    {currentPlayer.points} pts
                                </p>
                            </div>

                            <p className="text-2xl font-bold">
                                #{currentPlayer.position}
                            </p>
                        </div>
                    ) : (
                        <p>Ranking unavailable</p>
                    )}
                </Card>

                <Card padding="md">
                    <h2 className="mb-6 text-xl font-semibold">Global ranking</h2>
                    <div className="space-y-3">
                        {currentPlayers.map((player) => (
                        <div key={player.username} className={`flex items-center
                        justify-between rounded-lg border p-4
                        ${player.isCurrentUser ? "border-primary bg-primary/20" :
                                                 "border-muted"
                        }`}>
                            <div className="flex items-center gap-4">
                                <span className="w-8 font-bold">#{player.position}</span>
                                <span className="font-medium">{player.username}
                                    {player.isCurrentUser && (
                                        <span className="ml-2 text-sm text-primary">(You)</span>
                                    )}
                                </span>
                            </div>

                            <span className="font-semibold">{player.points} pts</span>
                        </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Button type="button" variant="secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => page - 1)}>Previous</Button>

                        {Array.from({ length: totalPages }, (_, index) => index + 1)
                        .map((page) => (
                            <Button type="button" variant={currentPage === page ?
                            "primary" : "secondary"}
                            onClick={() => setCurrentPage(page)}>{page}</Button>
                        ))}

                        <Button type="button" variant="secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((page) => page + 1)}>Next</Button>
                    </div>
                </Card>
            </div>
        </main>
    );
}

export default Ranking;
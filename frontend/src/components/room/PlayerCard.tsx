import type { Player } from "../../types/room";

type PlayerCardProps = {
    player: Player;
    isCurrentPlayer: boolean;
    isHost: boolean;
    onRemove?: (playerId: string) => void;
}

function PlayerCard({ player, isCurrentPlayer, isHost, onRemove, }: PlayerCardProps) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-indigo-950 p-4">
            <div className="flex items-center gap-3">
                <img src={player.avatar} alt={`${player.username}'s avatar`}
                className="h-12 w-12 rounded-full object-cover" />

                <div>
                    <p className="font-semibold">{player.username}
                        {isCurrentPlayer && " (You)"}
                    </p>

                    {player.isHost && (
                        <span className="text-sm text-yellow-400">Host</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm ${player.isReady ? 
                    "bg-green-600/20 text-green-400" : "bg-slate-600/20 text-slate-400"
                }`}>{player.isReady ? "Ready" : "Not ready"}</span>

                {isHost && !player.isHost && onRemove && (
                    <button onClick={() => onRemove(player.id)}
                    className="text-red-400 hover:text-red-300">Remove</button>
                )}
            </div>
        </div>
    );
}

export default PlayerCard;
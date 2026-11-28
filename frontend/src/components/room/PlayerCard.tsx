import type { Player } from "../../types/room";

type PlayerCardProps = {
    player: Player;
    isCurrentPlayer: boolean;
    isHost: boolean;
    onRemove?: (playerId: string) => void;

}

function PlayerCard({ player, isCurrentPlayer, isHost, onRemove, }: PlayerCardProps) {

    const isPlayerOnline = player.connected !== false;

    return (
        <div className={`flex items-center justify-between rounded-xl bg-indigo-950 p-4 transition-opacity ${
                    !isPlayerOnline ? "opacity-60" : ""
                }`}
            >
            <div className="flex items-center gap-3">
                <div className="relative" >
                <img 
                    src={player.avatar} 
                    alt={`${player.username}'s avatar`}
                    className="h-12 w-12 rounded-full object-cover" 
                    />
                    <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-indigo-950 ${
                                    isPlayerOnline ? "bg-green-500" : "bg-red-500"
                        }`}
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">
                            {player.username}
                            {isCurrentPlayer && " (You)"}
                        </p>
                        {!isPlayerOnline && (
                            <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                                Disconnected
                            </span>
                        )}

                    {player.isHost && (
                        <span className="text-sm text-yellow-400">Host</span>
                    )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm ${
                !isPlayerOnline
                    ? "bg-red-500/10 text-red-400"
                    : player.isReady 
                        ? "bg-green-600/20 text-green-400" 
                        : "bg-slate-600/20 text-slate-400"
                }`}
                >
                    {!isPlayerOnline
                        ? "Offline" 
                        : player.isReady 
                            ? "Ready" 
                            : "Not ready"}
                </span>

                {isHost && !player.isHost && onRemove && (
                    <button onClick={() => onRemove(player.id)}
                    className="text-red-400 hover:text-red-300">Remove</button>
                )}
            </div>
        </div>
    );
}

export default PlayerCard;
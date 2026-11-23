export type MatchHistory = {
    id: number;
    date: string;
    opponents: string[];
    score: number;
    opponentScore: number;
    rank: number;
};

export type Stats = {
    gamesPlayed: number;
    gamesWon: number;
    winRate: number;
    ranking: number;
};
export declare const QuestionType: {
    readonly MULTIPLAYER: "MULTIPLAYER";
    readonly BOOLEAN: "BOOLEAN";
};
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
export declare const Difficulty: {
    readonly EASY: "EASY";
    readonly MEDIUM: "MEDIUM";
    readonly HARD: "HARD";
};
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
export declare const FriendshipStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly BLOCKED: "BLOCKED";
};
export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus];
export declare const MatchStatus: {
    readonly WAITING: "WAITING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly FINISHED: "FINISHED";
    readonly CANCELLED: "CANCELLED";
};
export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];
export declare const MatchMode: {
    readonly SOLO: "SOLO";
    readonly DUEL: "DUEL";
    readonly MULTIPLAYER: "MULTIPLAYER";
};
export type MatchMode = (typeof MatchMode)[keyof typeof MatchMode];

export type Category = "maths" | "geography";

export type Question = {
    id: number;
    category: Category;
    difficulty: "easy" | "medium" | "hard";
    question: string;
    answers: string[];
    correctAnswer: number;
    timeLimit: number;
};

export const questions: Question[] = [
    {
        id: 1,
        category: "maths",
        difficulty: "easy",
        question: "6 x 7",
        answers: ["49", "65", "12", "42"],
        correctAnswer: 3,
        timeLimit: 10,
    },
    {
        id: 2,
        category: "geography",
        difficulty: "easy",
        question: "What is the capital of France",
        answers: ["Berlin", "Paris", "Oslo", "London"],
        correctAnswer: 1,
        timeLimit: 10,
    },
];
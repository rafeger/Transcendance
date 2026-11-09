export type Category = "maths" | "geography";

export type Question = {
    id: number;
    category: Category;
    question: string;
    answers: string[];
    correctAnswer: number;
};

export const questions: Question[] = [
    {
        id: 1,
        category: "maths",
        question: "6 x 7",
        answers: ["49", "65", "12", "42"],
        correctAnswer: 3,
    },
    {
        id: 2,
        category: "geography",
        question: "What is the capital of France",
        answers: ["Berlin", "Paris", "Oslo", "London"],
        correctAnswer: 1,
    },
];
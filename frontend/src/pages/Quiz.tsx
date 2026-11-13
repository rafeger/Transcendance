import { useState } from "react";
import { questions } from "../data/questions";
import QuestionCard from "../components/quiz/QuestionCard";

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score,setScore] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const currentQuestion = questions[currentQuestionIndex];

    function handleSelectAnswer(index: number) {
        if (selectedAnswer !== null) return ;
        setSelectedAnswer(index);
        if (index === currentQuestion.correctAnswer) {
            setScore((previousScore) => previousScore + 1);
        }
    }

    function handleNextQuestion() {
        if (selectedAnswer === null) return ;
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
            setSelectedAnswer(null);
        } else {
            setFinished(true);
        }
    }

    function handleRestart() {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setFinished(false);
    }

    if (isFinished) {
        return (
            <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
                <div className="mx-auto max-w-2xl rounded-2xl bg-indigo-900
                p-8 text-center">
                    <h1 className="text-4xl font-bold">Quiz finished!</h1>
                    <p className="mt-6 text-2xl">Your score: {score}/{questions.length}</p>

                    <button onClick={handleRestart}
                    className="mt-8 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-500">
                        Play again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-center text-bold text-4xl">Quiz Arena</h1>
                <p className="mt-4 text-center text-slate-400">
                    Question: {currentQuestionIndex + 1} / {questions.length}
                </p>
                <div className="mt-8">
                    <QuestionCard question={currentQuestion} selectedAnswer={selectedAnswer}
                    onSelectAnswer={handleSelectAnswer} />
                </div>

                <button onClick={handleNextQuestion} disabled={selectedAnswer === null}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold
                hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40">
                    {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
            </div>
        </main>
    );
}

export default Quiz;
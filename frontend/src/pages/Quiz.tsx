import { useState } from "react";
import { questions, type Category } from "../data/questions";

function Quiz() {
    const [guestName, setGuestName] = useState("");
    const [category, setCategory] = useState("maths");
    const [isPlaying, setIsPlaying] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectAnswer, setSelectAnswer] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    

    const filteredQuestions = questions.filter((q) => q.category === category);
    const currentQuestion = filteredQuestions[questionIndex];

    function startQuiz() {
        if (filteredQuestions.length === 0) {
            return ;
        }
        setGuestName(`Guest${Math.floor(Math.random() * 10000)}`);
        setQuestionIndex(0);
        setScore(0);
        setSelectAnswer(null);
        setIsFinished(false);
        setIsPlaying(true);
    }

    function handleAnswer(answerIndex: number) {
        if (selectAnswer !== null) return ;
        setSelectAnswer(answerIndex);
        if (answerIndex === currentQuestion.correctAnswer) {
            setScore((previousScore) => previousScore + 1);
        }
    }

    function nextQuestion() {
        if (questionIndex + 1 < filteredQuestions.length) {
            setQuestionIndex((previousIndex) => previousIndex + 1);
            setSelectAnswer(null);
        }
        else {
            setIsFinished(true);
        }
    }

    function restartQuiz() {
        setIsPlaying(false);
        setIsFinished(false);
        setQuestionIndex(0);
        setScore(0);
        setSelectAnswer(null);
    }

    if (!isPlaying) {
        return (
            <main className="min-h-screen bg-slate-950 p-8 text-white">
                <div className="mx-auto max-w-md space-y-6">
                    <h1 className="text-3xl font-bold">Solo Quiz</h1>
                    <p>Config your quiz</p>
                    <div>
                        <label htmlFor="category">Categories</label>
                        <select 
                        id="category" value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="mt-2 w-full rounded bg-slate-800 p-1">
                            <option value="maths">Maths</option>
                            <option value="geography">Geography</option>
                        </select>
                    </div>

                    <button onClick={startQuiz} disabled={filteredQuestions.length === 0}
                    className="w-full rounded bg-blue-600 p-3 font-bold disabled:opacity-50
                    cursor-pointer">
                        Play as guest
                    </button>

                    {filteredQuestions.length === 0 && (
                        <p>No question available for this choice.</p>
                    )}
                </div>
            </main>
        );
    }

    if (isFinished) {
        return (
            <main className="min-h-screen bg-slate-950 p-8 text-white">
                <div className="mx-auto max-w-md space-y-6 text-center">
                    <h1 className="text-3xl font-bold">Quiz finished!</h1>
                    <p className="text-2xl">
                        Score: {score} / {filteredQuestions.length}
                    </p>
                    <p>{Math.round((score / filteredQuestions.length) * 100)}%</p>

                    <button onClick={restartQuiz}
                    className="rounded bg-blue-600 px-6 py-3 font-bold">Rejouer</button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8">
            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex justify-between gap-4">
                    <p>Player: {guestName}</p>
                    <p>Score: {score}</p>
                </div>

                <p className="text-slate-400">Question {questionIndex + 1} / {filteredQuestions.length}</p>
                <div className="h-2 overfow-hidden rounded bg-slate-800">
                    <div className="h-full bg-blue-500"
                    style={{
                        width: `${((questionIndex + 1) / filteredQuestions.length) * 100}%`,
                    }}></div>

                    <h1 className="text-2xl font-bold">{currentQuestion.question}</h1>
                    <div className="grid gap-3">
                        {currentQuestion.answers.map((answer, index) => {
                        const isCorrect = index === currentQuestion.correctAnswer;
                        const isSelected = index === selectAnswer;
                        let answerStyle = "rounded-lg border border-slate-700 bg-slate-800 p-4 text-left"
                        if (selectAnswer !== null && isCorrect) {
                            answerStyle = "rounded-lg border border-green-500 bg-green-900 p-4 text-left";
                        } else if (isSelected && !isCorrect) {
                            answerStyle = "rounded-lg border border-red-500 bg-red-900 p-4 text-left";
                        }

                        return (
                            <button key={index} onClick={() => handleAnswer(index)}
                            disabled={selectAnswer !== null}
                            className={`${answerStyle} disabled:cursor-default`}>{answer}</button>
                        );
                    })}
                    </div>

                    {selectAnswer !== null && (
                        <div className="space-y-4">
                            <p>{selectAnswer === currentQuestion.correctAnswer ?
                            "Good answer" : `Bad answer. The good answer was: 
                            ${currentQuestion.answers[currentQuestion.correctAnswer]}`}</p>

                            <button onClick={nextQuestion}
                            className="w-full rounded bg-blue-600 p-3 font-bold">
                                {questionIndex + 1 === filteredQuestions.length ? 
                                "See the results" : "Next question"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Quiz;
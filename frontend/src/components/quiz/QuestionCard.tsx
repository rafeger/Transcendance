import type { Question } from "../../data/questions";
import AnswerButton from "./AnswerButton";

type QuestionCardProps = {
    question: Question;
    selectedAnswer: number | null;
    onSelectAnswer: (index: number) => void;
};

function QuestionCard({ question, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
    return (
        <section className="rounded-2xl bg-indigo-900 p-6">
            <div className="flex items-center justify-between">
                <span className="text-sm text-blue-300">{question.category}</span>
                <span className="text-sm text-slate-300">{question.difficulty}</span>
            </div>

            <h2 className="mt-6 text-2xl font-bold">{question.question}</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {question.answers.map((answer, index) => (
                    <AnswerButton key={index} answer={answer}
                    index={index} selectedAnswer={selectedAnswer}
                    onSelect={onSelectAnswer} />
                ))}
            </div>
        </section>
    );
}

export default QuestionCard;
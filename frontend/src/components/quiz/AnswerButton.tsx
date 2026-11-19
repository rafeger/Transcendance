type AnswerButtonProps = {
    answer: string;
    index: number;
    selectedAnswer: number | null;
    onSelect: (index: number) => void;
};

function AnswerButton({answer, index, selectedAnswer, onSelect,}: AnswerButtonProps) {
    const isSelected = selectedAnswer === index;

    return (
        <button onClick={() => onSelect(index)}
        className={`w-full rounded-xl border p-4 text-left transition ${
            isSelected ? "border-blue-400 bg-blue-600"
            : "border-white/20 bg-indigo-950 hover:bg-indigo-800"
        }`}>{answer}</button>
    );
}

export default AnswerButton;
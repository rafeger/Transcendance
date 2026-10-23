import { useState } from "react";

function Lobby() {
    const [codeQuiz, setCodeQuiz] = useState("");

    function handleJoinLobby(event: React.SubmitEvent) {
        event.preventDefault();

        if (codeQuiz.trim() === "") {
            alert("Please enter a quiz code.");
            return ;
        }
        console.log("Quiz code: ", codeQuiz);
    }
}

export default Lobby;
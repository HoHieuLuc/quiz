import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";

function Game() {
    const [quizes, setQuizes] = React.useState([]);
    const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false);
    const [newGameSwitch, setNewGameSwitch] = React.useState(false);

    React.useEffect(() => {
        console.log("Game.js: useEffect");
        const getQuizes = async () => {
            try {
                const {
                    data: { results }
                } = await axios.get("https://opentdb.com/api.php?amount=5&category=15");
                const newQuizes = results.map(quiz => {
                    const { correct_answer, incorrect_answers, question } = quiz;
                    const answers = [correct_answer, ...incorrect_answers];
                    const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
                    return {
                        id: nanoid(),
                        question,
                        answers: shuffledAnswers,
                        correctAnswer: correct_answer,
                        chosenAnswer: null
                    };
                });
                setQuizes(newQuizes);
            } catch (error) {
                console.log(error);
            }
        };
        getQuizes();
    }, [newGameSwitch]);

    const selectAnswer = (questionId, answer) => {
        setQuizes(oldQuizes => oldQuizes.map(oldQuiz => {
            if (oldQuiz.id === questionId) {
                return {
                    ...oldQuiz,
                    chosenAnswer: answer
                }
            }
            return oldQuiz;
        }))
    }

    const quizElement = quizes.map((quiz) => {
        return (
            <Quiz
                key={quiz.id}
                quiz={quiz}
                selectAnswer={selectAnswer}
                showCorrectAnswers={showCorrectAnswers}
            />
        )
    });

    const calculateScore = () => {
        return quizes.filter(quiz => quiz.chosenAnswer === quiz.correctAnswer).length;
    }

    const gameButton = () => {
        if (showCorrectAnswers) {
            setNewGameSwitch(prev => !prev);
            setShowCorrectAnswers(false);
            setQuizes([]);
        } else {
            setShowCorrectAnswers(true);
        }
    }

    return (
        <div>
            {quizes.length === 0 && <p>Loading...</p>}
            {quizElement}
            {quizes.length > 0 &&
                <div className="flex-row flex-center">
                    {showCorrectAnswers && <p>Your scored {calculateScore()}/5 correct answers</p>}
                    <button onClick={gameButton} className="game-button">
                        <h2>{showCorrectAnswers ? "Play again" : "Check answers"}</h2>
                    </button>
                </div>
            }
        </div>
    )
}

export default Game;
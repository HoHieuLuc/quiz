function Quiz(props) {
    const {id, question, answers, correctAnswer, chosenAnswer} = props.quiz;

    const answerElements = answers.map((answer, index) => {
        let className = '';
        if (props.showCorrectAnswers) {
            if (answer === correctAnswer) {
                className = "correct-answer";
            } else if (chosenAnswer !== correctAnswer && answer === chosenAnswer) {
                className = "wrong-answer";
            }
        }
        return (
            <label key={index} className={className}>
                <input
                    type="radio"
                    name={id}
                    value={answer}
                    checked={chosenAnswer === answer}
                    onChange={() => props.selectAnswer(id, answer)}
                    disabled={props.showCorrectAnswers}
                />
                <span dangerouslySetInnerHTML={{ __html: answer }} />
            </label>
        )
    });
    return (
        <div className="quiz">
            <p className="quiz--question" dangerouslySetInnerHTML={{ __html: question }} />
            <div className="quiz--answers">
                {answerElements}
            </div>
            <hr />
        </div>
    )
}

export default Quiz;
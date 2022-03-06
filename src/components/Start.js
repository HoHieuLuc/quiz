function Start(props) {
    return (
        <div className="center start">
            <h1>Quizzical</h1>
            <button onClick={() => props.startGame(true)}>
                <h2>Start quiz</h2>
            </button>
        </div>
    );
}

export default Start;

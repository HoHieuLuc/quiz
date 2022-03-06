import React from "react";
import Start from "./components/Start";
import Game from "./components/Game";

function App() {
    const [gameStart, setGameStart] = React.useState(false);

    return (
        <main>
            <div className="flex-col flex-center">
                {!gameStart && <Start startGame={setGameStart} />}
                {gameStart && <Game />}
            </div>
        </main>
    );
}

export default App;

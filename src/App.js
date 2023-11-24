import React, { useState } from "react";
import "./index.css"
// import Board from "./components/Board";
import JogoDaVelha3 from "./components/JogodaVelha3";
import JogoDaVelha3IA from "./components/JogodaVelha3IA";
import DisjuntorIA from "./components/botao";


function App() {

  const [isIA, setIsIA] = useState(false)
  function toggleGame() {
    setIsIA(!isIA);
  }

  return (
    <div className="App">
      <DisjuntorIA isIA={isIA} toggleGame={toggleGame}/>
      {isIA ? <JogoDaVelha3IA/> : <JogoDaVelha3/>}
    </div>
  );
}

export default App;

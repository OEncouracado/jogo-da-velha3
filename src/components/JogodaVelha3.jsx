import React, { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap';


const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  
    return null;
  };

const JogoDaVelha3 = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [movesLeftX, setMovesLeftX] = useState(3);
  const [movesLeftO, setMovesLeftO] = useState(3);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetGame();
  };
  const handleShow = () => setShow(true);
  

  const handleClick = (index) => {
    const currentPlayer = xIsNext ? 'X' : 'O';
    const currentMovesLeft = currentPlayer === 'X' ? movesLeftX : movesLeftO;

    if (board[index] === null && currentMovesLeft > 0) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (currentPlayer === 'X') {
        setMovesLeftX(movesLeftX - 1);
      } else {
        setMovesLeftO(movesLeftO - 1);
      }

      setXIsNext(!xIsNext);
    } else if (board[index] === currentPlayer) {
      // Move a marcação
      const newBoard = [...board];
      newBoard[index] = null;
      setBoard(newBoard);

      if (currentPlayer === 'X') {
        setMovesLeftX(movesLeftX + 1);
      } else {
        setMovesLeftO(movesLeftO + 1);
      }
    }
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

//   const status = `Next player: ${xIsNext ? 'X' : 'O'} | Moves left - X: ${movesLeftX}, O: ${movesLeftO}`;

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setMovesLeftX(3);
        setMovesLeftO(3);
    };

  const winner = calculateWinner(board);
  let status;
  if (winner && !show) {
    status = `Winner: ${winner}`;
    handleShow();
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'} | Moves left - X: ${movesLeftX}, O: ${movesLeftO}`;
  }

  return (
    <><div className='FundoTabuleiro'>
        <div className='m-3 w-auto align-items-center justify-content-center d-flex flex-column'>
        <Container className='d-flex align-items-center'>
          <h1 className="mb-3 titulo" style={{ zIndex: 2 }}>JOGO DA VELHA 3</h1>
    </Container>
          <div className="status p-1">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>VENCEDOR!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Parabéns! {winner}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Reiniciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JogoDaVelha3;

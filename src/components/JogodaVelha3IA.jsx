import React, { useState, useEffect } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import tres from '../images/3.png';

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

const JogoDaVelha3IA = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [movesLeftX, setMovesLeftX] = useState(3);
  const [movesLeftO, setMovesLeftO] = useState(3);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [show, setShow] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClose = () => {
    setShow(false);
    resetGame();
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner && !show) {
      setWinner(winner);
      handleShow();
    }
  }, [board, show]);

  const handleClick = (index) => {
    console.log("Current state:", { winner, board, selectedSquare });
    if (
        winner ||
        (selectedSquare === null && board[index] !== null) ||  // Se a posição já estiver ocupada e nenhuma marcação selecionada
        (selectedSquare !== null && board[selectedSquare] === null) ||  // Se houver uma marcação selecionada, mas a posição estiver vazia
        (selectedSquare !== null && board[index] !== null)  // Se houver uma marcação selecionada e a posição já estiver ocupada
      ) {
        console.log("Invalid move");
        return;
      }
      console.log("Valid move");

    if (selectedSquare !== null) {
      // Mover marcação existente
      const newBoard = [...board];
      newBoard[selectedSquare] = null;
      newBoard[index] = xIsNext ? 'X' : 'O';
      setSelectedSquare(null);
      setBoard(newBoard);
      setXIsNext(!xIsNext); // Alternar a vez do jogador
    } else {
      // Usar nova marcação
      if ((xIsNext && movesLeftX > 0) || (!xIsNext && movesLeftO > 0)) {
        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);

        if (xIsNext) {
          setMovesLeftX(movesLeftX - 1);
        } else {
          setMovesLeftO(movesLeftO - 1);
        }

        if ((xIsNext && movesLeftX === 1) || (!xIsNext && movesLeftO === 1)) {
          // Jogador usou todas as suas marcações, agora deve selecionar uma para mover
          setSelectedSquare(index);
        } else {
          setXIsNext(!xIsNext);
        }
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setMovesLeftX(3);
    setMovesLeftO(3);
    setSelectedSquare(null);
    setWinner(null);
  };

  const getAvailableMoves = () => {
    return board.reduce((acc, _, index) => (board[index] === null ? acc.concat(index) : acc), []);
  };

  const minimax = (board, depth, maximizingPlayer) => {
    const scores = {
      X: 1,
      O: -1,
      draw: 0,
    };

    const winner = calculateWinner(board);

    if (winner) {
      return scores[winner];
    }

    if (getAvailableMoves().length === 0) {
      return scores['draw'];
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      getAvailableMoves().forEach((index) => {
        if (board[index] === null) {
          const newBoard = [...board];
          newBoard[index] = 'X';
          const currentEval = minimax(newBoard, depth + 1, false);
          maxEval = Math.max(maxEval, currentEval);
        }
      });
      return maxEval;
    } else {
      let minEval = Infinity;
      getAvailableMoves().forEach((index) => {
        if (board[index] === null) {
          const newBoard = [...board];
          newBoard[index] = 'O';
          const currentEval = minimax(newBoard, depth + 1, true);
          minEval = Math.min(minEval, currentEval);
        }
      });
      return minEval;
    }
  };

  const bestMove = () => {
    const availableMoves = getAvailableMoves();
  
    if (availableMoves.length === 0) {
      return null; // Retorna null se não houver movimentos disponíveis
    }
  
    let bestScore = -Infinity;
    let bestMove = null;
  
    availableMoves.forEach((index) => {
      const newBoard = [...board];
      newBoard[index] = 'X';
      const score = minimax(newBoard, 0, false);
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    });
  
    return bestMove;
  };
  

  useEffect(() => {
    console.log("Effect triggered!", xIsNext, winner, selectedSquare);
    if (!xIsNext && getAvailableMoves().length > 0 && !winner && selectedSquare === null) {
      // Simula a jogada da máquina
      const machineMove = bestMove();

      console.log("Machine move:", machineMove);
  
      if (machineMove !== null) {
        setTimeout(() => {
          handleClick(machineMove);
        }, 500); // Adiciona um atraso para a jogada da máquina ser visível
      }
    }
  }, [xIsNext, winner, selectedSquare]);

  const renderSquare = (i) => (
    <button
      className={`square${selectedSquare === i ? ' selected' : ''}`}
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'} | Moves left - X: ${movesLeftX}, O: ${movesLeftO}`;

  return (
    <>
      <div className='FundoTabuleiro'>
        <div className='m-3 w-auto align-items-center justify-content-center d-flex flex-column'>
          <Container className='d-flex flex-column  align-items-center'>
            <h1 className="mb-3 titulo" style={{ zIndex: 2 }}>JOGO DA VELHA 3</h1>
            <small>(com IA)</small>
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

export default JogoDaVelha3IA;

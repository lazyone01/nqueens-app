import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import './App.css';

const NQueensVisualizer = () => {
  const [n, setN] = useState(4);
  const [board, setBoard] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('backtrack');
  const [speed, setSpeed] = useState(500);
  const [solutions, setSolutions] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Click Start to begin!');
  const runningRef = useRef(false);

  useEffect(() => {
    resetBoard();
  }, [n]);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  const resetBoard = () => {
    const newBoard = Array(n).fill(null).map(() => Array(n).fill(0));
    setBoard(newBoard);
    setIsRunning(false);
    runningRef.current = false;
    setSolutions(0);
    setAttempts(0);
    setMessage('Click Start to begin!');
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const isSafe = (board, row, col, n) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }
    
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }
    
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false;
    }
    
    return true;
  };

  const solveBacktracking = async () => {
    setMessage('🚀 Backtracking: Placing queens smartly...');
    let tempBoard = Array(n).fill(null).map(() => Array(n).fill(0));
    let count = 0;
    let att = 0;

    const solveNQueens = async (row) => {
      if (!runningRef.current) return;
      
      if (row === n) {
        count++;
        setSolutions(count);
        setMessage(`✅ Found solution #${count}!`);
        setBoard(tempBoard.map(r => [...r]));
        await delay(speed * 2);
        return;
      }

      for (let col = 0; col < n; col++) {
        if (!runningRef.current) return;
        
        att++;
        setAttempts(att);
        
        if (isSafe(tempBoard, row, col, n)) {
          tempBoard[row][col] = 1;
          setBoard(tempBoard.map(r => [...r]));
          setMessage(`✓ Placed queen at row ${row + 1}, col ${col + 1}`);
          await delay(speed);
          
          await solveNQueens(row + 1);
          
          tempBoard[row][col] = 0;
          setBoard(tempBoard.map(r => [...r]));
          if (runningRef.current) {
            setMessage(`↩ Backtracking from row ${row + 1}, col ${col + 1}`);
            await delay(speed / 2);
          }
        } else {
          setMessage(`✗ Row ${row + 1}, col ${col + 1} is unsafe, skipping!`);
          await delay(speed / 4);
        }
      }
    };

    await solveNQueens(0);
    setIsRunning(false);
    runningRef.current = false;
    setMessage(`✨ Done! Found ${count} solution(s) after ${att} attempts (Smart approach!)`);
  };

  const solveBruteForce = async () => {
    setMessage('🐌 Brute Force: Trying every possible combination...');
    let count = 0;
    let att = 0;

    const generate = async (row, positions) => {
      if (!runningRef.current) return;
      
      if (row === n) {
        att++;
        setAttempts(att);
        
        let tempBoard = Array(n).fill(null).map(() => Array(n).fill(0));
        for (let r = 0; r < n; r++) {
          tempBoard[r][positions[r]] = 1;
        }
        setBoard(tempBoard.map(r => [...r]));
        await delay(speed / 2);
        
        let valid = true;
        for (let r = 0; r < n; r++) {
          if (!isSafe(tempBoard, r, positions[r], n)) {
            valid = false;
            break;
          }
        }
        
        if (valid) {
          count++;
          setSolutions(count);
          setMessage(`✅ Found solution #${count}! (after checking)`);
          await delay(speed * 2);
        } else {
          setMessage(`✗ Invalid configuration (attempt ${att})`);
        }
        return;
      }

      for (let col = 0; col < n; col++) {
        if (!runningRef.current) return;
        await generate(row + 1, [...positions, col]);
      }
    };

    await generate(0, []);
    setIsRunning(false);
    runningRef.current = false;
    setMessage(`✨ Done! Found ${count} solution(s) after ${att} attempts (Tried everything!)`);
  };

  const startSolving = () => {
    if (isRunning) {
      setIsRunning(false);
      runningRef.current = false;
      return;
    }
    
    resetBoard();
    setTimeout(() => {
      setIsRunning(true);
      runningRef.current = true;
      
      if (algorithm === 'bruteforce') {
        solveBruteForce();
      } else {
        solveBacktracking();
      }
    }, 100);
  };

  const getCellClass = (value, row, col) => {
    const isEvenCell = (row + col) % 2 === 0;
    if (value === 1) return 'cell queen';
    return isEvenCell ? 'cell light' : 'cell dark';
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">N-Queens Visualizer 👑</h1>
        <p className="subtitle">Watch how different algorithms solve the puzzle!</p>

        <div className="card">
          <div className="controls-grid">
            <div className="control-group">
              <label>Board Size (N)</label>
              <input
                type="number"
                min="4"
                max="8"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value) || 4)}
                disabled={isRunning}
                className="input"
              />
            </div>
            <div className="control-group">
              <label>Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isRunning}
                className="select"
              >
                <option value="backtrack">Backtracking (Fast) 🚀</option>
                <option value="bruteforce">Brute Force (Slow) 🐌</option>
              </select>
            </div>
          </div>

          <div className="control-group">
            <label>Speed: {speed}ms (lower = faster)</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="button-group">
            <button
              onClick={startSolving}
              className={isRunning ? 'btn btn-stop' : 'btn btn-start'}
            >
              {isRunning ? (
                <>
                  <Pause size={20} />
                  Stop
                </>
              ) : (
                <>
                  <Play size={20} />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetBoard}
              disabled={isRunning}
              className="btn btn-reset"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        <div className="card">
          <div className="stats-grid">
            <div className="stat-box stat-solutions">
              <div className="stat-value">{solutions}</div>
              <div className="stat-label">Solutions Found</div>
            </div>
            <div className="stat-box stat-attempts">
              <div className="stat-value">{attempts}</div>
              <div className="stat-label">Attempts Made</div>
            </div>
          </div>
          <div className="message-box">
            {message}
          </div>
        </div>

        <div className="card board-container">
          <div 
            className="board"
            style={{ 
              gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
            }}
          >
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={getCellClass(cell, i, j)}
                  style={{
                    width: `${Math.min(60, 400 / n)}px`,
                    height: `${Math.min(60, 400 / n)}px`,
                    fontSize: `${Math.min(40, 300 / n)}px`
                  }}
                >
                  {cell === 1 && '♛'}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card info-section">
          <h2 className="info-title">How It Works:</h2>
          
          <div className="info-box">
            <h3 className="info-heading bruteforce">🐌 Brute Force Approach:</h3>
            <p>"Let me try EVERY possible way to place queens, then check if it's valid!"</p>
            <ul>
              <li>Places one queen in each row at different columns</li>
              <li>Tries all N^N combinations</li>
              <li>After placing all N queens, checks if any attack each other</li>
              <li>Very slow because it tries invalid combinations too</li>
            </ul>
          </div>

          <div className="info-box">
            <h3 className="info-heading backtrack">🚀 Backtracking Approach:</h3>
            <p>"Let me be smart! If a position is unsafe, skip it immediately!"</p>
            <ul>
              <li>Places one queen per row</li>
              <li>Before placing, checks if the position is safe</li>
              <li>If we get stuck, we go back (backtrack) and try another position</li>
              <li>Much faster because we avoid invalid paths early!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NQueensVisualizer;
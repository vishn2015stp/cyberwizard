import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Maximize2, 
  RotateCcw, 
  Play, 
  Trophy, 
  ExternalLink, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const gamesList = [
  {
    id: 'snake',
    title: 'Cyber Snake Arcade',
    category: 'Retro Arcade',
    type: 'native',
    description: 'Classic arcade snake game rendered natively in neon cyber canvas with high score tracking.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in'
  },
  {
    id: 'hextris',
    title: 'Hextris (Hexagonal Puzzle)',
    category: 'Puzzle & Reflex',
    type: 'iframe',
    embedUrl: 'https://hextris.github.io/hextris/',
    description: 'Fast-paced open-source hexagonal puzzle game inspired by Tetris.',
    author: 'Garrett Finucane & Logan Engstrom',
    sourceUrl: 'https://github.com/Hextris/hextris'
  },
  {
    id: '2048',
    title: '2048 Puzzle Game',
    category: 'Logic & Math',
    type: 'iframe',
    embedUrl: 'https://gabrielecirulli.github.io/2048/',
    description: 'Join the numbers and get to the 2048 tile! Popular open-source sliding puzzle.',
    author: 'Gabriele Cirulli',
    sourceUrl: 'https://github.com/gabrielecirulli/2048'
  },
  {
    id: 'clumsy-bird',
    title: 'Clumsy Bird (Flappy Clone)',
    category: 'Action & Timing',
    type: 'iframe',
    embedUrl: 'https://ellisonleao.github.io/clumsy-bird/',
    description: 'Open-source HTML5 canvas bird flight arcade game.',
    author: 'Ellison Leão',
    sourceUrl: 'https://github.com/ellisonleao/clumsy-bird'
  },
  {
    id: 'pacman',
    title: 'HTML5 Pac-Man',
    category: 'Retro Arcade',
    type: 'iframe',
    embedUrl: 'https://macek.github.io/html5-pacman/',
    description: 'Classic arcade maze game built using HTML5 Canvas & JS.',
    author: 'Dale Harvey / Paul Macek',
    sourceUrl: 'https://github.com/macek/html5-pacman'
  }
];

// Built-in Native Cyber Snake Game Component
function NativeCyberSnake() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_snake_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = 20; // 400x400 grid
    let snake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
    let food = { x: 5, y: 5 };
    let dx = 0;
    let dy = -1;
    let currentScore = 0;

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    }

    function handleKeyDown(e) {
      if (['ArrowUp', 'KeyW'].includes(e.code) && dy === 0) { dx = 0; dy = -1; }
      else if (['ArrowDown', 'KeyS'].includes(e.code) && dy === 0) { dx = 0; dy = 1; }
      else if (['ArrowLeft', 'KeyA'].includes(e.code) && dx === 0) { dx = -1; dy = 0; }
      else if (['ArrowRight', 'KeyD'].includes(e.code) && dx === 0) { dx = 1; dy = 0; }
    }

    window.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      // Move snake head
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        clearInterval(interval);
        return;
      }

      // Self collision
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          setGameOver(true);
          clearInterval(interval);
          return;
        }
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        if (currentScore > highScore) {
          setHighScore(currentScore);
          localStorage.setItem('cyber_snake_high_score', currentScore.toString());
        }
        placeFood();
      } else {
        snake.pop();
      }

      // Render
      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid lines subtle
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw Food
      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Snake
      snake.forEach((part, index) => {
        if (index === 0) {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowColor = '#00f3ff';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
    }, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, highScore]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', fontSize: '1rem' }}>
        <div>Score: <strong className="text-cyan">{score}</strong></div>
        <div>High Score: <strong className="text-purple">{highScore}</strong></div>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400}
          style={{ 
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 20px var(--cyan-glow)'
          }}
        />

        {(!gameStarted || gameOver) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.88)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            borderRadius: 'var(--radius-md)'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {gameOver ? '🎮 Game Over!' : '🐍 Cyber Snake Arcade'}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Use Arrow Keys or W-A-S-D to control the snake
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebGames() {
  const [selectedGame, setSelectedGame] = useState(gamesList[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Gamepad2 className="text-cyan" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Free Open-Source <span className="text-cyan">Web Games</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Play popular open-source HTML5 browser games, retro arcade classics, and logic puzzles directly in your browser.
        </p>
      </div>

      {/* Game Selection Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {gamesList.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className={`btn btn-sm ${selectedGame.id === game.id ? 'btn-primary' : 'btn-outline'}`}
          >
            <span>{game.title}</span>
          </button>
        ))}
      </div>

      {/* Game Stage Screen */}
      <div className="glass-card" ref={containerRef} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Game Stage Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span className="badge badge-purple" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>{selectedGame.category}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedGame.title}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-outline btn-sm" onClick={toggleFullscreen} title="Fullscreen View">
              <Maximize2 size={15} />
              <span>Fullscreen</span>
            </button>

            {selectedGame.sourceUrl !== 'Built-in' && (
              <a 
                href={selectedGame.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm"
                title="View Open Source Repository"
              >
                <ExternalLink size={15} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Game Content View */}
        <div style={{
          width: '100%',
          minHeight: '480px',
          background: '#040711',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          position: 'relative'
        }}>
          {selectedGame.type === 'native' ? (
            <NativeCyberSnake />
          ) : (
            <iframe 
              src={selectedGame.embedUrl}
              title={selectedGame.title}
              style={{
                width: '100%',
                height: '520px',
                border: 'none',
                background: '#fff'
              }}
              allow="autoplay; payment; fullscreen; microphone; camera"
            />
          )}
        </div>

        {/* Game Footer Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div>{selectedGame.description}</div>
          <div>Author / License: <strong className="text-cyan">{selectedGame.author}</strong></div>
        </div>
      </div>
    </section>
  );
}

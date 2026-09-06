import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Maximize2, 
  Play, 
  ExternalLink, 
  Search,
  Shuffle,
  Sparkles,
  Zap
} from 'lucide-react';

export const gameCategories = [
  { id: 'all', label: 'All Games' },
  { id: '3D Racing', label: '🏎️ 3D Racing' },
  { id: 'Retro Arcade', label: '🕹️ Retro Arcade' },
  { id: 'Puzzle & Logic', label: '🧩 Puzzle & Logic' },
  { id: 'Action & Strategy', label: '⚔️ Action & Strategy' }
];

export const gamesList = [
  {
    id: 'hexgl',
    title: 'HexGL 3D Sci-Fi Racer',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://hexgl.bkcore.com/play/',
    description: 'High-speed futuristic 3D sci-fi hovercraft racing game built with Three.js & WebGL.',
    author: 'Thibaut Despoulain (BKcore)',
    sourceUrl: 'https://github.com/bkcore/HexGL'
  },
  {
    id: 'slowroads',
    title: 'Slow Roads 3D Driving',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://slowroads.io/',
    description: 'Procedurally generated 3D endless driving game with smooth WebGL graphics and scenic tracks.',
    author: 'Anslo',
    sourceUrl: 'https://slowroads.io/'
  },
  {
    id: '3d-racer',
    title: '3D WebGL Highway Racer',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://submariner.github.io/3d-racing/',
    description: 'Fast 3D arcade highway racer rendered using Three.js & WebGL canvas.',
    author: 'Submariner Open Source',
    sourceUrl: 'https://github.com/submariner/3d-racing'
  },
  {
    id: 'trigger-rally',
    title: 'Trigger Rally 3D WebGL',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://triggerrally.com/',
    description: 'Fast 3D single-player rally racing game with realistic physics rendered in WebGL.',
    author: 'Jasmine Langridge & Team',
    sourceUrl: 'https://github.com/jgrig/trigger-rally'
  },
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
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'https://hextris.github.io/hextris/',
    description: 'Fast-paced open-source hexagonal puzzle game inspired by Tetris.',
    author: 'Garrett Finucane & Logan Engstrom',
    sourceUrl: 'https://github.com/Hextris/hextris'
  },
  {
    id: '2048',
    title: '2048 Tile Puzzle',
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'https://gabrielecirulli.github.io/2048/',
    description: 'Join the numbers and get to the 2048 tile! Popular open-source sliding puzzle.',
    author: 'Gabriele Cirulli',
    sourceUrl: 'https://github.com/gabrielecirulli/2048'
  },
  {
    id: 'alien-invasion',
    title: 'Alien Invasion HTML5 Shooter',
    category: 'Action & Strategy',
    type: 'iframe',
    embedUrl: 'https://cykod.github.io/AlienInvasion/',
    description: 'Vertical space shooter arcade game built with HTML5 canvas & Javascript.',
    author: 'Pascal Rettig (Cykod)',
    sourceUrl: 'https://github.com/cykod/AlienInvasion'
  },
  {
    id: 'clumsy-bird',
    title: 'Clumsy Bird (Flappy Clone)',
    category: 'Retro Arcade',
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
  },
  {
    id: 'sudoku',
    title: 'Sudoku Open-Source Logic',
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'https://sudoku-online.github.io/',
    description: 'Clean open-source Sudoku logic puzzle with multiple difficulty grids.',
    author: 'Sudoku Open-Source Team',
    sourceUrl: 'https://github.com/sudoku-online/sudoku-online.github.io'
  },
  {
    id: 'flexbox-defense',
    title: 'Flexbox Defense Tower Game',
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'http://www.flexboxdefense.com/',
    description: 'Tower defense strategy game where you position turrets using CSS flexbox commands.',
    author: 'Channing Allen',
    sourceUrl: 'https://github.com/channingallen/flexbox-defense'
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
    const tileCount = 20;
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
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        clearInterval(interval);
        return;
      }

      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          setGameOver(true);
          clearInterval(interval);
          return;
        }
      }

      snake.unshift(head);

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

      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(gamesList[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  const filteredGames = gamesList.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * gamesList.length);
    setSelectedGame(gamesList[randomIndex]);
  };

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Gamepad2 className="text-cyan" size={28} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Open-Source <span className="text-cyan">Games Catalog</span></h2>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={handleRandomGame}>
            <Shuffle size={15} />
            <span>🎲 Surprise Me (Random Game)</span>
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)' }}>
          Explore an expansive catalog of open-source 3D racing, retro arcade classics, space shooters, and logic puzzles.
        </p>
      </div>

      {/* Control Bar: Category Filters & Search */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {gameCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstMatch = gamesList.find(g => cat.id === 'all' || g.category === cat.id);
                  if (firstMatch) setSelectedGame(firstMatch);
                }}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '220px', maxWidth: '280px', width: '100%' }}>
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input 
                type="text"
                className="search-input"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '0.45rem 0.85rem 0.45rem 2.4rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

        </div>

        {/* Game Selection Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`btn btn-sm ${selectedGame.id === game.id ? 'btn-secondary' : 'btn-outline'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <span>{game.title}</span>
            </button>
          ))}
        </div>
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
                <span>Source Code / Game Link</span>
              </a>
            )}
          </div>
        </div>

        {/* Game Content View */}
        <div style={{
          width: '100%',
          minHeight: '520px',
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
                height: '560px',
                border: 'none',
                background: '#000'
              }}
              allow="autoplay; payment; fullscreen; microphone; camera; accelerometer; gyroscope"
            />
          )}
        </div>

        {/* Game Footer Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div>{selectedGame.description}</div>
          <div>Developer / License: <strong className="text-cyan">{selectedGame.author}</strong></div>
        </div>
      </div>
    </section>
  );
}

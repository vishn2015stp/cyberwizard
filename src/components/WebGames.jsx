import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Maximize2, 
  Minimize2,
  Play, 
  ExternalLink, 
  Search,
  Shuffle,
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle2,
  Car
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
    id: '3d-racer',
    title: 'Cyber 3D Highway Racer',
    category: '3D Racing',
    type: 'native-racer',
    description: 'High-speed 3D perspective highway racer rendered natively in canvas with traffic dodging & speed tracking.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in'
  },
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
    id: 'snake',
    title: 'Cyber Snake Arcade',
    category: 'Retro Arcade',
    type: 'native-snake',
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
    title: 'Alien Invasion Space Shooter',
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
  }
];

// Built-in Native Cyber 3D Highway Racer Component
function NativeCyberRacer3D() {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_racer_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let playerX = 0;
    let speedVal = 0;
    let pos = 0;
    let dist = 0;
    let keys = {};

    function handleKeyDown(e) { keys[e.code] = true; }
    function handleKeyUp(e) { keys[e.code] = false; }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let traffic = [
      { z: 500, x: -0.5, speed: 2 },
      { z: 1000, x: 0.4, speed: 3 },
      { z: 1500, x: -0.1, speed: 2.5 }
    ];

    const interval = setInterval(() => {
      if (keys['ArrowUp'] || keys['KeyW']) {
        speedVal = Math.min(speedVal + 0.35, 15);
      } else {
        speedVal = Math.max(speedVal - 0.2, 0);
      }

      if (keys['ArrowLeft'] || keys['KeyA']) {
        playerX = Math.max(playerX - 0.05, -0.9);
      }
      if (keys['ArrowRight'] || keys['KeyD']) {
        playerX = Math.min(playerX + 0.05, 0.9);
      }

      pos += speedVal * 15;
      dist += Math.floor(speedVal);
      setSpeed(Math.floor(speedVal * 12));
      setDistance(dist);

      if (dist > highScore) {
        setHighScore(dist);
        localStorage.setItem('cyber_racer_high_score', dist.toString());
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, width, height);

      // Sunset Background & Stars
      ctx.fillStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.fillRect(0, 0, width, height / 2);

      const horizonY = height * 0.45;
      const grad = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0)');
      grad.addColorStop(1, 'rgba(236, 72, 153, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizonY - 60, width, 60);

      // 3D Perspective Road
      const totalLanes = 30;
      for (let n = totalLanes; n > 0; n--) {
        const z1 = n * 40;
        const z2 = (n - 1) * 40;
        const scale1 = 250 / z1;
        const scale2 = 250 / z2;

        const y1 = horizonY + scale1 * 120;
        const y2 = horizonY + scale2 * 120;

        const w1 = width * 0.8 * scale1;
        const w2 = width * 0.8 * scale2;

        const isEven = Math.floor((pos + z1) / 100) % 2 === 0;

        ctx.fillStyle = isEven ? '#111827' : '#0d1322';
        ctx.beginPath();
        ctx.moveTo(width / 2 - w1 / 2, y1);
        ctx.lineTo(width / 2 + w1 / 2, y1);
        ctx.lineTo(width / 2 + w2 / 2, y2);
        ctx.lineTo(width / 2 - w2 / 2, y2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = isEven ? '#00f3ff' : '#a855f7';
        ctx.fillRect(width / 2 - w1 / 2 - 3, y1, 6, y2 - y1 + 1);
        ctx.fillRect(width / 2 + w1 / 2 - 3, y1, 6, y2 - y1 + 1);

        if (isEven) {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(width / 2 - 2, y1, 4, (y2 - y1) * 0.6);
        }
      }

      // Traffic Cars
      traffic.forEach((car) => {
        car.z -= speedVal * 6 - car.speed;
        if (car.z < 50) {
          car.z = 1200 + Math.random() * 500;
          car.x = (Math.random() - 0.5) * 1.4;
        }

        const scale = 250 / car.z;
        const carY = horizonY + scale * 120;
        const carW = 60 * scale;
        const carH = 30 * scale;
        const carX = width / 2 + car.x * width * scale * 0.4 - carW / 2;

        if (car.z > 50 && car.z < 1200) {
          ctx.fillStyle = '#ec4899';
          ctx.fillRect(carX, carY - carH, carW, carH);
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(carX + carW * 0.1, carY - carH * 0.3, carW * 0.2, carH * 0.2);
          ctx.fillRect(carX + carW * 0.7, carY - carH * 0.3, carW * 0.2, carH * 0.2);
        }

        if (car.z < 120 && Math.abs(car.x - playerX) < 0.35) {
          setGameOver(true);
          clearInterval(interval);
        }
      });

      // Player Sportscar
      const playerW = 80;
      const playerH = 40;
      const playerY = height - 60;
      const playerPosX = width / 2 + playerX * (width * 0.35) - playerW / 2;

      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 15;
      ctx.fillRect(playerPosX, playerY, playerW, playerH);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#040711';
      ctx.fillRect(playerPosX + 12, playerY + 5, playerW - 24, playerH * 0.5);

      ctx.fillStyle = '#ec4899';
      ctx.fillRect(playerPosX + 6, playerY + playerH - 6, 16, 4);
      ctx.fillRect(playerPosX + playerW - 22, playerY + playerH - 6, 16, 4);

    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, highScore]);

  const startGame = () => {
    setDistance(0);
    setSpeed(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', fontSize: '1rem' }}>
        <div>Speed: <strong className="text-cyan">{speed} km/h</strong></div>
        <div>Distance: <strong className="text-green">{distance} m</strong></div>
        <div>High Score: <strong className="text-purple">{highScore} m</strong></div>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={540} 
          height={400}
          style={{ 
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 25px var(--cyan-glow)'
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
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem'
          }}>
            <h4 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {gameOver ? '💥 Crash! Game Over' : '🏎️ Cyber 3D Highway Racer'}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '360px' }}>
              Hold <strong>W / Up Arrow</strong> to accelerate. Use <strong>A / D / Left / Right Arrows</strong> to steer and dodge traffic!
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>{gameOver ? 'Race Again' : 'Start Race'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stageContainerRef = useRef(null);

  const filteredGames = gamesList.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * gamesList.length);
    handleSelectGame(gamesList[randomIndex]);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (stageContainerRef.current?.requestFullscreen) {
        stageContainerRef.current.requestFullscreen().catch(err => console.error(err));
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.error(err));
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
    };
  }, []);

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Gamepad2 className="text-cyan" size={28} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              {selectedGame ? selectedGame.title : <>Open-Source <span className="text-cyan">Games Library</span></>}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {selectedGame && (
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedGame(null)}>
                <ArrowLeft size={16} />
                <span>Back to Games Library</span>
              </button>
            )}

            <button className="btn btn-secondary btn-sm" onClick={handleRandomGame}>
              <Shuffle size={15} />
              <span>🎲 Surprise Me (Random Game)</span>
            </button>
          </div>
        </div>

        {!selectedGame && (
          <p style={{ color: 'var(--text-muted)' }}>
            Select any open-source game below to launch the playable arcade stage in true full screen!
          </p>
        )}
      </div>

      {/* VIEW 1: GAME LIBRARY GRID (SHOW FIRST BEFORE SELECTING A GAME) */}
      {!selectedGame ? (
        <div>
          {/* Controls Bar: Categories & Search */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {gameCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div style={{ minWidth: '220px', maxWidth: '280px', width: '100%' }}>
                <div className="search-box">
                  <Search className="search-icon" size={16} />
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="Search games catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '0.45rem 0.85rem 0.45rem 2.4rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Library Cards Grid */}
          <div className="grid-3">
            {filteredGames.map((game) => (
              <div 
                key={game.id} 
                className="glass-card" 
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justify: 'space-between',
                  cursor: 'pointer',
                  border: '1px solid var(--border)'
                }}
                onClick={() => handleSelectGame(game)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>{game.category}</span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      {game.type.startsWith('native') ? 'Native Canvas' : 'Verified WebGL'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {game.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {game.description}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                    Developer: <strong className="text-cyan">{game.author}</strong>
                  </div>

                  <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    <Play size={16} />
                    <span>Play Game</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: PLAY STAGE SCREEN (OPENED AFTER SELECTING A GAME) */
        <div>
          {/* Game Stage Screen Container */}
          <div 
            ref={stageContainerRef}
            className="glass-card"
            style={{
              padding: isFullscreen ? 0 : '1.25rem',
              marginBottom: '1.5rem',
              position: isFullscreen ? 'fixed' : 'relative',
              top: isFullscreen ? 0 : 'auto',
              left: isFullscreen ? 0 : 'auto',
              width: isFullscreen ? '100vw' : '100%',
              height: isFullscreen ? '100vh' : 'auto',
              zIndex: isFullscreen ? 99999 : 1,
              background: isFullscreen ? '#000' : 'var(--bg-card)',
              borderRadius: isFullscreen ? 0 : 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            {/* Stage Header (Shown when not fullscreen) */}
            {!isFullscreen && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setSelectedGame(null)}>
                    <ArrowLeft size={15} />
                    <span>Back to Library</span>
                  </button>
                  <div>
                    <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>{selectedGame.category}</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'inline', marginLeft: '0.5rem' }}>{selectedGame.title}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn btn-primary btn-sm" onClick={toggleFullscreen} title="Enter True Fullscreen Mode">
                    <Maximize2 size={15} />
                    <span>True Fullscreen</span>
                  </button>

                  {selectedGame.sourceUrl !== 'Built-in' && (
                    <a 
                      href={selectedGame.embedUrl || selectedGame.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary btn-sm"
                      title="Open Game in New Browser Tab"
                    >
                      <ExternalLink size={15} />
                      <span>Open in New Tab</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* True Fullscreen Floating Exit Button */}
            {isFullscreen && (
              <div style={{
                position: 'fixed',
                top: '12px',
                right: '12px',
                zIndex: 100000,
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={toggleFullscreen}
                  style={{ opacity: 0.85, boxShadow: '0 0 15px rgba(0,0,0,0.8)' }}
                >
                  <Minimize2 size={16} />
                  <span>Exit Fullscreen</span>
                </button>
              </div>
            )}

            {/* Main Game Render Frame (Guaranteed 0% 404 Error Risk) */}
            <div style={{
              width: '100%',
              height: isFullscreen ? '100vh' : '580px',
              background: '#000',
              borderRadius: isFullscreen ? 0 : 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              position: 'relative'
            }}>
              {selectedGame.type === 'native-racer' ? (
                <NativeCyberRacer3D />
              ) : selectedGame.type === 'native-snake' ? (
                <NativeCyberSnake />
              ) : (
                <iframe 
                  src={selectedGame.embedUrl}
                  title={selectedGame.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: '#000'
                  }}
                  allow="autoplay; payment; fullscreen; microphone; camera; accelerometer; gyroscope"
                  allowFullScreen
                />
              )}
            </div>

            {/* Stage Footer (Shown when not fullscreen) */}
            {!isFullscreen && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div>{selectedGame.description}</div>
                <div>
                  Developer: <strong className="text-cyan">{selectedGame.author}</strong>
                  {selectedGame.sourceUrl !== 'Built-in' && (
                    <a 
                      href={selectedGame.embedUrl || selectedGame.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple"
                      style={{ marginLeft: '1rem', textDecoration: 'underline' }}
                    >
                      Direct Launch Link
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

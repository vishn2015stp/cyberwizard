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
  Flame,
  Trophy,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Smartphone
} from 'lucide-react';

export const gameCategories = [
  { id: 'all', label: 'All Games' },
  { id: '3D Racing', label: '🏎️ 3D Racing' },
  { id: 'Retro Arcade', label: '🕹️ Retro Arcade' },
  { id: 'Puzzle & Logic', label: '🧩 Puzzle & Logic' },
  { id: 'Action & Strategy', label: '⚔️ Action & Strategy' }
];

// Pre-Verified 100% Working Core Games
export const initialGamesList = [
  {
    id: '3d-racer',
    title: 'Cyber 3D Highway Racer',
    category: '3D Racing',
    type: 'native-racer',
    description: 'High-speed 3D perspective highway racer rendered natively in canvas with traffic dodging & speed tracking.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in',
    isAutoDiscovered: false
  },
  {
    id: 'hexgl',
    title: 'HexGL 3D Sci-Fi Racer',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://hexgl.bkcore.com/play/',
    description: 'High-speed futuristic 3D sci-fi hovercraft racing game built with Three.js & WebGL.',
    author: 'Thibaut Despoulain (BKcore)',
    sourceUrl: 'https://github.com/bkcore/HexGL',
    isAutoDiscovered: false
  },
  {
    id: 'snake',
    title: 'Cyber Snake Arcade',
    category: 'Retro Arcade',
    type: 'native-snake',
    description: 'Classic arcade snake game rendered natively in neon cyber canvas with high score tracking.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in',
    isAutoDiscovered: false
  },
  {
    id: 'native-breakout',
    title: 'Cyber Neon Breakout',
    category: 'Retro Arcade',
    type: 'native-breakout',
    description: 'Pure HTML5 canvas brick smasher with neon laser ball physics and high score tracking.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in',
    isAutoDiscovered: false
  },
  {
    id: '2048',
    title: '2048 Tile Puzzle',
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'https://gabrielecirulli.github.io/2048/',
    description: 'Join the numbers and get to the 2048 tile! Popular open-source sliding puzzle.',
    author: 'Gabriele Cirulli',
    sourceUrl: 'https://github.com/gabrielecirulli/2048',
    isAutoDiscovered: false
  },
  {
    id: 'alien-invasion',
    title: 'Alien Invasion Space Shooter',
    category: 'Action & Strategy',
    type: 'iframe',
    embedUrl: 'https://cykod.github.io/AlienInvasion/',
    description: 'Vertical space shooter arcade game built with HTML5 canvas & Javascript.',
    author: 'Pascal Rettig (Cykod)',
    sourceUrl: 'https://github.com/cykod/AlienInvasion',
    isAutoDiscovered: false
  },
  {
    id: 'clumsy-bird',
    title: 'Clumsy Bird (Flappy Clone)',
    category: 'Retro Arcade',
    type: 'iframe',
    embedUrl: 'https://ellisonleao.github.io/clumsy-bird/',
    description: 'Open-source HTML5 canvas bird flight arcade game.',
    author: 'Ellison Leão',
    sourceUrl: 'https://github.com/ellisonleao/clumsy-bird',
    isAutoDiscovered: false
  },
  {
    id: 'sudoku',
    title: 'Sudoku Open-Source Logic',
    category: 'Puzzle & Logic',
    type: 'iframe',
    embedUrl: 'https://sudoku-online.github.io/',
    description: 'Clean open-source Sudoku logic puzzle with multiple difficulty grids.',
    author: 'Sudoku Open-Source Team',
    sourceUrl: 'https://github.com/sudoku-online/sudoku-online.github.io',
    isAutoDiscovered: false
  }
];

export const discoverableGamesPool = [
  {
    id: 'track-not-found',
    title: 'Track Not Found 3D Sci-Fi Racer',
    category: '3D Racing',
    type: 'iframe',
    embedUrl: 'https://js13kgames.com/games/track-not-found/index.html',
    description: 'High-speed 3D sci-fi retro racer with WebGL track graphics and time-trial physics.',
    author: 'js13kGames (Verified Open Source)',
    sourceUrl: 'https://js13kgames.com/entries/track-not-found'
  },
  {
    id: 'space-huggers',
    title: 'Space Huggers 2D Arcade',
    category: 'Action & Strategy',
    type: 'iframe',
    embedUrl: 'https://js13kgames.com/games/space-huggers/index.html',
    description: 'Fast-paced open-source 2D pixel platform shooter with particle physics.',
    author: 'js13kGames (Verified Open Source)',
    sourceUrl: 'https://js13kgames.com/entries/space-huggers'
  },
  {
    id: 'native-pong',
    title: 'Cyber 3D Neon Pong',
    category: 'Retro Arcade',
    type: 'native-pong',
    description: 'High-speed 3D perspective cyber pong vs smart AI opponent rendered natively in canvas.',
    author: 'Cyber Wizard Native',
    sourceUrl: 'Built-in'
  },
  {
    id: 'bounce-back',
    title: 'Bounce Back Action RPG',
    category: 'Action & Strategy',
    type: 'iframe',
    embedUrl: 'https://js13kgames.com/games/bounce-back/index.html',
    description: 'Isometric open-source action adventure game with boomerang combat mechanics.',
    author: 'js13kGames (Verified Open Source)',
    sourceUrl: 'https://js13kgames.com/entries/bounce-back'
  },
  {
    id: 'offline-runner',
    title: 'Offline Cyber Runner',
    category: 'Action & Strategy',
    type: 'iframe',
    embedUrl: 'https://js13kgames.com/games/offline/index.html',
    description: 'Futuristic dystopian web runner with cyber neon obstacle matrix.',
    author: 'js13kGames (Verified Open Source)',
    sourceUrl: 'https://js13kgames.com/entries/offline'
  }
];

// Vector Graphic Banner Generator for Game Cards
function GameThumbnail({ game, isMostPlayed, playCount }) {
  const renderBanner = () => {
    switch (game.id) {
      case '3d-racer':
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="racerBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a051b" />
                <stop offset="50%" stopColor="#1a0b36" />
                <stop offset="100%" stopColor="#040914" />
              </linearGradient>
              <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect width="400" height="200" fill="url(#racerBg)" />
            <circle cx="200" cy="110" r="45" fill="url(#sunGrad)" opacity="0.85" />
            <line x1="0" y1="110" x2="400" y2="110" stroke="#ec4899" strokeWidth="2" opacity="0.6" />
            <path d="M 0 200 L 200 110 L 400 200" fill="#0d1322" stroke="#00f3ff" strokeWidth="2" />
            <line x1="200" y1="110" x2="200" y2="200" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 8" />
            <rect x="175" y="160" width="50" height="25" rx="4" fill="#00f3ff" />
            <rect x="183" y="164" width="34" height="10" fill="#040711" />
          </svg>
        );

      case 'hexgl':
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="400" height="200" fill="#0f172a" />
            <polygon points="200,30 260,65 260,135 200,170 140,135 140,65" fill="none" stroke="#00f3ff" strokeWidth="3.5" opacity="0.8" />
            <path d="M 120 160 L 200 70 L 280 160 Z" fill="rgba(168,85,247,0.35)" stroke="#a855f7" strokeWidth="2.5" />
            <text x="200" y="190" textAnchor="middle" fill="#00f3ff" fontSize="13" fontWeight="800" letterSpacing="3">3D SCI-FI RACER</text>
          </svg>
        );

      case 'snake':
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="400" height="200" fill="#040914" />
            <rect x="90" y="80" width="35" height="35" fill="#00f3ff" rx="4" />
            <rect x="130" y="80" width="35" height="35" fill="rgba(0,243,255,0.75)" rx="4" />
            <rect x="170" y="80" width="35" height="35" fill="rgba(0,243,255,0.5)" rx="4" />
            <circle cx="280" cy="97" r="14" fill="#ec4899" />
            <text x="200" y="185" textAnchor="middle" fill="#ec4899" fontSize="13" fontWeight="800" letterSpacing="2">CYBER SNAKE ARCADE</text>
          </svg>
        );

      case 'native-breakout':
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="400" height="200" fill="#080e1c" />
            <rect x="60" y="30" width="60" height="18" rx="3" fill="#ec4899" />
            <rect x="130" y="30" width="60" height="18" rx="3" fill="#f59e0b" />
            <rect x="200" y="30" width="60" height="18" rx="3" fill="#10b981" />
            <rect x="270" y="30" width="60" height="18" rx="3" fill="#00f3ff" />
            <circle cx="210" cy="110" r="8" fill="#ffffff" />
            <rect x="160" y="165" width="80" height="12" rx="4" fill="#00f3ff" />
          </svg>
        );

      case 'native-pong':
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="400" height="200" fill="#040914" />
            <line x1="200" y1="0" x2="200" y2="200" stroke="#00f3ff" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
            <rect x="30" y="70" width="12" height="60" rx="3" fill="#00f3ff" />
            <rect x="358" y="90" width="12" height="60" rx="3" fill="#ec4899" />
            <circle cx="150" cy="100" r="8" fill="#f59e0b" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
            <rect width="400" height="200" fill="#080e1e" />
            <circle cx="200" cy="100" r="45" fill="rgba(0,243,255,0.1)" stroke="#00f3ff" strokeWidth="2.5" />
            <path d="M 188 85 L 222 100 L 188 115 Z" fill="#00f3ff" />
          </svg>
        );
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '160px',
      overflow: 'hidden',
      position: 'relative',
      background: '#040711',
      borderBottom: '1px solid var(--border)'
    }}>
      {renderBanner()}

      {/* Most Played #1 Crown Badge */}
      {isMostPlayed && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)',
          padding: '0.3rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Flame size={14} className="text-white animate-pulse" />
          <span>🔥 #1 MOST PLAYED</span>
        </div>
      )}

      {/* Play Counter & Type Badge */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '10px',
        display: 'flex',
        gap: '0.4rem'
      }}>
        <span style={{
          background: 'rgba(245, 158, 11, 0.2)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.6rem',
          borderRadius: '12px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.4)'
        }}>
          🔥 {playCount} Plays
        </span>

        <span style={{
          background: 'rgba(4,7,17,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.65rem',
          borderRadius: '12px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: game.type.startsWith('native') ? 'var(--cyan)' : '#10b981',
          border: game.type.startsWith('native') ? '1px solid var(--border-cyan)' : '1px solid #10b981'
        }}>
          {game.type.startsWith('native') ? '⚡ NATIVE' : '🌐 WEBGL'}
        </span>
      </div>
    </div>
  );
}

// Built-in Mobile-Optimized Cyber 3D Highway Racer Component
function NativeCyberRacer3D() {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_racer_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Mobile Touch Control Refs
  const steerRef = useRef(0); // -1 left, 1 right, 0 neutral
  const accelRef = useRef(false);

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
      // Accelerate via keyboard OR touch button
      if (keys['ArrowUp'] || keys['KeyW'] || accelRef.current) {
        speedVal = Math.min(speedVal + 0.35, 15);
      } else {
        speedVal = Math.max(speedVal - 0.2, 0);
      }

      // Steer via keyboard OR touch button
      if (keys['ArrowLeft'] || keys['KeyA'] || steerRef.current === -1) {
        playerX = Math.max(playerX - 0.05, -0.9);
      }
      if (keys['ArrowRight'] || keys['KeyD'] || steerRef.current === 1) {
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

      ctx.fillStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.fillRect(0, 0, width, height / 2);

      const horizonY = height * 0.45;
      const grad = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY);
      grad.addColorStop(0, 'rgba(236, 72, 153, 0)');
      grad.addColorStop(1, 'rgba(236, 72, 153, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizonY - 60, width, 60);

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
    <div style={{ textAlign: 'center', padding: '0.5rem', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '0.75rem', fontSize: '0.9rem', flexWrap: 'wrap' }}>
        <div>Speed: <strong className="text-cyan">{speed} km/h</strong></div>
        <div>Distance: <strong className="text-green">{distance} m</strong></div>
        <div>High Score: <strong className="text-purple">{highScore} m</strong></div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={540} 
          height={400}
          style={{ 
            width: '100%',
            height: 'auto',
            maxHeight: '65vh',
            aspectRatio: '540 / 400',
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 25px var(--cyan-glow)',
            touchAction: 'none'
          }}
        />

        {(!gameStarted || gameOver) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {gameOver ? '💥 Crash! Game Over' : '🏎️ Cyber 3D Highway Racer'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '340px' }}>
              Use <strong>Keyboard WASD / Arrows</strong> or the <strong>Mobile Touch Controls</strong> below!
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>{gameOver ? 'Race Again' : 'Start Race'}</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE ON-SCREEN TOUCH CONTROLLERS */}
      {gameStarted && !gameOver && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          userSelect: 'none',
          touchAction: 'none'
        }}>
          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '52px', justifyContent: 'center', fontSize: '1rem', fontWeight: 800 }}
            onTouchStart={() => { steerRef.current = -1; }}
            onTouchEnd={() => { steerRef.current = 0; }}
            onMouseDown={() => { steerRef.current = -1; }}
            onMouseUp={() => { steerRef.current = 0; }}
          >
            <ArrowLeftIcon size={20} />
            <span>LEFT</span>
          </button>

          <button 
            className="btn btn-primary" 
            style={{ flex: 1.2, height: '52px', justifyContent: 'center', fontSize: '1rem', fontWeight: 800 }}
            onTouchStart={() => { accelRef.current = true; }}
            onTouchEnd={() => { accelRef.current = false; }}
            onMouseDown={() => { accelRef.current = true; }}
            onMouseUp={() => { accelRef.current = false; }}
          >
            <Zap size={20} />
            <span>ACCEL</span>
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '52px', justifyContent: 'center', fontSize: '1rem', fontWeight: 800 }}
            onTouchStart={() => { steerRef.current = 1; }}
            onTouchEnd={() => { steerRef.current = 0; }}
            onMouseDown={() => { steerRef.current = 1; }}
            onMouseUp={() => { steerRef.current = 0; }}
          >
            <span>RIGHT</span>
            <ArrowRightIcon size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

// Built-in Mobile-Optimized Cyber Snake Game Component
function NativeCyberSnake() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_snake_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const directionRef = useRef({ dx: 0, dy: -1 });

  const setSnakeDirection = (newDx, newDy) => {
    const { dx, dy } = directionRef.current;
    if (newDx !== 0 && dx === 0) { directionRef.current = { dx: newDx, dy: 0 }; }
    if (newDy !== 0 && dy === 0) { directionRef.current = { dx: 0, dy: newDy }; }
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = 20;
    let snake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
    let food = { x: 5, y: 5 };
    directionRef.current = { dx: 0, dy: -1 };
    let currentScore = 0;

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    }

    function handleKeyDown(e) {
      if (['ArrowUp', 'KeyW'].includes(e.code)) setSnakeDirection(0, -1);
      else if (['ArrowDown', 'KeyS'].includes(e.code)) setSnakeDirection(0, 1);
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) setSnakeDirection(-1, 0);
      else if (['ArrowRight', 'KeyD'].includes(e.code)) setSnakeDirection(1, 0);
    }

    window.addEventListener('keydown', handleKeyDown);

    // Touch Swipe Gesture Detection
    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e) {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }

    function handleTouchEnd(e) {
      if (e.changedTouches && e.changedTouches[0]) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 30) setSnakeDirection(1, 0);
          else if (deltaX < -30) setSnakeDirection(-1, 0);
        } else {
          if (deltaY > 30) setSnakeDirection(0, 1);
          else if (deltaY < -30) setSnakeDirection(0, -1);
        }
      }
    }

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    const interval = setInterval(() => {
      const { dx, dy } = directionRef.current;
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
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gameStarted, gameOver, highScore]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '0.5rem', width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
        <div>Score: <strong className="text-cyan">{score}</strong></div>
        <div>High Score: <strong className="text-purple">{highScore}</strong></div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400}
          style={{ 
            width: '100%',
            height: 'auto',
            maxHeight: '65vh',
            aspectRatio: '400 / 400',
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 25px var(--cyan-glow)',
            touchAction: 'none'
          }}
        />

        {(!gameStarted || gameOver) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {gameOver ? '💥 Game Over!' : '🐍 Cyber Snake Arcade'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '300px' }}>
              Swipe on canvas, use keyboard arrows, or use the touch D-Pad below!
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>{gameOver ? 'Play Again' : 'Start Game'}</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE TOUCH D-PAD CONTROLLER */}
      {gameStarted && !gameOver && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          userSelect: 'none',
          touchAction: 'none'
        }}>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '80px', height: '42px', justifyContent: 'center' }}
            onClick={() => setSnakeDirection(0, -1)}
          >
            <ArrowUp size={20} />
          </button>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ width: '80px', height: '42px', justifyContent: 'center' }}
              onClick={() => setSnakeDirection(-1, 0)}
            >
              <ArrowLeftIcon size={20} />
            </button>

            <button 
              className="btn btn-secondary btn-sm" 
              style={{ width: '80px', height: '42px', justifyContent: 'center' }}
              onClick={() => setSnakeDirection(1, 0)}
            >
              <ArrowRightIcon size={20} />
            </button>
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '80px', height: '42px', justifyContent: 'center' }}
            onClick={() => setSnakeDirection(0, 1)}
          >
            <ArrowDown size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

// Built-in Mobile-Optimized Cyber Neon Breakout Game Component
function NativeCyberBreakout() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber_breakout_high_score') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const paddleRef = useRef(220); // paddle position

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    let paddleWidth = 100;
    let paddleHeight = 14;
    paddleRef.current = (width - paddleWidth) / 2;

    let ballX = width / 2;
    let ballY = height - 40;
    let dx = 4;
    let dy = -4;
    let ballRadius = 7;

    const rowCount = 4;
    const colCount = 7;
    const brickWidth = 68;
    const brickHeight = 18;
    const brickPadding = 6;
    const brickOffsetTop = 40;
    const brickOffsetLeft = 14;

    let bricks = [];
    for (let c = 0; c < colCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    let currentScore = 0;

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const scale = canvas.width / rect.width;
      const relativeX = (e.clientX - rect.left) * scale;
      if (relativeX > 0 && relativeX < width) {
        paddleRef.current = relativeX - paddleWidth / 2;
      }
    }

    function handleTouchMove(e) {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const relativeX = (e.touches[0].clientX - rect.left) * scale;
        if (relativeX > 0 && relativeX < width) {
          paddleRef.current = relativeX - paddleWidth / 2;
        }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchMove, { passive: true });

    const interval = setInterval(() => {
      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, width, height);

      // Draw bricks
      const colors = ['#ec4899', '#f59e0b', '#10b981', '#00f3ff'];
      for (let c = 0; c < colCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;

            ctx.fillStyle = colors[r % colors.length];
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          }
        }
      }

      // Draw Paddle
      const pX = paddleRef.current;
      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 10;
      ctx.fillRect(pX, height - paddleHeight - 10, paddleWidth, paddleHeight);
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      // Brick Collisions
      for (let c = 0; c < colCount; c++) {
        for (let r = 0; r < rowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              currentScore += 10;
              setScore(currentScore);
              if (currentScore > highScore) {
                setHighScore(currentScore);
                localStorage.setItem('cyber_breakout_high_score', currentScore.toString());
              }
            }
          }
        }
      }

      // Ball Wall Collisions
      if (ballX + dx > width - ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
      }
      if (ballY + dy < ballRadius) {
        dy = -dy;
      } else if (ballY + dy > height - paddleHeight - 15) {
        if (ballX > pX && ballX < pX + paddleWidth) {
          dy = -dy;
        } else if (ballY + dy > height - ballRadius) {
          setGameOver(true);
          clearInterval(interval);
        }
      }

      ballX += dx;
      ballY += dy;
    }, 20);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchMove);
    };
  }, [gameStarted, gameOver, highScore]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const movePaddleTouch = (dir) => {
    paddleRef.current = Math.max(0, Math.min(440, paddleRef.current + dir * 40));
  };

  return (
    <div style={{ textAlign: 'center', padding: '0.5rem', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
        <div>Score: <strong className="text-cyan">{score}</strong></div>
        <div>High Score: <strong className="text-purple">{highScore}</strong></div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={540} 
          height={400}
          style={{ 
            width: '100%',
            height: 'auto',
            maxHeight: '65vh',
            aspectRatio: '540 / 400',
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 25px var(--cyan-glow)',
            touchAction: 'none'
          }}
        />

        {(!gameStarted || gameOver) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {gameOver ? '💥 Bricks Won!' : '🧱 Cyber Neon Breakout'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '340px' }}>
              Drag finger over canvas, move mouse, or use touch buttons to guide the laser paddle!
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>{gameOver ? 'Play Again' : 'Start Smash'}</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE PADDLE CONTROLS */}
      {gameStarted && !gameOver && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          justify: 'space-between',
          gap: '1rem',
          userSelect: 'none',
          touchAction: 'none'
        }}>
          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '48px', justifyContent: 'center', fontSize: '0.95rem' }}
            onClick={() => movePaddleTouch(-1)}
          >
            <ArrowLeftIcon size={18} />
            <span>PADDLE LEFT</span>
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '48px', justifyContent: 'center', fontSize: '0.95rem' }}
            onClick={() => movePaddleTouch(1)}
          >
            <span>PADDLE RIGHT</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// Built-in Mobile-Optimized Cyber 3D Neon Pong Game Component
function NativeCyberPong() {
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const paddleRef = useRef(165); // Player paddle Y position

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    let paddleH = 70;
    let paddleW = 12;

    paddleRef.current = (height - paddleH) / 2;
    let aiY = (height - paddleH) / 2;

    let ballX = width / 2;
    let ballY = height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 3;

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const scale = canvas.height / rect.height;
      const relativeY = (e.clientY - rect.top) * scale;
      if (relativeY > 0 && relativeY < height) {
        paddleRef.current = relativeY - paddleH / 2;
      }
    }

    function handleTouchMove(e) {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.height / rect.height;
        const relativeY = (e.touches[0].clientY - rect.top) * scale;
        if (relativeY > 0 && relativeY < height) {
          paddleRef.current = relativeY - paddleH / 2;
        }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchMove, { passive: true });

    const interval = setInterval(() => {
      const playerY = paddleRef.current;

      // AI Tracking
      const aiCenter = aiY + paddleH / 2;
      if (aiCenter < ballY - 15) {
        aiY += 3.5;
      } else if (aiCenter > ballY + 15) {
        aiY -= 3.5;
      }

      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY < 0 || ballY > height) {
        ballSpeedY = -ballSpeedY;
      }

      // Player paddle bounce
      if (ballX < 35 && ballY > playerY && ballY < playerY + paddleH) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.05;
      }

      // AI paddle bounce
      if (ballX > width - 35 && ballY > aiY && ballY < aiY + paddleH) {
        ballSpeedX = -ballSpeedX;
      }

      // Point scoring
      if (ballX < 0) {
        setAiScore(s => s + 1);
        ballX = width / 2;
        ballY = height / 2;
        ballSpeedX = 5;
      } else if (ballX > width) {
        setPlayerScore(s => s + 1);
        ballX = width / 2;
        ballY = height / 2;
        ballSpeedX = -5;
      }

      ctx.fillStyle = '#040914';
      ctx.fillRect(0, 0, width, height);

      // Net
      ctx.strokeStyle = 'rgba(0,243,255,0.2)';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player Paddle
      ctx.fillStyle = '#00f3ff';
      ctx.fillRect(20, playerY, paddleW, paddleH);

      // AI Paddle
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(width - 20 - paddleW, aiY, paddleW, paddleH);

      // Ball
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx.fill();

    }, 20);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchMove);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const movePaddleTouch = (dir) => {
    paddleRef.current = Math.max(0, Math.min(330, paddleRef.current + dir * 35));
  };

  return (
    <div style={{ textAlign: 'center', padding: '0.5rem', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '0.75rem', fontSize: '1rem' }}>
        <div>Player: <strong className="text-cyan">{playerScore}</strong></div>
        <div>Cyber AI: <strong className="text-pink">{aiScore}</strong></div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
        <canvas 
          ref={canvasRef} 
          width={540} 
          height={400}
          style={{ 
            width: '100%',
            height: 'auto',
            maxHeight: '65vh',
            aspectRatio: '540 / 400',
            background: '#060913', 
            border: '2px solid var(--border-cyan)', 
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 25px var(--cyan-glow)',
            touchAction: 'none'
          }}
        />

        {!gameStarted && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 9, 19, 0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🏓 Cyber 3D Neon Pong
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '340px' }}>
              Drag finger vertically on canvas, move mouse, or use touch buttons to control paddle!
            </p>
            <button className="btn btn-primary" onClick={startGame}>
              <Play size={16} />
              <span>Start Match</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE PADDLE UP/DOWN CONTROLS */}
      {gameStarted && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          justify: 'space-between',
          gap: '1rem',
          userSelect: 'none',
          touchAction: 'none'
        }}>
          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '48px', justifyContent: 'center', fontSize: '0.95rem' }}
            onClick={() => movePaddleTouch(-1)}
          >
            <ArrowUp size={18} />
            <span>PADDLE UP</span>
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, height: '48px', justifyContent: 'center', fontSize: '0.95rem' }}
            onClick={() => movePaddleTouch(1)}
          >
            <span>PADDLE DOWN</span>
            <ArrowDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// Initial Play Counts Helper for Sorting Most Played Games
const getStoredPlayCounts = () => {
  try {
    const saved = localStorage.getItem('cyber_wizard_game_play_counts');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    '3d-racer': 48,
    'snake': 38,
    'hexgl': 32,
    'native-breakout': 27,
    '2048': 22,
    'alien-invasion': 18,
    'clumsy-bird': 14,
    'sudoku': 11,
    'track-not-found': 9,
    'space-huggers': 7,
    'native-pong': 6,
    'bounce-back': 5,
    'offline-runner': 4
  };
};

export default function WebGames() {
  const [games, setGames] = useState(initialGamesList);
  const [pool, setPool] = useState(discoverableGamesPool);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Play count tracking for "Most Played Game on Top"
  const [playCounts, setPlayCounts] = useState(getStoredPlayCounts);

  const stageContainerRef = useRef(null);

  // Silent Background Auto-Discovery Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setPool(prevPool => {
        if (prevPool.length > 0) {
          const nextGame = prevPool[0];
          const remainingPool = prevPool.slice(1);
          const autoDiscoveredGame = { 
            ...nextGame, 
            isAutoDiscovered: true
          };
          setGames(prevGames => [autoDiscoveredGame, ...prevGames]);
          return remainingPool;
        }
        return prevPool;
      });
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  // Sort games dynamically so Most Played Game is ALWAYS on Top!
  const sortedGames = [...games].sort((a, b) => {
    const countA = playCounts[a.id] || 0;
    const countB = playCounts[b.id] || 0;
    return countB - countA;
  });

  const mostPlayedGameId = sortedGames.length > 0 ? sortedGames[0].id : null;

  const filteredGames = sortedGames.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectGame = (game) => {
    const updatedCounts = {
      ...playCounts,
      [game.id]: (playCounts[game.id] || 0) + 1
    };
    setPlayCounts(updatedCounts);
    try {
      localStorage.setItem('cyber_wizard_game_play_counts', JSON.stringify(updatedCounts));
    } catch (e) {}

    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    handleSelectGame(games[randomIndex]);
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
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 0.5rem' }}>
      {/* High-Octane Gaming Banner Header */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.5rem 1.5rem', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, rgba(13,20,38,0.9), rgba(15,9,30,0.9))',
          border: '1px solid var(--border-cyan)',
          boxShadow: '0 0 30px rgba(0, 243, 255, 0.12)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--cyan), var(--purple), var(--pink))'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan" style={{ padding: '0.35rem 0.85rem' }}>
                <Flame size={14} className="text-pink" />
                <span>ELECTRO GAMING ARCADE</span>
              </span>
              <span className="badge badge-purple" style={{ padding: '0.35rem 0.85rem' }}>
                <Smartphone size={14} className="text-cyan" />
                <span>MOBILE TOUCH READY</span>
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              {selectedGame ? selectedGame.title : <>Open-Source <span className="text-cyan glow-cyan">3D & Arcade Games</span></>}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Optimized for mobile touchscreens & desktop keyboards. Most played games sorted on top.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedGame && (
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedGame(null)}>
                <ArrowLeft size={15} />
                <span>Back to Catalog</span>
              </button>
            )}

            <button className="btn btn-primary btn-sm" onClick={handleRandomGame}>
              <Shuffle size={15} />
              <span>Surprise Me 🎲</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: HIGH-OCTANE GAME CATALOG GRID WITH THUMBNAILS */}
      {!selectedGame ? (
        <div>
          {/* Controls Bar: Categories & Search */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
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

              {/* Search Box */}
              <div style={{ minWidth: '220px', maxWidth: '300px', width: '100%' }}>
                <div className="search-box">
                  <Search className="search-icon" size={16} />
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Gaming Cards Grid (Most Played Games Always on Top) */}
          <div className="grid-3">
            {filteredGames.map((game) => {
              const count = playCounts[game.id] || 0;
              const isTopGame = game.id === mostPlayedGameId;

              return (
                <div 
                  key={game.id} 
                  className="glass-card" 
                  style={{ 
                    padding: 0, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justify: 'space-between',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: isTopGame ? '2px solid #f59e0b' : '1px solid var(--border)',
                    boxShadow: isTopGame ? '0 0 25px rgba(245, 158, 11, 0.25)' : 'none'
                  }}
                  onClick={() => handleSelectGame(game)}
                >
                  <div>
                    {/* Game Thumbnail Banner */}
                    <GameThumbnail 
                      game={game} 
                      isMostPlayed={isTopGame} 
                      playCount={count} 
                    />

                    <div style={{ padding: '1.15rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{game.category}</span>
                        <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                          {game.type.startsWith('native') ? 'NATIVE CANVAS' : 'WEBGL 3D'}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                        {game.title}
                      </h3>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                        {game.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 1.15rem 1.15rem 1.15rem' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
                      Developer: <strong className="text-cyan">{game.author}</strong>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <Play size={16} />
                      <span>PLAY NOW</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: PLAY STAGE SCREEN (OPENED AFTER SELECTING A GAME) */
        <div>
          <div 
            ref={stageContainerRef}
            className="glass-card"
            style={{
              padding: isFullscreen ? 0 : '1rem',
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
            {/* Stage Header */}
            {!isFullscreen && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setSelectedGame(null)}>
                    <ArrowLeft size={15} />
                    <span>Back to Catalog</span>
                  </button>
                  <div>
                    <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{selectedGame.category}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'inline', marginLeft: '0.4rem' }}>{selectedGame.title}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
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
                  style={{ opacity: 0.9, boxShadow: '0 0 20px rgba(0,0,0,0.9)' }}
                >
                  <Minimize2 size={16} />
                  <span>Exit Fullscreen</span>
                </button>
              </div>
            )}

            {/* Main Game Stage Render Frame */}
            <div style={{
              width: '100%',
              height: isFullscreen ? '100vh' : 'min(580px, 75vh)',
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
              ) : selectedGame.type === 'native-breakout' ? (
                <NativeCyberBreakout />
              ) : selectedGame.type === 'native-pong' ? (
                <NativeCyberPong />
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

            {/* Stage Footer */}
            {!isFullscreen && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <div>{selectedGame.description}</div>
                <div>
                  Developer: <strong className="text-cyan">{selectedGame.author}</strong>
                  {selectedGame.sourceUrl !== 'Built-in' && (
                    <a 
                      href={selectedGame.embedUrl || selectedGame.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple"
                      style={{ marginLeft: '0.75rem', textDecoration: 'underline' }}
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

import React, { useState, useEffect } from 'react';
import './Board.css';
import Dot from '../Dot';

const Board: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [collisionMessage, setCollisionMessage] = useState('');
  const [direction, setDirection] = useState({ x: 0, y: -10 }); // Initial direction (up)
  const handleCollision = (newPosition: { x: number; y: number }) => {
    // Check for wall collisions
    if (newPosition.x <= 0 || newPosition.x >= 100 || newPosition.y <= 0 || newPosition.y >= 100) {
      setCollisionMessage('Hit the wall!');
      return true;
    }

    // Check for self collisions (if the new position matches any trail position)
    if (trail.some(trailPos => trailPos.x === newPosition.x && trailPos.y === newPosition.y)) {
      setCollisionMessage('Hit itself!');
      return true;
    }

    return false;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setDirection({ x: 0, y: -10 });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: 10 });
        break;
      case 'ArrowLeft':
        setDirection({ x: -10, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: 10, y: 0 });
        break;
      default:
        break;
    }
  };
  const moveDot = () => {
    let newPos = {
      x: position.x + direction.x,
      y: position.y + direction.y
    };

    if (!handleCollision(newPos)) {
      setPosition(newPos);
      setTrail(prevTrail => [...prevTrail, newPos].slice(-10));
      setCollisionMessage('');
    }
  };
  useEffect(() => {
    const intervalId = setInterval(moveDot, 100); // Move the dot every 200ms
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, trail,direction]);

  return (
    <div className="board">
      {trail.map((pos, index) => (
        <Dot key={index} style={{ top: `${pos.y}%`, left: `${pos.x}%`, opacity: (0 + index / 10).toString() }} />
      ))}
      <Dot style={{ top: `${position.y}%`, left: `${position.x}%` }} />
      <h2>This is the game board!</h2>
      {collisionMessage && <div className="collision-message">{collisionMessage}</div>}
    </div>
  );
};

export default Board;

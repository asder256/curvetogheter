import React, { useState, useEffect,useRef  } from 'react';
import './Board.css';
import Dot from '../Dot';
import useGameLoop from '../../hooks/useGameLoop';

const Board: React.FC = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  // const positionRef = useRef({ x: 50, y: 50 }); // Use a ref for the position
  // const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const angleRef = useRef(-90);
  const [collisionMessage, setCollisionMessage] = useState('');
  // const [direction, setDirection] = useState({ x: 0, y: -10 }); // Initial direction (up)
  const keysPressed = useRef<Set<string>>(new Set());
  const handleCollision = (newPosition: { x: number; y: number }) => {
    // Check for wall collisions
    if (newPosition.x <= 0 || newPosition.x >= 100 || newPosition.y <= 0 || newPosition.y >= 100) {
      setCollisionMessage('Hit the wall!');
      return true;
    }

    // Check for self collisions (if the new position matches any trail position)
    // if (trail.some(trailPos => trailPos.x === newPosition.x && trailPos.y === newPosition.y)) {
    //   setCollisionMessage('Hit itself!');
    //   return true;
    // }

    return false;
  };

  // old handle key
  // const handleKeyDown = (event: KeyboardEvent) => {
  //   switch (event.key) {
  //     // case 'ArrowUp':
  //     //   setDirection({ x: 0, y: -10 });
  //     //   break;
  //     // case 'ArrowDown':
  //     //   setDirection({ x: 0, y: 10 });
  //     //   break;
  //     case 'ArrowLeft':
  //       setDirection({ x: -10, y: 0 });
  //       break;
  //     case 'ArrowRight':
  //       setDirection({ x: 10, y: 0 });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  const moveDot = () => {
    const speed = 5; // Adjust for speed
    const radians = angleRef.current * (Math.PI / 180); // Convert angle to radians
    
      // positionRef.current.x= Math.max(0, Math.min(100, positionRef.current.x + Math.cos(radians) * speed))
      // positionRef.current.y= Math.max(0, Math.min(100, positionRef.current.y + Math.sin(radians) * speed))
      const newPos={
      x: Math.max(0, Math.min(100, position.x + Math.cos(radians) * speed)),
      y: Math.max(0, Math.min(100, position.y + Math.sin(radians) * speed))
    }
 

    // if (!handleCollision(newPos)) {
      setPosition(newPos);
    //   // setTrail(prevTrail => [...prevTrail, newPos].slice(-10));
    //   setCollisionMessage('');
    // }
  };
  const updateGame = () => {
    const turnSpeed = 3.14; // Adjust for turn speed
    const moveSpeed = 0.15; // Adjust for move speed

     if (keysPressed.current.has('ArrowLeft')) {
    
      angleRef.current -= turnSpeed;
   
      }
      if (keysPressed.current.has('ArrowRight')) {
        angleRef.current += turnSpeed;
      }
      // moveDot();
      setPosition(position => {
        const radians = angleRef.current * (Math.PI / 180); // Convert angle to radians
        return {
          x: position.x + Math.cos(radians) * moveSpeed,
          y: position.y + Math.sin(radians) * moveSpeed
        };
      });
    };
  
    // Update game logic here (handle key presses, move dot, check collisions, etc.)

  useGameLoop(updateGame);
  
  const handleKeyDown = (event: KeyboardEvent) => {
    keysPressed.current.add(event.key);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    keysPressed.current.delete(event.key);
  };
  useEffect(() => {
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  return (
    <div className="board">
      {/* {trail.map((pos, index) => (
        <Dot key={index} style={{ top: `${pos.y}%`, left: `${pos.x}%`, opacity: (0 + index / 10).toString() }} />
      ))} */}
      <Dot style={{ top: `${position.y}%`, left: `${position.x}%` }} />
      {/* <h2>This is the game board!</h2> */}
      {collisionMessage && <div className="collision-message">{collisionMessage}</div>}
    </div>
  );
};

export default Board;

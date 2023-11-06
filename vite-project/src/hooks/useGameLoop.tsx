// src/hooks/useGameLoop.ts
import { useRef, useEffect } from 'react';

const useGameLoop = (update: () => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const fps =64
  const interval = 1000 / fps; // Convert FPS to milliseconds per frame

  const loop = (time: number) => {
    if (!previousTimeRef.current) {
        previousTimeRef.current = time;
      }
      const deltaTime = time - previousTimeRef.current;
  
      if (deltaTime >= interval) {
        // Update the game logic
        update();
        // Adjust for the time taken for the update
        previousTimeRef.current = time - (deltaTime % interval);
      }
  
      requestRef.current = requestAnimationFrame(loop);
    };
  

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);
};

export default useGameLoop;

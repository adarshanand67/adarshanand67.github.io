"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { useUISound } from '@/hooks/useUISound'; 
interface SnakeGameProps {
    onExit: () => void;
}
const GRID_SIZE = 20;
const CELL_SIZE = 20; 
const INITIAL_SPEED = 150;
type Point = { x: number; y: number };
export default function SnakeGame({ onExit }: SnakeGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
    const foodRef = useRef<Point>({ x: 15, y: 15 });
    const directionRef = useRef<Point>({ x: 1, y: 0 });
    const nextDirectionRef = useRef<Point>({ x: 1, y: 0 });
    const speedRef = useRef(INITIAL_SPEED);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const { playSound } = useUISound(true);
    const spawnFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * (canvasRef.current!.width / CELL_SIZE)),
            y: Math.floor(Math.random() * (canvasRef.current!.height / CELL_SIZE))
        };
        foodRef.current = newFood;
    }, []);
    const resetGame = useCallback(() => {
        snakeRef.current = [{ x: 10, y: 10 }];
        directionRef.current = { x: 1, y: 0 };
        nextDirectionRef.current = { x: 1, y: 0 };
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
        speedRef.current = INITIAL_SPEED;
        spawnFood();
        playSound('success'); 
    }, [spawnFood, playSound]);
    const update = useCallback(() => {
        if (gameOver || isPaused || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const gridW = canvas.width / CELL_SIZE;
        const gridH = canvas.height / CELL_SIZE;
        directionRef.current = nextDirectionRef.current;
        const head = { ...snakeRef.current[0] };
        head.x += directionRef.current.x;
        head.y += directionRef.current.y;
        if (head.x < 0) head.x = gridW - 1;
        if (head.x >= gridW) head.x = 0;
        if (head.y < 0) head.y = gridH - 1;
        if (head.y >= gridH) head.y = 0;
        if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
            setGameOver(true);
            playSound('error');
            return;
        }
        const newSnake = [head, ...snakeRef.current];
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            setScore(s => s + 10);
            spawnFood();
            speedRef.current = Math.max(50, speedRef.current - 2);
            playSound('click'); 
        } else {
            newSnake.pop();
        }
        snakeRef.current = newSnake;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22c55e'; 
        newSnake.forEach((segment, i) => {
            ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e';
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        });
        ctx.fillStyle = '#ef4444'; 
        const food = foodRef.current;
        ctx.beginPath();
        ctx.arc(
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }, [gameOver, isPaused, spawnFood, playSound]);
    useEffect(() => {
        const loop = () => {
            update();
            gameLoopRef.current = setTimeout(loop, speedRef.current);
        };
        loop();
        return () => {
            if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
        };
    }, [update]);
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
                    e.preventDefault();
                    break;
                case 'Escape':
                    onExit();
                    break;
                case ' ': 
                    if (gameOver) {
                        resetGame();
                    } else {
                        setIsPaused(p => !p);
                    }
                    e.preventDefault();
                    break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onExit, gameOver, resetGame]);
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 text-green-500 font-mono">
            <div className="absolute top-4 left-4 text-xs opacity-70">
                <div>SCORE: {score}</div>
                <div>HIGHSCORE: {typeof window !== 'undefined' ? localStorage.getItem('snake_highscore') || 0 : 0}</div>
            </div>
            <div className="absolute top-4 right-4 text-xs opacity-70">
                [ESC] QUIT [SPACE] {gameOver ? 'RESTART' : isPaused ? 'RESUME' : 'PAUSE'}
            </div>
            <canvas
                ref={canvasRef}
                width={600}
                height={400} 
                className="border border-green-500/30 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)]"
            />
            {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4 text-red-500 animate-pulse">GAME OVER</h2>
                        <p className="mb-4 text-xl">Score: {score}</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={resetGame}
                                className="px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors rounded"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={onExit}
                                className="px-4 py-2 border border-gray-500 hover:bg-gray-700 transition-colors rounded"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

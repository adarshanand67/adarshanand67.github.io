"use client";

import { useEffect, useRef } from 'react';

interface VisualizerProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
}

export function Visualizer({ audioRef, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number>();

    useEffect(() => {
        if (!audioRef.current || !canvasRef.current) return;

        // Initialize Audio Context only once via user interaction or ensuring it exists
        if (!contextRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            contextRef.current = new AudioContextClass();
            analyserRef.current = contextRef.current.createAnalyser();
            analyserRef.current.fftSize = 64; // Low FFT size for retro bar look

            // Connect audio element to analyser and destination
            if (!sourceRef.current) {
                sourceRef.current = contextRef.current.createMediaElementSource(audioRef.current);
                sourceRef.current.connect(analyserRef.current);
                analyserRef.current.connect(contextRef.current.destination);
            }
        }

        const render = () => {
            if (!canvasRef.current || !analyserRef.current) return;

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * height;

                // Green gradient
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, '#22c55e');
                gradient.addColorStop(1, '#4ade80');

                ctx.fillStyle = gradient;
                // Add some transparency for a glow effect look
                ctx.globalAlpha = 0.8;
                ctx.fillRect(x, height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }

            if (isPlaying) {
                rafRef.current = requestAnimationFrame(render);
            }
        };

        if (isPlaying) {
            if (contextRef.current.state === 'suspended') {
                contextRef.current.resume();
            }
            render();
        } else {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        }

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [audioRef, isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            width={120}
            height={40}
            className="w-full h-full opacity-50"
        />
    );
}

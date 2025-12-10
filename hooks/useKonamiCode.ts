import { useEffect, useState, useRef } from 'react';
const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];
export const useKonamiCode = (callback: () => void) => {
    const indexRef = useRef(0);
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === KONAMI_CODE[indexRef.current]) {
                indexRef.current += 1;
                if (indexRef.current === KONAMI_CODE.length) {
                    callback();
                    indexRef.current = 0; 
                }
            } else {
                indexRef.current = 0;
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [callback]);
};

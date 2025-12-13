"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import confetti from "canvas-confetti";
import { useKonamiCode } from "@/hooks/useKonamiCode";

interface GlobalState {
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    setMatrix: (enabled: boolean) => void;

    showHobbiesModal: boolean;
    toggleHobbiesModal: () => void;
}
const GlobalContext = createContext<GlobalState | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isMatrixEnabled, setIsMatrixEnabled] = useState(true);

    const [showHobbiesModal, setShowHobbiesModal] = useState(false);

    const toggleMatrix = useCallback(() => setIsMatrixEnabled((prev) => !prev), []);
    const setMatrix = useCallback((enabled: boolean) => setIsMatrixEnabled(enabled), []);
    const toggleHobbiesModal = useCallback(() => setShowHobbiesModal((prev) => !prev), []);
    useKonamiCode(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#15803d', '#ffffff'],
        });
    });
    return (
        <GlobalContext.Provider
            value={{
                isMatrixEnabled,
                toggleMatrix,
                setMatrix,

                showHobbiesModal,
                toggleHobbiesModal,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
};

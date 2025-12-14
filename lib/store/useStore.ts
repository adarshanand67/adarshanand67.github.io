import { create } from 'zustand';

interface TerminalState {
    lines: string[];
    history: string[];
    historyIndex: number;
    input: string;
    isIntroDone: boolean;
    passwordMode: boolean;
    isExpanded: boolean;
    position: { x: number; y: number };
    isDragging: boolean;
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void;
    addLine: (line: string) => void;
    clearLines: () => void;
    setHistory: (history: string[] | ((prev: string[]) => string[])) => void;
    addToHistory: (cmd: string) => void;
    setHistoryIndex: (index: number) => void;
    setInput: (input: string) => void;
    setIsIntroDone: (done: boolean) => void;
    setPasswordMode: (mode: boolean) => void;
    setIsExpanded: (expanded: boolean) => void;
    setPosition: (pos: { x: number; y: number }) => void;
    setIsDragging: (dragging: boolean) => void;
}

interface UIState {
    isMatrixEnabled: boolean;
    isMounted: boolean;
    showHobbiesModal: boolean;
    isNavbarActive: boolean;
    expandedSections: Record<string, boolean>;
    toggleMatrix: () => void;
    setIsMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    setIsNavbarActive: (active: boolean) => void;
    toggleSectionExpanded: (section: string) => void;
}

export interface AppState extends TerminalState, UIState { }

export const useStore = create<AppState>((set) => ({
    lines: [],
    history: [],
    historyIndex: -1,
    input: '',
    isIntroDone: false,
    passwordMode: false,
    isExpanded: true,
    position: { x: 0, y: 0 },
    isDragging: false,
    isMatrixEnabled: false,
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    expandedSections: {},

    setLines: (lines) => set((state) => ({ lines: typeof lines === 'function' ? lines(state.lines) : lines })),
    addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
    clearLines: () => set({ lines: [] }),
    setHistory: (history) => set((state) => ({ history: typeof history === 'function' ? history(state.history) : history })),
    addToHistory: (cmd) => set((state) => ({ history: [...state.history, cmd], historyIndex: state.history.length + 1 })),
    setHistoryIndex: (index) => set({ historyIndex: index }),
    setInput: (input) => set({ input }),
    setIsIntroDone: (done) => set({ isIntroDone: done }),
    setPasswordMode: (mode) => set({ passwordMode: mode }),
    setIsExpanded: (expanded) => set({ isExpanded: expanded }),
    setPosition: (pos) => set({ position: pos }),
    setIsDragging: (dragging) => set({ isDragging: dragging }),
    toggleMatrix: () => set((state) => ({ isMatrixEnabled: !state.isMatrixEnabled })),
    setIsMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    toggleSectionExpanded: (section) => set((state) => ({
        expandedSections: { ...state.expandedSections, [section]: !state.expandedSections[section] }
    })),
}));

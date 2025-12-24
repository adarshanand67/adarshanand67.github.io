import { AnimeItem, Hobby, Book } from '@/types/definitions';

export interface TerminalState {
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

export interface MusicState {
    showMusicPlayer: boolean;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    currentTrackIndex: number;
    isShuffle: boolean;
    isRepeat: boolean;
    toggleMusicPlayer: () => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    setIsPlaying: (playing: boolean) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

export interface BackToTopState {
    isBackToTopVisible: boolean;
    setIsBackToTopVisible: (visible: boolean) => void;
}

export interface UIState {
    isMounted: boolean;
    showHobbiesModal: boolean;
    isNavbarActive: boolean;
    expandedSections: Record<string, boolean>;
    setIsMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    setIsNavbarActive: (active: boolean) => void;
    toggleSectionExpanded: (section: string) => void;
}

export interface AnimeState {
    animeSelectedItem: AnimeItem | null;
    animeSelectedTag: string | null;
    setAnimeSelectedItem: (item: AnimeItem | null) => void;
    setAnimeSelectedTag: (tag: string | null) => void;
}

export interface HobbyState {
    hobbySelectedItem: Hobby | null;
    setHobbySelectedItem: (item: Hobby | null) => void;
}

export interface SearchState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface BookState {
    bookSelectedItem: Book | null;
    setBookSelectedItem: (item: Book | null) => void;
}

export interface RandomizerState {
    randomItemIndex: number | null;
    isRandomizing: boolean;
    setRandomItemIndex: (index: number | null) => void;
    setIsRandomizing: (isRandomizing: boolean) => void;
}

export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface TodoState {
    todos: TodoItem[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearTodos: () => void;
}

export interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

export interface GuestbookState {
    guestbookEntries: GuestbookEntry[];
    addGuestbookEntry: (entry: GuestbookEntry) => void;
}

export interface AppState extends TerminalState, MusicState, BackToTopState, UIState, AnimeState, HobbyState, BookState, SearchState, RandomizerState, TodoState, GuestbookState { }

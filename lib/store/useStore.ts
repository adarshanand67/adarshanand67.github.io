"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from './types';
import { createTerminalSlice } from './slices/terminalSlice';
import { createMusicSlice } from './slices/musicSlice';
import { createUISlice } from './slices/uiSlice';
import { createContentSlice } from './slices/contentSlice';
import { createUtilitySlice } from './slices/utilitySlice';

export const useStore = create<AppState>()(
    persist(
        (...a) => ({
            ...createTerminalSlice(...a),
            ...createMusicSlice(...a),
            ...createUISlice(...a),
            ...createContentSlice(...a),
            ...createUtilitySlice(...a),
        }),
        {
            name: 'adarsh-storage',
            partialize: (state) => ({
                expandedSections: state.expandedSections,
                todos: state.todos,
                volume: state.volume,
                isMuted: state.isMuted,
                isMatrixEnabled: state.isMatrixEnabled,
                guestbookEntries: state.guestbookEntries
            }),
        }
    )
);

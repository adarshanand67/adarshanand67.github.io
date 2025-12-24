import { StateCreator } from 'zustand';
import { AppState, UIState, BackToTopState } from '../types';

export const createUISlice: StateCreator<AppState, [], [], UIState & BackToTopState> = (set) => ({
    isMatrixEnabled: true,
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    expandedSections: {
        experience: true,
        techstack: true,
        contact: true
    },
    isBackToTopVisible: false,
    setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),
    toggleMatrix: () => set((state) => ({ isMatrixEnabled: !state.isMatrixEnabled })),
    setIsMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    toggleSectionExpanded: (section) => set((state) => ({
        expandedSections: {
            ...state.expandedSections,
            [section]: !state.expandedSections[section]
        }
    })),
});

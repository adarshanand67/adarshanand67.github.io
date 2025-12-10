import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Terminal from '../Terminal';
jest.mock('@/components/common/GlobalProvider', () => ({
    useGlobalState: () => ({
        isMatrixEnabled: false,
        toggleMatrix: jest.fn(),
        setPasswordMode: jest.fn(),
        passwordMode: false,
        addCommandToHistory: jest.fn(),
        commandHistory: [],
        setHistory: jest.fn(),
    }),
}));
jest.mock('lucide-react', () => ({
    Maximize2: () => <span>[Max]</span>,
    Minimize2: () => <span>[Min]</span>,
    Terminal: () => <span>[Term]</span>,
    X: () => <span>[X]</span>,
    Minus: () => <span>[-]</span>,
    Square: () => <span>[Sq]</span>,
}));
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));
describe('Terminal Piping Integration', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        window.scrollTo = jest.fn();
    });
    it('successfully pipes output from echo to base64', async () => {
        render(<Terminal />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'echo hello | base64' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await waitFor(() => {
            const elements = screen.getAllByText((content) => content.includes('aGVsbG8='));
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('successfully pipes multiple commands: echo hello | base64 | base64 -d', async () => {
        render(<Terminal />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'echo hello | base64 | base64 -d' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await waitFor(() => {
        });
    });
    it('handles unique string piping', async () => {
        render(<Terminal />);
        const uniqueStr = 'superunique123';
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: `echo ${uniqueStr} | base64 | base64 -d` } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await waitFor(() => {
            const elements = screen.getAllByText(new RegExp(uniqueStr));
            expect(elements.length).toBeGreaterThanOrEqual(2);
        });
    });
});

import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface CommandContext {
    setLines: Dispatch<SetStateAction<string[]>>;
    setPasswordMode: (mode: boolean) => void;
    router: AppRouterInstance;
    setTheme: (theme: ThemeMode) => void;
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    toggleSystemMonitor: () => void;
    setInput: (input: string) => void;
    commandHistory: readonly string[];
}

export type CommandArgs = readonly string[];
export type CommandFn = (args: CommandArgs, context: CommandContext, input?: string) => void | Promise<void>;
export type CommandCategory = 'navigation' | 'utility';

export interface Command {
    readonly name: string;
    readonly description: string;
    readonly category?: CommandCategory;
    readonly usage?: string;
    readonly execute: CommandFn;
}

export type CommandRegistry = Readonly<Record<string, Command>>;
export type ThemeMode = 'light' | 'dark' | 'system';

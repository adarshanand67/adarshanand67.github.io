import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { contactInfo, whoamiInfo, directoryMap } from '@/lib/constants';
import { siteConfig } from '@/lib/config';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ThemeMode = 'light' | 'dark' | 'system';
export type CommandCategory = 'navigation' | 'utility';
export type CommandArgs = readonly string[];

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

export type CommandFn = (args: CommandArgs, context: CommandContext, input?: string) => void | Promise<void>;

export interface Command {
    readonly name: string;
    readonly description: string;
    readonly category?: CommandCategory;
    readonly usage?: string;
    readonly execute: CommandFn;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helpers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const addLine = (setLines: Dispatch<SetStateAction<string[]>>, line: string) => {
    setLines((prev) => [...prev, line]);
};

export const addLines = (setLines: Dispatch<SetStateAction<string[]>>, lines: string[]) => {
    setLines((prev) => [...prev, ...lines]);
};

export const createCommand = (
    name: string,
    description: string,
    execute: CommandFn,
    options?: { category?: CommandCategory; usage?: string }
): Command => ({
    name,
    description,
    execute,
    category: options?.category,
    usage: options?.usage || name
});

export const createAliasCommand = (
    name: string,
    description: string,
    getTarget: () => Command
): Command => ({
    name,
    description,
    execute: (args, context) => getTarget().execute(args, context),
    category: 'utility',
    usage: name
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Commands
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const clear: Command = createCommand('clear', 'Clear terminal', (_, { setLines, setInput }) => {
    setLines([]); setInput('');
}, { category: 'utility', usage: 'clear' });

export const help: Command = createCommand('help', 'Show available commands', (_, { setLines }) => {
    addLines(setLines, [
        'Available Commands:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Navigation:',
        '  cd [dir]      - Navigate to directory',
        '  ls            - List directory contents',
        '  pwd           - Show current directory',
        '  open [link]   - Open URL or directory',
        '',
        'Information:',
        '  whoami        - Display profile info',
        '  cat [file]    - Read file content',
        '  contact       - Show contact information',
        '  skills        - Display technical skills',
        '',
        'Utility:',
        '  clear         - Clear terminal',
        '  matrix        - Toggle Matrix rain',
        '  neofetch      - Display system information',
        '  help          - Show this help message',
        '  theme [mode]  - Set theme (light/dark/system)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
}, { category: 'utility', usage: 'help' });

export const cls: Command = createAliasCommand('cls', 'Clear screen (alias)', () => clear);

export const skills: Command = createCommand('skills', 'Display technical skills', (_, { setLines }) => {
    addLines(setLines, [
        'Technical Skills:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Languages:    C++ | Python | Rust | TypeScript',
        'Security:     Intel SGX/TDX | Cryptography | DLP',
        'Systems:      Linux | Docker | LLVM | Fuzzing',
        'Web:          Next.js | React | Node.js',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
}, { category: 'utility', usage: 'skills' });

export const contact: Command = createCommand('contact', 'Show contact info', (_, { setLines }) => {
    addLines(setLines, [...contactInfo] as string[]);
}, { category: 'utility', usage: 'contact' });

export const theme: Command = createCommand('theme', 'Switch color theme', (args, { setLines, setTheme }) => {
    const mode = args[0]?.toLowerCase();
    if (!mode || !['light', 'dark', 'system'].includes(mode)) {
        addLine(setLines, `Invalid theme: ${mode}. Use dark, light, or system.`);
        return;
    }
    setTheme?.(mode as 'light' | 'dark' | 'system');
    addLine(setLines, `Theme set to ${mode} mode.`);
}, { category: 'utility', usage: 'theme [light|dark|system]' });

export const ls: Command = createCommand('ls', 'List directories', (_, { setLines }) => {
    const dirs = Object.keys(directoryMap);
    addLines(setLines, dirs.map(d => `  ${d}/`));
}, { category: 'navigation', usage: 'ls' });

export const cd: Command = createCommand('cd', 'Change directory', (args, { setLines, router }) => {
    const target = args[0];
    if (!target) {
        router?.push('/');
        return;
    }
    const route = directoryMap[target as keyof typeof directoryMap];
    if (route) {
        router?.push(route);
    } else {
        addLine(setLines, `cd: ${target}: No such directory`);
    }
}, { category: 'navigation', usage: 'cd [directory]' });

export const pwd: Command = createCommand('pwd', 'Print working directory', (_, { setLines }) => {
    addLine(setLines, '/home/portfolio');
}, { category: 'navigation', usage: 'pwd' });

export const whoami: Command = createCommand('whoami', 'Display profile info', (_, { setLines }) => {
    addLines(setLines, [...whoamiInfo] as string[]);
}, { category: 'utility', usage: 'whoami' });

export const cat: Command = createCommand('cat', 'Read file', (args, { setLines }) => {
    const filename = args[0];
    if (!filename) {
        addLine(setLines, 'Usage: cat [filename]');
        return;
    }
    const { getFileContent } = require('./mockFileSystem');
    const content = getFileContent(filename);
    if (content) {
        addLines(setLines, content.split('\n'));
    } else {
        addLine(setLines, `cat: ${filename}: No such file`);
    }
}, { category: 'utility', usage: 'cat [file]' });

export const matrix: Command = createCommand('matrix', 'Toggle Matrix rain', (_, { toggleMatrix }) => {
    toggleMatrix();
    toggleMatrix();
}, { category: 'utility', usage: 'matrix' });

export const htop: Command = createCommand('htop', 'Open System Monitor', (_, { toggleSystemMonitor, setLines }) => {
    toggleSystemMonitor();
    addLine(setLines, 'Launching System Monitor...');
}, { category: 'utility', usage: 'htop' });

export const sudo: Command = createCommand('sudo', 'Execute a command as superuser', (_, { setLines }) => {
    setTimeout(() => {
        addLines(setLines, [
            'sudo: effective uid is not 0, is /usr/bin/sudo on a file system with the \'nosuid\' option set or an NFS file system without root privileges?',
            'Just kidding. You have no power here.'
        ]);
    }, 500);
}, { category: 'utility', usage: 'sudo [command]' });

export const rm: Command = createCommand('rm', 'Remove files', (args, { setLines }) => {
    if (args.includes('/')) {
        setTimeout(() => {
            setLines([]);
            setTimeout(() => {
                addLine(setLines, 'Kernel panic - not syncing: Fatal exception in interrupt');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }, 1000);
        }, 500);
    } else {
        addLine(setLines, 'rm: Permission denied. Try asking nicer.');
    }
}, { category: 'utility', usage: 'rm [file]' });

export const open: Command = createCommand('open', 'Open directory or URL', (args, { router, setLines }) => {
    const target = args[0];
    if (!target) {
        addLine(setLines, 'Usage: open [url/dir]');
        return;
    }
    if (target.startsWith('http')) {
        window.open(target, '_blank');
        addLine(setLines, `Opening ${target}...`);
    } else {
        const route = directoryMap[target as keyof typeof directoryMap];
        if (route) {
            router?.push(route);
        } else {
            addLine(setLines, `open: ${target}: No such file or directory`);
        }
    }
}, { category: 'navigation', usage: 'open [link]' });

export const neofetch: Command = createCommand('neofetch', 'Display system information', (_, { setLines, isMatrixEnabled }) => {
    const { systemStats } = require('@/lib/constants');
    addLines(setLines, [...systemStats(isMatrixEnabled)] as string[]);
}, { category: 'utility', usage: 'neofetch' });

export const commands: Record<string, Command> = {
    clear, help, skills, contact, theme, ls, cd, pwd, whoami, cls, cat, matrix, sudo, rm, open, htop, neofetch
};

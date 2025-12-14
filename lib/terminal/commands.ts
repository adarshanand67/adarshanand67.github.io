import { Command } from './types';
import { createCommand, createAliasCommand, addLine, addLines } from './helpers';
import { contactInfo, whoamiInfo, directoryMap } from '@/lib/constants';
import { siteConfig } from '@/lib/config';

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
        '',
        'Information:',
        '  whoami        - Display profile info',
        '  contact       - Show contact information',
        '  skills        - Display technical skills',
        '',
        'Utility:',
        '  clear         - Clear terminal',
        '  help          - Show this help message',
        '  theme [mode]  - Set theme (light/dark/system)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
}, { category: 'utility', usage: 'help' });

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

export const cls: Command = createAliasCommand('cls', 'Clear screen (alias)', () => clear);

export const commands: Record<string, Command> = {
    clear, help, skills, contact, theme, ls, cd, pwd, whoami, cls
};

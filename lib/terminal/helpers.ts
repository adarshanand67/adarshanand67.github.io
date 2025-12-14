import { Command, CommandContext, CommandArgs, CommandCategory } from './types';

export const createCommand = (
    name: string,
    description: string,
    execute: (args: CommandArgs, context: CommandContext) => void | Promise<void>,
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

export const addLine = (setLines: (fn: (prev: string[]) => string[]) => void, line: string) => {
    setLines((prev) => [...prev, line]);
};

export const addLines = (setLines: (fn: (prev: string[]) => string[]) => void, lines: string[]) => {
    setLines((prev) => [...prev, ...lines]);
};

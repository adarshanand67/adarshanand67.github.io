/**
 * CTF (Capture The Flag) Commands
 * Hidden easter egg challenge
 */

import { Command } from '../types';

// The secret flag (base64 encoded)
const SECRET_FLAG = 'ZmxhZ3tIMWRkM25fVDNybTFuNGxfTTQ1dDNyfQ=='; // flag{H1dd3n_T3rm1n4l_M45t3r}
const DECODED_FLAG = 'flag{H1dd3n_T3rm1n4l_M45t3r}';

// Hints scattered across different commands
const HINTS = [
    'Hint 1: Look for hidden files... (try ls -a)',
    'Hint 2: The secret lies in base64...',
    'Hint 3: Try decoding something suspicious...',
    'Hint 4: Check the .secret file',
];

export const ctfCommands: Record<string, Command> = {
    '.secret': {
        description: 'A hidden file (CTF challenge)',
        usage: 'cat .secret',
        category: 'hidden',
        execute: (args, context) => {
            context.setLines((prev) => [
                ...prev,
                '',
                '🔐 SECRET FILE CONTENTS:',
                '========================',
                '',
                `Encoded Message: ${SECRET_FLAG}`,
                '',
                '💡 Hint: This looks like base64 encoding...',
                '💡 Try: decode <string>',
                '',
            ]);
        },
    },

    decode: {
        description: 'Decode base64 strings (CTF tool)',
        usage: 'decode <base64-string>',
        category: 'utilities',
        execute: (args, context) => {
            if (args.length === 0) {
                context.setLines((prev) => [
                    ...prev,
                    '',
                    'Usage: decode <base64-string>',
                    'Example: decode SGVsbG8gV29ybGQ=',
                    '',
                ]);
                return;
            }

            const encoded = args.join(' ');

            try {
                const decoded = atob(encoded);

                context.setLines((prev) => [
                    ...prev,
                    '',
                    `Decoded: ${decoded}`,
                    '',
                ]);

                // Check if they decoded the flag
                if (decoded === DECODED_FLAG) {
                    setTimeout(() => {
                        context.setLines((prev) => [
                            ...prev,
                            '',
                            '🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉',
                            '═══════════════════════════════════',
                            '',
                            '🏆 You found the hidden flag!',
                            '',
                            `✨ Flag: ${DECODED_FLAG}`,
                            '',
                            '🎁 Your Reward:',
                            '   • You are officially a Terminal Master! 🚀',
                            '   • You have unlocked the secret achievement',
                            '   • DM me on LinkedIn with this flag for a surprise!',
                            '',
                            '💡 Fun fact: Only true hackers find this!',
                            '',
                            '═══════════════════════════════════',
                            '',
                        ]);
                    }, 100);
                }
            } catch (e) {
                context.setLines((prev) => [
                    ...prev,
                    '',
                    '❌ Error: Invalid base64 string',
                    '',
                ]);
            }
        },
    },

    hint: {
        description: 'Get a hint for the CTF challenge',
        usage: 'hint [number]',
        category: 'fun',
        execute: (args, context) => {
            const hintNum = args[0] ? parseInt(args[0]) - 1 : Math.floor(Math.random() * HINTS.length);

            if (hintNum >= 0 && hintNum < HINTS.length) {
                context.setLines((prev) => [
                    ...prev,
                    '',
                    `💡 ${HINTS[hintNum]}`,
                    '',
                    `(Try 'hint 1', 'hint 2', etc. for specific hints)`,
                    '',
                ]);
            } else {
                context.setLines((prev) => [
                    ...prev,
                    '',
                    '💡 Available hints: 1-4',
                    '',
                    ...HINTS.map((h, i) => `   ${i + 1}. ${h}`),
                    '',
                ]);
            }
        },
    },
};

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{ts,mts,cts}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                globalThis: 'readonly',
                performance: 'readonly',
                URL: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'no-undef': 'off',
        },
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                globalThis: 'readonly',
                performance: 'readonly',
                URL: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
        },
    },
    {
        files: ['tests/**/*', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
    {
        ignores: ['node_modules/', 'dist/', '**/*.d.ts', 'example.js', 'tsup.config.ts', 'examples/**/*'],
    },
];

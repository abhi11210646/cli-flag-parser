declare module 'cli-flag-parser' {
    interface FlagOptions {
        value: any;
    }

    type FlagMap = Map<string, FlagOptions>;

    export const FLAGS: FlagMap;

    export function registerFlag(flag: string, defaultValue: any): void;

    export function unregisterFlags(): void;

    export function parseArgs(): { [key: string]: any };
}

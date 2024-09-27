declare class FlagParser {
    /**
     * Map to store flags and their descriptions and default values
     */
    #flags: Map<string, { description: string, defaultValue: any }>;

    /**
     * Stores the usage string
     */
    #usage: string;

    /**
     * Parsed flags are stored here after calling the `parse` method
     */
    public flags: { [key: string]: any };

    /**
     * Set the usage information for the flag parser.
     * @param str The usage information to be displayed
     * @returns The FlagParser instance for chaining
     */
    usage(str: string): this;

    /**
     * Register a new flag with a description and an optional default value.
     * @param flag The flag name (e.g. `verbose` for `--verbose`)
     * @param description A description of what the flag does
     * @param defaultValue (Optional) The default value for the flag if not provided
     * @returns The FlagParser instance for chaining
     * @throws Will throw an error if the flag or description is missing
     */
    registerFlag(flag: string, description: string, defaultValue?: any): this;

    /**
     * Unregisters all flags from the parser.
     */
    unregisterFlags(): void;

    /**
     * Parse the flags from `process.argv`.
     * @returns An object where keys are the flag names and values are their respective values
     */
    parse(): { [key: string]: any };

    /**
     * Print the help text to the console.
     */
    help(): void;

    /**
     * Print help text to the console and exit with error.
     */
    showHelp(): void;

    /**
     * Generate the output text for the help message.
     * @returns The formatted help message string
     */
    #outputText(): string;
}

declare const flagParserInstance: FlagParser;

export = flagParserInstance;

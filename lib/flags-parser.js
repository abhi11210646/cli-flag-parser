class FlagParser {
    #flags = new Map();
    #usage = "";
    flags = {};

    usage(str) {
        this.#usage = str;
        return this;
    }

    registerFlag(flag, description, defaultValue) {
        if (!flag) throw new Error('flag name is required!');
        if (!description) throw new Error('description is required!');
        this.#flags.set(flag, { description, defaultValue });
        return this;
    }

    unregisterFlags() {
        this.#flags.clear();
        this.flags = {};
    }

    parse() {
        const args = process.argv.slice(2);
        const parsedFlags = {};

        args.forEach((arg, index) => {
            if (arg.startsWith('--')) {
                const [key, value] = arg.split('=');
                const flagKey = key.slice(2);
                parsedFlags[flagKey] = value;
                if (args[index + 1] && !args[index + 1].startsWith('-')) {
                    parsedFlags[flagKey] = args[index + 1];
                }
            } else if (arg.startsWith('-')) {
                const flagKey = arg.slice(1);
                parsedFlags[flagKey] = true;
            }
        });

        if ('h' in parsedFlags || 'help' in parsedFlags) {
            this.help();
        }

        const result = {};
        this.#flags.forEach(({ defaultValue }, key) => {
            result[key] = parsedFlags[key] || defaultValue || key in parsedFlags || undefined;
        });

        this.flags = result;

        return result;
    }

    #outputText() {
        let str = "";
        if (this.#usage) {
            str += "Usage: " + this.#usage + "\n";
        }
        str += "\n";
        str += "Options:\n";
        str += `${"--help, -h".padEnd(22)}This help text.\n`;
        this.#flags.forEach(({ defaultValue, description }, key) => {
            str += `--${key.padEnd(20)}${description} ${defaultValue ? `(default: ${defaultValue})` : ""} \n`;
        });
        return str;
    }
    // used with -h or --help flag
    help() {
        console.log(this.#outputText());
        process.exit(0);
    }
    // In case of error in flag parsing
    showHelp() {
        console.error(this.#outputText());
        process.exit(1);
    }
}

module.exports = new FlagParser();

// const FLAGS = {};


// function register(flag, defaultValue, errorMessage=''){


// }


function parseArgs() {
    const args = process.argv.slice(2);
    const flags = {};
    args.forEach((arg, index) => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.split('=');
            const flagKey = key.slice(2);

            if (args[index + 1] && !args[index + 1].startsWith('-')) {
                flags[flagKey] = args[index + 1];
            } else {
                flags[flagKey] = value;
            }
        } else if (arg.startsWith('-')) {
            const flagKey = arg.slice(1);
            flags[flagKey] = true;
        }
    });

    return flags;
}

module.exports = {parse: parseArgs};

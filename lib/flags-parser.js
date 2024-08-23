const FLAGS = new Map();


function registerFlag(flag, defaultValue) {
    if (!flag) throw new Error('flag name is required');
    FLAGS.set(flag, { value: defaultValue })
    // return {
    //     required: () => {
    //         FLAGS.set(flag, { ...FLAGS.get(flag), required: true });
    //     }
    // }
}

function unregisterFlags() {
    FLAGS.clear();
}

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
                flags[flagKey] = value || true;
            }
        } else if (arg.startsWith('-')) {
            const flagKey = arg.slice(1);
            flags[flagKey] = true;
        }
    });

    const result = {};
    FLAGS.forEach(({ value }, key) => {
        result[key] = flags[key] || value;
    });
    return result;
}

module.exports = {
    parse: parseArgs,
    registerFlag: registerFlag,
    unregisterFlags: unregisterFlags
};

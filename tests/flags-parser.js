const { expect } = require('chai');
const sinon = require('sinon');
const flags = require('./../lib/flags-parser');

describe('FlagParser', () => {
    afterEach(() => {
        flags.unregisterFlags();
        sinon.restore();
    });

    describe('parseArgs', () => {
        it('should correctly parse flags with values', () => {
            process.argv = ['node', 'script.js', '--name=John', '--age=30'];
            flags.registerFlag("name", "name")
                .registerFlag("age", "age");
            const result = flags.parse();
            expect(result).to.deep.equal({ name: 'John', age: '30' });
        });

        it('should use default value if flags is not passed', () => {
            process.argv = ['node', 'script.js'];
            flags.registerFlag("name", "name", 'DefaultName')
                .registerFlag("age", "age", 25);
            const result = flags.parse();
            expect(result).to.deep.equal({ name: 'DefaultName', age: 25 });
        });

        it('should correctly parse flags without values', () => {
            process.argv = ['node', 'script.js', '--verbose'];
            flags.registerFlag("verbose", "verbose flag");
            const result = flags.parse();
            expect(result).to.deep.equal({ verbose: true });
        });

        it('should correctly parse short flags', () => {
            process.argv = ['node', 'script.js', '-v'];
            flags.registerFlag("v", "version flag");
            const result = flags.parse();
            expect(result).to.deep.equal({ v: true });
        });

        it('should correctly handle a mix of flags with and without values', () => {
            process.argv = ['node', 'script.js', '--name=John', '--verbose', '-a', '--age', '30'];
            flags.registerFlag("name", "name")
                .registerFlag("verbose", "verbose")
                .registerFlag("a", "test flag")
                .registerFlag("age", "age of a person");
            const result = flags.parse();
            expect(result).to.deep.equal({ name: 'John', verbose: true, a: true, age: '30' });
        });

        // Additional Test Cases

        it('should assign undefined to flags without default values when not provided', () => {
            process.argv = ['node', 'script.js', '--name=John'];
            flags.registerFlag('name', 'User name')
                .registerFlag('age', 'User age');
            const result = flags.parse();
            expect(result).to.deep.equal({ name: 'John', age: undefined });
        });

        it('should throw an error when registering a flag without a name', () => {
            expect(() => flags.registerFlag('', 'Description')).to.throw('flag name is required!');
        });

        it('should throw an error when registering a flag without a description', () => {
            expect(() => flags.registerFlag('verbose', '')).to.throw('description is required!');
        });

        it('should call help and exit when --help flag is provided', () => {
            const helpStub = sinon.stub(flags, 'help').callsFake(() => { });

            process.argv = ['node', 'script.js', '--help'];
            flags.registerFlag('verbose', 'verbose flag');

            flags.parse();

            expect(helpStub.calledOnce).to.be.true;
        });

        it('should call help and exit when -h flag is provided', () => {
            const helpStub = sinon.stub(flags, 'help').callsFake(() => { });

            process.argv = ['node', 'script.js', '-h'];
            flags.registerFlag('verbose', 'verbose flag');

            flags.parse();

            expect(helpStub.calledOnce).to.be.true;
        });

        it('should set usage information correctly', () => {
            flags.usage('Usage: node script.js [options]');
            flags.registerFlag('verbose', 'verbose flag');

            // Spy on console.log to check if usage is printed
            const consoleSpy = sinon.spy(console, 'log');
            const exitStub = sinon.stub(process, 'exit');

            process.argv = ['node', 'script.js', '--help'];
            flags.parse();

            expect(consoleSpy.called).to.be.true;
            const loggedOutput = consoleSpy.firstCall.args[0];
            expect(loggedOutput).to.include('Usage: node script.js [options]');
            expect(loggedOutput).to.include('--help, -h');

            consoleSpy.restore();
            exitStub.restore();
        });

        it('should clear all registered flags after unregisterFlags is called', () => {
            flags.registerFlag('verbose', 'verbose flag')
                .registerFlag('name', 'User name', 'DefaultName')
                .parse()

            expect(flags.flags).to.have.keys(['verbose', 'name']);

            flags.unregisterFlags();
            expect(flags.flags).to.be.empty;
        });

        it('should correctly parse flags with multiple equals signs', () => {
            process.argv = ['node', 'script.js', '--path=/usr/local/bin', '--config=key=value'];
            flags.registerFlag('path', 'Path to binaries')
                .registerFlag('config', 'Configuration string');
            const result = flags.parse();
            expect(result).to.deep.equal({ path: '/usr/local/bin', config: 'key=value' });
        });

        it('should parse flags correctly regardless of their order', () => {
            process.argv = ['node', 'script.js', '--age=30', '--name=John'];
            flags.registerFlag('name', 'User name')
                .registerFlag('age', 'User age');
            const result = flags.parse();
            expect(result).to.deep.equal({ name: 'John', age: '30' });
        });

        it('should handle flags with similar prefixes correctly', () => {
            process.argv = ['node', 'script.js', '--verbose=true', '--verb=false'];
            flags.registerFlag('verbose', 'Enable verbose mode', false)
                .registerFlag('verb', 'Enable verb mode', true);
            const result = flags.parse();
            expect(result).to.deep.equal({ verbose: 'true', verb: 'false' });
        });

        it('should ignore flags that are not registered', () => {
            process.argv = ['node', 'script.js', '--unknown=true', '-u'];
            flags.registerFlag('verbose', 'Enable verbose mode', false);
            const result = flags.parse();
            expect(result).to.deep.equal({ verbose: false }); // Only registered flags are returned
        });

        it('should show help and exit with error when showHelp is called', () => {
            const consoleErrorStub = sinon.stub(console, 'error');
            const exitStub = sinon.stub(process, 'exit');

            flags.showHelp();

            expect(consoleErrorStub.called).to.be.true;
            expect(exitStub.calledOnceWith(1)).to.be.true;
        });
    });
});

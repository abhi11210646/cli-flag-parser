const { expect } = require('chai');
const { parse: parseArgs, registerFlag , unregisterFlags} = require('./../lib/flags-parser');

describe('parseArgs', () => {
    afterEach(()=>{
        unregisterFlags();
    })
    it('should correctly parse flags with values', () => {
        process.argv = ['node', 'script.js', '--name=John', '--age=30'];
        registerFlag("name");
        registerFlag("age");
        const result = parseArgs();
        expect(result).to.deep.equal({ name: 'John', age: '30' });
    });

    it('should correctly parse flags without values', () => {
        process.argv = ['node', 'script.js', '--verbose'];
        registerFlag("verbose");
        const result = parseArgs();
        expect(result).to.deep.equal({ verbose: true });
    });

    it('should correctly parse short flags', () => {
        process.argv = ['node', 'script.js', '-v'];
        registerFlag("v");
        const result = parseArgs();
        expect(result).to.deep.equal({ v: true });
    });

    it('should correctly handle a mix of flags with and without values', () => {
        process.argv = ['node', 'script.js', '--name=John', '--verbose', '-a', '--age', '30'];
        registerFlag("name");
        registerFlag("verbose");
        registerFlag("a");
        registerFlag("age");
        const result = parseArgs();
        expect(result).to.deep.equal({ name: 'John', verbose: true, a: true, age: '30' });
    });
});

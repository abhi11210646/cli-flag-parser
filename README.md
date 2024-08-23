# CLI Flag Parser

This is a simple and lightweight CLI flag parser for Node.js, allowing you to easily define and parse command-line flags. 

## Features

- **Register Flags**: Define flags with or without default values.
- **Parse Arguments**: Automatically parse and retrieve the values of the flags passed via the command line.
- **Boolean Flags**: Supports flags that can be toggled with a `--flag` syntax.

## Installation

```bash
npm install cli-flag-parser
```

## Usage

### Registering Flags

Before parsing the arguments, you need to register the flags that your application will accept. You can register a flag with or without a default value.

```javascript
const flags = require("cli-flag-parser");

// Registering flags
flags.registerFlag("name");
flags.registerFlag("age");
flags.registerFlag("sex", "male");
```
### Parsing Arguments
Once the flags are registered, you can parse the command-line arguments using the parse() function.

```javascript
const parsedFlags = flags.parse();
console.log(parsedFlags);
```

## Example
Suppose you run your script with the following command:

```javascript
node yourScript.js --name=John --age 30 --verbose -d --xyz=no
```
Here’s how you can use the parser to interpret the arguments:
```javascript
const flags = require("cli-flag-parser");

// Registering flags
flags.registerFlag("name");
flags.registerFlag("age");
flags.registerFlag("sex", "male");
flags.registerFlag("verbose");
flags.registerFlag("d");

// Parsing the command-line arguments
const parsedFlags = flags.parse();

console.log(parsedFlags);

Output:
{
    "name": "John",
    "age": "30",
    "sex": "male",  // defaultValue
    "verbose": true,
    "d": true
}

Note: 'xyz' is not present in the output because it was not registered.

```
## API Reference
#### registerFlag(flag, defaultValue)
- flag (string, required) - The name of the flag.
- defaultValue (any, optional) - Default value of flag.
#### parse()
- Parses the command-line arguments and returns an object with the flag names as keys and their corresponding values.





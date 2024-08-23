const flags = require("./index");

flags.registerFlag("name");
flags.registerFlag("age");
flags.registerFlag("sex", "male");


console.log(flags.parse());
const fs = require('fs');
const config = require('./package');
config.devDependencies = {};
config.main = './path.js';
config.typings = './path.d.ts';
config.scripts = {};

fs.writeFileSync('./build/package.json', JSON.stringify(config, null, 4));

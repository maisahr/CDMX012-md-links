const fs = require('fs');
const path = require('path');
const {readDirectory, readFile} = require('./utils/readFiles.js');

const pathAbsolute = path.resolve(process.argv[2]);

if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
    readDirectory(pathAbsolute);
} else {
    readFile(pathAbsolute);
}

const fs = require('fs');
const path = require('path');
const {readDirectory, readAFile} = require('./utils/readFiles.js');

const pathAbsolute = path.resolve(process.argv[2]);

const mdLinks = (pathAbsolute) => {
    if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
        readDirectory(pathAbsolute).forEach(file => {
            mdLinks(file);
        });
    } else {
        readAFile(pathAbsolute);
    };
}

mdLinks(pathAbsolute);

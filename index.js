const fs = require('fs');
const path = require('path');
const {readDirectory, readAFile} = require('./utils/readFiles.js');

const pathAbsolute = path.resolve(process.argv[2]);

const recursion = (pathAbsolute) => {
    if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
        readDirectory(pathAbsolute).forEach(file => {
            recursion(file);
        });
    } else {
        readAFile(pathAbsolute);
    };
};

recursion(pathAbsolute);

const fs = require('fs');
const path = require('path');
const {readDirectory, readAFile} = require('./utils/readFiles.js');

const mdLinks = (userPath, options) => {
    const pathAbsolute = path.resolve(userPath);

    const recursion = (pathAbsolute) => {
        if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
            readDirectory(pathAbsolute).forEach(file => {
                recursion(file);
            });
        } else {
            readAFile(pathAbsolute, options);
        };
    };

    recursion(pathAbsolute);
};

module.exports = mdLinks;
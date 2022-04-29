const fs = require('fs');
const path = require('path');
const {readDirectory, readAFile} = require('./utils/readFiles.js');

const mdLinks = (userPath, options) => {
    const pathAbsolute = path.resolve(userPath);

    const arrayTry = [];

    const recursion = (pathAbsolute) => {
        if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
            readDirectory(pathAbsolute).forEach(file => {
                recursion(file);
            });
        } else {
            readAFile(pathAbsolute, arrayTry);
        };
    };

    recursion(pathAbsolute);

    const promiseTry = (options) => {
        return new Promise(function(resolve, reject) {

            if(options.validate === false){
                resolve(console.log(arrayTry))
            } if(options.validate === true){
                resolve(console.log('siu'))
            } else {
                reject(console.log('nou'))
            }
        });
    }
    return promiseTry(options);
};

module.exports = mdLinks;
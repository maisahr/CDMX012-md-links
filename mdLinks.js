const fs = require('fs');
const path = require('path');
const {validation} = require('./utils/analizeLinks.js');
const {readDirectory, readAFile} = require('./utils/readFiles.js');

const mdLinks = (userPath, options) => {
    const pathAbsolute = path.resolve(userPath);
    const arrayPromise = [];

    const recursion = (pathAbsolute) => {
        if(fs.lstatSync(pathAbsolute).isDirectory() === true) {
            readDirectory(pathAbsolute).forEach(file => {
                recursion(file);
            });
        } else {
            readAFile(pathAbsolute, arrayPromise);
        };
    };

    recursion(pathAbsolute);

     const promiseTry = (options, arrayPromise) => {
        
        return new Promise(function(resolve, reject) {

            if(options.validate === false){
                resolve(arrayPromise)
            } if(options.validate === true){
                const arrayPerla = [];
                arrayPromise.forEach((link) => {
                    arrayPerla.push(validation(link.href, link));
                })
                resolve(Promise.all(arrayPerla));
            } else {
                reject(console.log('a'))
            }
        });
    }

    return promiseTry(options, arrayPromise);
};

module.exports = mdLinks;
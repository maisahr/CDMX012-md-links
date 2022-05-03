const fs = require('fs');
const path = require('path');
const {validation} = require('./analizeLinks.js');
const {readDirectory, readAFile} = require('./readFiles.js');

const mdLinks = (userPath, options) => {
    const absolutePath = path.resolve(userPath);
    const linksArray = [];

    const recursion = (absolutePath) => {
        if(fs.lstatSync(absolutePath).isDirectory() === true) {
            readDirectory(absolutePath).forEach(file => {
                recursion(file);
            });
        } else {
            readAFile(absolutePath, linksArray);
        };
    };

    recursion(absolutePath);

    const promise = (options, linksArray) => {

        return new Promise(function(resolve, reject) {

            if(options.validate === false){
                resolve(linksArray);
            } else if(options.validate === true){
                const linksValidation = linksArray.map((link) => {
                    return validation(link);
                });
                resolve(Promise.all(linksValidation));
            } else {
                reject(console.log('No pudimos completar la validación, por favor vuelve a intentar.'))
            }
        });
    }

    return promise(options, linksArray);
};

module.exports = mdLinks;
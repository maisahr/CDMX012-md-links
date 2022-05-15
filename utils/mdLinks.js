const fs = require('fs');
const path = require('path');
const {validation} = require('./analizeLinks.js');
const {recursion} = require('./readFiles.js');

const mdLinks = (userPath, options) => {
    const absolutePath = path.resolve(userPath);
    const linksArray = [];

    recursion(absolutePath, linksArray);

    return promise(options, linksArray);
};

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
            reject(console.log('No pudimos realizar la validación, por favor intentalo nuevamente.'))
        }
    });
}

module.exports = {
    mdLinks, 
    promise
};
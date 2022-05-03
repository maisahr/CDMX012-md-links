#!/usr/bin/env node
const yargs = require('yargs');
const mdLinks = require('../utils/mdLinks.js');

const options = {validate: true}

if(yargs.argv.validate === false && yargs.argv.stats === false){
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.text);
        });
    });
}

else if(yargs.argv.validate === true && yargs.argv.stats === true) {
    console.log('validate y stats');
}

else if(yargs.argv.validate === true) {
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.ok, link.status, link.text);
        });
    });
}

else if(yargs.argv.stats === true) {
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
        const unique = [];
        result.forEach(link => {
            const index = result.indexOf(link);
            let uniqueLink = '';
            for(let i = 1; i < (result.length - index); i++) {
                if(link.href !== result[index+i].href){
                    console.log(link.href, result[index+i].href)
                    return uniqueLink = link
                } else {
                    break;
                }
            }
            unique.push(uniqueLink);
        });
        console.log(unique);
        console.log('Total:', result.length, 'Unique:', unique.length);
    });
} 
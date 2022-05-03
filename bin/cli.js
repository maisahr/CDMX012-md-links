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
        let unique = result.filter(link => {
            const index = result.indexOf(link);
            for(let i = 1; i < result.length-1; i++){
                if(result[index+i] !== undefined && link.href !== (result[index+i]).href) {
                    return link;
                }
            }
        });
        console.log('Total:', result.length, 'Unique:', unique.length);
    });
} 
#!/usr/bin/env node
const yargs = require('yargs')
  .scriptName("md-links")
  .usage("Usage: $0 <file-path> [options]")
  .option("v", {
    alias: "validate",
    describe: "Validates links.",
    demandOption: false,
    type: "boolean",
  })
  .option("s", {
    alias: "stats",
    describe: "Stadistics about total, unique, and broken links.",
    demandOption: false,
    type: "boolean",
  })
  .describe("help", "Show help.") 
  .describe("version", "Show version number.")
  .strictOptions()
  .help()

const {mdLinks} = require('../utils/mdLinks.js');

const options = {validate: true}

switch (yargs.argv.validate || yargs.argv.stats) {
    case (yargs.argv.validate === true && yargs.argv.stats === true) :
        mdLinks(process.argv[2], options)
        .then(result => {
            const unique = result.filter((link, index, self) => {
                return self.findIndex(l => l.href === link.href) === index;
            });
            const broken = unique.filter(link => {
                return link.ok === 'fail';
            });
            console.log('Total:', result.length, '\nUnique:', unique.length,'\nBroken:', broken.length);
        });
    break;

    case (yargs.argv.validate === true && yargs.argv.stats !== true) :
        mdLinks(process.argv[2], options)
        .then(result => {
            result.forEach(link => {
                console.log(link.file, link.href, link.ok, link.status, link.text.slice(0, 50), '\n');
            });
        });
    break;

    case (yargs.argv.validate !== true && yargs.argv.stats === true) :
        options.validate = false;
        mdLinks(process.argv[2], options)
        .then(result => {
             const unique = result.filter((link, index, self) => { // self es result
                return self.findIndex(l => l.href === link.href) === index;
            });
            console.log('Total:', result.length, '\nUnique:', unique.length);
        });
    break;

    default:
        options.validate = false;
        mdLinks(process.argv[2], options)
        .then(result => {
            result.forEach(link => {
                console.log(link.file, link.href, link.text.slice(0, 50), '\n');
            });
        });
}

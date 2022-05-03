const {mdToHTML, validation} = require('../utils/analizeLinks')
const {readAFile, readDirectory, recursion} = require('../utils/readFiles');
const {mdLinks, promise} = require('../utils/mdLinks');

describe('mdToHTML', () => {
  const data = '[Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)';
  const file = 'README.md';
  const linksArray = [];

  it('is a function', () => {
    expect(typeof mdToHTML).toBe('function');
  });

  it('returns array of objects, with href, text and file', () => {
    mdToHTML(data, file, linksArray)
    expect(linksArray).toEqual([{
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
        text: 'Estructuras condicionales y repetitivas',
        file: 'README.md'
    }]);
  });

});

/* describe('mdLinks', () => {

  it('calls recursion function', () => {
    const recursion = jest.fn();
    const options = {validate: true};
    mdLinks('README.md', options);
    expect(recursion).toHaveBeenCalled();
  });

}); */

/* describe('readAFile', () => {

  it('should not read non-md files', () => {
    expect(readAFile('notmd.js')).toBe();
  });

});

describe('readDirectory', () => {

  it('should return error', () => {
    const fakePath = 'some/fake/path';
    expect(readDirectory(fakePath)).toBe(console.log("ENOENT: no such file or directory, scandir 'some/fake/path'"));
  });

}); */
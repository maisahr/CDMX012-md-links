const {mdToHTML, validation} = require('../utils/analizeLinks')
const {readAFile, readDirectory, recursion} = require('../utils/readFiles');
const {mdLinks, promise} = require('../utils/mdLinks');

const linksArray = [];

describe('mdToHTML', () => {
  const data = '[Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)';
  const file = 'README.md';

  it('returns array of objects, with href, text and file', () => {
    mdToHTML(data, file, linksArray)
    expect(linksArray).toEqual([{
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
        text: 'Estructuras condicionales y repetitivas',
        file: 'README.md'
    }]);
  });

});

describe('validation', () => {

  it('returns object with key ok', () => {
    const link = {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
      text: 'Estructuras condicionales y repetitivas',
      file: 'README.md'
    }
      
    return validation(link).then(data => {
      expect(data.ok).toEqual('satisfactorio');
    })
  });

  it('returns object with key fail', () => {
    const link = {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: 'README.md'
    }
      
    return validation(link).then(data => {
      expect(data.ok).toEqual('fallido');
    })
  });

});

describe('readAFile', () => {

  it('does not read non-md files', () => {
    expect(readAFile('notmd.js', linksArray)).toBe(console.log('notmd.js no es un archivo markdown.\n'));
  });
  
  it('reads md files', () => {
    const file = 'README.md';
    const expected = [{"file": "README.md", "href": "https://yargs.js.org/", "text": "Yargs"}];
    readAFile(file, linksArray);
    expect(linksArray).toEqual(
      expect.arrayContaining(expected),
    );
  });

});

 
describe('readDirectory', () => {

  it('should return array of files inside directory', () => {
    expect(readDirectory('carpetaPrueba')).toEqual(expect.arrayContaining(['carpetaPrueba\\archivo1.md']));
  });

});

describe('recursion', () => {

  it('calls readFile function when the path is a file', () => {
    const path = 'README.md';
    expect(recursion(path, linksArray)).toBe(readAFile(path, linksArray));
  });

});

describe('mdLinks', () => {

  it('returns an array of objects with keys href, text and file if validate is false', () => {
    const options = {validate: false};
    return mdLinks('README.md', options).then(data => {
      expect(data[0]).toEqual(expect.objectContaining({
        href: expect.any(String),
        text: expect.any(String),
        file: expect.any(String)
      }));
    });
  });

});

describe('promise', () => {

  const promiseArray = [{"file": "README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}]

  it('resolves an array of objects.', () => {
    const options = {validate: false};
    return promise(options, promiseArray).then(data => {
      expect(data).toEqual(expect.arrayContaining([expect.any(Object)]));
    })
  });

  it('resolves an array of objects with keys href, text, status, ok and file if validate is true', () => {
    const options = {validate: true};
    return promise(options, promiseArray).then(data => {
      expect(data[0]).toEqual(expect.objectContaining({
        href: expect.any(String),
        text: expect.any(String),
        file: expect.any(String),
        ok: expect.any(String),
        status: expect.any(Number)
      }));
    });
  });

});

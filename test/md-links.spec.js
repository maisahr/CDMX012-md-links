const {readAFile, readDirectory} = require('../utils/readFiles');

describe('readAFile', () => {

  it('should not read non-md files', () => {
    expect(readAFile('notmd.js')).toBe();
  });

});

describe('readDirectory', () => {

  it('should return error', () => {
    const fakePath = 'some/fake/path';
    expect(readDirectory(fakePath)).toBe(console.log("ENOENT: no such file or directory, scandir 'some/fake/path'"));
  });

});
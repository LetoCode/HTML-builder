const path = require('path');
const fs = require('fs');
const { stdout } = process;

const filePath = path.resolve(__dirname, 'text.txt')
const ReadStream = fs.createReadStream(filePath, 'utf-8')

ReadStream.pipe(stdout);

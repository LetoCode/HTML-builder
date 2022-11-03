const fs = require('fs');
const path = require('path');

const { exit, stdin, stdout } = process;
stdout.write('Write something here \n > ');
stdin.on('data', data => {
   const filePath = path.resolve(__dirname, 'text.txt');
   fs.appendFile(filePath, data, (err) => {
      if (err) return console.error(err.message);
      stdout.write('<--done!--> ');
      exit();
   })
})
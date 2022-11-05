const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;
stdout.write('Write something here \n > ');
stdin.on('data', data => {
   const filePath = path.resolve(__dirname, 'text.txt');
   fs.appendFile(filePath, data, (err) => {
      if (err) return console.error(err.message);
      //stdout.write('<--done!--> ');
      //exit();
   })
})
process.on('exit', () => {
   stdout.write('Удачи в изучении Node.js!');
})
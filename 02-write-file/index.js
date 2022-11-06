const fs = require('fs');
const path = require('path');


const { exit, stdin, stdout } = process;
stdout.write('Write something here \n > ');
stdin.on('data', data => {
   const filePath = path.resolve(__dirname, 'text.txt');
   if (data.toString().slice(0, 4) === 'exit') {
      stdout.write('Удачи в изучении Node.js!');
      exit();
   }
   fs.appendFile(filePath, data, (err) => {
      if (err) return console.error(err.message);
   })
})


process.on('SIGINT', () => {
   stdout.write('Удачи в изучении Node.js!');
   exit();
})
const { program } = require('commander');
const api = require('./index.js');
console.log(process.env);

program
    .option('add <task>', '添加一个任务');

program.parse(process.argv);

if (process.argv[3] === 'add') {
    api.add(process.argv[4]);
}
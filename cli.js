const { program } = require('commander');
const api = require('./index.js');

program
    .option('add <task>', '添加一个任务');

program.parse(process.argv);
if (process.argv[2] === 'add') {
    api.add(process.argv[4]);
}
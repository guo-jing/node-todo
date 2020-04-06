#!/usr/bin/env node
const { program } = require('commander');
const api = require('./index.js');

program
    .option('add <task>', '添加一个任务')
    .option('showAll', '显示任务清单');

program.parse(process.argv);
if (process.argv[2] === 'add') {
    if (!process.argv[3]) {
        console.log('请输入任务名称');
        return;
    }
    api.add(process.argv[3]).then(() => console.log('保存成功'), (error) => console.log(error));
}

if (process.argv[2] === 'showAll') {
    void api.showAll();
}
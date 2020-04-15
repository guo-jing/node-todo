#!/usr/bin/env node
const { program } = require('commander');
const api = require('./index.js');

program
    .option('add <task>', '添加一个任务')
    .option('showAll', '显示任务清单');

program.parse(process.argv);
if (process.argv[2] === 'add') {
    let taskName;
    if (!process.argv[3]) {
        console.log('请输入任务名称');
        return;
    }
    if(process.argv[4]) {
        taskName = process.argv.slice(3).join(' ');
    } else {
        taskName = process.argv[3];
    }
    api.add(taskName).then(() => console.log('保存成功'), (error) => console.log(error));
}

if (process.argv[2] === 'showAll') {
    void api.showAll();
}

if (process.argv[2] === 'clear') {
    api.clear().then(() => console.log('清除成功'));
}

if (process.argv[2] === 'copy') {
    api.copy().then(() => console.log('已复制'));
}
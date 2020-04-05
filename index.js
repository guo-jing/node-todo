const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = add;
async function add(task) {
    // 读取文件
    const list = await db.read();
    // 插入任务
    list.push({
        title: task,
        finished: false
    });
    // 保存任务
    return await db.write(list);
}

module.exports.showAll = showAll;
async function showAll() {
    // 读取文件
    const list = await db.read();
    // 显示任务
    var questions = [
        {
            type: 'list',
            name: 'size',
            message: '请选择你想操作的任务：',
            choices: [{name: '退出', value: -1}, ...list.map((current, index) => {
                return {name: `[${current.finished ? '√' : ' '}]${current.title}`, value: index}
            }), {name: '+创建任务', value: -1}]
        }
    ];

    inquirer.prompt(questions).then(answers => {
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
    });
}
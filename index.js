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
    printTasks(list);
}

function printTasks(list) {
    const question = [
        {
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务：',
            choices: [{name: '退出', value: -1}, ...list.map((current, index) => {
                return {name: `[${current.finished ? '√' : ' '}]${current.title}`, value: index}
            }), {name: '+创建任务', value: -2}]
        }
    ];
    inquirer.prompt(question).then(answer => {
        switch (answer.index) {
            case -1:
                break;
            case -2:
                askForAdd();
                break;
            default:
                askForOperation(list, answer.index);
        }
    });
}

function askForAdd() {
    const question = [
        {
            type: 'input',
            name: 'name',
            message: "请输入任务名："
        }
    ]
    inquirer.prompt(question).then(answer => {
        void add(answer.name)
    })
}

function askForOperation(list, taskIndex) {
    const questions = [
        {
            type: 'list',
            name: 'index',
            message: '请选择：',
            choices: [
                {name: '已完成', value: 0},
                {name: '未完成', value: 1},
                {name: '修改标题', value: 2},
                {name: '删除', value: 3},
                {name: '退出', value: 4},
            ]
        }
    ];
    inquirer.prompt(questions).then(answer => {
        switch (answer.index) {
            case 0:
                finishTask(list, taskIndex);
                printTasks(list);
                break;
            case 1:
                changeToUnfinished(list, taskIndex);
                printTasks(list);
                break;
            case 2:
                askForNewName(list, taskIndex);
                break;
            case 3:
                removeTask(list, taskIndex);
                printTasks(list);
                break;
        }
    });
}

function finishTask(list, taskIndex) {
    list[taskIndex].finished = true
    void db.write(list);
}

function changeToUnfinished(list, taskIndex) {
    list[taskIndex].finished = false
    void db.write(list);
}

function askForNewName(list, taskIndex) {
    const question = [
        {
            type: 'input',
            name: 'name',
            message: "请输入任务名："
        }
    ]
    inquirer.prompt(question).then(answer => void changeName(list, taskIndex, answer.name))
}

function changeName(list, taskIndex, name) {
    list[taskIndex].title = name
    void db.write(list);
    printTasks(list);
}

function removeTask(list, taskIndex) {
    list.splice(taskIndex, 1);
    void db.write(list);
}

module.exports.clear = clear;
function clear() {
    return db.write([]);
}
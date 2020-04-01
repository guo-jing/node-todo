const db = require('./db.js');

module.exports.add = add;
function add(task) {
    // 读取文件
    db.read();
    // 插入任务
    // 保存任务
}
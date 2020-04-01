const fs = require('fs');
const homedir = process.env.HOME || require('os').homedir();
const path = require('path');
const filePath = path.join(homedir, '.todo');

module.exports.read = read;
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {flag: 'a+'}, function(error, data) {
            if (error) reject(error);
            let list;
            try {
                list = JSON.parse(data.toString());
            } catch (e) {
                list = [];
            }
        })
    });
}
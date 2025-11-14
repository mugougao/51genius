
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');

async function writeData(jsonData) {
    try {
        await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log('JSON文件已成功写入:', jsonFilePath);
    } catch (err) {
        console.error('写入文件时出错:', err);
        throw err; // 将错误重新抛出
    }
}
//从数组中随机取到一个元素
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


let HanXuan1 = [
    "你好",
    "你好，请简单介绍一下国会的基本情况",
    "请介绍一下你自己",
    "讲解一下你的能力和功能"
]
let HanXuan2 = [
    "你好",
    "你好，请简单介绍一下国会的基本情况",
    "请介绍一下你自己",
    "讲解一下你的能力和功能"
]


build()
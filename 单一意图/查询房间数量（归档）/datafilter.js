const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');

const fullFilePath = path.join(__dirname, 'async_data.json');
const jsonFilePath = path.join(__dirname, 'data.json');

async function processData() {
    try {
        // 1. 使用 await 读取文件，代码是“顺序”执行的，非常清晰
        const data = await fs.readFile(fullFilePath, 'utf8');
        
        // 2. 处理数据
        const filteredData = await datafilter(data); // 注意：这里 datafilter 也应改为 async 函数或直接返回数据
        
        // 3. 写入数据
        await writeData(filteredData);
        
        console.log('所有操作已完成。');
    } catch (err) {
        // 一个 catch 块可以捕获整个流程中任何步骤抛出的错误
        console.error('处理流程出错:', err);
    }
}

// 启动处理流程
processData();

async function datafilter(data) {
    try {
        let jsondata = JSON.parse(data); 
        console.log(jsondata);
        let result = [];
        console.log(jsondata.length);
        
        for (let i = 0; i < jsondata.length; i++) {
            if (jsondata[i].tool == "query_info") {
                result.push(jsondata[i]);
            }
        }
        return result; // 函数返回过滤后的结果，由调用者决定如何处理
    } catch (err) {
        // 捕获 JSON.parse 或数据处理中可能出现的错误
        console.error('数据处理过程中出错:', err);
        throw err; // 将错误重新抛出，让外部统一处理
    }
}

async function writeData(jsonData) {
    try {
        await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log('JSON文件已成功写入:', jsonFilePath);
    } catch (err) {
        console.error('写入文件时出错:', err);
        throw err; // 将错误重新抛出
    }
}
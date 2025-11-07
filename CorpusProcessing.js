const fs = require('fs');
const path = require('path');


// 获取当前文件所在目录的绝对路径
const currentDir = __dirname;
// 构建日志文件的完整路径（假设日志文件名为app.log）
const logFilePath = path.join(currentDir, 'agent.log');
const jsonFilePath = path.join(__dirname, 'async_data.json');

// 使用异步方式读取日志文件
fs.readFile(logFilePath, 'utf8', async (err, data) => { // 将回调函数标记为 async
    try { // 添加 try-catch 来捕获整个异步流程中的错误
        if (err) {
            console.error('读取日志文件时发生错误:', err);
            return;
        }
        // 使用 await 等待 processLogFile 完成
         await processLogFile(data);

    } catch (e) {
        // 捕获 processLogFile 或其它操作中抛出的错误
        console.error("\:", e);
    }
});

// 解析日志文件中的数据
let number=0
//单
function extractLogEntry(logEntry) {
    try {
        // 添加空值检查
        if (!logEntry || logEntry.trim() === '') {
            return null;
        }

        const userMatch = logEntry.match(/(?<=USER:\s*)[^\r\n]*/);
        const toolMatch = logEntry.match(/(?<=TOOL CALL:\s*)[^\r\n]*/);
        
        // 检查匹配结果
        if (!userMatch) {
            console.warn("未找到USER部分:", logEntry.substring(0, 100));
            return null;
        }

        let tool = "";
        let params = "";

        if (toolMatch && toolMatch[0]) {
            const toolNameMatch = toolMatch[0].match(/^[^:]+(?=:)/);
            const paramsMatch = toolMatch[0].match(/(?<=:).*$/);
            
            tool = toolNameMatch ? toolNameMatch[0] : "";
            params = paramsMatch ? paramsMatch[0] : "";
        }

        return {
            user: userMatch[0],
            tool: tool,
            call: params
        };
    } catch (error) {
        console.error("处理日志条目时出错:", error.message, "日志内容:", logEntry.substring(0, 100));
        return null;
    }
}

async function processLogFile(logContent) {
    try {
        const logEntries = await logContent.split(/(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \| )?RESPONSE TIME: \d+\.\d+s\s*/);
        console.log("拆分后的日志条目数量:", logEntries.length);

        const jsonData = [];
        
        for(let i = 0; i < logEntries.length; i++) {
            try {
                const x = extractLogEntry(logEntries[i]);
                if (x !== null) { // 只添加成功的解析结果
                    jsonData.push(x);
                    console.log(`成功处理第${i}个条目`);
                } else {
                    console.log(`第${i}个条目处理失败，已跳过`);
                }
            } catch (entryError) {
                console.error(`处理第${i}个条目时出错:`, entryError.message);
                // 继续处理下一个条目
                continue;
            }
        }
        
        await writeData(jsonData);
        console.log(`处理完成，成功处理${jsonData.length}个条目，失败${logEntries.length - jsonData.length}个`);
        
    } catch (error) {
        console.error("处理日志文件时发生严重错误:", error);
    }
}

// 定义一个函数，用于异步写入JSON数据到文件
function writeData(jsonData) {
    //向文件中写入数据
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('写入文件时出错:', err);
            return;
        }
        console.log('JSON文件已成功异步写入:', jsonFilePath);
    });
}
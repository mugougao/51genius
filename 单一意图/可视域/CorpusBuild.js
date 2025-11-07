
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let actonArr = [
    "模拟",
    "转到",
    "看看",
    "看",
    "跳转",
    "进入"
]
let location1Arr = [
["第一排",1],
["第二排",2],
["第三排",3],
["第四排",4],
["第五排",5],
["倒数第一排",-1],
["倒数第二排",-2],
["倒数第三排",-3],
["倒数第四排",-4],
["倒数第五排",-5]
]

let location2Arr = [
["最左",1],
["最右",-1],
["第一个",1],
["最后一个",-1],
["中间",0.5],
["最左座位",1],
["最右座位",-1],
["第一个座位",1],
["最后一个座位",-1],
["中间座位",0.5],
]


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
async function build() {

    let Arr = []
   
    for (let i = 0; i < 200; i++) {
        let location1 = getRandomElement(location1Arr)
        let acton = getRandomElement(actonArr)
        let location2 = getRandomElement(location2Arr)
      
        
        // let conversation_id = getRandomElement(conversation_idArr)
        let template_real = {
            "conversation_history": [],
            "user_instruction": `${acton}${location1[0]}${location2[0]}的可视域效果。`,
            "thought": {
                "routing_thought": `用户指令'${acton}${location1[0]}${location2[0]}的可视域。',匹配到'可视域'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'show_viewshed'工具，该工具的输入包括x代表座位排号码${location1[0]}对应为${location1[1]}，y代表座位号码${location2[0]}对应为${location2[1]}，visible代表是否可见,此处希望打开可视域，为true。所以参数为'{"x":${location1[1]},"y":${location2[1]},visible:'true'}}'`,
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "show_viewshed",
                    "parameters": {"x":location1[1],"y":location2[1],"visible":true}
                }
            }
   
        }
             Arr.push(template_real)
    }
    await writeData(Arr)
}

build()
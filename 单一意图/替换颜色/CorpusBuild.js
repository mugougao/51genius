
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let actonArr = [
    ["VIP","vip"],
    ["SVIP","svip"],
    ["普通","general"],
    ["VIP区","vip"],
    ["SVIP区","svip"],
    ["普通区","general"],
    ["","all"],
    ["所有","all"],
    ["所有区","all"],
    ["全部","all"],
]
let location1Arr = [
"座位","椅子","座椅","座位颜色","椅子颜色","座椅颜色"
]

let location2Arr = [
"替换为","换成","更换为","改成","替换成","换成"
]
let location3Arr = [
["红色","宝石红"],
["宝石红","宝石红"],
["蓝色","极光蓝"],
["极光蓝","极光蓝"],
["金色","晨曦金"],
["晨曦金","晨曦金"],
["黄色","晨曦金"],
["金黄色","晨曦金"],
["白色","皓玉白"],
["皓玉白","皓玉白"],
["绿色","琉璃绿"],
["琉璃绿","琉璃绿"],
["灰色","混凝土"],
["混凝土","混凝土"],
["半透明","半透明"],
["透明","半透明"],
["半透","半透明"],
["默认颜色","默认"]
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
        let location3 = getRandomElement(location3Arr)
        
        // let conversation_id = getRandomElement(conversation_idArr)
        let template_real = {
            "conversation_history": [],
            "user_instruction": `${acton[0]}${location1}${location2}${location3[0]}。`,
            "thought": {
                "routing_thought": `用户指令${acton[0]}${location1}${location2}${location3[0]}。匹配到'替换模型颜色'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'furniture_change'工具，该工具的输入包括area,表示区域，color,表示颜色。所以参数为'{"area":"${acton[1]}","color":"${location3[1]}"}'`,
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "furniture_change",
                    "parameters": {"area":acton[1],"color":location3[1]}
                }
            }
   
        }
             Arr.push(template_real)
    }
    await writeData(Arr)
}

build()
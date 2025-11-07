
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let actonArr = [
    "展示",
    "演示",
    "看看",
    "加载",
    "展示一下",
    "看一看",
    "演示一下"
]
let location1Arr = [
    "鸡尾酒桌",
    "边几",
    "贵宾沙发",
    "舞台8",
    "舞台6",
    "沙发茶几组合01",
    "椅子",
    "普通宴会椅",
    "带套宴会椅",
    "宴会厅舞台",
    "宴会8人圆台",
    "宴会12人圆台",
    "宴会10人圆台",
    "会议桌02",
    "会议桌02",
    "会议桌主座椅",
    "休闲沙发",
    "三人座椅组合",
    "所有桌子",
    "所有茶几",
    "所有舞台",
    "所有椅子",
    "所有家具",
]

let location2Arr = [
    "的样式",
    "的模型",
    "模型",
    "",
    ""
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
        let template_real = {}
        if (location1 == "所有桌子" || location1 == "所有茶几" || location1 == "所有椅子" || location1 == "所有舞台") {
            template_real = {
                "conversation_history": [],
                "user_instruction": `${acton}${location1}${location2}。`,
                "thought": {
                    "routing_thought": `用户指令'${acton}${location1}${location2}。'指令中提到'所有',匹配到'查看所有家具'意图。适合直接进行工具调用。`,
                    "action_thought": `该意图对应'show_furniture_by_category'工具，该工具的输入包含category参数和visible参数，category参数为家具类型，visible参数为显示或隐藏状态，用户希望查看${location1}，说明希望显示此类型家具，所以参数为'{"category":"${location1.slice(-2)}","visible":true}'。`,
                    
                },
                "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "furniture_show_by_category",
                        "parameters": { "category": location1.slice(-2), "visible": true }
                    }

            }
            Arr.push(template_real)
        }
         else if (location1 == "所有家具") {
            template_real = {
                "conversation_history": [],
                "user_instruction": `${acton}${location1}${location2}。`,
                "thought": {
                    "routing_thought": `用户指令'${acton}${location1}${location2}。'指令中提到'所有',匹配到'查看所有家具'意图。适合直接进行工具调用。`,
                    "action_thought": `该意图对应'show_furniture_by_category'工具，该工具的输入包含category参数和visible参数，category参数为家具类型，visible参数为显示或隐藏状态，用户希望查看${location1}，但未指定家具类型，说明希望不分类型显示所有家具，category应该为空，所以参数为'{"category":"","visible":true}'。`,

                },
                "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "furniture_show_by_category",
                        "parameters": { "category": "", "visible": true }
                    }

            }
            Arr.push(template_real)
        }
        
        else {
            // let conversation_id = getRandomElement(conversation_idArr)
            template_real = {
                "conversation_history": [],
                "user_instruction": `${acton}${location1}${location2}。`,
                "thought": {
                    "routing_thought": `用户指令'${acton}${location1}${location2}。',匹配到'查看家具'意图。适合直接进行工具调用。`,
                    "action_thought": `该意图对应'furniture_show_single'工具，该工具的输入包括家具名称，提取到家具名称为${location1}。所以参数为'{"name":"${location1}"}'`,
                    
                },
                "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "furniture_show_single",
                        "parameters": { "name": location1 }
                 }

            }
            Arr.push(template_real)
        }

    }
    await writeData(Arr)
}

build()

const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let yituArr = [
    "展示",
    "看",
    "模拟",
    "打开",
    "关闭",
    "隐藏",
    "删除"
]
let room_nameArr = [
    "峰会厅",
    "大厅",
    "会议厅",
    "2层243会议室",
    "2层245会议室",
    "F大会堂",
    "多功能厅",
    "2层246会议室",
    "2层211会议室",
    "2层212会议室",
    "2层213会议室",
    "2层214会议室",
    "2层215会议室",
    "2层216会议室",
    "2层217会议室",
    "2层218会议室",
    "2层223会议室",
    "2层225会议室",
    "ABCD宴会厅",
    "3层A宴会厅",
    "2层265会议室",
    "2层266会议室",
    "2层267会议室",
    "2层268会议室",
    "1号展览厅",
    "2号展览厅",
    "3号展览厅",
    "4号展览厅",
    "2层252会议室",
    "2层251会议室",
    "2层253会议室",
    "2层254会议室"
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

    for (let i = 0; i < 80; i++) {
        let yitu = getRandomElement(yituArr)
        let room_name = getRandomElement(room_nameArr)
        let x = true
        if (yitu == "删除"||yitu == "隐藏"||yitu == "关闭") {
            x=false
        }
        let template_real = {
            "conversation_history": [],
            "user_instruction":  `${yitu}${room_name}疏散路径`,
            "thought": {
                "routing_thought": `用户要求'${yitu}${room_name}疏散路径',这关联到show_exit_route工具，我将调用该工具来执行相关操作。`,
                "action_thought":`该意图对应'show_exit_route'工具，该工具的输入包括房间名称参数room_name，和显示隐藏状态参数visible，用户意图为${yitu}${room_name}的疏散路径。所以参数为'{"room_name":"${room_name}","visible":${x}}'`,
            "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "show_exit_route",
                    "parameters": {"room_name":room_name,"visible":x}
            }
        }
    }
        Arr.push(template_real)
    }

    await writeData(Arr)
}

build()
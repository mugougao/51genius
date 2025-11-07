
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');




let input_total_peopleArr = [
    "150",
    "200",
    "250",
    "350",
    "400",
    "300",
    "500",
    "1000",
    "1500",
    "50",
    "100",
    "200",
    "300",
    "400",
    "450",
    "500",
    "550",
    "600",
    "700"
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

    for (let i = 0; i < 400; i++) {
        let input_total_people = getRandomElement(input_total_peopleArr)
        let QArr = [
            `我要开一个${input_total_people}人规模的会议，帮我推荐会议室`,
            `帮我推荐一个可盛纳${input_total_people}人规模的会议厅`,
            `近期要召开一个${input_total_people}人规模的活动，有哪些会议厅可用`,
            `我要组织一个${input_total_people}人规模的活动，帮我推荐会议厅`,
            `帮我推荐一个可盛纳${input_total_people}人规模的会议厅`,
            `我要组织一个${input_total_people}人规模的活动，帮我推荐一个会议厅`,
            `我要组织一个${input_total_people}人规模的会议，帮我推荐会议厅`,
            `我要组织一个超过${input_total_people}人规模的会议`,
            `${input_total_people}人规模的会议`,
            `${input_total_people}人，有什么房间推荐`,
            `${input_total_people}人规模的会议有哪些推荐`
        ]
        let template_real = {
            "conversation_history": [],
            "user_instruction": getRandomElement(QArr),
            "thought": {
                "routing_thought": `用户指令‘推荐会议厅’,并且提供了会议人数，匹配到'推荐会议厅'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'RecommendRoom'工具，该工具的输入包括'input_total_people'，从指令中可以明确提取如下参数：'input_total_people=${input_total_people}'`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "RecommendRoom",
                "parameters": {
                    "input_total_people": input_total_people,
                }
            }
        }
        Arr.push(template_real)
    }

    await writeData(Arr)
}

build()
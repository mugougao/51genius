
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let yituArr = [
    "在",
    "要",
    "意图",
    "需要",
    "考虑",
    "计划",
    "安排"
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
let event_nameArr = [
    "论坛",
    "会议",
    "活动",
    "大会"
]
let input_total_peopleArr = [
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
let svip_area_infoArr = [
    [
        "前面1排svip",
        "1"
    ],
    [
        "前面1排svip",
        "1"
    ],
    [
        "前面3排svip",
        "3"
    ],
    [
        "前面4排svip",
        "4"
    ],
    [
        "前面5排svip",
        "5"
    ],
    [
        "",
        null
    ]
]
let vip_area_infoArr = [
    [
        "中间2排vip",
        "2"
    ],
    [
        "中间3排vip",
        "3"
    ],
    [
        "中间4排vip",
        "4"
    ],
    [
        "中间5排vip",
        "5"
    ]
]
let general_area_infoArr = [
    [
        "后面几排普通座椅"
    ],
    [
        "后面普通座椅"
    ],
    [
        "其余为普通座椅"
    ],
    [
        "其余为普通位置"
    ]
]
let conversation_idArr = [
    "f92c7c9a-6d41-4b6a-85a3-1c54f1a8e3d1",
    "8b41e3d2-0a7f-4c19-9c2b-aa3d7f4c12a9",
    "c376aab5-1e88-4c34-8e5b-72d941f0336f",
    "3d82f771-9c2a-4c8e-9f12-5e8c9a4b21d0",
    "a15e0c8f-3b21-4d5a-b3dd-7f1c8a95b2e4",
    "e729f4c0-5b34-4812-9aae-8912c3d7456b",
    "4d0b881a-ff13-4e1f-a7cb-2a8e6f1c9933",
    "1f9a3b2c-85d6-4b09-88e7-1b345e6d78a2",
    "b5c6d7e8-92f1-4a3c-85a9-0d1e2f3a4b5c",
    "6e4a3b2c-15f8-4d2a-9b8c-7a1b2c3d4e5f",
    "82a1b3c4-d5e6-4f7a-89b0-1c2d3e4f5a6b",
    "9f8e7d6c-5b4a-4933-82a1-b2c3d4e5f6a7",
    "3c4d5e6f-a1b2-4c3d-8e9f-0a1b2c3d4e5f",
    "7a8b9c0d-1e2f-4354-8678-9a0b1c2d3e4f",
    "e5d4c3b2-a1f0-4e5d-8c7b-6a5d4c3b2a1f",
    "0a9b8c7d-6e5f-4a3b-8291-0f1e2d3c4b5a",
    "d4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f7a",
    "11223344-5566-4789-9a0b-c1d2e3f4a5b6",
    "aabbccdd-eeff-4a5b-6c7d-8e9f0a1b2c3d",
    "99887766-5544-4a3b-2c1d-0e0f1a2b3c4d"
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
        let yitu = getRandomElement(yituArr)
        let room_name = getRandomElement(room_nameArr)
        let event_name = getRandomElement(event_nameArr)
        let input_total_people = getRandomElement(input_total_peopleArr)
        let svip_area_info = getRandomElement(svip_area_infoArr)
        let vip_area_info = getRandomElement(vip_area_infoArr)
        let general_area_info = getRandomElement(general_area_infoArr)
       let string = `我${yitu}${room_name}召开一个${event_name}，${input_total_people}人，${svip_area_info[0]}，${vip_area_info[0]}，${general_area_info[0]}。`
        let template_real = {
            "conversation_history": [],
            "user_instruction": string,
            "thought": {
                "routing_thought": "用户提供了一个包含人数、房间、以及各类座位排数等多个复杂约束的排布指令。这超出了任何单一简单工具的处理能力，是一个典型的'房间推荐与布局'任务。因此，必须将此任务委托给专业的'room_service_adjuster'子Agent进行处理。",
                "action_thought":"我作为总指挥，职责是进行任务分派。我将把用户的完整指令原封不动地作为`input`参数，传递给`room_service_adjuster`。"

            },
            "action": {
            "action_type": "AGENT_DELEGATION",
            "agent_name": "room_service_adjuster",
            "agent_input": {
                 "input":string
            }
        }
    }
        Arr.push(template_real)
    }

    await writeData(Arr)
}

build()
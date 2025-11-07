
const fs = require('fs').promises; // 引入 Promise 版本的 fs API
const path = require('path');
const jsonFilePath = path.join(__dirname, 'data.json');


let cameraArr = [
    "镜头",
    "画面",
    "视角",
    "摄像机",
    "相机"
]
let actonArr = [
    "抬高",
    "提高",
    "升高",
    "降低",
    "下降",
    "减少",
    "高度抬高",
    "位置提高",
    "高度升高",
    "位置降低",
    "高度下降",
    "高度减少",
]

let HeightArr = [
    "10",
    "20",
    "25",
    "30",
    "50",
    "100",
    "60",
    "一点",
    "一些",
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
   
    for (let i = 0; i < 100; i++) {
        let camera = getRandomElement(cameraArr)
        let acton = getRandomElement(actonArr)
        let Height = getRandomElement(HeightArr)
        let X1 = ""
        let X2 = ""
        let X3 = ""
        let unit = ""
        let Height_number = Height
        if (acton == "降低" || acton == "下降" || acton == "减少") {
            X1 = "-" 
            
        }else if(acton == "抬高" || acton == "提高" || acton == "升高"){
            
        }

        if (Height == "" || Height == "一点" || Height == "一些") {
            if (X1 == "-") {
                X2 = "由于用户指令中未指定高度,默认设置为-1"
                Height_number=1
            }
            else {
                X2 = "由于用户指令中未指定高度,默认设置为1"
                Height_number=1
            }
        } else {
            X2 = "用户指令中指定了高度为" + Height + "米"
             unit = "米"
        }

          X3 = `由于用户指令中指定了${acton},所以参数为"step":${X1 + Height_number}。`
        
        // let conversation_id = getRandomElement(conversation_idArr)
        let template_real = {
            "conversation_history": [],
            "user_instruction": `${camera}${acton}${Height}${unit}。`,
            "thought": {
                "routing_thought": `用户指令'${camera}${acton}${Height}${unit}',匹配到'镜头控制'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'set_camera_zoom'工具，该工具的输入包括'step',${X2},${X3}`,
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "set_camera_zoom",
                    "parameters": {
                        "step": X1 + Height_number
                    }
                }
            }
   
        }
             Arr.push(template_real)
    }
    await writeData(Arr)
}

build()

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
async function build() {

    let Arr = []

    for (let i = 0; i < 150; i++) {


        let x1= await statusbar()
        console.log(x1)
        if(x1[0].includes("洗手间")){  

        let template_real = await {
            "conversation_history": [],
            "user_instruction":  x1[0],
            "thought": {
                "routing_thought": `用户要求${x1[0]},这关联到route_show工具，我将调用该工具来执行相关操作。`,
                "action_thought":`该意图对应'route_show'工具，该工具的输入包括起始房间名称和目标房间名称，提取到起始房间名称为${x1[1]}，目标房间名称为洗手间，可理解为洗手间。所以参数为'{"origin":${x1[1]},"destination":"洗手间"}'`,
            "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "route_show",
                    "parameters": {"origin":x1[1],"destination":"洗手间"}
            }
        }
    }
        Arr.push(template_real)
        }
    else if(x1[0].includes("卫生间")){
        let template_real = await {
            "conversation_history": [],
            "user_instruction":  x1[0],
            "thought": {
                "routing_thought": `用户要求${x1[0]},这关联到route_show工具，我将调用该工具来执行相关操作。`,
                "action_thought":`该意图对应'route_show'工具，该工具的输入包括起始房间名称和目标房间名称，提取到起始房间名称为${x1[1]}，目标房间名称为卫生间，可理解为洗手间。所以参数为'{"origin":${x1[1]},"destination":"洗手间"}'`,
            "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "route_show",
                    "parameters": {"origin":x1[1],"destination":"洗手间"}
            }
        }
    }
        Arr.push(template_real)
    }
    else{
      let template_real = await {
            "conversation_history": [],
            "user_instruction":  x1[0],
            "thought": {
                "routing_thought": `用户要求${x1[0]},这关联到route_show工具，我将调用该工具来执行相关操作。`,
                "action_thought":`该意图对应'route_show'工具，该工具的输入包括起始房间名称和目标房间名称，提取到起始房间名称为${x1[1]}，目标房间名称为${x1[2]}。所以参数为'{"origin":${x1[1]},"destination":${x1[2]}}'`,
            "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "route_show",
                    "parameters": {"origin":x1[1],"destination":x1[2]}
            }
        }
    }
        Arr.push(template_real)
    }

    }

     writeData(Arr)
}

build()

async function statusbar(){
let room1 = [
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
let room2 = [
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
    "2层254会议室",
    "卫生间",
    "卫生间",
    "卫生间",
    "洗手间",
    "洗手间",
]
let x=[]
   let selectedOrigin = getRandomElement(room1);
    let selectedDest = getRandomElement(room2);
let qs= [
    `查看${selectedOrigin}到${selectedDest}路径`,
    `查看${selectedOrigin}到男洗手间的路线`,
    `查看${selectedOrigin}到最近的洗手间路径`,
    `${selectedOrigin}到${selectedDest}怎么走`,
    `查找${selectedOrigin}附近最近的卫生间`,
    `查找${selectedOrigin}附近最近的卫生间怎么走`,
    `展示从${selectedOrigin}到${selectedDest}的导览路径`,
    `${selectedOrigin}附近最近的卫生间的路径`,
    `展示${selectedOrigin}到${selectedDest}间的路线`,
    `带我从${selectedOrigin}到${selectedDest}`,
     `${selectedOrigin}到${selectedDest}的路线`,
     `规划一条从${selectedOrigin}到${selectedDest}的路线`,
]
 let selectedQuery = getRandomElement(qs);



x= [selectedQuery,selectedOrigin,selectedDest]

return x
}
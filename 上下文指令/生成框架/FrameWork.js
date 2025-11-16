import { v1 as uuidv1 } from 'uuid';
let UUID = uuidv1(); // 生成一个新的UUID


// 对话环节定义
const DIALOGUE_STAGES = {
    GREETING: '问候',
    ROOM_RECOMMENDATION: '场馆查看',
    VENUE_INQUIRY: '选房间',
    SEAT_ARRANGEMENT: '排桌',
    ARRANGEMENT_ADJUSTMENT: '调整排桌方案',
    COLOR_REPLACEMENT: '替换颜色',
    VIEW_SIMULATION: '视角模拟',
    Exit: '退出'
};


function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
// 每个环节的问题类型
async function buildQusetion() {




    let SEAT_ARRANGEMENT1 = await SEAT_ARRANGEMENT()
    let VIEW_SIMULATION1 = await VIEW_SIMULATION()
    let COLOR_REPLACEMENT1 = await COLOR_REPLACEMENT()
    let VENUE_INQUIRY1 = await VENUE_INQUIRY()
    let ROOM_RECOMMENDATION1 = await ROOM_RECOMMENDATION()
    let GREETING1 = await GREETING()

    let QUESTION_TYPES = await {
        [DIALOGUE_STAGES.GREETING]: [GREETING1],
        [DIALOGUE_STAGES.ROOM_RECOMMENDATION]: [ROOM_RECOMMENDATION1],
        [DIALOGUE_STAGES.VENUE_INQUIRY]: [VENUE_INQUIRY1],
        [DIALOGUE_STAGES.SEAT_ARRANGEMENT]: [SEAT_ARRANGEMENT1],
        [DIALOGUE_STAGES.ARRANGEMENT_ADJUSTMENT]: [
            "根据反馈，我们可以将前排座位减少10%",
            "建议将VIP区域移至中央位置",
            "考虑到视线问题，建议升高后排座位",
            "可以增加两个紧急出口通道",
            "根据新的要求，我们可以调整座位间距"
        ],
        [DIALOGUE_STAGES.VIEW_SIMULATION]: [VIEW_SIMULATION1],
        [DIALOGUE_STAGES.COLOR_REPLACEMENT]: [COLOR_REPLACEMENT1],
        [DIALOGUE_STAGES.Exit]: [
            "感谢您的咨询，期待为您服务",
            "如有任何问题，欢迎随时联系我们",
            "方案已确认，我们将尽快安排",
            "祝您的活动圆满成功",
            "期待下次合作"
        ]
    };
    return QUESTION_TYPES
}
// 生成对话的函数
async function generateDialogues(numDialogues) {
    const dialogue = [];
    let QUESTION_TYPES = await buildQusetion()
    for (let i = 0; i < numDialogues; i++) {


        // 按顺序生成每个环节的对话
        for (const stage in DIALOGUE_STAGES) {
            const stageName = DIALOGUE_STAGES[stage];
            const questions = QUESTION_TYPES[stageName];

            // 随机选择该环节的一个问题类型
            const randomIndex = Math.floor(Math.random() * questions.length);
            const userQuestion = questions[randomIndex];

            // 生成AI回复（这里简化处理，实际可以根据问题生成更智能的回复）
            let aiResponse;
            switch (stageName) {
                case DIALOGUE_STAGES.GREETING:
                    aiResponse = await GREETING_A(userQuestion, "问候");
                    break;
                case DIALOGUE_STAGES.VENUE_INQUIRY:
                    aiResponse = await VENUE_INQUIRY_A(userQuestion, "选房间");
                    break;
                case DIALOGUE_STAGES.ROOM_RECOMMENDATION:
                    aiResponse = await ROOM_RECOMMENDATION_A(userQuestion, "查看房间");
                    break;
                case DIALOGUE_STAGES.SEAT_ARRANGEMENT:
                    aiResponse = "明白了，我会为您设计座位排布方案。";
                    break;
                case DIALOGUE_STAGES.ARRANGEMENT_ADJUSTMENT:
                    aiResponse = "已收到您的反馈，将进行相应调整。";
                    break;
                case DIALOGUE_STAGES.VIEW_SIMULATION:
                    aiResponse = "这是模拟效果图，请查看是否符合预期。";
                    break;
                case DIALOGUE_STAGES.CONCLUSION:
                    aiResponse = "感谢您使用我们的服务！";
                    break;
            }
            aiResponse.conversation_history = await Context(dialogue)
            // 添加用户问题和AI回复到对话中
            dialogue.push(aiResponse);
        }


    }

    console.log(JSON.stringify(dialogue, null, 2));
    return dialogue;
}

// 示例：生成对话
let sampleDialogues = generateDialogues(1);


// 座位排布问题创建
async function SEAT_ARRANGEMENT() {
    let yituArr = ["在", "要", "意图", "需要", "考虑", "计划", "安排"]
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

    let yitu = getRandomElement(yituArr)
    let room_name = getRandomElement(room_nameArr)
    let event_name = getRandomElement(event_nameArr)
    let input_total_people = getRandomElement(input_total_peopleArr)
    let svip_area_info = getRandomElement(svip_area_infoArr)
    let vip_area_info = getRandomElement(vip_area_infoArr)
    let general_area_info = getRandomElement(general_area_infoArr)
    let string = `我${yitu}${room_name}召开一个${event_name}，${input_total_people}人，${svip_area_info[0]}，${vip_area_info[0]}，${general_area_info[0]}。`
    let template_real = {
        "questions": string,
        "input_total_people": input_total_people,
        "svip_area_info": svip_area_info[1],
        "vip_area_info": vip_area_info[1],
        "general_area_info": general_area_info[0]
    }



    return template_real


}

//可视域问题创建
async function VIEW_SIMULATION() {
    let actonArr = [
        "模拟",
        "转到",
        "看看",
        "看",
        "跳转",
        "进入"
    ]
    let location1Arr = [
        ["第一排", 1],
        ["第二排", 2],
        ["第三排", 3],
        ["第四排", 4],
        ["第五排", 5],
        ["倒数第一排", -1],
        ["倒数第二排", -2],
        ["倒数第三排", -3],
        ["倒数第四排", -4],
        ["倒数第五排", -5]
    ]

    let location2Arr = [
        ["最左", 1],
        ["最右", -1],
        ["第一个", 1],
        ["最后一个", -1],
        ["中间", 0.5],
        ["最左座位", 1],
        ["最右座位", -1],
        ["第一个座位", 1],
        ["最后一个座位", -1],
        ["中间座位", 0.5],
    ]

    let location1 = getRandomElement(location1Arr)
    let acton = getRandomElement(actonArr)
    let location2 = getRandomElement(location2Arr)

    // let conversation_id = getRandomElement(conversation_idArr)
    let template_real = {
        "user_instruction": `${acton}${location1[0]}${location2[0]}的可视域效果。`,
        line_number: location1[0],
        seat_number: location2[0],
    }
    return template_real
}



// 颜色替换问题创建
async function COLOR_REPLACEMENT() {


    let actonArr = [
        ["VIP", "vip"],
        ["SVIP", "svip"],
        ["普通", "general"],
        ["VIP区", "vip"],
        ["SVIP区", "svip"],
        ["普通区", "general"],
        ["", "all"],
        ["所有", "all"],
        ["所有区", "all"],
        ["全部", "all"],
    ]
    let location1Arr = [
        "座位", "椅子", "座椅", "座位颜色", "椅子颜色", "座椅颜色"
    ]

    let location2Arr = [
        "替换为", "换成", "更换为", "改成", "替换成", "换成"
    ]
    let location3Arr = [
        ["红色", "宝石红"],
        ["宝石红", "宝石红"],
        ["蓝色", "极光蓝"],
        ["极光蓝", "极光蓝"],
        ["金色", "晨曦金"],
        ["晨曦金", "晨曦金"],
        ["黄色", "晨曦金"],
        ["金黄色", "晨曦金"],
        ["白色", "皓玉白"],
        ["皓玉白", "皓玉白"],
        ["绿色", "琉璃绿"],
        ["琉璃绿", "琉璃绿"],
        ["灰色", "混凝土"],
        ["混凝土", "混凝土"],
        ["半透明", "半透明"],
        ["透明", "半透明"],
        ["半透", "半透明"],
        ["默认颜色", "默认"]
    ]

    let location1 = getRandomElement(location1Arr)
    let acton = getRandomElement(actonArr)
    let location2 = getRandomElement(location2Arr)
    let location3 = getRandomElement(location3Arr)

    // let conversation_id = getRandomElement(conversation_idArr)
    let template_real = {
        "user_instruction": `${acton[0]}${location1}${location2}${location3[0]}。`,
        "area": acton[1],
        "color": location3[1]

    }

    return template_real
}

// 会议场地推荐问题创建
async function VENUE_INQUIRY() {


    let peopleNums = [
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


    let input_total_people = getRandomElement(peopleNums)
    let questionArr = [
        { questions: `我要开一个${input_total_people}人规模的会议，帮我推荐会议室`, input_total_people: input_total_people },
        { questions: `帮我推荐一个可盛纳${input_total_people}人规模的会议厅`, input_total_people: input_total_people },
        { questions: `近期要召开一个${input_total_people}人规模的活动，有哪些会议厅可用`, input_total_people: input_total_people },
        { questions: `我要组织一个${input_total_people}人规模的活动，帮我推荐会议厅`, input_total_people: input_total_people },
        { questions: `帮我推荐一个可盛纳${input_total_people}人规模的会议厅`, input_total_people: input_total_people },
        { questions: `我要组织一个${input_total_people}人规模的活动，帮我推荐一个会议厅`, input_total_people: input_total_people },
        { questions: `我要组织一个${input_total_people}人规模的会议，帮我推荐会议厅`, input_total_people: input_total_people },
        { questions: `我要组织一个超过${input_total_people}人规模的会议`, input_total_people: input_total_people },
        { questions: `${input_total_people}人规模的会议`, input_total_people: input_total_people },
        { questions: `${input_total_people}人，有什么房间推荐`, input_total_people: input_total_people },
        { questions: `${input_total_people}人规模的会议有哪些推荐`, input_total_people: input_total_people }
    ]
    let question = getRandomElement(questionArr)



    // let conversation_id = getRandomElement(conversation_idArr)
    let template_real = question

    return template_real
}


// 打招呼问题创建
async function GREETING() {
    let questionArr = [
        { questions: `你好` },
        { questions: `请介绍国会` },
        { questions: `你好，智会精灵` },
        { questions: `请介绍你自己` }
    ]
    let question = getRandomElement(questionArr)
    return question
}
// 打招呼问题回答
async function GREETING_A(GREETING1, QUESTION_TYPES) {
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [],
        "user_instruction": GREETING1.questions,
        "thought": {
            "routing_thought": `用户指令'${GREETING1.questions}'，匹配到'问候'意图。适合直接进行AI回复。`,
        },
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "say_hi",
            "parameters": { }
    }
    }
    return template_real
}
// 查看房间问题创建
async function ROOM_RECOMMENDATION() {
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


    let room_name = getRandomElement(room_nameArr)
    let questionArr = [
        { questions: `看看${room_name}`, room_name: room_name },
        { questions: `带我看看${room_name}`, room_name: room_name },
        { questions: `镜头跳转到${room_name}`, room_name: room_name },
        { questions: `镜头跳转到${room_name}`, room_name: room_name },
        { questions: `跳转到${room_name}`, room_name: room_name },
        { questions: `转到${room_name}`, room_name: room_name },
    ]
    let question = getRandomElement(questionArr)

    let template_real = question

    return template_real
}

async function ROOM_RECOMMENDATION_A(ROOM_RECOMMENDATION1, QUESTION_TYPES) {
    let room_name = ROOM_RECOMMENDATION1.room_name
    let question = ROOM_RECOMMENDATION1.questions
    let template_real = {}
    if (room_name.includes("2")) {
        template_real = {
            "stage": QUESTION_TYPES,
            "user_instruction": question,
            "conversation_history": [],
            "thought": {
                "routing_thought": `用户指令'${question}'，直接匹配到'查看会议厅'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应"set_camera_location"工具，该工具的输入'room_name'字段，值为房间、楼层名称,指令中提到${room_name}，可知'${room_name}'中的'2'为2层,${room_name}即'2层${room_name}'，可以明确提取'room_name='2层${room_name}'`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "set_camera_location",
                "parameters": { "room_name": room_name }
            }
        }
    } else {
        template_real = {
            "conversation_history": [],
            "thought": {
                "routing_thought": `用户指令'${question}'，直接匹配到'查看会议厅'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应"set_camera_location"工具，该工具的输入'room_name'字段，值为房间、楼层名称,指令中提到${room_name}，可以明确提取'room_name=${room_name}'`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "set_camera_location",
                "parameters": { "room_name": room_name }
            }
        }
    }

    return template_real
}
// 会议场地推荐问题回答
async function VENUE_INQUIRY_A(VENUE_INQUIRY1, QUESTION_TYPES,shangxiawen) {
    let input_total_people = VENUE_INQUIRY1.input_total_people
    let question = VENUE_INQUIRY1.questions
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [
            {
                "role": "system",
                "content": `当前的conversation_id为${UUID}，请在后续的对话中保持使用该conversation_id。`
            }
        ],
        "user_instruction": question,
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
    return template_real
}

async function Context (Context) {
let conversation_history=[]
let conversation_history_user={
        "role": "user",
        "content": ""
      }
let conversation_history_assistant={
        "role": "assistant",
        "action": {}
      }
for (let i=0;i<Context.length;i++){
    Context[i].user_instruction=conversation_history_user.content
    Context[i].action=conversation_history_assistant.action
    conversation_history.push(conversation_history_user)
    conversation_history.push(conversation_history_assistant)
}

return conversation_history
}
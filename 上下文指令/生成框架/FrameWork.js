import { v1 as uuidv1 } from 'uuid';
import fs from 'fs/promises';


let Global_Info = {
    "room_name": null,
    "UUID": "UUID",
    "room_info": [
        ["峰会厅", 1620],
        ["2层243会议室", 648],
        ["2层245会议室", 324],
        ["F大会堂", 1008],
        ["多功能厅", 540],
        ["2层246会议室", 209],
        ["2层211会议室", 108],
        ["2层212会议室", 108],
        ["2层213会议室", 120],
        ["2层214会议室", 120],
        ["2层215会议室", 120],
        ["2层216会议室", 120],
        ["2层217会议室", 120],
        ["2层218会议室", 120],
        ["2层223会议室", 648],
        ["2层225会议室", 396],
        ["ABCD宴会厅", 4284],
        ["3层A宴会厅", 920],
        ["2层265会议室", 72],
        ["2层266会议室", 72],
        ["2层267会议室", 72],
        ["2层268会议室", 63],
        ["1号展览厅", 8550],
        ["2号展览厅", 3876],
        ["3号展览厅", 3876],
        ["4号展览厅", 4770],
        ["2层252会议室", 432],
        ["2层251会议室", 234],
        ["2层253会议室", 342],
        ["2层254会议室", 247]
    ]
}



// 对话环节定义
const DIALOGUE_STAGES = {
    GREETING: '问候',
    ROOM_RECOMMENDATION: '查看房间',
    VENUE_INQUIRY: '选房间',
    SEAT_ARRANGEMENT: '排桌',
    ARRANGEMENT_ADJUSTMENT: '调整排桌方案',
    COLOR_REPLACEMENT: '替换颜色',
    VIEW_SIMULATION: '视角模拟',
};

// 从数组中随机选择一个元素
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
// 构建问题
async function buildQusetion() {

    let SEAT_ARRANGEMENT1 = await SEAT_ARRANGEMENT()
    let VIEW_SIMULATION1 = await VIEW_SIMULATION()
    let COLOR_REPLACEMENT1 = await COLOR_REPLACEMENT()
    let VENUE_INQUIRY1 = await VENUE_INQUIRY()
    let ROOM_RECOMMENDATION1 = await ROOM_RECOMMENDATION()
    let GREETING1 = await GREETING()
    let ARRANGEMENT_ADJUSTMENT1 = await ARRANGEMENT_ADJUSTMENT()

    let QUESTION_TYPES = await {
        [DIALOGUE_STAGES.GREETING]: [GREETING1],
        [DIALOGUE_STAGES.ROOM_RECOMMENDATION]: [ROOM_RECOMMENDATION1],
        [DIALOGUE_STAGES.VENUE_INQUIRY]: [VENUE_INQUIRY1],
        [DIALOGUE_STAGES.SEAT_ARRANGEMENT]: [SEAT_ARRANGEMENT1],
        [DIALOGUE_STAGES.ARRANGEMENT_ADJUSTMENT]: [ARRANGEMENT_ADJUSTMENT1],
        [DIALOGUE_STAGES.VIEW_SIMULATION]: [VIEW_SIMULATION1],
        [DIALOGUE_STAGES.COLOR_REPLACEMENT]: [COLOR_REPLACEMENT1],
        // [DIALOGUE_STAGES.Exit]: []
    };
    return QUESTION_TYPES
}

// 生成对话
async function generateDialogues(numDialogues) {
    const dialogue = [];
    let aiResponse = {}
    let QUESTION_TYPES = await buildQusetion()
    for (let i = 0; i < numDialogues; i++) {

        // 按顺序生成每个环节的对话
        for (const stage in DIALOGUE_STAGES) {
            //选择该环节的问题类型
            const stageName = DIALOGUE_STAGES[stage];
            const questions = QUESTION_TYPES[stageName];

            // 随机选择该环节的一个问题类型
            const randomIndex = Math.floor(Math.random() * questions.length);
            const userQuestion = questions[randomIndex];

            // 生成AI回复

            switch (stageName) {
                case DIALOGUE_STAGES.GREETING:
                    let aiResponse1 = {}
                    aiResponse = await GREETING_A(userQuestion, "问候");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse1 = JSON.parse(JSON.stringify(aiResponse));
                    let x = await Context1(aiResponse1)
                    dialogue.push(x);
                    break;
                case DIALOGUE_STAGES.VENUE_INQUIRY:
                    let aiResponse2 = {}
                    aiResponse = await VENUE_INQUIRY_A(userQuestion, "选房间");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse2 = JSON.parse(JSON.stringify(aiResponse));
                    let x1 = await Context1(aiResponse2)
                    dialogue.push(x1);

                    break;
                case DIALOGUE_STAGES.ROOM_RECOMMENDATION:
                    let aiResponse3 = {}
                    aiResponse = await ROOM_RECOMMENDATION_A(userQuestion, "查看房间");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse3 = JSON.parse(JSON.stringify(aiResponse));
                    let x2 = await Context1(aiResponse3)
                    dialogue.push(x2);

                    break;
                case DIALOGUE_STAGES.SEAT_ARRANGEMENT:
                    let aiResponse4 = {}
                    aiResponse = await SEAT_ARRANGEMENT_A(userQuestion, "排桌");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse4 = JSON.parse(JSON.stringify(aiResponse));
                    let x3 = await Context1(aiResponse4)
                    dialogue.push(x3);
                    break;

                case DIALOGUE_STAGES.COLOR_REPLACEMENT:
                    let aiResponse6 = {}
                    aiResponse = await COLOR_REPLACEMENT_A(userQuestion, "替换颜色");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse6 = JSON.parse(JSON.stringify(aiResponse));
                    let x5 = await Context1(aiResponse6)
                    dialogue.push(x5);
                    break;

                case DIALOGUE_STAGES.ARRANGEMENT_ADJUSTMENT:
                    let aiResponse5 = {}
                    aiResponse = await ARRANGEMENT_ADJUSTMENT_A(userQuestion, "调整排桌方案");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse5 = JSON.parse(JSON.stringify(aiResponse));
                    let x4 = await Context1(aiResponse5)
                    dialogue.push(x4);
                    let xx= JSON.parse(JSON.stringify(x4));
                    let xxx=await Context2(xx)
                    dialogue.push(xxx);
                    break;

                case DIALOGUE_STAGES.VIEW_SIMULATION:
                    let aiResponse7 = {}
                    aiResponse = await VIEW_SIMULATION_A(userQuestion, "视角模拟");
                    aiResponse.conversation_history = await Context(dialogue)
                    dialogue.push(aiResponse);
                    aiResponse7 = JSON.parse(JSON.stringify(aiResponse));
                    let x7 = await Context1(aiResponse7)
                    dialogue.push(x7);
                    break;
            }

        }


    }

    return dialogue
    //writeData(dialogue)
}


// 写入数据到JSON文件
async function writeData() {
for (let i = 1; i <= 300; i++) {
       
            Global_Info.UUID=uuidv1()
            let jsonData= await generateDialogues(1);
            await fs.writeFile(`Data/data${i}.json`, JSON.stringify(jsonData, null, 2), 'utf8');
      
    }
    console.log('所有文件创建完成');
}

// 座位排布问题创建
async function SEAT_ARRANGEMENT() {
    let yituArr = ["在", "要", "意图", "需要", "考虑", "计划", "安排"]
    let room_nameArr = [
        "峰会厅",
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
        "svip_area_info": svip_area_info,
        "vip_area_info": vip_area_info,
        "general_area_info": general_area_info,
        "room_name": room_name,
        "event_name": event_name,
        "yitu": yitu
    }


    return template_real


}
// 座位排布问题回答
async function SEAT_ARRANGEMENT_A(SEAT_ARRANGEMENT1, QUESTION_TYPES) {

    let room_name = SEAT_ARRANGEMENT1.room_name
    let event_name = SEAT_ARRANGEMENT1.event_name
    let input_total_people = SEAT_ARRANGEMENT1.input_total_people
    let svip_area_info = SEAT_ARRANGEMENT1.svip_area_info
    let vip_area_info = SEAT_ARRANGEMENT1.vip_area_info
    let general_area_info = SEAT_ARRANGEMENT1.general_area_info
    let yitu = SEAT_ARRANGEMENT1.yitu
    let template_real = await {
        "stage": QUESTION_TYPES,
        "conversation_history": [],
        "user_instruction": `我${yitu}${room_name}召开一个${event_name}，${input_total_people}人，${svip_area_info[0]}，${vip_area_info[0]}，${general_area_info[0]}。`,
        "thought": {
            "routing_thought": `用户指令'${room_name}召开一个${event_name}，${input_total_people}人，${svip_area_info[0]}，${vip_area_info[0]}，${general_area_info[0]}',提到了座椅排布的相关信息,匹配到'查看会议厅'意图。适合直接进行工具调用。`,
            "action_thought": `该意图对应'adjust_room_layout'工具，该工具的输入包括'input_total_people','conversation_id','arrange_type','room_name','svip_area_info','vip_area_info','general_area_info'，从指令中可以明确提取如下参数：'input_total_people=${input_total_people}','room_name=${room_name}','svip_area_info.row=${svip_area_info[1]}','vip_area_info.row=${vip_area_info[1]}',用户未指定排布方式座椅模型类型，默认选取剧院式,贵宾沙发，休闲沙发和普通座椅'arrange_type=剧院式','svip_area_info.seat_model=贵宾沙发','vip_area_info.seat_model=休闲沙发','general_area_info.seat_model=普通座椅'`
        },
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "adjust_room_layout",
            "parameters": {
                "conversation_id": Global_Info.UUID,
                "input_total_people": input_total_people,
                "arrange_type": "剧院式",
                "room_name": room_name,
                "svip_area_info": {
                    "row": svip_area_info[1],
                    "seat_model": "贵宾沙发"
                },
                "vip_area_info": {
                    "row": vip_area_info[1],
                    "seat_model": "休闲沙发"
                },
                "general_area_info": {
                    "seat_model": "普通座椅"
                }
            }
        }
    }


    Global_Info.room_name = room_name
    Global_Info.input_total_people = input_total_people
    Global_Info.Sviprow = svip_area_info[1]
    Global_Info.Viprow = vip_area_info[1]
    Global_Info.Generalrow = general_area_info[0]
    //console.log(JSON.stringify(template_real))
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
        line_number: location1,
        seat_number: location2,
    }
    return template_real
}

// 可视域问题回复
async function VIEW_SIMULATION_A(VIEW_SIMULATION1, QUESTION_TYPES) {
    let line_number = VIEW_SIMULATION1.line_number
    let seat_number = VIEW_SIMULATION1.seat_number
    let user_instruction = VIEW_SIMULATION1.user_instruction
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [],
        "user_instruction": user_instruction,
        "thought": {
            "routing_thought": `用户指令'${user_instruction}',匹配到'可视域'意图。适合直接进行工具调用。`,
            "action_thought": `该意图对应'layout_show_viewshed'工具，该工具的输入包括x代表座位排号码${line_number[0]}对应为${line_number[1]}，y代表座位号码${seat_number[0]}对应为${seat_number[1]}，visible代表是否可见,此处希望打开可视域，为true。所以参数为'{"x":${line_number[1]},"y":${seat_number[1]},visible:'true'}}'`,

        },
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "layout_show_viewshed",
            "parameters": { 
                "conversation_id": Global_Info.UUID,
                "x": line_number[1], 
                "y": seat_number[1], 
                "visible": true 
            }
        }
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
        "area": acton,
        "color": location3,
        "location1": location1,
        "location2": location2


    }

    return template_real
}

//颜色替换问题回复
async function COLOR_REPLACEMENT_A(COLOR_REPLACEMENT1, QUESTION_TYPES) {

    let area = COLOR_REPLACEMENT1.area
    let color = COLOR_REPLACEMENT1.color


    // let conversation_id = getRandomElement(conversation_idArr)
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [],
        "user_instruction": COLOR_REPLACEMENT1.user_instruction,
        "thought": {
            "routing_thought": `用户指令${COLOR_REPLACEMENT1.user_instruction}匹配到'替换模型颜色'意图。适合直接进行工具调用。`,
            "action_thought": `该意图对应'furniture_change'工具，该工具的输入包括area,表示区域，color,表示颜色。所以参数为'{"area":"${area[1]}","color":"${color[1]}"}'`,

        },
        "content": `已为您将${area[0]}的颜色替换为${color[1]}`,
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "furniture_change",
            "parameters": { 
                "conversation_id": Global_Info.UUID,
                "area": area[1], 
                "color": color[1] 
            }
        }
    }

    Global_Info.color = color[1]
    return template_real
}

// 会议场地推荐问题创建
async function VENUE_INQUIRY() {


    let peopleNums = [
        150,
        200,
        250,
        350,
        400,
        300,
        500,
        1000,
        1500,
        50,
        100,
        200,
        300,
        400,
        450,
        500,
        550,
        600,
        700
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
            "parameters": {
                "conversation_id": Global_Info.UUID,
            }
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
//查看房间问题回复
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
                "action_thought": `该意图对应"camera_look_down"工具，该工具的输入'room_name'字段，值为房间、楼层名称,指令中提到${room_name}，可知'${room_name}'中的'2'为2层,${room_name}即'2层${room_name}'，可以明确提取'room_name='2层${room_name}'`
            },
            "content": `已为您展示${room_name}`,
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "camera_look_down",
                "parameters": { 
                    "conversation_id": Global_Info.UUID,
                    "room_name": room_name 
                }
            }
        }
    } else {
        template_real = {
            "stage": QUESTION_TYPES,
            "user_instruction": question,
            "conversation_history": [],
            "thought": {
                "routing_thought": `用户指令'${question}'，直接匹配到'查看会议厅'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应"camera_look_down"工具，该工具的输入'room_name'字段，值为房间、楼层名称,指令中提到${room_name}，可以明确提取'room_name=${room_name}'`
            },
            "content": `已为您展示${room_name}`,
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "camera_look_down",
                "parameters": { 
                    "conversation_id": Global_Info.UUID,
                    "room_name": room_name 
                }
            }
        }
    }
    Global_Info.room_name = room_name
    return template_real
}
// 会议场地推荐问题回答
async function VENUE_INQUIRY_A(VENUE_INQUIRY1, QUESTION_TYPES) {

    Global_Info.input_total_people = VENUE_INQUIRY1.input_total_people
    let question = VENUE_INQUIRY1.questions
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [

        ],
        "user_instruction": question,
        "thought": {
            "routing_thought": `用户指令‘推荐会议厅’,并且提供了会议人数，匹配到'推荐会议厅'意图。适合直接进行工具调用。`,
            "action_thought": `该意图对应'recommend_room'工具，该工具的输入包括'input_total_people'，从指令中可以明确提取如下参数：'input_total_people=${Global_Info.input_total_people}'`
        },
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "recommend_room",
            "parameters": {
                "conversation_id": Global_Info.UUID,
                "input_total_people": Global_Info.input_total_people,
            }
        }
    }
    return template_real
}


// 座位调整问题创建
async function ARRANGEMENT_ADJUSTMENT() {
    let areaArr = ["SVIP区", "VIP区", "普通区"]
    let adjustKeyArr = ["前后排间距", "前后间距", "左右间距", "前后排", "前后", "左右"]
    let adjustmodeArr = ["调整到1.5m", "调整到1.8m", "调整到2.0m", "调整到2.2m", "调整到0.5m", "调整到0.8m", "调整的紧凑些", "调整的宽松些"]

    let area = getRandomElement(areaArr)
    let adjustKey = getRandomElement(adjustKeyArr)
    Global_Info.adjustKey = adjustKey
    
    Global_Info.area = area
    let adjustmode = getRandomElement(adjustmodeArr)
    Global_Info.adjustmode = adjustmode
    let question = { questions: `将${area}${adjustKey}${adjustmode}`, area: area, adjustKey: adjustKey, adjustmode: adjustmode }
    return question

}


// 座位调整问题回答
async function ARRANGEMENT_ADJUSTMENT_A(ARRANGEMENT_ADJUSTMENT1, QUESTION_TYPES) {
    let area = ARRANGEMENT_ADJUSTMENT1.area
    let adjustKey = ARRANGEMENT_ADJUSTMENT1.adjustKey
    let adjustmode = ARRANGEMENT_ADJUSTMENT1.adjustmode
    let question = ARRANGEMENT_ADJUSTMENT1.questions
    let template_real = {
        "stage": QUESTION_TYPES,
        "conversation_history": [

        ],
        "user_instruction": question,
        "thought": {
            "routing_thought": `用户指令'${question}'，我需要先了解当前的排布参数，所以需要先调用'query_room_layout'工具，获取当前排布方案中的前后排间距、左右间距以及过道数量等参数。`,
            "action_thought": `该意图对应"query_room_layout"工具，该工具的输入包括房间名称参数"room_name"和conversation_id,在上文的记载中，可知，当前的房间名称为${Global_Info.room_name}，所以可以明确提取'room_name=${Global_Info.room_name}'`
        },
        "action": {
            "action_type": "TOOL_CALL",
            "tool_name": "query_room_layout",
            "parameters": {
                "conversation_id": Global_Info.UUID,
                "room_name": Global_Info.room_name
            }
        }
    }

    return template_real

}



//填充上下文历史
async function Context(Context) {
    // 参数验证和默认值

    if (!Context || !Array.isArray(Context)) {
        Context = [];
    }

    let conversation_history = [
        {
            "role": "system",
            "content": `当前的conversation_id为${Global_Info.UUID}，请在后续的对话中保持使用该conversation_id。`
        }
    ]

    // 检查数组是否为空
    if (Context.length === 0) {
        return conversation_history;
    }

    for (let i = 0; i < Context.length; i++) {
        let conversation_history_user = {
            "role": "user",
            "content": Context[i].user_instruction
        }
        let conversation_history_assistant = {
            "role": "assistant",
            "content": Context[i].action.final_answer
        }
        conversation_history.push(conversation_history_user)
        conversation_history.push(conversation_history_assistant)
    } const filteredMessages = conversation_history.filter(message => {

        if (message.role === 'user' && message.content === null) {
            return false;
        }
        if (message.role === 'assistant' && (!message.content || message.content === '')) {
            return false;
        }
        return true;
    });


    return filteredMessages
}

async function Context1(Context) {
    // 参数验证和默认值
    switch (Context.stage) {
        case "问候":
            let conversation_history_user = {
                "role": "user",
                "content": Context.user_instruction
            }
            let conversation_history_assistant = {
                "role": "assistant",
                "action": Context.action
            }
            let conversation_history_assistant_tool = {
                "role": "tool",
                "content": {
                    "Result": "您好，欢迎进入会展中心，我是智会精灵。我可以为您进行场景导览、空间排布、路径规划。请问您有什么需求？",
                }
            }
            Context.user_instruction = null
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "您好，欢迎进入会展中心，我是智会精灵。我可以为您进行场景导览、空间排布、路径规划。请问您有什么需求？"
            }
            Context.conversation_history.push(conversation_history_user)
            Context.conversation_history.push(conversation_history_assistant)
            Context.conversation_history.push(conversation_history_assistant_tool)

            break;
        case "查看房间":

            Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })
            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "Result": "已经为您跳转到" + Global_Info.room_name,
                },
                "CustomAPI": {
                    "apiClassName": "GuoHuiCameraRegister",
                    "apiFuncName": "GuoHuiCameraChangeRound",
                    "args": {
                        "floor": 4,
                        "round": [
                            [
                                -655.593244,
                                10634.255121,
                                67.735597
                            ],
                            [
                                -655.190822,
                                10623.332531,
                                67.735597
                            ],
                            [
                                -638.841915,
                                10623.934876,
                                67.735597
                            ],
                            [
                                -639.244337,
                                10634.857465,
                                67.735597
                            ]
                        ]
                    }
                },
                "'ClearArrangement'": true
            })
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "已经为您跳转到" + Global_Info.room_name
            }
            break;
        case "选房间":
            let reduce = findOptimalMeetingRoom(Global_Info.room_info, Global_Info.input_total_people)
            Global_Info.room_name = reduce[0]
            Global_Info.room_total_people = reduce[1]
            Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })
            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "Result": "为您推荐" + Global_Info.room_name + "会议室,该场馆当前容纳" + Global_Info.room_total_people + "人。已经将镜头跳转至该会议室",
                    "Detail": {
                        "id": 52,
                        "unique_id": "LI_BJ_GH_HYS_223",
                        "name": Global_Info.room_name,
                        "floor": 4,
                        "capacity": 298,
                        "outline_coord": [
                            [
                                -678.470453,
                                10523.258743,
                                67.7
                            ],
                            [
                                -677.382109,
                                10493.718785,
                                67.7
                            ],
                            [
                                -650.730192,
                                10494.700725,
                                67.7
                            ],
                            [
                                -651.818535,
                                10524.240683,
                                67.7
                            ]
                        ],
                        "direction": "south",
                        "priority_level": 0,
                        "models": [
                            {
                                "seedId": "c8bb2055726f58b5093d686f419be324",
                                "area": "stage",
                                "entityName": "舞台8",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 1,
                                "controlMode": {
                                    "number": 1,
                                    "type": "people"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    0,
                                    0
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 0,
                                "modelLeftRightSpace": 0,
                                "modelSize": [
                                    8,
                                    3
                                ],
                                "modelTopBottomSpace": 0,
                                "topBorder": 1,
                                "seats": 1
                            },
                            {
                                "seedId": "f713de21c2c97796ea73b2f8ca467bf0",
                                "area": "svip",
                                "entityName": "贵宾沙发",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 21,
                                "controlMode": {
                                    "number": 4,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    1.05,
                                    0.9
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 10.5,
                                "seats": 1
                            },
                            {
                                "seedId": "dc64fe5da597eb79a6fe8301fb0d5c1b",
                                "area": "vip",
                                "entityName": "三人桌椅组合",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 12,
                                "controlMode": {
                                    "number": 4,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    1.81,
                                    1.28
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 17.5,
                                "seats": 3
                            },
                            {
                                "seedId": "2f58a25816455f2ace5ba594e51c2006",
                                "area": "general",
                                "entityName": "带套会议椅",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 18,
                                "controlMode": {
                                    "number": 2,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    0.56,
                                    0.53
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 26.02,
                                "seats": 1
                            }
                        ]
                    },
                    "CustomAPI": {
                        "apiClassName": "GuoHuiCameraRegister",
                        "apiFuncName": "GuoHuiCameraChangeRound",
                        "args": {
                            "floor": 4,
                            "round": [
                                [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                [
                                    -677.382109,
                                    10493.718785,
                                    67.7
                                ],
                                [
                                    -650.730192,
                                    10494.700725,
                                    67.7
                                ],
                                [
                                    -651.818535,
                                    10524.240683,
                                    67.7
                                ]
                            ]
                        }
                    }
                },
                "'ClearArrangement'": true
            })
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "为您推荐" + Global_Info.room_name + "会议室,该场馆当前容纳" + Global_Info.room_total_people + "人。已经将镜头跳转至该会议室",
            }
            break;
        case "排桌":
            Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })

            
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })

            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "Result": "已经按您的要求完成排布，当前排布方案可容纳" + Math.trunc(Global_Info.input_total_people * 1.2) + "人",
                    "Detail": {
                        "id": 52,
                        "unique_id": "LI_BJ_GH_HYS_223",
                        "name": Global_Info.room_name,
                        "floor": 4,
                        "capacity": Math.trunc(Global_Info.input_total_people * 1.2),
                        "outline_coord": [
                            [
                                -678.470453,
                                10523.258743,
                                67.7
                            ],
                            [
                                -677.382109,
                                10493.718785,
                                67.7
                            ],
                            [
                                -650.730192,
                                10494.700725,
                                67.7
                            ],
                            [
                                -651.818535,
                                10524.240683,
                                67.7
                            ]
                        ],
                        "direction": "south",
                        "priority_level": 0,
                        "models": [
                            {
                                "seedId": "c8bb2055726f58b5093d686f419be324",
                                "area": "stage",
                                "entityName": "舞台8",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 1,
                                "controlMode": {
                                    "number": 1,
                                    "type": "people"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    0,
                                    0
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 0,
                                "modelLeftRightSpace": 0,
                                "modelSize": [
                                    8,
                                    3
                                ],
                                "modelTopBottomSpace": 0,
                                "topBorder": 1,
                                "seats": 1
                            },
                            {
                                "seedId": "f713de21c2c97796ea73b2f8ca467bf0",
                                "area": "svip",
                                "entityName": "贵宾沙发",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 21,
                                "controlMode": {
                                    "number": Global_Info.Sviprow,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    1.05,
                                    0.9
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 10.5,
                                "seats": 1
                            },
                            {
                                "seedId": "dc64fe5da597eb79a6fe8301fb0d5c1b",
                                "area": "vip",
                                "entityName": "三人桌椅组合",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 12,
                                "controlMode": {
                                    "number": Global_Info.Viprow,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    1.81,
                                    1.28
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 17.5,
                                "seats": 3
                            },
                            {
                                "seedId": "2f58a25816455f2ace5ba594e51c2006",
                                "area": "general",
                                "entityName": "带套会议椅",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 18,
                                "controlMode": {
                                    "number": 6,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": 0.044,
                                "modelSize": [
                                    0.56,
                                    0.53
                                ],
                                "modelTopBottomSpace": 0.6,
                                "topBorder": 26.02,
                                "seats": 1
                            }
                        ]
                    },
                    "CustomAPI": {
                        "apiClassName": "GuoHuiCameraRegister",
                        "apiFuncName": "GuoHuiCameraChangeRound",
                        "args": {
                            "floor": 4,
                            "round": [
                                [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                [
                                    -677.382109,
                                    10493.718785,
                                    67.7
                                ],
                                [
                                    -650.730192,
                                    10494.700725,
                                    67.7
                                ],
                                [
                                    -651.818535,
                                    10524.240683,
                                    67.7
                                ]
                            ]
                        }
                    }
                },
                "ClearArrangement": true
            })
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "已经按您的要求完成排布，当前排布方案可容纳" + Math.trunc(Global_Info.input_total_people * 1.2) + "人"
            }
            break;
        case "调整排桌方案":
            Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })

            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "上下文id(conversation_id)": Global_Info.conversation_id,
                    "总人数(input_total_people)": Global_Info.input_total_people,
                    "实际的房间总人数(actual_total_people)": Math.trunc(Global_Info.input_total_people * 1.2),
                    "排布类型(arrange_type)": "剧院式",
                    "房间名称(room_name)": Global_Info.room_name,
                    "svip区域配置(svip_area_info)": {
                        "area_name": "",
                        "row": 4,
                        "seat_model": "贵宾沙发",
                        "model_left_right_space": 0.044,
                        "modelTopBottomSpace": 0.6
                    },
                    "vip区域配置(vip_area_info)": {
                        "area_name": "",
                        "row": 4,
                        "seat_model": "三人桌椅组合",
                        "model_left_right_space": 0.044,
                        "modelTopBottomSpace": 0.6
                    },
                    "普通区域配置(general_area_info)": {
                        "area_name": "",
                        "row": 2,
                        "seat_model": "带套会议椅",
                        "model_left_right_space": 0.044,
                        "modelTopBottomSpace": 0.6
                    }
                },
                "ClearArrangement": true
            })

            if (Global_Info.adjustKey == "前后排间距" || Global_Info.adjustKey == "前后间距" || Global_Info.adjustKey == "前后排" || Global_Info.adjustKey == "前后") {
                if (Global_Info.adjustmode == "调整的紧凑些") {
                    if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "conversation_id": Global_Info.UUID,
                            "arrange_type": "宴会式",
                            "conversation_id": "templates_1_generalization_01_cid",
                            "general_area_info": {
                                "modelTopBottomSpace": 0.4,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "conversation_id": Global_Info.UUID,
                            "arrange_type": "宴会式",
                            "conversation_id": "templates_1_generalization_01_cid",
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.4
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "conversation_id": Global_Info.UUID,
                            "arrange_type": "宴会式",
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.4
                            }
                        }
                    }

                  }
                }
                else if(Global_Info.adjustmode == "调整的宽松些"){
                if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "conversation_id": Global_Info.UUID,
                            "arrange_type": "宴会式",
                            "general_area_info": {
                                "modelTopBottomSpace": 0.8,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "conversation_id": Global_Info.UUID,
                            "arrange_type": "宴会式",
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.8
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.8
                            }
                        }
                    }

                  }
                }
                else{
                if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0],
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0]
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0]
                            }
                        }
                    }

                  }
                }
            }
            else{
                 if (Global_Info.adjustmode == "调整的紧凑些") {
                    if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为model_left_right_space按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.0,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.044,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调小"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.044,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                }
                else if(Global_Info.adjustmode == "调整的宽松些"){
                if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.1,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.044,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.1,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求将其参数调大"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": 0.044,
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0.044,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0.1,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                }
                else{
                if(Global_Info.area == "普通区"){
                    
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是general_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "model_left_right_space": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0],
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }
                  }
                  else if(Global_Info.area == "SVIP区"){
                     Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是svip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0],
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                  else if(Global_Info.area == "VIP区"){
                    Context.thought = {
                        "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的内容，进一步分析需要调整的参数,最后调用adjust_room_layout工具计算新的参数",
                        "action_thought": "用户提到了将" + Global_Info.area + Global_Info.adjustKey + "，需要将其调整为" + Global_Info.adjustmode + "。" + Global_Info.area+"对应的参数是vip_area_info"+ Global_Info.adjustKey + "对应的参为modelTopBottomSpace按照" + Global_Info.adjustmod + "的要求调整其参数"
                    }
                    Context.action = {
                        "action_type": "TOOL_CALL",
                        "tool_name": "adjust_room_layout",
                        "parameters": {
                            "arrange_type": "宴会式",
                            "conversation_id": Global_Info.UUID,
                            "general_area_info": {
                                "modelTopBottomSpace": 0.6,
                                "seat_model": ""
                            },
                            "input_total_people": 200,
                            "room_name": "1号展览厅",
                            "svip_area_info": {
                                "model_left_right_space": 0,
                                "seat_model": "贵宾沙发",
                                "modelTopBottomSpace": 0.6
                            },
                            "vip_area_info": {
                                "modelTopBottomSpace": Global_Info.adjustmode.match(/\d+\.?\d*/g)[0],
                                "seat_model": "双人沙发",
                                "modelTopBottomSpace": 0.6
                            }
                        }
                    }

                  }
                }
            }

            Global_Info.Plan=Context.action
  

            break;      
        case "替换颜色":
             Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })
            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "Result": "已经将颜色替换为"+Global_Info.color
                },
               
                "'ClearArrangement'": true
            })
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "已经将颜色替换为"+Global_Info.color
            }

        break;
        case "视角模拟":
            Context.conversation_history.push({
                "role": "user",
                "content": Context.user_instruction
            })
            Context.user_instruction = null
            Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })
            Context.conversation_history.push({
                "role": "tool",
                "content": {
                    "Result": "已经为您显示该座位上的可视域效果"
                },
               
                "'ClearArrangement'": true
            })
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "已经为您显示该座位上的可视域效果"
            }

        break;
        }
    return Context
}


async function Context2(Context){
           Context.conversation_history.push({
                "role": "assistant",
                "action": Context.action
            })
   let conversation_history_tool={
                "role": "tool",
                "content": {
                    "Result": "已经按您的要求更新排布，当前排布方案可容纳" + Math.trunc(Global_Info.input_total_people * 1.2) + "人",
                    "Detail": {
                        "id": 52,
                        "unique_id": "LI_BJ_GH_HYS_223",
                        "name": Global_Info.room_name,
                        "floor": 4,
                        "capacity": Math.trunc(Global_Info.input_total_people * 1.2),
                        "outline_coord": [
                            [
                                -678.470453,
                                10523.258743,
                                67.7
                            ],
                            [
                                -677.382109,
                                10493.718785,
                                67.7
                            ],
                            [
                                -650.730192,
                                10494.700725,
                                67.7
                            ],
                            [
                                -651.818535,
                                10524.240683,
                                67.7
                            ]
                        ],
                        "direction": "south",
                        "priority_level": 0,
                        "models": [
                            {
                                "seedId": "c8bb2055726f58b5093d686f419be324",
                                "area": "stage",
                                "entityName": "舞台8",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 1,
                                "controlMode": {
                                    "number": 1,
                                    "type": "people"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    0,
                                    0
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 0,
                                "modelLeftRightSpace": 0,
                                "modelSize": [
                                    8,
                                    3
                                ],
                                "modelTopBottomSpace": 0,
                                "topBorder": 1,
                                "seats": 1
                            },
                            {
                                "seedId": "f713de21c2c97796ea73b2f8ca467bf0",
                                "area": "svip",
                                "entityName": "贵宾沙发",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 21,
                                "controlMode": {
                                    "number": Global_Info.Sviprow,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": Global_Info.Plan.parameters.svip_area_info.model_left_right_space,
                                "modelSize": [
                                    1.05,
                                    0.9
                                ],
                                "modelTopBottomSpace": Global_Info.Plan.parameters.svip_area_info.modelTopBottomSpace,
                                "topBorder": 10.5,
                                "seats": 1
                            },
                            {
                                "seedId": "dc64fe5da597eb79a6fe8301fb0d5c1b",
                                "area": "vip",
                                "entityName": "三人桌椅组合",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 12,
                                "controlMode": {
                                    "number": Global_Info.Viprow,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": Global_Info.Plan.parameters.vip_area_info.model_left_right_space,
                                "modelSize": [
                                    1.81,
                                    1.28
                                ],
                                "modelTopBottomSpace": Global_Info.Plan.parameters.vip_area_info.modelTopBottomSpace,
                                "topBorder": 17.5,
                                "seats": 3
                            },
                            {
                                "seedId": "2f58a25816455f2ace5ba594e51c2006",
                                "area": "general",
                                "entityName": "带套会议椅",
                                "areaAngle": -2.11,
                                "areaWidthLength": [
                                    26.67,
                                    29.56
                                ],
                                "continuousNumber": 18,
                                "controlMode": {
                                    "number": 6,
                                    "type": "row"
                                },
                                "direction": "south",
                                "leftRightBorder": [
                                    1.5,
                                    1.5
                                ],
                                "leftTopLocation": [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                "miniAisleWidth": 2,
                                "modelLeftRightSpace": Global_Info.Plan.parameters.general_area_info.model_left_right_space,
                                "modelSize": [
                                    0.56,
                                    0.53
                                ],
                                "modelTopBottomSpace": Global_Info.Plan.parameters.general_area_info.modelTopBottomSpace,
                                "topBorder": 26.02,
                                "seats": 1
                            }
                        ]
                    },
                    "CustomAPI": {
                        "apiClassName": "GuoHuiCameraRegister",
                        "apiFuncName": "GuoHuiCameraChangeRound",
                        "args": {
                            "floor": 4,
                            "round": [
                                [
                                    -678.470453,
                                    10523.258743,
                                    67.7
                                ],
                                [
                                    -677.382109,
                                    10493.718785,
                                    67.7
                                ],
                                [
                                    -650.730192,
                                    10494.700725,
                                    67.7
                                ],
                                [
                                    -651.818535,
                                    10524.240683,
                                    67.7
                                ]
                            ]
                        }
                    }
                },
                "ClearArrangement": true
            }
    Context.conversation_history.push(conversation_history_tool)
            Context.thought = {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，文本内容为content字段中的result字段的内容。"
            }
            Context.action = {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "已经按您的要求完成排布方案调整，当前排布方案可容纳" + Math.trunc(Global_Info.input_total_people * 1.2) + "人"
            }

    return Context  
}



function findOptimalMeetingRoom(rooms, requiredCapacity) {

    if (!Array.isArray(rooms) || rooms.length === 0) {
        throw new Error("会议厅数据无效");
    }

    if (typeof requiredCapacity !== 'number' || requiredCapacity <= 0) {
        throw new Error("人员需求必须是正数");
    }

    // 过滤出容量足够的会议厅
    const sufficientRooms = rooms.filter(room => room[1] >= requiredCapacity);

    if (sufficientRooms.length > 0) {
        // 使用reduce找到最接近需求的会议厅[6,7](@ref)
        return sufficientRooms.reduce((closest, current) => {
            const closestDiff = Math.abs(closest[1] - requiredCapacity);
            const currentDiff = Math.abs(current[1] - requiredCapacity);

            // 如果差值相同，选择容量较小的（更经济）
            if (currentDiff === closestDiff) {
                return current[1] < closest[1] ? current : closest;
            }

            return currentDiff < closestDiff ? current : closest;
        });
    } else {
        // 如果没有足够容量的，返回最大的会议厅[3](@ref)
        return rooms.reduce((max, current) =>
            current[1] > max[1] ? current : max
        );
    }
}


writeData()

import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url); // 当前文件的绝对路径
const __dirname = path.dirname(__filename); // 当前文件所在目录的绝对路径


import { v1 as uuidv1 } from 'uuid';

async function writeData(jsonData) {
    try {
        await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), 'utf8');
        console.log('JSON文件已成功写入:', __dirname);
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
let Question_types = [
    "总体数量统计",
    "按类型统计",
    "按楼层统计",
    "楼层+类型",
    "按人数统计",
    "按人数统计",
    "最值查询",
    "按人数查询",
    "按人数查询",
    "按人数查询",
]


async function Question(Question_type) {
    let template_real = {}
    switch (Question_type) {
        case "总体数量统计":
            template_real = await zttj()
            break;
        case "按类型统计":
            template_real = await lxtj()
            break;
        case "按楼层统计":
            template_real = await lctj()
            break;

        case "楼层+类型":
            template_real = await lclxtj()
            break;

        case "按人数统计":
            template_real = await rstj()
            break;

        case "最值查询":
            template_real = await zzcx()
            break;

        case "按人数查询":
            template_real = await rscx()
            break;
    }

    return template_real
}





async function build() {

    let Arr = []
    for (let i = 0; i < 300; i++) {

        const element = getRandomElement(Question_types)
        let template_real = await Question(element)
        Arr.push(template_real)
    }


    await writeData(Arr)
}

build()


async function zttj() {
    let UUID = uuidv1()
    let questions = ["国会有多少个厅", "国会有多少个会议室", "国会一共有多少会议室", "会议室数量", "会议室总数"]
    let question = getRandomElement(questions)

    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question}，直接匹配到'查询房间数量'意图。适合直接进行工具调用。`,
                "action_thought": "该意图对应`room_query`工具，该工具的输入是sql语句，房间数据存储在room表中，查询条件应该为'type为独立会议室或组合会议室'并统计结果数量，使用SELECT COUNT(*) FROM room WHERE type IN ('独立会议室', '组合会议室');语句查询。"
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": "SELECT COUNT(*) FROM room WHERE type IN ('独立会议室', '组合会议室');", "conversation_id": UUID }
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                        "parameters": { "query": "SELECT COUNT(*) FROM room WHERE type IN ('独立会议室', '组合会议室');", "conversation_id": UUID }
                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,
                        "Result": [79]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": "国家会议中心一共有79个会议室"
            }
        }
    ]
    return template
}

async function rstj() {
    let UUID = uuidv1()
    let hunmens = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000]
    let hunmen = getRandomElement(hunmens)
    let questions = [`可承载${hunmen}人的会议室有多少个`, `有多少个会议室可容纳${hunmen}人`, `最大可举办${hunmen}人会议的会议室有多少个`, `我要举办一场${hunmen}人会议，有多少个会议室可以满足要求`, `${hunmen}人活动，有多少个会议室可以满足要求`]
    let question = getRandomElement(questions)
    let number = Math.floor(Math.random() * 72)
    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question}，提到多少个，多少间等关键字，说明是想统计数量，而非直接获取房间名称，匹配到'查询房间数量'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应room_query工具，该工具的输入是sql语句，房间数据存储在room表中，用户需要查询房间承载人数大于${hunmen}的房间数量，在查询条件应该为'capacity大于${hunmen}'并统计结果数量，使用SELECT COUNT(*) FROM room WHERE capacity > ${hunmen};语句查询。`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": `SELECT COUNT(*) FROM room WHERE capacity > ${hunmen};`, "conversation_id": UUID }
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                        "parameters": { "query": `SELECT COUNT(*) FROM room WHERE capacity > ${hunmen};`, "conversation_id": UUID }

                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,
                        "Result": [number]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": `国家会议中心一共有${number}个会议室，可承载${hunmen}人。如果您想详细了解请说：给我推荐一个可容纳${hunmen}人会议的会议室`
            }
        }
    ]

    return template
}
async function lclxtj() {
    let UUID = uuidv1()
    let types = ["独立会议室", "组合会议室"]
    let type = getRandomElement(types)
    let floor = getRandomElement([["三楼", 3, 12], ["三层", 3, 12], ["二楼", 2, 45], ["二层", 2, 45], ["一楼", 1, 21], ["一层", 1, 21], ["地下", -2, 1], ["地下二层", -2, 1], ["负二层", -2, 1]])
    let questions = [`${floor[0]}有多少个${type}`, `${floor[0]}有多少个${type}`, `${floor[0]}一共有多少${type}`, `${floor[0]}的${type}数量`, `${floor[0]}的${type}总数`, `有多少个${type}在${floor[0]}`]
    let question = getRandomElement(questions)

    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question}，直接匹配到'查询房间数量'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应room_query工具，该工具的输入是sql语句，房间数据存储在room表中，用户需要查询${floor[0]}所有${type}的数量，在查询条件应该为'type为${type}'且'floor为${floor[1]}'并统计结果数量，使用SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('${type}');语句查询。`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": `SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('${type}');`, "conversation_id": UUID }
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                        "parameters": { "query": `SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('${type}');`, "conversation_id": UUID }

                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,
                        "Result": [floor[2]]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": `国家会议中心${floor[0]}一共有${floor[2]}个${type}`
            }
        }
    ]
    return template
}
async function lctj() {
    let UUID = uuidv1()
    let floor = getRandomElement([["三楼", 3, 12], ["三层", 3, 12], ["二楼", 2, 45], ["二层", 2, 45], ["一楼", 1, 21], ["一层", 1, 21], ["地下", -2, 1], ["地下二层", -2, 1], ["负二层", -2, 1]])
    let questions = [`${floor[0]}有多少个厅`, `${floor[0]}有多少个会议室`, `${floor[0]}一共有多少会议室`, `${floor[0]}的会议室数量`, `${floor[0]}的会议室总数`, `有多少个厅在${floor[0]}`]
    let question = getRandomElement(questions)

    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question}，直接匹配到'查询房间数量'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应room_query工具，该工具的输入是sql语句，房间数据存储在room表中，用户需要查询${floor[0]}所有房间的数量，在查询条件应该为'type为独立会议室或组合会议室'且'floor为${floor[1]}'并统计结果数量，使用SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('独立会议室', '组合会议室');语句查询。`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": `SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('独立会议室', '组合会议室');`, "conversation_id": UUID }
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                        "parameters": { "query": `SELECT COUNT(*) FROM room WHERE floor = ${floor[1]} AND type IN ('独立会议室', '组合会议室');`, "conversation_id": UUID }

                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,
                        "Result": [floor[2]]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": `国家会议中心${floor[0]}一共有${floor[2]}个会议室`
            }
        }
    ]
    return template
}
async function lxtj() {
    let UUID = uuidv1()
    let types = ["独立会议室", "组合会议室"]
    let type = getRandomElement(types)
    let number = 0
    if (type == "独立会议室") {
        number = 61
    }
    else {
        type = "组合会议室"
        number = 18
    }
    let questions = ["国会有多少个" + type, "国会一共有多少" + type, type + "会议室数量", type + "会议室总数"]
    let question = getRandomElement(questions)

    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question}，直接匹配到'查询房间数量'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'room_query'工具，该工具的输入是sql语句，房间数据存储在room表中，查询条件应该为'type为${type}'并统计结果数量，使用SELECT COUNT(*) FROM room WHERE type IN ('${type}');语句查询。`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": `SELECT COUNT(*) FROM room WHERE type IN ('${type}');`, "conversation_id": UUID }
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                        "parameters": { "query": `SELECT COUNT(*) FROM room WHERE type IN ('${type}');`, "conversation_id": UUID }

                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,

                        "Result": [number]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": `国家会议中心一共有${number}个${type}`
            }
        }
    ]
    return template
}

async function zzcx() {
    let UUID = uuidv1()
    let questions = ["最大的会议室有多少人", "最大的会议室可容纳多少人", "国会最大的会议室是哪个", "带我看看最大的会议室", "第二大的会议室是哪个", "最大的会议室是哪个", "二期最大的会议厅是哪个", "最小的会议室是哪个", "最小的会议室可容纳多少人", "带我看看最小的会议室"]
    let question = getRandomElement(questions)
    let template = {}
    if (question.includes("最大")) {
        template = [
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                ],
                "user_instruction": question,
                "thought": {
                    "routing_thought": `用户指令${question}，直接匹配到'查询房间名称'意图。适合直接进行工具调用。`,
                    "action_thought": "该意图对应`room_query`工具，该工具的输入是sql语句，房间数据存储在room表中，用户的目的是查询最大的会议室的display_name和capacity值，所以应该先用'ORDER BY capacity DESC '排序，再用'LIMIT 1'获取第一条数据记录，所以应该用 SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1;语句查询。"
                },
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "room_query",
                    "parameters": { "query": "SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1;" ,"conversation_id":UUID}
                }
            },
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                    {
                        "role": "user",
                        "content": question
                    },
                    {
                        "role": "assistant",
                        "action": {
                            "action_type": "TOOL_CALL",
                            "tool_name": "room_query",
                            "parameters": {
                                "query": "SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1;" ,"conversation_id":UUID
                            }
                        }
                    },
                    {
                        "role": "assistant",
                        "content": {
                            "conversation_id": UUID,
                            "Result": [["一号展览厅", 8550]]
                        },
                    }
                ],
                "user_instruction": null,
                "thought": {
                    "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                    "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
                },
                "action": {
                    "action_type": "DIRECT_ANSWER",
                    "final_answer": "国家会议中心最大的会议厅是一号展览厅，可容纳8550人，如果想了解会议厅的详情,可以说''看看一号展览厅''"
                }
            }
        ]
        return template
    }
    else if (question.includes("第二大")) {
        template = [
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                ],
                "user_instruction": question,
                "thought": {
                    "routing_thought": `用户指令${question}，直接匹配到'查询房间'意图。适合直接进行工具调用。`,
                    "action_thought": "该意图对应`room_query`工具，该工具的输入是sql语句，房间数据存储在room表中，用户的目的是查询排名第二的会议室的display_name和capacity值，所以应该先用'ORDER BY capacity DESC'排序，所以应该先用'ORDER BY capacity DESC '排序，再用'LIMIT 1 OFFSET 1'跳过第一条记录获取第二条记录，所以应该用 SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1 OFFSET 1;语句查询。"
                },
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "room_query",
                    "parameters": { "query": "SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1 OFFSET 1" }
                }
            },
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                    {
                        "role": "user",
                        "content": question
                    },
                    {
                        "role": "assistant",
                        "action": {
                            "action_type": "TOOL_CALL",
                            "tool_name": "room_query",
                            "parameters": { "query": "SELECT display_name, capacity FROM room ORDER BY capacity DESC LIMIT 1 OFFSET 1" ,"conversation_id":UUID}

                        }
                    },
                    {
                        "role": "assistant",
                        "content": {
                            "conversation_id": UUID,
                            "Result": [["一号展览厅", 8550]]
                        },
                    }
                ],
                "user_instruction": null,
                "thought": {
                    "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                    "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
                },
                "action": {
                    "action_type": "DIRECT_ANSWER",
                    "final_answer": "国家会议中心第二大的会议厅是一号展览厅，可容纳8550人，如果想了解会议厅的详情,可以说''看看一号展览厅''"
                }
            }
        ]
        return template
    }
    else if (question.includes("最小")) {
        template = [
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                ],
                "user_instruction": question,
                "thought": {
                    "routing_thought": `用户指令${question}，直接匹配到'查询房间'意图。适合直接进行工具调用。`,
                    "action_thought": "该意图对应`room_query`工具，该工具的输入是sql语句，房间数据存储在room表中，用户的目的是查询最小的会议室的display_name和capacity值，所以应该先用再FROM room WHERE type IN ('独立会议室', '组合会议室')获取到所有的会议室，再用'ORDER BY capacity ASC'排序，再获取第一条数据的display_name和capacity，所以应该用 SELECT display_name, capacity FROM room WHERE type IN ('独立会议室', '组合会议室') ORDER BY capacity ASC LIMIT 1;语句查询。"
                },
                "action": {
                    "action_type": "TOOL_CALL",
                    "tool_name": "room_query",
                    "parameters": { "query": "SELECT display_name, capacity FROM room WHERE type IN ('独立会议室', '组合会议室') ORDER BY capacity ASC LIMIT 1;" }
                }
            },
            {
                "conversation_history": [
                    {
                        "role": "system",
                        "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                    },
                    {
                        "role": "user",
                        "content": question
                    },
                    {
                        "role": "assistant",
                        "action": {
                            "action_type": "TOOL_CALL",
                            "tool_name": "room_query",
                            "parameters": { "query": "SELECT display_name, capacity FROM room WHERE type IN ('独立会议室', '组合会议室') ORDER BY capacity ASC LIMIT 1;" ,"conversation_id":UUID}

                        }
                    },
                    {
                        "role": "assistant",
                        "content": {
                            "conversation_id": UUID,
                            "Result": [["2层会议室268", 63]]
                        },
                    }
                ],
                "user_instruction": null,
                "thought": {
                    "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                    "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
                },
                "action": {
                    "action_type": "DIRECT_ANSWER",
                    "final_answer": "国家会议中心最小的会议厅是2层会议室268，可容纳63人，如果想了解会议厅的详情,可以说''看看2层会议室268''"
                }
            }
        ]

    }

    return template
}


async function rscx() {
    let UUID = uuidv1()
    let humens = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000]
    let humen = getRandomElement(humens)
    let questions = [`可满足${humen}人开会的房间有哪些？`, `我要开一场${humen}人会议，哪些房间可以满足？`, `${humen}人会议,给我推荐几个房间`, `我要开场发布会,${humen}个嘉宾,推荐几个房间`]
    let question = getRandomElement(questions)
    let template = [
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
            ],
            "user_instruction": question,
            "thought": {
                "routing_thought": `用户指令${question},提到'几个','哪些'这些关键字，说明需要我提供几个房间供用户选择，并不是直接推荐一个房间,匹配到'查询房间名称'意图。适合直接进行工具调用。`,
                "action_thought": `该意图对应'room_query'工具，该工具的输入是sql语句，房间数据存储在room表中，用户的目的是查询可满足${humen}人开会的房间，推荐的房间最大容量应该适中，超过${humen},但不超过${humen}的1.5倍,所以应该先用'WHERE capacity BETWEEN ${humen} AND ${humen * 1.5}'，再根据ORDER BY capacity DESC对数据进行排序推荐，所以应该用 SELECT display_name FROM room WHERE capacity BETWEEN ${humen} AND ${humen * 1.5} ORDER BY capacity DESC;语句查询。`
            },
            "action": {
                "action_type": "TOOL_CALL",
                "tool_name": "room_query",
                "parameters": { "query": `SELECT display_name FROM room WHERE capacity BETWEEN ${humen} AND ${humen * 1.5} ORDER BY capacity DESC;` ,"conversation_id":UUID}
            }
        },
        {
            "conversation_history": [
                {
                    "role": "system",
                    "content": `当前的User_ID为${UUID}，请在后续的对话中保持使用该User_ID。`
                },
                {
                    "role": "user",
                    "content": question
                },
                {
                    "role": "assistant",
                    "action": {
                        "action_type": "TOOL_CALL",
                        "tool_name": "room_query",
                            "parameters": { "query": `SELECT display_name FROM room WHERE capacity BETWEEN ${humen} AND ${humen * 1.5} ORDER BY capacity DESC;` ,"conversation_id":UUID}
                        
                    }
                },
                {
                    "role": "tool",
                    "content": {
                        "conversation_id": UUID,
                        "Result": [["C大会堂", "2层会议室268", "大会堂"]]
                    },
                }
            ],
            "user_instruction": null,
            "thought": {
                "routing_thought": "已经成功调用工具获得了回复，接下来需要解析工具返回的结构化数据，将回复返回给用户。",
                "action_thought": "现在需要将工具返回的结构化数据解析为用户可理解的文本格式。从给定的工具response结果中识别出包含有用信息的字段，再根据字段内容生成用户可理解的文本。"
            },
            "action": {
                "action_type": "DIRECT_ANSWER",
                "final_answer": `可满足${humen}开会的房间有C大会堂、2层会议室268、大会堂。如果想了解会议室详情，可说''看看C大会堂''。`
            }
        }
    ]
    return template
}






async function build() {
let actonArr = [
    "模拟",
    "转到",
    "看看",
    "看",
    "跳转",
    "进入"
]
let location1Arr = [
["第一排",1],
["第二排",2],
["第三排",3],
["第四排",4],
["第五排",5],
["倒数第一排",-1],
["倒数第二排",-2],
["倒数第三排",-3],
["倒数第四排",-4],
["倒数第五排",-5]
]

let location2Arr = [
["最左",1],
["最右",-1],
["第一个",1],
["最后一个",-1],
["中间",0.5],
["最左座位",1],
["最右座位",-1],
["第一个座位",1],
["最后一个座位",-1],
["中间座位",0.5],
]
    let Arr = []
   
    for (let i = 0; i < 100; i++) {
        let location1 = getRandomElement(location1Arr)
        let acton = getRandomElement(actonArr)
        let location2 = getRandomElement(location2Arr)
      
        
        // let conversation_id = getRandomElement(conversation_idArr)
        let template_real = {
            "user_instruction": `${acton}${location1[0]}${location2[0]}的视角。`,
            acton:acton,
            line_number:location1[0],
            seat_number:location2[0],
   
        }
             Arr.push(template_real)
    }
    
   return Arr
}


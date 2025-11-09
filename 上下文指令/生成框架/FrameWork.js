// 对话类型定义
const DIALOGUE_TYPES = {
// 问候  
GREETING: {  
    id: 1,
    templates: [
      "你好，请问有什么可以帮您？",
      "您好，欢迎咨询！",
      "很高兴为您服务，请问您需要什么帮助？"
    ]
  },
// 问题  
  QUESTION: {
    id: 2,
// 子类型定义
    subtypes: {
      PRODUCT: {  // 产品信息
        templates: [
          "我想了解关于{product}的信息",
          "能介绍一下{product}吗？",
          "{product}有什么特点？"
        ]
      },
      PRICE: {  // 价格信息
        templates: [
          "{product}的价格是多少？",
          "请问{product}要多少钱？",
          "能告诉我{product}的售价吗？"
        ]
      },
      FEATURE: {  // 功能信息
        templates: [
          "{product}的主要功能是什么？",
          "这个{product}有什么特别的功能吗？",
          "能详细说说{product}的功能吗？"
        ]
      }
    }
  },
  ANSWER: {  // 回答
    id: 3,
    subtypes: {
      PRODUCT: {  // 产品信息
        templates: [
          "{product}是我们最新的产品，具有{feature}等功能",
          "{product}是一款专注于{feature}的产品",
          "关于{product}，它主要提供{feature}服务"
        ]
      },
      PRICE: {  // 价格信息
        templates: [
          "{product}的价格是{price}元",
          "目前{product}的售价是{price}元",
          "您询问的{product}价格是{price}元"
        ]
      },
      FEATURE: {  // 功能信息
        templates: [
          "{product}的主要功能包括{feature}",
          "这款{product}的特色功能是{feature}",
          "{product}最突出的功能是{feature}"
        ]
      }
    }
  },
  FOLLOW_UP: {  // 跟进问题
    id: 4,
    templates: [ // 无子类型
      "您还有其他问题吗？",
      "关于{product}，您还想了解什么？",
      "需要我进一步解释{product}的{feature}吗？"
    ]
  },
  CLOSING: {  // 结束
    id: 5,
    templates: [
      "感谢您的咨询，再见！",
      "很高兴为您服务，祝您愉快！",
      "如果还有其他问题，随时联系我们！"
    ]
  }
};

// 对话状态管理器
class DialogueState {
  /**
   * DialogueState类的构造函数
   * 用于初始化对话状态管理相关的属性
   */
  constructor() {
    // 当前对话主题，初始为null表示尚未设置主题
    this.currentTopic = null;
    
    // 对话历史记录数组，用于存储所有对话内容
    this.dialogueHistory = [];
    
    // 可用的对话类型数组，可能用于存储系统支持的对话类型选项
    this.availableTypes = [];
    
    // 产品数据数组，包含系统支持的产品信息
    // 每个产品包含名称、特性数组和价格三个属性
    this.productData = [
      { name: "手机", features: ["高清摄像头", "长续航电池", "5G网络"], price: 2999 },
      { name: "笔记本电脑", features: ["高性能CPU", "轻薄设计", "长续航"], price: 5999 },
      { name: "智能手表", features: ["健康监测", "运动追踪", "消息提醒"], price: 999 }
    ];
  }

  // 获取随机产品数据
  getRandomProduct() {
  // 从产品数据数组中随机选择一个产品并返回
    return this.productData[Math.floor(Math.random() * this.productData.length)];
  }

  // 获取下一个对话类型
getNextType() {
    // 如果对话历史为空，返回问候类型
    if (this.dialogueHistory.length === 0) {
      return DIALOGUE_TYPES.GREETING;
    }
    // 获取对话历史中最后一个对话的类型ID
    const lastType = this.dialogueHistory[this.dialogueHistory.length - 1].type;
    // 根据最后一个对话类型决定下一个对话类型
    switch (lastType.id) {
      case DIALOGUE_TYPES.GREETING.id:
        return DIALOGUE_TYPES.QUESTION;
      case DIALOGUE_TYPES.QUESTION.id:
        return DIALOGUE_TYPES.ANSWER;
      case DIALOGUE_TYPES.ANSWER.id:
        return Math.random() > 0.3 ? DIALOGUE_TYPES.FOLLOW_UP : DIALOGUE_TYPES.CLOSING;
      case DIALOGUE_TYPES.FOLLOW_UP.id:
        return Math.random() > 0.5 ? DIALOGUE_TYPES.QUESTION : DIALOGUE_TYPES.CLOSING;
      default:
        return null;
    }
  }

  // 获取随机模板
  getRandomTemplate(type) {
    if (type.subtypes) {
      const subtypeKeys = Object.keys(type.subtypes);
      const randomSubtypeKey = subtypeKeys[Math.floor(Math.random() * subtypeKeys.length)];
      const templates = type.subtypes[randomSubtypeKey].templates;
      return {
        template: templates[Math.floor(Math.random() * templates.length)],
        subtype: randomSubtypeKey
      };
    } else {
      return {
        template: type.templates[Math.floor(Math.random() * type.templates.length)],
        subtype: null
      };
    }
  }

  // 生成对话
  generateDialogue() {
    const type = this.getNextType();
    if (!type) return null;

    const { template, subtype } = this.getRandomTemplate(type);
    const product = this.currentTopic || this.getRandomProduct();
    this.currentTopic = product;

    let filledTemplate = template;
    if (subtype) {
      switch (subtype) {
        case 'PRODUCT':
          filledTemplate = filledTemplate.replace('{product}', product.name);
          break;
        case 'PRICE':
          filledTemplate = filledTemplate.replace('{product}', product.name)
            .replace('{price}', product.price);
          break;
        case 'FEATURE':
          filledTemplate = filledTemplate.replace('{product}', product.name)
            .replace('{feature}', product.features.join(', '));
          break;
      }
    }

    const dialogue = {
      type: type,
      subtype: subtype,
      text: filledTemplate,
      timestamp: new Date().toISOString()
    };

    this.dialogueHistory.push(dialogue);
    return dialogue;
  }

  // 生成完整对话流
  generateDialogueFlow(count = 10) {
    const dialogues = [];
    for (let i = 0; i < count; i++) {
      const dialogue = this.generateDialogue();
      if (!dialogue) break;
      dialogues.push(dialogue);
    }
    return dialogues;
  }
}

// 使用示例
const generator = new DialogueState();
const dialogueFlow = generator.generateDialogueFlow(8);

// 输出对话流
console.log("Generated Dialogue Flow:");
dialogueFlow.forEach((dialogue, index) => {
  console.log(`${index + 1}. [${dialogue.type.id}] ${dialogue.text}`);
});
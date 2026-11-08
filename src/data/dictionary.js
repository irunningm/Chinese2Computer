// 02 · 概念词典：用《现代汉语》《文学理论》与写论文日常，对照理解软件工程常用概念
// 类比用于入门；每条含「像在哪 / 不像在哪」与练习失败模式。

export const DICTIONARY_CATEGORIES = [
  {
    id: 'all',
    name: '全部词条',
    sub: '共 16 个核心概念'
  },
  {
    id: 'linguistics',
    name: '现代汉语·语法篇',
    sub: '主谓宾 · 复句 · 改病句 · 语境'
  },
  {
    id: 'composition',
    name: '文学理论·结构篇',
    sub: '内容与形式 · 提纲 · 分段 · 模板'
  },
  {
    id: 'bibliography',
    name: '论文写作·改稿篇',
    sub: '文件夹 · 版本存档 · 引用 · 删繁'
  },
  {
    id: 'rhetoric',
    name: 'AI 沟通·审稿篇',
    sub: '体例规范 · 填表格 · 注释 · 验收'
  }
];

/**
 * 词典模块可跑通迷你任务：真实人文任务 + 可复制提示词 + 人/AI 分工 + 失败模式
 */
export const DICTIONARY_MINI_TASK = {
  id: 'zhufu-notes-json',
  badge: '试一试 · 词典配套迷你任务',
  title: '把一篇《祝福》读书笔记，整理成可筛选的四字段卡片',
  why:
    '练的是「内容与形式分离 + 填标准表（JSON）+ 主编审稿三问」。不要求你会写代码，只要会核对字段、验收页面。',
  scenario:
    '你手头有一段《祝福》课堂笔记（散文体）。今晚要做成手机上能翻、能按「人物 / 主题」筛选的小卡片页，给读书分享会用。',
  sampleNotes: `祥林嫂两次来鲁镇帮工，第二次头发花白、眼神呆滞。鲁迅用「雪」「庙」等意象写礼教吃人。读后感：同情之外更怕众人的看客心理。可引用《祝福》里「我」的旁观与逃避。`,
  schemaFields: [
    { key: 'title', label: '卡片标题（短）' },
    { key: 'figure', label: '相关人物' },
    { key: 'theme', label: '主题标签（1–2 个）' },
    { key: 'note', label: '笔记要点（一两句）' }
  ],
  copyablePrompt: `我在整理鲁迅《祝福》的课堂读书笔记，准备做成可筛选的笔记卡片页。

请先【不要写网页代码】，只把下面这段散文笔记整理成 JSON 数组。每条必须且只能包含这 4 个字段：
- "title": 短标题
- "figure": 相关人物（如「祥林嫂」「鲁四老爷」「‘我’」）
- "theme": 主题标签数组（从「礼教」「看客」「同情与恐惧」「旁观」里选，也可自拟短标签）
- "note": 一两句要点，保留原意，不要扩写成赏析长文

原文笔记：
"""
祥林嫂两次来鲁镇帮工，第二次头发花白、眼神呆滞。鲁迅用「雪」「庙」等意象写礼教吃人。读后感：同情之外更怕众人的看客心理。可引用《祝福》里「我」的旁观与逃避。
"""

请拆成 3–5 条卡片。输出纯 JSON，字段名用英文，字段值用中文。`,
  youDo: [
    '核对每条是否真有 title / figure / theme / note 四字段，有无编造原文没有的情节。',
    '主题标签是否过宽（比如把所有条都标成「鲁迅」）——过宽就失去筛选意义。',
    'JSON 定稿后，再让 AI 生成卡片页；用「搜不到 / 字太长 / 手机点得到吗」三问验收。'
  ],
  aiDoes: [
    '把散文笔记拆成统一字段的 JSON（你可要求它先出 3 条样例供你改）。',
    '在你点头后，用该 JSON 生成简单卡片列表 + 按 theme / figure 筛选。'
  ],
  failureModes: [
    '一上来就说「帮我做个《祝福》网站」→ 常得到混杂排版、字段不齐、难改字的一锅粥代码。',
    '不核对就让 AI 扩写赏析 → 卡片变成作文，筛选键失效。',
    '把「主题」写成整段感想 → 无法当筛选标签用。'
  ],
  relatedEntryIds: ['content-vs-form', 'prosody-json', 'outline-prd', 'chief-editor-review']
};

export const DICTIONARY_ENTRIES = [
  // ==================== 一、现代汉语·语法篇 ====================
  {
    id: 'parts-of-speech',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    chineseFamiliarity: '高中接触，大学加深',
    literaryTerm: '主谓宾定状补（句子成分）',
    classicQuote: '黄伯荣、廖序东《现代汉语》：“主语、谓语、宾语是句子的主干；定语、状语、补语是枝叶。”',
    engTerm: '数据对象 · 函数 · 参数（入门对照，不是类型系统）',
    engKeywords: ['Object', 'Function', 'Property', 'Arguments'],
    uniRecall:
      '大学《现代汉语》讲句子成分，是把一句话拆成主干（主谓宾）和枝叶（定状补），用来分析结构、改病句——不是教你背术语炫技。高中语文改病句、划分成分已经碰过；黄廖本把它讲成系统方法，所以很多人毕业后又忘了，完全正常。',
    epiphany:
      '入门时可以这样记：句子里的「事物名词」常对照程序里要操作的数据；「动作动词」常对照一次操作；修饰语帮你把要求说清楚。这是教学梯子，不是语法等于编程。',
    analogyFits:
      '适合用来想清楚「项目里有哪些事物、能对它们做什么、做的时候有哪些限制条件」——跟列主谓宾提纲很像。',
    analogyBreaks:
      '主谓宾 ≠ 编程语言的类型系统；状语 ≠ 函数的全部参数；定语/补语也没有一对一的代码零件。别把成分表当成 API 说明书。',
    litPerspective:
      '例：「（热心的）图书管理员【快速地】借出了《活着》。」「管理员」「《活着》」是主干上的事物，「借出」是核心动作，「热心的」「快速地」分别限制事物与动作。分析成分，是为了看清谁对谁做了什么。',
    engPerspective:
      '写小工具时，也常先问：有哪些数据（读者、书）、能做什么操作（借出、收藏）、操作时要带哪些说明（按分类、是否已登录）。用成分分析法帮自己把需求说完整；真正落成代码时，名称和结构由语言与框架决定，不必强行一一对应。',
    visualCompare: {
      litTitle: '现代汉语句子成分划分（复习）',
      litCode: `【主干事物】读者、书《活着》\n【修饰事物】已登录的读者\n【核心动作】收藏\n【限制动作】按分类收藏（分类=小说）`,
      engTitle: '需求说清楚后的一种写法（示例）',
      engCode: `const reader = { name: "小林", isLoggedIn: true };\nconst book = { title: "活着" };\n\n// 操作 + 必要说明（参数）\ncollectBook(reader, book, { category: "小说" });`
    },
    youDo: '先列出核心「事物」和「动作」，并标出容易歧义的修饰语（谁的？按什么标准？）。',
    aiDoes: '按你列清的主干生成模块骨架；你再核对名称与边界是否被擅自扩展。',
    practiceFails:
      '只丢一句「做个读书网站」就开工 → AI 乱造实体；或把「状语」幻想成必须写成某种参数语法 → 提示词反而更绕。',
    aiAction:
      '向 AI 提需求前，先用成分法自检主干：项目里有哪些【核心事物】（文章、作者、评论），用户能做哪些【核心动作】（搜索、筛选、导出），以及动作的限制条件。说完再请它提案，先不要直接写长代码。'
  },
  {
    id: 'compound-sentences',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '关联词与复句（如果…就… / 每当…都…）',
    classicQuote: '《现代汉语》：“复句由两个或两个以上意义上相关、结构上互不包含的分句加上关联词语组成。”',
    engTerm: '条件分支 (if / else) · 列表逐项处理（循环 / map）',
    engKeywords: ['if / else', 'for loop', 'Array.map', 'Control Flow'],
    uniRecall:
      '高中语文就大量练关联词与复句逻辑（假设、条件、并列、转折）。大学《现代汉语》会更细地区分分句关系。日常写作里你其实一直在用，只是不一定叫出名称。',
    epiphany:
      '「如果……就……否则……」很适合描述界面上的岔路；「对每一本都……」很适合描述对列表逐项处理。排比修辞可以启发「批量同结构」，但不等同于某一种循环写法。',
    analogyFits:
      '适合把交互规则写成严谨复句，减少「到时候再说」式的含糊需求。',
    analogyBreaks:
      '排比句 ≈ map 容易过满：map 只是「对数组每一项变换」的一种常见写法；还有 for、过滤、查找等。if/else 与循环应分条说，不要揉成「关联词=算法」。',
    litPerspective:
      '假设条件：「如果明天不下雨，我们就去踏青，否则就待在图书馆。」批量同做：「把书架上的每一本书，都贴上分类标签。」两句都是把逻辑关系说清楚。',
    engPerspective:
      '日常小工具里，大量逻辑就是：按条件走不同分支；或对列表逐项生成卡片、改字段。第一次听「算法」觉得很远时，可以从这两类汉语复句想起——它们是入门对照，不是全部控制流。',
    visualCompare: {
      litTitle: '汉语复句逻辑',
      litCode: `1. 【假设复句】：如果搜索框为空，就提示“请输入关键词”；否则开始检索。\n2. 【逐项同做】：对书单里的每一本书，都生成一张带书名和作者的卡片。`,
      engTitle: '条件分支与列表处理（示例）',
      engCode: `if (keyword === "") {\n  alert("请输入关键词");\n} else {\n  searchBooks(keyword);\n}\n\nbooks.map(book => <Card title={book.title} />);`
    },
    youDo: '把规则写成「如果 A 则 B，否则 C」；批量需求单独写成「对每一项做同一件事」。',
    aiDoes: '按你的复句实现分支与列表渲染；你负责指出遗漏的否则分支。',
    practiceFails:
      '只说「智能一点」→ AI 乱加分支；或把排比、递进、转折全塞进一句「用 map 写」→ 结构错位。',
    aiAction:
      '描述交互时，优先用严谨复句：「如果用户搜索不到结果，就显示‘暂无匹配文章’并提供重置；否则正常显示列表。」批量生成卡片时另起一句，不要和条件句混在同一句里。'
  },
  {
    id: 'syntax-vs-semantics',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '改病句：标点错字 vs 逻辑歧义',
    classicQuote: '吕叔湘《语法修辞讲话》：“一句话语法结构没毛病，但事理不通或有歧义，同样是病句。”',
    engTerm: '语法报错 (Syntax Error) vs 业务逻辑错 (Logic Bug)',
    engKeywords: ['Syntax Error', 'Type Error', 'Logic Bug', 'Ambiguity'],
    uniRecall:
      '高中改病句已分「结构不通」和「意思歧义」。大学语言学、修辞课会强调：通顺不等于达意。这套眼光，正好用来检查给 AI 的说明书。',
    epiphany:
      '少写半边括号，程序往往直接报错停住；「咬死了猎人的狗」这类通顺但歧义的句子，更像「跑得动但结果不对」的逻辑问题。',
    analogyFits:
      '适合提醒自己：别只盯着「有没有报错」，更要盯「意思有没有跑偏」。',
    analogyBreaks:
      '语文病句类型远多于这两种；代码错误也不止语法/逻辑二分。它是检查清单，不是错误分类学。',
    litPerspective:
      '硬伤：书名号只写一半，编辑一眼能见。歧义：「三个学校的老师来开会」——三所学校还是三位老师？字面未必红线，读者却可能理解全歪。',
    engPerspective:
      'AI 很少「少写半边括号」；更常见的是提示词有歧义，于是写出语法正确、效果却不是你想要的结果。消除歧义，是你的主责。',
    visualCompare: {
      litTitle: '两种病句对比',
      litCode: `[语法硬伤]：“余华写下了《活着”（缺右书名号）\n[逻辑歧义]：“请按时间排序”（作家出生时间还是出版时间？升序还是降序？）`,
      engTitle: '两种代码问题对比',
      engCode: `// 语法问题：少了右括号，常直接无法运行\nconsole.log("活着";\n\n// 逻辑问题：能运行，但把“最新在前”写成了“最旧在前”\nbooks.sort((a, b) => a.year - b.year);`
    },
    youDo: '检查提示词里的排序、筛选、删除、好看——补齐标准与方向。',
    aiDoes: '按你补全后的约束实现；你用具体例子验收「有没有歧义落地」。',
    practiceFails:
      '只说「修一下」或「好看一点」→ AI 猜偏好；验收时只看「没红字」就放行 → 漏掉逻辑跑偏。',
    aiAction:
      '像做消除歧义练习一样检查发给 AI 的话：凡说到排序、筛选、删除，补齐定语和状语（例如「按出版年份从新到旧」），少留猜谜空间。'
  },
  {
    id: 'context-scope',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    chineseFamiliarity: '大学系统讲',
    literaryTerm: '语境（上下文）与一词多义',
    classicQuote: '陈望道《修辞学发凡》：“离开具体的语境，便无从断定辞语的恰当与否。”',
    engTerm: '变量作用域 · AI 对话记忆窗口（两件事，勿并成一件）',
    engKeywords: ['Local Scope', 'Global Scope', 'Context Window'],
    uniRecall:
      '「语境」在高中阅读里常点到；大学现代汉语、修辞学、语用学会系统讲：同一词语在不同场合意义不同，解释必须回到上下文。一词多义、语域、上下文制约，是文科基本功。',
    epiphany:
      '篇章里「这段话只管这一章」的局部意思，可帮助理解程序里「这个名字只在这一段代码有效」。另有一件常被顺口并联的事：跟 AI 聊太久，早先要求可能被挤掉——那是对话记忆容量问题，不是语言学语境本身。',
    analogyFits:
      '「局部语境互不干扰」↔「局部变量互不污染」——用来理解命名冲突、章节设定，很顺。',
    analogyBreaks:
      '变量作用域 ≠ AI 的 context window。前者是代码里名字的可见范围；后者是模型一次能装进提示里的文本量。教学可并列，必须分开标注。',
    litPerspective:
      '「这书真行」可赞可讽，取决于场合；第一章「老王」与第二章「老王」也可能不是同一人。解释词语，先回到它所在的段落与章节。',
    engPerspective:
      '代码里，函数内部的名字通常只在函数内有效，避免同名互相踩踏。跟 AI 协作时另算一笔账：对话变长、附件变多，早先的约束可能被挤出有效提示——这时该压缩重述或新开对话，而不是说「作用域坏了」。',
    visualCompare: {
      litTitle: '篇章语境边界',
      litCode: `【全书通用简称】本社 = 人民文学出版社\n【第一回内部】本村 = 绍兴鲁镇\n【第二回内部】本村 = 湘西茶峒\n（另事）跟助手聊太杂时，要把关键要求重新写清楚——那是记忆容量，不是「本村」改了含义`,
      engTitle: '作用域示例（与 AI 窗口分开理解）',
      engCode: `const publisher = "人民文学出版社"; // 较大范围可用\n\nfunction chapterOne() {\n  const village = "鲁镇"; // 仅此函数内\n}\nfunction chapterTwo() {\n  const village = "茶峒"; // 与上一函数互不冲突\n}\n// AI 对话窗口：另题——过长时请重述约束或新开对话`
    },
    youDo: '改新功能前，决定：沿用旧对话并重贴关键约束，还是新开对话只带当前文件。',
    aiDoes: '在你给定的当前材料里修改；你负责防止旧对话里的过期要求继续生效。',
    practiceFails:
      '把三件事（篇章语境、变量作用域、AI 窗口）混成一句「注意上下文」→ 既改不对代码命名，也清不掉过期聊天约束。',
    aiAction:
      '功能切换大时，优先新开对话，只附当前要改的一两个文件，并重述仍有效的约束。需要沿用旧对话时，把「仍然必须遵守」的几点重新写在最新一条消息里。'
  },

  // ==================== 二、文学理论·结构篇 ====================
  {
    id: 'content-vs-form',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    chineseFamiliarity: '大学系统讲',
    literaryTerm: '内容（故事素材）与形式（体裁排版）',
    classicQuote: '童庆炳《文学理论教程》：“文学作品是内容与形式的统一体，同一题材可表现为不同体裁形式。”',
    engTerm: '数据与界面分离（Data vs View）',
    engKeywords: ['Separation of Concerns', 'Data vs View', 'JSON'],
    uniRecall:
      '文学概论课讲「内容与形式」：题材、主题、人物等与体裁、结构、语言形式相互依存，但分析时可分开看——同一故事可入小说、剧本或改编为不同版式。高中语文偶尔提，大学《文学理论》才系统展开。',
    epiphany:
      '做小站时，尽量让「文字资料」和「页面排版」分开放：改错别字少碰排版；换皮肤少弄丢文章。这是常用约定，不是宇宙铁律。',
    analogyFits:
      '同一份《祝福》文本，可横排课本、可竖排线装、可改剧本——很适合理解「资料一份、皮肤多套」。',
    analogyBreaks:
      '文学理论里内容/形式辩证统一，并非文件目录二分；工程上的「数据/视图」也还有状态、样式、接口等层。别把童庆炳讲成文件夹教条。',
    litPerspective:
      '故事文本与它「穿什么衣服」可以分开打磨：先稳住文本与史料，再谈版式与演出形式，改起来不易两头乱。',
    engPerspective:
      '常见翻车是把大段文章直接写进排版标签里。更稳妥的约定是：文案与条目放在数据文件，界面负责呈现。小练习站尤其受益；大型系统还会再拆，不必一次学完。',
    visualCompare: {
      litTitle: '内容与形式：混杂 vs 分离',
      litCode: `[混杂]：边写故事边调字号颜色，改主角名要翻遍排版框。\n[分离]：一份纯文字人物资料 + 一套独立排版模板。`,
      engTitle: '数据文件与界面分开（示例）',
      engCode: `// src/data/books.js —— 主要放文字资料\nexport const BOOKS = [{ title: "活着", author: "余华" }];\n\n// 界面文件负责怎么呈现\nimport { BOOKS } from './data/books.js';`
    },
    youDo: '开工前约定：哪些是你要长期手改的文字；改字应发生在数据文件，而不是在大段界面代码里找。',
    aiDoes: '按约定把资料与界面拆开；你抽查是否仍有大段文案被写死在组件里。',
    practiceFails:
      '项目已混杂却强行「全面拆分」→ 易大面积弄坏；或分离后字段名混乱 → 界面取不到字。',
    aiAction:
      '开工时可先约定：“文章、词条、配置文案尽量放在 `src/data/`，避免把大段文字写死在界面代码里。若与现有结构冲突，先说明再改。”'
  },
  {
    id: 'outline-prd',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '动笔前列「写作提纲」（总-分-总）',
    classicQuote: '老舍《谈叙述与描写》：“在动笔以前，必须有通盘的计划，先立好主脑与间架。”',
    engTerm: '需求提纲（PRD / Spec）——先写清要做什么',
    engKeywords: ['PRD', 'Spec', 'Requirements'],
    uniRecall:
      '高中作文、大学学年论文都强调先列提纲：中心是什么、分几部分、每部分要点、哪些不写。这是写作学常识，不必神秘化。工程里的「需求说明」借用的就是这口气——先对齐要做什么，再谈怎么实现。',
    epiphany:
      '论文不列提纲容易跑题；请 AI 写功能前，先让它（和你一起）列出页面与字段提纲，返工会少很多。提纲仍可能含糊，所以你必须审，不能只看它「像一份大纲」。',
    analogyFits:
      '「章节—要点—边界（本次不写）」对照「页面—字段—非目标」，非常适合文科生主持讨论。',
    analogyBreaks:
      '提纲主要对齐需求与信息结构；不等于系统架构设计（模块如何分层、如何部署）。把 eng 称作「PRD 与架构」容易偷换：本条先稳住需求提纲即可。',
    litPerspective:
      '好提纲写清：论题、章节要点、材料范围、本次不展开的部分。导师先审提纲，再允许你埋头写，就是为了少推倒重来。',
    engPerspective:
      '只说「帮我做个读书网站」时，双方对「有几页、卡片有哪些字段、点按钮后怎样」可能完全不是同一幅图。先产出一页简明需求提纲，你点头后再写代码，更像论文流程。',
    visualCompare: {
      litTitle: '学年论文三级提纲',
      litCode: `一、核心论题：鲁迅杂文的修辞特征\n二、章节：1.反语 2.白描 3.曲笔\n三、边界：仅讨论《呐喊》《彷徨》与杂文，暂不涉及古籍校勘`,
      engTitle: '发给 AI 的需求提纲（先对齐，再写代码）',
      engCode: `# 需求提纲\n1. 目标：现代作家读书笔记卡片站（优先手机）\n2. 模块：搜索 + 分类标签 + 卡片列表 + 详情\n3. 本次不做：账号注册登录`
    },
    youDo: '审提纲：字段是否可核对？「本次不做」写了没有？有没有空话（「优雅」「完善」）？',
    aiDoes: '先出提纲与目录建议；得你确认后再实现。',
    practiceFails:
      '提纲仍含糊（「做好看点」）就批准写码；或 AI 交出假提纲（章节空洞、字段随意）你未打回 → 后面会大改。',
    aiAction:
      '两步走：先说“请先不要写代码，帮我梳理功能模块、数据字段与目录规划”；你审完点头后，再请它按提纲实现。'
  },
  {
    id: 'paragraph-modularity',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '分段原则：「一段只讲一层意思」',
    classicQuote: '叶圣陶《作文论》：“分段之要，在于一意一断，脉络分明，不相杂糅。”',
    engTerm: '文件/模块拆分（先做到各管一段）',
    engKeywords: ['Modularity', 'Separation', 'Single Responsibility'],
    uniRecall:
      '中学作文课就强调分段：一段一意，不相杂糅。叶圣陶说得更清楚。大学写作课会继续练。把它对照「一个文件别什么都塞」，比一上来背「高内聚低耦合 / SRP」更贴你的经验。',
    epiphany:
      '改第三章配图却弄乱第一章，说明绑太死；把不同职责拆开，修改更安全。先追求「各管一段」，再学课本上的内聚/耦合术语。',
    analogyFits:
      '「一意一断」↔「一个小文件做好一类事」——改搜索不必翻卡片文件，很直观。',
    analogyBreaks:
      '分段是阅读与表达单位；「高内聚低耦合」还涉及依赖方向、接口稳定性等，远比分段标准复杂。别把 SRP 说成作文分段的英文翻译。',
    litPerspective:
      '把作者生平、销量、读后感搅在同一段，删一句就全段接不上。独立成段、成节，是为了让修改局部化。',
    engPerspective:
      '小项目里，把搜索、卡片、数据分开放，已经能躲开很多「改一处坏三处」。等你真的被互相牵连折磨到了，再补「依赖关系」也不迟。',
    visualCompare: {
      litTitle: '一锅粥长文 vs 独立章节',
      litCode: `[一锅粥]：万字挤在一块，牵一发而动全身。\n[分段/分章]：正文与附录分开，改附录不动正文。`,
      engTitle: '按职责拆文件（示例）',
      engCode: `src/\n  ├── data/notes.js\n  ├── components/Header.js\n  ├── components/Card.js\n  └── utils/search.js`
    },
    youDo: '发现单文件过长、职责混杂时，指出「哪一段文字/功能应独立」。',
    aiDoes: '按你的边界拆文件；你确认导入关系没断。',
    practiceFails:
      '为拆而拆成几十个碎片文件 → 更难找；或口头喊 SRP 却不说明拆分边界 → AI 乱拆。',
    aiAction:
      '若单个文件已经又长又杂，可以说：“请按‘一段一事’把数据和不同界面零件拆到小文件，并说明每个文件负责什么；先给出拆分方案再改。”'
  },
  {
    id: 'cipai-components',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    chineseFamiliarity: '高中接触，大学加深',
    literaryTerm: '填空模板与词牌格律（《浣溪沙》定格）',
    classicQuote: '王力《诗词格律》：“词有定格，字有定数，韵有定声；词人依谱填词，体式一而意境百出。”',
    engTerm: '可复用界面模板（组件）与填入项（Props）',
    engKeywords: ['Component', 'Props', 'Template', 'Reusable UI'],
    uniRecall:
      '高中学词牌，多记「哪首词什么调」；大学古代文学、诗词格律课会讲「依谱填词」：格律是空槽，意境是填入内容。这套「模板 + 填空」经验，正好迁移到卡片列表。',
    epiphany:
      '五十张作家卡，通常不是复制五十遍排版，而是先做一个填空模板，再把每人的资料填进去。',
    analogyFits:
      '词牌定格 ↔ 卡片槽位（姓名、年代、名言）；不同作家像不同词作，套同一谱。',
    analogyBreaks:
      '词牌有声律与文学史约束；UI 组件还有状态、事件、无障碍等，不是「格律」二字能盖住。',
    litPerspective:
      '《西江月》的句式与韵位相对固定；苏轼、辛弃疾填入不同内容，谱式复用而意境各异。',
    engPerspective:
      '做一个作家卡片模板，约定名字、年代、代表作放哪；再传入不同资料即可批量生成。改圆角、字号，往往只改模板一处。',
    visualCompare: {
      litTitle: '填空模板与不同内容',
      litCode: `【卡片模板】：姓名：{name} ｜ 年代：{era} ｜ 名言：“{quote}”\n  ├── 鲁迅 ｜ 现代 ｜ “其实地上本没有路”\n  └── 汪曾祺 ｜ 当代 ｜ “四方食事，不过一碗人间烟火”`,
      engTitle: '定义一次模板，传入不同资料',
      engCode: `function WriterCard({ name, era, quote }) {\n  return <div className="card"><h3>{name} ({era})</h3><p>{quote}</p></div>;\n}\n<WriterCard name="鲁迅" era="现代" quote="其实地上本没有路" />`
    },
    youDo: '先规定卡片有哪些固定栏；抽查批量结果是否栏位一致。',
    aiDoes: '实现可复用模板并循环填入数据。',
    practiceFails:
      '先让 AI「做四张好看的卡」→ 常得到四份复制粘贴；以后改样式要改四处。',
    aiAction:
      '需要统一改所有卡片外观时，指明改公共卡片模板（组件）那一处，并确认列表是「循环填入」而不是复制多份。'
  },

  // ==================== 三、论文写作·改稿篇 ====================
  {
    id: 'cataloging-tree',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '电脑里的「毕业论文文件夹分类整理」',
    classicQuote: '张之洞《輶轩语》：“治学之要，先明门径；门径既清，检阅自易。”',
    engTerm: '项目文件夹结构（Directory Tree）',
    engKeywords: ['Directory Tree', 'package.json', 'index.html', 'src/'],
    uniRecall:
      '从中学研究性学习到大学论文，大家都在建文件夹：开题、文献、正文、答辩材料分开放。这不是工程专利，是治学门径。打开代码项目时，先找「门径」即可。',
    epiphany:
      '代码项目也可以先当「整理好的论文文件夹」看：入口页、资料夹、样式夹——先认柜子，再谈细节。',
    analogyFits:
      '「改字去资料夹 / 改版式去样式夹」的直觉，迁移成本很低。',
    analogyBreaks:
      '文件夹树 ≠ 网站路由（Routing）。路由是「地址对应哪一页」；目录是磁盘上的文件怎么放。本条只讲目录，不把路由混进标题。',
    litPerspective:
      '条理清楚的论文夹常有：开题与大纲、参考文献、正文各章、答辩材料。要改哪块，先找到对应抽屉。',
    engPerspective:
      '第一次打开陌生项目时，英文文件名可能让人发懵——暂停，先认几处常见位置：项目说明、网页入口、`src/data` 文字资料、`src/styles` 样式。认门径比背全称重要。',
    visualCompare: {
      litTitle: '毕业论文文件夹结构',
      litCode: `我的毕业论文/\n ├── 论文总说明与目录.docx\n ├── 01_原始文献与摘录数据/\n ├── 02_正文各章节模块/\n └── 03_排版字体与配色模板/`,
      engTitle: '常见前端小项目目录（示例）',
      engCode: `my-project/\n ├── package.json        // 项目说明与启动相关信息\n ├── index.html          // 网页入口\n └── src/\n      ├── data/          // 文字资料（常亲手改字）\n      ├── components/    // 页面零件\n      └── styles/        // 颜色、字体、间距`
    },
    youDo: '先问清：只改字去哪；只改颜色去哪；入口文件是哪一个。',
    aiDoes: '画出目录树并用大白话标注「改字/改样式」位置。',
    practiceFails:
      '把路由、构建工具、依赖包一口气全问 → 信息过载；或改字却去改打包配置。',
    aiAction:
      '打开新项目时先问：“请画出当前文件夹树，并用大白话告诉我：如果我只想改页面上的文字，应该去哪个文件？”'
  },
  {
    id: 'textual-criticism-git',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    chineseFamiliarity: '高中接触，大学加深',
    literaryTerm: '论文初稿、导师批注稿与「撤回上一步」',
    classicQuote: '胡适《治学方法》：“步步留痕，随时比勘，方知何处增删得宜。”',
    engTerm: 'Git 版本存档（commit / diff / 回退）',
    engKeywords: ['git commit', 'git diff', 'git branch', 'Rollback'],
    uniRecall:
      '论文写作都怕误删与版本混乱；Word 修订、文件另存「终稿」是大家的土办法。文献学、校勘强调「步步留痕」。Git 把「留痕、对比、回退」做成更稳的习惯。',
    epiphany:
      '不必再靠「最终最终版.docx」命名术：存档点 + 对比改动 + 不满意就回退，更接近审阅修订的思路。',
    analogyFits:
      '修订模式里的删/增对照，很像查看一次改动前后的差别。',
    analogyBreaks:
      'Git 还有分支协作、合并冲突等，远比「撤回上一步」复杂；本条只取「存档—对比—回退」三件事入门。',
    litPerspective:
      '怕误删佳句，怕合作者改了哪句看不清——所以需要历史与对比，而不是只靠记忆。',
    engPerspective:
      'AI 改代码也可能改出新问题。小功能完成就存一次档；改完先看差异；不满意再回退。这是安全绳，不是额外学问炫耀。',
    visualCompare: {
      litTitle: 'Word 审阅修订对照',
      litCode: `【原句】鲁迅于 1918 年发表了《狂人日记》。\n【修订】\n  - 删：……《阿Q正传》。\n  + 订：……《狂人日记》。`,
      engTitle: '改动对比（示意）',
      engCode: `- const firstWork = "阿Q正传";\n+ const firstWork = "狂人日记";`
    },
    youDo: '大改前要求先存档；改后先看差异再决定是否接受。',
    aiDoes: '协助 commit、展示 diff、按你的指示回退；不替你隐瞒改动范围。',
    practiceFails:
      '从不存档就连续大改 → 坏了难以回退；或看不懂 diff 就全盘接受。',
    aiAction:
      '大改前先说：“请先把当前能运行的进度做一次 git commit 存档；改完用 diff 说明你动了哪些行。”'
  },
  {
    id: 'allusion-libraries',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    chineseFamiliarity: '大学系统讲',
    literaryTerm: '引用现成文献与工具书（站在前人肩膀上）',
    classicQuote: '《荀子·劝学》：“君子生非异也，善假于物也。”',
    engTerm: '调用现成工具包（libraries）',
    engKeywords: ['import', 'npm package', 'Open Source', 'SDK'],
    uniRecall:
      '学术规范课强调：地图、历表、音韵工具书能引则引，不必人人重测山河。善假于物，是治学态度，也是工程常识。',
    epiphany:
      '公历农历换算会去翻历表；导出 PDF、画关系图，也可以优先问「有没有成熟工具包」，而不是默认从头造。',
    analogyFits:
      '引用工具书 ↔ 引入维护中的库：省时间、少重复劳动。',
    analogyBreaks:
      '引用文献有学术伦理与版本依据；用开源库还要许可证、体积、是否还在维护。不是「引用」二字能自动搞定。',
    litPerspective:
      '需要唐代疆域示意或中古音时，应优先用可靠工具书与前人成果，而不是临时手绘冒充定论。',
    engPerspective:
      '生成二维码、导出 PDF、画关系网，往往已有现成包。先问「成熟方案是什么」，再决定是否手写。第一次听说「库」时发懵很正常，把它想成工具书架即可。',
    visualCompare: {
      litTitle: '闭门造车 vs 善用工具书',
      litCode: `[闭门]：手算两千年闰月干支，又慢又易错。\n[善假于物]：查中西历日对照表。`,
      engTitle: '优先调用成熟库（示例）',
      engCode: `import * as echarts from 'echarts';\nchart.setOption({ series: [{ type: 'graph', data: characters }] });`
    },
    youDo: '提出功能时先问可选库与取舍；核对是否真的需要该依赖。',
    aiDoes: '推荐并接入库；说明基本用法，避免假装从零发明。',
    practiceFails:
      '任何一行都禁止手写 → 可能引入沉重依赖；或从不查许可与维护状态。',
    aiAction:
      '遇到复杂能力（海报、表格、词云）先问：“有哪些成熟库可用？请优先调用，并说明为什么不从头手写。”'
  },
  {
    id: 'polishing-refactoring',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '改稿润色：「删繁就简，意思不变」',
    classicQuote: '欧阳修修改《醉翁亭记》，删去初稿数十字啰嗦铺垫，只留“环滁皆山也”五字。',
    engTerm: '重构（Refactoring）：行为不变，结构更清',
    engKeywords: ['Refactoring', 'Clean Code', 'DRY'],
    uniRecall:
      '作文课一直练删繁就简；大学写作更强调：改结构不等于改论点。工程里的重构，借用的就是「意思不变，更好读、更好改」。',
    epiphany:
      '不改变对外表现，只把重复与废笔清理掉——润色统稿与代码重构，心气是通的。',
    analogyFits:
      '合并重复段、提炼总说，对照提炼公共函数，很合适。',
    analogyBreaks:
      '润色可能微调表达；严格重构要求外在行为不变。若边重构边加功能，问题会缠在一起。',
    litPerspective:
      '统稿时常把三处重复收束到一处，长句拆短——观点事实不动，阅读负担下降。',
    engPerspective:
      '连改多轮后，容易留下废变量或三处复制的同一筛选逻辑。先约定「外观与功能不变」，再清理内部，后续更好加东西。',
    visualCompare: {
      litTitle: '初稿重复 vs 统稿提炼',
      litCode: `[初稿]：三页各写一遍“怎么按年份排序”。\n[统稿]：提炼为一条通用规则，三页共用。`,
      engTitle: '提炼共用函数（示意）',
      engCode: `export function sortByYearDesc(list) {\n  return [...list].sort((a, b) => b.year - a.year);\n}`
    },
    youDo: '明确「这次只清理，不改功能」；改完按原验收清单点一遍。',
    aiDoes: '在约束下清理重复与废码，并说明动了哪些文件。',
    practiceFails:
      '重构同时加新功能 → 出问题说不清；或无验收就大清理。',
    aiAction:
      '功能已通但越改越沉时：“请在不改变现有外观与功能的前提下重构，清理废弃代码并提炼重复逻辑；先列计划再改。”'
  },

  // ==================== 四、AI 沟通·审稿篇 ====================
  {
    id: 'fanli-system-prompt',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    chineseFamiliarity: '大学系统讲',
    literaryTerm: '期刊征稿启事里的《投稿体例要求》',
    classicQuote: '《中国社会科学》引文注释规范：“凡向本刊投稿，须严格遵守以下版式与引文体例。”',
    engTerm: '项目置顶规则文件（如 CLAUDE.md / .cursorrules）',
    engKeywords: ['Project Rules', 'CLAUDE.md', '.cursorrules'],
    uniRecall:
      '学报体例、投稿须知：标题字体、注释格式、禁用语，写在纸上让所有来稿共用。高中可能见过「作文格式要求」；大学论文与期刊规范才密集起来。把「家规置顶」搬到项目里，就是同一管理思路。',
    epiphany:
      '把配色、目录、注释约定写进项目根目录的规则文件，等于编辑部墙上的《写稿总规矩》——助手每次动手前先看一眼。它是项目级备忘，不等同于模型厂商隐藏的系统提示词。',
    analogyFits:
      '体例手册 ↔ 仓库内置顶规则：减少每轮对话重复唠叨。',
    analogyBreaks:
      'CLAUDE.md / .cursorrules ≈ 给编程助手看的项目说明书；≠ 大模型内部的 system prompt（那一层你通常改不到）。别把「写了规则文件」说成「改了模型人格」。',
    litPerspective:
      '主编不想对每个实习生重复「标题用什么体、禁用网络流行语」——印一份体例放桌上更省事。',
    engPerspective:
      '对话一长，早先的审美与目录约定容易被忘掉。根目录规则文件让约定可反复加载。仍需你在关键节点提醒「先读规则」；它不是魔法符咒。',
    visualCompare: {
      litTitle: '编辑部常驻写稿规范',
      litCode: `1. 统一温和纸感底色，不用刺眼荧光色。\n2. 改稿前先说明改哪一节。\n3. 术语附简明中文说明。`,
      engTitle: '项目根目录规则文件（示例）',
      engCode: `# 项目开发约定\n1. 视觉：暖米白与赤陶色，保持克制。\n2. 文案尽量放在 src/data/，避免写死在界面里。\n3. 修改前先说明范围；关键处加中文注释。`
    },
    youDo: '决定哪些约定值得置顶；定期删掉过时条款，避免规则腐烂。',
    aiDoes: '创建/更新规则文件，并在改动中遵守；冲突时先问你。',
    practiceFails:
      '规则写太长太空 → 助手抓不住；或以为有了规则文件就等于改写了模型 system prompt。',
    aiAction:
      '正式项目开始时：“请在根目录创建规则文件，写入配色、目录与中文注释约定；并说明这是项目置顶备忘，不是修改模型系统提示词。”'
  },
  {
    id: 'prosody-json',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '填标准报名表 vs 写自由散文',
    classicQuote: '表格化信息整理：“将散乱的自然语言段落，提炼为字段统一的条目卡片。”',
    engTerm: '结构化数据（JSON 键值表）',
    engKeywords: ['JSON', 'Key-Value', 'Fields', 'Array of Objects'],
    uniRecall:
      '登记表、读书卡片、索引卡——中学就用过。大学做语料、做调查，更常把散文材料收成统一字段。JSON 不过是「给程序看的登记表」。',
    epiphany:
      '程序难直接按散文筛选；先整理成栏位统一的表，才能搜索、筛选、生成卡片。',
    analogyFits:
      '报名表栏目 ↔ JSON 的字段名；一沓表 ↔ 数组。',
    analogyBreaks:
      '真正的 Schema 还可约束类型与必填校验；入门不必一次引入全部校验术语。',
    litPerspective:
      '五十份《我的自传》很难汇总籍贯；一张固定栏目登记表就能分类。材料形态决定你能不能「按栏操作」。',
    engPerspective:
      '花括号里是一对对「栏目名: 内容」，方括号把多张卡叠成列表。先认这五种符号级的样子，再谈网站。',
    visualCompare: {
      litTitle: '散文 vs 标准资料卡',
      litCode: `[散文]：余华……1992年……《活着》……\n[资料卡]：书名：活着 ｜ 作者：余华 ｜ 年份：1992 ｜ 标签：……`,
      engTitle: '对应的 JSON 样子',
      engCode: `{\n  "title": "活着",\n  "author": "余华",\n  "year": 1992,\n  "tags": ["先锋文学", "现实主义"]\n}`
    },
    youDo: '规定必填字段；抽查 AI 有没有漏栏、编造、把感想塞进标签栏。',
    aiDoes: '按字段产出 JSON，并在你确认后接到界面。',
    practiceFails:
      '字段名中英混用且不说明；或让 AI 自由发挥成赏析文 → 无法筛选。',
    aiAction:
      '有一堆笔记要上网时，先说：“请整理成 JSON 数组，每条必须包含 title、author、year、summary；先给 3 条样例我核对。”'
  },
  {
    id: 'commentary-comments',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    chineseFamiliarity: '高中熟悉',
    literaryTerm: '文章里的「括号夹注」与「剧本舞台提示」',
    classicQuote: '剧本格式：“凡括号内之舞台说明，仅供导演与演员明晓调度意图，演出时切勿朗读。”',
    engTerm: '代码注释与说明文档（README）',
    engKeywords: ['Comments', 'JSDoc', 'README.md'],
    uniRecall:
      '夹注、校注、舞台提示：写给人看、不必「念出来」的说明。高中课本注释、大学文献阅读天天遇到。代码注释是同一族事物。',
    epiphany:
      '以 `//` 开头的中文说明，程序运行时常忽略，却能让你下次打开时读懂「这段干什么」。',
    analogyFits:
      '舞台提示 ↔ 给维护者的旁注：帮助理解意图，不进入「演出」（运行结果）。',
    analogyBreaks:
      '过时注释比没有更糟；注释不能代替清晰结构。README 是给项目入口看的说明书，也不是注释的加长版这么简单。',
    litPerspective:
      '剧本括号里的调度说明，演员不朗读，却决定怎么演。',
    engPerspective:
      '打开全英文代码文件时发怵，很常见。可以要求在关键段落上方用中文写清职责——运行忽略注释，阅读却轻松很多。',
    visualCompare: {
      litTitle: '剧本括号提示',
      litCode: `（注意：本段处理未输入关键词时的提示，勿删）\n台词：“请问您想查找哪位作家的作品？”`,
      engTitle: '带中文注释的示例',
      engCode: `// 搜索过滤：按关键词筛选图书；空词则返回全部\nfunction filterBooks(books, keyword) {\n  if (!keyword) return books;\n  return books.filter(b => b.title.includes(keyword));\n}`
    },
    youDo: '指出哪些段落必须有人话说明；发现注释与代码不一致时要求同步改。',
    aiDoes: '为关键函数补中文注释，并保持与行为一致。',
    practiceFails:
      '要求「每行都注释」→ 噪声；或注释写了愿望、代码做了另一件事。',
    aiAction:
      '可以说：“我更熟悉中文阅读，请在关键函数与模块上方用中文注明作用与注意事项，方便我维护。”'
  },
  {
    id: 'chief-editor-review',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    chineseFamiliarity: '高中接触，大学加深',
    literaryTerm: '主编审稿三问（挑刺与极端情况测试）',
    classicQuote: '叶圣陶论编辑审稿：“必设身处地，代读者试读，察其有无缺漏、枝梧与不便之处。”',
    engTerm: '验收与边界情况（空结果 / 超长 / 小屏）',
    engKeywords: ['Acceptance', 'Edge Cases', 'Empty State', 'Mobile'],
    uniRecall:
      '编辑学、出版实习、课程作业互评，都会练「代读者找不舒服」。叶圣陶说的试读，就是验收。高中作文互改已有萌芽；大学编辑出版、实习编辑更系统。',
    epiphany:
      '不一定会写代码，也可以验收：搜不到怎么办？字太长撑破框吗？手机上点得到吗？三问就能挡住一批尴尬成品。',
    analogyFits:
      '样刊挑极端版式 ↔ 软件挑空状态、溢出、小屏——都是代使用者找坑。',
    analogyBreaks:
      '完整测试还包括性能、安全、无障碍等；三问是今晚能做完的最小验收，不是测试工程师手册。',
    litPerspective:
      '好编辑会看：超长标题会否把目录挤乱；某栏无图会否留下空洞。只看「理想样张」不够。',
    engPerspective:
      '实现者容易只走「一切顺利」路径。你作为验收人，专门点那些不顺利的路径，往往比再学一轮术语更能提升成品质量，也能躲开一批常见坑。',
    visualCompare: {
      litTitle: '主编审阅样刊三问',
      litCode: `一问空白：搜不到时是一片空白，还是有提示与退路？\n二问超长：五百字笔记会否撑破卡片？\n三问手机：按钮会否太小太挤？`,
      engTitle: '对应的最小验收清单',
      engCode: `- 空状态：无结果时的说明 + 重置\n- 溢出：长文折行或区域内滚动\n- 小屏：单列、按钮够大好点`
    },
    youDo: '按三问亲手点一遍；把失败步骤写清楚发给 AI。',
    aiDoes: '补空状态、溢出与小屏适配；不宣称「已完美」。',
    practiceFails:
      '只在理想数据下看一眼就收工；或空泛说「再优化」而不给复现步骤。',
    aiAction:
      '页面告一段落时：“请自查并补齐：1) 搜索无结果的提示与重置；2) 超长文字防撑破；3) 手机单列与可点按钮。我也会按这三问验收。”'
  }
];

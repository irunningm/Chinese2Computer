// 02 · 概念词典：用《现代汉语》《文学理论》与写论文日常，秒懂 16 个软件工程核心概念

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

export const DICTIONARY_ENTRIES = [
  // ==================== 一、现代汉语·语法篇 ====================
  {
    id: 'parts-of-speech',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '主谓宾定状补（句子成分）',
    classicQuote: '黄伯荣、廖序东《现代汉语》：“主语、谓语、宾语是句子的主干；定语、状语、补语是枝叶。”',
    engTerm: '数据对象 (Object) · 函数 (Function) · 参数 (Args)',
    engKeywords: ['Object', 'Function', 'Property', 'Arguments'],
    epiphany: '名词（主语/宾语）是“数据对象”，动词（谓语）是“执行函数”，定语是对象的“属性”，状语是调用函数时传进去的“参数”。',
    litPerspective:
      '汉语言文学大一必修的《现代汉语》句子成分分析法：比如“（热心的）图书管理员【快速地】借出了《活着》”。其中“管理员”和“《活着》”是名词（主宾），“借出”是核心动词（谓语），“热心的”修饰名词（定语），“快速地”限制动作方式（状语）。',
    engPerspective:
      '写任何程序代码，底层逻辑跟造句一模一样：先定义有哪些名词对象（如 `user` 用户、`book` 图书）以及它们的定语属性（`user.role = "管理员"`）；再写动词函数去操作它们（`borrowBook(book, { speed: "fast" })`）。',
    visualCompare: {
      litTitle: '现代汉语句子成分划分',
      litCode: `【主语/宾语（名词）】读者 (reader)、《活着》(book)\n【定语（修饰名词）】已登录的读者 (reader.isLoggedIn = true)\n【谓语（动词）】收藏 (collectBook)\n【状语（限制动作）】按分类悄悄地收藏 (传入参数 category="小说")`,
      engTitle: '完全对应的 JavaScript 代码',
      engCode: `const reader = { name: "小林", isLoggedIn: true }; // 名词 + 定语属性\nconst book = { title: "活着" };\n\n// 动词（函数） + 宾语与状语（参数）\ncollectBook(reader, book, { category: "小说" });`
    },
    aiAction:
      '向 AI 提需求时，先用“主谓宾法”帮它理清主干：先列出你的项目里有哪些【核心名词】（比如：文章、作者、评论），再列出用户能对它们做哪些【核心动词】（比如：搜索、筛选、导出），AI 写出来的代码结构会无比清晰。'
  },
  {
    id: 'compound-sentences',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '关联词与复句（如果…就… / 每当…都…）',
    classicQuote: '《现代汉语》：“复句由两个或两个以上意义上相关、结构上互不包含的分句加上关联词语组成。”',
    engTerm: '条件分支 (if / else) · 循环遍历 (for / map)',
    engKeywords: ['if / else', 'for loop', 'Array.map', 'Control Flow'],
    epiphany: '假设复句“如果……就……否则……”就是代码里的 `if / else`；排比句把同一句式套在十个人身上，就是代码里的 `map` 循环。',
    litPerspective:
      '我们写文章离不开关联词：表示假设条件时写“如果明天不下雨，我们就去踏青，否则就待在图书馆”；表示批量逐一处理时写“把书架上的每一本书，都贴上分类标签”。',
    engPerspective:
      '很多文科生觉得程序的“算法逻辑”很神秘，其实 90% 的日常代码逻辑就只是这两个复句：用 `if (...) { ... } else { ... }` 做条件判断；用 `books.map(...)` 把列表里的每一项批量变成页面上的卡片。',
    visualCompare: {
      litTitle: '汉语复句逻辑',
      litCode: `1. 【假设复句】：如果（if）搜索框为空，就提示“请输入关键词”；否则（else）开始检索。\n2. 【批量排比】：对书单里的每一本书（map），都生成一张带书名和作者的卡片。`,
      engTitle: '代码里的条件与循环',
      engCode: `// 1. 假设复句 (if / else)\nif (keyword === "") {\n  alert("请输入关键词");\n} else {\n  searchBooks(keyword);\n}\n\n// 2. 批量循环渲染 (map)\nbooks.map(book => <Card title={book.title} />);`
    },
    aiAction:
      '跟 AI 描述交互规则时，多用“如果 A，就 B；否则 C”的严谨复句句式。比如：“如果用户搜索不到结果，就显示‘暂无匹配文章’并提供重置按钮；否则正常显示卡片列表。”'
  },
  {
    id: 'syntax-vs-semantics',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '改病句：标点错字 vs 逻辑歧义',
    classicQuote: '吕叔湘《语法修辞讲话》：“一句话语法结构没毛病，但事理不通或有歧义，同样是病句。”',
    engTerm: '语法报错 (Syntax Error) vs 业务逻辑错 (Logic Bug)',
    engKeywords: ['Syntax Error', 'Type Error', 'Logic Bug', 'Ambiguity'],
    epiphany: '少写了半边括号叫“语法错（程序直接红字罢工）”；像“咬死了猎人的狗”这种句子通顺但意思跑偏，叫“逻辑 Bug”。',
    litPerspective:
      '改文章有两种错：第一种是硬伤，比如书名号只写了一半《活着，或者错别字，Word 会直接画红波浪线；第二种是逻辑歧义，比如“三个学校的老师来开会”（到底是“三所学校”还是“三位老师”？），字面挑不出语病，但读者理解全歪了。',
    engPerspective:
      'AI 写代码极少犯“少写半边括号”这种低级语法错（`Syntax Error`）；AI 编程 95% 的翻车，都是因为你的提示词有“歧义”，导致 AI 写出了语法完全正确、但效果跟你想的不一样的“逻辑 Bug（`Logic Bug`）”。',
    visualCompare: {
      litTitle: '两种病句对比',
      litCode: `[语法硬伤]：“余华写下了《活着”（缺右书名号，一眼能看见红线报错）\n[逻辑歧义]：“请按时间排序”（到底是按“作家出生时间”还是“图书出版时间”？升序还是降序？）`,
      engTitle: '两种代码错误对比',
      engCode: `// [SyntaxError] 少了右括号，程序直接无法启动\nconsole.log("活着";\n\n// [Logic Bug] 程序没报错，但把“最新出版排前面”写成了“最旧排前面”\nbooks.sort((a, b) => a.year - b.year);`
    },
    aiAction:
      '像做《现代汉语》“消除歧义”练习一样检查你发给 AI 的话：凡是说到“排序、筛选、删除、好看”，一定补齐定语和状语（比如“按出版年份从新到旧降序排列”），不给 AI 留任何猜谜空间。'
  },
  {
    id: 'context-scope',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '语境（上下文）与一词多义',
    classicQuote: '陈望道《修辞学发凡》：“离开具体的语境，便无从断定辞语的恰当与否。”',
    engTerm: '变量作用域 (Scope) · AI 上下文窗口 (Context Window)',
    engKeywords: ['Local Scope', 'Global Scope', 'Context Window'],
    epiphany: '同一个词在不同段落里意思不同叫“局部作用域”；跟 AI 聊太久它忘了最开始的要求，是因为装满了它的“上下文窗口”。',
    litPerspective:
      '语言学最重“语境”：同样说一句“这书真行”，在夸奖语境里是赞美，在吐槽语境里是反讽；在《第一章》里简称“老王”指的是王熙凤，到了《第二章》简称“老王”可能指的是王冕，各章内部互不干扰。',
    engPerspective:
      '在代码里，A 函数内部定义的变量（局部变量 `Local Scope`）只在 A 函数内部有效，绝不会污染外面的同名变量。而在跟 AI 对话时，AI 一次能记住的对话总字数叫“上下文窗口（`Context Window`）”，聊得太杂太长，前面的重点就会被挤出记忆区。',
    visualCompare: {
      litTitle: '篇章语境边界',
      litCode: `【全书通用简称（全局 Global）】本社 = 人民文学出版社\n【第一回内部语境（局部 Local）】本村 = 绍兴鲁镇\n【第二回内部语境（局部 Local）】本村 = 湘西茶峒`,
      engTitle: '代码里的全局与局部作用域',
      engCode: `const publisher = "人民文学出版社"; // 全局变量\n\nfunction chapterOne() {\n  const village = "鲁镇"; // 局部变量，只在第一回内生效\n}\nfunction chapterTwo() {\n  const village = "茶峒"; // 与第一回互不冲突\n}`
    },
    aiAction:
      '当你让 AI 修完一个功能、准备开发下一个完全不同的功能时，最聪明的做法是**新开一个对话窗口（清空旧语境干扰）**，只把当前要改的那一两个文件发给它。'
  },

  // ==================== 二、文学理论·结构篇 ====================
  {
    id: 'content-vs-form',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    literaryTerm: '内容（故事素材）与形式（体裁排版）',
    classicQuote: '童庆炳《文学理论教程》：“文学作品是内容与形式的统一体，同一题材可表现为不同体裁形式。”',
    engTerm: '数据层 (Data) 与 视图层 (UI View) 分离',
    engKeywords: ['Separation of Concerns', 'Data vs View', 'JSON'],
    epiphany: '永远要求 AI 把“文字资料（内容）”和“网页排版（形式）”分成两个独立文件放——改错别字不用碰排版，换皮肤不会弄丢文章！',
    litPerspective:
      '同一篇《祝福》的纯文本内容，既可以排成横排简体课本，也可以排成竖排繁体线装书，还可以改成话剧剧本。故事内容本身（文字数据）和它穿什么衣服（排版形式）是两码事。',
    engPerspective:
      '新手用 AI 写网页最容易踩的坑，就是让 AI 把几十段文章内容直接和 HTML 排版标签混写在一起（硬编码 Hardcode）。一旦你想改个字，就得在几百行代码符号里大海捞针。工程上的铁律是：**数据归 `src/data/`，界面归 `src/components/`**。',
    visualCompare: {
      litTitle: '内容与形式混杂 vs 分离',
      litCode: `[混杂难改]：边写故事边调字号颜色，想把主角名字改掉得翻遍全文排版框。\n[分离清爽]：一份纯文字《人物资料表.json》 + 一套独立的《排版样式模板》。`,
      engTitle: '数据文件与界面组件分离',
      engCode: `// 1. src/data/books.js (只放纯粹的文字内容，文科生随时可直接改字)\nexport const BOOKS = [{ title: "活着", author: "余华" }];\n\n// 2. src/App.js (只管怎么排版渲染)\nimport { BOOKS } from './data/books.js';`
    },
    aiAction:
      '在任何项目开工前，给 AI 下达死命令：“请实行数据与视图分离，所有文章、词条、配置文案一律单独存放在 `src/data/` 文件夹下，不要把大段文字直接写死在界面代码里。”'
  },
  {
    id: 'outline-prd',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    literaryTerm: '动笔前列“写作提纲”（总-分-总）',
    classicQuote: '老舍《谈叙述与描写》：“在动笔以前，必须有通盘的计划，先立好主脑与间架。”',
    engTerm: '产品需求文档 (PRD) 与 架构设计',
    engKeywords: ['PRD', 'Spec-Driven', 'System Architecture'],
    epiphany: '写万字论文不列提纲必跑题；让 AI 写代码前，先让它给你列一份“功能与页面提纲（PRD）”，成功率直接翻十倍。',
    litPerspective:
      '无论是写毕业论文还是长篇小说，没人会不列大纲就埋头狂写。好的提纲会写清：中心论点是什么？分几个章节？每一章讲哪几个要点？哪些内容这次不写？',
    engPerspective:
      '很多人抱怨“AI 写出来的东西根本不是我想要的”，因为他们一上来只发了一句“帮我做个读书网站”。在软件工程里，动工前必须先写 **PRD（产品需求说明书）**：包含几个页面？每张卡片展示哪几个字段？点按钮后发生什么？',
    visualCompare: {
      litTitle: '《学年论文写作三级提纲》',
      litCode: `一、核心论题：鲁迅杂文的修辞特征\n二、章节划分：1.反语讽刺 2.白描肖像 3.曲笔隐喻\n三、边界说明：本文仅讨论《呐喊》《彷徨》与杂文集，暂不涉及古籍校勘。`,
      engTitle: '发给 AI 的工程提纲 (PRD Spec)',
      engCode: `# 项目需求提纲 (PRD)\n1. 核心目标：现代作家读书笔记卡片站（优先适配手机端）\n2. 页面模块：顶栏搜索框 + 分类标签条 + 笔记卡片列表 + 底部详情弹窗\n3. 本次不做：暂不需要做复杂的账号注册登录功能`
    },
    aiAction:
      '永远把 AI 编程分成两步走：第一步先对 AI 说“我打算做个……请【先不要写代码】，帮我梳理一份简明的功能模块提纲、数据结构和目录规划”；等你看完点头了，第二步再让它写代码。'
  },
  {
    id: 'paragraph-modularity',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    literaryTerm: '分段原则：“一段只讲一层意思”',
    classicQuote: '叶圣陶《作文论》：“分段之要，在于一意一断，脉络分明，不相杂糅。”',
    engTerm: '模块化 · 高内聚低耦合 · 单一职责 (SRP)',
    engKeywords: ['Modularity', 'High Cohesion', 'Low Coupling', 'SRP'],
    epiphany: '一个文件只干好一件事叫“高内聚”；修改第三章的配图绝不会把第一章的文字搞乱，就叫“低耦合”。',
    litPerspective:
      '批改作文时，最怕看到学生写三千字不分段，把“作者生平、作品销量、个人读后感”全搅和在同一段里，删一句话整段都接不上。好文章必然分段独立，各司其职。',
    engPerspective:
      '软件工程最核心的词叫 **“高内聚、低耦合（High Cohesion, Low Coupling）”**：把搜索框单独做成一个小零件文件（`SearchBar.js`），把卡片做成另一个小零件文件（`NoteCard.js`）。这样以后你想改搜索框样式，只改那一个小文件就行，绝对不会把页面其他地方改坏！',
    visualCompare: {
      litTitle: '一锅粥长文 vs 独立章节',
      litCode: `[一锅粥]：所有内容全塞在一个万字文档里，牵一发而动全身。\n[模块化]：第一章、第二章、附录各自独立成篇，修改附录绝不影响正文。`,
      engTitle: '模块化文件拆分',
      engCode: `src/\n  ├── data/notes.js          // 只负责存放笔记文字\n  ├── components/Header.js   // 只负责顶部导航栏\n  ├── components/Card.js     // 只负责单张卡片排版\n  └── utils/search.js        // 只负责关键词搜索逻辑`
    },
    aiAction:
      '如果你发现 AI 把所有代码全塞进了一个文件里（比如单个文件超过 400 行），立刻提醒它：“这个文件太臃肿了，请按照‘高内聚低耦合’原则，把数据和不同组件拆分成独立的小文件。”'
  },
  {
    id: 'cipai-components',
    category: 'composition',
    categoryLabel: '文学理论·结构篇',
    literaryTerm: '填空模板与词牌格律（《浣溪沙》定格）',
    classicQuote: '王力《诗词格律》：“词有定格，字有定数，韵有定声；词人依谱填词，体式一而意境百出。”',
    engTerm: '可复用 UI 组件 (Component) 与 属性传参 (Props)',
    engKeywords: ['Component', 'Props', 'Template', 'Reusable UI'],
    epiphany: '页面上有 50 张作家卡片，绝不是复制粘贴 50 遍代码，而是先做一个“填空模板（组件）”，再把 50 个人的资料像填词一样传进去（Props）。',
    litPerspective:
      '词牌《西江月》规定好了上下片几句、每句几个字、哪里押韵。这套“格律模板”只需要发明一次，苏轼填进赤壁江月，辛弃疾填进稻花丰年，模板复用千次而内容各异。',
    engPerspective:
      '现代网页开发的核心就是 **组件化（Component）**：比如做一个 `<WriterCard />`（作家卡片组件），规定好左上角放名字、右上角放年代、中间放代表作。之后不管你有 10 位还是 1000 位作家，只需要往这个组件里传入不同的参数（`Props`）即可。',
    visualCompare: {
      litTitle: '填空模板与填入不同内容',
      litCode: `【卡片模板】：姓名：{name} ｜ 年代：{era} ｜ 名言：“{quote}”\n  ├── 填入第 1 组数据 ──► 姓名：鲁迅 ｜ 年代：现代 ｜ 名言：“其实地上本没有路”\n  └── 填入第 2 组数据 ──► 姓名：汪曾祺 ｜ 年代：当代 ｜ 名言：“四方食事，不过一碗人间烟火”`,
      engTitle: '定义一个组件，传参复用百次',
      engCode: `// 1. 定义一次卡片模板组件\nfunction WriterCard({ name, era, quote }) {\n  return <div className="card"><h3>{name} ({era})</h3><p>{quote}</p></div>;\n}\n// 2. 传入不同参数 (Props) 生成卡片\n<WriterCard name="鲁迅" era="现代" quote="其实地上本没有路" />\n<WriterCard name="汪曾祺" era="当代" quote="四方食事，不过一碗人间烟火" />`
    },
    aiAction:
      '想统一调整页面上所有卡片的样子时，你只需要对 AI 说：“请修改 `WriterCard` 这个公共组件的样式，把标题字号调大一号”，全站所有卡片就会同时自动更新！'
  },

  // ==================== 三、论文写作·改稿篇 ====================
  {
    id: 'cataloging-tree',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '电脑里的“毕业论文文件夹分类整理”',
    classicQuote: '张之洞《輶轩语》：“治学之要，先明门径；门径既清，检阅自易。”',
    engTerm: '项目文件目录树 (Folder Structure) 与 路由 (Routing)',
    engKeywords: ['Directory Tree', 'package.json', 'index.html', 'src/'],
    epiphany: '拿到一个代码项目别慌，它就跟你整理好的“毕业论文文件夹”一样：`index.html` 是封面，`src/data` 是参考文献资料夹，`src/styles` 是排版样式夹。',
    litPerspective:
      '写毕业论文时，条理清楚的同学会在电脑里建一个总文件夹，里面分设：`01_开题报告与大纲`、`02_参考文献史料`、`03_正文各章节`、`04_答辩PPT与配图`。需要改哪块，一秒就能找到对应文件夹。',
    engPerspective:
      '很多文科生第一次打开代码项目，看到十几个英文文件名就头大。其实全世界的软件项目都长一个样，只要记住这 4 个核心位置，你就再也不会迷路：',
    visualCompare: {
      litTitle: '毕业论文文件夹结构',
      litCode: `我的毕业论文/\n ├── 论文总说明与目录.docx\n ├── 01_原始文献与摘录数据/\n ├── 02_正文各章节模块/\n └── 03_排版字体与配色模板/`,
      engTitle: '标准代码项目目录树（全天下通用）',
      engCode: `my-project/\n ├── package.json        // 项目的“身份证”（写着项目名字和启动口令）\n ├── index.html          // 网页的“总入口封面”\n └── src/                // 核心源码文件夹\n      ├── data/          // 放纯文字资料（你最常亲手改字的地方！）\n      ├── components/    // 放页面各个零件（导航栏、卡片、弹窗）\n      └── styles/        // 放颜色、字体、间距样式 (main.css)`
    },
    aiAction:
      '每当你打开一个新项目，第一句话可以直接问 AI：“请帮我画出当前项目的文件夹目录树，并用大白话告诉我：如果我只想改页面上的文字内容，应该去改哪个文件？”'
  },
  {
    id: 'textual-criticism-git',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '论文初稿、导师批注稿与“撤回上一步”',
    classicQuote: '胡适《治学方法》：“步步留痕，随时比勘，方知何处增删得宜。”',
    engTerm: 'Git 版本控制（Commit 存档 · Diff 对比 · Branch 分支）',
    engKeywords: ['git commit', 'git diff', 'git branch', 'Rollback'],
    epiphany: '不用再把文件夹复制成“第1版、第2版、最终不改版”了！Git 就像 Word 的“历史版本记录 + 审阅修订模式”，随时对比改动、随时后悔退回。',
    litPerspective:
      '改论文最怕两件事：一是改着改着把昨天写得很好的一段话误删了找不回来；二是合作者改完发回来，你不知道他到底偷偷动了哪几句话，只能打开 Word 的“比较文档（红字删除线、绿字新增）”逐行核对。',
    engPerspective:
      '在 AI 编程里，AI 每次改代码都可能改出新问题。有了 Git，每完成一个小功能你就存档一次（`git commit`）；AI 改完后你可以用 `git diff` 看清它删了哪行（红色减号 `-`）、加了哪行（绿色加号 `+`）；一旦不满意，一键撤回！',
    visualCompare: {
      litTitle: 'Word 审阅修订对比模式',
      litCode: `【修改前原句】鲁迅于 1918 年发表了《狂人日记》。\n【修订对比】\n  - 删去旧句：鲁迅于 1918 年发表了《阿Q正传》。\n  + 订正新句：鲁迅于 1918 年发表了《狂人日记》。`,
      engTitle: 'Git Diff 代码改动对比视图',
      engCode: `@@ src/data/writers.js @@\n- const firstWork = "阿Q正传";   // 红色减号：被删掉的旧内容\n+ const firstWork = "狂人日记";  // 绿色加号：新改上的正确内容`
    },
    aiAction:
      '让 AI 做大改动之前，养成习惯先跟它说一句：“在改这个新功能之前，请先帮我把当前正常运行的进度做一次 git commit 存档，以防万一改坏了能随时退回来。”'
  },
  {
    id: 'allusion-libraries',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '引用现成文献与工具书（站在前人肩膀上）',
    classicQuote: '《荀子·劝学》：“君子生非异也，善假于物也。”',
    engTerm: '调用开源库 (import Libraries) 与 现成轮子',
    engKeywords: ['import', 'npm package', 'Open Source', 'SDK'],
    epiphany: '写论文查公历农历换算直接翻《两千年中西历对照表》，不用自己从头推算天体运行；写代码也一样，直接一行 `import` 调用别人写好的开源工具包！',
    litPerspective:
      '做学术研究讲究“善用工具书与前人成果”：如果论文里需要绘制一张唐代地图或查某个字的中古音韵，你直接引用谭其骧《中国历史地图集》或《广韵》即可，绝不需要自己去重新测绘全国地形。',
    engPerspective:
      '很多文科生以为做个“生成二维码”、“导出 PDF”、“画人物关系网图”需要写几万行底层代码。其实全球程序员早就把这些功能做成免费的“开源工具包（Libraries）”了，AI 只需要写一行 `import` 把工具包引进来就能直接用！',
    visualCompare: {
      litTitle: '自己闭门造车 vs 善用现成工具书',
      litCode: `[闭门造车]：自己花三个月手算两千年的闰月与干支纪年，还容易算错。\n[善假于物]：直接查阅现成的《中西历日对照表》工具书，一秒得出准确干支。`,
      engTitle: '一行 import 调用现成开源库',
      engCode: `// 不用自己写几百行复杂的图表算法，直接引入成熟的 ECharts 图表库\nimport * as echarts from 'echarts';\n\n// 直接传入人物关系数据，自动画出可拖拽的关系网络图\nchart.setOption({ series: [{ type: 'graph', data: characters }] });`
    },
    aiAction:
      '遇到任何看起来很复杂的功能（比如：把网页保存成图片海报、读取 Excel 表格、画词云图），直接问 AI：“实现这个功能有哪些成熟好用的现成开源库？请直接调用成熟库，不要自己从头手写底层算法。”'
  },
  {
    id: 'polishing-refactoring',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '改稿润色：“删繁就简，意思不变”',
    classicQuote: '欧阳修修改《醉翁亭记》，删去初稿数十字啰嗦铺垫，只留“环滁皆山也”五字。',
    engTerm: '代码重构 (Refactoring)',
    engKeywords: ['Refactoring', 'Clean Code', 'DRY Principle'],
    epiphany: '不改变文章原本要表达的意思，只把啰嗦重复的车轱辘话删改得干净利落，在软件工程里就叫“代码重构（Refactoring）”。',
    litPerspective:
      '我们写完初稿后，常会做一次“润色统稿”：把散落在三个段落里重复讲的同一句话提炼合并到开头，把拗口的长句拆短。改完之后，文章表达的观点和事实一丁点没变，但结构清爽了十倍。',
    engPerspective:
      '带着 AI 连续改了十几个回合后，代码里往往会留下很多不再使用的废变量，或者同一个筛选逻辑在三个地方复制粘贴了三遍。这时候做一次 **重构（Refactoring）**——要求外在页面效果和功能完全不变，只把内部代码清理干净，后续再加新功能就不容易出错。',
    visualCompare: {
      litTitle: '初稿啰嗦重复 vs 润色提炼',
      litCode: `[初稿车轱辘话]：在第一页写了一遍“怎么按年份排序”，第二页又抄了一遍，第三页又抄了一遍。\n[统稿润色后]：把“按年份排序”提炼成一条通用规则，三页直接共用。`,
      engTitle: '代码重构 (Refactoring) 提炼公共函数',
      engCode: `// 重构前：3 个组件里各自写了一遍重复的排序代码\n\n// 重构后：提炼成一个干净的通用小函数，全站共用，外在表现完全不变\nexport function sortByYearDesc(list) {\n  return [...list].sort((a, b) => b.year - a.year);\n}`
    },
    aiAction:
      '当你的作品功能已经调通，但感觉 AI 改起来越来越慢时，对它发一条指令：“请在不改变任何现有页面外观与功能的前提下，对代码进行一次重构（Refactoring），清理废弃代码并提炼重复逻辑。”'
  },

  // ==================== 四、AI 沟通·审稿篇 ====================
  {
    id: 'fanli-system-prompt',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '期刊征稿启事里的《投稿体例要求》',
    classicQuote: '《中国社会科学》引文注释规范：“凡向本刊投稿，须严格遵守以下版式与引文体例。”',
    engTerm: '全局系统规则文件 (CLAUDE.md / .cursorrules)',
    engKeywords: ['System Prompt', 'CLAUDE.md', '.cursorrules', 'Project Rules'],
    epiphany: '把你的审美要求和规矩写进项目根目录的 `CLAUDE.md` 文件里，就像在编辑部墙上贴了一张《写稿总规矩》，AI 每次动笔前都会自动先看一眼！',
    litPerspective:
      '如果你是杂志主编，肯定不想每次来一个新实习生，都得把“标题用宋体、正文首行缩进两格、禁用网络流行语”重复唠叨一百遍。最省事的办法是印一份《写稿体例手册》放在桌上，谁写稿都得照着来。',
    engPerspective:
      '为什么有时候跟 AI 聊着聊着，它又开始乱用刺眼的紫色渐变背景，或者又把所有代码塞进一个文件？因为对话变长后它忘了！只要在项目根目录建一个叫 `CLAUDE.md`（或 `.cursorrules`）的文件写好规矩，AI 每次写代码前都会自动读取这份“置顶家规”。',
    visualCompare: {
      litTitle: '《编辑部常驻写稿规范》',
      litCode: `1. 全刊统一采用温和的纸张米白底色，禁用刺眼荧光色。\n2. 每次改稿前先向主编汇报打算改哪一节，不可擅自删改其他章节。\n3. 遇到专业术语需附上简明中文脚注。`,
      engTitle: '项目根目录下的 CLAUDE.md 规则文件',
      engCode: `# 项目常驻开发规范 (Project Rules)\n1. 视觉风格：保持 Claude Editorial 暖米白 (#F5F4ED) 与赤陶色 (#C96442)。\n2. 架构铁律：数据文件统一放在 src/data/，严禁把文案硬编码在组件里。\n3. 协作纪律：每次修改前先说明改动范围，关键函数需附中文注释。`
    },
    aiAction:
      '开始做任何一个正式项目时，第一件事就是对 AI 说：“请先在项目根目录下帮我创建一个 `CLAUDE.md` 规范文件，把我们的配色方案、目录结构规矩和中文注释要求写进去。”'
  },
  {
    id: 'prosody-json',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '填标准报名表 vs 写自由散文',
    classicQuote: '表格化信息整理：“将散乱的自然语言段落，提炼为字段统一的条目卡片。”',
    engTerm: '结构化数据格式 (JSON Schema)',
    engKeywords: ['JSON', 'Key-Value', 'Schema', 'Array of Objects'],
    epiphany: '程序没法直接把一篇散文拿来按年代筛选，但只要让 AI 把散文整理成“JSON 填空表（带固定栏目名）”，就能瞬间变成可搜索、可筛选的互动网站！',
    litPerspective:
      '假设你要统计班里 50 个同学的籍贯和出生年月。如果让大家交一篇《我的自传》散文，你得读断腿；但如果发一张固定栏目的《登记表》（姓名、出生年份、籍贯、爱好），你一秒钟就能按籍贯分类汇总。',
    engPerspective:
      '在软件工程里，这种“标准登记表”就叫 **JSON**。它只用两种符号：花括号 `{}` 代表一张登记卡（里面是一对对的 `"栏目名": "内容"`），方括号 `[]` 代表把几十张登记卡装成一沓列表。看懂下面这五行，你就彻底懂了 JSON：',
    visualCompare: {
      litTitle: '散文描述 vs 标准资料卡',
      litCode: `[散文描述]：余华是当代著名作家，1992年写出了震撼人心的《活着》，归属先锋文学与现实主义。\n[标准资料卡]：书名：活着 ｜ 作者：余华 ｜ 年份：1992 ｜ 标签：[先锋文学, 现实主义]`,
      engTitle: '完全对应的 JSON 数据格式',
      engCode: `{\n  "title": "活着",\n  "author": "余华",\n  "year": 1992,\n  "tags": ["先锋文学", "现实主义"]\n}`
    },
    aiAction:
      '当你手头有一大堆Word读书笔记或文献段落，想做成网站时，先把文字发给 AI 说：“请帮我把这些文字整理成标准的 JSON 数组格式，每条必须包含 `title`、`author`、`year`、`summary` 四个字段。”'
  },
  {
    id: 'commentary-comments',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '文章里的“括号夹注”与“剧本舞台提示”',
    classicQuote: '剧本格式：“凡括号内之舞台说明，仅供导演与演员明晓调度意图，演出时切勿朗读。”',
    engTerm: '代码注释 (Comments //) 与 说明文档 (README)',
    engKeywords: ['Comments', 'JSDoc', 'README.md'],
    epiphany: '代码里以 `//` 开头的中文句子叫“注释”，电脑运行程序时会自动忽略它，但它能帮你像读带译注的书一样，一眼看懂每段代码是干什么的！',
    litPerspective:
      '看话剧剧本时，台词旁边常有括号小字：“（走到窗前，压低声音）”。演员在台上绝不会把这八个字念出来，它是写给演员和导演看“这段话为什么要这么演”的提示说明。',
    engPerspective:
      '很多文科生不敢打开代码文件，是因为里面全是英文。其实你完全可以让 AI 在每一段核心代码上方，用 `// 中文注释` 写清楚“这一段负责搜索过滤”、“这一段负责打开底部弹窗”——电脑跑程序时完全忽略注释，但你打开文件就像看中文说明书一样清楚！',
    visualCompare: {
      litTitle: '剧本里的括号提示（不念出来，仅供理解）',
      litCode: `（注意：以下段落专门用于处理读者未输入关键词时的提示，勿删）\n台词正文：“请问您想查找哪位作家的作品？”`,
      engTitle: '带中文注释的代码（文科生也能轻松看懂）',
      engCode: `// 【搜索过滤函数】根据用户输入的关键词，筛选出匹配的图书卡片\n// 注：已做大小写兼容处理，如果关键词为空则返回全部图书\nfunction filterBooks(books, keyword) {\n  if (!keyword) return books;\n  return books.filter(b => b.title.includes(keyword));\n}`
    },
    aiAction:
      '大胆向 AI 提出要求：“我是汉语言文学背景的创作者，请在你编写的每个关键函数和模块上方，用清晰的中文加上注释，说明这段代码的作用，方便我阅读和维护。”'
  },
  {
    id: 'chief-editor-review',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '主编审稿三问（挑刺与极端情况测试）',
    classicQuote: '叶圣陶论编辑审稿：“必设身处地，代读者试读，察其有无缺漏、枝梧与不便之处。”',
    engTerm: '验收测试 (Acceptance Test) 与 边界条件 (Edge Cases)',
    engKeywords: ['Code Review', 'Edge Cases', 'Empty State', 'Mobile Responsive'],
    epiphany: '不会写代码，怎么验收 AI 干得好不好？用“主编挑刺三问”：搜不到东西怎么办？字太多撑破框怎么办？在手机小屏幕上点得到吗？',
    litPerspective:
      '一个好主编审阅版面样刊时，绝不会只看正常段落，一定会专门检查极端情况：如果某篇文章标题长达 40 个字，目录页会换行错位吗？如果某一栏刚好没有配图，版面会留出一块难看的空洞吗？',
    engPerspective:
      '程序员写代码最容易只顾“理想情况（Happy Path）”，而忽略“边界情况（Edge Cases）”。你作为产品主编，每次 AI 交稿后，只需要用下面这三招去点按测试，就能做出超越 90% 业余开发者的精品应用：',
    visualCompare: {
      litTitle: '主编审阅样刊三问',
      litCode: `一问【空白情况】：如果读者搜了一个不存在的词，页面是尴尬地一片空白，还是有礼貌的提示？\n二问【超长情况】：如果填入一段五百字的长笔记，卡片会被撑变形吗？\n三问【手机情况】：拿到手机窄屏幕上，按钮会不会太小、太挤？`,
      engTitle: '对应的工程边界验收清单 (Edge Cases)',
      engCode: `- [x] 空状态 (Empty State)：搜索无结果时，显示“未找到匹配词条”及【重置筛选】按钮\n- [x] 溢出处理 (Overflow)：长文本自动折行或局部滚动，严禁撑破卡片外框\n- [x] 移动端适配 (Mobile UX)：所有按钮高度 >= 44px，手机单手大拇指轻松点按`
    },
    aiAction:
      '每次 AI 做完一个页面，把这句万能审稿令发给它：“请帮我自查并补齐三个边界体验：1.搜索无结果时的空状态提示与重置按钮；2.超长文字防撑破处理；3.手机小屏幕下的单列排版与大按钮适配。”'
  }
];

// 卷二 · 格物词典：汉语言文学 ↔ 软件工程与 AI 编程双语对照词典

export const DICTIONARY_CATEGORIES = [
  {
    id: 'all',
    name: '全部词条',
    sub: '共十六则核心映射'
  },
  {
    id: 'linguistics',
    name: '文字语法与训诂',
    sub: '对应：语法 · 变量 · 作用域 · 命名'
  },
  {
    id: 'composition',
    name: '文章与叙事学',
    sub: '对应：架构 · 模块化 · 组件 · 开源库'
  },
  {
    id: 'bibliography',
    name: '版本目录与校勘',
    sub: '对应：目录树 · Git · 调试 · 重构'
  },
  {
    id: 'rhetoric',
    name: '修辞与文体学',
    sub: '对应：JSON协议 · 系统规则 · 审稿'
  }
];

export const DICTIONARY_ENTRIES = [
  // ==================== 一、文字语法与训诂 ====================
  {
    id: 'parts-of-speech',
    category: 'linguistics',
    categoryLabel: '文字语法与训诂',
    literaryTerm: '实词（名/动）与虚词',
    classicQuote: '《马氏文通》：“凡字有事理可解者，曰实字；无解而惟以助实字之情态者，曰虚字。”',
    engTerm: '变量状态 (State) · 函数 (Function) · 控制流 (Control Flow)',
    engKeywords: ['Variable', 'Object', 'Function', 'if / else / for'],
    epiphany: '名词是“数据与状态”，动词是“函数与操作”，而之乎者也般的虚词则是控制转折与循环的“逻辑流”。',
    litPerspective:
      '汉语造句离不开三类词：名词指称万事万物（如“书生”、“诗卷”），动词描摹行为变化（如“吟诵”、“刊印”），连词介词等虚词（“若……则……”、“既……又……”）则负责把散碎的词串成严密的句意转折。',
    engPerspective:
      '任何编程语言扒开外壳，也只有这三样东西：用对象/变量（名词）存储当前的数据状态；用函数/方法（动词）对数据施加动作；用 `if/else/for`（虚词）决定哪段代码先跑、哪段代码重复跑。',
    visualCompare: {
      litTitle: '汉语句法结构拆解',
      litCode: `【名词·主宾】苏轼（人物对象）、《赤壁赋》（作品数据）\n【虚词·条件】若（if）夜游黄州赤壁，则（then）：\n【动词·谓语】撰文（createArticle）、酾酒临江（drinkWine）`,
      engTitle: 'JavaScript 代码同构映射',
      engCode: `const poet = { name: "苏轼", location: "黄州" }; // 名词：变量与对象\n\nif (poet.location === "黄州") {                 // 虚词：条件控制流\n  composeArticle(poet, "前赤壁赋");             // 动词：调用函数\n}`
    },
    aiAction:
      '向 AI 描述需求时，先列清楚你的【名词清单】（有哪些核心数据对象，如“作者、诗篇、评点”）和【动词清单】（读者能做什么动作，如“筛选、收藏、导出”），AI 就能生成极度干净的代码结构。'
  },
  {
    id: 'syntax-vs-semantics',
    category: 'linguistics',
    categoryLabel: '文字语法与训诂',
    literaryTerm: '句法合律 vs 辞意畅达（病句辨析）',
    classicQuote: '刘勰《文心雕龙·章句》：“夫人之立言，因字而生句，积句而成章，积章而成篇。”',
    engTerm: '编译语法错 (Syntax Error) vs 运行时逻辑错 (Logic Bug)',
    engKeywords: ['Syntax Error', 'TypeScript', 'Linter', 'Runtime Bug'],
    epiphany: '缺主语、错别字叫“语法报错（程序直接罢工）”；主谓宾俱全但张冠李戴叫“逻辑 Bug（程序跑偏了）”。',
    litPerspective:
      '改文章有两种毛病：第一种是硬伤，比如括号没闭合、多写了个顿号、主谓搭配不当，教书先生一眼就能拿红笔圈出来；第二种是“合乎语法的胡话”，比如“关公战秦琼”，句子本身挑不出语病，但史实逻辑全错。',
    engPerspective:
      '代码报错也分这两类：少写个括号或拼错属性名，叫 `SyntaxError` 或 `TypeError`，编辑器会直接画红波浪线（Linter）；而如果把“按年代升序”写成了“按字数升序”，代码不会报错，但结果不对，这叫业务逻辑 Bug。',
    visualCompare: {
      litTitle: '两类文章病病灶',
      litCode: `[句法硬伤 / 编译报错]：“李白在长安写下了《将进酒”（缺右书名号）\n[逻辑谬误 / 运行时Bug]：“清代诗人李白写下了《将进酒》”（句法通顺，朝代张冠李戴）`,
      engTitle: '两类代码错误对比',
      engCode: `// [SyntaxError] 缺少右括号，程序无法启动\nconsole.log("将进酒";\n\n// [Logic Bug] 语法完全合法，但把朝代赋错了值\nconst libai = { name: "李白", dynasty: "清代" };`
    },
    aiAction:
      'AI 写代码极少犯“少括号”这种低级句法错，它最常犯的是“关公战秦琼”式的逻辑错。所以你验收 AI 作品时，不必紧盯代码标点，而要像审史书一样核验业务边界与逻辑结果。'
  },
  {
    id: 'context-scope',
    category: 'linguistics',
    categoryLabel: '文字语法与训诂',
    literaryTerm: '语境、言外之意与词义界域',
    classicQuote: '王夫之《姜斋诗话》：“无论诗歌与长行文字，俱以意为主。意犹帅也。”',
    engTerm: '作用域 (Scope) 与 上下文窗口 (Context Window)',
    engKeywords: ['Global / Local Scope', 'Context Window', 'Closure'],
    epiphany: '同一个“道”字在老子与韩愈文中含义迥异，这就是变量的“局部作用域”；AI 聊久了忘掉前文，就是超出了“上下文窗口”。',
    litPerspective:
      '训诂学最重“因文定义”：同一个“信”字，在《诗经》里指信使，在《左传》里指诚信，在李白诗里指实在（“海客谈瀛洲，烟涛微茫信难求”）。脱离了当前篇章段落（局部语境），孤立谈字义必生谬误。',
    engPerspective:
      '编程中的“作用域（Scope）”同理：在 A 函数内部定义的变量 `title`（局部变量），B 函数是看不见的，互不污染；而在 AI 编程中，大模型一次能记住的字数上限叫“上下文窗口（Context Window）”，塞进太多无关杂文就会冲淡核心语境。',
    visualCompare: {
      litTitle: '语境决定词义（局部 vs 全局）',
      litCode: `【通行的字书本义（全局 Global）】“风” = 空气流动之气象\n【《诗经》章节语境（局部 Local）】“风” = 十五国风之地方民谣\n（在《诗经》篇章内谈“风”，优先取局部变量之义）`,
      engTitle: '代码作用域 (Variable Scope)',
      engCode: `const meaning = "空气流动"; // 全局变量 (Global Scope)\n\nfunction readShiJing() {\n  const meaning = "十五国风民谣"; // 局部变量 (Local Scope)\n  return meaning; // 输出："十五国风民谣"\n}`
    },
    aiAction:
      '跟 AI 开启新任务时，如果前一段对话已经聊了十几轮杂事，果断开启新会话（清空旧语境污染），只把当前要改的那两个文件 `@` 进来，保持最纯净的“局部语境”。'
  },
  {
    id: 'xungu-naming',
    category: 'linguistics',
    categoryLabel: '文字语法与训诂',
    literaryTerm: '正名与训诂辨析（顾名思义）',
    classicQuote: '《论语·子路》：“名不正则言不顺，言不顺则事不成。”',
    engTerm: '命名规范与自解释代码 (Naming Convention)',
    engKeywords: ['camelCase', 'Semantic Naming', 'Self-Documenting'],
    epiphany: '把变量起名叫 `a1`、`temp` 就像写文章通篇用“某人”、“某事”；好代码如好文章，见名即知其义。',
    litPerspective:
      '古人极重“正名”与修辞炼字：同是“看”，有瞻、仰、睨、瞰、瞥之分；同是文集，有总集、别集、单行本之别。用词精准，读者不待翻检注释便能洞察幽微。',
    engPerspective:
      '软件工程名言：“计算机科学中最难的两件事，一是缓存失效，二是给变量命名。”优秀的工程代码讲究“自解释（Self-Documenting）”——函数名用精准的动宾短语（如 `filterPoemsByDynasty`），布尔值用是非问句（如 `isRareEdition`）。',
    visualCompare: {
      litTitle: '含糊其辞 vs 炼字正名',
      litCode: `[含糊其辞]：“某甲于某年将某书做了一番处理。”\n[炼字正名]：“毛晋于崇祯年间将《六十种曲》重加雠校刊行。”`,
      engTitle: '劣质命名 vs 语义化命名',
      engCode: `// [反例] 劣质命名：半年后连作者自己都看不懂\nfunction doIt(d, t) { return d.filter(x => x.y === t); }\n\n// [正例] 语义化正名：文科生一眼也能读懂代码在干什么\nfunction filterPoemsByDynasty(poems, targetDynasty) {\n  return poems.filter(poem => poem.dynasty === targetDynasty);\n}`
    },
    aiAction:
      '你可以发挥汉语言对词汇准确度的敏感，要求 AI：“所有变量、函数与数据字段命名必须语义清晰、见名知义，严禁使用 `data1`、`temp`、`handleThing` 等敷衍命名。”'
  },

  // ==================== 二、文章与叙事学 ====================
  {
    id: 'outline-prd',
    category: 'composition',
    categoryLabel: '文章与叙事学',
    literaryTerm: '立意与谋篇大纲（起承转合）',
    classicQuote: '刘勰《文心雕龙·附会》：“必以情志为神明，事义为骨髓，辞采为肌肤，宫商为声气。”',
    engTerm: '产品需求文档 (PRD) 与 架构设计 (Architecture)',
    engKeywords: ['PRD', 'Spec-Driven Development', 'System Design'],
    epiphany: '没有作家不列大纲就动笔写百万字长篇；同理，让 AI 写代码前先共创一份“谋篇大纲（PRD）”，成功率提升十倍。',
    litPerspective:
      '无论是科举策论的“破题、承题、起讲”，还是长篇小说的“立主脑、脱线索”，高明的写作者动笔前必先立好全篇间架：写给谁看？核心立意是什么？分几卷几回？每回承载什么功能？',
    engPerspective:
      '很多初学者用 AI 编程翻车，是因为一上来就喊“帮我做个古诗词网站”。在软件工程中，动工前必先产出 PRD（需求说明书）与技术方案：目标用户是谁？有哪些核心页面？数据结构长什么样？这叫“文档驱动开发（Spec-Driven Development）”。',
    visualCompare: {
      litTitle: '《长篇叙事谋篇提纲》',
      litCode: `一、【立主脑】展现盛唐诗人群像与唱和关系\n二、【定卷目】首卷：长安舆图；次卷：诗人小传；末卷：唱和诗笺\n三、【明边界】暂不收录五代以后词作，保持体例纯粹`,
      engTitle: '工程需求规格书 (PRD / Spec)',
      engCode: `# 项目规格书 (Specification)\n- **核心目标**：盛唐诗人唱和关系交互可视化单页应用\n- **功能模块**：1. 地理分布图 2. 诗人详情抽屉 3. 唱和时间轴\n- **非目标 (Non-Goals)**：V1 版本暂不开发用户注册与评论系统`
    },
    aiAction:
      '永远把 AI 编程拆成两步走：第一步对 AI 说“我有一个想法……请先不要写代码，帮我整理一份结构化的 PRD 大纲与技术实现方案”；等你审阅改定大纲后，第二步再让它按图索骥写代码。'
  },
  {
    id: 'paragraph-modularity',
    category: 'composition',
    categoryLabel: '文章与叙事学',
    literaryTerm: '义脉分明与“一段一意”',
    classicQuote: '刘熙载《艺概·文概》：“文之段落，森然有序，似断实续，似续实断。”',
    engTerm: '模块化、高内聚低耦合与单一职责 (SRP)',
    engKeywords: ['Modularity', 'High Cohesion', 'Low Coupling', 'Single Responsibility'],
    epiphany: '一段话只讲透一层意思叫“高内聚”；改第三章的景物描写不会导致第一章的人物暴毙，就叫“低耦合”。',
    litPerspective:
      '写文章最忌“一锅粥”：在同一段里既谈杜甫生平，又夹杂唐代科举制度考证，还顺带批评明代复古派。好文章必然分段明晰——传记归传记，考证归考证，删改其中一节而全篇骨力不伤。',
    engPerspective:
      '软件工程的最高审美正是“高内聚、低耦合（High Cohesion, Low Coupling）”与“单一职责原则（SRP）”：一个文件、一个函数只干好一件事。把数据存放在 `data/`，把界面组件放在 `components/`，互不纠缠。',
    visualCompare: {
      litTitle: '芜杂合钞 vs 分卷专论',
      litCode: `[芜杂合钞]：五千字长文不分段，史料、诗评、年表混作一团，牵一发而动全身。\n[分卷专论]：《本纪》《年表》《艺文志》各司其职，修订《年表》绝不惊动《艺文志》。`,
      engTitle: '面条式代码 vs 模块化架构',
      engCode: `// [反例] 耦合巨石：一个 3000 行的 index.js 塞满数据、样式和逻辑\n\n// [正例] 模块化分治（高内聚低耦合）：\nsrc/\n  ├── data/poems.js        // 专司史料数据（艺文志）\n  ├── utils/search.js      // 专司检索算法（检字法）\n  └── components/Card.js   // 专司版面呈现（书页装帧）`
    },
    aiAction:
      '当发现 AI 把所有代码全塞进同一个文件（超过 400 行）时，立即发挥主编威严：“这个文件篇幅过于臃肿，请按单一职责原则将其拆分为独立的数据模块与视图组件。”'
  },
  {
    id: 'allusion-libraries',
    category: 'composition',
    categoryLabel: '文章与叙事学',
    literaryTerm: '用典与互文（据事以类义）',
    classicQuote: '刘勰《文心雕龙·事类》：“事类者，盖文章之外，据事以类义，援古以证今者也。”',
    engTerm: '开源库调用 (Libraries / Packages) 与 API 复用',
    engKeywords: ['import', 'npm package', 'Open Source', 'Don’t Reinvent the Wheel'],
    epiphany: '辛弃疾写“凭谁问：廉颇老矣”是用四个字调用整部《史记》；程序员写 `import dayjs` 是用一行代码调用前人千锤百炼的历法轮子。',
    litPerspective:
      '古典诗词讲究“用典”：诗人不必在七言八句里从头叙述廉颇如何战功赫赫、如何被秦人离间，只需拈出“廉颇老矣”四字，读者脑海中的《史记·廉颇蔺相如列传》便瞬间被唤醒调用，言简而意无穷。',
    engPerspective:
      '新手常以为程序员写软件是每个功能都自己从零敲代码。其实工程界有一条铁律：“不要重复造轮子（Don’t Reinvent the Wheel）”。无论是图表绘制（ECharts）、日期换算、全文检索，全球开发者早已写好了无数“典故库（Open Source Libraries）”，只需一行 `import` 即可征引。',
    visualCompare: {
      litTitle: '白描铺叙 vs 凝练用典',
      litCode: `【不善用典】自己花三百字重述战国赵将暮年思报国而遭谗言的来龙去脉……\n【高明用典】“凭谁问：廉颇老矣，尚能饭否？”（直接调用《史记》典故接口）`,
      engTitle: '手搓轮子 vs 征引开源库 (import)',
      engCode: `// [反例] 手搓轮子：自己写 500 行代码计算农历干支与节气，还容易算错闰月\n\n// [正例] 征引典故：一行 import 调用成熟开源历法库\nimport { Solar } from 'lunar-javascript';\nconst lunarDate = Solar.fromYmd(2026, 10, 25).getLunar();`
    },
    aiAction:
      '遇到复杂需求（如画人物关系网络图、解析 PDF、做简繁转换）时，先问 AI：“这个需求在业内有哪些成熟轻量的开源库可以引用（用典）？请优先使用成熟方案，不要自己从头手搓底层算法。”'
  },
  {
    id: 'cipai-components',
    category: 'composition',
    categoryLabel: '文章与叙事学',
    literaryTerm: '词牌定格与活字版模',
    classicQuote: '沈括《梦溪笔谈》：“毕昇为活板……每韵为一贴，木格贮之。”',
    engTerm: 'UI 组件化开发 (Components) 与 属性传参 (Props)',
    engKeywords: ['Component', 'Props', 'Reusable UI', 'Template'],
    epiphany: '《浣溪沙》是固定的格律组件（Component），苏轼填一套词、纳兰填一套词就是传入不同的参数（Props），格律复用而气象万千。',
    litPerspective:
      '词有“词牌”，如《西江月》规定双调五十字、平仄定格；宋代印书也有“雕版栏格”。词牌的格律框架只需制定一次，历代词人往里填入不同的意象字句，便能衍生出成千上万首新作。',
    engPerspective:
      '现代前端框架（React / Vue）的核心就是“组件化（Component）”：页面上有 100 张诗人卡片，绝不是复制粘贴 100 遍 HTML 代码，而是先雕好一个 `<PoetCard />` 模板（词牌定格），再把每位诗人的姓名、生卒年作为参数 `Props`（填词内容）传进去。',
    visualCompare: {
      litTitle: '词牌定格（组件）与填词（传参）',
      litCode: `【词牌组件：浣溪沙】平仄定格：七言×3（上片） + 七言×3（下片）\n  ├── 传入参数 A（晏殊） ──► “一曲新词酒一杯，去年天气旧亭台……”\n  └── 传入参数 B（苏轼） ──► “簌簌衣巾落枣花，村南村北响缲车……”`,
      engTitle: 'UI 组件定义与 Props 复用',
      engCode: `// 1. 定义一次“词牌定格”组件\nfunction PoetCard({ name, dynasty, quote }) {\n  return <div class="card"><h3>{name} ({dynasty})</h3><p>{quote}</p></div>;\n}\n// 2. 填入不同参数 (Props) 复用百次\n<PoetCard name="晏殊" dynasty="北宋" quote="无可奈何花落去" />\n<PoetCard name="苏轼" dynasty="北宋" quote="一蓑烟雨任平生" />`
    },
    aiAction:
      '当页面中出现重复的卡片、列表项或弹窗时，告诉 AI：“请将这部分抽象为可复用的独立组件（如 `BookCard`），通过传参（Props）渲染不同数据，方便日后统一调整版式。”'
  },

  // ==================== 三、版本目录与校勘学 ====================
  {
    id: 'cataloging-tree',
    category: 'bibliography',
    categoryLabel: '版本目录与校勘',
    literaryTerm: '目录学（辨章学术，考镜源流）',
    classicQuote: '王鸣盛《十七史商榷》：“目录之学，学中第一紧要事，必从此问涂，方能得其门而入。”',
    engTerm: '项目文件目录树 (Folder Structure) 与 路由 (Routing)',
    engKeywords: ['Directory Tree', 'File Architecture', 'URL Routing'],
    epiphany: '治学先懂《四库》经史子集四部分类，接手软件项目先看文件夹目录树（`src/data`、`src/components`），此即“辨章学术”。',
    litPerspective:
      '从刘向《别录》到纪昀《四库全书总目》，汉语言学者面对浩如烟海的典籍从不盲目乱读，而是先看总目提要，明晰何书入经部、何书入集部。目录清楚，则百代学术源流了然于胸。',
    engPerspective:
      '文科生打开一个代码仓库最怕看到几十个英文文件夹不知从何下手。其实工程目录树就是“四库分类法”：`package.json` 是《总目提要》，`src/data` 是《史料库》，`src/components` 是《版式活字库》，`src/styles` 是《装帧设色谱》。',
    visualCompare: {
      litTitle: '《四库全书》四部分类架阁',
      litCode: `四库总目 (Root)\n ├── 经部（常道纲领） ──► 核心配置与全局凡例\n ├── 史部（实录史料） ──► 静态词条与业务数据\n ├── 子部（百工技艺） ──► 工具函数与算法逻辑\n └── 集部（辞章华采） ──► 页面组件与视觉样式`,
      engTitle: '现代软件工程标准目录树',
      engCode: `project-root/\n ├── package.json       // 《总目提要》：书名、依赖典故库、启动口令\n ├── index.html         // 《书衣封面》：网页总入口\n └── src/\n      ├── data/         // 【史部】纯粹的数据与文案词条\n      ├── utils/        // 【子部】检索、排序等工具函数\n      ├── components/   // 【集部】页面视图与交互组件\n      └── styles/       // 【集部】色彩与排版样式表`
    },
    aiAction:
      '接手任何项目或让 AI 创建项目时，第一句话先问：“请用目录树的形式向我介绍本项目的文件夹结构，并解释每个目录对应承载什么职责。”'
  },
  {
    id: 'textual-criticism-git',
    category: 'bibliography',
    categoryLabel: '版本目录与校勘',
    literaryTerm: '善本源流、底本与异文汇校',
    classicQuote: '顾广圻《思适斋文集》：“校书如扫落叶，旋扫旋生。”',
    engTerm: 'Git 版本控制（Commit · Branch · Diff · Merge）',
    engKeywords: ['Git Commit', 'Branch', 'Git Diff', 'Revert'],
    epiphany: '`main` 主分支是“内府定本”，新建 `branch` 是“另抄副本试改”，`git diff` 是“红绿异文比勘”，改砸了一秒恢复善本。',
    litPerspective:
      '版本学家研究一部古籍，最重“底本”与“校本”：以最可靠的宋刻本为底本（主线），参校明抄本、清活字本（各分支），用朱笔注出何处增一字、何处删一句（异文比对），最终汇合成博采众长的“定本”。',
    engPerspective:
      'Git 正是程序员的数字版本学工具：你永远不需要把文件夹复制成 `项目_v1`、`项目_v2_最终版`。每次阶段性完工就 `git commit`（盖藏书印留存底本快照）；想让 AI 尝试激进改版就开个 `branch`（别本），满意则 `merge`（汇校合流），不满意则直接废除别本。',
    visualCompare: {
      litTitle: '古籍版本源流与朱墨对校',
      litCode: `【底本原文】“落霞与孤鹜齐飞，秋水共长天一色。”\n【异文比勘】\n  - 某妄改本：落霞与孤雁齐飞（朱笔批：误，据宋本删）\n  + 善本定稿：落霞与孤鹜齐飞（墨笔存真）`,
      engTitle: 'Git Diff 异文比对视图',
      engCode: `@@ -12,3 +12,3 @@ src/data/poems.js\n- const line = "落霞与孤雁齐飞"; // 红色减号：被删去的旧文\n+ const line = "落霞与孤鹜齐飞"; // 绿色加号：新订正的善本`
    },
    aiAction:
      '养成“每成一功，必落一印”的习惯：每当 AI 帮你调通了一个满意的小功能，立刻让它执行 `git commit` 保存善本；这样就算下一步 AI 把代码改崩了，你也能谈笑间退回完好状态。'
  },
  {
    id: 'four-collations-debug',
    category: 'bibliography',
    categoryLabel: '版本目录与校勘',
    literaryTerm: '陈垣“校勘四法”（对校·本校·他校·理校）',
    classicQuote: '陈垣《校勘学释例》：“校法四例：一曰对校法，二曰本校法，三曰他校法，四曰理校法。”',
    engTerm: 'Debug 调试与排错四步法',
    engKeywords: ['Debugging', 'Console Log', 'Diff Check', 'Stack Trace'],
    epiphany: '千年前校书先生捉拿“鲁鱼亥豕”的四套绝学，竟与今日顶尖工程师排查软件 Bug 的思维路径分毫不差！',
    litPerspective:
      '陈垣先生总结校勘古籍四大名法：1.**对校法**（拿祖本与今本逐字对照）；2.**本校法**（以本书前后文互证，看是否自相矛盾）；3.**他校法**（引证其他典籍或类书）；4.**理校法**（无古本可据时，依文字音韵与义理逻辑推演勘误）。',
    engPerspective:
      '程序出 Bug 时，工程师也是用这四招：1.**对校法**（用 `git diff` 对比报错前后的代码差异，看刚改坏了哪行）；2.**本校法**（打印 `console.log` 检查数据在上下文传递中是否前后不一致）；3.**他校法**（查阅官方文档或标准报错码说明）；4.**理校法**（顺着执行逻辑推演边界条件）。',
    visualCompare: {
      litTitle: '《元典章》校勘四法实战',
      litCode: `1. 对校：比对元刻本与明抄本，抓出抄漏之行\n2. 本校：前卷作“至元十年”，后卷作“至元廿年”，前后互证知其必有一误\n3. 他校：参稽《元史·百官志》核定官名\n4. 理校：据历法推算该年闰月，断定干支讹误`,
      engTitle: '软件工程 Debug 四步法',
      engCode: `1. 对校 (Git Diff)：查看刚刚那次修改动了哪几行代码\n2. 本校 (Console.log)：在函数入口与出口打印变量，看数据在哪一步变形\n3. 他校 (Docs/StackTrace)：把红色报错信息原样查验文档或发给 AI\n4. 理校 (Rubber Duck)：让 AI 逐行复述代码执行逻辑，揪出条件漏判`
    },
    aiAction:
      '遇到 Bug 千万别只对 AI 喊一句“坏了，没用！”。用校勘法给 AI 提供线索：“【本校】我点击了 A 按钮，期望出现 B，实际却出现了 C；【他校】浏览器控制台报错信息如下……请先用理校法分析原因，再动手修改。”'
  },
  {
    id: 'polishing-refactoring',
    category: 'bibliography',
    categoryLabel: '版本目录与校勘',
    literaryTerm: '文章润色与“删繁就简”',
    classicQuote: '刘知几《史通·叙事》：“夫国史之美者，以叙事为工；而叙事之工者，以简要为主。”',
    engTerm: '代码重构 (Refactoring) 与 技术债清理',
    engKeywords: ['Refactoring', 'DRY Principle', 'Clean Code', 'Technical Debt'],
    epiphany: '“删繁就简三秋树”——不改变文章原本要表达的史实与立意，只把啰嗦重复的词句修剪得干净利落，这就叫“代码重构”。',
    litPerspective:
      '初稿往往泥沙俱下、枝蔓横生。欧阳修撰《新五代史》、作《醉翁亭记》，初稿写滁州四面有山用了几十个字，最后尽数删去，只留“环滁皆山也”五字——事实分毫未变，而文气顿时清健百倍。',
    engPerspective:
      '在 AI 辅助编程中，经过几轮修修补补，代码里常会攒下很多重复逻辑、废弃变量（这叫“技术债 Technical Debt”）。每隔一个阶段做一次“重构（Refactoring）”：规定**外在功能表现分毫不变**，仅提炼公共函数、合并重复代码、理顺目录，让系统重归轻盈。',
    visualCompare: {
      litTitle: '欧阳修润色《醉翁亭记》',
      litCode: `【初稿枝蔓】“滁州之西南，泉水之涯，欧阳公作州之二年，构亭曰丰乐，东山南山北山皆环绕之……”（表意虽通，文气冗沓）\n【重构定稿】“环滁皆山也。”（功能语义不变，结构极尽凝练）`,
      engTitle: '代码重构 (Refactoring)',
      engCode: `// [初稿] 三处重复写同样的朝代筛选逻辑（冗沓枝蔓）\n\n// [重构后] 提炼为五字箴言般的通用函数，外在行为完全不变\nconst byDynasty = (list, d) => list.filter(item => item.dynasty === d);`
    },
    aiAction:
      '当你的小工具已经能正常运行，但想继续加新功能前，可以先对 AI 下达一道“润色令”：“请在不改变任何现有页面功能与视觉效果的前提下，对当前代码进行重构（Refactoring），消除重复代码并理顺结构。”'
  },

  // ==================== 四、修辞与文体学 ====================
  {
    id: 'prosody-json',
    category: 'rhetoric',
    categoryLabel: '修辞与文体学',
    literaryTerm: '律诗格律与公文程式（六部题本）',
    classicQuote: '元稹《唐故工部员外郎杜君墓系铭》：“铺陈终始，排比声韵……属对律切，而脱弃凡近。”',
    engTerm: '结构化数据协议 (JSON Schema / 接口契约)',
    engKeywords: ['JSON', 'Schema', 'Structured Output', 'Type Contract'],
    epiphany: '散文可以散漫无拘，但格律诗与奏折必须字字入格、对仗工整；让 AI 或程序之间交换数据，必须用“JSON 格律”。',
    litPerspective:
      '文体有散体与骈律之分：写私人随笔大可信马由缰；但若是朝廷户部报销钱粮的“黄册”，或是近体七律，则何处填数字、何处对平仄、何处盖骑缝章，差半个字便算违制，无法汇入总册。',
    engPerspective:
      '自然语言（散文）虽然生动，但程序代码无法直接用散文做筛选和画图。因此软件工程发明了 `JSON`（一种由花括号 `{}` 与方括号 `[]` 组成的严谨格律）：规定每条记录必须包含相同的字段名（Key）和数据类型（Value），从而让程序能批量检索与渲染。',
    visualCompare: {
      litTitle: '散漫随笔 vs 严整黄册格眼',
      litCode: `【散体随笔（难做程序筛选）】“子瞻在密州时写过一首江城子，那是乙卯年正月二十日夜里记梦之作……”\n【黄册格眼（结构化表格）】撰人：苏轼 | 词牌：江城子 | 纪年：1075 | 主题：记梦悼亡`,
      engTitle: '自然语言 vs JSON 结构化协议',
      engCode: `{\n  "author": "苏轼",\n  "cipai": "江城子",\n  "year": 1075,\n  "tags": ["密州", "记梦", "悼亡"],\n  "isClassic": true\n}`
    },
    aiAction:
      '如果你想用 AI 批量整理古籍文献或生成网站词条，千万别让它直接输出一篇散文，而是命令它：“请严格按照以下 JSON Schema（格眼体例）输出数据，包含 `title`、`author`、`tags` 三个字段，以便程序直接渲染。”'
  },
  {
    id: 'fanli-system-prompt',
    category: 'rhetoric',
    categoryLabel: '修辞与文体学',
    literaryTerm: '书前《凡例》与编纂体例',
    classicQuote: '章学诚《文史通义·书教》：“古人著书，必有凡例，所以明一书之体要也。”',
    engTerm: '全局系统规则 (`CLAUDE.md` / `.cursorrules` / System Prompt)',
    engKeywords: ['System Prompt', 'CLAUDE.md', '.cursorrules', 'Coding Standards'],
    epiphany: '一部大书开卷必立《凡例》十条，规定全书称谓、避讳与引书体式；项目根目录下的 `CLAUDE.md` 就是给 AI 幕僚立的《修书凡例》。',
    litPerspective:
      '翻开《四库全书》或任何一部严谨的古籍整理著作，正文之前必有一篇《凡例》：说明本书以何本为底本、异体字如何处理、纪年采用何种体式、何种史料不予收录。有了《凡例》，数十位纂修官才能如出一人之手。',
    engPerspective:
      '为什么有时候 AI 写着写着风格就变了，或者总是犯同一个错误？因为你没有在项目根目录立一份《凡例》（如 `CLAUDE.md` 或 `.cursorrules`）。只要把项目的技术栈、目录规矩、视觉配色、禁止事项写进这份文件，AI 每次动笔前都会自动先读一遍《凡例》。',
    visualCompare: {
      litTitle: '《点校本二十四史·修书凡例》',
      litCode: `一、凡底本明显讹字，径改并出校记。\n二、凡人名用专名号（下加横线），书名用波浪线。\n三、凡纪年一律夹注公元纪年，不得前后歧出。`,
      engTitle: '项目根目录 CLAUDE.md / .cursorrules',
      engCode: `# 《文心雕码》项目修书凡例\n1. 视觉风格：坚持新中式宣纸暖白 (#FAF7F2) 与朱砂红 (#B83B2B)，禁用刺眼荧光色。\n2. 架构纪律：所有词条数据必须存入 src/data/，严禁在组件内硬编码大段文案。\n3. 校勘规矩：每次修改前先说明改动范围，保持高内聚低耦合。`
    },
    aiAction:
      '开启任何一个稍微正式的项目时，第一件事就是让 AI 帮你在根目录生成一份 `CLAUDE.md`（或 `.cursorrules`）《修书凡例》，把你的审美偏好与架构铁律固化下来。'
  },
  {
    id: 'commentary-comments',
    category: 'rhetoric',
    categoryLabel: '修辞与文体学',
    literaryTerm: '传注、眉批与双行夹注',
    classicQuote: '孔颖达《毛诗正义》：“注者，著也，言为之解说，使其义著明也。”',
    engTerm: '代码注释 (Comments) 与 文档字符串 (JSDoc)',
    engKeywords: ['Code Comments', 'JSDoc', 'README.md', 'Why not What'],
    epiphany: '好的夹注不啰嗦字面意思，而是点破“作者为何在此处用典”；好的代码注释也不复述语法，而是写清“当时的业务考量”。',
    litPerspective:
      '古籍中有毛传、郑笺、孔颖达疏，还有金圣叹、脂砚斋的“眉批”与“双行夹注”。高明的批注绝不会在“吃饭”二字下注解“用嘴咀嚼米饭”，而是点明：“此处看似闲笔叙家常，实为后文风波埋下伏笔”——注其“所以然”。',
    engPerspective:
      '代码中的 `// 注释` 与 `/** JSDoc */` 就像古籍夹注，程序运行时会自动忽略它们，但它们是写给“未来的你”和“下一轮接手的 AI”看的。让 AI 在关键函数旁用中文写明业务意图，你就永远不会对代码感到陌生。',
    visualCompare: {
      litTitle: '脂砚斋《红楼梦》双行夹注',
      litCode: `正文：忽见那厢来了一僧一道，生得骨格不凡。\n【甲戌侧批：此系全书总纲人物，专司点化迷津，非寻常游方僧道可比。】`,
      engTitle: '高质量中文代码夹注 (JSDoc)',
      engCode: `/**\n * 【总纲检索函数】按朝代与关键词双重过滤词条\n * 注：此处采用大小写不敏感匹配，以兼容英文术语检索\n */\nexport function filterEntries(entries, category, keyword) { ... }`
    },
    aiAction:
      '你可以理直气壮地向 AI 提出要求：“我是一名汉语言文学背景的创作者，请在生成关键逻辑函数时，为我附上简明扼要的【中文夹注（JSDoc）】，说明该函数的作用与参数含义。”'
  },
  {
    id: 'chief-editor-review',
    category: 'rhetoric',
    categoryLabel: '修辞与文体学',
    literaryTerm: '总纂官审稿与覆校签发',
    classicQuote: '欧阳修《归田录》：“文章不厌百回改，反复涂乙，终至善境。”',
    engTerm: '代码审阅 (Code Review) 与 验收测试 (Acceptance Test)',
    engKeywords: ['Code Review', 'Acceptance Criteria', 'Edge Cases'],
    epiphany: '不用亲手砌砖也能验收亭台楼阁是否漏雨；文科生不背语法，照样能用“边界拷问法”做最严苛的总纂审稿官。',
    litPerspective:
      '清代修书局里，纂修官交上初稿后，总纂官如何审稿？一看《体例》是否合乎凡例；二看《引文》有无孤证妄断；三看《极端情形》（如遇到生僻字、缺页残卷时如何处理）。',
    engPerspective:
      '很多文科同学问：“我不懂代码细节，怎么检查 AI 写得好不好？”答案是做**验收测试（Acceptance Test）与边界审阅（Edge Case Review）**：当用户什么都没输入就点搜索会怎样（空状态）？当文字长达一万字会撑破卡片吗（溢出状态）？手机小屏幕上字会挤在一起吗（响应式状态）？',
    visualCompare: {
      litTitle: '《总纂官覆校三问》',
      litCode: `一问（常例）：寻常词条展现是否端庄清朗？\n二问（阙文）：若某诗人“生卒年不详”或“查无此诗”，版面是否留有得体阙文提示？\n三问（长卷）：若遇《长恨歌》千字长篇，卷轴能否从容舒展而不溢出版框？`,
      engTitle: '软件工程验收测试清单 (Edge Cases)',
      engCode: `- [x] Happy Path：正常输入“苏轼”，准确展示词条卡片\n- [x] Empty State：搜索“外星人”无结果时，展示典雅的“未寻得此卷”空状态提示\n- [x] Overflow：超长文本自动折行或滚动，不破坏卡片网格布局`
    },
    aiAction:
      '每次 AI 交稿后，用“总纂三问”拷问它：“如果用户搜索不到结果（空状态）、或者输入超长文字（极端情况）、或者在窄屏幕上浏览，当前页面有做妥善处理吗？请帮我补齐这些边界体验。”'
  }
];

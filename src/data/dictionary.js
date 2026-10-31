// 02 · 概念词典：用《现代汉语》、写作学与写论文日常，秒懂软件工程核心概念
// 词条总数与分类计数由界面从 DICTIONARY_ENTRIES 派生，勿在文案里写死数字。
// 引文约定：带引号者为可核对的原文；标注“（大意）”“（示意）”或“常识”者为概括转述，并非原文。

export const DICTIONARY_CATEGORIES = [
  {
    id: 'all',
    name: '全部词条',
    sub: '核心概念一览'
  },
  {
    id: 'linguistics',
    name: '现代汉语·语法篇',
    sub: '主谓宾 · 复句 · 改病句 · 指代 · 异步'
  },
  {
    id: 'composition',
    name: '写作学·谋篇布局',
    sub: '底本与版式 · 提纲 · 分段 · 活字与词牌'
  },
  {
    id: 'bibliography',
    name: '论文写作·改稿篇',
    sub: '文件夹 · 版本存档 · 引用 · 删繁'
  },
  {
    id: 'rhetoric',
    name: 'AI 沟通·审稿篇',
    sub: '体例规范 · 填表格 · 注释 · 密钥 · 验收'
  }
];

export const DICTIONARY_ENTRIES = [
  // ==================== 一、现代汉语·语法篇 ====================
  {
    id: 'parts-of-speech',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '主谓宾定状补（句子成分）',
    classicQuote: '黄伯荣、廖序东《现代汉语》句子成分分析（大意）：主语、谓语、宾语构成句子的主干，定语、状语、补语是附加在主干上的成分。',
    engTerm: '对象 (Object) · 函数/方法 (Function) · 参数 (Args)',
    engKeywords: ['Object', 'Method', 'Property', 'Arguments'],
    epiphany: '谓语动词是“函数”，主语是“执行这个函数的对象”，宾语是函数的“主要参数”，状语是附加的“可选参数”，定语则是名词身上的“属性”。',
    litPerspective:
      '汉语言文学大一必修的《现代汉语》句子成分分析：比如“（已登录的）读者【按小说分类】收藏了《活着》”。“读者”是主语，“收藏”是谓语动词，“《活着》”是宾语，“已登录的”修饰名词（定语），“按小说分类”限制动作的方式（状语）。',
    engPerspective:
      '写程序的底层逻辑跟造句非常像：先定义有哪些名词对象（`reader` 读者、`book` 图书）以及它们的定语属性（`reader.isLoggedIn = true`）；再让主语去执行动词，把宾语和状语作为参数交给它：`reader.collect(book, { category: "小说" })`——主、谓、宾、状在一行代码里一一对应。',
    visualCompare: {
      litTitle: '现代汉语句子成分划分',
      litCode: `【主语】读者 (reader)\n【定语】已登录的 (reader.isLoggedIn = true)\n【谓语】收藏 (collect)\n【宾语】《活着》(book)\n【状语】按小说分类 ({ category: "小说" })`,
      engTitle: '对应的 JavaScript 代码',
      engCode: `// 名词 + 定语（属性）
const reader = { name: "小林", isLoggedIn: true }; // collect 是读者对象的“动作”（方法）
const book = { title: "活着" };

// 主语.谓语(宾语, { 状语 })
reader.collect(book, { category: "小说" });`
    },
    aiAction:
      '向 AI 提需求时，先用“主谓宾法”帮它理清主干：先列出你的项目里有哪些【核心名词】（比如：文章、作者、评论），再列出用户能对它们做哪些【核心动词】（比如：搜索、筛选、导出），最后补上状语（按什么条件、以什么顺序）。AI 写出来的代码结构会清晰得多。'
  },
  {
    id: 'compound-sentences',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '关联词与复句（如果…就… / 每当…就… / 每一…都…）',
    classicQuote: '黄伯荣、廖序东《现代汉语》：“复句是由两个或两个以上意义上相关、结构上互不作句子成分的分句加上贯通全句的句调构成的。”',
    engTerm: '条件分支 (if / else) · 事件监听 (onClick) · 循环遍历 (map)',
    engKeywords: ['if / else', 'addEventListener', 'Array.map', 'Control Flow'],
    epiphany: '假设复句“如果……就……否则……”就是代码里的 `if / else`；“每当……就……”是事件监听（每当用户点击，就执行一段代码）；“每一本……都……”是 `map` 循环。',
    litPerspective:
      '我们写文章离不开关联词：表示假设写“如果明天不下雨，我们就去踏青，否则就待在图书馆”；表示反复发生写“每当铃声响起，他就合上书”；表示逐一处理写“书架上的每一本书都要贴上分类标签”。汉语复句也常常省略关联词，靠语义“意合”（如“下雨，不去了”）——人读得懂，程序却读不懂：代码里的每一层逻辑都必须明确写出“关联词”。',
    engPerspective:
      '很多文科生觉得程序的“算法逻辑”很神秘，其实日常网页代码里的大部分逻辑就是这三种句式：用 `if (...) { ... } else { ... }` 做条件判断；用 `button.addEventListener("click", ...)` 表示“每当被点击，就……”；用 `books.map(...)` 把列表里的每一项批量变成页面上的卡片。',
    visualCompare: {
      litTitle: '汉语复句逻辑',
      litCode: `1. 【假设复句】如果搜索框为空，就提示“请输入关键词”；否则开始检索。\n2. 【条件反复】每当读者点击“搜索”按钮，就执行一次检索。\n3. 【周遍句】书单里的每一本书，都生成一张带书名和作者的卡片。`,
      engTitle: '代码里的条件、事件与循环',
      engCode: `// 1. 如果……就……否则…… (if / else)
if (keyword === "") {
  alert("请输入关键词");
} else {
  searchBooks(keyword);
}

// 2. 每当……就…… (事件监听)
searchBtn.addEventListener("click", () => searchBooks(keyword));

// 3. 每一……都…… (map 循环)
books.map(book => <Card title={book.title} />);`
    },
    aiAction:
      '跟 AI 描述交互规则时，不要“意合”省略条件，多用“如果 A，就 B；否则 C”“每当 X，就 Y”的完整复句。比如：“如果用户搜索不到结果，就显示‘暂无匹配文章’并提供重置按钮；否则正常显示卡片列表。每当用户切换分类，就清空搜索框。”'
  },
  {
    id: 'syntax-vs-semantics',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '改病句：硬伤、指代不明与逻辑歧义',
    classicQuote: '吕叔湘、朱德熙《语法修辞讲话》的基本主张（大意）：句子不仅要合乎语法，还要合乎事理、意思明确，否则同样是病句。',
    engTerm: '语法错误 (Syntax Error) · 运行时错误 (Runtime Error) · 逻辑错误 (Logic Bug)',
    engKeywords: ['Syntax Error', 'ReferenceError', 'Logic Bug', 'Ambiguity'],
    epiphany: '少写了半边括号是“语法错误”（程序直接罢工）；用了一个没交代过的“他”是“运行时错误”（跑到这一句才报错）；像“咬死了猎人的狗”这种合乎语法却有两种理解的句子，对应“逻辑 Bug”（程序照跑，结果不对）。',
    litPerspective:
      '改文章常见三种错：第一种是硬伤，比如书名号只写了一半“《活着”，校对一眼就能圈出来；第二种是指代不明，句子本身通顺，可读到“他”时前文根本没出现过这个人；第三种是逻辑歧义，比如“三个学校的老师来开会”（是“三所学校”还是“三位老师”？），字面挑不出语病，读者却理解歪了。',
    engPerspective:
      '程序也有对应的三种错：少了括号的 `SyntaxError`，程序根本启动不了；用了一个从没定义过的变量，运行到这一行时报 `ReferenceError`（相当于“他”找不到指代对象）；最隐蔽的是“逻辑 Bug”——程序不报任何错，结果却不是你要的。AI 很少犯第一种低级错误；AI 编程翻车，最常见的原因恰恰是提示词有歧义，让 AI 写出了语法完全正确、效果却和你想的不一样的代码。',
    visualCompare: {
      litTitle: '三种病句对比',
      litCode: `[语法硬伤]：“余华写下了《活着”（缺右书名号，一眼可见）\n[指代不明]：“他随后又写了《许三观卖血记》”（前文从未交代“他”是谁）\n[逻辑歧义]：“请按时间排序”（按作家出生时间还是图书出版时间？升序还是降序？）`,
      engTitle: '三种代码错误对比',
      engCode: `// [SyntaxError] 少了右括号，程序直接无法启动
console.log("活着";

// [ReferenceError] author 从未定义，运行到这一行才报错
console.log(author.name);

// [Logic Bug] 不报错，但把“最新出版排前面”写成了“最旧排前面”
books.sort((a, b) => a.year - b.year);`
    },
    aiAction:
      '像做《现代汉语》“消除歧义”练习一样检查你发给 AI 的话：凡是说到“排序、筛选、删除、好看”，一定补齐定语和状语（比如“按出版年份从新到旧降序排列”），不给 AI 留任何猜谜空间。'
  },
  {
    id: 'async-await',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '预约调阅善本：先拿号牌，不必干站窗口',
    classicQuote: '闭架图书馆常见规程（示意）：善本须预约调阅；读者先取号牌离开，馆员从书库调出后再通知领取——不必一直堵在借阅台前。',
    engTerm: '异步与等待 (async / await · Promise)',
    engKeywords: ['async', 'await', 'Promise', 'fetch', '非阻塞'],
    epiphany: '调阅善本不能干站着等：先递索书单拿号牌（发起异步请求），期间可以去别的展柜看书；馆员调出后再来取（`await` 等到结果）。网页接大模型 API 也是同一套节奏——数据还没回来就当已经拿到，页面就会先报错。',
    litPerspective:
      '如果善本要去地库调，你却一直站在借阅台窗口堵住后面的人，整座图书馆都会卡住。正确做法是：填好预约单，拿走号牌，先去阅览大厅做别的事；书调上来了再回来取。这就是“非阻塞”：一件事在后台进行时，前台不必原地死等。',
    engPerspective:
      '浏览器向服务器要数据（`fetch`）、调用大模型 API，都不会立刻返回结果。用 `async/await` 写明“先发出请求，等到有结果再继续”，程序才不会在数据还是空的时候就去读它。常见翻车是：忘了 `await`，把“还在路上的索书单”当成“已经到手的书”。',
    visualCompare: {
      litTitle: '闭架调阅善本的节奏',
      litCode: `1. 读者递上预约单，拿走号牌（请求已发出）。\n2. 读者去展柜继续看书（界面不卡死）。\n3. 馆员通知“书已调出”，读者再来取（拿到结果后继续）。`,
      engTitle: '对应的 async / await',
      engCode: `async function loadSummary(text) {
  // 先发出请求；await 表示“等回条到了再往下走”
  const res = await fetch("/api/summarize", {
    method: "POST",
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  showOnPage(data.summary);
}`
    },
    aiAction:
      '凡是“要等服务器/大模型返回结果再显示”的功能，对 AI 明确说：“请用 async/await 处理网络请求；在数据返回前显示加载提示，失败时给出中文错误信息，不要在结果未到时就渲染内容。”'
  },
  {
    id: 'context-scope',
    category: 'linguistics',
    categoryLabel: '现代汉语·语法篇',
    literaryTerm: '语境与指代（“本村”“他”指的是谁？）',
    classicQuote: '陈望道《修辞学发凡》：“修辞以适应题旨情境为第一义。”',
    engTerm: '变量作用域 (Scope) · AI 上下文窗口 (Context Window)',
    engKeywords: ['Local Scope', 'Global Scope', 'Context Window'],
    epiphany: '“本村”在《祝福》里指鲁镇，在《边城》里指茶峒——同一个名字在不同篇章里指代不同对象，就是代码里的“局部作用域”；跟 AI 聊太久它忘了最开始的要求，是因为装满了它的“上下文窗口”。',
    litPerspective:
      '语言学非常重视语境：“本村”“这里”“他”这类指示词和代词本身没有固定所指，必须回到所在的篇章里去找。把《祝福》和《边城》编进同一本现代小说选，《祝福》里的“本村”是鲁镇，《边城》里的“本村”是茶峒，各篇内部自洽、互不干扰；而扉页上的“本社”在每一篇里都指同一家出版社。',
    engPerspective:
      '在代码里，A 函数内部定义的变量（局部变量 `Local Scope`）只在 A 函数内部有效，不会污染外面的同名变量；写在最外层的变量（全局变量）则处处可用。而在跟 AI 对话时，AI 一次能“看到”的对话总量叫“上下文窗口（`Context Window`）”，聊得太杂太长，前面的重点就会被挤出记忆区。',
    visualCompare: {
      litTitle: '篇章语境边界',
      litCode: `【全书通用（全局 Global）】本社 = 人民文学出版社\n【《祝福》篇内（局部 Local）】本村 = 鲁镇\n【《边城》篇内（局部 Local）】本村 = 茶峒`,
      engTitle: '代码里的全局与局部作用域',
      engCode: `const publisher = "人民文学出版社"; // 全局变量，处处可用

function zhufu() {
  const village = "鲁镇"; // 局部变量，只在《祝福》内生效
}
function biancheng() {
  const village = "茶峒"; // 与《祝福》里的 village 互不冲突
}`
    },
    aiAction:
      '当你让 AI 修完一个功能、准备开发下一个完全不同的功能时，最聪明的做法是**新开一个对话窗口（清空旧语境干扰）**，只把当前要改的那一两个文件发给它。'
  },

  // ==================== 二、写作学·谋篇布局 ====================
  {
    id: 'content-vs-form',
    category: 'composition',
    categoryLabel: '写作学·谋篇布局',
    literaryTerm: '同一底本，不同版式（文字与排印分开）',
    classicQuote: '版本学常识：同一部书可以有刻本、活字本、影印本、排印本等多种版本——底本文字是一份，版式可以有很多种。',
    engTerm: '数据层 (Data) 与 视图层 (UI View) 分离',
    engKeywords: ['Separation of Concerns', 'Data vs View', 'JSON'],
    epiphany: '永远要求 AI 把“文字资料（底本）”和“网页排版（版式）”分成两个独立文件放——改错别字不用碰排版，换皮肤不会弄丢文章！',
    litPerspective:
      '同一篇《祝福》的文字底本，既可以排成横排简体的中学课本，也可以排成竖排繁体的线装书。需要说明的是：文学理论讲“内容与形式辩证统一”，在艺术创作里形式本身参与意义的生成；但在工程上，我们恰恰要把“文字资料”和“排版代码”刻意分开存放——就像出版社把校定的底本和排版文件分开保管，校对文字时不碰版面，改版面时不丢文字。',
    engPerspective:
      '新手用 AI 写网页最容易踩的坑，就是让 AI 把几十段文章内容直接和 HTML 排版标签混写在一起（硬编码 Hardcode）。一旦你想改个字，就得在几百行代码符号里大海捞针。工程上的铁律是：**数据归 `src/data/`，界面归 `src/components/`（或 `src/views/`）**。',
    visualCompare: {
      litTitle: '文字与版式混排 vs 分开',
      litCode: `[混排难改]：文字和字号颜色搅在一起，想改一个人名得翻遍所有排版框。\n[底本与版式分开]：一份纯文字底本《人物资料.json》 + 一套独立的版式模板。`,
      engTitle: '数据文件与界面组件分离',
      engCode: `// 1. src/data/books.js（只放纯粹的文字内容，文科生随时可直接改字）
export const BOOKS = [{ title: "活着", author: "余华" }];

// 2. src/App.js（只管怎么排版渲染）
import { BOOKS } from './data/books.js';`
    },
    aiAction:
      '在任何项目开工前，给 AI 下达死命令：“请实行数据与视图分离，所有文章、词条、配置文案一律单独存放在 `src/data/` 文件夹下，不要把大段文字直接写死在界面代码里。”'
  },
  {
    id: 'outline-prd',
    category: 'composition',
    categoryLabel: '写作学·谋篇布局',
    literaryTerm: '动笔前列“写作提纲”（立主脑）',
    classicQuote: '李渔《闲情偶寄·词曲部·结构第一》：“袖手于前，始能疾书于后。”',
    engTerm: '产品需求文档 (PRD) 与 架构设计',
    engKeywords: ['PRD', 'Spec-Driven', 'System Architecture'],
    epiphany: '写万字论文不列提纲容易跑题；让 AI 写代码前，先让它给你列一份“功能与页面提纲（PRD）”，返工会少得多。',
    litPerspective:
      '李渔论戏曲结构讲“立主脑”：先定一部戏的中心，再安排枝节。无论是写毕业论文还是长篇小说，好的提纲都会写清：中心论点是什么？分几个章节？每一章讲哪几个要点？哪些内容这次不写？',
    engPerspective:
      '很多人抱怨“AI 写出来的东西根本不是我想要的”，因为他们一上来只发了一句“帮我做个读书网站”。在软件工程里，动工前要先写 **PRD（产品需求说明书）**：包含几个页面？每张卡片展示哪几个字段？点按钮后发生什么？这次不做什么？',
    visualCompare: {
      litTitle: '《学年论文写作三级提纲》',
      litCode: `一、核心论题：鲁迅杂文的修辞特征\n二、章节划分：1. 反语与讽刺  2. 类型化的比喻（如“叭儿狗”）  3. 曲笔与隐喻\n三、边界说明：本文只讨论《坟》《热风》《华盖集》等杂文集，不涉及《呐喊》《彷徨》等小说。`,
      engTitle: '发给 AI 的工程提纲 (PRD Spec)',
      engCode: `# 项目需求提纲 (PRD)
1. 核心目标：现代作家读书笔记卡片站（优先适配手机端）
2. 页面模块：顶栏搜索框 + 分类标签条 + 笔记卡片列表 + 底部详情弹窗
3. 本次不做：暂不需要做复杂的账号注册登录功能`
    },
    aiAction:
      '永远把 AI 编程分成两步走：第一步先对 AI 说“我打算做个……请【先不要写代码】，帮我梳理一份简明的功能模块提纲、数据结构和目录规划”；等你看完点头了，第二步再让它写代码。'
  },
  {
    id: 'paragraph-modularity',
    category: 'composition',
    categoryLabel: '写作学·谋篇布局',
    literaryTerm: '分段原则：“一段只讲一层意思”',
    classicQuote: '刘勰《文心雕龙·章句》：“章者，明也；句者，局也。局言者，联字以分疆；明情者，总义以包体。”',
    engTerm: '模块化 · 高内聚低耦合 · 单一职责 (SRP)',
    engKeywords: ['Modularity', 'High Cohesion', 'Low Coupling', 'SRP'],
    epiphany: '一个文件只干好一件事叫“高内聚”；修改第三章的配图不会把第一章的文字搞乱，就叫“低耦合”。',
    litPerspective:
      '批改作文时，最怕看到学生写三千字不分段，把“作者生平、作品销量、个人读后感”全搅和在同一段里，删一句话整段都接不上。刘勰说一章要“总义以包体”——每一章统摄一个完整的意思。好文章必然分段清楚，各司其职。',
    engPerspective:
      '软件工程最核心的原则之一叫 **“高内聚、低耦合（High Cohesion, Low Coupling）”**：把搜索框单独做成一个小零件文件（`SearchBar.js`），把卡片做成另一个小零件文件（`NoteCard.js`）。以后想改搜索框样式，只改那一个小文件，一般不会把页面其他地方改坏。',
    visualCompare: {
      litTitle: '一锅粥长文 vs 独立章节',
      litCode: `[一锅粥]：所有内容全塞在一个万字文档里，牵一发而动全身。\n[模块化]：第一章、第二章、附录各自独立成篇，修改附录不影响正文。`,
      engTitle: '模块化文件拆分',
      engCode: `src/
  ├── data/notes.js          // 只负责存放笔记文字
  ├── components/Header.js   // 只负责顶部导航栏
  ├── components/Card.js     // 只负责单张卡片排版
  └── utils/search.js        // 只负责关键词搜索逻辑`
    },
    aiAction:
      '如果你发现 AI 把所有代码全塞进了一个文件里（比如单个文件超过 400 行），立刻提醒它：“这个文件太臃肿了，请按照‘高内聚低耦合’原则，把数据和不同组件拆分成独立的小文件。”'
  },
  {
    id: 'cipai-components',
    category: 'composition',
    categoryLabel: '写作学·谋篇布局',
    literaryTerm: '活字与词牌（一套模板，千番填写）',
    classicQuote: '沈括《梦溪笔谈·技艺》记毕昇活板：“若止印三二本，未为简易；若印数十百千本，则极为神速。”',
    engTerm: '可复用 UI 组件 (Component) 与 属性传参 (Props)',
    engKeywords: ['Component', 'Props', 'Template', 'Reusable UI'],
    epiphany: '页面上有 50 张作家卡片，绝不是复制粘贴 50 遍代码，而是先做一个“模板（组件）”，再把 50 个人的资料像填词一样传进去（Props）。毕昇还提醒我们：只印两三本时活字并不省事——同样的结构反复出现，才值得做成组件。',
    litPerspective:
      '毕昇的活字把每个字做成可以反复排版的零件：印两三本时不如直接书写雕版，印成百上千本时才“极为神速”。词牌也是同理：《西江月》规定好了上下片几句、每句几字、哪里押韵，这套格律定一次就够——苏轼用它写“世事一场大梦，人生几度秋凉”，辛弃疾用它写“稻花香里说丰年，听取蛙声一片”，格律相同而内容各异。',
    engPerspective:
      '现代网页开发的核心就是 **组件化（Component）**：比如做一个 `<WriterCard />`（作家卡片组件），规定好左上角放名字、右上角放年代、中间放代表作。之后不管你有 10 位还是 1000 位作家，只需要往这个组件里传入不同的参数（`Props`）即可。反过来，只出现一次的东西，不必急着做成组件。',
    visualCompare: {
      litTitle: '一套模板，填入不同内容',
      litCode: `【卡片模板】：姓名：{name} ｜ 年代：{era} ｜ 代表作：{work}\n  ├── 填入第 1 组数据 ──► 姓名：鲁迅 ｜ 年代：现代 ｜ 代表作：《呐喊》\n  └── 填入第 2 组数据 ──► 姓名：汪曾祺 ｜ 年代：当代 ｜ 代表作：《受戒》`,
      engTitle: '定义一个组件，传参复用百次',
      engCode: `// 1. 定义一次卡片模板组件
function WriterCard({ name, era, work }) {
  return <div className="card"><h3>{name}（{era}）</h3><p>代表作：{work}</p></div>;
}
// 2. 传入不同参数 (Props) 生成卡片
<WriterCard name="鲁迅" era="现代" work="《呐喊》" />
<WriterCard name="汪曾祺" era="当代" work="《受戒》" />`
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
    classicQuote: '张之洞《輶轩语·语学》：“读书宜有门径。泛滥无归，终身无得；得门而入，事半功倍。”',
    engTerm: '项目文件目录树 (Folder Structure)',
    engKeywords: ['Directory Tree', 'package.json', 'index.html', 'src/'],
    epiphany: '拿到一个代码项目别慌，它就跟你整理好的“毕业论文文件夹”一样：`index.html` 是封面，`src/data` 是资料夹，`src/styles` 是排版样式夹。',
    litPerspective:
      '写毕业论文时，条理清楚的同学会在电脑里建一个总文件夹，里面分设：`01_开题报告与大纲`、`02_参考文献史料`、`03_正文各章节`、`04_答辩PPT与配图`。需要改哪块，一秒就能找到对应文件夹。',
    engPerspective:
      '很多文科生第一次打开代码项目，看到十几个英文文件名就头大。其实大多数前端项目的结构都大同小异，只要记住这几个核心位置，就不容易迷路：',
    visualCompare: {
      litTitle: '毕业论文文件夹结构',
      litCode: `我的毕业论文/\n ├── 论文总说明与目录.docx\n ├── 01_原始文献与摘录数据/\n ├── 02_正文各章节模块/\n └── 03_排版字体与配色模板/`,
      engTitle: '常见前端项目目录树',
      engCode: `my-project/
 ├── package.json        // 项目的“身份证”（写着项目名字和启动口令）
 ├── index.html          // 网页的“总入口封面”
 └── src/                // 核心源码文件夹
      ├── data/          // 放纯文字资料（你最常亲手改字的地方！）
      ├── components/    // 放页面各个零件（导航栏、卡片、弹窗）
      └── styles/        // 放颜色、字体、间距样式 (main.css)`
    },
    aiAction:
      '每当你打开一个新项目，第一句话可以直接问 AI：“请帮我画出当前项目的文件夹目录树，并用大白话告诉我：如果我只想改页面上的文字内容，应该去改哪个文件？”'
  },
  {
    id: 'textual-criticism-git',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '论文初稿、导师批注稿与“撤回上一步”',
    classicQuote: '胡适《校勘学方法论》：“校勘的需要起于文件传写的不可避免的错误。”',
    engTerm: 'Git 版本控制（Commit 存档 · Diff 对比 · Branch 分支）',
    engKeywords: ['git commit', 'git diff', 'git branch', 'git restore'],
    epiphany: '不用再把文件夹复制成“第1版、第2版、最终不改版”了！Git 就像 Word 的“历史版本记录 + 审阅修订模式”，随时对比改动、随时退回。',
    litPerspective:
      '改论文最怕两件事：一是改着改着把昨天写得很好的一段话误删了找不回来；二是合作者改完发回来，你不知道他到底动了哪几句话，只能打开 Word 的“比较文档”（红字删除线、绿字新增）逐行核对。传抄必有错，所以古人要校勘；改动必有误，所以今天要留痕。',
    engPerspective:
      '在 AI 编程里，AI 每次改代码都可能改出新问题。有了 Git，每完成一个小功能你就存档一次（`git commit`）；AI 改完后你可以用 `git diff` 看清它删了哪行（红色减号 `-`）、加了哪行（绿色加号 `+`）；不满意就退回到上一个存档点。',
    visualCompare: {
      litTitle: 'Word 审阅修订对比模式',
      litCode: `【修改前原句】鲁迅于 1918 年发表了《阿Q正传》。（史实有误）\n【修订对比】\n  - 删去旧句：鲁迅于 1918 年发表了《阿Q正传》。\n  + 订正新句：鲁迅于 1918 年发表了《狂人日记》。`,
      engTitle: 'Git Diff 代码改动对比视图',
      engCode: `@@ src/data/writers.js @@
- const firstWork = "阿Q正传";   // 红色减号：被删掉的旧内容
+ const firstWork = "狂人日记";  // 绿色加号：新改上的正确内容`
    },
    aiAction:
      '让 AI 做大改动之前，养成习惯先跟它说一句：“在改这个新功能之前，请先帮我把当前正常运行的进度做一次 git commit 存档，以防改坏了能随时退回来。”'
  },
  {
    id: 'allusion-libraries',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '引用现成文献与工具书（站在前人肩膀上）',
    classicQuote: '《荀子·劝学》：“君子生非异也，善假于物也。”',
    engTerm: '调用开源库 (import Libraries) 与 现成轮子',
    engKeywords: ['import', 'npm package', 'Open Source', 'SDK'],
    epiphany: '写论文做公历农历换算，直接翻《两千年中西历对照表》，不用自己从头推算历法；写代码也一样，直接一行 `import` 调用别人写好的开源工具包！',
    litPerspective:
      '做学术研究讲究“善用工具书与前人成果”：如果论文里需要一张唐代地图或查某个字的中古音，你直接引用谭其骧《中国历史地图集》或《广韵》即可，不需要自己去重新测绘、重新构拟。',
    engPerspective:
      '很多文科生以为做个“生成二维码”“导出 PDF”“画人物关系网图”需要写几万行底层代码。其实全球程序员早就把这些功能做成了免费的“开源工具包（Libraries）”，AI 只需要写一行 `import` 把工具包引进来就能直接用！和引用文献一样，也要留意版本（版次）和许可协议。',
    visualCompare: {
      litTitle: '闭门造车 vs 善用现成工具书',
      litCode: `[闭门造车]：自己花三个月手算两千年的闰月与干支纪年，还容易算错。\n[善假于物]：直接查阅《两千年中西历对照表》，很快得出准确干支。`,
      engTitle: '一行 import 调用现成开源库',
      engCode: `// 不用自己写几百行复杂的图表算法，直接引入成熟的 ECharts 图表库
import * as echarts from 'echarts';

// 在页面上的一个容器里初始化图表
const chart = echarts.init(document.getElementById('graph'));

// 传入人物关系数据，自动画出可拖拽的关系网络图
chart.setOption({ series: [{ type: 'graph', data: characters, links: relations }] });`
    },
    aiAction:
      '遇到任何看起来很复杂的功能（比如：把网页保存成图片海报、读取 Excel 表格、画词云图），直接问 AI：“实现这个功能有哪些成熟好用的现成开源库？请直接调用成熟库，不要自己从头手写底层算法。”'
  },
  {
    id: 'polishing-refactoring',
    category: 'bibliography',
    categoryLabel: '论文写作·改稿篇',
    literaryTerm: '改稿统稿：“删繁就简，意思不变”',
    classicQuote: '《朱子语类》载：欧阳修《醉翁亭记》初稿开头用数十字写滁州四面之山，定稿只用“环滁皆山也”五字。',
    engTerm: '代码重构 (Refactoring)',
    engKeywords: ['Refactoring', 'Clean Code', 'DRY Principle'],
    epiphany: '不改变文章要表达的意思，只把啰嗦重复的车轱辘话删改得干净利落，在软件工程里就叫“代码重构（Refactoring）”——关键在于“外在表现一点不变”。',
    litPerspective:
      '我们写完初稿后，常会做一次“统稿”：把散落在三个段落里重复讲的同一句话提炼合并到开头，把拗口的长句拆短。改完之后，文章表达的观点和事实没有变，结构却清爽得多。',
    engPerspective:
      '带着 AI 连续改了十几个回合后，代码里往往会留下很多不再使用的废变量，或者同一个筛选逻辑在三个地方复制粘贴了三遍。这时候做一次 **重构（Refactoring）**——要求外在页面效果和功能完全不变，只把内部代码清理干净，后续再加新功能就不容易出错。',
    visualCompare: {
      litTitle: '初稿啰嗦重复 vs 统稿提炼',
      litCode: `[初稿车轱辘话]：第一页写了一遍“怎么按年份排序”，第二页又抄了一遍，第三页又抄了一遍。\n[统稿之后]：把“按年份排序”提炼成一条通用规则，三页直接共用。`,
      engTitle: '代码重构 (Refactoring) 提炼公共函数',
      engCode: `// 重构前：3 个组件里各自写了一遍重复的排序代码

// 重构后：提炼成一个通用小函数，全站共用，外在表现完全不变
export function sortByYearDesc(list) {
  return [...list].sort((a, b) => b.year - a.year);
}`
    },
    aiAction:
      '当你的作品功能已经调通，但感觉 AI 改起来越来越慢时，先做一次 git commit 存档，再对它发一条指令：“请在不改变任何现有页面外观与功能的前提下，对代码进行一次重构（Refactoring），清理废弃代码并提炼重复逻辑。”'
  },

  // ==================== 四、AI 沟通·审稿篇 ====================
  {
    id: 'fanli-system-prompt',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '期刊征稿启事里的《投稿体例要求》',
    classicQuote: '学术期刊“投稿须知”的常见写法（示意）：来稿请严格遵守本刊引文注释体例，不合体例者恕不受理。',
    engTerm: '项目规则文件 (AGENTS.md / CLAUDE.md / Cursor Rules)',
    engKeywords: ['System Prompt', 'AGENTS.md', 'CLAUDE.md', '.cursor/rules'],
    epiphany: '把你的审美要求和规矩写进项目根目录的规则文件（如 `AGENTS.md`、`CLAUDE.md`）里，就像在编辑部墙上贴了一张《写稿总规矩》，支持它的 AI 工具每次动笔前都会自动先看一眼！',
    litPerspective:
      '如果你是杂志主编，肯定不想每次来一个新实习生，都得把“标题用宋体、正文首行缩进两格、禁用网络流行语”重复唠叨一百遍。最省事的办法是印一份《写稿体例手册》放在桌上，谁写稿都得照着来。',
    engPerspective:
      '为什么有时候跟 AI 聊着聊着，它又开始乱用刺眼的紫色渐变背景，或者又把所有代码塞进一个文件？因为对话变长后它忘了！只要在项目根目录建一个规则文件写好规矩，AI 每次写代码前都会自动读取这份“置顶家规”。不同工具认的文件名不同：Claude Code 读 `CLAUDE.md`，Cursor 读 `.cursor/rules/`，越来越多的工具共同支持 `AGENTS.md`。',
    visualCompare: {
      litTitle: '《编辑部常驻写稿规范》',
      litCode: `1. 全刊统一采用温和的纸张米白底色，禁用刺眼荧光色。\n2. 每次改稿前先向主编汇报打算改哪一节，不可擅自删改其他章节。\n3. 遇到专业术语需附上简明中文脚注。`,
      engTitle: '项目根目录下的规则文件（AGENTS.md / CLAUDE.md）',
      engCode: `# 项目常驻开发规范 (Project Rules)
1. 视觉风格：保持暖米白 (#F5F4ED) 底色与赤陶色 (#C96442) 点缀。
2. 架构铁律：数据文件统一放在 src/data/，严禁把文案硬编码在组件里。
3. 协作纪律：每次修改前先说明改动范围，关键函数需附中文注释。`
    },
    aiAction:
      '开始做任何一个正式项目时，第一件事就是对 AI 说：“请先在项目根目录下帮我创建一个 `AGENTS.md`（或你所用工具对应的 `CLAUDE.md`）规范文件，把我们的配色方案、目录结构规矩和中文注释要求写进去。”'
  },
  {
    id: 'env-secrets',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '别把保险柜钥匙印在公开出版物封面上',
    classicQuote: '图书馆管理常识（示意）：书库与保险柜钥匙由馆员保管，绝不印进对读者公开的导览手册；导览只写“如何办证、如何索书”。',
    engTerm: '环境变量与密钥 (.env vs 明文口令)',
    engKeywords: ['.env', 'API Key', 'gitignore', 'secrets', '环境变量'],
    epiphany: '把大模型 API Key 写进前端网页代码，等于把银行卡密码印在公开出版物封面上——谁打开网页都能抄走。正确做法是锁进后端的 `.env`，并写入 `.gitignore`，永远不要提交到 GitHub。',
    litPerspective:
      '阅览大厅的导览手册人人可取，只能写开放信息；保险柜钥匙必须锁在管理处。同理：页面上展示的文字可以公开，付费接口的密钥绝不能出现在读者能“查看源代码”看到的地方。',
    engPerspective:
      '`.env` 是放在项目本地、不进公开仓库的隐藏配置文件，用来存放 `AI_KEY=...` 这类机密。后端用 `process.env.AI_KEY` 读取；前端只负责展示结果。纯静态站（如 GitHub Pages）没有后端，藏不住 Key，需要配合云函数或自建后端。新手最常见的泄露方式，就是把 `.env` 误提交到 GitHub。',
    visualCompare: {
      litTitle: '公开导览 vs 保险柜钥匙',
      litCode: `[导览手册·可公开]：开馆时间、索书单怎么填、善本室如何预约。\n[保险柜钥匙·绝密]：馆员专用钥匙编号、金库口令——只存在管理处，不进任何公开发行物。`,
      engTitle: '错误示范 vs 正确做法',
      engCode: `// ❌ 写在前端页面里（等于印在封面上）
const AI_KEY = "sk-xxxxxxx";

// ✅ 只存在后端 .env，并加入 .gitignore
// .env
AI_KEY=sk-xxxxxxx

// 后端读取
const summary = await callAI(process.env.AI_KEY, text);`
    },
    aiAction:
      '项目一涉及付费 API，就对 AI 说：“请把所有密钥放进 `.env`，加入 `.gitignore`，只通过后端读取；前端代码里不要出现任何 Key。并提醒我：纯静态托管藏不住密钥。”'
  },
  {
    id: 'prosody-json',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '填标准登记表 vs 写自由散文',
    classicQuote: '文献整理的常见做法（示意）：先定栏目，再录数据；栏目统一，方能汇总比较。',
    engTerm: '结构化数据格式 (JSON Schema)',
    engKeywords: ['JSON', 'Key-Value', 'Schema', 'Array of Objects'],
    epiphany: '程序没法直接把一篇散文拿来按年代筛选，但只要让 AI 把散文整理成“JSON 登记表（带固定栏目名）”，就能变成可搜索、可筛选的互动网站！',
    litPerspective:
      '假设你要统计班里 50 个同学的籍贯和出生年月。如果让大家交一篇《我的自传》散文，你得读断腿；但如果发一张固定栏目的《登记表》（姓名、出生年份、籍贯、爱好），很快就能按籍贯分类汇总。',
    engPerspective:
      '在软件工程里，这种“标准登记表”最常用的格式就是 **JSON**。它主要靠两种符号：花括号 `{}` 代表一张登记卡（里面是一对对的 `"栏目名": "内容"`），方括号 `[]` 代表把多张登记卡（或多个值）装成一个列表。看懂下面这几行，你就基本懂了 JSON：',
    visualCompare: {
      litTitle: '散文描述 vs 标准资料卡',
      litCode: `[散文描述]：余华是当代著名作家，1992年发表了震撼人心的《活着》，常被归入先锋文学与现实主义。\n[标准资料卡]：书名：活着 ｜ 作者：余华 ｜ 年份：1992 ｜ 标签：[先锋文学, 现实主义]`,
      engTitle: '对应的 JSON 数据格式',
      engCode: `{
  "title": "活着",
  "author": "余华",
  "year": 1992,
  "tags": ["先锋文学", "现实主义"]
}`
    },
    aiAction:
      '当你手头有一大堆 Word 读书笔记或文献段落，想做成网站时，先把文字发给 AI 说：“请帮我把这些文字整理成标准的 JSON 数组格式，每条必须包含 `title`、`author`、`year`、`summary` 四个字段；原文缺失的信息留空，不要编造。”'
  },
  {
    id: 'commentary-comments',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '古籍的双行夹注与剧本的舞台提示',
    classicQuote: '古籍刻本惯例：正文大字单行，注文小字双行夹于句下——注文不入正文，却指导读者如何理解正文。',
    engTerm: '代码注释 (Comments //) 与 说明文档 (README)',
    engKeywords: ['Comments', 'JSDoc', 'README.md'],
    epiphany: '代码里以 `//` 开头的中文句子叫“注释”，电脑运行程序时会自动忽略它，但它能帮你像读带注本的古书一样，一眼看懂每段代码是干什么的！',
    litPerspective:
      '读古籍时，正文大字之下常有小字双行的夹注；看话剧剧本时，台词旁常有括号小字：“（走到窗前，压低声音）”。夹注不算正文，舞台提示演员也不会念出来——它们是写给读者和演员看的“为什么这样写、该怎样理解”。',
    engPerspective:
      '很多文科生不敢打开代码文件，是因为里面全是英文。其实你完全可以让 AI 在每一段核心代码上方，用 `// 中文注释` 写清楚“这一段负责搜索过滤”“这一段负责打开底部弹窗”。好的注释重在说明“为什么”，而且必须随代码一起更新——注释和代码对不上，比没有注释更误导人。',
    visualCompare: {
      litTitle: '剧本里的舞台提示（不念出来，仅供理解）',
      litCode: `台词：“请问您想查找哪位作家的作品？”\n（舞台提示：只在读者尚未输入任何关键词时说这一句；勿删）`,
      engTitle: '带中文注释的代码（注释与代码一一对应）',
      engCode: `// 【搜索过滤函数】根据用户输入的关键词，筛选出书名匹配的图书
// 注：关键词为空时返回全部图书；英文书名不区分大小写
function filterBooks(books, keyword) {
  if (!keyword) return books;
  const kw = keyword.toLowerCase();
  return books.filter(b => b.title.toLowerCase().includes(kw));
}`
    },
    aiAction:
      '大胆向 AI 提出要求：“我是汉语言文学背景的创作者，请在你编写的每个关键函数和模块上方，用清晰的中文加上注释，说明这段代码的作用；以后修改代码时，请同步更新对应的注释。”'
  },
  {
    id: 'chief-editor-review',
    category: 'rhetoric',
    categoryLabel: 'AI 沟通·审稿篇',
    literaryTerm: '主编审样刊三问（挑刺与极端情况测试）',
    classicQuote: '编辑出版行业的通行做法（示意）：付印之前，必须拿到样张，站在读者的位置从头到尾通读一遍。',
    engTerm: '验收测试 (Acceptance Test) 与 边界条件 (Edge Cases)',
    engKeywords: ['Code Review', 'Edge Cases', 'Empty State', 'Mobile Responsive'],
    epiphany: '不会写代码，怎么验收 AI 干得好不好？用“主编挑刺三问”：搜不到东西怎么办？字太多撑破框怎么办？在手机小屏幕上点得到吗？',
    litPerspective:
      '一个好主编审阅版面样刊时，不会只看正常段落，一定会专门检查极端情况：如果某篇文章标题长达 40 个字，目录页会换行错位吗？如果某一栏刚好没有配图，版面会留出一块难看的空洞吗？',
    engPerspective:
      '写代码时最容易只顾“理想情况（Happy Path）”，而忽略“边界情况（Edge Cases）”。你作为产品主编，每次 AI 交稿后，只需要用下面这三招去点按测试，作品的完成度就会明显高出一截：',
    visualCompare: {
      litTitle: '主编审阅样刊三问',
      litCode: `一问【空白情况】：如果读者搜了一个不存在的词，页面是尴尬地一片空白，还是有礼貌的提示？\n二问【超长情况】：如果填入一段五百字的长笔记，卡片会被撑变形吗？\n三问【手机情况】：拿到手机窄屏幕上，按钮会不会太小、太挤？`,
      engTitle: '对应的工程边界验收清单 (Edge Cases)',
      engCode: `- [x] 空状态 (Empty State)：搜索无结果时，显示“未找到匹配词条”及【重置筛选】按钮
- [x] 溢出处理 (Overflow)：长文本自动折行或局部滚动，严禁撑破卡片外框
- [x] 移动端适配 (Mobile UX)：所有按钮高度 >= 44px，手机单手大拇指轻松点按`
    },
    aiAction:
      '每次 AI 做完一个页面，把这句审稿令发给它：“请帮我自查并补齐三个边界体验：1.搜索无结果时的空状态提示与重置按钮；2.超长文字防撑破处理；3.手机小屏幕下的单列排版与大按钮适配。”'
  }
];

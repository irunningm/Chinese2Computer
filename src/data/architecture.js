// 01 · 全局全景：用“一座闭架借阅的图书馆”看懂软件工程 6 大核心模块
// 主比喻：阅览大厅=前端 · 索书单=API · 借阅台后的馆员=后端 · 书库与卡片目录=数据库 · 修订档案=Git · 主编与实习生=AI 协作

export const ARCHITECTURE_NODES = [
  {
    id: 'frontend',
    order: '01',
    literaryTitle: '图书馆的阅览大厅与展陈版面',
    literarySub: '陈列排版 · 视觉样式 · 互动机关',
    engTitle: '前端界面 (Frontend / UI)',
    engTech: 'HTML · CSS · JavaScript / React',
    badge: '读者可见层',
    summary: '你在手机或电脑屏幕上直接看到、能用手指点按的一切画面与排版。',
    metaphorDetail:
      '把一个网站想象成一座图书馆：前端就是读者走进来看到的阅览大厅——书怎么陈列、展板怎么排版、指示牌怎么设计、按下按钮有什么反应。它不管书库里的书怎么保管、读者证怎么审核，只负责把内容漂漂亮亮地摆在读者眼前，并在读者操作时给出及时的反馈。',
    threePillars: [
      {
        lit: '纯文字初稿（分清标题、段落、配图）',
        eng: 'HTML (页面骨架)',
        desc: '就像没加任何样式的 Word 初稿，只负责标记“哪句是一级标题 (`<h1>`)、哪段是正文 (`<p>`)、哪里放按钮 (`<button>`)”。'
      },
      {
        lit: '阅览室展板与导览牌的版式（配色、字号、留白；就像排秀米推文）',
        eng: 'CSS (视觉样式表)',
        desc: '负责给光秃秃的文字穿衣服：定背景底色、选衬线字体、调卡片圆角与左右边距，让展陈版面高级好看。'
      },
      {
        lit: '电子导览屏上的互动按钮（点击展开简介、切换专题）',
        eng: 'JavaScript (交互逻辑)',
        desc: '让静态展陈“活”起来：比如读者点击“查看解析”弹出抽屉，或者在搜索框打字时实时筛选卡片。'
      }
    ],
    codeComparison: {
      litLabel: '日常写作/排版要求',
      litContent: `1. 放一个大标题《现代文学名篇》\n2. 配色用护眼暖白底色，标题文字居中\n3. 底下放一个按钮，读者点击后弹出作者简介`,
      engLabel: '对应的前端代码 (React / HTML)',
      engContent: `<div className="bg-warm-paper text-center p-6">\n  <h1>现代文学名篇</h1>\n  <button onClick={() => showBio()}>查看作者简介</button>\n</div>`
    },
    aiPromptTip:
      '跟 AI 聊前端界面时，直接用你平时改海报、排公众号的语言：“字号层级要拉开、留白要宽松（增加 padding）、按钮要大一点方便手机手指点击”，AI 一秒就能听懂。'
  },
  {
    id: 'api',
    order: '02',
    literaryTitle: '读者填写的“索书单”与借阅台回条',
    literarySub: '填写索书单 · 借阅台传递 · 递出书或回条',
    engTitle: 'API 接口与 JSON 协议',
    engTech: 'HTTP Request / Response · JSON',
    badge: '传话通道层',
    summary: '前端与后端之间按固定格式传递请求与结果的“索书单”和“回条”。',
    metaphorDetail:
      '闭架图书馆里，读者不能自己钻进书库翻书，而是在借阅台填一张格式固定的“索书单”（API 请求）：写明要哪位著者的什么书。馆员按单子去书库取书，再从借阅台递出来（API 响应）；如果馆里没有这本书，递回来的是一张“查无此书”的回条（404）。',
    threePillars: [
      {
        lit: '四种标准动作（借阅查询 / 新书入藏 / 更正著录 / 注销下架）',
        eng: 'HTTP 请求方法 (GET / POST / PUT / DELETE)',
        desc: '`GET` 是向后台查数据，`POST` 是提交新内容（如发评论），`PUT` 是修改内容，`DELETE` 是删除。'
      },
      {
        lit: '全馆统一栏目的索书单格式',
        eng: 'JSON 数据格式',
        desc: '电脑不喜欢读散文，最喜欢读带固定栏目的表格。`{ "title": "活着", "author": "余华" }` 这种花括号键值对就叫 JSON。'
      },
      {
        lit: '借阅台回条（已取到 / 查无此书 / 书库故障）',
        eng: '状态码 (200 / 404 / 500)',
        desc: '`200` 代表一切顺利；`404` 代表你要找的页面或资料不存在；`500` 代表后台程序出故障崩了。'
      }
    ],
    codeComparison: {
      litLabel: '前台向后台发的“索书单”',
      litContent: `【动作】查询 (GET)\n【查找条件】作者 = 余华\n【后台传回的标准卡片】\n作者：余华 ｜ 代表作：《活着》《许三观卖血记》`,
      engLabel: 'API 请求与返回的 JSON 数据',
      engContent: `// 请求：GET /api/books?author=余华\n// 返回状态：200 OK\n{\n  "author": "余华",\n  "books": ["活着", "许三观卖血记"]\n}`
    },
    aiPromptTip:
      '当你的网站需要接大模型 API 或查后台数据时，告诉 AI：“请帮我定义清晰的前后端 JSON 数据字段格式，如果接口请求失败或网络断开，请在页面上给出友好的中文提示。”'
  },
  {
    id: 'backend',
    order: '03',
    literaryTitle: '借阅台后的馆员与管理处',
    literarySub: '核验读者证 · 按规程办事 · 保管钥匙',
    engTitle: '后端服务 (Backend / Server)',
    engTech: 'Node.js · Python · Business Logic · .env',
    badge: '馆员工作区',
    summary: '读者看不见的“馆员工作区”：负责定规则、算数据、核验读者证、锁好机密钥匙。',
    metaphorDetail:
      '为什么不能什么事都在前端网页里干？因为前端代码是完全公开给所有读者看的——就像阅览大厅里的一切都摆在明处。凡是涉及“核对账号密码”“扣费充值”“调用付费 AI 接口”或者“在十万条文献里做复杂运算”的事，都必须交给借阅台后面的馆员（后端服务器）完成。',
    threePillars: [
      {
        lit: '核验读者证（普通读者证 / 善本室介绍信）',
        eng: '登录认证与权限 (Auth)',
        desc: '持普通读者证只能借阅开架图书，持介绍信的研究者才能进善本室——对应网站里“普通用户只能看公开文章，管理员登录后才能进后台删改文章”。登录是“查验你是谁”，权限是“决定你能做什么”。'
      },
      {
        lit: '馆员的借阅与统计规程',
        eng: '业务逻辑 (Business Logic)',
        desc: '比如“统计某位作家今年被阅读了多少次”、“把用户上传的文档发给大模型生成摘要”。'
      },
      {
        lit: '锁在管理处保险柜里的钥匙',
        eng: '环境变量与密钥 (.env)',
        desc: '像 DeepSeek / OpenAI 的 API Key（相当于你的银行卡副卡），必须锁在后端的 `.env` 隐藏文件里，并把 `.env` 写进 `.gitignore`，绝不能写进前端网页代码或上传到 GitHub。纯静态网站（如 GitHub Pages）没有后端，藏不住 Key，需要配合后端或云函数使用。'
      }
    ],
    codeComparison: {
      litLabel: '借阅台后馆员处理流程',
      litContent: `1. 先核验来访者是否持有相应权限的读者证，没有则礼貌拦下。\n2. 从管理处保险柜取出 AI 密钥，调用大模型生成文献摘要。\n3. 把生成好的摘要传回阅览大厅页面展示。`,
      engLabel: '后端处理逻辑 (Node.js)',
      engContent: `app.post('/api/summarize', async (req, res) => {\n  if (!req.user.isEditor) return res.status(403).send('无权限');\n  const summary = await callAI(process.env.AI_KEY, req.body.text);\n  res.json({ summary });\n});`
    },
    aiPromptTip:
      '只要你的项目用到了付费的大模型 API Key，一定叮嘱 AI：“请把 API Key 放在 `.env` 环境变量里并加入 `.gitignore`，通过后端接口调用，千万不要直接暴露在前端代码里！”'
  },
  {
    id: 'database',
    order: '04',
    literaryTitle: '书库与卡片目录',
    literarySub: '分类入藏 · 永久保存 · 按索书号秒取',
    engTitle: '数据库 (Database & Schema)',
    engTech: 'SQLite · PostgreSQL · Supabase · localStorage',
    badge: '永久存储层',
    summary: '关掉网页或重启电脑后，让你的文章、笔记和用户数据依然永久保存的“资料库”。',
    metaphorDetail:
      '如果只把数据存在网页的普通变量里，就像读者在阅览桌上临时写的便条，一离开座位（刷新网页）就被清走了。要想让写下的笔记永久留存，就必须正式入藏“书库”（数据库）——你可以把数据库理解为多张表格互相联动的超级 Excel，再配上一套卡片目录。',
    threePillars: [
      {
        lit: '设计著录卡的栏目（书名、著者、索书号……）',
        eng: '数据表结构 (Schema / Model)',
        desc: '建库前先规定好每条记录填哪几项：唯一编号 (`id`)、标题 (`title`)、作者 (`author`)、标签 (`tags`)。'
      },
      {
        lit: '用唯一的“索书号”避免同名张冠李戴',
        eng: '主键与关联 (Primary Key & Foreign Key)',
        desc: '同名的书、同名同姓的作者都可能不止一个（比如不同出版社的《红楼梦》）。给每条记录发一个唯一编号 `id`（就像索书号），其他表只认这个编号，改了书名也不会错乱。'
      },
      {
        lit: '像图书馆卡片目录、字典检字表一样快',
        eng: '数据库索引 (Index)',
        desc: '给常用搜索词（如“作者”、“年份”）加上索引，哪怕库里有十万篇论文，也能在 0.01 秒内搜出来。'
      }
    ],
    codeComparison: {
      litLabel: '文献资料登记表（表头设计）',
      litContent: `【读书笔记表 Notes】\n| 唯一编号 (id) | 篇名 (title) | 原文摘录 (quote) | 分类标签 (tags) |\n| 001          | 呐喊自序     | 铁屋子里的呐喊   | 鲁迅, 现代文学  |`,
      engLabel: '数据库建表结构 (SQL)',
      engContent: `CREATE TABLE notes (\n  id SERIAL PRIMARY KEY,\n  title TEXT NOT NULL,\n  quote TEXT,\n  tags TEXT[]\n);`
    },
    aiPromptTip:
      '做个人小工具时，如果不想配复杂的云数据库，可以直接跟 AI 说：“请先用浏览器自带的 `localStorage`（或本地 JSON 文件）帮我把数据存起来，保证刷新网页后数据不丢失。”'
  },
  {
    id: 'git',
    order: '05',
    literaryTitle: '告别“论文终稿_打死不改版”的时光机',
    literarySub: '随时存档 · 对比改动 · 一键后悔',
    engTitle: 'Git 版本控制 (Git & GitHub)',
    engTech: 'Commit · Branch · Diff · Rollback',
    badge: '安全后悔药',
    summary: '不用再复制十几个“修改版1、修改版2”文件夹，随时一键退回任意历史版本的存档神器。',
    metaphorDetail:
      '每个写过毕业论文的人都经历过这种崩溃：改到第 8 版时，导师突然说“还是第 3 版的开头最好”，结果第 3 版早被你删改覆盖了！程序员用 Git 彻底解决了这个问题：你在同一个文件夹里尽管改，每完成一个小功能就按一次“存档快照 (`commit`)”，任何时候改崩了，一秒钟就能退回昨天完好无损的状态。',
    threePillars: [
      {
        lit: '写完一节，盖章存档并写句备注',
        eng: '提交快照 (git commit)',
        desc: '比如刚调好搜索框，就存档一次并备注“完成关键词搜索功能”，这就是一个永远不会丢的安全存档点。'
      },
      {
        lit: 'Word 里的“审阅修订模式”（红字删、绿字增）',
        eng: '差异对比 (git diff)',
        desc: 'AI 帮你改完代码后，用 Diff 一眼就能看清它到底删了哪两行、加了哪三行，不怕它偷偷删掉你的好内容。'
      },
      {
        lit: '复制一份草稿去大胆实验，不行就扔',
        eng: '分支实验 (git branch)',
        desc: '不动已经跑通的正式版（`main` 主分支），单独开一条平行时间线（分支）让 AI 尝试大改版，改好了再合并回来。'
      }
    ],
    codeComparison: {
      litLabel: '传统改论文 vs Git 时光机',
      litContent: `[传统痛点]：论文初稿.docx → 改1.docx → 终稿_真不改了.docx（乱成一团）\n[Git 做法]：始终只有一个文件夹，靠时间轴快照随时穿梭回任意一版`,
      engLabel: 'Git 常用三句口令',
      engContent: `git add . && git commit -m "完成首页卡片排版"  # 拍下当前完好存档\ngit diff                                      # 检查 AI 刚刚改了哪几行\ngit restore .                                 # 改坏了！撤回所有未存档的改动（不可恢复，慎用）`
    },
    aiPromptTip:
      '用 AI 编程最重要的保命习惯：每当 AI 帮你把一个页面调好看了，立刻对它说“请帮我做一次 git commit 存档，然后再开始改下一个功能”。这样永远不怕 AI 越改越乱！'
  },
  {
    id: 'agent',
    order: '06',
    literaryTitle: '你是定大纲的“主编”，AI 是“撰稿实习生”',
    literarySub: '你定立意与提纲 · AI 负责敲代码 · 你负责审稿验收',
    engTitle: 'AI 结对编程 (AI Agent / Vibe Coding)',
    engTech: 'Prompt · Context · Rules · Review',
    badge: '人机协作层',
    summary: '你不需要自己背诵代码语法，而是用清晰的中文提纲、规则和审稿眼光指挥 AI 干活。',
    metaphorDetail:
      '为什么汉语言文学和人文社科背景的人非常适合 AI 编程？因为 AI 就像一个读过海量代码、打字飞快，但“没有主见、容易跑题”的实习生。它最需要一个逻辑清晰、懂结构拆解、懂读者体验的“主编”来给它列提纲、划边界、挑语病！',
    threePillars: [
      {
        lit: '编辑部的《常驻写稿规范》',
        eng: '项目规则文件 (AGENTS.md / CLAUDE.md)',
        desc: '放在项目里的规矩文档（比如“全站用暖白配色、数据单独放一个文件夹”），AI 每次动笔前都会自动先读一遍。'
      },
      {
        lit: '给实习生布置任务时附上“参考资料”',
        eng: '上下文投喂 (Context)',
        desc: '别让 AI 凭空瞎猜，把要修改的那个文件或两三条真实的样本数据发给它看，它写得就会无比精准。'
      },
      {
        lit: '主编亲自试用验收、挑毛病打回修改',
        eng: '代码审阅与测试 (Review & Debug)',
        desc: 'AI 写完后，你不用去逐行看英文代码，而是直接在网页/手机上点一点，把不顺眼的地方一条条列出来让它改。'
      }
    ],
    codeComparison: {
      litLabel: '主编与实习生的分工',
      litContent: `【你（主编/产品经理）】：定主题、列功能提纲、给参考样例、在手机上点按验收\n【AI（全栈工程师）】：选技术框架、写 HTML/CSS/JS 代码、查报错修 Bug`,
      engLabel: '项目规矩文件示例 (AGENTS.md / CLAUDE.md)',
      engContent: `# 项目写稿规范\n1. 动工前先给我列计划大纲，我同意后再写代码。\n2. 每次只改一个功能，严禁乱改其他已经调好的页面。\n3. 关键逻辑请加上简明的中文注释。`
    },
    aiPromptTip:
      '永远记住一句口诀：“先让 AI 列提纲，看对眼了再写码；一次只改一处小地方，改好立刻存档！”'
  }
];

// 全链路五步推演：当读者在网页上点击【搜索：余华】时，前后台发生了什么？
export const REQUEST_FLOW_STEPS = [
  {
    step: 1,
    stage: '前端界面',
    nodeId: 'frontend',
    litAction: '读者在网页搜索框输入“余华”，手指点下【搜索】按钮',
    engAction: '前端监听到按钮点击事件 (`onClick`)，读取输入框里的文字 `"余华"`',
    codeSnippet: `searchBtn.addEventListener('click', () => fetchBooks('余华'));`,
    tip: '这时候好界面会先显示一句“正在查找中……”（Loading 提示），让读者知道按钮点上了。'
  },
  {
    step: 2,
    stage: 'API 索书单',
    nodeId: 'api',
    litAction: '读者在借阅台填好一张写着“著者：余华”的索书单，递给馆员',
    engAction: '浏览器通过网络向后台发送一条 HTTP GET 请求',
    codeSnippet: `GET /api/books?author=余华`,
    tip: '如果这时候断网了，索书单根本递不出去，页面会出现“网络错误”（没有状态码）；如果请求的地址写错了、馆里根本没有这个窗口，才会收到 404（查无此处）。'
  },
  {
    step: 3,
    stage: '后端馆员',
    nodeId: 'backend',
    litAction: '借阅台后的馆员收到索书单，确认请求合法，准备去书库调取余华的书目',
    engAction: '后端程序接收参数 `author = "余华"`，准备执行数据库查询命令',
    codeSnippet: `const author = req.query.author;\nconst list = await db.findBooksByAuthor(author);`,
    tip: '如果需要权限（比如“仅限VIP查看”），后端就会在这一步检查读者的登录状态。'
  },
  {
    step: 4,
    stage: '数据库书库',
    nodeId: 'database',
    litAction: '在书库里按卡片目录（索引）的“著者”一栏，迅速找出《活着》《兄弟》等记录',
    engAction: '数据库执行检索语句，找出所有作者等于“余华”的数据行',
    codeSnippet: `SELECT title, year FROM books WHERE author = '余华';`,
    tip: '因为存在数据库里，哪怕网站重启一百次，这些书目资料都稳稳当当不会丢。'
  },
  {
    step: 5,
    stage: '传回前端排版',
    nodeId: 'frontend',
    litAction: '馆员把查到的书目按统一格式（JSON）递回借阅台，网页自动套用卡片模板排列出来',
    engAction: '后端返回 `200 OK` 与 JSON 数组，前端循环生成漂亮的图书卡片',
    codeSnippet: `books.map(book => <BookCard title={book.title} year={book.year} />)`,
    tip: '从你手指点下按钮到卡片跳出来，整个前后端跑完这一圈通常不到一秒！'
  }
];

// 审稿官断案：3 个最常遇到的真实问题，一秒判断是哪个模块出了毛病
export const DIAGNOSTIC_QUIZZES = [
  {
    id: 'q1',
    symptom: '【场景一】你让 AI 做了一个读书卡片网页，里面的文字全是对的，但两张卡片挤在一起重叠了，而且背景颜色刺眼得看不清字。',
    question: '请问这是上面 6 个模块里的哪一个出了问题？你该怎么指挥 AI 修改？',
    options: [
      {
        id: 'a',
        label: '数据库坏了，需要重新录入文字资料',
        isCorrect: false,
        feedback: '文字内容都能正常显示出来，说明数据库和资料完全没问题，不用动数据！'
      },
      {
        id: 'b',
        label: '前端排版样式（CSS）没调好，只需让 AI 调整间距和配色',
        isCorrect: true,
        feedback:
          '完全正确！文字对、但样子丑或位置挤，基本可以断定是前端 CSS 排版问题。你直接对 AI 说：“请不要动数据和功能，只修改 CSS 样式：把卡片之间的间距（gap）拉大，背景换成温和的浅米色。”'
      },
      {
        id: 'c',
        label: '电脑中毒了，需要删掉整个项目重头再写',
        isCorrect: false,
        feedback: '千万别重来！调排版就像在 Word 里调行距一样简单，AI 改两行 CSS 就能修好。'
      }
    ]
  },
  {
    id: 'q2',
    symptom: '【场景二】你在网页输入框里辛辛苦苦敲了 10 条读书笔记，当时页面上能看到；结果手滑按了一下浏览器的“刷新”按钮，10 条笔记瞬间全没了！',
    question: '为什么一刷新网页，刚写进去的内容就蒸发了？少了哪一步？',
    options: [
      {
        id: 'a',
        label: '只写在了前端的“临时便条”上，没有存进“数据库”或浏览器的本地存储（localStorage）',
        isCorrect: true,
        feedback:
          '一针见血！普通前端变量就像阅览桌上的临时便条，刷新网页就等于离座清桌。你只需告诉 AI：“请帮我把新增的笔记同步保存到浏览器的 `localStorage`（或者后端数据库）里，确保刷新页面后数据依然保留。”'
      },
      {
        id: 'b',
        label: '显示器屏幕太小，把字挤出去了',
        isCorrect: false,
        feedback: '屏幕大小只会影响换行，不会在刷新后把数据清空。'
      },
      {
        id: 'c',
        label: '字体的字号设得太小了',
        isCorrect: false,
        feedback: '这是数据没有持久化保存的问题，和字体大小无关。'
      }
    ]
  },
  {
    id: 'q3',
    symptom: '【场景三】原本你的网页已经做好了 80%，运行得很顺畅。你让 AI “顺便加个夜间模式按钮”，结果 AI 一口气乱改了七八个文件，夜间模式没做成，连原本好好的首页都白屏打不开了！',
    question: '遇到这种“AI 越帮越忙、把原本好的页面也改崩了”的情况，最聪明的做法是？',
    options: [
      {
        id: 'a',
        label: '继续接着发十条消息骂 AI，让它自己猜哪里改错了',
        isCorrect: false,
        feedback: '千万别！当 AI 已经把好几个文件改乱时，继续让它在错上加错，只会越改越乱。'
      },
      {
        id: 'b',
        label: '用 Git 时光机（或编辑器撤回）一键退回刚才完好的版本，并规定它每次只准改一个地方',
        isCorrect: true,
        feedback:
          '太内行了！先用 Git 一秒撤回到刚才好用的存档点；然后对 AI 立规矩：“只准修改样式文件 `main.css` 里的颜色变量来实现夜间模式，严禁触碰首页结构和别的文件！”'
      },
      {
        id: 'c',
        label: '放弃这个项目，重新开一个新项目从零写起',
        isCorrect: false,
        feedback: '不用从零开始！只要平时每调好一步就存个档（Git Commit），随时都能退回五分钟前完好无损的状态。'
      }
    ]
  }
];

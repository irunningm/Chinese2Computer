// 卷一 · 营造法式：软件工程全景沙盘数据（以“皇家书院与丛书刊刻局”映射现代全栈软件工程）

export const ARCHITECTURE_NODES = [
  {
    id: 'frontend',
    order: '壹',
    literaryTitle: '书籍装帧与版式',
    literarySub: '天头地脚 · 字号行距 · 插画翻页',
    engTitle: '前端 (Frontend / UI)',
    engTech: 'HTML · CSS · JavaScript / React',
    badge: '读者可见层',
    color: 'cinnabar',
    summary: '读者捧起书卷时直接看到、摸到、翻阅的一切视觉与交互体验。',
    metaphorDetail:
      '古籍刊印讲究版框高低、行款疏密、鱼尾牌记与插图绣像；现代软件的“前端”正是这层直接面向读者的书页。它不负责深奥的史料考据，只负责把内容优雅、清晰、可互动地呈现在屏幕上。',
    threePillars: [
      {
        lit: '章节骨架與正文排布',
        eng: 'HTML (超文本标记语言)',
        desc: '决定哪里是卷首标题 (`<h1>`)、哪里是正文段落 (`<p>`)、哪里是目录列表 (`<ul>`)。'
      },
      {
        lit: '装帧设色与版面气韵',
        eng: 'CSS (层叠样式表)',
        desc: '决定宣纸底色 (`#FAF7F2`)、宋体字号、天头留白与双栏布局。'
      },
      {
        lit: '翻页机关与批注展开',
        eng: 'JavaScript (交互脚本)',
        desc: '当读者点击“查看夹注”时弹窗展开，或输入关键词时实时筛选词条。'
      }
    ],
    codeComparison: {
      litLabel: '《刊刻版式凡例》',
      litContent: `【卷首大题】宋体二号字，居中，朱砂色\n【正文段落】每行廿八字，行距一倍半\n【交互机关】若读者轻触“展开评点”，则浮出眉批小窗`,
      engLabel: 'Frontend Component (React / CSS)',
      engContent: `<article className="bg-xuan-paper leading-relaxed">\n  <h1 className="font-serif text-2xl text-cinnabar text-center">{title}</h1>\n  <button onClick={() => setShowComment(true)}>展开评点</button>\n</article>`
    },
    aiPromptTip:
      '跟 AI 聊前端时，用你最擅长的“版面视觉语言”：告诉它“留白要疏朗（padding）、主次分明（字号层级）、配色取宋刻本宣纸暖白”，AI 瞬间就能写出高级的 CSS。'
  },
  {
    id: 'api',
    order: '贰',
    literaryTitle: '驿站传书与通关文牒',
    literarySub: '前堂点书 · 驿使奉牌 · 依格交割',
    engTitle: '接口协议 (API & JSON)',
    engTech: 'RESTful API · HTTP Request / Response · JSON',
    badge: '通信枢纽层',
    color: 'amber',
    summary: '前堂接待处（前端）与后堂内阁（后端）之间按严格公文程式传递消息的信使机制。',
    metaphorDetail:
      '读者在前堂（网页）想调阅《苏轼词全集》，不能自己闯进后堂藏书阁乱翻，必须填一张格式严整的“调书腰牌”（HTTP Request）。驿使持牌跑向后堂，后堂查验无误后，将书卷装入标准函套（JSON Response）送回前堂。',
    threePillars: [
      {
        lit: '公文动词（调阅 / 呈递 / 勘误 / 销毁）',
        eng: 'HTTP Methods (GET / POST / PUT / DELETE)',
        desc: '`GET` 是调阅索书，`POST` 是呈交新稿入库，`PUT` 是修订旧稿，`DELETE` 是销毁底本。'
      },
      {
        lit: '标准公文函套（贴黄与目次）',
        eng: 'JSON 数据格式',
        desc: '无论前堂用什么装帧，驿使包裹里一律采用 `{ "author": "苏轼", "poems": [...] }` 的键值对结构。'
      },
      {
        lit: '内阁回执印信（准奏 / 查无此卷 / 越权）',
        eng: 'HTTP 状态码 (200 / 404 / 403 / 500)',
        desc: '`200` 奉旨准行；`404` 藏书阁查无此卷；`403` 无腰牌不得入内；`500` 后堂走水（服务器报错）。'
      }
    ],
    codeComparison: {
      litLabel: '《驿站调书文牒》',
      litContent: `【牒文动作】调阅 (GET)\n【索书路径】/藏书阁/宋词/苏轼\n【回执印信】贰佰 (200 准奏)\n【奉回书函】{ "作者": "苏轼", "代表作": ["念奴娇", "定风波"] }`,
      engLabel: 'HTTP API Request & JSON Response',
      engContent: `// 请求：GET /api/poets/sushi\n// 响应 Status: 200 OK\n{\n  "author": "苏轼",\n  "dynasty": "宋",\n  "works": ["念奴娇·赤壁怀古", "定风波"]\n}`
    },
    aiPromptTip:
      '当你想让网页接入大模型或外部数据时，告诉 AI：“请帮我拟定前后端交割的 JSON 契约（公文体例），并做好 404/500 驿站断联时的体面兜底提示。”'
  },
  {
    id: 'backend',
    order: '叁',
    literaryTitle: '内阁批红与编辑部',
    literarySub: '核验腰牌 · 考据加工 · 统筹裁断',
    engTitle: '后端服务 (Backend / Server)',
    engTech: 'Node.js · Python · Business Logic · Auth',
    badge: '核心逻辑层',
    color: 'bamboo',
    summary: '隐藏在幕后的总编室与内阁：负责定规矩、查身份、算账目、调配各方资源。',
    metaphorDetail:
      '前堂书铺只管貌美，真正的规矩全在后堂编辑部。比如：这位读者有没有借阅孤本的权限（鉴权 Auth）？他提交的诗稿合不合平仄格律（业务校验 Validation）？如何把三本史书的记载汇总成一份年表（数据处理 Logic）？全由后端裁断。',
    threePillars: [
      {
        lit: '门禁核验腰牌',
        eng: '身份认证与鉴权 (Authentication & Authz)',
        desc: '辨认来者是“普通读者”还是“总纂官”，决定其能否修改底本。'
      },
      {
        lit: '修书律例与审稿规程',
        eng: '业务逻辑 (Business Logic)',
        desc: '如“按朝代先后排序”、“统计某词牌出现频次”、“调用 AI 进行今译”。'
      },
      {
        lit: '机密印信保管',
        eng: '环境变量与密钥 (.env / Secret Keys)',
        desc: '像大内玉玺（如 OpenAI API Key、数据库密码）绝不能摆在前堂桌面上，必须锁在后堂密匣（`.env`）中。'
      }
    ],
    codeComparison: {
      litLabel: '《内阁审阅条例》',
      litContent: `一、凡索阅善本者，先验其“翰林院腰牌”；无牌者驳回（403）。\n二、自藏书阁取出原卷后，自动隐去批注人私印，方准发往前堂。`,
      engLabel: 'Backend Route Handler (Node.js)',
      engContent: `app.get('/api/rare-book', (req, res) => {\n  if (!req.user.isScholar) return res.status(403).send('无翰林腰牌');\n  const book = db.findBook(req.query.id);\n  return res.json(sanitize(book));\n});`
    },
    aiPromptTip:
      '涉及 API 密钥、用户登录或复杂文本统计时，提醒 AI：“这部分逻辑请放在后端（或本地安全环境），密钥存入 `.env` 密匣，切勿暴露在前端页面。”'
  },
  {
    id: 'database',
    order: '肆',
    literaryTitle: '藏书阁与四库目录',
    literarySub: '经史子集 · 书架编号 · 检字索书',
    engTitle: '数据库 (Database & Schema)',
    engTech: 'SQL / SQLite · PostgreSQL · JSON Store',
    badge: '持久存储层',
    color: 'indigo',
    summary: '按严密目录学体例分门别类、永久保存海量典籍与读者札记的藏书楼。',
    metaphorDetail:
      '如果把数据只放在网页内存里，关掉网页就像茶馆说书散场，话音落地即散；唯有收入“藏书阁”（数据库），方能传之久远。数据库不仅存书，更讲究《四库全书总目》式的架阁分类（表结构 Schema）与四角号码检字法（索引 Index）。',
    threePillars: [
      {
        lit: '书目体例与架阁立类',
        eng: '数据表结构 (Table Schema / Model)',
        desc: '规定每部书入库必须登记：编号 (`id`)、书名 (`title`)、撰人 (`author`)、成书年代 (`year`)。'
      },
      {
        lit: '互著与别裁（人物与诗作关联）',
        eng: '关系型外键 (Foreign Key / Relations)',
        desc: '《诗人表》里的“杜甫（编号01）”与《诗作表》里三百首诗通过编号相连，改一处而全书联动。'
      },
      {
        lit: '检字法与韵部索引',
        eng: '数据库索引 (Index)',
        desc: '不必翻遍十万卷书，靠韵部索引一秒定位所有含“明月”二字的诗句。'
      }
    ],
    codeComparison: {
      litLabel: '《藏书阁入库清册（表结构）》',
      litContent: `【诗人册 Poets】编号(主键) | 姓名 | 字号 | 朝代\n【诗作册 Poems】编号(主键) | 题目 | 正文 | 撰人编号(关联诗人册)`,
      engLabel: 'Database Schema (SQL)',
      engContent: `CREATE TABLE poets (\n  id INT PRIMARY KEY,\n  name TEXT NOT NULL,\n  dynasty TEXT\n);\nCREATE TABLE poems (\n  id INT PRIMARY KEY,\n  title TEXT,\n  poet_id INT REFERENCES poets(id)\n);`
    },
    aiPromptTip:
      '动工前先发挥汉语言“目录学”专长，跟 AI 说：“我们先不写界面，请先帮我设计好数据的表结构（体例字段），确认每条文献包含哪些字段。”'
  },
  {
    id: 'git',
    order: '伍',
    literaryTitle: '善本源流与版本校勘',
    literarySub: '初稿清样 · 甲戌庚辰 · 汇校异文',
    engTitle: '版本控制 (Git & GitHub)',
    engTech: 'Commit · Branch · Diff · Rollback',
    badge: '时光回溯层',
    color: 'ink',
    summary: '记录手稿每一次增删改易的“版本源流谱”，随时可比对异文、随时可退回善本。',
    metaphorDetail:
      '写论文最怕“终稿_打死不改版_真正最终版.docx”；曹雪芹披阅十载、增删五次，从而留下甲戌本、己卯本、庚辰本。Git 就是代码界的版本目录学：每次落印（Commit）都留存快照，另起钞本（Branch）大胆试改，改坏了一键奉还善本（Revert/Reset）。',
    threePillars: [
      {
        lit: '落印存底与跋语',
        eng: '提交记录 (git commit -m "跋语")',
        desc: '每完成一小段功能，盖章封存并写一句批注（如“增补苏轼密州出猎词条”）。'
      },
      {
        lit: '另起别本试改',
        eng: '分支管理 (git branch / checkout)',
        desc: '不动“内府刊本”（`main` 主分支），单独抄一份“试改钞本”（`feature` 分支）让 AI 大刀阔斧实验。'
      },
      {
        lit: '对校异文与恢复善本',
        eng: '差异比对与回滚 (git diff / checkout)',
        desc: '一眼看出 AI 到底偷偷改了哪几行字（红删绿增），若改坏文脉则立即废钞恢复。'
      }
    ],
    codeComparison: {
      litLabel: '《版本流传牌记》',
      litContent: `【善本主脉 main】甲戌初刊定本 ──► 庚辰增订本\n                     └──► 【试改别本 branch】程高续书实验本（若不妥可随时废弃）`,
      engLabel: 'Git Workflow Commands',
      engContent: `git checkout -b exp-ui    # 另起别本试改装帧\ngit diff                  # 对校异文（查验AI改了何处）\ngit commit -m "定稿：新增金陵十二钗判词卡片"`
    },
    aiPromptTip:
      '让 AI 动手大改代码前，养成铁律：“请先帮我做一次 Git Commit 落印存底（或新建分支），写清本次校改跋语，以防改坏前文。”'
  },
  {
    id: 'agent',
    order: '陆',
    literaryTitle: '总纂官与修书局幕僚',
    literarySub: '发凡起例 · 授意幕僚 · 覆校签发',
    engTitle: 'AI 结对编程 (AI Agent / Vibe Coding)',
    engTech: 'System Prompt · Context · Tool Use',
    badge: '智能协同层',
    color: 'cinnabar',
    summary: '你不再是躬身刻字的雕版匠，而是执掌《凡例》、审夺文脉的修书局总纂官。',
    metaphorDetail:
      '清代修《四库全书》或宋代司马光修《资治通鉴》，总纂官并不亲自誊抄每一页纸，而是制定《修书凡例》（System Rules），将长编分派给刘攽、范祖禹等博学助修（AI Agents），最后由司马光笔削审定（Code Review）。这正是文科生做 AI 编程的最佳身位！',
    threePillars: [
      {
        lit: '书前《凡例》与修书规条',
        eng: '全局规则文件 (CLAUDE.md / .cursorrules)',
        desc: '放在项目根目录的“镇局之宝”，规定全书文风、目录规矩与禁忌，AI 每次动笔前必先捧读。'
      },
      {
        lit: '案头参考资料辑佚',
        eng: '上下文投喂 (Context Engineering)',
        desc: '幕僚虽博学但不知你心意，把相关文件、样例数据 `@` 到案头，它才不会凭空杜撰（幻觉）。'
      },
      {
        lit: '总纂笔削与覆校',
        eng: '审阅与验收 (Diff Review & Testing)',
        desc: '幕僚交稿后，先看它改了哪几个文件，再在浏览器里亲手点验，合乎文心方准入库。'
      }
    ],
    codeComparison: {
      litLabel: '《资治通鉴·修书分职》',
      litContent: `【总纂官（你）】定立意、颁《凡例》、拆卷目、审清样\n【助修幕僚（AI）】依凡例搜集代码、排比组件、联调驿站、捉拿鲁鱼亥豕`,
      engLabel: 'CLAUDE.md / Agent Rules',
      engContent: `# 修书凡例 (Project Rules)\n1. 每次修改前先说明拟改哪些文件，勿擅动无关章节。\n2. 界面文案一律采用典雅中文，关键函数需附中文夹注。\n3. 数据与界面分离，词条统一存于 src/data/。`
    },
    aiPromptTip:
      '记住你的核心竞争力：AI 最擅长“写字（生成语法）”，但最缺乏“文心（立意、结构、审美与边界感）”。用你的汉语言功底给它立规矩！'
  }
];

// 全链路交互推演：当读者点击“检索苏轼赤壁词”时，书院前后堂发生了什么？
export const REQUEST_FLOW_STEPS = [
  {
    step: 1,
    stage: '前端 (装帧书页)',
    nodeId: 'frontend',
    litAction: '读者在前堂书案轻触【检索：苏轼 · 赤壁】按钮',
    engAction: '触发点击事件 `onClick`，收集输入框关键词 `"苏轼"`',
    codeSnippet: `button.addEventListener('click', () => fetchPoems('苏轼'));`,
    tip: '此时页面可先显示“书童正赴藏书阁调卷……”（Loading 状态），安抚读者。'
  },
  {
    step: 2,
    stage: 'API (驿站传书)',
    nodeId: 'api',
    litAction: '书童填妥《调书文牒》，快马奔向后堂内阁',
    engAction: '发起 HTTP GET 请求：`GET /api/poems?author=苏轼`',
    codeSnippet: `GET /api/poems?author=%E8%8B%8F%E8%BD%BC HTTP/1.1\nAccept: application/json`,
    tip: '如果网络断开或地址写错，书童迷路，就会报 `404 Not Found`。'
  },
  {
    step: 3,
    stage: '后端 (内阁批红)',
    nodeId: 'backend',
    litAction: '内阁接牒，核验无误，按《检索律例》传谕藏书阁提书',
    engAction: '后端路由解析参数 `author="苏轼"`，执行查询逻辑',
    codeSnippet: `const author = req.query.author;\nconst results = await db.queryPoemsByAuthor(author);`,
    tip: '后端在这里还可以顺便做“用典注解加工”或“权限过滤”。'
  },
  {
    step: 4,
    stage: '数据库 (藏书阁)',
    nodeId: 'database',
    litAction: '守阁吏按《宋词撰人索引》瞬间抽取出苏轼词卷',
    engAction: '执行 SQL 索引检索，返回匹配的数据行',
    codeSnippet: `SELECT title, content FROM poems WHERE author = '苏轼';`,
    tip: '因为事先建好了“撰人索引”，哪怕阁中有十万首词，也只需数毫秒。'
  },
  {
    step: 5,
    stage: '回传与渲染 (奉书归案)',
    nodeId: 'frontend',
    litAction: '驿使捧回标准书函（JSON），前堂画师依版式铺陈于宣纸之上',
    engAction: '返回 `200 OK` JSON 数据，前端循环渲染为诗词卡片组件',
    codeSnippet: `poems.map(p => <PoemCard title={p.title} text={p.content} />)`,
    tip: '至此，一次完整的“前后端全链路交互”圆满礼成！'
  }
];

// 望闻问切：故障定责小演练（帮助文科生在 AI 写的代码出问题时，一眼判断是哪一层坏了）
export const DIAGNOSTIC_QUIZZES = [
  {
    id: 'q1',
    symptom: '【症候一】你让 AI 做了一个《唐诗三百首》卡片页，文字全显示出来了，但两张卡片叠在了一起，标题颜色也刺眼得像红绿灯。',
    question: '请问这属于书院哪一部门的差错？你该如何向 AI 下达校勘指令？',
    options: [
      {
        id: 'a',
        label: '藏书阁（数据库）塌了，需要重修数据表结构',
        isCorrect: false,
        feedback: '非也！文字内容能正常显示，说明藏书阁（数据）与驿站（API）均完好无损。'
      },
      {
        id: 'b',
        label: '书籍装帧（前端 CSS 样式与排版布局）失调',
        isCorrect: true,
        feedback:
          '断案如神！内容无误而版面重叠、设色不雅，纯属前端 CSS 装帧问题。你只需对 AI 说：“请勿改动数据逻辑，仅调整卡片组件的 CSS 布局（增加间距 gap 与内边距 padding），并将标题色调改为温和的朱砂色。”'
      },
      {
        id: 'c',
        label: '版本源流（Git）冲突，需要删库重来',
        isCorrect: false,
        feedback: '不必惊慌！这只是表面装帧瑕疵，完全不需要动用删库大刑。'
      }
    ]
  },
  {
    id: 'q2',
    symptom: '【症候二】你在页面上精心录入了十条《世说新语》读书笔记，当时页面上能看到；结果按了一下浏览器“刷新”按钮，十条笔记瞬间灰飞烟灭，全部消失了！',
    question: '为何刷新页面后笔记会凭空消失？少了哪一环工程设计？',
    options: [
      {
        id: 'a',
        label: '只写在了前端临时内存（茶馆说书），没有存入数据库或本地持久化存储（藏书阁入库）',
        isCorrect: true,
        feedback:
          '一针见血！前端普通变量（State）就像写在黑板上的粉笔字，刷新网页即擦除。对 AI 下令：“请为读书笔记增加持久化存储（简单项目可用浏览器 `localStorage` 本地书匣，正式项目存入 SQLite/数据库），确保刷新页面后数据不丢失。”'
      },
      {
        id: 'b',
        label: '字体文件没有加载出来',
        isCorrect: false,
        feedback: '如果是字体问题，文字依然存在只是样式变化，不会在刷新后彻底清空数据。'
      },
      {
        id: 'c',
        label: '显示器分辨率太低',
        isCorrect: false,
        feedback: '分辨率只影响排版宽窄，不会吞噬你录入的文本数据。'
      }
    ]
  },
  {
    id: 'q3',
    symptom: '【症候三】原本你的网站运行得好好的，你让 AI “顺便加个夜间模式”，结果 AI 狂改了 8 个文件，夜间模式没做成，连原本正常的首页目录都打不开了！',
    question: '面对这种“庸医妄改底本”的翻车现场，最符合版本校勘学的做法是？',
    options: [
      {
        id: 'a',
        label: '让 AI 继续猜、继续改，连发十个感叹号骂它',
        isCorrect: false,
        feedback: '大忌！当 AI 已经把上下文改乱时，继续盲目让它修补往往会造成“妄改累增”，越改越乱。'
      },
      {
        id: 'b',
        label: '运用 Git 版本回滚（恢复上一个善本 Commit），并要求 AI 遵循“单一职责”每次只改一处',
        isCorrect: true,
        feedback:
          '深得校勘三昧！先用 `git checkout` 或编辑器 Undo 一键退回方才完好的善本快照；然后对 AI 约法三章：“本次只许修改样式文件 `main.css` 中的配色变量以实现夜间模式，严禁触碰目录结构与数据文件！”'
      },
      {
        id: 'c',
        label: '把整个电脑重装系统',
        isCorrect: false,
        feedback: '杀鸡焉用牛刀，善用 Git 版本控制即可一秒回春。'
      }
    ]
  }
];

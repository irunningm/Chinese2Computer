// 03 · 技术选型与上手路线：做网页、手机 App、桌面软件、小程序、插件、脚本，到底怎么选？

export const TECH_STACK_CARRIERS = [
  {
    id: 'web-app',
    order: '01',
    carrierName: '现代网页应用 (Web App)',
    literaryMetaphor: '公开在线杂志 · 互动H5网页',
    metaphorTag: '点开链接即看 · 零安装门槛',
    typicalStack: 'HTML / CSS / JavaScript + React / Vue + Tailwind CSS + Vite / Next.js',
    aiFriendliness: '98% · 极度推荐（文科生破冰第一首选）',
    aiScoreLevel: 'high',
    oneLineEssence:
      '就像一篇发在网上的互动文章，任何人无论用手机还是电脑，不用去应用商店下载安装，点开链接就能直接看、直接点。',
    literaryAnalogyDetail:
      '如果你做了一个作品集、人物关系图谱或读书笔记站，希望发到微信群里让大家一秒点开就能体验，Web 网页应用就是绝对首选。它运行在每个人手机和电脑自带的浏览器里，天然同时兼容手机和电脑。',
    aiPros: [
      '【AI 写得最准、最熟练】全球公开的网页代码最多，AI 对 React、Tailwind CSS 熟得像背九九乘法表，写出来的界面最漂亮、极少报错。',
      '【改完 0.1 秒立刻看到画面】改一行字或调个颜色，浏览器瞬间自动刷新（所见即所得），最容易建立正反馈和成就感。',
      '【免费一键发布上线】配合 GitHub Pages 或 Vercel，不花一分钱、不用买服务器，1 分钟就能生成全球可访问的正式网址（就像我们当前这个网站一样！）。'
    ],
    aiCons: [
      '【不能直接乱翻用户电脑硬盘】出于安全保护，普通网页不能未经允许直接去自动批量修改你电脑桌面文件夹里的几百个 Word 文档。',
      '【部分框架新旧版本写法不同】比如 Next.js 有新旧两套写法，只需要在开头跟 AI 说清用哪一套即可。'
    ],
    bestUseCases: [
      '课程展示网站、文学作品展馆、作家年谱与人物关系图谱',
      '个人作品集主页、在线词典、专题文献检索库',
      '添加到手机主屏幕使用的日常打卡与随身卡片小工具（PWA）'
    ],
    aiStarterPrompt:
      '请帮我构建一个响应式的现代 Web 网页应用（优先适配手机端 375px 屏幕与电脑桌面端）。请将所有文字数据独立存放在 src/data/ 文件夹中，界面保持简洁清爽的杂志排版风格。'
  },
  {
    id: 'mobile-app',
    order: '02',
    carrierName: '独立手机 App (iOS / Android)',
    literaryMetaphor: '手机应用商店里的独立 App',
    metaphorTag: '原生功能强 · 但配环境与上架极繁琐',
    typicalStack: '跨平台：React Native (Expo) / Flutter ｜ 苹果原生：SwiftUI',
    aiFriendliness: '72% · 建议用 Expo 或先做“手机网页 PWA”平替',
    aiScoreLevel: 'medium',
    oneLineEssence:
      '装在手机桌面上的独立 App，能调用相机拍照、震动反馈和锁屏提醒；但前期的软件环境安装和苹果商店上架非常折腾人。',
    literaryAnalogyDetail:
      '很多新手一上来就说“我想做个手机 App”，却不知道做独立 App 和做网页完全是两码事：苹果手机说的是 Swift 语言，安卓手机说的是 Kotlin 语言，而且需要下载十几个 G 的专业开发软件（Xcode / Android Studio）并经过应用商店严格审核才能发给别人装。',
    aiPros: [
      '【用 Expo 框架可手机扫码预览】如果确实要做手机 App，让 AI 用 `React Native + Expo`，你可以在自己手机上装个 Expo Go，扫二维码就能直接看到 AI 写出来的 App 画面。',
      '【Claude 很擅长写苹果 SwiftUI】如果你用的是 Mac 电脑且只想做苹果 iOS 应用，SwiftUI 的代码非常像搭积木，AI 生成效果很好。'
    ],
    aiCons: [
      '【环境安装是新手最大劝退器】还没开始写第一行功能，光安装 Xcode、配模拟器、解决证书报错，就能卡住文科生整整三天。',
      '【AI 没法替你点软件菜单】很多手机 App 的报错不是代码写错了，而是软件工程配置没勾对，AI 没法替你操作鼠标去点。',
      '【发布给别人用成本高】上架苹果 App Store 每年要交 99 美元（约 700 元）开发者年费，还要等人工审核和备案。'
    ],
    bestUseCases: [
      '重度依赖手机摄像头拍照识字（OCR）、录音转文字、蓝牙硬件连接的App',
      '【给文科生的省心妙招】：如果你的想法主要是“看卡片、记笔记、查资料、做测试”，直接做成【01 手机端自适应网页】，然后在苹果 Safari 点“分享 → 添加到主屏幕”，它就会变成一个全屏独立图标，体验跟真 App 几乎一模一样，还完全免去了配环境之苦！'
    ],
    aiStarterPrompt:
      '我想做一个手机端使用的应用。为了免去复杂的原生环境配置，请先帮我采用“移动优先（Mobile-First）的 Web 架构 + PWA 配置”，做成底部带固定导航栏、所有按钮大于 44px、支持添加到手机主屏幕全屏运行的手机应用体验。'
  },
  {
    id: 'desktop-app',
    order: '03',
    carrierName: '电脑桌面软件 (Mac / Windows)',
    literaryMetaphor: '装在电脑上的专业工具软件（如 Obsidian / 微信电脑版）',
    metaphorTag: '可直接读写电脑本地硬盘文件夹',
    typicalStack: 'Electron (网页套壳) / Tauri / Python GUI (Streamlit)',
    aiFriendliness: '85% · 先写好网页，最后套一层桌面窗口外壳',
    aiScoreLevel: 'high',
    oneLineEssence:
      '双击电脑桌面图标就能打开的独立软件，最大特权是能直接读取、修改、保存你电脑硬盘里的几千个本地文档（PDF / Word / Markdown）。',
    literaryAnalogyDetail:
      '你平时在电脑上用的 Obsidian 笔记、VS Code 编辑器甚至微信电脑版，其实底层大多是用“网页技术 + Electron 桌面外壳”做出来的！这就好比先做好内页排版（网页），最后给它装订一个硬壳封面（桌面软件窗口），就能直接读写你电脑硬盘里的私人资料库。',
    aiPros: [
      '【不用学 C++，直接拿网页变桌面软件】你可以先让 AI 用它最擅长的网页技术把双栏阅读器、卡片管理界面调得漂漂亮亮，最后只加 3 个配置文件（用 `Electron`），10 分钟就能把它变成 Mac 或 Windows 桌面软件！',
      '【数据全存在自己电脑硬盘，安全免费】不需要买云端服务器，所有文献、图片和笔记都直接存成你电脑文件夹里的真实文件，断网也能用。'
    ],
    aiCons: [
      '【打包发给别人电脑时会有安全提示】因为你没有花钱买微软或苹果的企业数字签名，打包成 `.exe` 或 `.dmg` 发给同学时，对方电脑第一次打开会提示“未知开发者”（点“仍要打开”即可）。'
    ],
    bestUseCases: [
      '像 Obsidian / Zotero 那样的本地文献阅读、双栏批注与卡片盒软件',
      '需要离线运行、直接管理电脑某个文件夹下几千篇文档的私人工作台'
    ],
    aiStarterPrompt:
      '我想做一个运行在 Mac/Windows 电脑桌面上的本地软件，需要能直接读取和保存我电脑本地文件夹里的文档。请采用 Electron + 现代 Web 前端界面的架构，帮我配置好主进程（main.js）的本地文件读写接口。'
  },
  {
    id: 'mini-program',
    order: '04',
    carrierName: '微信小程序',
    literaryMetaphor: '嵌在微信里的轻便小工具',
    metaphorTag: '微信群转发即用 · 但受微信规则限制',
    typicalStack: '微信原生 (WXML / WXSS / JS) 或 Uni-app',
    aiFriendliness: '80% · AI 很熟，但必须用专门的微信开发者工具',
    aiScoreLevel: 'medium',
    oneLineEssence:
      '不用跳出微信，在微信群或朋友圈里点开小程序卡片就能直接互动，最适合国内熟人社群分享。',
    literaryAnalogyDetail:
      '微信小程序用的是一套跟网页 HTML 很像的“微信方言”（比如把网页里的 `div` 改叫 `view`，把 `span` 改叫 `text`）。它的核心优势是微信生态内的无缝转发和一键获取微信头像昵称。',
    aiPros: [
      '【AI 非常熟悉小程序语法】国内关于微信小程序的教程和代码极多，你只要告诉 AI 写微信小程序，它就能准确输出 `wxml` 和 `wxss` 文件。',
      '【微信群传播体验极好】发到班级群、课题组群里是一张精致的小程序卡片。'
    ],
    aiCons: [
      '【必须下载“微信开发者工具”】没法直接在普通浏览器里点开看，必须去微信官网下载专门的开发软件并注册小程序账号。',
      '【个人账号审核限制多】微信对个人开发者的小程序审核很严：比如不允许有任何用户公开评论区、笔记公开分享广场（会被判定为论坛而驳回），且正式发布必须做网站备案。'
    ],
    bestUseCases: [
      '读书会签到打卡、测试问答小游戏、学术会议日程指南、校园导览地图'
    ],
    aiStarterPrompt:
      '我正在使用“微信开发者工具”开发一个原生微信小程序。请使用标准的 WXML、WXSS 与 Page({}) 语法编写代码，注意使用 view 和 text 标签，不要误用 HTML 的 div 标签。'
  },
  {
    id: 'browser-extension',
    order: '05',
    carrierName: '浏览器插件 (Chrome / Edge 扩展)',
    literaryMetaphor: '贴在网页侧边的“透明便利贴与荧光笔”',
    metaphorTag: '3个文件搞定 · 划词即查、一键摘录',
    typicalStack: 'Chrome Extension Manifest V3 + HTML / JS',
    aiFriendliness: '95% · 极小巧简单，AI 半小时就能写完一个',
    aiScoreLevel: 'high',
    oneLineEssence:
      '不用自己从头建一个网站，而是给你的浏览器装一个“外挂小助手”——在你逛知网、豆瓣、维基百科时，鼠标选中一段话就能直接翻译、写批注或一键存进笔记库。',
    literaryAnalogyDetail:
      '你平时在电脑浏览器上可能装过“沉浸式翻译”或“去广告插件”。其实开发一个属于自己的浏览器插件超级简单，总共只需要三四个几十行代码的小文件，就能直接改造任何你正在浏览的网页！',
    aiPros: [
      '【体量极小，AI 一次就能写对】因为插件不需要复杂的框架，只有简单的配置文件 `manifest.json` 和小脚本，AI 几乎能一次性写出完全可用的代码。',
      '【10 秒安装，永久免费自用】根本不用买服务器或交年费！在 Chrome 或 Edge 浏览器打开“扩展程序 → 开启开发者模式 → 加载已解压的文件夹”，10 秒钟就能装好自己用。'
    ],
    aiCons: [
      '【只能在电脑浏览器上用】手机自带浏览器通常不支持安装电脑端的 Chrome 插件。'
    ],
    bestUseCases: [
      '看古籍网、知网论文或外文网站时，鼠标划词自动调用 AI 给出释义或背景考证',
      '在任何网页上看到好句子，右键一键摘录（连同原网页标题和网址）存进自己的本地卡片库',
      '把排版杂乱的旧网站一键变成清爽的护眼阅读模式'
    ],
    aiStarterPrompt:
      '请遵循最新的 Chrome Extension Manifest V3 规范，帮我写一个极简的浏览器插件。包含 manifest.json、content.js 和弹窗页面，实现当我在任何网页选中文字时，可以一键摘录保存，并给出在浏览器开启开发者模式加载插件的步骤说明。'
  },
  {
    id: 'python-script',
    order: '06',
    carrierName: 'Python 本地自动化脚本',
    literaryMetaphor: '替你干脏活累活的“自动批处理机器人”',
    metaphorTag: '不用画界面 · 10行代码顶三天手工复制粘贴',
    typicalStack: 'Python 3 + Pandas (表格处理) / 正则表达式 / OpenAI SDK',
    aiFriendliness: '96% · AI 的第一母语，处理文档表格天下无敌',
    aiScoreLevel: 'high',
    oneLineEssence:
      '它根本不需要漂亮的画面按钮，专门在后台替你干“把文件夹里 300 个乱糟糟的 Word/TXT 文档自动提取摘要、统计词频并汇总成一张 Excel 表”的苦力活。',
    literaryAnalogyDetail:
      '文科生做研究、写论文或者干行政，最头疼的就是面对几百份散乱文档做机械的复制粘贴、改文件名、数某个词出现了多少次。这种“规则明确、重复枯燥”的活儿，不用做网页也不用做 App，让 AI 写一个 30 行的 Python 小脚本，3 秒钟就能全部跑完！',
    aiPros: [
      '【Python 是 AI 最擅长的语言】大模型在写 Python 处理文字、Excel 表格、PDF 提取、批量调用 AI 接口上的准确率接近 100%。',
      '【只有一个文件，跑完直接拿 Excel 结果】不用管字体好不好看、排版对没对齐，在电脑终端运行一下 `python3 run.py`，文件夹里直接多出一份整整齐齐的 Excel 表格或 JSON 文件！'
    ],
    aiCons: [
      '【主要是给自己电脑提效用的】它没有好看的网页链接可以直接发给朋友点（如果想给脚本加个简单网页界面，可以让 AI 用 `Streamlit` 库，十行代码就能变出一个本地小网页）。'
    ],
    bestUseCases: [
      '批量把电脑文件夹里几百篇 TXT/Word 文献统一格式、提取指定段落、按规则批量重命名',
      '统计一部小说或历史语料库里的词频、人物出场次数、共现关系并导出为 Excel 表格',
      '批量读取一个 Excel 里的 500 条古文或外文，自动调用大模型翻译并填回第二列'
    ],
    aiStarterPrompt:
      '我需要一个在电脑本地运行的 Python 自动化脚本。我的原始文档放在 `./input` 文件夹下，请帮我编写一个 Python 脚本批量读取这些文件，按我的规则提取内容并汇总输出为 Excel (.csv/.xlsx) 和 JSON 文件。请在代码中加上清晰的中文注释，并告诉我怎么在终端运行它。'
  }
];

// 互动选型罗盘：根据大白话真实需求，一秒推荐最省心的技术栈
export const STACK_COMPASS_SCENARIOS = [
  {
    id: 'sc-showcase',
    question: '“我想做一个好看的读书卡片站、作品集、人物关系图谱或课程汇报，发个链接就能让别人用手机和电脑点开看。”',
    recommendId: 'web-app',
    verdict: '首选【01 现代网页应用 (Web App)】',
    reason: '别人不用下载安装任何东西，微信里点开链接就能看；而且 AI 写网页界面的水平最高，还能用 GitHub Pages 免费发布上线。',
    stackRecipe: 'HTML / CSS / JS（或 Vite + React + Tailwind） + GitHub Pages 免费上线'
  },
  {
    id: 'sc-batch-text',
    question: '“我电脑文件夹里有几百篇下载下来的文献、TXT 或 Word 笔记，想自动提取里面的内容、统计词频或批量转成 Excel 表格。”',
    recommendId: 'python-script',
    verdict: '首选【06 Python 本地自动化脚本】',
    reason: '这种任务根本不需要花时间画网页界面！让 AI 写一个几十行的 Python 脚本直接处理你电脑文件夹里的文档，3 秒钟就能输出整理好的 Excel 表。',
    stackRecipe: 'Python 3 + Pandas / 正则表达式（单个 .py 脚本文件直接运行）'
  },
  {
    id: 'sc-clipper',
    question: '“我平时在电脑浏览器上看知网、豆瓣或外文网站时，想鼠标选中一句话就能直接点一下做批注、翻译或存进我的摘录库。”',
    recommendId: 'browser-extension',
    verdict: '首选【05 浏览器插件 (Chrome / Edge 扩展)】',
    reason: '不用自己建网站，直接做成一个贴在浏览器上的小插件，只需要 3 个文件，开启浏览器开发者模式 10 秒钟就能装好自己用。',
    stackRecipe: 'Chrome Extension Manifest V3 + 原生 HTML / JS'
  },
  {
    id: 'sc-local-library',
    question: '“我想做一个像 Obsidian 那样装在自己电脑桌面上的私人软件，能直接读取和编辑我电脑硬盘里的几千个本地文件。”',
    recommendId: 'desktop-app',
    verdict: '首选【03 电脑桌面软件（先写网页界面 + Electron 封装）】',
    reason: '千万别去硬啃复杂的 C++！最省力的做法是：先让 AI 用最拿手的网页技术做出漂亮的双栏阅读器界面，最后用 Electron 套一层桌面软件外壳，就能直接读写本地硬盘了。',
    stackRecipe: 'Web 前端界面 + Node.js / Electron 桌面窗口封装'
  },
  {
    id: 'sc-mobile-daily',
    question: '“我想做一个自己每天在手机上随时打开就能刷的单词/诗词卡片、打卡记录或随手记小工具。”',
    recommendId: 'web-app',
    verdict: '省心妙招：先做【01 手机端自适应网页 (PWA)】，添加到手机主屏幕！',
    reason: '不用去下载十几个 G 的苹果 Xcode 开发工具！直接让 AI 做一个适配手机屏幕、底部带导航栏的网页，上线后在手机浏览器点“添加到主屏幕”，它就会变成手机桌面上的全屏独立 App 图标！',
    stackRecipe: '初阶：Mobile-First 网页 + PWA ｜ 进阶确需原生功能再用：React Native (Expo)'
  }
];

// 文科生从 0 到 1 上手的四步路线图
export const BEST_PRACTICE_ROADMAP = [
  {
    stage: '第一步 · 先跑通闭环（第 1~3 天）',
    title: '从“纯前端网页 + 浏览器本地存储”起步，2小时做出第一个作品',
    goal: '不装任何复杂的重型软件、不配后端服务器，先做出一个在手机和电脑上都能点、能看、能存数据的网页。',
    goldenStack: 'HTML / CSS / JS (或 React) + 浏览器 localStorage + GitHub Pages',
    whyItWorks:
      '很多新手一上来就想做“带微信登录和云端数据库的原生手机 App”，结果卡在安装软件和环境报错上三天，直接放弃了。从纯前端网页起步，改完一秒就能在浏览器看到画面，用浏览器自带的 `localStorage` 就能保存你录入的笔记，最后还能免费发到 GitHub Pages 分享给朋友！',
    actionSteps: [
      '1. 先列提纲：去《05 提示词库》复制开卷模板，让 AI 先给你列页面提纲和数据样例，别急着直接写代码。',
      '2. 先放 5 条假数据：让 AI 先用 5 条样本数据把卡片和排版调好看，确认文字和界面文件是分开存放的。',
      '3. 检查手机端：把浏览器窗口拉窄（或开启手机预览），让 AI 把按钮调大、排版调成适合手机单手滑动的样子。'
    ]
  },
  {
    stage: '第二步 · 解放双手（第 1~2 周）',
    title: '用 Python 脚本批量整理资料，喂给你的网页作品',
    goal: '不再手工一条条复制粘贴资料，学会让 AI 写个小脚本帮你把几百篇文档自动整理成标准 JSON 数据。',
    goldenStack: 'Python 批量处理脚本 + JSON 数据文件 + Chrome 浏览器小插件',
    whyItWorks:
      '当你做好了第一步的网页外壳后，如果里面只有 5 条数据太单薄，手工录 200 条又太累。这时候让 AI 写一个 30 行的 Python 脚本，3 秒钟就能把你电脑文件夹里的文献或读书笔记批量转成标准 `.json` 文件，直接放进你的网页里就能展示！',
    actionSteps: [
      '1. 给一个样本：别一次把 100 个文件丢给 AI，先复制其中 1 篇文档的格式发给 AI，告诉它你想提取哪几项内容。',
      '2. 小范围试跑：先让脚本只处理前 3 个文件，你肉眼检查提取出来的表格对不对，没问题再跑全部文件。',
      '3. 衔接网页：让脚本直接输出 `.json` 格式文件，放进你网页项目的 `src/data/` 文件夹，网页瞬间拥有百条真实内容！'
    ]
  },
  {
    stage: '第三步 · 接入 AI 与云端（第 3~4 周）',
    title: '连上云数据库（Supabase）与大模型 API，做出真正的智能应用',
    goal: '当你想让不同用户都能在你的网站上共同留言，或者在网站里内置一个“AI 自动润色/解读助手”时。',
    goldenStack: 'Next.js (前后端一体框架) + Supabase (云数据库) + DeepSeek / Claude API',
    whyItWorks:
      '以前做后端和数据库非常难，但现在有了 `Supabase`（界面长得跟 Excel 表格几乎一样，点点鼠标就能建好云数据库）和 `Next.js`，AI 可以在同一个项目里帮你把前端画面和后端接口一起写好。',
    actionSteps: [
      '1. 锁好密钥：调用付费大模型 API 时，一定要求 AI 把 API Key 放进后端的 `.env` 隐藏文件里，绝不暴露在前端网页。',
      '2. 建好表头：先和 AI 商量好数据库表格有哪几列（Schema），再去联调网页的增删改查功能。',
      '3. 步步存档：每调通一个功能，立刻让 AI 用 `git commit` 存档一次，防止后面改乱。'
    ]
  },
  {
    stage: '第四步 · 跨界打包（进阶拓展）',
    title: '把你做好的网页，一键封装成电脑桌面软件或手机 App',
    goal: '不用重头学一套新语言，直接用“套壳封装”的方式把网页变成桌面端 `.dmg/.exe` 软件或手机端应用。',
    goldenStack: '电脑桌面软件：Electron / Tauri ｜ 手机端：PWA / Expo',
    whyItWorks:
      '因为 AI 写网页的能力最强，所以最聪明的工程策略永远是**“先把核心界面和功能在网页端打磨好，最后再让 AI 套上桌面或手机外壳”**。这样做的成功率比从零硬写原生代码高五倍以上！',
    actionSteps: [
      '1. 变身电脑桌面软件：如果需要直接读写电脑本地硬盘里的几千个文件，让 AI 用 Electron 把你的网页包起来即可。',
      '2. 变身手机桌面图标：让 AI 给你的网页加上 PWA 配置文件（`manifest.json`），手机浏览器点“添加到主屏幕”就能全屏独立运行。'
    ]
  }
];

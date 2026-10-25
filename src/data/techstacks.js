// 卷三 · 器用选型与上手正道：不同产品形态（Web / 手机 App / 桌面软件 / 小程序 / 插件 / 脚本）的技术栈类比、AI 编程优劣势与最佳实践路线图

export const TECH_STACK_CARRIERS = [
  {
    id: 'web-app',
    order: '01',
    carrierName: '现代网页应用 (Web App)',
    literaryMetaphor: '活字通行刊本 · 邸报传单',
    metaphorTag: '开卷即读 · 零安装门槛',
    typicalStack: 'HTML / CSS / JavaScript + React / Vue + Tailwind CSS + Vite / Next.js',
    aiFriendliness: '98% · 极度推荐（文科生破冰首选）',
    aiScoreLevel: 'high',
    oneLineEssence:
      '如同天下通行的白纸黑字印本，读者无需特制书匣（不用去应用商店下载安装），无论在手机还是电脑上，点开链接即可展读。',
    literaryAnalogyDetail:
      '北宋毕昇创活字、明清书坊印通行本，最大优势在于“流通无碍”。Web 应用运行在每个人手机和电脑自带的浏览器里，天然跨平台。你修好一处文字，全球读者刷新页面即刻看到最新善本。',
    aiPros: [
      '【AI 语料最丰沛】GitHub 上有数十亿行公开的 React 与 Tailwind 代码（好比《全唐诗》存世善本最多），AI 闭着眼睛都能写出极高质量的界面与交互，极少出现语法胡诌。',
      '【所见即所得，校勘极快】改一行代码，浏览器 0.1 秒内自动刷新呈现（Hot Reload），文科生能凭肉眼立即审稿，挫败感最低。',
      '【零成本一键刊行】配合 Vercel、Cloudflare Pages 或 GitHub Pages，不花一分钱、不用买服务器，3 分钟即可生成全球可访问的正式网址。'
    ],
    aiCons: [
      '【受浏览器“安全禁苑”所限】网页不能随便翻阅用户电脑硬盘里的私人文件夹，也不能在手机锁屏时强行弹窗提醒。',
      '【框架版本偶有代沟】比如 Next.js 的旧版（Pages Router）与新版（App Router）体例不同，需在开卷《凡例》中向 AI 明确指定版本。'
    ],
    bestUseCases: [
      '数字人文专题展馆、人物关系图谱、互动课程作品',
      '个人学术主页、文学社刊网站、在线词典与检索库',
      '可添加到手机主屏幕的轻量级随身工具（PWA）'
    ],
    aiStarterPrompt:
      '请使用 Vite + React + Tailwind CSS（或零依赖原生 ES Modules）为我构建一个响应式 Web 应用。要求优先适配 375px 手机屏幕与桌面端，数据独立存于 src/data/，暂不引入复杂的后端配置。'
  },
  {
    id: 'mobile-app',
    order: '02',
    carrierName: '原生与跨平台手机 App (iOS / Android)',
    literaryMetaphor: '牙签锦帙 · 贴身佩囊',
    metaphorTag: '触感温润 · 进宫审查严苛',
    typicalStack: '跨端：React Native (Expo) / Flutter ｜ 原生：SwiftUI (iOS) / Kotlin (Android)',
    aiFriendliness: '72% · 建议用 Expo 跨端或 PWA 曲线救国',
    aiScoreLevel: 'medium',
    oneLineEssence:
      '常伴读者袖中的贴身锦囊，能调动相机、震动、定位与离线书库，手感最细腻；但工程配置与上架审查犹如“进宫呈御览”。',
    literaryAnalogyDetail:
      '古人将最珍爱的词集装潢为“袖珍锦帙”随身佩带，随时把玩。独立手机 App 拥有最高级的系统权限（推送通知、桌面小组件、丝滑手势），但它不是一张纸，而是一件需要专门窑口烧制、并经礼部核验腰牌（App Store 审核）方能发行的器物。',
    aiPros: [
      '【Expo (React Native) 大幅降低门槛】如果在 AI 编程中选用 `React Native + Expo`，你可以直接用手机扫二维码实时预览 AI 写出的 App，免去大半配环境之苦。',
      '【SwiftUI 声明式语法贴近自然语言】若只做苹果 iOS 端，苹果的 SwiftUI 语法非常像写提纲（“此处放纵向列表，内含图片与标题”），Claude 对 SwiftUI 的生成质量相当惊艳。'
    ],
    aiCons: [
      '【工具链重如泰山】传统原生开发需下载十几个 G 的 Xcode 或 Android Studio，光是配置模拟器、证书签名（Provisioning Profile）、Gradle 版本冲突，就足以让 90% 的文科生在看到第一个画面前放弃。',
      '【AI 看不见真机环境报错】很多报错不在代码逻辑，而在 Xcode 工程设置或苹果开发者账号权限，AI 无法替你点击软件菜单排障。',
      '【刊行门槛高】上架苹果 App Store 需每年缴纳 99 美元开发者年费，且需通过严苛的人工审核（国内还需完成 App 备案）。'
    ],
    bestUseCases: [
      '需要随时拍照识字（OCR 古籍扫描）、语音录入灵感的随身工具',
      '重度依赖每日打卡提醒、手机桌面小组件（Widget）的诗词/背诵应用',
      '【文科生平替妙招】：90% 的内容型 App 其实可以先做成“移动端自适应网页（PWA）”，在苹果 Safari 点击“添加到主屏幕”，外观体验与真 App 几乎无异！'
    ],
    aiStarterPrompt:
      '我想开发一款手机端应用。为了降低环境配置复杂度，请采用 React Native + Expo Router 框架（或先帮我做成支持 PWA 添加到手机桌面的移动优先 Web 应用），确保所有点击热区不小于 44px，底部配备原生感 Tab 导航。'
  },
  {
    id: 'desktop-app',
    order: '03',
    carrierName: '桌面端独立软件 (Mac / Windows)',
    literaryMetaphor: '书斋紫檀重器 · 案头百宝箱',
    metaphorTag: '直通本地硬盘 · 沉浸治学',
    typicalStack: 'Tauri (Rust + Web) / Electron (Node.js + Web) / Python (PyQt / Tkinter)',
    aiFriendliness: '85% · 先写网页再套壳，事半功倍',
    aiScoreLevel: 'high',
    oneLineEssence:
      '安放在你书房案头的紫檀木书柜，拥有直接翻阅、批改、重命名你电脑硬盘里上万份本地文献（PDF / Markdown / Word）的特权。',
    literaryAnalogyDetail:
      '你日常写作使用的 Obsidian、Zotero、Scrivener 或微信电脑版，都是桌面端软件。为什么有了网页还要做桌面软件？因为浏览器出于安全不能直接读写你电脑里的文件夹；而桌面软件就像请进自家书房的掌书官，可以直接管理你积攒十年的本地文献库。',
    aiPros: [
      '【“借壳上市”奇技：Electron / Tauri】现代桌面软件大多不是用古老的 C++ 写的，而是**把网页（HTML/React）装进一个桌面窗口壳子里**！这意味着你可以先让 AI 用最擅长的 Web 技术写好界面，最后用 Electron 或 Tauri 打包成 `.dmg`（Mac）或 `.exe`（Windows）安装包。',
      '【本地大模型与本地数据库绝配】桌面软件可以直接在本地操作 SQLite 数据库，或连接你电脑上的本地知识库，无需花钱租用云端服务器，隐私性极佳。'
    ],
    aiCons: [
      '【跨系统打包与签名繁琐】在 Mac 上打包后发给朋友，若没有苹果开发者签名认证，朋友电脑会弹出“无法验证开发者”警告（需右键打开）。',
      '【Tauri 涉及 Rust 编译环境】Tauri 虽然打包出来极小巧（仅几 MB），但底层需要安装 Rust 编译器；文科生若图省事，用 `Electron` 或 `Python + Streamlit/Gradio`（本地网页工作台）更容易一次跑通。'
    ],
    bestUseCases: [
      '本地古籍/论文 PDF 双栏对照阅读与批注器',
      '直接读写电脑本地 Markdown 文件夹的双链笔记与卡片盒软件',
      '离线运行的古汉语语料库统计、词频分析与自动排版桌面工具'
    ],
    aiStarterPrompt:
      '我想做一个运行在电脑桌面上的本地文献管理工具。请先帮我采用 Web 技术栈（React + Node.js 本地文件接口，或 Electron 架构）实现核心界面与本地文件夹读写逻辑，确保我可以直接读取和保存本地 Markdown 文件。'
  },
  {
    id: 'mini-program',
    order: '04',
    carrierName: '微信小程序 (WeChat Mini-Program)',
    literaryMetaphor: '茶楼折子戏 · 巾箱袖珍本',
    metaphorTag: '微信内即点即看 · 社交裂变极强',
    typicalStack: '微信原生 (WXML / WXSS / JS) ｜ 跨端框架：Uni-app (Vue) / Taro (React)',
    aiFriendliness: '80% · 适合熟人分享，但受平台规条掣肘',
    aiScoreLevel: 'medium',
    oneLineEssence:
      '开在“微信”这座天下第一大茶楼里的折子戏，同门师友在群里点开卡片就能互动，无需跳出微信，最适合社群传播。',
    literaryAnalogyDetail:
      '宋代勾栏瓦舍里演折子戏，借的是热闹市集的现成客流。微信小程序用的不是标准 HTML（`div`/`p`），而是微信自创的方言变体（`view`/`text`）。它的最大魅力在于微信群与朋友圈的一键转发。',
    aiPros: [
      '【国内社交传播无敌】做好一个《诗词飞花令》或《读书会共读打卡》小程序，直接发到班级群或学术群，大家点开即用。',
      '【AI 熟稔 WXML 与 Uni-app】无论是微信原生语法还是基于 Vue 的 Uni-app，国内开源语料极为丰富，AI 能准确写出页面与微信登录逻辑。'
    ],
    aiCons: [
      '【必须使用“微信开发者工具”】不能直接在普通浏览器里开发，必须下载安装官方的“微信开发者工具”并注册小程序 AppID。',
      '【平台家法森严】小程序对代码包体积有严格限制（主包不超过 2MB），外部链接无法自由跳转，且正式上线必须完成实名备案与内容类目审核（个人主体通常不允许做带公开评论论坛的功能）。'
    ],
    bestUseCases: [
      '学术会议日程手册、课题组问卷采集、读书会每日签到大卡',
      '古诗词答题闯关、方言发音收集、校园文化导览地图'
    ],
    aiStarterPrompt:
      '我正在使用“微信开发者工具”开发一个原生微信小程序。请使用标准的 WXML、WXSS 与 Page({}) 语法为我编写页面，注意不要误用 HTML 的 div/span 标签，改用 view/text，并严格控制样式简洁。'
  },
  {
    id: 'browser-extension',
    order: '05',
    carrierName: '浏览器插件 (Chrome / Edge Extension)',
    literaryMetaphor: '随文夹注签 · 案头批注尺',
    metaphorTag: '寄生名站 · 划词即用',
    typicalStack: 'Manifest V3 + HTML / JavaScript (Content Script & SidePanel)',
    aiFriendliness: '95% · 极小巧精悍，AI 半小时即可写完',
    aiScoreLevel: 'high',
    oneLineEssence:
      '不必自己重新印一部书，而是做一枚精巧的“批注书签”，直接贴在知网、豆瓣、维基百科网页旁，划词即查、一键摘录。',
    literaryAnalogyDetail:
      '古人读书常备“浮签”与“界尺”，随读随贴，将他人书中的妙语直接辑录进自己的《日知录》。浏览器插件正是数字时代的浮签：它能直接改造你正在浏览的任何网页，或在浏览器侧边栏呼出你的私人AI助手。',
    aiPros: [
      '【代码量极少，结构固定】一个完整的浏览器插件往往只需 3~4 个文件（一个 `manifest.json` 凡例配置文件 + 一个脚本 + 一个小弹窗 HTML），AI 几乎能一次性生成100%可用的完整代码。',
      '【免部署、零成本自用】根本不需要买域名和服务器！在 Chrome 浏览器打开“管理扩展程序 → 开启开发者模式 → 加载已解压的文件夹”，10 秒钟就能装到自己浏览器上永久免费使用。'
    ],
    aiCons: [
      '【Manifest V2 与 V3 规范之辨】Chrome 近年升级了插件规范（Manifest V3），让 AI 写插件时只需提醒一句“请严格遵循 Chrome Extension Manifest V3 规范”，即可避开旧版报错。'
    ],
    bestUseCases: [
      '浏览古籍网站或外文文献时，鼠标选中生僻字/典故自动弹出训诂释义',
      '逛知网、豆瓣、公众号时，一键将好段落连同出处网址摘录到本地文献卡片库',
      '把满屏广告与杂乱排版的网页一键净化为“宣纸竖排/护眼古籍阅读模式”'
    ],
    aiStarterPrompt:
      '请遵循 Chrome Extension Manifest V3 规范，帮我写一个极简浏览器插件。包含 manifest.json、content.js 与侧边栏/弹窗页面，实现当我在网页上选中文字时，可以一键摘录并保存为结构化读书笔记。'
  },
  {
    id: 'python-script',
    order: '06',
    carrierName: '本地自动化脚本与数据处理 (Python / Node)',
    literaryMetaphor: '幕后抄书胥吏 · 算学账房',
    metaphorTag: '无界面批处理 · 解放双手',
    typicalStack: 'Python 3 + Pandas / BeautifulSoup / OpenAI SDK / 正则表达式',
    aiFriendliness: '96% · 短平快神器，10行代码顶三天苦力',
    aiScoreLevel: 'high',
    oneLineEssence:
      '不需要画任何花哨的界面（无 UI），专门在后台替你干“批量整理三百篇文档、统计十万字词频”的苦力活。',
    literaryAnalogyDetail:
      '修《永乐大典》或编纂引得（Index），若靠学士亲手一页页抄录卡片、数某字出现几次，皓首亦难穷经。Python 脚本就是你最忠实的幕后抄书胥吏：你只需定好一条规则，它能在三秒钟内翻完五百个文件夹并奉上整整齐齐的 Excel 清册。',
    aiPros: [
      '【AI 的第一母语就是 Python】大模型在 Python 数据处理、文本清洗、正则提取、调用大模型批量翻译/标引上的能力已臻化境。',
      '【单文件即跑，无前端样式烦恼】往往只有一个 `process.py` 文件（几十行代码），不用操心颜色好不好看、按钮对没对齐，跑完直接拿到整理好的 Excel / JSON / Markdown 成果。',
      '【可秒变简易网页台】若觉得黑框命令行不够直观，只需让 AI 加上 `Streamlit` 或 `Gradio` 库，十行代码就能把 Python 脚本变成一个带上传按钮的本地网页工具！'
    ],
    aiCons: [
      '【不适合直接发给不懂技术的读者】脚本主要供你自己在电脑上运行提效；若想分享给全网读者交互使用，仍需转为第 01 类 Web 应用。'
    ],
    bestUseCases: [
      '批量把电脑里 200 个格式混乱的 Word / TXT 古籍文本清洗、重命名并合并为标准语料库',
      '对一部长篇小说或史书进行人物出场频次统计、共现关系提取并生成 CSV 表格',
      '调用 AI 接口，自动将 500 条古文摘要批量翻译成现代汉语并提取关键词标签'
    ],
    aiStarterPrompt:
      '我需要一个运行在本地的 Python 自动化脚本。我的原始文件存放在 `./input` 文件夹下，请帮我编写脚本完成批量文本提取与清洗，并将最终结果输出为清晰的 Excel/CSV 与 JSON 文件，代码中请附中文注释并处理好编码（UTF-8）。'
  }
];

// 互动选型罗盘：根据文科生的真实需求场景，一键推荐最匹配的载体与技术栈
export const STACK_COMPASS_SCENARIOS = [
  {
    id: 'sc-showcase',
    question: '“我想做一个图文并茂的文学作品展、人物关系图谱或期末数字人文汇报，发个链接就能让老师同学在手机和电脑上看。”',
    recommendId: 'web-app',
    verdict: '首选【01 现代网页应用 (Web App)】',
    reason: '无需任何人下载安装，微信群里发个链接点开即看；AI 写网页前端的水平最高，配合 Vercel 可免费发布上线。',
    stackRecipe: 'Vite + React + Tailwind CSS（或零依赖 HTML/CSS/JS） + Vercel 免费托管'
  },
  {
    id: 'sc-batch-text',
    question: '“我手头有几百篇下载下来的古籍 TXT、论文 PDF 或散乱 Word 笔记，想自动提取里面的特定段落、统计词频或批量转成表格。”',
    recommendId: 'python-script',
    verdict: '首选【06 Python 本地自动化脚本】',
    reason: '这类任务不需要画网页界面，重点在于批量读写本地文件与文本正则处理。AI 写 Python 脚本只需几十行就能替你省下三天手工复制粘贴。',
    stackRecipe: 'Python 3 + Pandas / 正则表达式（若想要简单界面可加 Streamlit）'
  },
  {
    id: 'sc-clipper',
    question: '“我平时常在网页上看文献、读豆瓣或知网，想在鼠标选中一段话时，直接点一下就能做训诂批注或存进我的摘录库。”',
    recommendId: 'browser-extension',
    verdict: '首选【05 浏览器插件 (Chrome Extension)】',
    reason: '不必另起炉灶建网站，直接以“随文夹注签”的形态寄生在你常逛的网页上。只需 3 个文件，10 秒钟即可安装到自己的浏览器里。',
    stackRecipe: 'Chrome Extension Manifest V3 + 原生 JavaScript + LocalStorage'
  },
  {
    id: 'sc-local-library',
    question: '“我想做一个像 Obsidian 或 Zotero 那样安放在自己电脑上的私人治学软件，能直接读写我电脑硬盘里的几千个文献文件。”',
    recommendId: 'desktop-app',
    verdict: '首选【03 桌面端软件（Web 先行 + Electron/Tauri 封装）】',
    reason: '切忌一上来硬啃 C++！最佳实践是：先让 AI 用 Web 技术写出漂亮的双栏阅读器界面并跑通本地 Node.js 文件读写，最后再用 Electron 或 Tauri 打包成桌面软件。',
    stackRecipe: 'React + Tailwind (界面) + Node.js / Electron 或 Tauri (本地文件读写与桌面打包)'
  },
  {
    id: 'sc-mobile-daily',
    question: '“我想做一个自己每天走在路上掏出手机就能刷的诗词卡片、背诵打卡或随手记灵感的小工具。”',
    recommendId: 'web-app',
    verdict: '妙招：先做【移动优先 Web 应用 (PWA)】，进阶再用【Expo / SwiftUI】',
    reason: '90% 的个人手机小工具根本不需要去啃几十 G 的 Xcode！先让 AI 做一个 375px 底部导航的移动网页，在手机浏览器点“添加到主屏幕”，秒变全屏 App；若确需底层原生能力，再用 React Native (Expo)。',
    stackRecipe: '初阶：Mobile-First Web (PWA) ｜ 进阶：React Native (Expo) 或 iOS SwiftUI'
  }
];

// 文科生从 0 到 1 真正上手的四阶最佳实践路线图
export const BEST_PRACTICE_ROADMAP = [
  {
    stage: '第一阶 · 破冰立信（第 1~3 天）',
    title: '从“单页纯前端 + 本地存储”起步，跑通第一次开卷到刊行',
    goal: '绝不碰复杂的后端服务器、数据库配置与编译环境，先在 2 小时内做出第一个能点、能看、能存数据的作品。',
    goldenStack: 'HTML / CSS / JS (或 Vite + React) + 浏览器 localStorage',
    whyItWorks:
      '很多文科生之所以半途而废，是因为第一步就选了“做个带微信登录和云数据库的原生手机 App”，结果卡在环境安装上三天没看到一行画面。从纯前端起步，保存代码即可在浏览器看到成果，用 `localStorage` 就能让数据刷新不丢失。',
    actionSteps: [
      '1. 定凡例：用《卷五·案头手札》生成一份开卷诏令，让 AI 先列出目录树与 JSON 数据样例。',
      '2. 铸活字：让 AI 先用 5 条假数据（如 5 首苏轼词）把页面卡片和交互调顺眼。',
      '3. 移动端验收：在浏览器按 F12 切换手机视图（或用本站在顶栏提供的手机预览），指令 AI 把所有按钮调至大拇指易点的 44px 以上。'
    ]
  },
  {
    stage: '第二阶 · 借力治学（第 1~2 周）',
    title: '用 Python 脚本与浏览器插件，解放日常文献整理的双手',
    goal: '把 AI 编程真正用进你的专业课论文、古籍校勘与资料搜集工作流中。',
    goldenStack: 'Python 自动化脚本 + JSON 结构化整理 + Chrome 划词插件',
    whyItWorks:
      '汉语言文学每天都在和海量非结构化文本打交道。学会命令 AI 写一个 50 行的 Python 脚本，帮你把散乱的读书笔记自动提取为标准 JSON，再喂给第一阶做的网页展馆，你就完成了“幕后胥吏整理史料 → 前堂展馆刊印成书”的闭环！',
    actionSteps: [
      '1. 建样本：不要一次把 100 个文件扔给 AI，先拿 1 个文档片段作为“样板”，让 AI 写出提取脚本。',
      '2. 验首卷：先让脚本只处理前 3 个文件，用陈垣“对校法”人工核验无误后，再全量批处理。',
      '3. 存善本：将清洗好的结构化数据存为 `.json` 或 `.csv` 善本，随时供任何网页或图表调用。'
    ]
  },
  {
    stage: '第三阶 · 藏书入云与接入 AI（第 3~4 周）',
    title: '接入云端藏书阁（Supabase）与大模型 API，打造智能体应用',
    goal: '当你想让不同读者都能在你的网站上投稿、评论，或者在你的应用里内置一个“古文训诂 AI 助教”时。',
    goldenStack: 'Next.js (全栈框架) + Supabase (免运维云数据库) + DeepSeek / Claude API',
    whyItWorks:
      '过去搭后端和数据库需要专门的运维工程师；现在有了 `Supabase`（像操作 Excel 表格一样的云数据库）和 `Next.js`（前后端一体框架），AI 可以在同一个项目里同时写好前堂界面与后堂 API 驿站。',
    actionSteps: [
      '1. 护印信：调用大模型 API 时，严令 AI 将 API Key 存入后端的 `.env` 密匣，绝不暴露在前端网页。',
      '2. 立格眼：在 Supabase 中让 AI 用 SQL 语句直接建好数据表（Schema），再联调前端读写。',
      '3. 善用 Git：每调通一个接口，立即让 AI 执行 `git commit` 落印存底，防止后续改动冲毁前功。'
    ]
  },
  {
    stage: '第四阶 · 一稿多刊（进阶拓展）',
    title: '将成熟的 Web 核心，跨界封装为桌面软件与手机 App',
    goal: '无需推倒重学一套新语言，用“借壳封装”之法将你的网页作品变为 Mac/Windows 桌面应用或手机应用。',
    goldenStack: '桌面端：Electron / Tauri ｜ 手机端：PWA / Capacitor / Expo',
    whyItWorks:
      '就像一部《四库》底本校勘精良后，既可印成案头大开本（桌面软件），也可缩印为袖珍巾箱本（手机 App）。先在 AI 最擅长的 Web 领域把核心功能打磨到极致，最后再让 AI 套上桌面或移动端外壳，成功率是直接硬啃原生开发的五倍以上！',
    actionSteps: [
      '1. 桌面化：若需直接读写电脑本地文献库，指令 AI 使用 Electron 或 Tauri 包装现有前端。',
      '2. 随身化：为网页加上 `manifest.json`（PWA 配置），手机浏览器点击“添加到主屏幕”即可获得全屏独立图标体验。'
    ]
  }
];

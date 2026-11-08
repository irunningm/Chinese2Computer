# M3 色板方案（可切换预览）

遵循 [Material Design 3 Color System](https://m3.material.io/styles/color/system/overview)：以 **seed** 派生 tonal roles（primary / secondary / tertiary / surface / on-surface / outline…），再映射到页面既有别名（`--accent`、`--bg-canvas` 等）。

页面右上角 **「色板」** 可即时切换；选择会写入 `localStorage`（`wenxin-palette`），刷新保留。

| 方案 | `data-palette` | Seed hex | 何时选 |
|------|----------------|----------|--------|
| **墨色纸本** | `ink-paper` | `#1C1B1A` | 默认推荐。近墨黑 primary + 克制暖灰纸面（非奶油+陶土），适合长时间阅读与纸本通识感。 |
| **冷灰编辑** | `cool-editorial` | `#3E5568` | 想要杂志/编辑部气质：冷灰 surface、蓝灰 primary，比纸本更「排版刊」。 |
| **青绿通识** | `teal-classroom` | `#2F5F58` | 课堂/通识课氛围：低饱和青绿 ink，平静、不抢正文。 |
| **墨白点睛** | `mono-accent` | `#1F4E79` | 高对比黑白灰底 + 单一深蓝点缀；演示投影或需要强对比时用。 |

实现位置：`src/styles/main.css`（`[data-palette]`）、`index.html` 色板菜单、`src/main.js` `applyPalette`。

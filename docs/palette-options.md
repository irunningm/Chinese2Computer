# 视觉风格方案（可切换预览）

遵循 [Material Design 3 Color System](https://m3.material.io/styles/color/system/overview)：以 **seed** 派生 tonal roles（primary / secondary / tertiary / surface / on-surface / outline…），再映射到页面既有别名（`--accent`、`--bg-canvas` 等）。内容不变，只换「杂志大胆 / 海报大胆」的版式气质。

页面右上角开关可即时切换；标签明确为 **杂志大胆** / **海报大胆**。选择写入 `localStorage`（`wenxin-palette`），刷新保留。

| 方案 | `data-palette` | Seed hex | 气质 |
|------|----------------|----------|------|
| **杂志大胆** | `magazine-bold` | `#9B1D1F` | 编辑部杂志：漆红 primary、冷灰纸面、硬色条/分隔线、锐利字号层级、克制留白；对比强于纸本安静色，仍可读作课堂。 |
| **海报大胆** | `poster-bold` | `#E85D04` | 活动海报：高饱和橙 primary、大色块 masthead、超大粗体标题、海军次色顶栏；词典列表仍可用，但第一印象更「冲」。 |

实现位置：`src/styles/main.css`（`[data-palette]` + 主题 chrome）、`index.html` 风格菜单、`src/main.js` `applyPalette`。

预览 URL 例：`/?tab=dict&palette=magazine-bold` · `/?tab=dict&palette=poster-bold`

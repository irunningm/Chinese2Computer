# 视觉方向（已锁定）

用户锁定参考：`/cursor/stores/self/media/ui-ref-dashboard-blue.jpg` — **soft light dashboard**。

| 项 | 值 |
|----|----|
| Seed / primary | `#3B82F6`（vivid clean blue） |
| Surface | `#F5F6F8` off-white / light gray |
| Cards | `#FFFFFF`，大圆角 + soft shadow |
| Positive chip | mint `#D1FAE5` / on `#065F46` |
| Rejected | lacquer red `#9B1D1F`、海报橙 `#E85D04` |

实现：`src/styles/main.css` 的 M3 `--md-sys-color-*` + 词典课壳；控件用官方 `@material/web`（Vite 打包）。不再维护 `data-palette` 双皮肤切换。

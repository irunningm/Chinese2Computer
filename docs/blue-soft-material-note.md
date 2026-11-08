# Soft blue dictionary sample — seed & Material Web

**Seed / primary:** `#3B82F6`  
**Visual lock:** soft light dashboard (off-white `#F5F6F8` ground, white rounded cards, soft shadows, mint status `#D1FAE5` / `#065F46`). Rejects lacquer red / orange poster skins.

## How `@material/web` is used

| Role | Component |
|------|-----------|
| Primary CTA | `md-filled-button`（开始浏览、展开练习、清空搜索） |
| Secondary CTA | `md-outlined-button`（跳到本节练习） |
| Search | `md-outlined-text-field` |
| Category filters | `md-filter-chip`（选中态 = vivid blue pill） |
| Status / copy | `md-assist-chip`（进行中 mint chip、复制提示词） |

Theme: CSS `--md-sys-color-*` on `:root` (same tokens Material Web reads). Layout chrome (cards, bottom pill nav, unit rows) stays in `src/styles/main.css`.

**Build:** Vite (`npm run dev` → `http://127.0.0.1:5173`). Pedagogy fields / boundary content kept from PR #1 dictionary data. No analogy morph in this sample.

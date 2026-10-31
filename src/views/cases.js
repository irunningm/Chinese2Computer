// 卷四 · 实战案例
import { switchTab } from '../core/router.js';
import { state } from '../core/state.js';
import {
  copyToClipboard,
  escapeHtml,
  highlightText,
  renderViewIntro
} from '../core/utils.js';
import { CASE_STUDIES } from '../data/cases.js';
import { VIEW_INTROS } from '../data/copy.js';

/** 从出处字段提取书名号内的书名，用于筛选芯片派生 */
function bookLabelFromSource(sourceBook) {
  const match = String(sourceBook).match(/《[^》]+》/);
  return match ? match[0] : sourceBook;
}

// ==================== TAB 04 · 实战案例 ====================
export function renderCasesView(mount) {
  const currentCase =
    CASE_STUDIES.find((c) => c.id === state.activeCaseId) || CASE_STUDIES[0];
  const totalSlides = currentCase.chapters.length + 1;
  const isLiveSlide = state.activeSlideIndex >= currentCase.chapters.length;

  mount.innerHTML = `
    ${renderViewIntro(VIEW_INTROS.cases)}

    <div class="submode-bar" role="tablist">
      ${CASE_STUDIES.map(
        (c) => `
        <button
          type="button"
          class="submode-btn case-switch-btn ${c.id === currentCase.id ? 'active' : ''}"
          data-case-id="${c.id}"
        >
          ${escapeHtml(c.shortTitle || c.title)}
        </button>
      `
      ).join('')}
    </div>

    <div class="view-header-card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
        <span class="card-index-pill">
          ${isLiveSlide ? `第 ${totalSlides} 步 · 成品在线试玩` : `第 ${state.activeSlideIndex + 1} 步 / 共 ${totalSlides} 步`}
        </span>
        <button
          type="button"
          id="jump-live-demo-btn"
          class="chip-btn ${isLiveSlide ? 'active' : ''}"
          style="min-height: 32px; padding: 0.2rem 0.75rem; font-size: 0.76rem;"
        >
          ${isLiveSlide ? '返回第 1 步复盘过程' : '直接试玩做好的成品 →'}
        </button>
      </div>

      <div class="step-progress-dots">
        ${Array.from({ length: totalSlides })
          .map(
            (_, idx) => `
          <button
            type="button"
            class="step-dot slide-dot-btn ${idx === state.activeSlideIndex ? 'active' : idx < state.activeSlideIndex ? 'completed' : ''}"
            data-sidx="${idx}"
            aria-label="第 ${idx + 1} 步"
          ></button>
        `
          )
          .join('')}
      </div>

      <div id="case-slide-content"></div>

      <div style="display: flex; justify-content: space-between; gap: 0.75rem; margin-top: 1.35rem; padding-top: 1rem; border-top: 1px solid var(--border-hairline);">
        <button
          type="button"
          id="case-prev-slide-btn"
          class="btn-secondary-pill"
          style="flex: 1;"
          ${state.activeSlideIndex === 0 ? 'disabled' : ''}
        >
          ← 上一步
        </button>
        <button
          type="button"
          id="case-next-slide-btn"
          class="btn-terracotta-pill"
          style="flex: 1.4;"
        >
          ${
            state.activeSlideIndex < currentCase.chapters.length - 1
              ? `下一步 (${state.activeSlideIndex + 2}/${totalSlides}) →`
              : state.activeSlideIndex === currentCase.chapters.length - 1
                ? '下一步：亲自试玩作品成品 →'
                : '前往「05 提示词库」复制模板 →'
          }
        </button>
      </div>
    </div>
  `;

  const slideContainer = document.getElementById('case-slide-content');
  if (isLiveSlide) {
    if (currentCase.liveDemoType === 'honglou') {
      renderHonglouInteractiveSlide(slideContainer, currentCase);
    } else if (currentCase.liveDemoType === 'songnotes') {
      renderSongNotesInteractiveSlide(slideContainer, currentCase);
    } else {
      renderCorpusDesktopInteractiveSlide(slideContainer, currentCase);
    }
  } else {
    renderCaseChapterSlide(
      slideContainer,
      currentCase,
      currentCase.chapters[state.activeSlideIndex]
    );
  }

  mount.querySelectorAll('.case-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeCaseId = btn.dataset.caseId;
      state.activeSlideIndex = 0;
      renderCasesView(mount);
    });
  });

  mount.querySelectorAll('.slide-dot-btn').forEach((dot) => {
    dot.addEventListener('click', () => {
      state.activeSlideIndex = Number(dot.dataset.sidx);
      renderCasesView(mount);
    });
  });

  const jumpBtn = document.getElementById('jump-live-demo-btn');
  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      state.activeSlideIndex = isLiveSlide ? 0 : currentCase.chapters.length;
      renderCasesView(mount);
    });
  }

  const prevBtn = document.getElementById('case-prev-slide-btn');
  const nextBtn = document.getElementById('case-next-slide-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.activeSlideIndex > 0) {
        state.activeSlideIndex -= 1;
        renderCasesView(mount);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.activeSlideIndex < totalSlides - 1) {
        state.activeSlideIndex += 1;
        renderCasesView(mount);
      } else {
        switchTab('prompts');
      }
    });
  }
}

export function renderCaseChapterSlide(container, currentCase, chapter) {
  const isMaster = state.promptCompareMode === 'master';

  container.innerHTML = `
    <div style="font-size: 0.78rem; color: var(--text-tertiary); margin-top: 0.5rem;">
      ${escapeHtml(currentCase.badge)} · ${escapeHtml(currentCase.title)}
    </div>
    <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 600; margin: 0.25rem 0 0.65rem;">
      ${escapeHtml(chapter.step)}：${escapeHtml(chapter.title)}
    </h2>
    <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.72;">
      ${escapeHtml(chapter.story)}
    </p>

    <div class="prompt-switch-tabs">
      <button
        type="button"
        class="prompt-switch-btn is-master ${isMaster ? 'active' : ''}"
        data-pmode="master"
      >
        ✓ 结构化提问（推荐示范）
      </button>
      <button
        type="button"
        class="prompt-switch-btn is-naive ${!isMaster ? 'active' : ''}"
        data-pmode="naive"
      >
        ✕ 新手笼统提问（踩坑对比）
      </button>
    </div>

    ${
      isMaster
        ? `
      <div style="background: var(--bg-subtle); border-left: 3px solid var(--sage); border-radius: 0 8px 8px 0; padding: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--sage); font-weight: 600;">
            STRUCTURED PROMPT · 结构化指令示范
          </span>
          <button type="button" id="copy-chapter-prompt-btn" class="chip-btn" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 0.74rem;">
            复制此指令
          </button>
        </div>
        <pre style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.68; white-space: pre-wrap; background: var(--bg-surface); padding: 0.85rem; border-radius: 6px; margin-bottom: 0.65rem;">${escapeHtml(chapter.masterPrompt)}</pre>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong style="color: var(--sage);">一次成功效果：</strong>${escapeHtml(chapter.masterOutcome)}
        </div>
      </div>
    `
        : `
      <div style="background: var(--crimson-soft); border-left: 3px solid var(--crimson); border-radius: 0 8px 8px 0; padding: 1rem;">
        <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--crimson); font-weight: 600; margin-bottom: 0.5rem;">
          NAIVE PROMPT · 笼统直觉提问（反面教材）
        </div>
        <pre style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.68; white-space: pre-wrap; background: var(--bg-surface); padding: 0.85rem; border-radius: 6px; margin-bottom: 0.65rem;">“${escapeHtml(chapter.naivePrompt)}”</pre>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong style="color: var(--crimson);">为什么会翻车：</strong>${escapeHtml(chapter.naiveOutcome)}
        </div>
      </div>
    `
    }

    <div style="margin-top: 0.9rem; font-size: 0.85rem; color: var(--text-secondary); background: var(--accent-soft); padding: 0.75rem 0.95rem; border-radius: var(--radius-xs);">
      ${escapeHtml(chapter.engInsight)}
    </div>
  `;

  container.querySelectorAll('.prompt-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.promptCompareMode = btn.dataset.pmode;
      renderCaseChapterSlide(container, currentCase, chapter);
    });
  });

  const copyBtn = container.querySelector('#copy-chapter-prompt-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () =>
      copyToClipboard(chapter.masterPrompt, copyBtn)
    );
  }
}

export function renderHonglouInteractiveSlide(container, currentCase) {
  // 分组按钮从数据中自动生成，不在界面代码里写死
  const groups = ['all', ...new Set(currentCase.liveDemoData.map((c) => c.group))];
  const items = currentCase.liveDemoData.filter(
    (item) =>
      state.honglouGroupFilter === 'all' || item.group === state.honglouGroupFilter
  );

  container.innerHTML = `
    <h2 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin: 0.5rem 0 0.35rem;">
      成品试玩：《红楼梦》金陵十二钗花签与判词卡片
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      点击下方人物卡片上的「点击翻转看判词 ↻」按钮，亲自体验林知微同学用 AI 做出的网页组件：
    </p>

    <div class="chips-scroll-row">
      ${groups
        .map(
          (g) => `
        <button
          type="button"
          class="chip-btn honglou-group-btn ${state.honglouGroupFilter === g ? 'active' : ''}"
          data-group="${g}"
        >
          ${g === 'all' ? `全部人物 (${currentCase.liveDemoData.length})` : g}
        </button>
      `
        )
        .join('')}
    </div>

    <div class="cards-feed-grid">
      ${items
        .map((ch) => {
          const isFlipped = Boolean(state.flippedCards[ch.id]);
          return `
          <div class="intuition-card" style="cursor: default; ${isFlipped ? 'box-shadow: var(--ring-active);' : ''}">
            <div>
              <div class="card-top-meta">
                <span style="font-family: var(--font-serif); font-size: 1.18rem; font-weight: 600;">
                  ${escapeHtml(ch.name)}
                </span>
                <span class="card-index-pill">${escapeHtml(ch.group)}</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-tertiary); margin-bottom: 0.65rem;">
                别号：${escapeHtml(ch.title)} · 唯一标识 id: "${ch.id}"
              </div>

              ${
                !isFlipped
                  ? `
                <div style="background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-xs);">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 0.25rem;">
                    卡片正面 · 群芳夜宴花签
                  </div>
                  <div style="font-family: var(--font-serif); font-weight: 600; font-size: 0.95rem; margin-bottom: 0.3rem;">
                    ${escapeHtml(ch.flower)}
                  </div>
                  <div style="font-family: var(--font-serif); font-size: 1rem; color: var(--text-primary);">
                    「${escapeHtml(ch.tallyVerse)}」
                  </div>
                </div>
              `
                  : `
                <div style="background: var(--accent-soft); padding: 0.85rem; border-radius: var(--radius-xs);">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 0.25rem;">
                    卡片背面 · 太虚幻境判词与批注
                  </div>
                  <div style="font-family: var(--font-serif); font-size: 0.92rem; margin-bottom: 0.45rem;">
                    ${escapeHtml(ch.verdict)}
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    ${escapeHtml(ch.note)}
                  </div>
                </div>
              `
              }
            </div>

            <button
              type="button"
              class="btn-secondary-pill flip-tally-btn"
              style="width: 100%;"
              data-char-id="${ch.id}"
            >
              ${isFlipped ? '↺ 翻回正面花签' : '点击翻转看判词与批注 ↻'}
            </button>
          </div>
        `;
        })
        .join('')}
    </div>
  `;

  container.querySelectorAll('.honglou-group-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.honglouGroupFilter = btn.dataset.group;
      renderHonglouInteractiveSlide(container, currentCase);
    });
  });

  container.querySelectorAll('.flip-tally-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.charId;
      state.flippedCards[id] = !state.flippedCards[id];
      renderHonglouInteractiveSlide(container, currentCase);
    });
  });
}

export function renderSongNotesInteractiveSlide(container, currentCase) {
  const allNotes = currentCase.liveDemoData;
  // 书目芯片从数据派生，避免与 liveDemoData 硬编码脱节
  const derivedBooks = [
    ...new Set(allNotes.map((n) => bookLabelFromSource(n.sourceBook)))
  ];
  const books = ['all', ...derivedBooks];
  if (state.songBookFilter !== 'all' && !derivedBooks.includes(state.songBookFilter)) {
    state.songBookFilter = 'all';
  }

  const q = state.songSearchQuery.trim().toLowerCase();
  const filtered = allNotes.filter((n) => {
    const matchBook =
      state.songBookFilter === 'all' || n.sourceBook.includes(state.songBookFilter);
    if (!matchBook) return false;
    if (!q) return true;
    const text = `${n.title} ${n.sourceBook} ${n.quote} ${n.comment} ${n.tags.join(' ')}`.toLowerCase();
    return text.includes(q);
  });

  container.innerHTML = `
    <h2 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin: 0.5rem 0 0.35rem;">
      成品试玩：《宋代笔记》多标签筛选与荧光笔高亮检索台
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      在下方搜索框尝试输入“夜市”、“活板”或“野史”，体验实时关键词荧光高亮：
    </p>

    <input
      type="search"
      id="song-live-input"
      class="search-input-bar"
      placeholder="输入字词实时高亮搜索（如：夜市、活板、野史）"
      value="${escapeHtml(state.songSearchQuery)}"
    />

    <div class="chips-scroll-row">
      ${books
        .map(
          (b) => `
        <button
          type="button"
          class="chip-btn song-book-chip ${state.songBookFilter === b ? 'active' : ''}"
          data-book="${escapeHtml(b)}"
        >
          ${b === 'all' ? `全部书目 (${allNotes.length})` : escapeHtml(b)}
        </button>
      `
        )
        .join('')}
    </div>

    ${
      filtered.length === 0
        ? `
      <div class="view-header-card" style="text-align: center; margin-top: 0.5rem;">
        <p style="font-family: var(--font-serif); font-size: 1.05rem; margin: 0 0 0.5rem;">
          未找到符合条件的笔记
        </p>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0 0 1rem;">
          当前书目筛选与关键词组合没有命中条目。可以清空后重试，或换一个更宽的检索词。
        </p>
        <button type="button" id="song-clear-filters-btn" class="btn-primary-pill" style="min-height: 44px;">
          一键清空筛选
        </button>
      </div>
    `
        : `
    <div class="cards-feed-grid">
      ${filtered
        .map(
          (note) => `
        <div class="intuition-card" style="cursor: default;">
          <div>
            <div class="card-top-meta">
              <span class="card-index-pill">${highlightText(note.sourceBook, state.songSearchQuery)}</span>
              <span class="card-badge-text">${escapeHtml(note.author)}</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 600; margin: 0.5rem 0;">
              ${highlightText(note.title, state.songSearchQuery)}
            </h3>
            <p style="font-family: var(--font-serif); font-size: 0.88rem; background: var(--bg-subtle); padding: 0.7rem; border-radius: 6px; margin-bottom: 0.5rem;">
              「${highlightText(note.quote, state.songSearchQuery)}」
            </p>
            <p style="font-size: 0.82rem; color: var(--text-secondary);">
              ${highlightText(note.comment, state.songSearchQuery)}
            </p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
    `
    }
  `;

  const input = document.getElementById('song-live-input');
  if (input) {
    input.addEventListener('input', (e) => {
      state.songSearchQuery = e.target.value;
      const pos = e.target.selectionStart;
      renderSongNotesInteractiveSlide(container, currentCase);
      const next = document.getElementById('song-live-input');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });
  }

  container.querySelectorAll('.song-book-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.songBookFilter = btn.dataset.book;
      renderSongNotesInteractiveSlide(container, currentCase);
    });
  });

  const clearBtn = document.getElementById('song-clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.songSearchQuery = '';
      state.songBookFilter = 'all';
      renderSongNotesInteractiveSlide(container, currentCase);
    });
  }
}

export function renderCorpusDesktopInteractiveSlide(container, currentCase) {
  const items = currentCase.liveDemoData;
  const activeItem =
    items.find((i) => i.id === state.activeCorpusPoetId) || items[0];
  const currentNote =
    state.corpusCustomNotes[activeItem.id] !== undefined
      ? state.corpusCustomNotes[activeItem.id]
      : activeItem.scholarNote;

  container.innerHTML = `
    <h2 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin: 0.5rem 0 0.35rem;">
      成品试玩：Python 词频统计 + Electron 桌面双栏批注器
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      切换下方诗人卡片，体验陈景行同学把 Python 词频结果接入桌面双栏阅读器、并直接保存批注到本地硬盘的效果：
    </p>

    <div class="chips-scroll-row">
      ${items
        .map(
          (item) => `
        <button
          type="button"
          class="chip-btn corpus-poet-chip ${item.id === activeItem.id ? 'active' : ''}"
          data-poet-id="${item.id}"
        >
          ${escapeHtml(item.poet)} · ${escapeHtml(item.imagery)}
        </button>
      `
        )
        .join('')}
    </div>

    <div style="background: var(--bg-subtle); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); overflow: hidden;">
      <div style="padding: 0.55rem 0.9rem; background: var(--bg-recessed); border-bottom: 1px solid var(--border-hairline); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);">
        <span>Electron Desktop Window · 唐宋贬谪诗文双栏阅读器.app</span>
        <span id="ipc-save-status" style="color: var(--sage);">● 已连接电脑硬盘 userData/scholar_notes.json</span>
      </div>

      <div class="cards-feed-grid" style="padding: 1rem;">
        <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-xs);">
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); margin-bottom: 0.3rem;">
            左栏 · Python 脚本自动统计的词频与原句
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.12rem; font-weight: 600; margin-bottom: 0.25rem;">
            ${escapeHtml(activeItem.poet)}（${escapeHtml(activeItem.exilePlace)}）
          </h3>
          <div style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 0.65rem;">
            ${escapeHtml(activeItem.poemTitle)}
          </div>
          <p style="font-family: var(--font-serif); font-size: 0.95rem; padding: 0.75rem; background: var(--bg-subtle); border-radius: 6px; margin-bottom: 0.65rem;">
            「${escapeHtml(activeItem.contextSnippet)}」
          </p>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--sage); background: var(--sage-soft); padding: 0.4rem 0.65rem; border-radius: 4px;">
            Python 统计结果：${escapeHtml(activeItem.freqCount)}
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-xs); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); margin-bottom: 0.3rem;">
              右栏 · 我的论文批注（可直接在下方修改文字）
            </div>
            <textarea
              id="corpus-note-textarea"
              rows="4"
              style="width: 100%; background: var(--bg-canvas); border: 1px solid var(--border-strong); border-radius: 6px; padding: 0.65rem; font-size: 0.88rem; line-height: 1.65; margin-bottom: 0.65rem;"
            >${escapeHtml(currentNote)}</textarea>
          </div>
          <button type="button" id="save-ipc-note-btn" class="btn-primary-pill" style="width: 100%;">
            保存批注到本地电脑硬盘文件
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.corpus-poet-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeCorpusPoetId = btn.dataset.poetId;
      renderCorpusDesktopInteractiveSlide(container, currentCase);
    });
  });

  const textarea = document.getElementById('corpus-note-textarea');
  const saveBtn = document.getElementById('save-ipc-note-btn');
  const statusEl = document.getElementById('ipc-save-status');
  if (saveBtn && textarea) {
    saveBtn.addEventListener('click', () => {
      state.corpusCustomNotes[activeItem.id] = textarea.value;
      if (statusEl) {
        statusEl.textContent = '✓ 已实时写入电脑硬盘 userData/scholar_notes.json';
      }
      saveBtn.textContent = '已保存至本地硬盘 ✓';
      setTimeout(() => {
        saveBtn.textContent = '保存批注到本地电脑硬盘文件';
      }, 1500);
    });
  }
}

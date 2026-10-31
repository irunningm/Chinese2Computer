// 卷二 · 概念词典
import { openSheet } from '../core/sheet.js';
import { state } from '../core/state.js';
import { copyToClipboard, escapeHtml, highlightText, renderViewIntro } from '../core/utils.js';
import { VIEW_INTROS } from '../data/copy.js';
import { DICTIONARY_CATEGORIES, DICTIONARY_ENTRIES } from '../data/dictionary.js';

// ==================== TAB 02 · 概念词典 ====================
export function getFilteredDictEntries() {
  const kw = state.dictSearch.trim().toLowerCase();
  return DICTIONARY_ENTRIES.filter((entry) => {
    const matchCat =
      state.dictCategory === 'all' || entry.category === state.dictCategory;
    if (!matchCat) return false;
    if (!kw) return true;
    const haystack = [
      entry.literaryTerm,
      entry.engTerm,
      entry.classicQuote,
      entry.epiphany,
      entry.litPerspective,
      entry.engPerspective,
      ...entry.engKeywords
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(kw);
  });
}

export function renderDictView(mount) {
  const filtered = getFilteredDictEntries();

  mount.innerHTML = `
    ${renderViewIntro(VIEW_INTROS.dict)}

    <input
      type="search"
      id="dict-search-input"
      class="search-input-bar"
      placeholder="输入关键词搜索（如：主谓宾、提纲、病句、Git、组件、JSON）"
      value="${escapeHtml(state.dictSearch)}"
    />

    <div class="chips-scroll-row" role="tablist">
      ${DICTIONARY_CATEGORIES.map((cat) => {
        const count =
          cat.id === 'all'
            ? DICTIONARY_ENTRIES.length
            : DICTIONARY_ENTRIES.filter((e) => e.category === cat.id).length;
        return `
          <button
            type="button"
            class="chip-btn ${state.dictCategory === cat.id ? 'active' : ''}"
            data-cat-id="${cat.id}"
          >
            ${escapeHtml(cat.name)} (${count})
          </button>
        `;
      }).join('')}
    </div>

    ${
      filtered.length === 0
        ? `
      <div class="view-header-card" style="text-align: center; padding: 2.5rem 1.5rem;">
        <p style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 0.5rem;">
          没有找到与「${escapeHtml(state.dictSearch)}」相关的词条
        </p>
        <button type="button" id="reset-dict-btn" class="btn-primary-pill" style="margin-top: 0.75rem;">
          清空搜索条件
        </button>
      </div>
    `
        : `
      <div class="cards-feed-grid">
        ${filtered
          .map((entry, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return `
            <button
              type="button"
              class="intuition-card dict-entry-card"
              data-entry-id="${entry.id}"
            >
              <div>
                <div class="card-top-meta">
                  <span class="card-index-pill">${num} · ${escapeHtml(entry.categoryLabel)}</span>
                  <span class="card-badge-text">${escapeHtml(entry.engKeywords[0] || '')}</span>
                </div>
                <h2 class="card-lit-heading" style="margin-top: 0.6rem;">
                  ${highlightText(entry.literaryTerm, state.dictSearch)}
                </h2>
                <div class="card-eng-mapping">
                  ↔ ${highlightText(entry.engTerm, state.dictSearch)}
                </div>
              </div>

              <div class="card-epiphany-text">
                ${highlightText(entry.epiphany, state.dictSearch)}
              </div>

              <div class="card-action-footer">
                <span style="font-size: 0.75rem; color: var(--text-tertiary);">
                  含生活例子与 AI 提问话术
                </span>
                <span class="tap-cue">点击查看详解 →</span>
              </div>
            </button>
          `;
          })
          .join('')}
      </div>
    `
    }
  `;

  const searchInput = document.getElementById('dict-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.dictSearch = e.target.value;
      const pos = e.target.selectionStart;
      renderDictView(mount);
      const nextInput = document.getElementById('dict-search-input');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(pos, pos);
      }
    });
  }

  mount.querySelectorAll('.chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.dictCategory = btn.dataset.catId;
      renderDictView(mount);
    });
  });

  const resetBtn = document.getElementById('reset-dict-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.dictCategory = 'all';
      state.dictSearch = '';
      renderDictView(mount);
    });
  }

  mount.querySelectorAll('.dict-entry-card').forEach((card) => {
    card.addEventListener('click', () => {
      openDictEntrySheet(card.dataset.entryId);
    });
  });
}

export function openDictEntrySheet(entryId) {
  const list = getFilteredDictEntries();
  const idx = list.findIndex((e) => e.id === entryId);
  const entry = list[idx] || DICTIONARY_ENTRIES.find((e) => e.id === entryId);
  if (!entry) return;

  const bodyHtml = `
    <div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.5rem;">
        ${entry.engKeywords
          .map(
            (k) =>
              `<span style="font-family: var(--font-mono); font-size: 0.72rem; background: var(--bg-recessed); padding: 0.12rem 0.5rem; border-radius: 4px;">${escapeHtml(k)}</span>`
          )
          .join('')}
      </div>
      <h2 style="font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; line-height: 1.28; margin-bottom: 0.25rem;">
        ${escapeHtml(entry.literaryTerm)}
      </h2>
      <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--accent); font-weight: 500; margin-bottom: 0.65rem;">
        ↔ ${escapeHtml(entry.engTerm)}
      </div>
      <blockquote style="font-family: var(--font-serif); font-size: 0.84rem; color: var(--text-tertiary); border-left: 2px solid var(--border-strong); padding-left: 0.75rem;">
        ${escapeHtml(entry.classicQuote)}
      </blockquote>
    </div>

    <div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.92rem;">
      <strong>一句话点透：</strong>${escapeHtml(entry.epiphany)}
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
        <strong style="font-family: var(--font-serif); font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">
          一、我们熟悉的汉语/写作常识
        </strong>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
          ${escapeHtml(entry.litPerspective)}
        </p>
      </div>

      <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
        <strong style="font-family: var(--font-serif); font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">
          二、对应的软件工程原理
        </strong>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
          ${escapeHtml(entry.engPerspective)}
        </p>
      </div>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--accent);">
          怎么用这个概念指导 AI 写代码？
        </strong>
        <button type="button" id="dict-copy-action-btn" class="chip-btn" style="min-height: 30px; padding: 0.2rem 0.65rem; font-size: 0.75rem;">
          复制话术
        </button>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-primary); line-height: 1.65;">
        ${escapeHtml(entry.aiAction)}
      </p>
    </div>

    <details class="code-disclosure">
      <summary>
        <span>展开「汉语写作例子 vs 代码例子」直观对照</span>
        <span class="toggle-hint">点击展开 +</span>
      </summary>
      <div class="code-disclosure-body">
        <div class="code-sheet-light">
          <span class="code-sheet-label">${escapeHtml(entry.visualCompare.litTitle)}</span>
          <pre class="code-pre-block" style="font-family: var(--font-serif);">${escapeHtml(entry.visualCompare.litCode)}</pre>
        </div>
        <div class="code-sheet-dark">
          <span class="code-sheet-label">${escapeHtml(entry.visualCompare.engTitle)}</span>
          <pre class="code-pre-block">${escapeHtml(entry.visualCompare.engCode)}</pre>
        </div>
      </div>
    </details>
  `;

  const footerHtml = `
    <button
      type="button"
      id="prev-dict-btn"
      class="btn-secondary-pill"
      ${idx <= 0 ? 'disabled' : ''}
    >
      ← 上一词条
    </button>
    <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-tertiary);">
      ${idx + 1} / ${list.length}
    </span>
    <button
      type="button"
      id="next-dict-btn"
      class="btn-primary-pill"
      ${idx < 0 || idx >= list.length - 1 ? 'disabled' : ''}
    >
      下一词条 →
    </button>
  `;

  openSheet({
    kicker: entry.categoryLabel,
    bodyHtml,
    footerHtml,
    onMount: (bodyEl, footerEl) => {
      const copyBtn = bodyEl.querySelector('#dict-copy-action-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () =>
          copyToClipboard(entry.aiAction, copyBtn)
        );
      }
      const prevBtn = footerEl.querySelector('#prev-dict-btn');
      const nextBtn = footerEl.querySelector('#next-dict-btn');
      if (prevBtn && idx > 0) {
        prevBtn.addEventListener('click', () =>
          openDictEntrySheet(list[idx - 1].id)
        );
      }
      if (nextBtn && idx < list.length - 1) {
        nextBtn.addEventListener('click', () =>
          openDictEntrySheet(list[idx + 1].id)
        );
      }
    }
  });
}

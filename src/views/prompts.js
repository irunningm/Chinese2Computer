// 卷五 · 提示词库
import { openSheet } from '../core/sheet.js';
import { state } from '../core/state.js';
import { copyToClipboard, escapeHtml, renderViewIntro } from '../core/utils.js';
import { VIEW_INTROS } from '../data/copy.js';
import { COMPOSER_PRESETS, PROMPT_TEMPLATES } from '../data/prompts.js';
import { TECH_STACK_CARRIERS } from '../data/techstacks.js';

// ==================== TAB 05 · 提示词库 ====================
export function buildComposedDecree() {
  const { carrierId, projectName, projectType, coreFeatures, visualStyle } =
    state.composer;
  const carrier =
    TECH_STACK_CARRIERS.find((c) => c.id === carrierId) || TECH_STACK_CARRIERS[0];

  return `# 新项目开发需求提纲与工程守则 (Project PRD Prompt)

我正在计划开发：${projectName}。
我是本项目的主编（产品负责人），请你担任我的资深全栈工程师助理。

## 一、目标产品形态与技术栈
- 产品形态：${carrier.carrierName}（${carrier.literaryMetaphor}）
- 推荐技术栈：${carrier.typicalStack}
- 技术栈专项要求：${carrier.aiStarterPrompt}

## 二、项目定位与核心功能
- 项目定位：${projectType}
- 核心功能板块：${coreFeatures}

## 三、排版风格与视觉规范
- 视觉要求：${visualStyle}

## 四、协作开发守则（请严格遵守）
1. 先列提纲后写代码：请先不要直接生成长篇代码，先用通俗中文输出《功能板块划分》、《文件夹目录结构》以及《核心数据 JSON 字段示例》供我审阅。
2. 文字资料与排版代码分离：所有展示用的文字、卡片数据必须单独存放在数据文件中，不要把大段文字直接写死在界面代码里，方便我后续自己增删修改文字。
3. 中文导读注释：变量与函数命名请见名知义，并在核心函数上方加上简明的【中文注释】，说明这段代码负责什么功能。`;
}

export function renderPromptsView(mount) {
  mount.innerHTML = `
    ${renderViewIntro(VIEW_INTROS.prompts)}

    <div class="submode-bar" role="tablist">
      <button
        type="button"
        class="submode-btn ${state.promptsSubMode === 'templates' ? 'active' : ''}"
        data-psub="templates"
      >
        1. 6 个高频提问模板 (一键复制)
      </button>
      <button
        type="button"
        class="submode-btn ${state.promptsSubMode === 'composer' ? 'active' : ''}"
        data-psub="composer"
      >
        2. 定制我的新项目开局提示词
      </button>
    </div>

    <div id="prompts-subview-body"></div>
  `;

  mount.querySelectorAll('.submode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.promptsSubMode = btn.dataset.psub;
      renderPromptsView(mount);
    });
  });

  const subBody = document.getElementById('prompts-subview-body');
  if (state.promptsSubMode === 'templates') {
    renderPromptTemplatesFeed(subBody);
  } else {
    renderPromptComposerForm(subBody);
  }
}

export function renderPromptTemplatesFeed(container) {
  container.innerHTML = `
    <div class="cards-feed-grid">
      ${PROMPT_TEMPLATES.map(
        (tpl, idx) => `
        <div class="intuition-card" style="cursor: default;">
          <div>
            <div class="card-top-meta">
              <span class="card-index-pill">${escapeHtml(tpl.badge)}</span>
              <span class="card-badge-text">0${idx + 1} / 06</span>
            </div>
            <h2 class="card-lit-heading" style="margin-top: 0.55rem;">
              ${escapeHtml(tpl.title)}
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">
              <strong>什么时候用：</strong>${escapeHtml(tpl.whenToUse)}
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button
              type="button"
              class="btn-secondary-pill inspect-tpl-btn"
              style="flex: 1;"
              data-tpl-idx="${idx}"
            >
              查看完整内容
            </button>
            <button
              type="button"
              class="btn-terracotta-pill quick-copy-tpl-btn"
              style="flex: 1.2;"
              data-tpl-idx="${idx}"
            >
              一键复制模板
            </button>
          </div>
        </div>
      `
      ).join('')}
    </div>
  `;

  container.querySelectorAll('.inspect-tpl-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openPromptTemplateSheet(Number(btn.dataset.tplIdx));
    });
  });

  container.querySelectorAll('.quick-copy-tpl-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tpl = PROMPT_TEMPLATES[Number(btn.dataset.tplIdx)];
      if (tpl) copyToClipboard(tpl.template, btn);
    });
  });
}

export function openPromptTemplateSheet(tplIdx) {
  const tpl = PROMPT_TEMPLATES[tplIdx];
  if (!tpl) return;

  const bodyHtml = `
    <div>
      <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 600; margin-bottom: 0.35rem;">
        ${escapeHtml(tpl.title)}
      </h2>
      <p style="font-size: 0.88rem; color: var(--accent); font-weight: 500; margin-bottom: 0.35rem;">
        适用场景：${escapeHtml(tpl.whenToUse)}
      </p>
      <p style="font-family: var(--font-serif); font-size: 0.82rem; color: var(--text-tertiary);">
        ${escapeHtml(tpl.literaryPrinciple)}
      </p>
    </div>

    <div class="code-sheet-light" style="background: var(--bg-subtle);">
      <span class="code-sheet-label">PROMPT TEMPLATE · 复制后把【方括号】里的文字换成你的内容即可</span>
      <pre class="code-pre-block" style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.7;">${escapeHtml(tpl.template)}</pre>
    </div>
  `;

  const footerHtml = `
    <button type="button" id="sheet-copy-full-tpl" class="btn-terracotta-pill" style="width: 100%;">
      复制此提示词模板
    </button>
  `;

  openSheet({
    kicker: tpl.badge,
    bodyHtml,
    footerHtml,
    onMount: (_, footerEl) => {
      const copyBtn = footerEl.querySelector('#sheet-copy-full-tpl');
      if (copyBtn) {
        copyBtn.addEventListener('click', () =>
          copyToClipboard(tpl.template, copyBtn)
        );
      }
    }
  });
}

export function renderPromptComposerForm(container) {
  container.innerHTML = `
    <div class="view-header-card">
      <div style="font-family: var(--font-serif); font-weight: 600; font-size: 1.02rem; margin-bottom: 0.45rem;">
        第一步：选择你想做的产品形态（自动匹配最省心的技术栈要求）
      </div>
      <div class="chips-scroll-row">
        ${TECH_STACK_CARRIERS.map(
          (c) => `
          <button
            type="button"
            class="chip-btn carrier-select-chip ${state.composer.carrierId === c.id ? 'active' : ''}"
            data-cid="${c.id}"
          >
            ${escapeHtml(c.carrierName.split(' ')[0])}
          </button>
        `
        ).join('')}
      </div>

      <div style="font-family: var(--font-serif); font-weight: 600; font-size: 1.02rem; margin: 0.5rem 0 0.45rem;">
        第二步：点击下方任一预设示范（或直接修改下面四个输入框）
      </div>
      <div class="chips-scroll-row">
        ${COMPOSER_PRESETS.map(
          (p, idx) => `
          <button type="button" class="chip-btn preset-fill-btn" data-pidx="${idx}">
            ${escapeHtml(p.label)}
          </button>
        `
        ).join('')}
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.25rem;">
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            1. 项目名称（你想做一个什么作品/工具？）
          </label>
          <input type="text" id="comp-name" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.projectName)}" />
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            2. 项目类型（这是什么类型的网页、工具或脚本？）
          </label>
          <input type="text" id="comp-type" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.projectType)}" />
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            3. 核心功能板块（包含哪几个主要功能？）
          </label>
          <textarea id="comp-features" class="search-input-bar" rows="3" style="margin-bottom: 0; height: auto;">${escapeHtml(state.composer.coreFeatures)}</textarea>
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            4. 视觉与排版风格（你喜欢什么样的色彩和版面感觉？）
          </label>
          <input type="text" id="comp-style" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.visualStyle)}" />
        </div>
      </div>

      <button type="button" id="preview-composed-btn" class="btn-terracotta-pill" style="width: 100%;">
        生成并查看我的《新项目开局提示词》 →
      </button>
    </div>
  `;

  const bindField = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        state.composer[key] = e.target.value;
      });
    }
  };
  bindField('comp-name', 'projectName');
  bindField('comp-type', 'projectType');
  bindField('comp-features', 'coreFeatures');
  bindField('comp-style', 'visualStyle');

  container.querySelectorAll('.carrier-select-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.composer.carrierId = btn.dataset.cid;
      renderPromptComposerForm(container);
    });
  });

  container.querySelectorAll('.preset-fill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = COMPOSER_PRESETS[Number(btn.dataset.pidx)];
      if (preset) {
        state.composer = {
          ...state.composer,
          ...preset
        };
        renderPromptComposerForm(container);
      }
    });
  });

  const previewBtn = document.getElementById('preview-composed-btn');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      const decree = buildComposedDecree();
      openSheet({
        kicker: 'GENERATED PRD PROMPT · 专属新项目开局提示词',
        bodyHtml: `
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            已自动为你加上所选产品形态的最佳技术栈要求，以及“先列提纲后写代码、文字与排版代码分离、中文注释”三大保护规则：
          </p>
          <div class="code-sheet-dark">
            <pre class="code-pre-block" style="font-family: var(--font-sans); font-size: 0.85rem; line-height: 1.72;">${escapeHtml(decree)}</pre>
          </div>
        `,
        footerHtml: `
          <button type="button" id="copy-generated-decree-btn" class="btn-terracotta-pill" style="width: 100%;">
            一键复制提示词（直接粘贴发给 Claude / Cursor / AI 助手）
          </button>
        `,
        onMount: (_, footerEl) => {
          const copyBtn = footerEl.querySelector('#copy-generated-decree-btn');
          if (copyBtn) {
            copyBtn.addEventListener('click', () =>
              copyToClipboard(decree, copyBtn)
            );
          }
        }
      });
    });
  }
}

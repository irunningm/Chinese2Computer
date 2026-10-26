import {
  ARCHITECTURE_NODES,
  REQUEST_FLOW_STEPS,
  DIAGNOSTIC_QUIZZES
} from './data/architecture.js';
import {
  DICTIONARY_CATEGORIES,
  DICTIONARY_ENTRIES
} from './data/dictionary.js';
import {
  TECH_STACK_CARRIERS,
  STACK_COMPASS_SCENARIOS,
  BEST_PRACTICE_ROADMAP
} from './data/techstacks.js';
import { CASE_STUDIES } from './data/cases.js';
import { PROMPT_TEMPLATES, COMPOSER_PRESETS } from './data/prompts.js';

// ==================== Global State ====================
const state = {
  activeTab: 'arch', // 'arch' | 'dict' | 'stacks' | 'cases' | 'prompts'
  theme: 'day',
  mobileSimulator: false,

  // Tab 01: Architecture Sub-modes ('nodes' | 'flow' | 'clinic')
  archSubMode: 'nodes',
  activeFlowStep: 1,
  activeQuizIndex: 0,
  quizAnswers: {},

  // Tab 02: Dictionary
  dictCategory: 'all',
  dictSearch: '',

  // Tab 03: Tech Stacks & Best Practices ('carriers' | 'compass' | 'roadmap')
  stacksSubMode: 'carriers',
  selectedCompassId: STACK_COMPASS_SCENARIOS[0].id,
  activeRoadmapIndex: 0,

  // Tab 04: Case Studies
  activeCaseId: CASE_STUDIES[0].id,
  activeSlideIndex: 0,
  promptCompareMode: 'master',
  honglouGroupFilter: 'all',
  flippedCards: { daiyu: false, baochai: false, xifeng: false, xiangyun: false },
  songBookFilter: 'all',
  songSearchQuery: '夜市',
  activeCorpusPoetId: 'liuzongyuan',
  corpusCustomNotes: {},

  // Tab 05: Prompts ('templates' | 'composer')
  promptsSubMode: 'templates',
  composer: {
    carrierId: 'web-app',
    projectName: COMPOSER_PRESETS[0].projectName,
    projectType: COMPOSER_PRESETS[0].projectType,
    coreFeatures: COMPOSER_PRESETS[0].coreFeatures,
    visualStyle: COMPOSER_PRESETS[0].visualStyle
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightText(text, keyword) {
  const safeText = escapeHtml(text);
  const kw = keyword.trim();
  if (!kw) return safeText;
  const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKw})`, 'gi');
  return safeText.replace(regex, '<mark class="terracotta-mark">$1</mark>');
}

async function copyToClipboard(text, btnElement) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  if (btnElement) {
    const prev = btnElement.textContent;
    btnElement.textContent = '已复制至剪贴板 ✓';
    btnElement.disabled = true;
    setTimeout(() => {
      btnElement.textContent = prev;
      btnElement.disabled = false;
    }, 1500);
  }
}

// ==================== Bottom Sheet / Drawer Controller ====================
function openSheet({ kicker, bodyHtml, footerHtml, onMount }) {
  const backdrop = document.getElementById('sheet-backdrop');
  const kickerEl = document.getElementById('sheet-kicker');
  const bodyEl = document.getElementById('sheet-scroll-body');
  const footerEl = document.getElementById('sheet-bottom-nav');

  kickerEl.textContent = kicker || '';
  bodyEl.innerHTML = bodyHtml || '';
  footerEl.innerHTML = footerHtml || '';
  bodyEl.scrollTop = 0;

  backdrop.classList.add('is-open');
  backdrop.setAttribute('aria-hidden', 'false');

  if (typeof onMount === 'function') {
    onMount(bodyEl, footerEl);
  }
}

function closeSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  backdrop.classList.remove('is-open');
  backdrop.setAttribute('aria-hidden', 'true');
}

// ==================== Main Router: Render Active Tab Only ====================
function switchTab(tabId) {
  state.activeTab = tabId;

  document.querySelectorAll('.desktop-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.bottom-tab-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  const appRoot = document.querySelector('.app-root');
  if (appRoot) appRoot.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });

  renderActiveView();
}

function renderActiveView() {
  const mount = document.getElementById('active-view-mount');
  if (!mount) return;

  if (state.activeTab === 'arch') {
    renderArchView(mount);
  } else if (state.activeTab === 'dict') {
    renderDictView(mount);
  } else if (state.activeTab === 'stacks') {
    renderStacksView(mount);
  } else if (state.activeTab === 'cases') {
    renderCasesView(mount);
  } else if (state.activeTab === 'prompts') {
    renderPromptsView(mount);
  }
}

// ==================== TAB 01 · 全局全景 ====================
function renderArchView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">01 · System Overview · 5 分钟看懂一个软件是怎么跑起来的</div>
      <h1 class="view-title">把开发软件，看作“运营一家现代杂志社 / 排一篇互动公众号推文”</h1>
      <p class="view-desc">
        无论是学汉语言文学还是理工科，其实每天都在接触这六个环节：前台排版、传话接口、后台大脑、资料表格、修改留痕和 AI 助理。点开下方任意卡片，用最熟悉的生活直觉秒懂软件工程。
      </p>
    </div>

    <div class="submode-bar" role="tablist">
      <button type="button" class="submode-btn ${state.archSubMode === 'nodes' ? 'active' : ''}" data-sub="nodes">
        1. 软件六大核心分工 (点击卡片看详解)
      </button>
      <button type="button" class="submode-btn ${state.archSubMode === 'flow' ? 'active' : ''}" data-sub="flow">
        2. 一次搜索背后的五步流转
      </button>
      <button type="button" class="submode-btn ${state.archSubMode === 'clinic' ? 'active' : ''}" data-sub="clinic">
        3. 3 道实战小测试 (排查问题找谁？)
      </button>
    </div>

    <div id="arch-subview-body"></div>
  `;

  mount.querySelectorAll('.submode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.archSubMode = btn.dataset.sub;
      renderArchView(mount);
    });
  });

  const subBody = document.getElementById('arch-subview-body');
  if (state.archSubMode === 'nodes') {
    renderArchNodesFeed(subBody);
  } else if (state.archSubMode === 'flow') {
    renderArchFlowStepper(subBody);
  } else {
    renderArchClinicStepper(subBody);
  }
}

function renderArchNodesFeed(container) {
  container.innerHTML = `
    <div class="cards-feed-grid">
      ${ARCHITECTURE_NODES.map((node, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        return `
          <button
            type="button"
            class="intuition-card"
            data-node-idx="${idx}"
          >
            <div>
              <div class="card-top-meta">
                <span class="card-index-pill">模块 ${num}</span>
                <span class="card-badge-text">${escapeHtml(node.badge)}</span>
              </div>
              <h2 class="card-lit-heading" style="margin-top: 0.65rem;">
                ${escapeHtml(node.literaryTitle)}
              </h2>
              <div class="card-eng-mapping">
                ↔ ${escapeHtml(node.engTitle)}
              </div>
            </div>

            <div class="card-epiphany-text">
              ${escapeHtml(node.summary)}
            </div>

            <div class="card-action-footer">
              <span style="color: var(--text-tertiary); font-size: 0.76rem;">
                ${escapeHtml(node.literarySub)}
              </span>
              <span class="tap-cue">点击查看详解 →</span>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 1.25rem; text-align: center;">
      <button type="button" id="go-flow-btn" class="btn-secondary-pill">
        看懂了六个分工？看看「一次搜索背后的五步流转」 →
      </button>
    </div>
  `;

  container.querySelectorAll('.intuition-card').forEach((card) => {
    card.addEventListener('click', () => {
      openArchNodeSheet(Number(card.dataset.nodeIdx));
    });
  });

  const goFlowBtn = document.getElementById('go-flow-btn');
  if (goFlowBtn) {
    goFlowBtn.addEventListener('click', () => {
      state.archSubMode = 'flow';
      renderActiveView();
    });
  }
}

function openArchNodeSheet(nodeIdx) {
  const node = ARCHITECTURE_NODES[nodeIdx];
  if (!node) return;

  const bodyHtml = `
    <div>
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 0.25rem;">
        ${escapeHtml(node.engTech)}
      </div>
      <h2 style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 600; line-height: 1.25; margin-bottom: 0.25rem;">
        ${escapeHtml(node.literaryTitle)}
      </h2>
      <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent); font-weight: 500;">
        ↔ ${escapeHtml(node.engTitle)}
      </div>
    </div>

    <div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.92rem;">
      <strong>一句话秒懂：</strong>${escapeHtml(node.summary)}
    </div>

    <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.75;">
      ${escapeHtml(node.metaphorDetail)}
    </p>

    <div>
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.5rem;">
        Three Core Parallels · 三个子概念对应
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${node.threePillars
          .map(
            (p) => `
          <div style="background: var(--bg-subtle); padding: 0.8rem 0.95rem; border-radius: var(--radius-xs);">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.2rem;">
              <strong style="font-family: var(--font-serif); font-size: 0.92rem;">${escapeHtml(p.lit)}</strong>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);">${escapeHtml(p.eng)}</span>
            </div>
            <div style="font-size: 0.84rem; color: var(--text-secondary);">${escapeHtml(p.desc)}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--accent);">
          怎么跟 AI 描述这部分需求？
        </strong>
        <button type="button" id="sheet-copy-tip-btn" class="chip-btn" style="min-height: 30px; padding: 0.2rem 0.65rem; font-size: 0.75rem;">
          复制话术
        </button>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-primary); line-height: 1.65;">
        ${escapeHtml(node.aiPromptTip)}
      </p>
    </div>

    <details class="code-disclosure">
      <summary>
        <span>对代码好奇？展开「日常表达 vs 真实代码」对照</span>
        <span class="toggle-hint">点击展开 +</span>
      </summary>
      <div class="code-disclosure-body">
        <div class="code-sheet-light">
          <span class="code-sheet-label">${escapeHtml(node.codeComparison.litLabel)}</span>
          <pre class="code-pre-block" style="font-family: var(--font-serif);">${escapeHtml(node.codeComparison.litContent)}</pre>
        </div>
        <div class="code-sheet-dark">
          <span class="code-sheet-label">${escapeHtml(node.codeComparison.engLabel)}</span>
          <pre class="code-pre-block">${escapeHtml(node.codeComparison.engContent)}</pre>
        </div>
      </div>
    </details>
  `;

  const footerHtml = `
    <button
      type="button"
      id="prev-node-btn"
      class="btn-secondary-pill"
      ${nodeIdx === 0 ? 'disabled' : ''}
    >
      ← 上一个
    </button>
    <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-tertiary);">
      ${nodeIdx + 1} / ${ARCHITECTURE_NODES.length}
    </span>
    <button
      type="button"
      id="next-node-btn"
      class="btn-primary-pill"
      ${nodeIdx === ARCHITECTURE_NODES.length - 1 ? 'disabled' : ''}
    >
      下一个 →
    </button>
  `;

  openSheet({
    kicker: `模块 0${node.order} · ${node.badge}`,
    bodyHtml,
    footerHtml,
    onMount: (bodyEl, footerEl) => {
      const copyBtn = bodyEl.querySelector('#sheet-copy-tip-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () =>
          copyToClipboard(node.aiPromptTip, copyBtn)
        );
      }
      const prevBtn = footerEl.querySelector('#prev-node-btn');
      const nextBtn = footerEl.querySelector('#next-node-btn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => openArchNodeSheet(nodeIdx - 1));
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => openArchNodeSheet(nodeIdx + 1));
      }
    }
  });
}

function renderArchFlowStepper(container) {
  const stepObj =
    REQUEST_FLOW_STEPS.find((s) => s.step === state.activeFlowStep) ||
    REQUEST_FLOW_STEPS[0];

  container.innerHTML = `
    <div class="view-header-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
        <span class="card-index-pill">第 ${stepObj.step} 步 / 共 5 步</span>
        <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-tertiary);">
          当前环节：${escapeHtml(stepObj.stage)}
        </span>
      </div>

      <div class="step-progress-dots">
        ${REQUEST_FLOW_STEPS.map(
          (s) => `
          <button
            type="button"
            class="step-dot ${s.step === stepObj.step ? 'active' : s.step < stepObj.step ? 'completed' : ''}"
            data-step="${s.step}"
            aria-label="第 ${s.step} 步"
          ></button>
        `
        ).join('')}
      </div>

      <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 600; margin: 1rem 0 0.5rem;">
        日常场景类比：${escapeHtml(stepObj.litAction)}
      </h2>

      <p style="font-size: 0.94rem; color: var(--accent); font-weight: 500; margin-bottom: 0.85rem;">
        软件里实际发生了什么：${escapeHtml(stepObj.engAction)}
      </p>

      <div class="card-epiphany-text" style="margin-bottom: 1rem;">
        <strong>一句话点拨：</strong>${escapeHtml(stepObj.tip)}
      </div>

      <details class="code-disclosure" style="margin-bottom: 1.25rem;">
        <summary>
          <span>查看这一步背后对应的一行代码</span>
          <span class="toggle-hint">点击展开 +</span>
        </summary>
        <div class="code-disclosure-body">
          <div class="code-sheet-dark">
            <pre class="code-pre-block">${escapeHtml(stepObj.codeSnippet)}</pre>
          </div>
        </div>
      </details>

      <div style="display: flex; justify-content: space-between; gap: 0.75rem;">
        <button
          type="button"
          id="flow-prev-btn"
          class="btn-secondary-pill"
          style="flex: 1;"
          ${stepObj.step === 1 ? 'disabled' : ''}
        >
          ← 上一步
        </button>
        <button
          type="button"
          id="flow-next-btn"
          class="btn-terracotta-pill"
          style="flex: 1.4;"
        >
          ${stepObj.step < 5 ? `看下一步 (${stepObj.step + 1}/5) →` : '进入「3道实战小测试」 →'}
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.step-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      state.activeFlowStep = Number(dot.dataset.step);
      renderArchFlowStepper(container);
    });
  });

  const prevBtn = document.getElementById('flow-prev-btn');
  const nextBtn = document.getElementById('flow-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.activeFlowStep > 1) {
        state.activeFlowStep -= 1;
        renderArchFlowStepper(container);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.activeFlowStep < 5) {
        state.activeFlowStep += 1;
        renderArchFlowStepper(container);
      } else {
        state.archSubMode = 'clinic';
        renderActiveView();
      }
    });
  }
}

function renderArchClinicStepper(container) {
  const quiz = DIAGNOSTIC_QUIZZES[state.activeQuizIndex] || DIAGNOSTIC_QUIZZES[0];
  const selectedOptionId = state.quizAnswers[quiz.id];
  const selectedOption = quiz.options.find((o) => o.id === selectedOptionId);

  container.innerHTML = `
    <div class="view-header-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
        <span class="card-index-pill">实战小测试 ${state.activeQuizIndex + 1} / ${DIAGNOSTIC_QUIZZES.length}</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary);">
          点击下方选项即可查看解析
        </span>
      </div>

      <div class="step-progress-dots">
        ${DIAGNOSTIC_QUIZZES.map(
          (q, idx) => `
          <button
            type="button"
            class="step-dot ${idx === state.activeQuizIndex ? 'active' : state.quizAnswers[q.id] ? 'completed' : ''}"
            data-qidx="${idx}"
          ></button>
        `
        ).join('')}
      </div>

      <h2 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; line-height: 1.5; margin: 0.85rem 0 0.5rem;">
        ${escapeHtml(quiz.symptom)}
      </h2>
      <p style="font-size: 0.9rem; color: var(--accent); font-weight: 500; margin-bottom: 1rem;">
        问题：${escapeHtml(quiz.question)}
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.15rem;">
        ${quiz.options
          .map((opt) => {
            let borderStyle = 'border: 1px solid var(--border-hairline); background: var(--bg-subtle);';
            if (selectedOptionId === opt.id) {
              borderStyle = opt.isCorrect
                ? 'border: 1.5px solid var(--sage); background: var(--sage-soft); font-weight: 600;'
                : 'border: 1.5px solid var(--crimson); background: var(--crimson-soft);';
            }
            return `
            <button
              type="button"
              class="quiz-opt-btn"
              data-opt-id="${opt.id}"
              style="min-height: 52px; padding: 0.8rem 1rem; border-radius: var(--radius-sm); text-align: left; font-size: 0.9rem; cursor: pointer; ${borderStyle}"
            >
              <span style="font-family: var(--font-mono); color: var(--text-tertiary); margin-right: 0.4rem;">
                [${opt.id.toUpperCase()}]
              </span>
              ${escapeHtml(opt.label)}
            </button>
          `;
          })
          .join('')}
      </div>

      ${
        selectedOption
          ? `
        <div style="padding: 1rem; border-radius: var(--radius-sm); background: ${
          selectedOption.isCorrect ? 'var(--sage-soft)' : 'var(--crimson-soft)'
        }; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.68;">
          <strong style="display: block; margin-bottom: 0.25rem; color: ${
            selectedOption.isCorrect ? 'var(--sage)' : 'var(--crimson)'
          };">
            ${selectedOption.isCorrect ? '回答正确！' : '再想一想：'}
          </strong>
          ${escapeHtml(selectedOption.feedback)}
        </div>
      `
          : ''
      }

      <div style="display: flex; justify-content: space-between; gap: 0.75rem;">
        <button
          type="button"
          id="quiz-prev-btn"
          class="btn-secondary-pill"
          style="flex: 1;"
          ${state.activeQuizIndex === 0 ? 'disabled' : ''}
        >
          ← 上一题
        </button>
        <button
          type="button"
          id="quiz-next-btn"
          class="btn-primary-pill"
          style="flex: 1.4;"
        >
          ${state.activeQuizIndex < DIAGNOSTIC_QUIZZES.length - 1 ? '下一题 →' : '前往「02 概念词典」 →'}
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.step-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      state.activeQuizIndex = Number(dot.dataset.qidx);
      renderArchClinicStepper(container);
    });
  });

  container.querySelectorAll('.quiz-opt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.quizAnswers[quiz.id] = btn.dataset.optId;
      renderArchClinicStepper(container);
    });
  });

  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      state.activeQuizIndex -= 1;
      renderArchClinicStepper(container);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.activeQuizIndex < DIAGNOSTIC_QUIZZES.length - 1) {
        state.activeQuizIndex += 1;
        renderArchClinicStepper(container);
      } else {
        switchTab('dict');
      }
    });
  }
}

// ==================== TAB 02 · 概念词典 ====================
function getFilteredDictEntries() {
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

function renderDictView(mount) {
  const filtered = getFilteredDictEntries();

  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">02 · Concept Dictionary · 16 个最常遇到的编程概念</div>
      <h1 class="view-title">用《现代汉语》语法、列提纲与写论文的经验，秒懂编程黑话</h1>
      <p class="view-desc">
        其实你早就学过软件工程的底层逻辑：主谓宾就是变量与函数，关联词就是条件循环，写论文列提纲就是软件架构。点击任意卡片查看大白话拆解。
      </p>
    </div>

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

function openDictEntrySheet(entryId) {
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

// ==================== TAB 03 · 技术选型 ====================
function renderStacksView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">03 · Tech Stacks &amp; Best Practices · 产品形态与技术栈</div>
      <h1 class="view-title">做网页、手机 App、电脑桌面软件，背后的技术栈有何不同？</h1>
      <p class="view-desc">
        就像发表作品有公众号长文、精装书、口袋本、内部资料汇编之分。在 AI 编程时代，选对“AI 最擅长、不用折腾环境”的技术栈，能让你少走 90% 的弯路。
      </p>
    </div>

    <div class="submode-bar" role="tablist">
      <button type="button" class="submode-btn ${state.stacksSubMode === 'carriers' ? 'active' : ''}" data-ssub="carriers">
        1. 六大产品形态对比 (含AI优劣势)
      </button>
      <button type="button" class="submode-btn ${state.stacksSubMode === 'compass' ? 'active' : ''}" data-ssub="compass">
        2. 互动选型顾问 (我该选哪个？)
      </button>
      <button type="button" class="submode-btn ${state.stacksSubMode === 'roadmap' ? 'active' : ''}" data-ssub="roadmap">
        3. 从零上手四步路线图 (最佳实践)
      </button>
    </div>

    <div id="stacks-subview-body"></div>
  `;

  mount.querySelectorAll('.submode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.stacksSubMode = btn.dataset.ssub;
      renderStacksView(mount);
    });
  });

  const subBody = document.getElementById('stacks-subview-body');
  if (state.stacksSubMode === 'carriers') {
    renderStackCarriersFeed(subBody);
  } else if (state.stacksSubMode === 'compass') {
    renderStackCompassView(subBody);
  } else {
    renderStackRoadmapStepper(subBody);
  }
}

function renderStackCarriersFeed(container) {
  container.innerHTML = `
    <div class="cards-feed-grid">
      ${TECH_STACK_CARRIERS.map((c, idx) => {
        const badgeStyle =
          c.aiScoreLevel === 'high'
            ? 'background: var(--sage-soft); color: var(--sage);'
            : 'background: var(--accent-soft); color: var(--accent);';
        return `
          <button
            type="button"
            class="intuition-card carrier-card-btn"
            data-cidx="${idx}"
          >
            <div>
              <div class="card-top-meta">
                <span class="card-index-pill" style="${badgeStyle}">AI 友好度：${escapeHtml(c.aiFriendliness.split('·')[0])}</span>
                <span class="card-badge-text">${escapeHtml(c.metaphorTag)}</span>
              </div>
              <h2 class="card-lit-heading" style="margin-top: 0.6rem;">
                ${escapeHtml(c.carrierName)}
              </h2>
              <div class="card-eng-mapping">
                日常类比：${escapeHtml(c.literaryMetaphor)}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary); margin-top: 0.3rem;">
                常用技术栈：${escapeHtml(c.typicalStack)}
              </div>
            </div>

            <div class="card-epiphany-text">
              ${escapeHtml(c.oneLineEssence)}
            </div>

            <div class="card-action-footer">
              <span style="font-size: 0.76rem; color: var(--text-secondary);">
                ${escapeHtml(c.aiFriendliness.split('·')[1] || '')}
              </span>
              <span class="tap-cue">查看 AI 优劣势 →</span>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 1.25rem; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
      <button type="button" id="go-compass-btn" class="btn-secondary-pill">
        拿不准选哪个？试试「互动选型顾问」 →
      </button>
      <button type="button" id="go-roadmap-btn" class="btn-primary-pill">
        查看「新手从 0 到 1 上手四步路线图」 →
      </button>
    </div>
  `;

  container.querySelectorAll('.carrier-card-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openCarrierSheet(Number(btn.dataset.cidx));
    });
  });

  const compassBtn = document.getElementById('go-compass-btn');
  const roadmapBtn = document.getElementById('go-roadmap-btn');
  if (compassBtn) {
    compassBtn.addEventListener('click', () => {
      state.stacksSubMode = 'compass';
      renderActiveView();
    });
  }
  if (roadmapBtn) {
    roadmapBtn.addEventListener('click', () => {
      state.stacksSubMode = 'roadmap';
      renderActiveView();
    });
  }
}

function openCarrierSheet(cidx) {
  const c = TECH_STACK_CARRIERS[cidx];
  if (!c) return;

  const bodyHtml = `
    <div>
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); margin-bottom: 0.25rem;">
        AI 编程友好度：${escapeHtml(c.aiFriendliness)}
      </div>
      <h2 style="font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; line-height: 1.28; margin-bottom: 0.25rem;">
        ${escapeHtml(c.carrierName)}
      </h2>
      <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 0.45rem;">
        直观类比：<strong>${escapeHtml(c.literaryMetaphor)}</strong>（${escapeHtml(c.metaphorTag)}）
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.78rem; background: var(--bg-recessed); padding: 0.45rem 0.7rem; border-radius: 6px;">
        主流技术栈：${escapeHtml(c.typicalStack)}
      </div>
    </div>

    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.72;">
      ${escapeHtml(c.literaryAnalogyDetail)}
    </p>

    <!-- AI Pros -->
    <div style="background: var(--sage-soft); border-left: 3px solid var(--sage); padding: 0.9rem 1rem; border-radius: 0 8px 8px 0;">
      <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--sage); display: block; margin-bottom: 0.45rem;">
        ✓ 在 AI 编程背景下的核心优势（为什么推荐/好做）：
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.86rem; color: var(--text-primary);">
        ${c.aiPros.map((p) => `<div>• ${escapeHtml(p)}</div>`).join('')}
      </div>
    </div>

    <!-- AI Cons -->
    <div style="background: var(--crimson-soft); border-left: 3px solid var(--crimson); padding: 0.9rem 1rem; border-radius: 0 8px 8px 0;">
      <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--crimson); display: block; margin-bottom: 0.45rem;">
        ✕ 在 AI 编程背景下的痛点与避坑提醒：
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.86rem; color: var(--text-primary);">
        ${c.aiCons.map((con) => `<div>• ${escapeHtml(con)}</div>`).join('')}
      </div>
    </div>

    <!-- Best Use Cases -->
    <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
      <strong style="font-family: var(--font-serif); font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">
        最适合用它来做什么项目？
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--text-secondary);">
        ${c.bestUseCases.map((u) => `<div>▪ ${escapeHtml(u)}</div>`).join('')}
      </div>
    </div>

    <!-- Starter Prompt -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.9rem; color: var(--accent);">
          该技术栈的 AI 开局提示词模板：
        </strong>
        <button type="button" id="copy-carrier-prompt-btn" class="chip-btn" style="min-height: 30px; padding: 0.2rem 0.65rem; font-size: 0.75rem;">
          复制提示词
        </button>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.65;">
        ${escapeHtml(c.aiStarterPrompt)}
      </p>
    </div>
  `;

  const footerHtml = `
    <button
      type="button"
      id="prev-carrier-btn"
      class="btn-secondary-pill"
      ${cidx <= 0 ? 'disabled' : ''}
    >
      ← 上一种形态
    </button>
    <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-tertiary);">
      ${cidx + 1} / ${TECH_STACK_CARRIERS.length}
    </span>
    <button
      type="button"
      id="next-carrier-btn"
      class="btn-primary-pill"
      ${cidx >= TECH_STACK_CARRIERS.length - 1 ? 'disabled' : ''}
    >
      下一种形态 →
    </button>
  `;

  openSheet({
    kicker: `形态 0${cidx + 1} · ${c.literaryMetaphor}`,
    bodyHtml,
    footerHtml,
    onMount: (bodyEl, footerEl) => {
      const copyBtn = bodyEl.querySelector('#copy-carrier-prompt-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () =>
          copyToClipboard(c.aiStarterPrompt, copyBtn)
        );
      }
      const prevBtn = footerEl.querySelector('#prev-carrier-btn');
      const nextBtn = footerEl.querySelector('#next-carrier-btn');
      if (prevBtn && cidx > 0) {
        prevBtn.addEventListener('click', () => openCarrierSheet(cidx - 1));
      }
      if (nextBtn && cidx < TECH_STACK_CARRIERS.length - 1) {
        nextBtn.addEventListener('click', () => openCarrierSheet(cidx + 1));
      }
    }
  });
}

function renderStackCompassView(container) {
  const activeSc =
    STACK_COMPASS_SCENARIOS.find((s) => s.id === state.selectedCompassId) ||
    STACK_COMPASS_SCENARIOS[0];
  const matchedCarrierIdx = TECH_STACK_CARRIERS.findIndex(
    (c) => c.id === activeSc.recommendId
  );

  container.innerHTML = `
    <div class="view-header-card">
      <div style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; margin-bottom: 0.65rem;">
        点选最接近你真实需求的一句话，查看最省力的技术栈方案：
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem;">
        ${STACK_COMPASS_SCENARIOS.map((sc, idx) => {
          const isSelected = sc.id === activeSc.id;
          return `
            <button
              type="button"
              class="compass-opt-btn"
              data-sc-id="${sc.id}"
              style="min-height: 52px; padding: 0.8rem 1rem; border-radius: var(--radius-sm); text-align: left; font-size: 0.88rem; cursor: pointer; transition: all 0.15s ease; ${
                isSelected
                  ? 'background: var(--accent-soft); border: 1.5px solid var(--accent); font-weight: 600;'
                  : 'background: var(--bg-subtle); border: 1px solid var(--border-hairline);'
              }"
            >
              <span style="font-family: var(--font-mono); color: var(--accent); margin-right: 0.4rem;">0${idx + 1}.</span>
              ${escapeHtml(sc.question)}
            </button>
          `;
        }).join('')}
      </div>

      <div style="background: var(--bg-subtle); border-top: 2px solid var(--accent); border-radius: var(--radius-sm); padding: 1.25rem;">
        <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--accent); margin-bottom: 0.3rem;">
          RECOMMENDED TECH STACK · 推荐选型方案
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem;">
          ${escapeHtml(activeSc.verdict)}
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 0.75rem;">
          <strong>为什么这样选最省心：</strong>${escapeHtml(activeSc.reason)}
        </p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-surface); padding: 0.65rem 0.9rem; border-radius: 6px; border: 1px solid var(--border-hairline); margin-bottom: 1rem;">
          推荐技术组合：${escapeHtml(activeSc.stackRecipe)}
        </div>

        <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
          <button
            type="button"
            id="compass-open-carrier-btn"
            class="btn-secondary-pill"
          >
            查看该形态完整 AI 优劣势详解
          </button>
          <button
            type="button"
            id="compass-go-composer-btn"
            class="btn-terracotta-pill"
          >
            用此技术栈生成新项目提示词 →
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.compass-opt-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedCompassId = btn.dataset.scId;
      renderStackCompassView(container);
    });
  });

  const openDetailBtn = document.getElementById('compass-open-carrier-btn');
  if (openDetailBtn && matchedCarrierIdx >= 0) {
    openDetailBtn.addEventListener('click', () =>
      openCarrierSheet(matchedCarrierIdx)
    );
  }

  const goComposerBtn = document.getElementById('compass-go-composer-btn');
  if (goComposerBtn) {
    goComposerBtn.addEventListener('click', () => {
      state.composer.carrierId = activeSc.recommendId;
      state.promptsSubMode = 'composer';
      switchTab('prompts');
    });
  }
}

function renderStackRoadmapStepper(container) {
  const stageObj =
    BEST_PRACTICE_ROADMAP[state.activeRoadmapIndex] || BEST_PRACTICE_ROADMAP[0];

  container.innerHTML = `
    <div class="view-header-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
        <span class="card-index-pill">${escapeHtml(stageObj.stage)}</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary);">
          上手阶段 0${state.activeRoadmapIndex + 1} / 0${BEST_PRACTICE_ROADMAP.length}
        </span>
      </div>

      <div class="step-progress-dots">
        ${BEST_PRACTICE_ROADMAP.map(
          (_, idx) => `
          <button
            type="button"
            class="step-dot roadmap-dot-btn ${idx === state.activeRoadmapIndex ? 'active' : idx < state.activeRoadmapIndex ? 'completed' : ''}"
            data-ridx="${idx}"
          ></button>
        `
        ).join('')}
      </div>

      <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 600; margin: 0.85rem 0 0.45rem;">
        ${escapeHtml(stageObj.title)}
      </h2>

      <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); margin-bottom: 0.85rem;">
        本阶段推荐工具：${escapeHtml(stageObj.goldenStack)}
      </div>

      <div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.8rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.9rem; margin-bottom: 0.9rem;">
        <strong>阶段目标：</strong>${escapeHtml(stageObj.goal)}
      </div>

      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.72; margin-bottom: 1rem;">
        ${escapeHtml(stageObj.whyItWorks)}
      </p>

      <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-xs); margin-bottom: 1.25rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.92rem; display: block; margin-bottom: 0.5rem;">
          具体实操三步走：
        </strong>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.86rem; color: var(--text-primary);">
          ${stageObj.actionSteps.map((step) => `<div>${escapeHtml(step)}</div>`).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; gap: 0.75rem;">
        <button
          type="button"
          id="roadmap-prev-btn"
          class="btn-secondary-pill"
          style="flex: 1;"
          ${state.activeRoadmapIndex === 0 ? 'disabled' : ''}
        >
          ← 上一步
        </button>
        <button
          type="button"
          id="roadmap-next-btn"
          class="btn-terracotta-pill"
          style="flex: 1.4;"
        >
          ${
            state.activeRoadmapIndex < BEST_PRACTICE_ROADMAP.length - 1
              ? `下一步 (${state.activeRoadmapIndex + 2}/${BEST_PRACTICE_ROADMAP.length}) →`
              : '去看「04 实战案例」三大作品复盘 →'
          }
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('.roadmap-dot-btn').forEach((dot) => {
    dot.addEventListener('click', () => {
      state.activeRoadmapIndex = Number(dot.dataset.ridx);
      renderStackRoadmapStepper(container);
    });
  });

  const prevBtn = document.getElementById('roadmap-prev-btn');
  const nextBtn = document.getElementById('roadmap-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      state.activeRoadmapIndex -= 1;
      renderStackRoadmapStepper(container);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.activeRoadmapIndex < BEST_PRACTICE_ROADMAP.length - 1) {
        state.activeRoadmapIndex += 1;
        renderStackRoadmapStepper(container);
      } else {
        switchTab('cases');
      }
    });
  }
}

// ==================== TAB 04 · 实战案例 ====================
function renderCasesView(mount) {
  const currentCase =
    CASE_STUDIES.find((c) => c.id === state.activeCaseId) || CASE_STUDIES[0];
  const totalSlides = currentCase.chapters.length + 1;
  const isLiveSlide = state.activeSlideIndex >= currentCase.chapters.length;

  const shortNames = {
    'honglou-gallery': '案例1 · 红楼梦互动网页',
    'song-notes-workbench': '案例2 · 宋代笔记检索台',
    'desktop-corpus-reader': '案例3 · Python词频+桌面软件'
  };

  mount.innerHTML = `
    <div class="submode-bar" role="tablist">
      ${CASE_STUDIES.map(
        (c) => `
        <button
          type="button"
          class="submode-btn case-switch-btn ${c.id === currentCase.id ? 'active' : ''}"
          data-case-id="${c.id}"
        >
          ${escapeHtml(shortNames[c.id] || c.title)}
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

function renderCaseChapterSlide(container, currentCase, chapter) {
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

function renderHonglouInteractiveSlide(container, currentCase) {
  const groups = ['all', '潇湘大观', '金陵四大家'];
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
          ${g === 'all' ? '全部人物 (4)' : g}
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
                    ${escapeHtml(ch.zhiNote)}
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

function renderSongNotesInteractiveSlide(container, currentCase) {
  const allNotes = currentCase.liveDemoData;
  const books = ['all', '《梦溪笔谈》', '《东京梦华录》', '《容斋随笔》', '《东坡志林》'];

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
      在下方搜索框尝试输入“夜市”、“活板”或“史记”，体验实时关键词荧光高亮：
    </p>

    <input
      type="search"
      id="song-live-input"
      class="search-input-bar"
      placeholder="输入字词实时高亮搜索（如：夜市、活板）"
      value="${escapeHtml(state.songSearchQuery)}"
    />

    <div class="chips-scroll-row">
      ${books
        .map(
          (b) => `
        <button
          type="button"
          class="chip-btn song-book-chip ${state.songBookFilter === b ? 'active' : ''}"
          data-book="${b}"
        >
          ${b === 'all' ? '全部书目 (4)' : b}
        </button>
      `
        )
        .join('')}
    </div>

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
}

function renderCorpusDesktopInteractiveSlide(container, currentCase) {
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
        <span id="ipc-save-status" style="color: var(--sage);">● 已连接电脑硬盘 ./data/scholar_notes.json</span>
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
        statusEl.textContent = '✓ 已实时写入电脑硬盘 ./data/scholar_notes.json';
      }
      saveBtn.textContent = '已保存至本地硬盘 ✓';
      setTimeout(() => {
        saveBtn.textContent = '保存批注到本地电脑硬盘文件';
      }, 1500);
    });
  }
}

// ==================== TAB 05 · 提示词库 ====================
function buildComposedDecree() {
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

function renderPromptsView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">05 · Prompt Library · 拿来即用的 AI 提问模板</div>
      <h1 class="view-title">6 个高频场景 AI 提问模板 &amp; 新项目需求生成器</h1>
      <p class="view-desc">
        不知道怎么对 AI 开口？直接选择下方对应场景的模板一键复制，或者填好你的想法，自动生成一份带技术栈护栏的《新项目开局提示词》。
      </p>
    </div>

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

function renderPromptTemplatesFeed(container) {
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

function openPromptTemplateSheet(tplIdx) {
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

function renderPromptComposerForm(container) {
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

// ==================== App Initialization ====================
function initApp() {
  renderActiveView();

  document.querySelectorAll('.desktop-tab-btn, .bottom-tab-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  const homeBtn = document.getElementById('brand-home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => switchTab('arch'));
  }

  const closeBtn = document.getElementById('sheet-close-btn');
  const backdrop = document.getElementById('sheet-backdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSheet();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSheet();
  });

  const simBtn = document.getElementById('mobile-sim-toggle');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      state.mobileSimulator = !state.mobileSimulator;
      document.body.classList.toggle('mobile-simulator-active', state.mobileSimulator);
      simBtn.classList.toggle('active-sim', state.mobileSimulator);
      simBtn.textContent = state.mobileSimulator ? '退出手机预览' : '手机端预览';
    });
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'day' ? 'night' : 'day';
      if (state.theme === 'night') {
        document.documentElement.setAttribute('data-theme', 'night');
        themeBtn.textContent = '浅色模式';
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '夜间模式';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);

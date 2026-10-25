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

// ==================== TAB 01 · 营造法式 ====================
function renderArchView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">01 · System Architecture · 破除代码黑盒</div>
      <h1 class="view-title">把软件工程看作一座“皇家书院与刊刻局”</h1>
      <p class="view-desc">
        在 AI 时代，你不需要亲手刻字（写底层语法），但要懂书院六个部门各自的职责，才能以“总纂官”身份向 AI 精准发令。
      </p>
    </div>

    <div class="submode-bar" role="tablist">
      <button type="button" class="submode-btn ${state.archSubMode === 'nodes' ? 'active' : ''}" data-sub="nodes">
        1. 六大书院部门 (点卡看详卷)
      </button>
      <button type="button" class="submode-btn ${state.archSubMode === 'flow' ? 'active' : ''}" data-sub="flow">
        2. 五步点书推演 (全链路流转)
      </button>
      <button type="button" class="submode-btn ${state.archSubMode === 'clinic' ? 'active' : ''}" data-sub="clinic">
        3. 审稿官断案 (3道测试)
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
                <span class="card-index-pill">第 ${node.order} 席 · ${num}</span>
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
              <span class="tap-cue">点按展开详卷 →</span>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 1.25rem; text-align: center;">
      <button type="button" id="go-flow-btn" class="btn-secondary-pill">
        看懂了六个部门？试试「五步点书推演」 →
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
      <strong>一句话破壁：</strong>${escapeHtml(node.summary)}
    </div>

    <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.75;">
      ${escapeHtml(node.metaphorDetail)}
    </p>

    <div>
      <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.5rem;">
        Three Structural Parallels · 三大核心映射
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
          怎么跟 AI 聊这个部门？
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
        <span>对代码好奇？展开「人文体例 vs 工程代码」对照</span>
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
      ← 上一席
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
      下一席 →
    </button>
  `;

  openSheet({
    kicker: `第 ${node.order} 席 · ${node.badge}`,
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
          当前所在部门：${escapeHtml(stepObj.stage)}
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
        书院情景：${escapeHtml(stepObj.litAction)}
      </h2>

      <p style="font-size: 0.94rem; color: var(--accent); font-weight: 500; margin-bottom: 0.85rem;">
        软件工程里发生了什么：${escapeHtml(stepObj.engAction)}
      </p>

      <div class="card-epiphany-text" style="margin-bottom: 1rem;">
        <strong>眉批提示：</strong>${escapeHtml(stepObj.tip)}
      </div>

      <details class="code-disclosure" style="margin-bottom: 1.25rem;">
        <summary>
          <span>查看这一步触发的一行代码</span>
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
          ${stepObj.step < 5 ? `推演下一步 (${stepObj.step + 1}/5) →` : '进入「审稿官断案」小测试 →'}
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
        <span class="card-index-pill">断案练习 ${state.activeQuizIndex + 1} / ${DIAGNOSTIC_QUIZZES.length}</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary);">
          点选下方选项即可查看朱批解析
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
        设问：${escapeHtml(quiz.question)}
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
            ${selectedOption.isCorrect ? '断案如神！' : '且慢，再审文脉：'}
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
          ${state.activeQuizIndex < DIAGNOSTIC_QUIZZES.length - 1 ? '下一道断案 →' : '前往「02 格物词典」 →'}
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

// ==================== TAB 02 · 格物词典 ====================
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
      <div class="view-kicker">02 · Bilingual Lexicon · 十六则核心映射</div>
      <h1 class="view-title">汉语言 ↔ 软件工程双语读书卡</h1>
      <p class="view-desc">
        每张卡片只讲透一个概念对应。点按任意卡片，立即从底部滑出详卷与 AI 沟通话术。
      </p>
    </div>

    <input
      type="search"
      id="dict-search-input"
      class="search-input-bar"
      placeholder="输入关键词检索（如：用典、校勘、Git、组件、JSON）"
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
          未检出与「${escapeHtml(state.dictSearch)}」相合之词条
        </p>
        <button type="button" id="reset-dict-btn" class="btn-primary-pill" style="margin-top: 0.75rem;">
          重置筛选条件
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
                  含文码对照与 AI 指令话术
                </span>
                <span class="tap-cue">点按精读 →</span>
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
      <strong>眉批顿悟：</strong>${escapeHtml(entry.epiphany)}
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
        <strong style="font-family: var(--font-serif); font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">
          一、汉语言文学本源
        </strong>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
          ${escapeHtml(entry.litPerspective)}
        </p>
      </div>

      <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
        <strong style="font-family: var(--font-serif); font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">
          二、软件工程实相
        </strong>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
          ${escapeHtml(entry.engPerspective)}
        </p>
      </div>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--accent);">
          怎么用这个概念指导 AI？
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
        <span>展开「汉语句法体例 vs 代码实例」对照</span>
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

// ==================== TAB 03 · 器用选型 (Tech Stack Analogy, AI Pros/Cons & Best Practice Roadmap) ====================
function renderStacksView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">03 · Tech Stacks &amp; Best Practices · 器用与技术栈</div>
      <h1 class="view-title">做网页、手机 App、桌面软件，背后的技术栈有何不同？</h1>
      <p class="view-desc">
        古人刊书有通行本、袖珍巾箱本、书斋紫檀重器之分。在 AI 编程时代，选对“AI 语料最丰、反馈最快”的技术栈，能让你少走 90% 的弯路。
      </p>
    </div>

    <div class="submode-bar" role="tablist">
      <button type="button" class="submode-btn ${state.stacksSubMode === 'carriers' ? 'active' : ''}" data-ssub="carriers">
        1. 六大载体技术栈图鉴 (含AI优劣势)
      </button>
      <button type="button" class="submode-btn ${state.stacksSubMode === 'compass' ? 'active' : ''}" data-ssub="compass">
        2. 互动选型罗盘 (我该用哪个？)
      </button>
      <button type="button" class="submode-btn ${state.stacksSubMode === 'roadmap' ? 'active' : ''}" data-ssub="roadmap">
        3. 从零上手四阶正道 (最佳实践)
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
                <span class="card-index-pill" style="${badgeStyle}">AI 契合度：${escapeHtml(c.aiFriendliness.split('·')[0])}</span>
                <span class="card-badge-text">${escapeHtml(c.metaphorTag)}</span>
              </div>
              <h2 class="card-lit-heading" style="margin-top: 0.6rem;">
                ${escapeHtml(c.carrierName)}
              </h2>
              <div class="card-eng-mapping">
                文学类比：${escapeHtml(c.literaryMetaphor)}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-tertiary); margin-top: 0.3rem;">
                代表技术栈：${escapeHtml(c.typicalStack)}
              </div>
            </div>

            <div class="card-epiphany-text">
              ${escapeHtml(c.oneLineEssence)}
            </div>

            <div class="card-action-footer">
              <span style="font-size: 0.76rem; color: var(--text-secondary);">
                ${escapeHtml(c.aiFriendliness.split('·')[1] || '')}
              </span>
              <span class="tap-cue">审阅 AI 优劣势 →</span>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 1.25rem; display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
      <button type="button" id="go-compass-btn" class="btn-secondary-pill">
        拿不准选哪个？试试「互动选型罗盘」 →
      </button>
      <button type="button" id="go-roadmap-btn" class="btn-primary-pill">
        查看「文科生从 0 到 1 上手四阶路线图」 →
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
        AI 编程契合度：${escapeHtml(c.aiFriendliness)}
      </div>
      <h2 style="font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; line-height: 1.28; margin-bottom: 0.25rem;">
        ${escapeHtml(c.carrierName)}
      </h2>
      <div style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 0.45rem;">
        典籍形制类比：<strong>${escapeHtml(c.literaryMetaphor)}</strong>（${escapeHtml(c.metaphorTag)}）
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
        ✓ 在 AI 编程背景下的核心优势（为何 AI 擅长/推荐）：
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.86rem; color: var(--text-primary);">
        ${c.aiPros.map((p) => `<div>• ${escapeHtml(p)}</div>`).join('')}
      </div>
    </div>

    <!-- AI Cons -->
    <div style="background: var(--crimson-soft); border-left: 3px solid var(--crimson); padding: 0.9rem 1rem; border-radius: 0 8px 8px 0;">
      <strong style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--crimson); display: block; margin-bottom: 0.45rem;">
        ✕ 在 AI 编程背景下的潜在痛点与避坑指南：
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.86rem; color: var(--text-primary);">
        ${c.aiCons.map((con) => `<div>• ${escapeHtml(con)}</div>`).join('')}
      </div>
    </div>

    <!-- Best Use Cases -->
    <div style="background: var(--bg-subtle); padding: 0.9rem 1rem; border-radius: var(--radius-xs);">
      <strong style="font-family: var(--font-serif); font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">
        最适合用它来做什么文科项目？
      </strong>
      <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--text-secondary);">
        ${c.bestUseCases.map((u) => `<div>▪ ${escapeHtml(u)}</div>`).join('')}
      </div>
    </div>

    <!-- Starter Prompt -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.9rem; color: var(--accent);">
          该技术栈的 AI 开卷起手令：
        </strong>
        <button type="button" id="copy-carrier-prompt-btn" class="chip-btn" style="min-height: 30px; padding: 0.2rem 0.65rem; font-size: 0.75rem;">
          复制起手令
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
      ← 上一器用
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
      下一器用 →
    </button>
  `;

  openSheet({
    kicker: `器用 0${cidx + 1} · ${c.literaryMetaphor}`,
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
        点选最接近你手头想法的一句话，查看最佳技术栈处方：
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
          RECOMMENDED TECH STACK · 选型处方
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem;">
          ${escapeHtml(activeSc.verdict)}
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 0.75rem;">
          <strong>为什么这样选最聪明：</strong>${escapeHtml(activeSc.reason)}
        </p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-surface); padding: 0.65rem 0.9rem; border-radius: 6px; border: 1px solid var(--border-hairline); margin-bottom: 1rem;">
          黄金配方：${escapeHtml(activeSc.stackRecipe)}
        </div>

        <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
          <button
            type="button"
            id="compass-open-carrier-btn"
            class="btn-secondary-pill"
          >
            查看该载体完整 AI 优劣势详卷
          </button>
          <button
            type="button"
            id="compass-go-composer-btn"
            class="btn-terracotta-pill"
          >
            用此技术栈生成开卷诏令 →
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
          进阶阶梯 0${state.activeRoadmapIndex + 1} / 0${BEST_PRACTICE_ROADMAP.length}
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
        本阶推荐技术栈：${escapeHtml(stageObj.goldenStack)}
      </div>

      <div style="background: var(--accent-soft); border-left: 3px solid var(--accent); padding: 0.8rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.9rem; margin-bottom: 0.9rem;">
        <strong>阶段目标：</strong>${escapeHtml(stageObj.goal)}
      </div>

      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.72; margin-bottom: 1rem;">
        ${escapeHtml(stageObj.whyItWorks)}
      </p>

      <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-xs); margin-bottom: 1.25rem;">
        <strong style="font-family: var(--font-serif); font-size: 0.92rem; display: block; margin-bottom: 0.5rem;">
          实操三步走（Best Practices）：
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
          ← 上一阶
        </button>
        <button
          type="button"
          id="roadmap-next-btn"
          class="btn-terracotta-pill"
          style="flex: 1.4;"
        >
          ${
            state.activeRoadmapIndex < BEST_PRACTICE_ROADMAP.length - 1
              ? `下一阶 (${state.activeRoadmapIndex + 2}/${BEST_PRACTICE_ROADMAP.length}) →`
              : '去看「04 纪事本末」三大实战案例 →'
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

// ==================== TAB 04 · 纪事本末 (3 Cross-Stack Case Studies + Live Demos) ====================
function renderCasesView(mount) {
  const currentCase =
    CASE_STUDIES.find((c) => c.id === state.activeCaseId) || CASE_STUDIES[0];
  const totalSlides = currentCase.chapters.length + 1;
  const isLiveSlide = state.activeSlideIndex >= currentCase.chapters.length;

  const shortNames = {
    'honglou-gallery': '01 Web展馆·红楼判词',
    'song-notes-workbench': '02 本地存储·宋代笔记',
    'desktop-corpus-reader': '03 桌面软件+Python脚本'
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
          ${isLiveSlide ? `第 ${totalSlides} 折 · 成品交互实演` : `第 ${state.activeSlideIndex + 1} 折 / 共 ${totalSlides} 折`}
        </span>
        <button
          type="button"
          id="jump-live-demo-btn"
          class="chip-btn ${isLiveSlide ? 'active' : ''}"
          style="min-height: 32px; padding: 0.2rem 0.75rem; font-size: 0.76rem;"
        >
          ${isLiveSlide ? '返回第 1 折故事复盘' : '直接试玩最终成品 →'}
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
            aria-label="第 ${idx + 1} 折"
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
          ← 上一折
        </button>
        <button
          type="button"
          id="case-next-slide-btn"
          class="btn-terracotta-pill"
          style="flex: 1.4;"
        >
          ${
            state.activeSlideIndex < currentCase.chapters.length - 1
              ? `下一折 (${state.activeSlideIndex + 2}/${totalSlides}) →`
              : state.activeSlideIndex === currentCase.chapters.length - 1
                ? '下一折：亲自试玩作品成品 →'
                : '前往「05 案头手札」生成你的指令 →'
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
        ✓ 文心雕码·正确总纂指令
      </button>
      <button
        type="button"
        class="prompt-switch-btn is-naive ${!isMaster ? 'active' : ''}"
        data-pmode="naive"
      >
        ✕ 普通人·易翻车提问
      </button>
    </div>

    ${
      isMaster
        ? `
      <div style="background: var(--bg-subtle); border-left: 3px solid var(--sage); border-radius: 0 8px 8px 0; padding: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--sage); font-weight: 600;">
            STRUCTURED PROMPT · 结构化指令
          </span>
          <button type="button" id="copy-chapter-prompt-btn" class="chip-btn" style="min-height: 28px; padding: 0.15rem 0.6rem; font-size: 0.74rem;">
            复制此指令
          </button>
        </div>
        <pre style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.68; white-space: pre-wrap; background: var(--bg-surface); padding: 0.85rem; border-radius: 6px; margin-bottom: 0.65rem;">${escapeHtml(chapter.masterPrompt)}</pre>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong style="color: var(--sage);">一次成功收效：</strong>${escapeHtml(chapter.masterOutcome)}
        </div>
      </div>
    `
        : `
      <div style="background: var(--crimson-soft); border-left: 3px solid var(--crimson); border-radius: 0 8px 8px 0; padding: 1rem;">
        <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--crimson); font-weight: 600; margin-bottom: 0.5rem;">
          NAIVE PROMPT · 模糊直觉提问（反面教材）
        </div>
        <pre style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.68; white-space: pre-wrap; background: var(--bg-surface); padding: 0.85rem; border-radius: 6px; margin-bottom: 0.65rem;">“${escapeHtml(chapter.naivePrompt)}”</pre>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">
          <strong style="color: var(--crimson);">为何翻车：</strong>${escapeHtml(chapter.naiveOutcome)}
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
      作品实演：《红楼梦》群芳花签与判词册页
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      点按下方人物卡片上的「点击翻转判词 ↻」按钮，亲自体验林知微同学用 AI 做出的组件成果：
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
                别号：${escapeHtml(ch.title)} · 主键 id: "${ch.id}"
              </div>

              ${
                !isFlipped
                  ? `
                <div style="background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-xs);">
                  <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 0.25rem;">
                    正面 · 群芳夜宴花签
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
                    背面 · 太虚幻境正册判词与脂批
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
              ${isFlipped ? '↺ 翻回正面花签' : '点击翻转判词与脂批 ↻'}
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
      作品实演：《宋代笔记》多维标签与朱笔圈点台
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      在下方输入框尝试搜索“夜市”、“活板”或“史记”，体验实时朱笔圈点高亮：
    </p>

    <input
      type="search"
      id="song-live-input"
      class="search-input-bar"
      placeholder="输入字词朱笔高亮（如：夜市、活板）"
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
          ${b === 'all' ? '全部典籍 (4)' : b}
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
      作品实演：Python 意象统计 + Electron 桌面双栏批注器
    </h2>
    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
      点选下方诗人切片，体验陈景行同学将 Python 词频结果接入 Electron 桌面阅读器并实时保存批注的成果：
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
        <span>Electron Desktop Window · 唐宋贬谪语料校读器.app</span>
        <span id="ipc-save-status" style="color: var(--sage);">● 已连接本地硬盘 ./data/scholar_notes.json</span>
      </div>

      <div class="cards-feed-grid" style="padding: 1rem;">
        <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-xs);">
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); margin-bottom: 0.3rem;">
            LEFT PANE · Python 自动提取语料与词频
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
              RIGHT PANE · 案头考据批注（试着修改下方文字）
            </div>
            <textarea
              id="corpus-note-textarea"
              rows="4"
              style="width: 100%; background: var(--bg-canvas); border: 1px solid var(--border-strong); border-radius: 6px; padding: 0.65rem; font-size: 0.88rem; line-height: 1.65; margin-bottom: 0.65rem;"
            >${escapeHtml(currentNote)}</textarea>
          </div>
          <button type="button" id="save-ipc-note-btn" class="btn-primary-pill" style="width: 100%;">
            调用 Electron IPC 落印保存至本地硬盘
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
        statusEl.textContent = '✓ IPC 已写入本地 ./data/scholar_notes.json';
      }
      saveBtn.textContent = '已落印存盘 ✓';
      setTimeout(() => {
        saveBtn.textContent = '调用 Electron IPC 落印保存至本地硬盘';
      }, 1500);
    });
  }
}

// ==================== TAB 05 · 案头手札 ====================
function buildComposedDecree() {
  const { carrierId, projectName, projectType, coreFeatures, visualStyle } =
    state.composer;
  const carrier =
    TECH_STACK_CARRIERS.find((c) => c.id === carrierId) || TECH_STACK_CARRIERS[0];

  return `# 修书局开卷总纂诏令 (Project Specification)

我正在筹划构建：${projectName}。
我是汉语言文学背景的产品主理人（总纂官），请你担任我的资深全栈架构师（副总纂）。

## 一、目标载体与推荐技术栈
- 载体形态：${carrier.carrierName}（${carrier.literaryMetaphor}）
- 技术栈要求：${carrier.typicalStack}
- 载体专项叮嘱：${carrier.aiStarterPrompt}

## 二、体裁与核心功能
- 应用定位：${projectType}
- 核心模块拆解：${coreFeatures}

## 三、装帧气韵与视觉规范
- 审美设定：${visualStyle}

## 四、修书凡例（工程架构纪律）
1. 先谋篇后动笔：请先不要直接生成长篇代码，先输出《功能模块大纲》、《文件目录树（Directory Tree）》以及《核心数据 JSON Schema 样例》供我审阅。
2. 史料与装帧分离：所有词条与文献数据必须独立存放在数据目录下，切勿将大段文案硬编码在视图组件中。
3. 语义正名与夹注：变量与函数命名需见名知义，并在关键函数上方附上简明【中文注释】，说明其业务意图。`;
}

function renderPromptsView(mount) {
  mount.innerHTML = `
    <div class="view-header-card">
      <div class="view-kicker">05 · Prompt Atelier · 拿来即用的指令锦囊</div>
      <h1 class="view-title">文科生 AI 编程六式锦囊与跨端诏令生成器</h1>
      <p class="view-desc">
        不知道怎么对 AI 开口？直接点选下方对应场景的锦囊一键复制，或选择你的目标技术栈（网页/手机App/桌面软件/Python脚本）定制开卷诏令。
      </p>
    </div>

    <div class="submode-bar" role="tablist">
      <button
        type="button"
        class="submode-btn ${state.promptsSubMode === 'templates' ? 'active' : ''}"
        data-psub="templates"
      >
        1. 六式常备锦囊 (点击即抄)
      </button>
      <button
        type="button"
        class="submode-btn ${state.promptsSubMode === 'composer' ? 'active' : ''}"
        data-psub="composer"
      >
        2. 定制我的跨端开卷诏令
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
              <strong>适用时机：</strong>${escapeHtml(tpl.whenToUse)}
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button
              type="button"
              class="btn-secondary-pill inspect-tpl-btn"
              style="flex: 1;"
              data-tpl-idx="${idx}"
            >
              审阅全文
            </button>
            <button
              type="button"
              class="btn-terracotta-pill quick-copy-tpl-btn"
              style="flex: 1.2;"
              data-tpl-idx="${idx}"
            >
              一键复制锦囊
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
      <span class="code-sheet-label">PROMPT TEMPLATE · 可复制后修改方括号内文字</span>
      <pre class="code-pre-block" style="font-family: var(--font-sans); font-size: 0.86rem; line-height: 1.7;">${escapeHtml(tpl.template)}</pre>
    </div>
  `;

  const footerHtml = `
    <button type="button" id="sheet-copy-full-tpl" class="btn-terracotta-pill" style="width: 100%;">
      复制此道指令锦囊
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
        第一步：选择你要开发的产品载体（自动匹配最佳技术栈护栏）
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
        第二步：点选一个文科灵感预设（或直接修改下方四格）
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
            1. 著作名目（你想做什么项目？）
          </label>
          <input type="text" id="comp-name" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.projectName)}" />
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            2. 体裁形制（这是什么类型的网页/App/脚本？）
          </label>
          <input type="text" id="comp-type" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.projectType)}" />
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            3. 卷目划分（包含哪几个核心功能？）
          </label>
          <textarea id="comp-features" class="search-input-bar" rows="3" style="margin-bottom: 0; height: auto;">${escapeHtml(state.composer.coreFeatures)}</textarea>
        </div>
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.3rem;">
            4. 装帧气韵（你喜欢什么样的视觉风格？）
          </label>
          <input type="text" id="comp-style" class="search-input-bar" style="margin-bottom: 0;" value="${escapeHtml(state.composer.visualStyle)}" />
        </div>
      </div>

      <button type="button" id="preview-composed-btn" class="btn-terracotta-pill" style="width: 100%;">
        生成并审阅我的《跨端开卷总纂诏令》 →
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
        kicker: 'GENERATED SPECIFICATION · 专属跨端开卷总纂诏令',
        bodyHtml: `
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            已自动注入所选载体的最佳技术栈配方与“先谋篇后动笔、数据与视图解耦、中文夹注”工程护栏：
          </p>
          <div class="code-sheet-dark">
            <pre class="code-pre-block" style="font-family: var(--font-sans); font-size: 0.85rem; line-height: 1.72;">${escapeHtml(decree)}</pre>
          </div>
        `,
        footerHtml: `
          <button type="button" id="copy-generated-decree-btn" class="btn-terracotta-pill" style="width: 100%;">
            一键复制诏令（直接粘贴给 Claude / Cursor / Antigravity）
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
        themeBtn.textContent = '浅色纸本';
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '深色墨本';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);

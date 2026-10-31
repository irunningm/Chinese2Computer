// 卷一 · 全局全景
import { renderActiveView, switchTab } from '../core/router.js';
import { openSheet } from '../core/sheet.js';
import { state } from '../core/state.js';
import { copyToClipboard, escapeHtml, renderViewIntro } from '../core/utils.js';
import { ARCHITECTURE_NODES, DIAGNOSTIC_QUIZZES, REQUEST_FLOW_STEPS } from '../data/architecture.js';
import { VIEW_INTROS } from '../data/copy.js';

// ==================== TAB 01 · 全局全景 ====================
export function renderArchView(mount) {
  mount.innerHTML = `
    ${renderViewIntro(VIEW_INTROS.arch)}

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

export function renderArchNodesFeed(container) {
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

export function openArchNodeSheet(nodeIdx) {
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

export function renderArchFlowStepper(container) {
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

export function renderArchClinicStepper(container) {
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

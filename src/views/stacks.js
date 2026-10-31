// 卷三 · 技术选型
import { renderActiveView, switchTab } from '../core/router.js';
import { openSheet } from '../core/sheet.js';
import { state } from '../core/state.js';
import { copyToClipboard, escapeHtml, renderViewIntro } from '../core/utils.js';
import { VIEW_INTROS } from '../data/copy.js';
import { BEST_PRACTICE_ROADMAP, STACK_COMPASS_SCENARIOS, TECH_STACK_CARRIERS } from '../data/techstacks.js';

// ==================== TAB 03 · 技术选型 ====================
export function renderStacksView(mount) {
  mount.innerHTML = `
    ${renderViewIntro(VIEW_INTROS.stacks)}

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

export function renderStackCarriersFeed(container) {
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

export function openCarrierSheet(cidx) {
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

export function renderStackCompassView(container) {
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

export function renderStackRoadmapStepper(container) {
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

// 入口：启动应用，绑定顶部导航、主题切换、手机预览等全局按钮
import { renderActiveView, switchTab } from './core/router.js';
import { closeSheet } from './core/sheet.js';
import { state } from './core/state.js';

// ==================== App Initialization ====================
export function initApp() {
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

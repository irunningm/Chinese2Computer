// 路由：根据当前所在的卷，渲染对应的视图
import { renderArchView } from '../views/arch.js';
import { renderCasesView } from '../views/cases.js';
import { renderDictView } from '../views/dict.js';
import { renderPromptsView } from '../views/prompts.js';
import { renderStacksView } from '../views/stacks.js';
import { state } from './state.js';

// ==================== Main Router: Render Active Tab Only ====================
export function switchTab(tabId) {
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

export function renderActiveView() {
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

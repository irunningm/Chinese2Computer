// 工具函数：转义、高亮、复制、导语卡片

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function highlightText(text, keyword) {
  const safeText = escapeHtml(text);
  const kw = keyword.trim();
  if (!kw) return safeText;
  const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKw})`, 'gi');
  return safeText.replace(regex, '<mark class="terracotta-mark">$1</mark>');
}

export async function copyToClipboard(text, btnElement) {
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

// 统一渲染每一卷顶部的导语卡片（文案存放在 src/data/copy.js）
export function renderViewIntro(intro) {
  return `
    <div class="view-header-card">
      <div class="view-kicker">${escapeHtml(intro.kicker)}</div>
      <h1 class="view-title">${escapeHtml(intro.title)}</h1>
      <p class="view-desc">
        ${escapeHtml(intro.desc)}
      </p>
    </div>
  `;
}

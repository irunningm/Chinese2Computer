// 底部抽屉（详情弹层）的打开与关闭

// ==================== Bottom Sheet / Drawer Controller ====================
export function openSheet({ kicker, bodyHtml, footerHtml, onMount }) {
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

export function closeSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  backdrop.classList.remove('is-open');
  backdrop.setAttribute('aria-hidden', 'true');
}

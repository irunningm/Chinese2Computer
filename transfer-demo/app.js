import {
  availableActions,
  createInitialState,
  receiveAtEast,
  resetTransfer,
  shipFromWest,
  ticketStatusLabel,
  totalStock
} from './logic.js';

/** @type {import('./logic.js').TransferState} */
let state = createInitialState();

const els = {
  westCount: document.getElementById('west-count'),
  eastCount: document.getElementById('east-count'),
  transitCount: document.getElementById('transit-count'),
  totalCount: document.getElementById('total-count'),
  westCrates: document.getElementById('west-crates'),
  eastCrates: document.getElementById('east-crates'),
  arrowFill: document.getElementById('arrow-fill'),
  transitCaption: document.getElementById('transit-caption'),
  ticketStatus: document.getElementById('ticket-status'),
  ticketDetail: document.getElementById('ticket-detail'),
  feedback: document.getElementById('feedback'),
  teachBody: document.getElementById('teach-body'),
  teachTag: document.querySelector('#teach-note .tag'),
  btnShip: document.getElementById('btn-ship'),
  btnReceive: document.getElementById('btn-receive'),
  btnReset: document.getElementById('btn-reset'),
  chips: {
    rules: document.getElementById('chip-rules'),
    state: document.getElementById('chip-state'),
    impl: document.getElementById('chip-impl'),
    verify: document.getElementById('chip-verify')
  }
};

/**
 * @param {HTMLElement | null} container
 * @param {number} count
 * @param {number} max
 */
function renderCrates(container, count, max = 12) {
  if (!container) return;
  const shown = Math.max(0, Math.min(count, max));
  container.innerHTML = '';
  for (let i = 0; i < shown; i += 1) {
    const box = document.createElement('span');
    box.className = 'crate';
    container.appendChild(box);
  }
}

/**
 * @param {'rules' | 'state' | 'impl' | 'verify'} key
 */
function setLesson(key) {
  Object.entries(els.chips).forEach(([k, el]) => {
    if (!el) return;
    el.classList.toggle('is-active', k === key);
  });

  switch (key) {
    case 'rules':
      if (els.teachTag) els.teachTag.textContent = '本步 · 明确规则';
      if (els.teachBody) {
        els.teachBody.textContent =
          '先约定：未发货不能收货；发货一次、收货一次；总量始终 12。规则清楚后，才谈写代码。';
      }
      break;
    case 'state':
      if (els.teachTag) els.teachTag.textContent = '本步 · 设计状态';
      if (els.teachBody) {
        els.teachBody.textContent =
          '需要三个库存槽位（西店 / 在途 / 东店）+ 单据状态（待发出 / 已发出 / 已收货）。纸笔一店够用；二店就要把「在途」显式建模。';
      }
      break;
    case 'impl':
      if (els.teachTag) els.teachTag.textContent = '本步 · 实现';
      if (els.teachBody) {
        els.teachBody.textContent =
          '按钮只调用状态机：发货改西店与在途，收货改在途与东店。AI 可帮你写实现，但规则与状态边界仍需人先想清楚。';
      }
      break;
    case 'verify':
      if (els.teachTag) els.teachTag.textContent = '本步 · 验收';
      if (els.teachBody) {
        els.teachBody.textContent =
          '用点击证据验收：正常流、越序收货、重复操作、重置。软件工程不只是「写出来」，还包括「证明它对」。';
      }
      break;
    default: {
      const _exhaustive = /** @type {never} */ (key);
      void _exhaustive;
    }
  }
}

function render() {
  // 教学小样：发货/收货始终可点，非法操作由状态机拒绝并给出反馈
  // （比「灰掉按钮」更能让人体验到「规则」本身）
  void availableActions(state);
  const total = totalStock(state);

  if (els.westCount) els.westCount.textContent = String(state.west);
  if (els.eastCount) els.eastCount.textContent = String(state.east);
  if (els.transitCount) els.transitCount.textContent = String(state.inTransit);
  if (els.totalCount) els.totalCount.textContent = String(total);

  renderCrates(els.westCrates, state.west);
  renderCrates(els.eastCrates, state.east);

  if (els.arrowFill) {
    els.arrowFill.classList.remove('is-moving', 'is-done');
    if (state.ticketStatus === 'shipped') {
      els.arrowFill.classList.add('is-moving');
    } else if (state.ticketStatus === 'received') {
      els.arrowFill.classList.add('is-done');
    }
  }

  if (els.transitCaption) {
    switch (state.ticketStatus) {
      case 'draft':
        els.transitCaption.textContent = '等待发货';
        break;
      case 'shipped':
        els.transitCaption.textContent = '货物在途中';
        break;
      case 'received':
        els.transitCaption.textContent = '调拨已完成';
        break;
      default: {
        const _exhaustive = /** @type {never} */ (state.ticketStatus);
        void _exhaustive;
      }
    }
  }

  if (els.ticketStatus) {
    els.ticketStatus.textContent = ticketStatusLabel(state.ticketStatus);
    els.ticketStatus.className = `status-pill ${state.ticketStatus}`;
  }

  if (els.ticketDetail) {
    switch (state.ticketStatus) {
      case 'draft':
        els.ticketDetail.textContent = '待西店发货';
        break;
      case 'shipped':
        els.ticketDetail.textContent = '已发出，待东店确认收货';
        break;
      case 'received':
        els.ticketDetail.textContent = '已收货，流程结束';
        break;
      default: {
        const _exhaustive = /** @type {never} */ (state.ticketStatus);
        void _exhaustive;
      }
    }
  }

  if (els.feedback) {
    els.feedback.textContent = state.lastMessage;
    els.feedback.className = `feedback ${state.lastOk ? 'ok' : 'bad'}`;
  }

  if (els.btnShip) els.btnShip.disabled = false;
  if (els.btnReceive) els.btnReceive.disabled = false;
}

els.btnShip?.addEventListener('click', () => {
  state = shipFromWest(state);
  setLesson(state.lastOk ? 'impl' : 'rules');
  render();
});

els.btnReceive?.addEventListener('click', () => {
  state = receiveAtEast(state);
  if (!state.lastOk) {
    setLesson('rules');
  } else {
    setLesson('verify');
  }
  render();
});

els.btnReset?.addEventListener('click', () => {
  state = resetTransfer();
  setLesson('rules');
  render();
});

// 允许点教学条切换注释（不改库存）
Object.entries(els.chips).forEach(([key, el]) => {
  el?.addEventListener('click', () => {
    setLesson(/** @type {'rules' | 'state' | 'impl' | 'verify'} */ (key));
  });
});

setLesson('rules');
render();

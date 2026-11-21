/**
 * 两店调货教学演示 — 纯状态机（无 DOM / 无持久化）
 * 同一商品；西店 ↔ 东店；单据 T001；总量守恒 12。
 */

export const TICKET_ID = 'T001';
export const SKU_NAME = '矿泉水（箱）';
export const TRANSFER_QTY = 6;
export const TOTAL_STOCK = 12;

/** @typedef {'draft' | 'shipped' | 'received'} TicketStatus */

/**
 * @typedef {object} TransferState
 * @property {number} west
 * @property {number} inTransit
 * @property {number} east
 * @property {TicketStatus} ticketStatus
 * @property {string} ticketId
 * @property {string} lastMessage
 * @property {boolean} lastOk
 */

/** @returns {TransferState} */
export function createInitialState() {
  return {
    west: 12,
    inTransit: 0,
    east: 0,
    ticketStatus: 'draft',
    ticketId: TICKET_ID,
    lastMessage: '初态：西店 12 · 在途 0 · 东店 0。单据 T001 待发出。',
    lastOk: true
  };
}

/**
 * @param {TransferState} state
 * @returns {number}
 */
export function totalStock(state) {
  return state.west + state.inTransit + state.east;
}

/**
 * @param {TransferState} state
 * @returns {{ canShip: boolean, canReceive: boolean }}
 */
export function availableActions(state) {
  return {
    canShip: state.ticketStatus === 'draft',
    canReceive: state.ticketStatus === 'shipped'
  };
}

/**
 * 西店发货：西 -6，在途 +6，单据 → 已发出
 * 重复发货 / 非 draft 状态：拒绝，库存不变
 * @param {TransferState} state
 * @returns {TransferState}
 */
export function shipFromWest(state) {
  if (state.ticketStatus !== 'draft') {
    return {
      ...state,
      lastOk: false,
      lastMessage:
        state.ticketStatus === 'shipped'
          ? '规则拒绝：单据已发出，不能重复发货（库存不会再减）。'
          : '规则拒绝：单据已收货，不能再发货。'
    };
  }

  return {
    ...state,
    west: state.west - TRANSFER_QTY,
    inTransit: state.inTransit + TRANSFER_QTY,
    ticketStatus: 'shipped',
    lastOk: true,
    lastMessage: `西店已发出 ${TRANSFER_QTY} 瓶。西店 ${state.west - TRANSFER_QTY} · 在途 ${state.inTransit + TRANSFER_QTY} · 东店 ${state.east}。单据 T001 已发出。`
  };
}

/**
 * 东店确认收货：在途 -6，东 +6，单据 → 已收货
 * 未发货 / 重复收货：拒绝，库存不变
 * @param {TransferState} state
 * @returns {TransferState}
 */
export function receiveAtEast(state) {
  if (state.ticketStatus === 'draft') {
    return {
      ...state,
      lastOk: false,
      lastMessage: '规则拒绝：单据尚未发出，不能越序收货。'
    };
  }

  if (state.ticketStatus === 'received') {
    return {
      ...state,
      lastOk: false,
      lastMessage: '规则拒绝：单据已收货，不能重复确认（库存不会再增）。'
    };
  }

  return {
    ...state,
    inTransit: state.inTransit - TRANSFER_QTY,
    east: state.east + TRANSFER_QTY,
    ticketStatus: 'received',
    lastOk: true,
    lastMessage: `东店已确认收货 ${TRANSFER_QTY} 瓶。西店 ${state.west} · 在途 ${state.inTransit - TRANSFER_QTY} · 东店 ${state.east + TRANSFER_QTY}。单据 T001 已收货。`
  };
}

/**
 * 彻底重置到初态
 * @returns {TransferState}
 */
export function resetTransfer() {
  const next = createInitialState();
  return {
    ...next,
    lastMessage: '已重置：恢复为西店 12 · 在途 0 · 东店 0，单据待发出。'
  };
}

/**
 * @param {TicketStatus} status
 * @returns {string}
 */
export function ticketStatusLabel(status) {
  switch (status) {
    case 'draft':
      return '待发出';
    case 'shipped':
      return '已发出';
    case 'received':
      return '已收货';
    default: {
      const _exhaustive = /** @type {never} */ (status);
      return _exhaustive;
    }
  }
}

/**
 * 两店调货状态机 — Node 自动化逻辑验收
 * 运行：node --test tests/transfer-logic.test.mjs
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  availableActions,
  createInitialState,
  receiveAtEast,
  resetTransfer,
  shipFromWest,
  totalStock
} from '../transfer-demo/logic.js';

describe('两店调货状态机', () => {
  it('初态：西12 / 在途0 / 东0，总量12，可发不可收', () => {
    const s = createInitialState();
    assert.equal(s.west, 12);
    assert.equal(s.inTransit, 0);
    assert.equal(s.east, 0);
    assert.equal(s.ticketStatus, 'draft');
    assert.equal(totalStock(s), 12);
    const a = availableActions(s);
    assert.equal(a.canShip, true);
    assert.equal(a.canReceive, false);
  });

  it('正常流：发货 → 西6/在途6/东0；收货 → 西6/在途0/东6', () => {
    let s = createInitialState();
    s = shipFromWest(s);
    assert.equal(s.lastOk, true);
    assert.equal(s.west, 6);
    assert.equal(s.inTransit, 6);
    assert.equal(s.east, 0);
    assert.equal(s.ticketStatus, 'shipped');
    assert.equal(totalStock(s), 12);

    s = receiveAtEast(s);
    assert.equal(s.lastOk, true);
    assert.equal(s.west, 6);
    assert.equal(s.inTransit, 0);
    assert.equal(s.east, 6);
    assert.equal(s.ticketStatus, 'received');
    assert.equal(totalStock(s), 12);
  });

  it('越序收货：未发货时收货被拒绝，库存不变', () => {
    const before = createInitialState();
    const s = receiveAtEast(before);
    assert.equal(s.lastOk, false);
    assert.equal(s.west, 12);
    assert.equal(s.inTransit, 0);
    assert.equal(s.east, 0);
    assert.equal(s.ticketStatus, 'draft');
    assert.equal(totalStock(s), 12);
  });

  it('重复发货：不重复减库存', () => {
    let s = shipFromWest(createInitialState());
    const afterFirst = { ...s };
    s = shipFromWest(s);
    assert.equal(s.lastOk, false);
    assert.equal(s.west, afterFirst.west);
    assert.equal(s.inTransit, afterFirst.inTransit);
    assert.equal(s.east, afterFirst.east);
    assert.equal(s.ticketStatus, 'shipped');
    assert.equal(totalStock(s), 12);
  });

  it('重复收货：不重复增库存', () => {
    let s = receiveAtEast(shipFromWest(createInitialState()));
    const afterFirst = { ...s };
    s = receiveAtEast(s);
    assert.equal(s.lastOk, false);
    assert.equal(s.west, afterFirst.west);
    assert.equal(s.inTransit, afterFirst.inTransit);
    assert.equal(s.east, afterFirst.east);
    assert.equal(s.ticketStatus, 'received');
    assert.equal(totalStock(s), 12);
  });

  it('重置：彻底恢复初态', () => {
    let s = receiveAtEast(shipFromWest(createInitialState()));
    s = resetTransfer();
    assert.equal(s.west, 12);
    assert.equal(s.inTransit, 0);
    assert.equal(s.east, 0);
    assert.equal(s.ticketStatus, 'draft');
    assert.equal(totalStock(s), 12);
    assert.equal(availableActions(s).canShip, true);
    assert.equal(availableActions(s).canReceive, false);
  });
});

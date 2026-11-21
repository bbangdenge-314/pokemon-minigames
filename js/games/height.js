/* ==========================================================
   6. 키 순서 맞추기 — 쉬움 3 / 보통 4 / 어려움 5
   ========================================================== */
import { DEX, artUrl, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const CFG = {
  easy: { n: 3, gap: 0.35, cm: true, sizeMin: .56, sizeRange: .44 },
  normal: { n: 4, gap: 0.28, cm: true, sizeMin: .72, sizeRange: .28 },
  hard: { n: 5, gap: 0.24, cm: false, sizeMin: .84, sizeRange: .16 },
};
const ROUNDS = 3;

export default {
  id: 'height',
  howto: '포켓몬의 키를 보고, 작은 친구부터 큰 친구 순서로 콕콕 눌러 줄을 세워 주세요.',
  tips: [
    '카드 아래 숫자가 키예요. (예: 40cm)',
    '그림 크기도 키에 따라 조금씩 달라요.',
    '어려움에서는 숫자가 없어요! 그림과 도감 지식으로 맞혀 보세요.',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let order = [];
    let picks = [];
    let locked = false;
    let done = false;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function pickSet(n) {
      const pool = DEX.filter((p) => p.h >= 0.3 && p.h <= 2.5);
      const shuffled = pickMany(pool, pool.length);
      const chosen = [];
      for (const p of shuffled) {
        if (chosen.length >= n) break;
        if (chosen.every((c) => Math.abs(c.h - p.h) >= D.gap)) chosen.push(p);
      }
      return chosen.sort((a, b) => a.h - b.h);
    }

    function render() {
      order = pickSet(D.n);
      while (order.length < D.n) order.push(DEX[order.length]);
      order.sort((a, b) => a.h - b.h);
      picks = [];
      locked = false;
      done = false;
      const shown = pickMany(order, order.length);
      const minH = Math.min(...order.map((p) => p.h));
      const maxH = Math.max(...order.map((p) => p.h));
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`작은 친구부터 <b>${order.length}명</b>을 순서대로 세워 주세요.`, '📏');

      body.innerHTML = `
        <div class="stage height-stage center-col">
          <div class="height-slots" id="slots">
            ${order.map((_, i) => `<div class="height-slot" data-slot="${i}"><span class="ord">${i + 1}</span>?</div>`).join('')}
          </div>
          <div class="height-cards" id="cards">
            ${shown.map((p) => {
              const ratio = maxH === minH ? 1 : (p.h - minH) / (maxH - minH);
              const k = (D.sizeMin + ratio * D.sizeRange) * 100;
              return `<button class="height-card" data-pid="${p.id}">
                <span class="hc-art-wrap"><img class="hc-art" style="width:${k.toFixed(0)}%" src="${artUrl(p.id)}" alt="${p.n}" draggable="false"></span>
                <span class="hc-name">${p.n}</span>
                ${D.cm ? `<span class="hc-cm">${Math.round(p.h * 100)}cm</span>` : `<span class="hc-cm no-cm">?</span>`}
              </button>`;
            }).join('')}
          </div>
          <div class="game-tip">🔎 작은 키 → 큰 키 순서!</div>
        </div>`;

      qs('#cards', body).addEventListener('click', (e) => {
        const b = e.target.closest('.height-card');
        if (b) select(b);
      });
      ctx.load(order);
    }

    function select(btn) {
      if (locked || done || btn.classList.contains('used')) return;
      if (picks.length >= order.length) return;
      const p = order.find((x) => x.id === Number(btn.dataset.pid));
      if (!p) return;
      btn.classList.add('used');
      picks.push(p);
      ctx.sfx.pop();
      const slot = qsa('#slots .height-slot', body)[picks.length - 1];
      if (slot) {
        slot.classList.add('filled');
        slot.innerHTML = `<span class="ord">${picks.length}</span><img src="${artUrl(p.id)}" alt="${p.n}" draggable="false">`;
      }
      if (picks.length === order.length) check();
    }

    function check() {
      const ok = picks.every((p, i) => p.id === order[i].id);
      if (ok) {
        done = true;
        locked = true;
        ctx.sfx.correct();
        qsa('#slots .height-slot', body).forEach((s) => { s.style.borderColor = '#8fe0bd'; });
        const isLast = round >= ROUNDS - 1;
        later(() => ctx.win(isLast ? '줄 세우기 성공!' : '정답이야!'), 250);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else render();
        }, 1950);
      } else {
        locked = true;
        ctx.sfx.wrong();
        ctx.toast('음~ 순서가 조금 달라요. 다시 해볼까?', 1800);
        const slots = qsa('#slots .height-slot', body);
        slots.forEach((s) => { s.style.borderColor = '#ffc2d4'; });
        later(() => {
          slots.forEach((s) => {
            s.style.borderColor = '';
            s.classList.remove('filled');
            s.innerHTML = `<span class="ord">${Number(s.dataset.slot) + 1}</span>?`;
          });
          qsa('#cards .height-card', body).forEach((c) => c.classList.remove('used'));
          picks = [];
          locked = false;
        }, 1200);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

/* ==========================================================
   6. 키 순서 맞추기 — 작은 친구부터 줄 세우기
   ========================================================== */
import { DEX, artUrl, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const ROUNDS = [3, 3, 4];

export default {
  id: 'height',
  howto: '포켓몬의 키를 보고, 작은 친구부터 큰 친구 순서로 콕콕 눌러 줄을 세워 주세요.',
  tips: [
    '카드 아래 숫자가 키예요. (예: 40cm)',
    '그림 크기도 키에 따라 조금씩 달라요.',
    '다 섞여도 괜찮아요. 순서대로 누르면 돼요.',
  ],
  mount(ctx) {
    let round = 0;
    let order = [];      // 정답 순서 (작은 → 큰) pokemon 배열
    let picks = [];      // 사용자가 고른 순서
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
        if (chosen.every((c) => Math.abs(c.h - p.h) >= 0.2)) chosen.push(p);
      }
      return chosen.sort((a, b) => a.h - b.h);
    }

    function render() {
      order = pickSet(ROUNDS[round]);
      picks = [];
      locked = false;
      done = false;
      const shown = pickMany(order, order.length);
      const minH = Math.min(...order.map((p) => p.h));
      const maxH = Math.max(...order.map((p) => p.h));
      ctx.setRound(round, ROUNDS.length);
      ctx.setTip(`작은 친구부터 <b>${order.length}명</b>을 순서대로 세워 주세요. 숫자를 잘 봐요!`, '📏');

      body.innerHTML = `
        <div class="stage height-stage center-col">
          <div class="height-slots" id="slots">
            ${order.map((_, i) => `<div class="height-slot" data-slot="${i}"><span class="ord">${i + 1}</span>?</div>`).join('')}
          </div>
          <div class="height-cards" id="cards">
            ${shown.map((p) => {
              const k = (0.58 + ((p.h - minH) / Math.max(0.001, maxH - minH)) * 0.36) * 100;
              return `<button class="height-card" data-pid="${p.id}">
                <span class="hc-art-wrap"><img class="hc-art" style="width:${k.toFixed(0)}%" src="${artUrl(p.id)}" alt="${p.n}" draggable="false"></span>
                <span class="hc-name">${p.n}</span>
                <span class="hc-cm">${Math.round(p.h * 100)}cm</span>
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
        const isLast = round >= ROUNDS.length - 1;
        later(() => ctx.win(isLast ? '줄 세우기 성공!' : '정답이야!'), 250);
        later(() => {
          round++;
          if (round >= ROUNDS.length) ctx.finish(5);
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

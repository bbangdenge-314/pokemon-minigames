/* ==========================================================
   4. 같은 카드 짝맞추기 — 쉬움 6장 / 보통 12장 / 어려움 20장
   ========================================================== */
import { DEX, artUrl, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const CFG = {
  easy: { n: 6, cls: 'g6', rounds: 3 },
  normal: { n: 12, cls: 'g12', rounds: 2 },
  hard: { n: 20, cls: 'g20', rounds: 1 },
};

export default {
  id: 'memory',
  howto: '카드를 두 장씩 뒤집어서 같은 포켓몬을 찾아 주세요. 다 찾으면 성공이에요!',
  tips: [
    '카드를 누르면 그림이 보여요.',
    '같은 친구를 찾으면 카드가 초록색이 돼요.',
    '외운 카드를 다시 뒤집어 보세요.',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let first = null;
    let lock = false;
    let matched = 0;
    let moves = 0;
    let pairs = 0;
    let cards = [];
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      const n = D.n;
      pairs = n / 2;
      const chosen = pickMany(DEX, pairs);
      cards = pickMany([...chosen, ...chosen], n).map((p, i) => ({ p, id: p.id, i, matched: false, flipped: false }));
      first = null;
      lock = false;
      matched = 0;
      moves = 0;
      ctx.setRound(round, D.rounds);
      ctx.setTip(`같은 포켓몬 <b>${pairs}쌍</b>을 찾아보세요. 카드를 콕콕 눌러요!`, '🃏');

      body.innerHTML = `
        <div class="stage mem-stage">
          <div class="mem-info">
            <span class="mem-chip">🔎 짝 ${pairs}쌍</span>
            <span class="mem-chip">🔄 뒤집기 <b id="moves">0</b>번</span>
          </div>
          <div class="mem-grid ${D.cls}" id="mem">
            ${cards.map((c, i) => `
              <button class="mem-card" data-i="${i}" aria-label="카드 ${i + 1} 뒤집기">
                <span class="mem-inner">
                  <span class="mem-face mem-back"></span>
                  <span class="mem-face mem-front"><img src="${artUrl(c.p.id)}" alt="" draggable="false"></span>
                </span>
              </button>`).join('')}
          </div>
        </div>`;

      qs('#mem', body).addEventListener('click', (e) => {
        const b = e.target.closest('.mem-card');
        if (b) flip(Number(b.dataset.i), b);
      });
      ctx.load(cards.map((c) => c.p));
    }

    function flip(i, node) {
      const c = cards[i];
      if (lock || !c || c.matched || c.flipped) return;
      c.flipped = true;
      node.classList.add('flipped');
      ctx.sfx.pop();
      if (first === null) { first = i; return; }
      if (first === i) return;
      const a = cards[first];
      moves++;
      const mv = qs('#moves', body);
      if (mv) mv.textContent = String(moves);
      if (a.id === c.id) {
        a.matched = c.matched = true;
        matched++;
        ctx.sfx.cry(c.id);
        ctx.sfx.correct();
        const nodes = qsa('.mem-card', body);
        [first, i].forEach((k) => {
          nodes[k].classList.add('matched');
          const r = nodes[k].getBoundingClientRect();
          ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 10, speed: 4 });
        });
        first = null;
        if (matched === pairs) {
          lock = true;
          const last = round >= D.rounds - 1;
          later(() => ctx.win(last ? '다 맞췄어!' : '짝을 다 찾았어!'), 300);
          later(() => {
            round++;
            if (round >= D.rounds) ctx.finish(5);
            else render();
          }, 1750);
        }
        return;
      }
      lock = true;
      ctx.sfx.wrong();
      const nodes = qsa('.mem-card', body);
      later(() => {
        [a, c].forEach((x) => { x.flipped = false; });
        nodes[i].classList.remove('flipped');
        nodes[first].classList.remove('flipped');
        first = null;
        lock = false;
        ctx.toast('다른 짝이야! 다시 기억해 보자 😊', 1200);
      }, 950);
    }

    render();
    return { destroy() { timers.forEach((t) => clearTimeout(t)); } };
  },
};

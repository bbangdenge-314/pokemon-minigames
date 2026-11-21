/* ==========================================================
   4. 같은 카드 짝맞추기 — 6 / 12 / 16장
   ========================================================== */
import { DEX, artUrl, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const LEVELS = [
  { n: 6, label: '6장', sub: '아주 쉬워요', cls: 'g6' },
  { n: 12, label: '12장', sub: '조금 어려워요', cls: 'g12' },
  { n: 16, label: '16장', sub: '도전!', cls: 'g16' },
];

export default {
  id: 'memory',
  howto: '카드를 두 장씩 뒤집어서 같은 포켓몬을 찾아 주세요. 다 찾으면 성공이에요!',
  tips: [
    '카드를 누르면 그림이 보여요.',
    '같은 친구를 찾으면 카드가 초록색이 돼요.',
    '외운 카드를 다시 뒤집어 보세요.',
  ],
  mount(ctx) {
    let level = null;
    let round = 0;
    let first = null;
    let lock = false;
    let matched = 0;
    let moves = 0;
    let pairs = 0;
    let cards = [];
    const ROUNDS = 2;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function choose() {
      ctx.setTip('카드 장수를 고르면 시작해요!', '🃏');
      let sel = 1;
      body.innerHTML = `
        <div class="stage stage-pad center-col">
          <h3 style="font-size:clamp(20px,3vw,26px);text-align:center">몇 장으로 놀까요?</h3>
          <div class="level-row" id="levels">
            ${LEVELS.map((l, i) => `<button class="level-btn ${i === 1 ? 'sel' : ''}" data-i="${i}">
              <span>${l.label}</span><small>${l.sub}</small></button>`).join('')}
          </div>
          <button class="btn btn-primary btn-lg" id="m-start">시작! 🃏</button>
          <img src="${artUrl(39)}" alt="" style="width:clamp(84px,14vw,120px);filter:drop-shadow(0 8px 10px rgba(80,60,120,.2))">
        </div>`;
      const prog = qs('#game-progress');
      if (prog) prog.textContent = '준비';
      qsa('#levels .level-btn', body).forEach((b) => {
        b.addEventListener('click', () => {
          sel = Number(b.dataset.i);
          qsa('#levels .level-btn', body).forEach((x) => x.classList.remove('sel'));
          b.classList.add('sel');
          ctx.sfx.tap();
        });
      });
      qs('#m-start', body).addEventListener('click', () => {
        level = LEVELS[sel];
        ctx.sfx.ensure();
        start();
      });
    }

    function start() {
      if (!level) level = LEVELS[1];
      round = 0;
      render();
    }

    function render() {
      const n = level.n;
      pairs = n / 2;
      const chosen = pickMany(DEX, pairs);
      cards = pickMany([...chosen, ...chosen], n).map((p, i) => ({ p, id: p.id, i, matched: false, flipped: false }));
      first = null;
      lock = false;
      matched = 0;
      moves = 0;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`같은 포켓몬 <b>${pairs}쌍</b>을 찾아보세요. 카드를 콕콕 눌러요!`, '🃏');

      body.innerHTML = `
        <div class="stage mem-stage">
          <div class="mem-info">
            <span class="mem-chip">🔎 짝 ${pairs}쌍</span>
            <span class="mem-chip">🔄 뒤집기 <b id="moves">0</b>번</span>
          </div>
          <div class="mem-grid ${level.cls}" id="mem">
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
          const last = round >= ROUNDS - 1;
          later(() => ctx.win(last ? '다 맞췄어!' : '짝을 다 찾았어!'), 300);
          later(() => {
            round++;
            if (round >= ROUNDS) ctx.finish(5);
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

    choose();
    return { destroy() { timers.forEach((t) => clearTimeout(t)); } };
  },
};

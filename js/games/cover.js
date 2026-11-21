/* ==========================================================
   3. 가려진 친구는 누구? — 구름 타일 (쉬움 3×3 / 보통 4×4 / 어려움 5×5)
   ========================================================== */
import { DEX, artUrl, pick, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const CFG = {
  easy: { grid: 3, choices: 3, start: 2, auto: [2800, 6500, 10000] },
  normal: { grid: 4, choices: 4, start: 2, auto: [7000, 13000] },
  hard: { grid: 5, choices: 6, start: 1, auto: [13000] },
};
const ROUNDS = 3;

export default {
  id: 'cover',
  howto: '포켓몬 그림이 구름에 가려져 있어요. 조금씩 열리는 그림을 보고 누구인지 맞혀 보세요!',
  tips: [
    '구름을 콕 누르면 그 조각이 열려요.',
    '아래 <b>한 조각 더</b> 버튼으로 더 볼 수 있어요.',
    '보기 중에 정답이 하나 있어요.',
    '어려움은 구름이 25조각이라 아주 조금씩 보여요!',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let done = false;
    let opened = 0;
    let target = null;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      const pool = DEX.filter((p) => p.h >= 0.4);
      target = pick(pool);
      const others = pickMany(pool.filter((p) => p.id !== target.id), D.choices - 1);
      const choices = pickMany([target, ...others], D.choices);
      done = false;
      opened = 0;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`구름 ${D.grid}×${D.grid}을 하나씩 열어 보세요. <b>누구</b>일까요?`, '☁️');

      body.innerHTML = `
        <div class="stage cover-stage">
          <div class="center-col">
            <div class="cover-art" id="cover-art" style="--grid:${D.grid}">
              <img src="${artUrl(target.id)}" alt="" draggable="false">
              <div class="cover-grid" id="cover-grid"
                style="grid-template-columns:repeat(${D.grid},1fr);grid-template-rows:repeat(${D.grid},1fr)">
                ${Array.from({ length: D.grid * D.grid }, (_, i) => `<button class="cover-tile" data-t="${i}" aria-label="구름 조각 ${i + 1} 열기"></button>`).join('')}
              </div>
            </div>
            <div class="cover-hintbar">
              <button class="btn btn-sm btn-sun" id="more">🔎 한 조각 더</button>
              <span class="chip" id="reveal-note">구름을 눌러도 열려요</span>
            </div>
            <div class="choices c${D.choices}" id="choices" style="grid-template-columns:repeat(${Math.min(D.choices, 3)},1fr)">
              ${choices.map((p) => `
                <button class="choice" data-pid="${p.id}">
                  <img class="ch-art" src="${artUrl(p.id)}" alt="" draggable="false">
                  <span>${p.n}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>`;

      qs('#choices', body).addEventListener('click', (e) => {
        const b = e.target.closest('.choice');
        if (b) answer(b);
      });
      qs('#more', body).addEventListener('click', () => revealMore(true));
      const grid = qs('#cover-grid', body);
      grid.addEventListener('click', (e) => {
        const t = e.target.closest('.cover-tile');
        if (t && !t.classList.contains('open')) {
          t.classList.add('open'); opened++;
          ctx.sfx.pop();
        }
      });

      // 처음 몇 조각은 열어 주고, 시간이 지나면 하나씩 더 열려요
      for (let i = 0; i < D.start; i++) later(() => revealMore(false), 260 + i * 320);
      D.auto.forEach((ms) => later(() => { if (!done) revealMore(false); }, ms));
      ctx.load([target, ...choices]);
    }

    function revealMore(byUser) {
      if (done) return;
      const closed = qsa('.cover-tile:not(.open)', body);
      if (!closed.length) return;
      const t = pick(closed);
      t.classList.add('open');
      opened++;
      if (byUser) ctx.sfx.pop();
    }

    function answer(btn) {
      if (done) return;
      const pid = Number(btn.dataset.pid);
      if (pid === target.id) {
        done = true;
        btn.classList.add('right');
        const art = qs('#cover-art', body);
        qsa('.cover-tile', art).forEach((t, i) => later(() => t.classList.add('open'), i * 40));
        ctx.sfx.cry(target.id);
        const r = art.getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 24, speed: 7 });
        ctx.toast(`정답! ${target.n}이었어요 🎉`, 1500);
        const isLast = round >= ROUNDS - 1;
        later(() => ctx.win(isLast ? '정답이야!' : pick(['정답!', '맞았어!'])), 420);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else render();
        }, 2100);
      } else {
        ctx.sfx.wrong();
        btn.classList.remove('wrong');
        void btn.offsetWidth;
        btn.classList.add('wrong');
        ctx.toast('음~ 다시 한번 볼까? 조각을 더 열어 줄게!', 1700);
        later(() => revealMore(false), 500);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

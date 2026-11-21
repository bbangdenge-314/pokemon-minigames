/* ==========================================================
   3. 일부를 가리고 맞추기 — 구름 조각 / 스포트라이트
   ========================================================== */
import { DEX, artUrl, pick, pickMany, typeColor } from '../data.js';
import { qs, qsa } from '../core.js';

const ROUNDS = [
  { mode: 'tiles', n: 3 },
  { mode: 'spot', n: 3 },
  { mode: 'tiles', n: 3 },
];

export default {
  id: 'cover',
  howto: '포켓몬 그림이 구름에 가려져 있어요. 조금씩 열리는 그림을 보고 누구인지 맞혀 보세요!',
  tips: [
    '구름을 콕 누르면 그 조각이 열려요.',
    '아래 <b>한 조각 더</b> 버튼으로 더 볼 수 있어요.',
    '보기 4개 중에 정답이 하나 있어요.',
  ],
  mount(ctx) {
    let round = 0;
    let done = false;
    let opened = 0;
    let target = null;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      const cfg = ROUNDS[round];
      const pool = DEX.filter((p) => p.h >= 0.4);
      target = pick(pool);
      const others = pickMany(pool.filter((p) => p.id !== target.id), 3);
      const choices = pickMany([target, ...others], 4);
      done = false;
      opened = 0;
      ctx.setRound(round, ROUNDS.length);
      ctx.setTip(cfg.mode === 'tiles'
        ? '구름을 하나씩 열어 보세요. <b>누구</b>일까요?'
        : '손전등이 비추는 곳만 보여요. <b>누구</b>일까요?', cfg.mode === 'tiles' ? '☁️' : '🔦');

      const tiles = cfg.mode === 'tiles' ? `
        <div class="cover-grid" id="cover-grid" style="grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr)">
          ${Array.from({ length: 9 }, (_, i) => `<button class="cover-tile" data-t="${i}" aria-label="구름 조각 ${i + 1} 열기"></button>`).join('')}
        </div>` : `<div class="spotlight" id="spot" style="--sx:50%;--sy:48%;--sr:15%"></div>`;

      body.innerHTML = `
        <div class="stage cover-stage">
          <div class="center-col">
            <div class="cover-art" id="cover-art">
              <img src="${artUrl(target.id)}" alt="" draggable="false">
              ${tiles}
            </div>
            <div class="cover-hintbar">
              <button class="btn btn-sm btn-sun" id="more">🔎 한 조각 더</button>
              <span class="chip" id="reveal-note">${cfg.mode === 'tiles' ? '구름을 눌러도 열려요' : '손전등이 조금씩 커져요'}</span>
            </div>
            <div class="choices four" id="choices">
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
      if (cfg.mode === 'tiles') {
        const grid = qs('#cover-grid', body);
        grid.addEventListener('click', (e) => {
          const t = e.target.closest('.cover-tile');
          if (t && !t.classList.contains('open')) {
            t.classList.add('open'); opened++;
            ctx.sfx.pop();
          }
        });
      }
      const art = qs('#cover-art', body);
      art.addEventListener('click', (e) => {
        if (cfg.mode === 'spot' && !e.target.closest('.choice')) revealMore(true);
      });

      // 처음에 두 조각은 열어 주고, 시간이 지나면 하나씩 더 열려요
      later(() => { revealMore(false); later(() => revealMore(false), 500); }, 260);
      later(() => { if (!done) revealMore(false); }, 6500);
      later(() => { if (!done) revealMore(false); }, 12000);
      ctx.load([target, ...choices]);
    }

    function revealMore(byUser) {
      if (done) return;
      const cfg = ROUNDS[round];
      if (cfg.mode === 'tiles') {
        const closed = qsa('.cover-tile:not(.open)', body);
        if (!closed.length) return;
        const t = closed[0];
        t.classList.add('open');
        opened++;
        if (byUser) ctx.sfx.pop();
      } else {
        const spot = qs('#spot', body);
        if (!spot) return;
        const cur = Number((spot.style.getPropertyValue('--sr') || '15%').replace('%', '')) || 15;
        const next = Math.min(70, cur + (byUser ? 12 : 7));
        spot.style.setProperty('--sr', next + '%');
        spot.style.setProperty('--sx', (34 + Math.random() * 32).toFixed(0) + '%');
        spot.style.setProperty('--sy', (38 + Math.random() * 26).toFixed(0) + '%');
        if (byUser) ctx.sfx.pop();
      }
    }

    function answer(btn) {
      if (done) return;
      const pid = Number(btn.dataset.pid);
      if (pid === target.id) {
        done = true;
        btn.classList.add('right');
        const art = qs('#cover-art', body);
        qsa('.cover-tile', art).forEach((t, i) => later(() => t.classList.add('open'), i * 45));
        const spot = qs('#spot', body);
        if (spot) { spot.style.setProperty('--sr', '120%'); spot.style.setProperty('--sx', '50%'); spot.style.setProperty('--sy', '50%'); }
        ctx.sfx.cry(target.id);
        const r = art.getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 24, speed: 7 });
        ctx.toast(`정답! ${target.n}이었어요 🎉`, 1500);
        const isLast = round >= ROUNDS.length - 1;
        later(() => ctx.win(isLast ? '정답이야!' : pick(['정답!', '맞았어!'])), 420);
        later(() => {
          round++;
          if (round >= ROUNDS.length) ctx.finish(5);
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

/* ==========================================================
   7. 포켓몬 조각 퍼즐 — 2×2 / 3×3 조각 맞추기
   ========================================================== */
import { DEX, artUrl, pick, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

const ROUNDS = 2;

export default {
  id: 'puzzle',
  howto: '그림이 조각조각 섞여 있어요. 두 조각을 차례로 눌러 자리를 바꾸며 그림을 완성해요!',
  tips: [
    '조각 하나를 누르고, 바꾸고 싶은 조각을 누르면 자리가 바뀌어요.',
    '어려우면 <b>힌트</b>를 눌러 완성된 그림을 살짝 봐요.',
    '2×2는 아주 쉬워요. 익숙해지면 3×3에 도전!',
  ],
  mount(ctx) {
    let size = 2;
    let round = 0;
    let order = [];
    let sel = null;
    let done = false;
    let target = null;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function choose() {
      ctx.setTip('몇 조각으로 맞출까요?', '🧩');
      const prog = qs('#game-progress');
      if (prog) prog.textContent = '준비';
      body.innerHTML = `
        <div class="stage stage-pad center-col">
          <h3 style="font-size:clamp(20px,3vw,26px)">몇 조각으로 맞출까요?</h3>
          <div class="level-row" id="plevels">
            <button class="level-btn sel" data-n="2"><span>2 × 2</span><small>아주 쉬워요</small></button>
            <button class="level-btn" data-n="3"><span>3 × 3</span><small>조금 어려워요</small></button>
          </div>
          <button class="btn btn-primary btn-lg" id="p-start">시작! 🧩</button>
          <img src="${artUrl(6)}" alt="" style="width:clamp(92px,16vw,130px);filter:drop-shadow(0 8px 10px rgba(80,60,120,.2))">
        </div>`;
      qsa('#plevels .level-btn', body).forEach((b) => b.addEventListener('click', () => {
        size = Number(b.dataset.n);
        qsa('#plevels .level-btn', body).forEach((x) => x.classList.remove('sel'));
        b.classList.add('sel');
        ctx.sfx.tap();
      }));
      qs('#p-start', body).addEventListener('click', () => { round = 0; render(); });
    }

    function shuffledOrder(n) {
      let arr;
      do {
        arr = pickMany(Array.from({ length: n * n }, (_, i) => i), n * n);
      } while (arr.every((v, i) => v === i));
      return arr;
    }

    function render() {
      const n = size;
      target = pick(DEX.filter((p) => p.h >= 0.9));
      order = shuffledOrder(n);
      sel = null; done = false;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`조각을 눌러 자리를 바꿔 <b>${target.n}</b> 그림을 완성해요!`, '🧩');

      body.innerHTML = `
        <div class="stage puzzle-stage">
          <div class="center-col">
            <div class="puzzle-wrap">
              <div class="puzzle-grid" id="pgrid" style="grid-template-columns:repeat(${n},1fr);grid-template-rows:repeat(${n},1fr)">
                ${Array.from({ length: n * n }, (_, p) => `<button class="pz-tile" data-p="${p}" aria-label="퍼즐 조각 ${p + 1}"></button>`).join('')}
              </div>
              <div class="puzzle-ghost" id="pghost"><img src="${artUrl(target.id)}" alt="" draggable="false"></div>
            </div>
            <div class="puzzle-info">
              <span class="chip" id="p-note">두 조각을 차례로 눌러 보세요</span>
              <button class="btn btn-sm btn-sun" id="p-hint">💡 힌트</button>
            </div>
          </div>
        </div>`;

      paint();
      qs('#pgrid', body).addEventListener('click', (e) => {
        const t = e.target.closest('.pz-tile');
        if (t) tap(Number(t.dataset.p));
      });
      qs('#p-hint', body).addEventListener('click', () => {
        const g = qs('#pghost', body);
        if (!g) return;
        g.classList.add('show');
        ctx.sfx.pop();
        setTimeout(() => g.classList.remove('show'), 1600);
      });
      ctx.load([target]);
    }

    function paint() {
      const n = size;
      const url = artUrl(target.id);
      qsa('#pgrid .pz-tile', body).forEach((t, p) => {
        const idx = order[p];
        const row = Math.floor(idx / n);
        const col = idx % n;
        t.style.backgroundImage = `url("${url}")`;
        t.style.backgroundSize = `${n * 100}% ${n * 100}%`;
        t.style.backgroundPosition = `${n === 1 ? 0 : (col / (n - 1)) * 100}% ${n === 1 ? 0 : (row / (n - 1)) * 100}%`;
        t.classList.toggle('correct', idx === p && n > 2);
        t.classList.toggle('sel', sel === p);
      });
    }

    function tap(p) {
      if (done) return;
      if (sel === null) { sel = p; ctx.sfx.tap(); paint(); return; }
      if (sel === p) { sel = null; paint(); return; }
      const a = sel;
      sel = null;
      [order[a], order[p]] = [order[p], order[a]];
      ctx.sfx.pop();
      paint();
      const note = qs('#p-note', body);
      const solved = order.every((v, i) => v === i);
      if (solved) {
        done = true;
        qsa('#pgrid .pz-tile', body).forEach((t) => t.classList.add('solved'));
        ctx.sfx.cry(target.id);
        ctx.sfx.correct();
        const r = qs('#pgrid', body).getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 26, speed: 7 });
        const last = round >= ROUNDS - 1;
        later(() => ctx.win(last ? '퍼즐 완성!' : '완성했어!'), 380);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else render();
        }, 2000);
      } else if (note) {
        note.textContent = '좋아요! 계속 맞춰 보세요';
      }
    }

    choose();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

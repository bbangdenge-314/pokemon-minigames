/* ==========================================================
   5. 그림자 짝꿍찾기 — 실루엣의 주인을 찾아 짝짓기
   ========================================================== */
import { byId, artUrl, SHADOW_IDS, pickMany } from '../data.js';
import { qs, qsa } from '../core.js';

export default {
  id: 'shadow',
  howto: '까만 그림자를 보고, 아래에서 똑같은 포켓몬을 찾아 짝을 지어 주세요.',
  tips: [
    '그림자를 먼저 콕 누르고, 같은 포켓몬을 누르면 짝이 돼요.',
    '반대로 포켓몬을 먼저 눌러도 괜찮아요.',
    '짝이 맞으면 그림자가 환하게 밝아져요.',
  ],
  mount(ctx) {
    let round = 0;
    let selShadow = null;
    let selPoke = null;
    let matched = 0;
    let done = false;
    let pairs = [];
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;
    const ROUNDS = 3;

    function render() {
      pairs = pickMany(SHADOW_IDS, 3).map(byId);
      const shadowOrder = pickMany(pairs, 3);
      const pokeOrder = pickMany(pairs, 3);
      selShadow = null; selPoke = null; matched = 0; done = false;
      ctx.setRound(round, ROUNDS);
      ctx.setTip('이 그림자는 누구일까요? <b>그림자</b>와 <b>같은 친구</b>를 짝지어 주세요!', '🌙');

      body.innerHTML = `
        <div class="stage shadow-stage center-col">
          <div class="shadow-row" id="shadows">
            ${shadowOrder.map((p, i) => `
              <button class="shadow-card" data-pid="${p.id}" data-i="${i}" aria-label="그림자 ${i + 1}">
                <img src="${artUrl(p.id)}" alt="" draggable="false">
              </button>`).join('')}
          </div>
          <div class="shadow-note" id="note">그림자를 하나 골라 보세요</div>
          <div class="shadow-row pokes" id="pokes">
            ${pokeOrder.map((p, i) => `
              <button class="poke-card" data-pid="${p.id}" data-i="${i}" aria-label="${p.n}">
                <img src="${artUrl(p.id)}" alt="${p.n}" draggable="false">
              </button>`).join('')}
          </div>
        </div>`;

      qs('#shadows', body).addEventListener('click', (e) => {
        const b = e.target.closest('.shadow-card');
        if (b) pickShadow(b);
      });
      qs('#pokes', body).addEventListener('click', (e) => {
        const b = e.target.closest('.poke-card');
        if (b) pickPoke(b);
      });
      ctx.load(pairs);
    }

    function noteText(t) { const n = qs('#note', body); if (n) n.textContent = t; }

    function pickShadow(node) {
      if (done || node.classList.contains('matched')) return;
      ctx.sfx.tap();
      qsa('#shadows .shadow-card', body).forEach((x) => x.classList.remove('sel'));
      node.classList.add('sel');
      selShadow = node;
      if (selPoke) check();
      else noteText('이제 아래에서 같은 친구를 찾아보세요!');
    }

    function pickPoke(node) {
      if (done || node.classList.contains('matched')) return;
      ctx.sfx.tap();
      qsa('#pokes .poke-card', body).forEach((x) => x.classList.remove('sel'));
      node.classList.add('sel');
      selPoke = node;
      if (selShadow) check();
      else noteText('이제 위의 그림자 중에 같은 친구를 찾아보세요!');
    }

    function check() {
      const s = selShadow;
      const p = selPoke;
      if (!s || !p) return;
      if (s.dataset.pid === p.dataset.pid) {
        s.classList.add('matched');
        s.classList.remove('sel');
        p.classList.add('matched');
        p.classList.remove('sel');
        selShadow = null; selPoke = null;
        matched++;
        const poke = byId(Number(s.dataset.pid));
        ctx.sfx.cry(poke.id);
        ctx.sfx.correct();
        const r = s.getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 16, speed: 5.5 });
        noteText(`짝꿍을 찾았어요! ${poke.n} 💛`);
        if (matched === 3) {
          done = true;
          const last = round >= ROUNDS - 1;
          later(() => ctx.win(last ? '모두 찾았어!' : '짝짝짝!'), 320);
          later(() => {
            round++;
            if (round >= ROUNDS) ctx.finish(5);
            else render();
          }, 1850);
        }
      } else {
        ctx.sfx.wrong();
        [s, p].forEach((n) => { n.classList.remove('wrong'); void n.offsetWidth; n.classList.add('wrong'); n.style.animation = 'shake .45s'; });
        const a = s, b = p;
        noteText('앗, 다른 친구야! 다시 해볼까?');
        later(() => {
          a.classList.remove('sel', 'wrong'); b.classList.remove('sel', 'wrong');
          a.style.animation = ''; b.style.animation = '';
          selShadow = null; selPoke = null;
          noteText('그림자를 하나 골라 보세요');
        }, 700);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

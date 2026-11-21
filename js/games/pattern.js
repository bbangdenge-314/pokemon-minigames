/* ==========================================================
   10. 다음에 올 친구는? — 쉬움 ABAB / 보통 AAB·ABB·ABC / 어려움 AABB·ABCD·ABAC
   ========================================================== */
import { DEX, artUrl, pickMany, pick } from '../data.js';
import { qs } from '../core.js';

const RULES = {
  easy: [
    { seq: ['A', 'B', 'A', 'B', 'A'], answer: 'B', hint: '두 친구가 번갈아 나와요!' },
    { seq: ['A', 'B', 'A', 'B', 'A', 'B', 'A'], answer: 'B', hint: 'A 다음엔 꼭 B가 와요!' },
    { seq: ['B', 'A', 'B', 'A', 'B'], answer: 'A', hint: 'B 다음엔 꼭 A가 와요!' },
  ],
  normal: [
    { seq: ['A', 'A', 'B', 'A', 'A'], answer: 'B', hint: '같은 친구가 두 번, 그다음에 다른 친구!' },
    { seq: ['A', 'B', 'B', 'A', 'B'], answer: 'B', hint: 'A 다음에 B가 두 번 나와요!' },
    { seq: ['A', 'B', 'C', 'A', 'B'], answer: 'C', hint: '세 친구가 정해진 순서대로 돌아가요!' },
  ],
  hard: [
    { seq: ['A', 'A', 'B', 'B', 'A', 'A'], answer: 'B', hint: '같은 친구가 두 번씩, 두 친구가 번갈아!' },
    { seq: ['A', 'B', 'C', 'D', 'A', 'B'], answer: 'C', hint: '네 친구가 순서대로 돌아가요!' },
    { seq: ['A', 'B', 'A', 'C', 'A', 'B'], answer: 'A', hint: 'A 다음에 B, 그다음 A 다음에 C!' },
  ],
};
const ROUNDS = 3;

export default {
  id: 'pattern',
  howto: '포켓몬이 어떤 규칙으로 늘어서 있는지 살펴보고, 물음표 자리에 올 친구를 골라 주세요.',
  tips: [
    '두 친구가 번갈아 나오는지, 같은 친구가 두 번 나오는지 살펴보세요.',
    '모르겠으면 <b>힌트</b>를 눌러도 괜찮아요.',
    '정답을 고르면 물음표 자리에 친구가 쏙 들어와요.',
  ],
  mount(ctx) {
    const diff = ctx.difficulty || 'normal';
    const rules = RULES[diff] || RULES.normal;
    const nChoices = diff === 'hard' ? 5 : 4;
    let round = 0;
    let pack = null;
    let done = false;
    let wrongCount = 0;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      const cfg = rules[round % rules.length];
      const pool = pickMany(DEX, 4);
      pack = { A: pool[0], B: pool[1], C: pool[2], D: pool[3] };
      done = false;
      wrongCount = 0;
      ctx.setRound(round, ROUNDS);
      ctx.setTip('규칙을 찾아 <b>물음표 자리</b>에 올 친구를 골라 보세요!', '✨');

      const used = [...new Set(cfg.seq)].map((k) => pack[k]);
      const distractorPool = DEX.filter((p) => !used.some((u) => u.id === p.id));
      const wrongs = pickMany(distractorPool, nChoices - 1);
      const choices = pickMany([...wrongs, pack[cfg.answer]], nChoices);

      const items = cfg.seq.map((k, i) => `
        ${i ? '<span class="pat-arrow" aria-hidden="true">›</span>' : ''}
        <span class="pat-item" style="animation-delay:${i * 70}ms">
          <img src="${artUrl(pack[k].id)}" alt="${pack[k].n}" draggable="false">
        </span>`).join('');

      body.innerHTML = `
        <div class="stage pattern-stage center-col">
          <div class="pattern-strip" id="strip">
            ${items}
            <span class="pat-arrow" aria-hidden="true">›</span>
            <span class="pat-item blank" id="blank">?</span>
          </div>
          <div class="pat-choices c${nChoices}" id="pat-choices" style="grid-template-columns:repeat(${Math.min(nChoices, 5)},1fr)">
            ${choices.map((p) => `<button class="pat-choice" data-pid="${p.id}" aria-label="${p.n}">
              <img src="${artUrl(p.id)}" alt="" draggable="false"><span>${p.n}</span></button>`).join('')}
          </div>
          <div class="hint-line" id="pat-hint" style="min-height:22px"></div>
          <button class="btn btn-sm btn-sun" id="pat-hint-btn">💡 힌트</button>
        </div>`;

      qs('#pat-choices', body).addEventListener('click', (e) => {
        const b = e.target.closest('.pat-choice');
        if (b) answer(b, cfg);
      });
      qs('#pat-hint-btn', body).addEventListener('click', () => showHint(cfg));
      ctx.load([...used, ...choices]);
    }

    function showHint(cfg) {
      ctx.sfx.pop();
      const h = qs('#pat-hint', body);
      if (h) h.innerHTML = `💡 ${cfg.hint}`;
    }

    function answer(btn, cfg) {
      if (done) return;
      const id = Number(btn.dataset.pid);
      const correct = pack[cfg.answer];
      if (id === correct.id) {
        done = true;
        btn.classList.add('right');
        const blank = qs('#blank', body);
        if (blank) {
          blank.classList.remove('blank');
          blank.classList.add('filled');
          blank.style.animation = 'none';
          blank.innerHTML = `<img src="${artUrl(correct.id)}" alt="${correct.n}" draggable="false">`;
        }
        ctx.sfx.cry(correct.id);
        ctx.sfx.correct();
        const r = (blank || btn).getBoundingClientRect();
        ctx.fx.burst(r.left + r.width / 2, r.top + r.height / 2, { n: 18, speed: 6 });
        const isLast = round >= ROUNDS - 1;
        later(() => ctx.win(isLast ? '규칙을 찾았어!' : '딩동댕!'), 350);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else render();
        }, 2000);
      } else {
        wrongCount++;
        ctx.sfx.wrong();
        btn.classList.remove('wrong');
        void btn.offsetWidth;
        btn.classList.add('wrong');
        if (wrongCount >= 2) showHint(cfg);
        ctx.toast(wrongCount >= 2 ? '힌트를 봐도 괜찮아! 함께 찾아보자' : '음~ 규칙을 다시 볼까?', 1500);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

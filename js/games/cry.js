/* ==========================================================
   8. 울음소리 맞추기 — 쉬움 3지선다 / 보통 4지선다 / 어려움 6지선다
   ========================================================== */
import { DEX, artUrl, pick, pickMany } from '../data.js';
import { qs } from '../core.js';

const CFG = { easy: 3, normal: 4, hard: 6 };
const ROUNDS = 3;

export default {
  id: 'cry',
  howto: '스피커를 눌러 포켓몬 울음소리를 들어 보세요. 어떤 친구의 소리일까요?',
  tips: [
    '큰 노란 버튼을 누르면 소리가 다시 나와요.',
    '소리를 잘 듣고 아래에서 이름을 골라요.',
    '틀려도 몇 번이든 다시 들을 수 있어요.',
  ],
  mount(ctx) {
    const n = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let target = null;
    let done = false;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      target = pick(DEX);
      const others = pickMany(DEX.filter((p) => p.id !== target.id), n - 1);
      const choices = pickMany([target, ...others], n);
      done = false;
      ctx.setRound(round, ROUNDS);
      ctx.setTip(`귀를 쫑긋! <b>누구의 울음소리</b>일까요? (보기 ${n}개)`, '🎵');

      body.innerHTML = `
        <div class="stage cry-stage">
          <div class="center-col">
            <div class="cry-note" id="cry-note">스피커를 눌러 소리를 들어 보세요</div>
            <div class="cry-main">
              <button class="speaker-btn" id="speaker" aria-label="울음소리 듣기">
                <span class="sp-rings"></span><span class="sp-rings"></span><span class="sp-rings"></span>
                🔊
              </button>
              <div class="cry-mystery" id="mystery" aria-hidden="true">?</div>
            </div>
            <div class="cry-note" style="font-size:15px" id="cry-sub">다시 듣고 싶으면 스피커를 또 눌러요</div>
            <div class="cry-choices" id="cry-choices" style="grid-template-columns:repeat(${n <= 4 ? 2 : 3},1fr)">
              ${choices.map((p, i) => `<button class="cry-choice" data-pid="${p.id}">
                <span class="num">${i + 1}</span><span>${p.n}</span></button>`).join('')}
            </div>
          </div>
        </div>`;

      qs('#speaker', body).addEventListener('click', () => play(true));
      qs('#cry-choices', body).addEventListener('click', (e) => {
        const b = e.target.closest('.cry-choice');
        if (b) answer(b);
      });
      later(() => play(false), 350);
      ctx.load([target, ...choices]);
    }

    function play(byUser) {
      if (done) return;
      ctx.sfx.ensure();
      ctx.sfx.cry(target.id);
      const sp = qs('#speaker', body);
      if (sp) {
        sp.classList.add('playing');
        later(() => sp.classList.remove('playing'), 1400);
      }
      const note = qs('#cry-note', body);
      if (note) note.textContent = byUser ? '다시 들어 보세요! 🎶' : '이 소리는 누구일까요?';
    }

    function answer(btn) {
      if (done) return;
      const id = Number(btn.dataset.pid);
      if (id === target.id) {
        done = true;
        btn.classList.add('right');
        ctx.sfx.correct();
        ctx.sfx.cry(target.id);
        const isLast = round >= ROUNDS - 1;
        reveal();
        later(() => ctx.win(isLast ? '정답이야!' : '딩동댕!'), 300);
        later(() => {
          round++;
          if (round >= ROUNDS) { ctx.finish(5); }
          else render();
        }, 2400);
      } else {
        ctx.sfx.wrong();
        btn.classList.remove('wrong');
        void btn.offsetWidth;
        btn.classList.add('wrong');
        const note = qs('#cry-note', body);
        if (note) note.textContent = '앗, 다른 친구야! 한 번 더 들어 보자';
        later(() => play(false), 500);
      }
    }

    function reveal() {
      const m = qs('#mystery', body);
      if (!m) return;
      m.classList.add('on');
      m.innerHTML = `<img src="${artUrl(target.id)}" alt="${target.n}" draggable="false">`;
      const note = qs('#cry-sub', body);
      if (note) note.textContent = `정답은 ${target.n}!`;
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); ctx.sfx.stopCry(); } };
  },
};

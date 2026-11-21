/* ==========================================================
   9. 몇 마리일까? — 쉬움 1~5 / 보통 4~10 / 어려움 8~18(움직여요)
   ========================================================== */
import { DEX, artUrl, pick, pickMany } from '../data.js';
import { decor } from './scene.js';
import { qs, qsa } from '../core.js';

const CFG = {
  easy: { min: 1, max: 5, species: 1, drift: false, pad: 6 },
  normal: { min: 4, max: 10, species: 2, drift: false, pad: 12 },
  hard: { min: 8, max: 18, species: 3, drift: true, pad: 20 },
};
const ROUNDS = 3;

export default {
  id: 'count',
  howto: '화면에 옹기종기 모인 포켓몬은 모두 몇 마리일까요? 손가락으로 하나씩 짚으며 세어 보세요!',
  tips: [
    '하나, 둘, 셋… 소리 내어 세어 보세요.',
    '아래 숫자 버튼을 누르면 답이 돼요.',
    '어려움에서는 친구들이 살금살금 움직여요!',
  ],
  mount(ctx) {
    const D = CFG[ctx.difficulty] || CFG.normal;
    let round = 0;
    let count = 0;
    let done = false;
    let tried = 0;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const body = ctx.root;

    function render() {
      count = D.min + Math.floor(Math.random() * (D.max - D.min + 1));
      const species = pickMany(DEX, Math.min(D.species, count));
      const list = Array.from({ length: count }, (_, i) => species[i % species.length]);
      done = false;
      tried = 0;
      ctx.setRound(round, ROUNDS);
      ctx.setTip('몇 마리인지 <b>하나씩 짚으며</b> 세어 보고, 숫자를 눌러요!', '🔢');

      const cols = count <= 6 ? 3 : count <= 12 ? 4 : 6;
      const rows = Math.ceil(count / cols);
      const cells = pickMany(Array.from({ length: cols * rows }, (_, i) => i), count);
      const pokes = cells.map((c, i) => {
        const col = c % cols, row = Math.floor(c / cols);
        const x = ((col + 0.5) / cols) * 100 + (Math.random() * 6 - 3);
        const y = ((row + 0.5) / rows) * 100 + (Math.random() * 6 - 3);
        const size = (D.drift ? 12 : 17) + Math.random() * 3;
        const rot = (Math.random() * 16 - 8).toFixed(1);
        return `<span class="count-poke${D.drift ? ' drift' : ''}" data-i="${i}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${size.toFixed(1)}%;--rot:${rot}deg;animation-delay:${(i * 60)}ms">
          <img src="${artUrl(list[i].id)}" alt="" draggable="false"></span>`;
      }).join('');

      body.innerHTML = `
        <div class="stage count-stage center-col">
          <div class="count-field" id="field">
            <span class="count-ground" aria-hidden="true">
              ${decor({ type: 'grass', x: 1, y: 86, w: 7, h: 9, o: .8 })}
              ${decor({ type: 'grass', x: 94, y: 88, w: 6, h: 8, o: .7 })}
              ${decor({ type: 'flower', x: 92, y: 90, w: 4.5, h: 7, color: '#ffb3cd', o: .85 })}
              ${decor({ type: 'flower', x: 4, y: 91, w: 4.2, h: 6.5, color: '#c9b6ff', o: .85 })}
              ${decor({ type: 'mushroom', x: 12, y: 92, w: 3.6, h: 5.4, o: .8 })}
              ${decor({ type: 'flower', x: 50, y: 93, w: 3.8, h: 6, color: '#ffd166', o: .8 })}
            </span>
            ${pokes}
          </div>
          <div class="num-pad pad${D.pad}" id="numpad">
            ${Array.from({ length: D.pad }, (_, i) => `<button class="num-btn" data-n="${i + 1}" aria-label="${i + 1}">${i + 1}</button>`).join('')}
          </div>
          <div class="game-tip">👆 하나, 둘, 셋… 손가락으로 짚어 보세요</div>
        </div>`;

      qs('#numpad', body).addEventListener('click', (e) => {
        const b = e.target.closest('.num-btn');
        if (b) answer(b);
      });
      ctx.load(list);
    }

    function answer(btn) {
      if (done) return;
      const n = Number(btn.dataset.n);
      if (n === count) {
        done = true;
        btn.classList.add('right');
        ctx.sfx.correct();
        const nodes = qsa('.count-poke', body);
        nodes.forEach((node, i) => later(() => {
          node.classList.add('counted');
          node.setAttribute('data-no', String(i + 1));
          ctx.sfx.star(i);
        }, i * 220));
        const finishAt = nodes.length * 220 + 500;
        later(() => {
          const isLast = round >= ROUNDS - 1;
          ctx.win(isLast ? `정답! ${count}마리!` : '정답이야!');
          if (nodes[0]) ctx.sfx.cry(Number((nodes[0].querySelector('img').src.match(/\/(\d+)\.png/) || [])[1]) || 25);
        }, finishAt);
        later(() => {
          round++;
          if (round >= ROUNDS) ctx.finish(5);
          else render();
        }, finishAt + 1100);
      } else {
        tried++;
        ctx.sfx.wrong();
        btn.classList.remove('wrong');
        void btn.offsetWidth;
        btn.classList.add('wrong');
        ctx.toast(tried >= 2 ? '하나씩 짚으면서 다시 세어 볼까?' : '음~ 다시 세어 보자!', 1500);
      }
    }

    render();
    return { destroy() { done = true; timers.forEach((t) => clearTimeout(t)); } };
  },
};

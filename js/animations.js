/* =============================================================
   animations.js — purely decorative builders & effects:
   toran garland, ambient marigold petals, side culture frames
   (Warli + Jharokha), and the milestone celebration burst.
   These touch only their own DOM nodes and `MONTHS`/`lang`.
   ============================================================= */

function buildToran(){
  let s=`<svg viewBox="0 0 400 34" preserveAspectRatio="none"><path d="M0 5 Q200 28 400 5" stroke="var(--gold)" stroke-width="1.5" fill="none"/>`;
  for(let x=14;x<400;x+=20){
    const dip=5+23*Math.sin((x/400)*Math.PI);
    s+=`<circle cx="${x}" cy="${dip+6}" r="2.3" fill="var(--rust)"/>`;
    s+=`<path d="M${x} ${dip+8} q-3 8 0 13 q3 -5 0 -13" fill="var(--p-roma)" opacity=".7"/>`;
  }
  document.getElementById('toran').innerHTML=s+`</svg>`;
}

function buildPetals(){
  const cols=['#e0a030','#e8a55f','#c8ae5c','#5fa89c'];
  let h='';
  for(let i=0;i<14;i++){
    const x=Math.random()*98, dur=8+Math.random()*7, del=-Math.random()*10, sz=5+Math.random()*5, c=cols[i%cols.length];
    h+=`<div class="petal" style="left:${x}vw;animation-duration:${dur}s;animation-delay:${del}s;">
      <svg width="${sz*2}" height="${sz*2}" viewBox="0 0 12 12"><path d="M6 1 Q10 5 6 11 Q2 5 6 1" fill="${c}" opacity=".8"/></svg></div>`;
  }
  document.getElementById('petalLayer').innerHTML=h;
}

function buildFrames(){
  // Warli (left, Maharashtra)
  const warli=`<svg viewBox="0 0 22 600" preserveAspectRatio="none" class="draw"><g stroke="var(--p-roma)" stroke-width="1.3" fill="none">
    ${[50,150,360,470,560].map(y=>`<g transform="translate(11,${y})"><circle r="3"/><line x1="0" y1="3" x2="0" y2="12"/><line x1="0" y1="6" x2="-5" y2="10"/><line x1="0" y1="6" x2="5" y2="10"/><line x1="0" y1="12" x2="-4" y2="19"/><line x1="0" y1="12" x2="4" y2="19"/></g>`).join('')}
    <g transform="translate(11,255)"><circle r="5"/><line x1="0" y1="-9" x2="0" y2="-6"/><line x1="0" y1="9" x2="0" y2="6"/><line x1="-9" y1="0" x2="-6" y2="0"/><line x1="9" y1="0" x2="6" y2="0"/></g></g></svg>`;
  // Jharokha + lotus + mandana (right, Rajasthan)
  const jhar=`<svg viewBox="0 0 22 600" preserveAspectRatio="none" class="draw"><g stroke="var(--p-pfam)" stroke-width="1.2" fill="none">
    ${[60,230,400,540].map(y=>`<g transform="translate(11,${y})"><path d="M-8 16 V4 a8 8 0 0 1 16 0 V16"/><path d="M-4 16 V7 a4 4 0 0 1 8 0 V16"/></g>`).join('')}
    <g transform="translate(11,145)"><circle r="7"/><path d="M0 -7 Q3 -3 0 0 Q-3 -3 0 -7"/><path d="M0 7 Q3 3 0 0 Q-3 3 0 7"/></g>
    <g transform="translate(11,320)"><path d="M0 -8 L6 0 L0 8 L-6 0 Z"/></g></g></svg>`;
  document.getElementById('frameL').innerHTML=warli;
  document.getElementById('frameR').innerHTML=jhar;
}


/* ---- celebration burst (fired when a month hits 100%) ---- */
function celebrate(mi){
  const layer=document.getElementById('petalLayer');
  const cols=['#e0a030','#e8a55f','#5fa89c','#e8c869','#d4a843'];
  for(let i=0;i<28;i++){
    const d=document.createElement('div'); d.className='burst';
    const x=Math.random()*100, sz=6+Math.random()*7, c=cols[i%cols.length], rot=Math.random()*360;
    d.style.cssText=`left:${x}vw;top:28vh;animation-delay:${Math.random()*.3}s;`;
    d.innerHTML=`<svg width="${sz*2}" height="${sz*2}" viewBox="0 0 12 12" style="transform:rotate(${rot}deg)"><path d="M6 1 Q10 5 6 11 Q2 5 6 1" fill="${c}"/></svg>`;
    layer.appendChild(d); setTimeout(()=>d.remove(),2600);
  }
  const M=MONTHS[lang][mi]; const msg={en:'done!',hi:'पूर्ण!',mr:'पूर्ण!'}[lang];
  const toast=document.createElement('div'); toast.className='celebrate-toast'; toast.innerHTML=`✨ ${M.m} ${msg} ✨`;
  document.body.appendChild(toast); setTimeout(()=>toast.remove(),2600);
}
/* ---- cultural animation builders ---- */

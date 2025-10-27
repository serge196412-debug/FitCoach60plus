/* app.js — version avec minuterie intégrée (Start / Pause / Stop / +20s / auto-advance) */

/* Data: exercices (exemples) — adapte les URLs video: si besoin */
const defaultExercises = [
  {id:1,name:"Marche sur place",cat:"Cardio",dur:60,rest:30,desc:"Cardio doux — 1 minute",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Marche sur place, genoux modérés. Rythme modéré."},
  {id:2,name:"Fente assistée arrière",cat:"Renforcement",dur:45,rest:30,desc:"Fente arrière assistée",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Main sur dossier chaise; amplitude réduite."},
  {id:3,name:"Élévation latérale de jambe",cat:"Renforcement",dur:40,rest:30,desc:"Élévation latérale — 3 x 10",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Tenez-vous à une chaise; lever lentement."},
  {id:4,name:"Rotation du tronc assis",cat:"Mobilité",dur:40,rest:20,desc:"Rotation tronc assis",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, tourner le buste lentement, garder les hanches stables."},
  {id:5,name:"Squat partiel assis-debout",cat:"Renforcement",dur:50,rest:30,desc:"Squat partiel",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Descendre 30-50% amplitude; pousser sur talons."},
  {id:6,name:"Talons-fesses assis",cat:"Cardio",dur:30,rest:20,desc:"Talons-fesses",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Assis ou debout selon l'équilibre; rythme contrôlé."},
  {id:7,name:"Montée de mollets",cat:"Renforcement",dur:40,rest:30,desc:"Montée de mollets",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Monter sur la pointe des pieds lentement; appui main si besoin."},
  {id:8,name:"Marche talons-pointes",cat:"Équilibre",dur:45,rest:30,desc:"Talons-pointes",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Pose talon puis pointe; pas lents et contrôlés."},
  {id:9,name:"Pont fessier partiel",cat:"Renforcement",dur:45,rest:30,desc:"Pont fessier",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Allongé, contracter fessiers et lever légèrement."},
  {id:10,name:"Flexion de genou assis",cat:"Mobilité",dur:40,rest:20,desc:"Flexion genou",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Assis, rapprocher talon puis tendre la jambe."},
  {id:11,name:"Rotation du cou lente",cat:"Mobilité",dur:30,rest:20,desc:"Rotation cou",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Rotations lentes; amplitude confortable."},
  {id:12,name:"Respiration diaphragmatique",cat:"Récupération",dur:180,rest:20,desc:"Respiration",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, mains sur ventre; inspirez lentement, expirez lentement."},
  {id:13,name:"Demi-fente avant",cat:"Renforcement",dur:50,rest:30,desc:"Demi-fente avant",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Petit pas en avant ; genou contrôlé."},
  {id:14,name:"Step léger",cat:"Cardio",dur:60,rest:30,desc:"Step faible impact",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Step léger, amplitude réduite."},
  {id:15,name:"Adduction assis",cat:"Renforcement",dur:40,rest:20,desc:"Adduction assis",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, rapprocher les jambes ; utiliser coussin si besoin."},
  {id:16,name:"Rotation épaule douce",cat:"Mobilité",dur:40,rest:20,desc:"Rotation épaule",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Petites rotations contrôlées."},
  {id:17,name:"Marche sur talons",cat:"Équilibre",dur:40,rest:30,desc:"Marche talons",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Pas lents sur talons ; garder regard en avant."},
  {id:18,name:"Poussée talons allongé",cat:"Renforcement",dur:40,rest:30,desc:"Poussée talons",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Allongé, pousser sur talons pour lever bassin légèrement."},
  {id:19,name:"Pont latéral genoux pliés",cat:"Renforcement",dur:45,rest:30,desc:"Pont latéral",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Couche latérale, lever bassin légèrement ; 3x8."},
  {id:20,name:"Étirement lombes assis",cat:"Récupération",dur:60,rest:20,desc:"Étirement lombes",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, basculer buste en avant, tenir 20s x3."}
];

const defaultPrograms = [
  {id:'deb',name:'Programme débutant',desc:'Mobilité et renforcement léger',ex:[1,4,5,12]},
  {id:'rando',name:'Prépa rando',desc:'Préparation marche',ex:[1,3,7,9]},
  {id:'mobil',name:'Mobilité quotidienne',desc:'Courtes sessions',ex:[4,10,11,16]},
  {id:'cardio',name:'Cardio doux',desc:'Cardio faible impact',ex:[1,14,6,5]},
  {id:'equilibre',name:'Équilibre',desc:'Proprioception et stabilité',ex:[8,17,3,19]}
];

const STORAGE_KEY = 'fitcoach60_timer_v1';
let state = {
  profile:{name:'',birth:1958,weight:null,goal:null,issues:[]},
  weights:[], sessions:[], exercises: defaultExercises, programs: defaultPrograms
};

/* Accessibility & helpers */
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t){ console.log('Toast:', msg); return; }
  t.textContent = msg;
  t.classList.remove('visually-hidden');
  t.setAttribute('role','status');
  t.focus();
  clearTimeout(t._hide);
  t._hide = setTimeout(()=>{ t.classList.add('visually-hidden'); },3500);
}
function activateNav(id){
  try{
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    const btn = document.getElementById(id);
    if(btn) btn.classList.add('active');
    const main = document.getElementById('view-area');
    if(main){ main.setAttribute('tabindex','-1'); main.focus(); }
  }catch(e){ console.warn('activateNav error', e); }
}
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

/* Storage */
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); updateUI(); showToast('Données sauvegardées'); }
function loadState(){ const s = localStorage.getItem(STORAGE_KEY); if(s) state = JSON.parse(s); updateUI(); }

/* Timer engine state (global for current session run) */
let timer = {
  running:false,
  mode:'exercise', // 'exercise' or 'rest'
  remaining:0,
  intervalId:null,
  currentSequence:[], // array of exercise ids for the running session
  currentIndex:0,
  autoAdvance:false
};

/* Rendering */

const viewArea = document.getElementById('view-area');

function renderLanding(){
  viewArea.innerHTML = `
    <h2 style="margin-top:0">Bienvenue sur FitCoach 60+</h2>
    <p class="small">Programmes courts et sûrs, avec vidéo, consigne et minuterie intégrée.</p>
    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
      <button class="cta" onclick="activateNav('nav-profile'); showProfile()">Créer mon profil</button>
      <button class="btn-ghost" onclick="activateNav('nav-prog'); showPrograms()">Voir les programmes</button>
      <button class="btn-ghost" onclick="activateNav('nav-ex'); showExercises()">Bibliothèque d'exercices</button>
    </div>
    <div style="margin-top:14px" class="features">
      <div class="feature"><div class="pict">🏃‍♂️</div><div><strong>Cardio doux</strong><div class="small">Endurance adaptée</div></div></div>
      <div class="feature"><div class="pict">🦵</div><div><strong>Renforcement</strong><div class="small">Joints protégés</div></div></div>
      <div class="feature"><div class="pict">⚖️</div><div><strong>Équilibre</strong><div class="small">Prévention chutes</div></div></div>
    </div>
  `;
  focusMainHeading();
}

function showExercises(){
  const ex = state.exercises;
  viewArea.innerHTML = `<h3 style="margin-top:0">Bibliothèque d'exercices</h3>
    <div class="list">
      ${ex.map(e=>`
        <div class="card ex-row" role="region" aria-label="${e.name}">
          <div class="ex-ico">${iconFor(e.cat)}</div>
          <div style="flex:1">
            <strong id="ex-${e.id}-title">${e.name}</strong>
            <div class="small">${e.desc} · ${Math.round(e.dur/60)} min</div>
            <div style="margin-top:8px;display:flex;gap:8px">
              <button class="btn-ghost" data-ex="${e.id}">Voir</button>
              <button class="btn-ghost" data-add="${e.id}">Ajouter séance</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
  focusMainHeading();
}

function showPrograms(){
  const p = state.programs;
  viewArea.innerHTML = `<h3 style="margin-top:0">Programmes</h3>
    <div class="prog-list">
      ${p.map(pr=>`<div class="prog-item"><div><strong>${pr.name}</strong><div class="small">${pr.desc}</div></div><div style="display:flex;gap:8px"><button class="btn-ghost" data-view="${pr.id}">Ouvrir</button><button class="btn-ghost" data-start="${pr.id}">Lancer</button></div></div>`).join('')}
    </div>`;
  focusMainHeading();
}

function showDashboard(){
  viewArea.innerHTML = `<h3 style="margin-top:0">Tableau de bord</h3>
    <div class="card small">Historique des séances et pesées</div>
    <div style="margin-top:8px"><button class="btn-ghost" id="btn-export">Export CSV</button> <button class="btn-ghost" id="btn-demo">Importer démo</button></div>
  `;
  focusMainHeading();
}

function showProfile(){
  viewArea.innerHTML = `<h3 style="margin-top:0">Profil</h3>
    <div class="card small">
      <label>Nom</label><input id="p-name" value="${escapeHtml(state.profile.name)}">
      <div style="margin-top:8px" class="row"><div><label>Année de naissance</label><input id="p-birth" type="number" min="1900" max="2025" value="${state.profile.birth}"></div><div><label>Poids (kg)</label><input id="p-weight" type="number" value="${state.profile.weight||''}"></div></div>
      <div style="margin-top:8px"><label>Limitations (douleurs)</label><input id="p-issues" placeholder="poignets, genoux" value="${state.profile.issues.join(', ')}"></div>
      <div style="margin-top:12px;display:flex;gap:8px"><button class="success" id="save-profile">Sauvegarder</button><button class="btn-ghost" id="reset-profile">Réinitialiser</button></div>
    </div>`;
  focusMainHeading();
}

/* view for one exercise including timer UI */
function openExercise(id, sequenceMode=false){
  const e = state.exercises.find(x=>x.id===id);
  if(!e) return showToast('Exercice introuvable');
  const durDisplay = formatTime(e.dur);
  const restDisplay = formatTime(e.rest || 30);
  viewArea.innerHTML = `<h3 style="margin-top:0">${e.name}</h3>
    <div class="small">${e.desc} · ${Math.round(e.dur/60)} min</div>
    <div style="margin-top:8px" class="small"><strong>Brève consigne</strong> : ${escapeHtml(e.instructions || '')}</div>

    <div style="display:grid;grid-template-columns:1fr 340px;gap:12px;margin-top:12px">
      <div>
        <div class="card small">
          <strong>Consignes détaillées</strong>
          <ol style="margin-top:6px">
            <li>Placez-vous stable, regard en avant.</li>
            <li>Effectuez le mouvement lentement et contrôlez l’amplitude.</li>
            <li>Stoppez en cas de douleur intense.</li>
          </ol>
          <div style="margin-top:8px" class="small"><strong>Variantes</strong> : réduction amplitude, chaise pour l’équilibre.</div>
          <div style="margin-top:12px">
            <strong>Minuterie</strong>
            <div id="timer-ui" style="margin-top:8px">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="font-size:20px;font-weight:700" id="timer-remaining">${durDisplay}</div>
                <div class="small" id="timer-mode">Exercice</div>
              </div>
              <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
                <button class="success" id="timer-start">Démarrer</button>
                <button class="btn-ghost" id="timer-pause">Pause</button>
                <button class="btn-ghost" id="timer-stop">Stop</button>
                <button class="btn-ghost" id="timer-add20">+20s repos</button>
                <label style="display:flex;align-items:center;gap:6px;margin-left:8px"><input type="checkbox" id="timer-auto"> Auto</label>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top:12px" id="sequence-controls" class="card small" aria-hidden="true">
          <strong>Séquence</strong>
          <div class="small" id="sequence-info">Séance en cours</div>
        </div>
      </div>

      <div>
        <div class="card small">
          <strong>Vidéo démonstration</strong>
          <div style="margin-top:8px" id="anim-${e.id}" class="svg-demo" aria-hidden="false"></div>
          <div class="small" style="margin-top:8px">Vidéo : ${creditFor(e.anim)}</div>
        </div>
      </div>
    </div>
  `;

  renderAnimation(e.anim, document.getElementById('anim-'+e.id));

  /* timer initialization for single exercise */
  initTimer({sequence:[e.id], startIndex:0, auto: sequenceMode});
  focusMainHeading();
}

/* Sequence runner: given array of exercise ids, run through them with timer and rest */
function startSequence(exIds, auto=false){
  if(!Array.isArray(exIds) || exIds.length===0) return showToast('Séquence vide');
  timer.currentSequence = exIds.slice();
  timer.currentIndex = 0;
  timer.autoAdvance = !!auto;
  startSequenceAtIndex(0);
}
function startSequenceAtIndex(idx){
  const id = timer.currentSequence[idx];
  const ex = state.exercises.find(e=>e.id===id);
  if(!ex) return showToast('Exercice introuvable dans séquence');
  // render the exercise view with timer controls visible
  openExercise(ex.id, true);
  // show sequence info
  const seqInfo = document.getElementById('sequence-info');
  if(seqInfo) seqInfo.textContent = `Exercice ${idx+1}/${timer.currentSequence.length} — ${ex.name}`;
  // start the timer automatically if autoAdvance true, else wait user to press start
  if(timer.autoAdvance){
    // small delay to let UI render
    setTimeout(()=> startTimerForCurrent(), 300);
  }
}

/* Timer core functions */
function initTimer({sequence=[], startIndex=0, auto=false}){
  clearTimer();
  timer.currentSequence = sequence.slice();
  timer.currentIndex = startIndex;
  timer.autoAdvance = !!auto;
  if(sequence.length>0){
    const currentId = sequence[startIndex];
    const ex = state.exercises.find(e=>e.id===currentId);
    if(!ex) return;
    timer.mode = 'exercise';
    timer.remaining = ex.dur;
    updateTimerUI();
  }
  bindTimerControls();
}

function bindTimerControls(){
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  const stopBtn = document.getElementById('timer-stop');
  const add20Btn = document.getElementById('timer-add20');
  const autoCheckbox = document.getElementById('timer-auto');

  if(startBtn) startBtn.onclick = ()=> startTimerForCurrent();
  if(pauseBtn) pauseBtn.onclick = ()=> pauseTimer();
  if(stopBtn) stopBtn.onclick = ()=> stopTimer();
  if(add20Btn) add20Btn.onclick = ()=> add20sToRest();
  if(autoCheckbox) autoCheckbox.onchange = (e)=> timer.autoAdvance = e.target.checked;
}

function startTimerForCurrent(){
  if(timer.running) return;
  const currentId = timer.currentSequence[timer.currentIndex];
  const ex = state.exercises.find(e=>e.id===currentId);
  if(!ex) return;
  if(timer.mode === 'exercise'){
    if(timer.remaining <= 0) timer.remaining = ex.dur;
  } else {
    if(timer.remaining <= 0) timer.remaining = ex.rest || 30;
  }
  timer.running = true;
  updateTimerUI();
  timer.intervalId = setInterval(()=>{
    timerTick();
  }, 1000);
  showToast(timer.mode === 'exercise' ? 'Exercice démarré' : 'Pause démarrée');
}

function timerTick(){
  if(!timer.running) return;
  timer.remaining = Math.max(0, timer.remaining - 1);
  updateTimerUI();
  if(timer.remaining === 0){
    // switch mode or advance sequence
    if(timer.mode === 'exercise'){
      // exercise finished -> start rest
      timer.mode = 'rest';
      const currentId = timer.currentSequence[timer.currentIndex];
      const ex = state.exercises.find(e=>e.id===currentId);
      timer.remaining = (ex && ex.rest) ? ex.rest : 30;
      showToast('Exercice terminé — repos');
      updateTimerUI();
      // continue running (rest will tick)
    } else {
      // rest finished -> advance to next exercise or finish
      showToast('Pause terminée');
      if(timer.currentIndex < timer.currentSequence.length - 1){
        // advance to next exercise
        timer.currentIndex += 1;
        const nextId = timer.currentSequence[timer.currentIndex];
        const nextEx = state.exercises.find(e=>e.id===nextId);
        timer.mode = 'exercise';
        timer.remaining = nextEx ? nextEx.dur : 0;
        updateTimerUI();
        showToast('Prochain exercice : ' + (nextEx ? nextEx.name : '—'));
        if(!timer.autoAdvance){
          // stop running to let user start manually
          pauseTimer();
        }
      } else {
        // sequence finished
        clearTimer();
        showToast('Séance terminée');
      }
    }
  }
}

function pauseTimer(){
  if(!timer.running) return;
  timer.running = false;
  if(timer.intervalId) { clearInterval(timer.intervalId); timer.intervalId = null; }
  updateTimerUI();
  showToast('Minuterie en pause');
}

function stopTimer(){
  clearTimer();
  updateTimerUI();
  showToast('Minuterie arrêtée');
}

function clearTimer(){
  timer.running = false;
  timer.mode = 'exercise';
  timer.remaining = 0;
  if(timer.intervalId) { clearInterval(timer.intervalId); timer.intervalId = null; }
}

/* Add 20s to rest during rest period */
function add20sToRest(){
  if(timer.mode !== 'rest'){
    showToast('+20s disponible uniquement pendant la pause');
    return;
  }
  timer.remaining += 20;
  updateTimerUI();
  showToast('+20s ajoutées à la pause');
}

/* UI update helpers */
function updateTimerUI(){
  const remEl = document.getElementById('timer-remaining');
  const modeEl = document.getElementById('timer-mode');
  if(remEl){
    remEl.textContent = formatTime(timer.remaining);
  }
  if(modeEl){
    modeEl.textContent = timer.mode === 'exercise' ? 'Exercice' : 'Pause';
  }
  // show/hide sequence controls
  const seqContainer = document.getElementById('sequence-controls');
  if(seqContainer){
    seqContainer.style.display = timer.currentSequence && timer.currentSequence.length > 1 ? 'block' : 'none';
    const seqInfo = document.getElementById('sequence-info');
    if(seqInfo){
      seqInfo.textContent = timer.currentSequence && timer.currentSequence.length > 0 ? `Ex ${timer.currentIndex+1}/${timer.currentSequence.length}` : '';
    }
  }
}

/* Format seconds to mm:ss */
function formatTime(sec){
  if(sec === undefined || sec === null) return '00:00';
  const s = Math.max(0, Math.floor(sec));
  const mm = Math.floor(s/60);
  const ss = s % 60;
  return String(mm).padStart(2,'0') + ':' + String(ss).padStart(2,'0');
}

/* Sequence utility: build sequence from program id */
function getSequenceForProgram(programId){
  const pr = state.programs.find(p=>p.id===programId);
  if(!pr) return [];
  return pr.ex.slice();
}

/* Actions */
function addToToday(exId){ const ex = state.exercises.find(e=>e.id===exId); if(!ex) return showToast('Exercice introuvable'); state.sessions.push({date:new Date().toISOString(),duration:ex.dur,exCount:1,notes:ex.name}); saveState(); showToast('Séance ajoutée : '+ex.name); }

function startDemo(){ const sample = [1,2,4,5]; startSequence(sample, false); showToast('Session démo prête'); }

function startProgram(id){ const seq = getSequenceForProgram(id); if(seq.length===0) return showToast('Programme introuvable'); startSequence(seq, true); showToast('Programme lancé — mode auto activé'); }

/* Export / Import */
function exportCSV(){ let csv = 'type;date;kg;duration;exCount;notes\n'; state.weights.forEach(w=> csv += `weight;${w.date};${w.kg};;;;\n`); state.sessions.forEach(s=> csv += `session;${s.date};;${s.duration};${s.exCount};${s.notes}\n`); const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'fitcoach60_export.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); showToast('Export CSV généré'); }
function importDemo(){ if(!confirm('Importer données de démonstration ?')) return; state.weights = [{date:new Date(Date.now()-12*24*3600e3).toISOString(),kg:75.2}]; state.sessions = [{date:new Date().toISOString(),duration:20,exCount:3,notes:'Séance démo'}]; state.profile = {...state.profile,name:'Serge',birth:1958,goal:70,issues:['poignets']}; saveState(); showToast('Données démo importées'); }

/* Event delegation */
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.id==='nav-landing'){ activateNav('nav-landing'); renderLanding(); }
  if(t.id==='nav-ex'){ activateNav('nav-ex'); showExercises(); }
  if(t.id==='nav-prog'){ activateNav('nav-prog'); showPrograms(); }
  if(t.id==='nav-dashboard'){ activateNav('nav-dashboard'); showDashboard(); }
  if(t.id==='nav-profile'){ activateNav('nav-profile'); showProfile(); }

  if(t.dataset && t.dataset.ex) openExercise(Number(t.dataset.ex));
  if(t.dataset && t.dataset.add) addToToday(Number(t.dataset.add));
  if(t.dataset && t.dataset.view) { const pid = t.dataset.view; viewProgram(pid); }
  if(t.dataset && t.dataset.start) { const pid = t.dataset.start; startProgram(pid); }

  if(t.id==='btn-export') exportCSV();
  if(t.id==='btn-demo') importDemo();
});

/* Programs view helper */
function viewProgram(id){
  const pr = state.programs.find(p=>p.id===id);
  if(!pr) return showToast('Programme introuvable');
  viewArea.innerHTML = `<h3 style="margin-top:0">${pr.name}</h3>
    <div class="small">${pr.desc}</div>
    <div style="margin-top:10px" class="list">
      ${pr.ex.map(i=>{ const e = state.exercises.find(x=>x.id===i); return `<div class="card ex-row"><div class="ex-ico">${iconFor(e.cat)}</div><div><strong>${e.name}</strong><div class="small">${e.desc} · ${formatTime(e.dur)}</div><div style="margin-top:8px"><button class="btn-ghost" data-ex="${e.id}">Voir</button></div></div></div>` }).join('')}
    </div>
    <div style="margin-top:10px"><button class="cta" onclick="startProgram('${pr.id}')">Lancer ce programme (Auto)</button></div>`;
  focusMainHeading();
}

/* Video render: supports video: prefix (YouTube watch/youtu.be -> embed) */
function renderAnimation(key, container){
  if(!container) return;
  if(typeof key === 'string' && key.startsWith('video:')){
    const src = key.slice(6).trim();
    let embed = src;
    try{
      if(src.includes('youtube.com/watch')){
        const id = new URL(src).searchParams.get('v');
        if(id) embed = `https://www.youtube.com/embed/${id}?rel=0`;
      } else if(src.includes('youtu.be/')){
        const id = src.split('youtu.be/').pop().split(/[?#]/)[0];
        embed = `https://www.youtube.com/embed/${id}?rel=0`;
      }
    }catch(e){ console.warn('video parse error', e); }
    container.innerHTML = `<div style="width:100%;height:180px;display:flex;align-items:center;justify-content:center"><iframe src="${embed}" title="Démonstration" style="width:100%;height:180px;border:0;border-radius:8px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    return;
  }
  container.innerHTML = `<div style="width:100%;height:180px;display:flex;align-items:center;justify-content:center;color:#617075">Pas de vidéo</div>`;
}

/* small helpers */
function iconFor(cat){ if(cat==='Cardio') return '🏃'; if(cat==='Renforcement') return '🦵'; if(cat==='Mobilité') return '🔄'; if(cat==='Équilibre') return '⚖️'; if(cat==='Récupération') return '🧘'; return '💪'; }
function creditFor(anim){ if(!anim) return ''; if(anim.startsWith('video:')){ const url = anim.slice(6).trim(); if(url.includes('youtube.com')||url.includes('youtu.be')) return 'YouTube'; return 'Vidéo'; } return 'Animation'; }

/* UI helpers */
function focusMainHeading(){ const h = viewArea.querySelector('h3, h2, h1'); if(h){ h.setAttribute('tabindex','-1'); h.focus(); } }
function updateUI(){ /* placeholder: extend if needed */ }

/* Init */
loadState();
renderLanding();
updateUI();

/* Expose */
window.startQuick = startSequence;
window.addToToday = addToToday;
window.openExercise = openExercise;


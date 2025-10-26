/* Data */
const defaultExercises = [
  {id:1,name:"Marche sur place",cat:"Cardio",dur:10,desc:"Cardio doux — 10 minutes",anim:"walk"},
  {id:2,name:"Fente assistée arrière",cat:"Renforcement",dur:6,desc:"Renforcement hanches — 2 x 8 répétitions / jambe",anim:"lunge"},
  {id:3,name:"Élévation latérale de jambe",cat:"Renforcement",dur:6,desc:"Abducteurs — 3 x 10 répét.",anim:"sideleg"},
  {id:4,name:"Rotation du tronc assis",cat:"Mobilité",dur:5,desc:"Mobilité lombaire — 2 x 10 rotations de chaque côté",anim:"twist"},
  {id:5,name:"Squat partiel assis-debout",cat:"Renforcement",dur:8,desc:"Force cuisses — 3 x 8–12 répét.",anim:"squat"},
  {id:6,name:"Talons-fesses assis",cat:"Cardio",dur:7,desc:"Dynamique doux — 2 x 30 s",anim:"heel"},
  {id:7,name:"Montée de mollets",cat:"Renforcement",dur:5,desc:"Stabilité cheville — 3 x 12 répét.",anim:"calf"},
  {id:8,name:"Marche talons-pointes",cat:"Équilibre",dur:6,desc:"Proprioception — 2 x 30 pas",anim:"heeltoe"},
  {id:9,name:"Pont fessier partiel",cat:"Renforcement",dur:6,desc:"Fessiers bas — 3 x 10 répét.",anim:"bridge"},
  {id:10,name:"Flexion de genou assis",cat:"Mobilité",dur:5,desc:"Amplitude genou — 3 x 8 répét.",anim:"knee"},
  {id:11,name:"Rotation du cou lente",cat:"Mobilité",dur:3,desc:"Cervicales — 6 rotations lentes",anim:"neck"},
  {id:12,name:"Respiration diaphragmatique",cat:"Récupération",dur:4,desc:"Relaxation — 4 min",anim:"breath"},
  {id:13,name:"Demi-fente avant",cat:"Renforcement",dur:6,desc:"Ischio/quads — 2 x 8 par jambe",anim:"half_lunge"},
  {id:14,name:"Step léger",cat:"Cardio",dur:8,desc:"Cardio faible impact — 8 min",anim:"step"},
  {id:15,name:"Adduction assis",cat:"Renforcement",dur:6,desc:"Adducteurs — 3 x 10 répét.",anim:"adduct"},
  {id:16,name:"Rotation épaule douce",cat:"Mobilité",dur:4,desc:"Épaules — 2 x 10 rotations",anim:"shoulder"},
  {id:17,name:"Marche sur talons",cat:"Équilibre",dur:5,desc:"Stabilité arrière — 2 x 30 pas",anim:"walkheels"},
  {id:18,name:"Poussée talons allongé",cat:"Renforcement",dur:6,desc:"Fessiers léger — 3 x 10 répét.",anim:"push_heel"},
  {id:19,name:"Pont latéral genoux pliés",cat:"Renforcement",dur:6,desc:"Stabilité latérale — 3 x 8 répét.",anim:"sidebridge"},
  {id:20,name:"Étirement lombes assis",cat:"Récupération",dur:5,desc:"Détente bas du dos — 3 x 20 s",anim:"stretch_back"}
];

const defaultPrograms = [
  {id:'deb',name:'Programme débutant',desc:'3 séances / semaine — mobilité et renforcement léger',ex:[1,4,5,12]},
  {id:'rando',name:'Marche nordique',desc:'Préparation spécifique pour marche nordique',ex:[1,3,7,9]},
  {id:'mobil',name:'Mobilité quotidienne',desc:'Courtes sessions pour gagner en souplesse',ex:[4,10,11,16]},
  {id:'perte',name:'Perte de poids',desc:'Cardio doux + renforcement',ex:[1,14,6,5]},
  {id:'equilibre',name:'Équilibre',desc:'Proprioception et prévention des chutes',ex:[8,17,3,19]},
  {id:'avance',name:'Avancé modéré',desc:'Séances progressives plus longues',ex:[1,14,13,9]}
];

const STORAGE_KEY = 'fitcoach60_v2';
let state = {
  profile:{name:'',birth:1958,weight:null,goal:null,issues:[]},
  weights:[], sessions:[], exercises: defaultExercises, programs: defaultPrograms
};

/* Storage */
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); updateUI(); showToast('Données locales sauvegardées'); }
function loadState(){ const s = localStorage.getItem(STORAGE_KEY); if(s) state = JSON.parse(s); updateUI(); }
function resetState(){ if(confirm('Réinitialiser les données locales ?')){ localStorage.removeItem(STORAGE_KEY); state = {profile:{name:'',birth:1958,weight:null,goal:null,issues:[]},weights:[],sessions:[],exercises:defaultExercises,programs:defaultPrograms}; saveState(); showToast('Réinitialisé.'); }}

/* Accessible toast and focus helpers */
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t){ alert(msg); return; }
  t.textContent = msg;
  t.classList.remove('visually-hidden');
  t.setAttribute('role','status');
  t.focus();
  clearTimeout(t._hide);
  t._hide = setTimeout(()=>{ t.classList.add('visually-hidden'); },3500);
}

const viewArea = document.getElementById('view-area');

function focusMainHeading(){
  if(!viewArea) return;
  const h = viewArea.querySelector('h3, h2, h1');
  if(h){ h.setAttribute('tabindex','-1'); h.focus(); }
}

/* Rendering */
function renderLanding(){ viewArea.innerHTML = `
  <h2 style="margin-top:0">Bienvenue sur FitCoach 60+</h2>
  <p class="small">Programmes adaptés aux contraintes articulaires. Exercices sans appui sur les mains, expliqués en texte clair et par une animation.</p>
  <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
    <button class="cta" onclick="showProfile()">Créer mon profil</button>
    <button class="btn-ghost" onclick="showPrograms()">Voir les programmes</button>
    <button class="btn-ghost" onclick="showExercises()">Bibliothèque d'exercices</button>
  </div>

  <div style="margin-top:14px" class="features">
    <div class="feature"><div class="pict">🏃‍♂️</div><div><strong>Cardio doux</strong><div class="small">perte de poids</div></div></div>
    <div class="feature"><div class="pict">🦵</div><div><strong>Renforcement</strong><div class="small">dos et hanches protégés</div></div></div>
    <div class="feature"><div class="pict">⚖️</div><div><strong>Équilibre</strong><div class="small">prévention des chutes</div></div></div>
  </div>

  <div style="margin-top:12px">
    <h3 style="margin:0 0 8px">Session démo 20 min</h3>
    <div class="card small">
      <strong>Contenu</strong>
      <div class="small" style="margin-top:6px">Marche sur place, fente assistée, rotation tronc, squat partiel.</div>
      <div style="margin-top:8px"><button class="cta" onclick="startDemo()">Lancer la démo</button></div>
    </div>
  </div>
`; focusMainHeading(); }

function showExercises(){
  const ex = state.exercises;
  viewArea.innerHTML = `<h3 style="margin-top:0">Bibliothèque d'exercices</h3>
    <div class="list">
      ${ex.map(e=>`
        <div class="card ex-row" role="region" aria-label="${e.name}">
          <div class="ex-ico">${iconFor(e.cat)}</div>
          <div style="flex:1">
            <strong id="ex-${e.id}-title">${e.name}</strong>
            <div class="small">${e.desc} · ${e.dur} min</div>
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
    <div style="display:grid;grid-template-columns:1fr 320px;gap:12px">
      <div class="card">
        <h4 style="margin:0 0 8px">Poids</h4>
        <div class="small">Enregistrer une pesée</div>
        <div style="margin-top:8px" id="weight-form">
          <label>Poids actuel (kg)</label>
          <div class="row"><input type="number" id="input-weight" min="30" max="250" step="0.1"><button class="success" id="save-weight">Ajouter</button></div>
        </div>
        <div style="margin-top:12px">
          <canvas id="chart-weight" width="600" height="160"></canvas>
        </div>
      </div>

      <div>
        <div class="card">
          <h4 style="margin:0 0 8px">Historique des séances</h4>
          <div id="session-list" class="list small"></div>
          <div style="margin-top:8px"><button class="btn-ghost" id="clear-sessions">Effacer séances</button></div>
        </div>

        <div style="height:12px"></div>

        <div class="card small">
          <strong>Objectif poids</strong>
          <div style="margin-top:8px" class="small">Définir un objectif pour le suivi</div>
          <div style="margin-top:8px" class="row"><input id="input-goal" type="number" placeholder="kg"><button class="btn-ghost" id="save-goal">Sauvegarder</button></div>
        </div>
      </div>
    </div>`;
  renderWeightChart(); renderSessionList(); focusMainHeading();
}

function showProfile(){
  viewArea.innerHTML = `<h3 style="margin-top:0">Profil</h3>
    <div style="display:grid;gap:10px">
      <div class="card small">
        <label>Nom</label><input id="p-name" value="${escapeHtml(state.profile.name)}">
        <div style="margin-top:8px" class="row"><div><label>Année de naissance</label><input id="p-birth" type="number" min="1900" max="2025" value="${state.profile.birth}"></div><div><label>Objectif poids (kg)</label><input id="p-goal" type="number" value="${state.profile.goal||''}"></div></div>
        <div style="margin-top:8px"><label>Douleurs articulaires</label><input id="p-issues" placeholder="ex: poignets, hanches" value="${state.profile.issues.join(', ')}"></div>
        <div style="margin-top:10px;display:flex;gap:8px"><button class="success" id="save-profile">Sauver profil</button><button class="btn-ghost" id="reset-profile">Réinitialiser</button></div>
      </div>
      <div class="card small">
        <strong>Actions</strong>
        <div style="margin-top:8px" class="small">Gérer données locales</div>
        <div style="margin-top:8px;display:flex;gap:8px"><button class="btn-ghost" id="reset-state">Réinitialiser tout</button><button class="btn-ghost" id="export-csv">Exporter CSV</button></div>
      </div>
    </div>`;
  focusMainHeading();
}

/* Program and exercise views */
function viewProgram(id){
  const pr = state.programs.find(p=>p.id===id);
  if(!pr) return showToast('Programme introuvable');
  const exs = pr.ex.map(i=>state.exercises.find(e=>e.id===i)).filter(Boolean);
  viewArea.innerHTML = `<h3 style="margin-top:0">${pr.name}</h3>
    <div class="small">${pr.desc}</div>
    <div style="margin-top:10px" class="list">
      ${exs.map(e=>`<div class="card ex-row"><div class="ex-ico">${iconFor(e.cat)}</div><div><strong>${e.name}</strong><div class="small">${e.desc} · ${e.dur} min</div><div style="margin-top:8px"><button class="btn-ghost" data-exopen="${e.id}">Voir</button></div></div></div>`).join('')}
    </div>
    <div style="margin-top:10px"><button class="cta" data-startprog="${pr.id}">Lancer ce programme</button></div>`;
  focusMainHeading();
}

function openExercise(id){
  const e = state.exercises.find(x=>x.id===id);
  if(!e) return showToast('Exercice introuvable');
  viewArea.innerHTML = `<h3 style="margin-top:0">${e.name}</h3>
    <div class="small">${e.desc} · ${e.dur} min</div>
    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
      <div style="width:260px" class="card small">
        <div style="font-size:40px;text-align:center">${iconFor(e.cat)}</div>
        <div class="pill" style="display:block;margin-top:6px;text-align:center">${e.cat}</div>
        <div style="margin-top:8px" class="small"><strong>Objectif</strong> : ${e.cat === 'Cardio' ? 'Améliorer l’endurance' : e.cat === 'Mobilité' ? 'Augmenter la souplesse' : 'Renforcer muscles ciblés'}</div>
      </div>

      <div class="card small" style="flex:1;min-width:260px">
        <strong>Consignes (étapes simples)</strong>
        <ol style="margin-top:6px">
          <li>Placez-vous stable, regard en avant.</li>
          <li>Effectuez le mouvement lentement et en amplitude contrôlée.</li>
          <li>Respirez normalement ; stoppez en cas de douleur intense.</li>
        </ol>
        <div style="margin-top:8px" class="small"><strong>Variantes</strong> : réduire l’amplitude, diminuer les répétitions ou utiliser la chaise pour l’équilibre sans appui sur les mains.</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="cta" data-addtoday="${e.id}">Ajouter séance</button>
          <button class="btn-ghost" data-print="${e.id}">Imprimer fiche</button>
        </div>
      </div>

      <div style="width:260px" class="card small">
        <strong>Animation</strong>
        <div style="margin-top:8px" id="anim-${e.id}" class="svg-demo" aria-hidden="true"></div>
      </div>
    </div>
  `;
  renderAnimation(e.anim, document.getElementById('anim-'+e.id));
  focusMainHeading();
}

/* Actions */
function addToToday(exId){ const ex = state.exercises.find(e=>e.id===exId); if(!ex) return showToast('Exercice introuvable'); const s = {date:new Date().toISOString(),programId:'manual',duration:ex.dur,exCount:1,notes:ex.name}; state.sessions.push(s); saveState(); showToast('Séance ajoutée : ' + ex.name); }

function startQuick(key){
  const kits = {'matin':[11,4,8],'rando':[1,3,7,12],'soir':[12,4,20]};
  const arr = kits[key] || [1,4];
  const total = arr.map(i=>state.exercises.find(e=>e.id===i)?.dur||5).reduce((a,b)=>a+b,0);
  state.sessions.push({date:new Date().toISOString(),programId:'kit-'+key,duration:total,exCount:arr.length,notes:'Kit '+key}); saveState(); showToast('Kit lancé — durée approximative ' + total + ' min');
}

function startDemo(){ const exs = [1,2,4,5]; const total = exs.map(i=>state.exercises.find(e=>e.id===i).dur).reduce((a,b)=>a+b,0); state.sessions.push({date:new Date().toISOString(),programId:'demo',duration:total,exCount:exs.length,notes:'Session démo'}); saveState(); showToast('Session démo ajoutée — ' + total + ' min'); }

function startProgram(id){ const pr = state.programs.find(p=>p.id===id); if(!pr) return showToast('Programme introuvable'); const total = pr.ex.map(i=>state.exercises.find(e=>e.id===i).dur||5).reduce((a,b)=>a+b,0); state.sessions.push({date:new Date().toISOString(),programId:id,duration:total,exCount:pr.ex.length,notes:pr.name}); saveState(); showToast('Programme lancé : ' + pr.name + ' — durée ' + total + ' min'); }

/* Weight handling and charts */
function saveWeight(){ const v = parseFloat(document.getElementById('input-weight').value); if(!v || v<20 || v>250) return showToast('Poids invalide'); state.weights.push({date:new Date().toISOString(),kg:Math.round(v*10)/10}); state.profile.weight = v; saveState(); showToast('Pesée ajoutée : ' + v + ' kg'); showDashboard(); }
function saveGoal(){ const v = parseFloat(document.getElementById('input-goal').value); if(!v || v<30 || v>200) return showToast('Objectif invalide'); state.profile.goal = v; saveState(); showToast('Objectif enregistré : ' + v + ' kg'); showDashboard(); }
function renderWeightChart(){ const canvas = document.getElementById('chart-weight'); if(!canvas) return; const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); const data = state.weights.slice(-20); if(data.length < 2){ ctx.fillStyle = '#f1fffc'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = '#617075'; ctx.font='14px sans-serif'; ctx.fillText('Ajoute des pesées pour afficher le graphique',20,40); return; } const pad = 30; const w = canvas.width - pad*2; const h = canvas.height - pad*2; const vals = data.map(d=>d.kg); const min = Math.min(...vals)-1; const max = Math.max(...vals)+1; ctx.strokeStyle = '#2b8a7a'; ctx.lineWidth = 2; ctx.beginPath(); data.forEach((d,i)=>{ const x = pad + (i/(data.length-1))*w; const y = pad + (1 - (d.kg-min)/(max-min))*h; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); ctx.fillStyle='#2b8a7a'; ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill(); }); ctx.stroke(); ctx.fillStyle='#617075'; ctx.font='12px sans-serif'; ctx.fillText(min.toFixed(1)+' kg',10,canvas.height-8); ctx.fillText(max.toFixed(1)+' kg',10,18); }

/* Sessions list */
function renderSessionList(){ const el = document.getElementById('session-list'); if(!el) return; if(state.sessions.length === 0){ el.innerHTML = '<div class="small">Aucune séance enregistrée</div>'; return; } el.innerHTML = state.sessions.slice().reverse().map(s=>`<div class="card small" style="display:flex;justify-content:space-between;align-items:center"><div><strong>${escapeHtml(s.notes)}</strong><div class="small">${(new Date(s.date)).toLocaleString()} · ${s.duration} min</div></div><div style="display:flex;gap:8px"><button class="btn-ghost" data-remove="${s.date}">Suppr</button></div></div>`).join(''); }
function removeSession(dateIso){ state.sessions = state.sessions.filter(s=>s.date!==dateIso); saveState(); }

/* Profile */
function saveProfile(){ const name = document.getElementById('p-name').value.trim(); const birth = parseInt(document.getElementById('p-birth').value,10) || 1958; const goal = parseFloat(document.getElementById('p-goal').value) || null; const issues = document.getElementById('p-issues').value.split(',').map(s=>s.trim()).filter(Boolean); state.profile = {name,birth,weight:state.profile.weight||null,goal,issues}; saveState(); showToast('Profil sauvegardé'); }
function resetProfile(){ state.profile = {name:'',birth:1958,weight:null,goal:null,issues:[]}; saveState(); showProfile(); }

/* Export / Demo */
function exportCSV(){ let csv = 'type;date;kg;duration;exCount;notes\n'; state.weights.forEach(w=> csv += `weight;${w.date};${w.kg};;;;\n`); state.sessions.forEach(s=> csv += `session;${s.date};;${s.duration};${s.exCount};${s.notes}\n`); const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'fitcoach60_export.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); showToast('Export CSV généré'); }
function importDemo(){ if(!confirm('Importer données de démonstration ?')) return; state.weights = [{date:new Date(Date.now()-12*24*3600e3).toISOString(),kg:75.2},{date:new Date(Date.now()-9*24*3600e3).toISOString(),kg:74.8},{date:new Date(Date.now()-6*24*3600e3).toISOString(),kg:74.2},{date:new Date(Date.now()-3*24*3600e3).toISOString(),kg:73.6}]; state.sessions = [{date:new Date(Date.now()-10*24*3600e3).toISOString(),programId:'deb',duration:22,exCount:4,notes:'Séance démo'},{date:new Date(Date.now()-7*24*3600e3).toISOString(),programId:'rando',duration:28,exCount:4,notes:'Prépa rando'},{date:new Date(Date.now()-2*24*3600e3).toISOString(),programId:'perte',duration:30,exCount:4,notes:'Cardio léger'}]; state.profile = {...state.profile,name:'Serge',birth:1958,goal:70,issues:['poignets','dos']}; saveState(); showToast('Données de démonstration importées'); }

/* UI helpers */
function updateUI(){ const statW = document.getElementById('stat-weight'); if(statW) statW.textContent = state.profile.weight ? state.profile.weight+' kg' : '-- kg'; const statS = document.getElementById('stat-sess'); if(statS) statS.textContent = (countSessionsWeek())+' / sem'; const statB = document.getElementById('stat-balance'); if(statB) statB.textContent = computeBalanceScore(); const statG = document.getElementById('stat-goal'); if(statG) statG.textContent = state.profile.goal ? state.profile.goal+' kg' : '-- kg'; const c = document.getElementById('chart-weight'); if(c) renderWeightChart(); const sl = document.getElementById('session-list'); if(sl) renderSessionList(); }
function countSessionsWeek(){ const week = Date.now() - 7*24*3600e3; return state.sessions.filter(s=> new Date(s.date).getTime() >= week ).length; }
function computeBalanceScore(){ const recent = state.sessions.slice(-30); return Math.min(10, Math.round(countSessionsWeek()*1.2 + recent.length*0.1)) + ' pts'; }
function clearSessions(){ if(confirm('Supprimer toutes les séances ?')){ state.sessions = []; saveState(); showToast('Séances supprimées'); } }

/* Print */
function printExercise(id){ const e = state.exercises.find(x=>x.id===id); if(!e) return showToast('Exercice introuvable'); const w = window.open('','_blank'); const html = `
<html><head><meta charset="utf-8"><title>${e.name}</title>
<style>body{font-family:sans-serif;padding:18px;color:#07211f} .card{border-radius:8px;padding:12px;border:1px solid #e6f6f3;margin-top:8px}</style>
</head><body>
<h2>${e.name}</h2><div class="small">${e.desc} · ${e.dur} min</div>
<div class="card"><strong>Objectif</strong><div class="small" style="margin-top:6px">${e.cat}</div>
<strong style="display:block;margin-top:8px">Consignes</strong>
<ol style="margin-top:6px"><li>Tenez-vous stable, regard en avant.</li><li>Réalisez le mouvement lentement et contrôlez l’amplitude.</li><li>Arrêtez en cas de douleur aiguë.</li></ol>
<div style="margin-top:8px" class="small"><strong>Variantes</strong>: réduire amplitude, diminuer répétitions, utiliser la chaise pour l’équilibre.</div>
<div style="margin-top:10px" class="small">FitCoach 60+ — fiche imprimable</div></div>
</body></html>`; w.document.write(html); w.document.close(); w.focus(); }

/* Navigation and delegated events */
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.id==='nav-landing'){ activateNav('nav-landing'); renderLanding(); }
  if(t.id==='nav-ex'){ activateNav('nav-ex'); showExercises(); }
  if(t.id==='nav-prog'){ activateNav('nav-prog'); showPrograms(); }
  if(t.id==='nav-dashboard'){ activateNav('nav-dashboard'); showDashboard(); }
  if(t.id==='nav-profile'){ activateNav('nav-profile'); showProfile(); }
  if(t.id==='open-quick'){ startQuick('matin'); }

  if(t.dataset && t.dataset.kit) startQuick(t.dataset.kit);
  if(t.dataset && t.dataset.ex) openExercise(Number(t.dataset.ex));
  if(t.dataset && t.dataset.add) addToToday(Number(t.dataset.add));
  if(t.dataset && t.dataset.view) viewProgram(t.dataset.view);
  if(t.dataset && t.dataset.start) startProgram(t.dataset.start);
  if(t.dataset && t.dataset.startprog) startProgram(t.dataset.startprog);
  if(t.dataset && t.dataset.exopen) openExercise(Number(t.dataset.exopen));
  if(t.dataset && t.dataset.addtoday) addToToday(Number(t.dataset.addtoday));
  if(t.dataset && t.dataset.print) printExercise(Number(t.dataset.print));
  if(t.dataset && t.dataset.remove) removeSession(t.dataset.remove);

  if(t.id==='btn-export' || t.id==='export-csv' || t.id==='btn-export') exportCSV();
  if(t.id==='btn-demo' || t.id==='btn-demo') importDemo();
  if(t.id==='save-weight' || t.id==='save-weight') saveWeight();
  if(t.id==='save-goal' || t.id==='save-goal') saveGoal();
  if(t.id==='clear-sessions') clearSessions();
  if(t.id==='save-profile') saveProfile();
  if(t.id==='reset-profile') resetProfile();
  if(t.id==='reset-state') resetState();
});

/* Animation engine and svg generators */
function renderAnimation(key, container){
  if(!container) return;
  const svgMap = { walk: walkSVG(), lunge: lungeSVG(), sideleg: sideLegSVG(), twist: twistSVG(), squat: squatSVG(),
    heel: heelSVG(), calf: calfSVG(), heeltoe: heelToeSVG(), bridge: bridgeSVG(), knee: kneeSVG(), neck: neckSVG(),
    breath: breathSVG(), half_lunge: lungeSVG(), step: stepSVG(), adduct: adductSVG(), shoulder: shoulderSVG(),
    walkheels: walkSVG(), push_heel: bridgeSVG(), sidebridge: sideBridgeSVG(), stretch_back: stretchBackSVG()
  };
  container.innerHTML = svgMap[key] || walkSVG();
}

/* Icons and SVG functions (compact) */
function iconFor(cat){ if(cat==='Cardio') return '🏃'; if(cat==='Renforcement') return '🦵'; if(cat==='Mobilité') return '🔄'; if(cat==='Équilibre') return '⚖️'; if(cat==='Récupération') return '🧘'; return '💪'; }
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

/* Minimal SVG generators (copy the same shapes as the prototype) */
function walkSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(40,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a" /><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a" /><line x1="-6" y1="10" x2="-18" y2="30" stroke="#2b8a7a" stroke-width="6" stroke-linecap="round"><animate attributeName="x2" values="-18;-12;-18" dur="1s" repeatCount="indefinite"/><animate attributeName="y2" values="30;24;30" dur="1s" repeatCount="indefinite"/></line><line x1="6" y1="10" x2="18" y2="30" stroke="#2b8a7a" stroke-width="6" stroke-linecap="round"><animate attributeName="x2" values="18;12;18" dur="1s" repeatCount="indefinite"/><animate attributeName="y2" values="30;24;30" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Marche sur place · rythme modéré</text></svg>`;}
function lungeSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(40,60)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><line x1="-6" y1="10" x2="-6" y2="40" stroke="#2b8a7a" stroke-width="8" stroke-linecap="round"><animate attributeName="y2" values="40;28;40" dur="1s" repeatCount="indefinite"/></line><line x1="6" y1="10" x2="28" y2="30" stroke="#2b8a7a" stroke-width="8" stroke-linecap="round"/></g><text x="130" y="120" fill="#617075" font-size="12">Fente arrière — contrôlez l’amplitude</text></svg>`;}
function sideLegSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><line x1="6" y1="10" x2="34" y2="10" stroke="#2b8a7a" stroke-width="8" stroke-linecap="round"><animate attributeName="x2" values="34;20;34" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Élévation latérale — maintien du buste</text></svg>`;}
function twistSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><g transform="translate(0,0)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;8 0 0;0 0 0;-8 0 0;0 0 0" dur="3s" repeatCount="indefinite"/><rect x="12" y="-10" width="6" height="20" fill="#2b8a7a"/></g></g><text x="130" y="120" fill="#617075" font-size="12">Rotation tronc assis — gardez les hanches fixes</text></svg>`;}
function squatSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,60)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><rect x="-20" y="10" width="40" height="10" rx="4" fill="#2b8a7a"><animate attributeName="y" values="10;22;10" dur="1s" repeatCount="indefinite"/></rect></g><text x="130" y="120" fill="#617075" font-size="12">Squat partiel — pousser sur les talons</text></svg>`;}
function heelSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><line x1="0" y1="10" x2="0" y2="2" stroke="#2b8a7a" stroke-width="8"><animate attributeName="y2" values="2; -6;2" dur="0.8s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Talons-fesses — rythme contrôlé</text></svg>`;}
function calfSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><line x1="0" y1="10" x2="0" y2="-4" stroke="#2b8a7a" stroke-width="8"><animate attributeName="y2" values="-4; -16; -4" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Montée de mollets — contrôlez l’équilibre</text></svg>`;}
function heelToeSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(40,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><rect x="-6" y="-20" width="12" height="30" rx="4" fill="#2b8a7a"/><line x1="0" y1="10" x2="10" y2="10" stroke="#2b8a7a" stroke-width="8"><animate attributeName="x2" values="10;18;10" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Talons-pointes — marchez en conscience</text></svg>`;}
function bridgeSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,80)"><rect x="-20" y="0" width="40" height="8" rx="4" fill="#2b8a7a"><animate attributeName="y" values="0;-8;0" dur="1s" repeatCount="indefinite"/></rect><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/></g><text x="130" y="120" fill="#617075" font-size="12">Pont fessier — contraction contrôlée</text></svg>`;}
function kneeSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><line x1="0" y1="-10" x2="0" y2="26" stroke="#2b8a7a" stroke-width="8"><animate attributeName="y2" values="26;18;26" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Flexion genou assis — amplitude douce</text></svg>`;}
function neckSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"><animate attributeName="cx" values="0;6;0;-6;0" dur="3s" repeatCount="indefinite"/></circle></g><text x="130" y="120" fill="#617075" font-size="12">Rotation du cou — mouvements lents</text></svg>`;}
function breathSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(120,70)"><circle cx="0" cy="0" r="20" fill="#2b8a7a"><animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite"/></circle></g><text x="40" y="120" fill="#617075" font-size="12">Respiration diaphragmatique — inspirez/expirez</text></svg>`;}
function stepSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(40,70)"><rect x="-10" y="-10" width="20" height="20" rx="4" fill="#2b8a7a"><animate attributeName="x" values="-10;10;-10" dur="1s" repeatCount="indefinite"/></rect></g><text x="130" y="120" fill="#617075" font-size="12">Step léger — rythme doux</text></svg>`;}
function adductSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><rect x="-16" y="-10" width="12" height="20" rx="4" fill="#2b8a7a"/><rect x="4" y="-10" width="12" height="20" rx="4" fill="#2b8a7a"><animateTransform attributeName="transform" type="translate" values="0 0; -4 0;0 0" dur="1s" repeatCount="indefinite"/></rect></g><text x="130" y="120" fill="#617075" font-size="12">Adduction assis — contraction douce</text></svg>`;}
function shoulderSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,70)"><circle cx="0" cy="-30" r="10" fill="#2b8a7a"/><line x1="-10" y1="-10" x2="10" y2="-10" stroke="#2b8a7a" stroke-width="6"><animate attributeName="x2" values="10;14;10" dur="1s" repeatCount="indefinite"/></line></g><text x="130" y="120" fill="#617075" font-size="12">Rotation épaule douce — amplitude contrôlée</text></svg>`;}
function sideBridgeSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,80)"><rect x="-24" y="0" width="48" height="8" rx="4" fill="#2b8a7a"><animate attributeName="x" values="-24;-18;-24" dur="1s" repeatCount="indefinite"/></rect></g><text x="130" y="120" fill="#617075" font-size="12">Pont latéral — garder l’alignement</text></svg>`;}
function stretchBackSVG(){ return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#fbfffe"/><g transform="translate(60,80)"><rect x="-20" y="0" width="40" height="8" rx="4" fill="#2b8a7a"><animate attributeName="y" values="0;-6;0" dur="2s" repeatCount="indefinite"/></rect></g><text x="130" y="120" fill="#617075" font-size="12">Étirement lombes — tenue 20 s</text></svg>`;}

/* Init */
loadState(); renderLanding(); updateUI();

/* Expose for debugging */
window.startQuick = startQuick; window.addToToday = addToToday; window.openExercise = openExercise;

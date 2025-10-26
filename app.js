/* app.js — version complète avec videos YouTube et instructions */

/* Data: 20 exercices avec video:URL et instructions courtes */
const defaultExercises = [
  {id:1,name:"Marche sur place",cat:"Cardio",dur:10,desc:"Cardio doux — 10 minutes",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Marche sur place, genoux modérés; 1 min échauffement, 8 min rythme modéré, 1 min retour au calme."},
  {id:2,name:"Fente assistée arrière",cat:"Renforcement",dur:6,desc:"Renforcement hanches — 2 x 8 répétitions / jambe",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Petite amplitude, main sur dossier de chaise pour l'équilibre; 2 séries de 8 répétitions par jambe."},
  {id:3,name:"Élévation latérale de jambe",cat:"Renforcement",dur:6,desc:"Abducteurs — 3 x 10 répét.",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Tenez-vous à une chaise, lever la jambe latérale lentement, 3 séries de 10."},
  {id:4,name:"Rotation du tronc assis",cat:"Mobilité",dur:5,desc:"Mobilité lombaire — 2 x 10 rotations",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, mains sur cuisses, tourner le buste lentement, 2x10 de chaque côté."},
  {id:5,name:"Squat partiel assis-debout",cat:"Renforcement",dur:8,desc:"Force cuisses — 3 x 8–12 répét.",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Descendre 30–50% amplitude; pousser sur les talons; utiliser chaise si besoin."},
  {id:6,name:"Talons-fesses assis",cat:"Cardio",dur:7,desc:"Dynamique doux — 2 x 30 s",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Assis ou debout selon l’équilibre; alterner talons-fesses à cadence modérée."},
  {id:7,name:"Montée de mollets",cat:"Renforcement",dur:5,desc:"Stabilité cheville — 3 x 12 répét.",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Monter sur la pointe des pieds lentement; 3x12; garder appui main sur chaise si nécessaire."},
  {id:8,name:"Marche talons-pointes",cat:"Équilibre",dur:6,desc:"Proprioception — 2 x 30 pas",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Concentrez-vous sur la pose talon puis pointe; avancer lentement 2 séries de 30 pas."},
  {id:9,name:"Pont fessier partiel",cat:"Renforcement",dur:6,desc:"Fessiers bas — 3 x 10 répét.",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Allongé(e) sur le dos, contracter fessiers et soulever légèrement; 3x10."},
  {id:10,name:"Flexion de genou assis",cat:"Mobilité",dur:5,desc:"Amplitude genou — 3 x 8 répét.",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Assis sur chaise, rapprocher talon sous la chaise puis tendre; 3x8 par jambe."},
  {id:11,name:"Rotation du cou lente",cat:"Mobilité",dur:3,desc:"Cervicales — 6 rotations lentes",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Mouvements lents, amplitude confortable, ne pas forcer; 6 rotations dans chaque sens."},
  {id:12,name:"Respiration diaphragmatique",cat:"Récupération",dur:4,desc:"Relaxation — 4 min",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, mains sur ventre; inspirer lentement par le nez, expirer par la bouche; 4 minutes."},
  {id:13,name:"Demi-fente avant",cat:"Renforcement",dur:6,desc:"Ischio/quads — 2 x 8 par jambe",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Petit pas en avant, genou contrôlé; 2 séries de 8 par jambe."},
  {id:14,name:"Step léger",cat:"Cardio",dur:8,desc:"Cardio faible impact — 8 min",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Alternance marche/step faible amplitude; maintenir rythme modéré."},
  {id:15,name:"Adduction assis",cat:"Renforcement",dur:6,desc:"Adducteurs — 3 x 10 répét.",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, rapprocher les jambes ou utiliser un coussin; 3x10."},
  {id:16,name:"Rotation épaule douce",cat:"Mobilité",dur:4,desc:"Épaules — 2 x 10 rotations",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Bras détendus, petites rotations contrôlées; 2x10 par sens."},
  {id:17,name:"Marche sur talons",cat:"Équilibre",dur:5,desc:"Stabilité arrière — 2 x 30 pas",anim:"video:https://www.youtube.com/watch?v=68w9hV2NR1E",instructions:"Marcher sur talons, pas lents et contrôlés; 2x30 pas."},
  {id:18,name:"Poussée talons allongé",cat:"Renforcement",dur:6,desc:"Fessiers léger — 3 x 10 répét.",anim:"video:https://www.youtube.com/watch?v=eucJLuduawQ",instructions:"Allongé, pousser sur talons pour lever bassin partiellement; 3x10."},
  {id:19,name:"Pont latéral genoux pliés",cat:"Renforcement",dur:6,desc:"Stabilité latérale — 3 x 8 répét.",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Couche latérale, lever bassin légèrement; 3x8 par côté."},
  {id:20,name:"Étirement lombes assis",cat:"Récupération",dur:5,desc:"Détente bas du dos — 3 x 20 s",anim:"video:https://www.youtube.com/watch?v=MVQTfUsbIlY",instructions:"Assis, basculer buste en avant lentement et maintenir 20 s; répéter x3."}
];

const defaultPrograms = [
  {id:'deb',name:'Programme débutant',desc:'3 séances / semaine — mobilité et renforcement léger',ex:[1,4,5,12]},
  {id:'rando',name:'Marche rando',desc:'Préparation pour randonnée',ex:[1,3,7,9]},
  {id:'mobil',name:'Mobilité quotidienne',desc:'Courtes sessions pour souplesse',ex:[4,10,11,16]},
  {id:'perte',name:'Perte de poids',desc:'Cardio doux + renforcement',ex:[1,14,6,5]},
  {id:'equilibre',name:'Équilibre',desc:'Proprioception et prévention des chutes',ex:[8,17,3,19]}
];

const STORAGE_KEY = 'fitcoach60_videos_v1';
let state = {
  profile:{name:'',birth:1958,weight:null,goal:null,issues:[]},
  weights:[], sessions:[], exercises: defaultExercises, programs: defaultPrograms
};

/* Accessibility / Navigation helpers */
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

function focusMainHeading(){
  const view = document.getElementById('view-area');
  if(!view) return;
  const h = view.querySelector('h3, h2, h1');
  if(h){ h.setAttribute('tabindex','-1'); h.focus(); }
}

/* Storage */
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); updateUI(); showToast('Données locales sauvegardées'); }
function loadState(){ const s = localStorage.getItem(STORAGE_KEY); if(s) state = JSON.parse(s); updateUI(); }
function resetState(){ if(confirm('Réinitialiser les données locales ?')){ localStorage.removeItem(STORAGE_KEY); state = {profile:{name:'',birth:1958,weight:null,goal:null,issues:[]},weights:[],sessions:[],exercises:defaultExercises,programs:defaultPrograms}; saveState(); showToast('Réinitialisé.'); }}

/* Rendering and views */
const viewArea = document.getElementById('view-area');

function renderLanding(){ viewArea.innerHTML = `
  <h2 style="margin-top:0">Bienvenue sur FitCoach 60+</h2>
  <p class="small">Programmes courts et sûrs, adaptés aux 60+. Cliquez sur un exercice pour voir la vidéo et la consigne.</p>
  <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
    <button class="cta" onclick="activateNav('nav-profile'); showProfile()">Créer mon profil</button>
    <button class="btn-ghost" onclick="activateNav('nav-prog'); showPrograms()">Voir les programmes</button>
    <button class="btn-ghost" onclick="activateNav('nav-ex'); showExercises()">Bibliothèque d'exercices</button>
  </div>

  <div style="margin-top:14px" class="features">
    <div class="feature"><div class="pict">🏃‍♂️</div><div><strong>Cardio doux</strong><div class="small">Cœur et endurance</div></div></div>
    <div class="feature"><div class="pict">🦵</div><div><strong>Renforcement</strong><div class="small">Cuisses et hanches</div></div></div>
    <div class="feature"><div class="pict">⚖️</div><div><strong>Équilibre</strong><div class="small">Prévention chutes</div></div></div>
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
    <div style="margin-top:8px" class="small"><strong>Brève consigne</strong> : ${escapeHtml(e.instructions || 'Suivez la vidéo et adaptez l’amplitude à votre confort.')}</div>
    <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
      <div style="width:260px" class="card small">
        <div style="font-size:40px;text-align:center">${iconFor(e.cat)}</div>
        <div class="pill" style="display:block;margin-top:6px;text-align:center">${e.cat}</div>
        <div style="margin-top:8px" class="small"><strong>Objectif</strong> : ${e.cat === 'Cardio' ? 'Améliorer l’endurance' : e.cat === 'Mobilité' ? 'Augmenter la souplesse' : 'Renforcer muscles ciblés'}</div>
      </div>

      <div class="card small" style="flex:1;min-width:260px">
        <strong>Consignes détaillées</strong>
        <ol style="margin-top:6px">
          <li>Placez-vous stable, regard en avant.</li>
          <li>Effectuez le mouvement lentement et en amplitude contrôlée.</li>
          <li>Respirez normalement ; stoppez en cas de douleur intense.</li>
        </ol>
        <div style="margin-top:8px" class="small"><strong>Variantes</strong> : réduire l’amplitude, diminuer les répétitions ou utiliser la chaise pour l’équilibre.</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="cta" data-addtoday="${e.id}">Ajouter séance</button>
          <button class="btn-ghost" data-print="${e.id}">Imprimer fiche</button>
        </div>
      </div>

      <div style="width:320px" class="card small">
        <strong>Vidéo démonstration</strong>
        <div style="margin-top:8px" id="anim-${e.id}" class="svg-demo" aria-hidden="false"></div>
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
  state.sessions.push({date:new Date().toISOString(),programId:'kit-'+key,duration:total,exCount:arr.length,notes:'Kit '+key});
  saveState();
  showToast('Kit lancé — durée approximative ' + total + ' min');
}

function startDemo(){ const exs = [1,2,4,5]; const total = exs.map(i=>state.exercises.find(e=>e.id===i).dur).reduce((a,b)=>a+b,0); state.sessions.push({date:new Date().toISOString(),programId:'demo',duration:total,exCount:exs.length,notes:'Session démo'}); saveState(); showToast('Session démo ajoutée — ' + total + ' min'); }

function startProgram(id){ const pr = state.programs.find(p=>p.id===id); if(!pr) return showToast('Programme introuvable'); const total = pr.ex.map(i=>state.exercises.find(e=>e.id===i).dur||5).reduce((a,b)=>a+b,0); state.sessions.push({date:new Date().toISOString(),programId:id,duration:total,exCount:pr.ex.length,notes:pr.name}); saveState(); showToast('Programme lancé : ' + pr.name + ' — durée ' + total + ' min'); }

/* Weight handling and charts */
function saveWeight(){ const v = parseFloat(document.getElementById('input-weight').value); if(!v || v<20 || v>250) return showToast('Poids invalide'); state.weights.push({date:new Date().toISOString(),kg:Math.round(v*10)/10}); state.profile.weight = v; saveState(); showToast('Pesée ajoutée : ' + v + ' kg'); showDashboard(); }
function saveGoal(){ const v = parseFloat(document.getElementById('input-goal').value); if(!v || v<30 || v>200) return showToast('Objectif invalide'); state.profile.goal = v; saveState(); showToast('Objectif enregistré : ' + v + ' kg'); showDashboard(); }
function renderWeightChart(){ const canvas = document.getElementById('chart-weight'); if(!canvas) return; const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); const data = state.weights.slice(-20); if(data.length < 2){ ctx.fillStyle = '#f1fffc'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = '#617075'; ctx.font='14px sans-serif'; ctx.fillText('Ajoute des pesées pour afficher le graphique',20,40); return; } const pad = 30; const w = canvas.width - pad*2; const h = canvas.height - pad*2; const vals = data.map(d=>d.kg); const min = Math.min(...vals)-1; const max = Math.max(...vals)+1; ctx.strokeStyle = '#2b8a7a'; ctx.lineWidth = 2; ctx.beginPath(); data.forEach((d,i)=>{ const x = pad + (i/(data.length-1))*w; const y = pad + (1 - (d.kg-min)/(max-min))*h; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); ctx.fillStyle='#2b8a7a'; ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill(); }); ctx.stroke(); ctx.fillStyle='#617075'; ctx.font='12px sans-serif'; ctx.fillText(min.toFixed(1)+' kg',10,canvas.height-8); ctx.fillText(max.toFixed(1)+' kg',10,18); }

/* Sessions */
function renderSessionList(){ const el = document.getElementById('session-list'); if(!el) return; if(state.sessions.length === 0){ el.innerHTML = '<div class="small">Aucune séance enregistrée</div>'; return; } el.innerHTML = state.sessions.slice().reverse().map(s=>`<div class="card small" style="display:flex;justify-content:space-between;align-items:center"><div><strong>${escapeHtml(s.notes)}</strong><div class="small">${(new Date(s.date)).toLocaleString()} · ${s.duration} min</div></div><div style="display:flex;gap:8px"><button class="btn-ghost" data-remove="${s.date}">Suppr</button></div></div>`).join(''); }
function removeSession(dateIso){ state.sessions = state.sessions.filter(s=>s.date!==dateIso); saveState(); }

/* Profile */
function saveProfile(){ const name = document.getElementById('p-name').value.trim(); const birth = parseInt(document.getElementById('p-birth').value,10) || 1958; const goal = parseFloat(document.getElementById('p-goal').value) || null; const issues = document.getElementById('p-issues').value.split(',').map(s=>s.trim()).filter(Boolean); state.profile = {name,birth,weight:state.profile.weight||null,goal,issues}; saveState(); showToast('Profil sauvegardé'); }
function resetProfile(){ state.profile = {name:'',birth:1958,weight:null,goal:null,issues:[]}; saveState(); showProfile(); }

/* Export / Demo */
function exportCSV(){ let csv = 'type;date;kg;duration;exCount;notes\n'; state.weights.forEach(w=> csv += `weight;${w.date};${w.kg};;;;\n`); state.sessions.forEach(s=> csv += `session;${s.date};;${s.duration};${s.exCount};${s.notes}\n`); const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'fitcoach60_export.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); showToast('Export CSV généré'); }
function importDemo(){ if(!confirm('Importer données de démonstration ?')) return; state.weights = [{date:new Date(Date.now()-12*24*3600e3).toISOString(),kg:75.2},{date:new Date(Date.now()-9*24*3600e3).toISOString(),kg:74.8},{date:new Date(Date.now()-6*24*3600e3).toISOString(),kg:74.2},{date:new Date(Date.now()-3*24*3600e3).toISOString(),kg:73.6}]; state.sessions = [{date:new Date(Date.now()-10*24*3600e3).toISOString(),programId:'deb',duration:22,exCount:4,notes:'Séance démo'},{date:new Date(Date.now()-7*24*3600e3).toISOString(),programId:'rando',duration:28,exCount:4,notes:'Prépa rando'},{date:new Date(Date.now()-2*24*3600e3).toISOString(),programId:'perte',duration:30,exCount:4,notes:'Cardio léger'}]; state.profile = {...state.profile,name:'Serge',birth:1958,goal:70,issues:['poignets','dos']}; saveState(); showToast('Données de démonstration importées'); }

/* UI helpers */
function updateUI(){ const c = document.getElementById('chart-weight'); if(c) renderWeightChart(); const sl = document.getElementById('session-list'); if(sl) renderSessionList(); }
function countSessionsWeek(){ const week = Date.now() - 7*24*3600e3; return state.sessions.filter(s=> new Date(s.date).getTime() >= week ).length; }
function computeBalanceScore(){ const recent = state.sessions.slice(-30); return Math.min(10, Math.round(countSessionsWeek()*1.2 + recent.length*0.1)) + ' pts'; }
function clearSessions(){ if(confirm('Supprimer toutes les séances ?')){ state.sessions = []; saveState(); showToast('Séances supprimées'); } }

/* Print */
function printExercise(id){ const e = state.exercises.find(x=>x.id===id); if(!e) return showToast('Exercice introuvable'); const w = window.open('','_blank'); const html = `
<html><head><meta charset="utf-8"><title>${e.name}</title>
<style>body{font-family:sans-serif;padding:18px;color:#07211f} .card{border-radius:8px;padding:12px;border:1px solid #e6f6f3;margin-top:8px}</style>
</head><body>
<h2>${e.name}</h2><div class="small">${e.desc} · ${e.dur} min</div>
<div class="card"><strong>Brève consigne</strong><div class="small" style="margin-top:6px">${escapeHtml(e.instructions || '')}</div>
<strong style="display:block;margin-top:8px">Consignes</strong>
<ol style="margin-top:6px"><li>Tenez-vous stable, regard en avant.</li><li>Réalisez le mouvement lentement et contrôlez l’amplitude.</li><li>Arrêtez en cas de douleur aiguë.</li></ol>
<div style="margin-top:8px" class="small"><strong>Variantes</strong>: réduire amplitude, diminuer répétitions, utiliser la chaise.</div>
<div style="margin-top:10px" class="small">FitCoach 60+ — fiche imprimable</div></div>
</body></html>`; w.document.write(html); w.document.close(); w.focus(); }

/* Delegated click handling */
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.id==='nav-landing'){ activateNav('nav-landing'); renderLanding(); }
  if(t.id==='nav-ex'){ activateNav('nav-ex'); showExercises(); }
  if(t.id==='nav-prog'){ activateNav('nav-prog'); showPrograms(); }
  if(t.id==='nav-dashboard'){ activateNav('nav-dashboard'); showDashboard(); }
  if(t.id==='nav-profile'){ activateNav('nav-profile'); showProfile(); }

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

  if(t.id==='btn-export' || t.id==='export-csv') exportCSV();
  if(t.id==='btn-demo') importDemo();
  if(t.id==='save-weight') saveWeight();
  if(t.id==='save-goal') saveGoal();
  if(t.id==='clear-sessions') clearSessions();
  if(t.id==='save-profile') saveProfile();
  if(t.id==='reset-profile') resetProfile();
  if(t.id==='reset-state') resetState();
});

/* renderAnimation: supporte SVG (fallback) et video via préfixe "video:" */
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
    }catch(e){
      console.warn('renderAnimation video parse', e);
    }
    container.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"><iframe src="${embed}" title="Démonstration exercice" style="width:100%;height:100%;border:0;border-radius:8px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    return;
  }
  // fallback simple SVG placeholder when no video
  container.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#617075">Pas de vidéo disponible</div>`;
}

/* Utilities */
function iconFor(cat){ if(cat==='Cardio') return '🏃'; if(cat==='Renforcement') return '🦵'; if(cat==='Mobilité') return '🔄'; if(cat==='Équilibre') return '⚖️'; if(cat==='Récupération') return '🧘'; return '💪'; }
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }

/* Init */
loadState(); renderLanding(); updateUI();

/* Expose for debug */
window.startQuick = startQuick; window.addToToday = addToToday; window.openExercise = openExercise;


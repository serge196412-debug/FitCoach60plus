# FitCoach 60+

FitCoach 60+ est une appli interactive et simple pour les 60+.  
Vidéos réelles intégrées pour chaque exercice, instructions courtes, minuterie par exercice avec pause et bouton +20 s, profil obligatoire pour activer un programme personnalisé, suivi local et export CSV.

---

## Déroulé utilisateur (rapide)
1. Créer ton profil (âge, poids, limitations).  
2. Activer un programme depuis l’onglet Profil ou Programmes.  
3. Lancer une séance : chaque exercice affiche vidéo + consigne + minuterie + pause.  
4. Ajouter des pesées, suivre les séances, exporter/importer CSV pour sauvegarde.

---

## Points forts
- Profil d’abord : ton programme s’adapte à ton âge et contraintes.  
- Vidéos réelles par exercice (YouTube/Instagram/TikTok) pour voir le geste exact.  
- Minuterie par exercice avec pause automatique et option **+20 s** si essoufflé.  
- Accessibilité : skip link, focus management, toasts aria-live, cibles tactiles ≥44×44.  
- Offline first : fonctionne avec localStorage ; export/import CSV pour transfert.

---

## Interface (boutons clés)
- Accueil : kits express et aperçu.  
- Exercices : fiche vidéo + instructions + minuterie.  
- Programmes : séquences prêtes à lancer.  
- Tableau : historique des séances et pesées.  
- Profil : création et activation de programme.  
- Importer démo / Export CSV : gérer les données locales.

---

## Minuterie et comportement de séance
- Chaque exercice a : durée (en secondes), repos (en secondes) et contrôle Start / Pause / Stop.  
- Pause automatique après fin d’exercice.  
- Pendant la pause, bouton **+20 s** ajoute 20 secondes supplémentaires si nécessaire.  
- Mode auto : enchaîne les exercices sans intervention ; mode manuel : demande confirmation entre chaque exercice.  
- Les toasts (début/fin/exercice/pause/+20s) sont annoncés via aria-live pour les lecteurs d’écran.

---

## Format d’un exercice (app.js)
```js
{
  id: 1,
  name: "Marche sur place",
  cat: "Cardio",
  dur: 60, // durée en secondes
  rest: 30, // pause en secondes
  desc: "Cardio doux — 1 minute",
  anim: "video:https://www.youtube.com/watch?v=XXXXXXXXXXX",
  instructions: "Marche sur place, genoux modérés. 1 min rythme modéré. Stop en cas de douleur."
}

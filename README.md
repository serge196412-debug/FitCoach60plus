# FitCoach60plus

Prototype d'application web locale pour seniors 60+. Objectif : proposer des programmes sécurisés sans appui sur les mains, une bibliothèque de 20 exercices, 6 programmes, kits express, suivi du poids et animations explicatives intégrées.

## But du projet
Fournir un prototype autonome, simple à déployer et tester par des seniors ou des équipes locales, avec des consignes claires, des variantes sécurisées et des fiches imprimables.

## Fonctionnalités principales
- Page d'accueil responsive et navigation simple
- Bibliothèque de 20 exercices avec consignes françaises corrigées, variantes et animations SVG intégrées
- 6 programmes prêts à l’emploi : débutant, marche nordique, mobilité, perte de poids, équilibre, avancé
- Kits express pour séances courtes (matin, rando, soir)
- Suivi du poids en localStorage et graphique simple
- Enregistrement des séances, export CSV, fiches imprimables
- Fonctionne hors‑ligne et sans dépendances externes

## Arborescence recommandée
- index.html
- styles.css
- app.js
- README.md
- .gitignore
- /media (optionnel pour vidéos MP4 locales)
- /assets/icons (optionnel pour SVG pictos)

## Installation et test local rapide
1. Cloner le dépôt ou télécharger les fichiers.  
2. Placer index.html, styles.css et app.js à la racine du projet.  
3. Ouvrir index.html dans un navigateur moderne (Chrome, Edge, Firefox).  
4. Vérifier :
   - Bibliothèque → ouvrir un exercice → animation SVG visible.
   - Tableau → ajouter une pesée → pesée enregistrée et visible.
   - Importer démo → profils et séances remplis.
   - Export CSV → téléchargement du fichier CSV.

## Déploiement via GitHub Pages
1. Pousser les fichiers sur la branche main.  
2. Dans GitHub, Settings → Pages → Branch: main, Folder: / → Save.  
3. Attendre l’URL fournie par GitHub Pages puis ouvrir pour vérifier la démo en ligne.

## Personnalisation
- Remplacer animations SVG par vidéos locales MP4 : déposer les MP4 dans /media et adapter la fonction renderAnimation dans app.js.  
- Modifier les textes d’exercices ou programmes dans app.js (tableau defaultExercises/defaultPrograms).  
- Séparer davantage CSS/JS ou ajouter bundler si tu souhaites pipeline de build.

## Tests utilisateurs recommandés
- 3 cycles de tests avec 5 utilisateurs seniors : lisibilité, compréhension des consignes, taille des contrôles, impression des fiches.  
- Priorité d’itération : orthographe et clarté des consignes, accessibilité (contraste et tailles), retours sur les variantes.

## Commandes Git utiles
```bash
git add .
git commit -m "Mise à jour README.md et ajout prototype FitCoach60plus"
git push origin main

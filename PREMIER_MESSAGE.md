# Premier message à envoyer à Claude Code

---

Copie-colle tout ce qui suit dans ton premier message à Claude Code.
Remplace les parties entre [crochets] par tes vraies infos.

---

```
Bonjour ! Je vais organiser une course d'orientation pour un EVG le 23 mai 2026 à Orschwihr (Alsace). 
J'ai une application web déjà développée par un ami, que je dois adapter à mon événement.

## Contexte du projet

L'app existe déjà sur GitHub : https://github.com/hugohcl/orientation-orschwihr
Elle est développée en HTML/JS pur, sans framework. C'est une PWA (Progressive Web App) mobile 
qui fonctionne hors-ligne. Toutes les données du jeu sont dans le fichier data.js.

Je ne m'y connais pas du tout en code, git ou GitHub. Tu vas devoir tout faire à ma place — 
je valide, tu exécutes.

## Ce qu'on doit faire ensemble aujourd'hui

### 1. Setup technique (à faire en premier, une seule fois)

Je n'ai pas encore de compte GitHub. Tu dois :
- Vérifier si git est installé sur mon PC (git --version dans le terminal). 
  Si non, me dire exactement quoi télécharger et installer.
- Vérifier si GitHub CLI (gh) est installé (gh --version). 
  Si non, me dire exactement quoi télécharger et installer.
- Une fois les deux installés, me guider pour créer mon compte GitHub et me connecter 
  via gh auth login.
- Forker le repo https://github.com/hugohcl/orientation-orschwihr sur mon compte 
  et le cloner en local.
- Activer GitHub Pages sur mon fork pour que l'app soit accessible en ligne.

Procède étape par étape, attends ma confirmation à chaque étape avant de passer à la suivante.

### 2. Personnalisation du jeu (après le setup)

Une fois le setup fait, on devra modifier le fichier data.js pour :

a) Remplacer les prénoms des joueurs (actuellement "Joueur 1" à "Joueur 12") :
   - Équipe Grecque (3 personnes) : [Prénom 1], [Prénom 2], [Prénom 3]
   - Équipe Nordique (3 personnes) : [Prénom 4], [Prénom 5], [Prénom 6]
   - Équipe Hindoue (3 personnes) : [Prénom 7], [Prénom 8], [Prénom 9]
   - Équipe Égyptienne (3 personnes) : [Prénom 10], [Prénom 11], [Prénom 12]

b) Changer le code secret du Game Master (MJ_CODE) : je veux que ce soit "[MON CODE SECRET]"

c) Renseigner l'adresse de notre hébergement/gîte : [adresse complète du gîte]

### 3. Ce qui doit attendre le repérage sur place

Avant le 23 mai, je ferai un repérage à Orschwihr. Après ce repérage, je reviendrai 
pour compléter :
- Les vraies énigmes de localisation pour chaque cachette (5 cachettes)
- La confirmation du 5e lieu (actuellement placeholder)
- L'adresse exacte de la cave viticole choisie comme checkpoint
- Les photos des cachettes
- Une carte du village

## Structure du projet (pour ta référence)

- data.js : toutes les données du jeu (équipes, checkpoints, indices, codes)
- index.html + game.js : la mécanique du jeu (ne pas toucher sauf si bug)
- sw.js : service worker pour le mode hors-ligne (ne toucher que pour incrémenter le numéro de version lors de chaque déploiement)
- CLAUDE.md : documentation complète du projet, lis-le en premier

## Règles de travail importantes

- Toujours lire le CLAUDE.md au début de chaque session pour avoir le contexte complet
- Ne jamais réécrire index.html ou game.js from scratch, seulement des modifications ciblées
- Après chaque modification de data.js : incrémenter le numéro de version dans sw.js 
  (orschwihr-v1 → v2 → v3...) et APP_VERSION dans data.js, puis commit + push
- Vérifier la syntaxe JS avant de commiter : node --check data.js

## Pour commencer

Commence par l'étape 1 (setup technique). Vérifie d'abord si git et gh sont installés 
sur mon PC et dis-moi ce que tu trouves.
```

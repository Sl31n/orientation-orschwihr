# EVG Orschwihr — Jeu d'orientation

## Contexte
EVG (enterrement de vie de garçon) le **23 mai 2026** à **Orschwihr, Alsace (68500)**.
Thème : **Mythologies**. Jeu de l'après-midi : course d'orientation dans le village.
**4 équipes de 3 joueurs** (12 participants) + 1 Game Master (toi).

Ce projet est un fork de l'app "Mythologies" créée par Hugo (hugohcl) pour un événement similaire à Dosches en 2025. Toute la mécanique de jeu est identique — seules les données (équipes, checkpoints, indices) sont à adapter.

## Fichier principal
`index.html` + `data.js` + `game.js` + `sw.js` — PWA mobile, fonctionne hors-ligne.

## Équipes
| Équipe | Membres | Couleur | Route |
|--------|---------|---------|-------|
| Grecque | À compléter | #5a8fd4 | eglise → mairie → cave → secret → fontaine |
| Nordique | À compléter | #c8c8c8 | mairie → secret → fontaine → eglise → cave |
| Hindoue | À compléter | #c080e8 | cave → fontaine → secret → mairie → eglise |
| Égyptienne | À compléter | #d4a02a | fontaine → secret → cave → eglise → mairie |

Toutes les équipes partent et arrivent au **point de départ (hébergement/gîte)**.

## Checkpoints
| ID | Nom | Adresse | Code cachette |
|----|-----|---------|---------------|
| eglise | Église Notre-Dame de l'Assomption | Rue de l'Église | DAME |
| fontaine | La Fontaine Historique (classée MH) | Rue de l'Église | ONDE |
| mairie | La Mairie | 11 rue de Soultzmatt | LOIS |
| cave | Cave viticole (à confirmer) | À compléter | VINS |
| secret | 5e lieu (à trouver sur place) | À compléter | ???? |
| ferme | Point de départ (gîte) | À compléter | FINI |

## Ce qui reste à faire (avant le 23 mai)

### Après repérage sur place (OBLIGATOIRE)
- [ ] Remplir `data.js` → `ENIGMES` : les vraies énigmes de localisation cachette pour chaque CP
- [ ] Remplir `data.js` → `CPS[cave].addr` et `CPS[secret].addr` : adresses réelles
- [ ] Remplir `data.js` → `CPS[secret].code` : remplacer `????` par le vrai code 4 lettres
- [ ] Remplir les indices HINTS pour `cave` et `secret` (les `[À remplir après repérage]`)
- [ ] Remplir l'adresse du gîte dans tous les indices "retour à la base" et dans `CPS[ferme].addr`
- [ ] Changer le `MJ_CODE` dans `data.js` (remplacer `"ZEUS"` par quelque chose que seul le MJ connaît)

### Prénoms des joueurs
- [ ] Remplacer `"Joueur 1"` à `"Joueur 12"` dans `data.js` → `TEAMS[...].members`

### Assets visuels (optionnel mais recommandé)
- [ ] `Carte.png` : carte du village Orschwihr (screenshot Google Maps ou plan)
- [ ] `cp-eglise.webp`, `cp-fontaine.webp`, `cp-mairie.webp`, `cp-cave.webp`, `cp-secret.webp` : photos des cachettes (prises lors du repérage)
- [ ] `emblem-egyptien.webp` : emblème pour la 4e équipe (les 3 autres sont déjà dans le repo source)
- [ ] `bg-egyptien.webp` : texture de fond pour l'équipe égyptienne
- [ ] `logo.png` : logo de l'app (peut rester le même)

### Pour ajouter une photo de cachette
Les photos s'affichent sur l'écran énigme. Dans `data.js`, le champ `icon` de chaque CP pointe vers le fichier image.

## Architecture du fichier index.html
Screens (divs avec class `screen hidden`) :
- `s1` — Sélection équipe
- `s2` — Vérification mode avion (obligatoire)
- `s3` — Briefing équipe
- `s4` — Countdown 3-2-1
- `s5` — Indices départ
- `s6` — En route (chrono visible)
- `sEnigme` — Énigme pour trouver la cachette physique
- `s7` — Saisie code 4 lettres
- `s8` — Indices vers prochaine destination
- `sFinal` — Dernier défi physique à la base
- `s9` — Arrivée + score
- `sSplash` — Splash screen
- `s10` — MJ Login
- `s11` — Mode MJ (Live / Indices / Classement)
- `sTest` — Mode Test

## Mécanique de jeu (ne pas modifier)
1. Toutes les équipes démarrent au gîte — reçoivent leur 1er indice sur place
2. À chaque checkpoint : énigme → cachette physique → code 4 lettres → débloque indices suivants
3. 4 niveaux d'indices : I gratuit / II +3min / III +6min / IV +10min
4. Mauvaise destination tapée = +1 min de pénalité
5. Connexion internet détectée = +30 min de pénalité
6. Carte consultable 2 fois max (+10 sec par consultation)
7. Retour au gîte → dernier jeu physique → MJ donne le code FINI → chrono s'arrête
8. Score = chrono + pénalités

## Variables JS clés dans data.js
```js
MJ_CODE        // Code secret du Game Master
EVENT_DATE     // Affiché dans l'app
EVENT_LOCATION // Affiché dans l'app
TEAMS          // Équipes : membres, couleurs, routes, emblèmes
CPS            // Checkpoints : nom, photo, adresse, code cachette
ENIGMES        // Texte de l'énigme pour trouver la cachette physique
HINTS          // Indices par checkpoint et par équipe (4 niveaux)
ACC            // Alias acceptés pour la saisie de destination
```

## Règles de travail importantes (apprises sur le projet source)

**Ne JAMAIS réécrire index.html ou game.js from scratch** — patcher avec des éditions ciblées uniquement. La réécriture introduit des régressions.

**Valider avant de livrer :**
1. `node --check data.js` pour vérifier la syntaxe JS
2. Vérifier que tous les IDs de checkpoints dans les routes correspondent à des clés de `CPS` et `HINTS`

**Ne jamais mettre d'`onclick` inline avec des quotes imbriquées dans du HTML généré par JS** — crash Safari silencieux. Toujours `createElement` + `addEventListener`.

**`playBeep()` doit être appelé avant tout overlay ou transition** — contrainte AudioContext iOS.

## GitHub Pages — Mise en ligne

### Première fois (à faire une seule fois)

**Étape 1 : Installer GitHub CLI**
Demande à Claude Code de vérifier si `gh` est installé (`gh --version`). Sinon, télécharger sur https://cli.github.com et installer.

**Étape 2 : Se connecter à GitHub**
```
gh auth login
```
Suivre les instructions interactives : choisir GitHub.com, HTTPS, et s'authentifier via le navigateur. Créer un compte GitHub si besoin sur https://github.com/join.

**Étape 3 : Initialiser et publier le repo**
Claude Code peut exécuter ces commandes à ta place :
```bash
git init
git add .
git commit -m "feat: initial EVG Orschwihr app"
gh repo create orientation-orschwihr --public --source=. --remote=origin --push
```

**Étape 4 : Activer GitHub Pages**
```
gh api repos/TON_USERNAME/orientation-orschwihr/pages --method POST --field source='{"branch":"master","path":"/"}'
```
Ou manuellement : Settings → Pages → Branch: master → Save.

L'app sera accessible sur : `https://TON_USERNAME.github.io/orientation-orschwihr/`

### Pour chaque mise à jour ensuite
```bash
git add data.js   # (ou le fichier modifié)
git commit -m "description du changement"
git push
```
GitHub Pages se met à jour automatiquement en 1-2 minutes.

### Forcer la mise à jour du cache sur les téléphones
Chaque déploiement doit incrémenter le numéro de cache dans `sw.js` :
```js
var CACHE = 'orschwihr-v2';  // v1 → v2 → v3...
```
Et mettre à jour `APP_VERSION` dans `data.js`. Sinon les téléphones garderont l'ancienne version en cache.

## Notes spécifiques Orschwihr
- La fontaine et l'église sont très proches (même rue). Les énigmes doivent être suffisamment distinctes pour éviter la confusion.
- La cave et le 5e lieu (secret) sont à confirmer lors du repérage — vérifier que les deux sont accessibles à pied depuis le centre et à moins de 10 min de marche des autres CPs.
- Le village fait ~1000 habitants : rester dans le centre historique pour ne pas allonger le parcours.

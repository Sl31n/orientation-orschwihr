# EVG Orschwihr — Jeu d'orientation

## Contexte
EVG (enterrement de vie de garçon) le **23 mai 2026** à **Orschwihr, Alsace (68500)**.
Thème : **Mythologies**. Jeu de l'après-midi : course d'orientation dans le village.
**4 équipes de 3 joueurs** (12 participants) + 1 Game Master (Niels).

Projet forké de l'app de Hugo (hugohcl) — mécanique de jeu identique, données entièrement adaptées.

## Fichiers principaux
`index.html` + `data.js` + `game.js` + `sw.js` — PWA mobile, fonctionne hors-ligne.

## Équipes
| Équipe | Membres | Couleur | Route |
|--------|---------|---------|-------|
| Grecque | Louis, Quentin, François | #5a8fd4 | eglise → mairie → cave → cafe → fontaine |
| Nordique | Luc, Julien, Louis Stephan | #c8c8c8 | mairie → cafe → fontaine → eglise → cave |
| Hindoue | Léo, Clément, Antoine | #c080e8 | cave → fontaine → cafe → mairie → eglise |
| Égyptienne | Lucas, Lucie, Antoine | #d4a02a | fontaine → cafe → cave → eglise → mairie |

Toutes les équipes partent et arrivent à **Notre Airbnb** (29 Grand Rue).

## Checkpoints
| ID | Nom affiché | Adresse | Code |
|----|-------------|---------|------|
| eglise | L'Église | Rue de l'Église | DAME |
| fontaine | Le Pressoir | 26 Rue de Soultzmatt | ONDE |
| mairie | La Mairie | 11 rue de Soultzmatt | LOIS |
| cave | Lucien Albrecht / Wolfberger | 28 Rue du Printemps | VINS |
| cafe | Chez Laffy | Rue de Bergholtz-Zell | CAFE |
| ferme | Notre Airbnb | 29 Grand Rue | FINI |

**Note** : `fontaine` est conservé comme clé JS interne pour des raisons de compat — l'affichage joueur dit "Le Pressoir" partout. `ferme` idem : clé interne, affichage "Notre Airbnb".

## MJ_CODE
`ZEUS` — confirmé définitif.

## Ce qui reste avant le 23 mai

### Après repérage (OBLIGATOIRE)
- [ ] Remplir `data.js` → `ENIGMES` : énigmes pour trouver la cachette physique à chaque CP
- [ ] Prendre les photos des cachettes lors du repérage
- [ ] Remplacer `cp-eglise.webp`, `cp-fontaine.webp`, `cp-mairie.webp`, `cp-cave.webp`, `cp-secret.webp` par les vraies photos
- [ ] Mettre à jour `PHOTO_HINTS` dans `game.js` (référence encore les CPs de Hugo)

## Architecture du fichier index.html
Screens (divs avec class `screen hidden`) :
- `s1` — Sélection équipe
- `s2` — Vérification mode avion
- `s3` — Briefing équipe
- `s4` — Countdown 3-2-1
- `s5` — Indices départ
- `s6` — En route (chrono visible)
- `sEnigme` — Énigme cachette
- `s7` — Saisie code 4 lettres
- `s8` — Indices vers prochaine destination
- `sFinal` — Défi final à l'Airbnb
- `s9` — Arrivée + score
- `sSplash` — Splash screen
- `s10` — MJ Login
- `s11` — Mode MJ (Live / Indices / Classement)
- `sTest` — Mode Test

## Mécanique de jeu (ne pas modifier)
1. Toutes les équipes démarrent à l'Airbnb — reçoivent leur 1er indice sur place
2. À chaque CP : énigme → cachette physique → code 4 lettres → débloque indices suivants
3. 4 niveaux d'indices : I gratuit / II +3min / III +6min / IV +10min (adresse complète)
4. Mauvaise destination tapée = +1 min de pénalité
5. Connexion internet détectée = +30 min de pénalité
6. Carte consultable 2 fois max, 12 sec par consultation (+12 sec par usage)
7. Retour à l'Airbnb → dernier jeu physique → MJ donne le code FINI → chrono s'arrête
8. Score = chrono + pénalités

## Variables JS clés dans data.js
```js
MJ_CODE        // Code secret du Game Master (ZEUS)
EVENT_DATE     // 23 mai 2026
EVENT_LOCATION // Orschwihr
TEAMS          // Équipes : membres, couleurs, routes, emblèmes
CPS            // Checkpoints : nom, photo, adresse, code cachette
ENIGMES        // Texte de l'énigme pour trouver la cachette physique
HINTS          // 4 niveaux d'indices par (CP venant d'être validé, équipe)
ACC            // Alias acceptés pour la saisie de destination
```

## Règles de travail importantes

**Ne JAMAIS réécrire index.html ou game.js from scratch** — patcher avec des éditions ciblées uniquement.

**Bump systématique à chaque déploiement** :
- `APP_VERSION` dans `data.js` (semver)
- `CACHE` dans `sw.js` (incrément vN)

**Ne jamais mettre d'`onclick` inline avec quotes imbriquées dans du HTML généré par JS** — crash Safari silencieux.

## GitHub Pages
- Repo : https://github.com/Sl31n/orientation-orschwihr
- Site : https://sl31n.github.io/orientation-orschwihr/
- Local : /Users/nielskelche/orientation-orschwihr/
- Déploiement auto via push sur master

## Notes spécifiques Orschwihr
- L'Église et le Pressoir sont sur la même rue (rue de Soultzmatt) — énigmes physiques distinctes obligatoires
- Albrecht Lucien et Chez Laffy sont en périphérie (Rue du Printemps / Rue de Bergholtz-Zell)
- Village ~1000 habitants, parcours dans le centre historique

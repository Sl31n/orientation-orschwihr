// ═══════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════
const MJ_CODE = "ZEUS";  // À CHANGER avant le jour J
const LS_KEY  = "evg_orschwihr_v1";
const APP_VERSION = '1.0.0';
const EVENT_DATE     = '23 mai 2026';
const EVENT_LOCATION = 'Orschwihr';

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const TEAMS = {
  grec: {
    key:"grec", name:"Équipe Grecque", mascot:"", tagline:"Les Enfants de l'Olympe",
    flavor:"Ô héros d'Athéna ! Comme Ulysse, vous voilà lancés dans une odyssée alsacienne, boussole en main, sous le regard bienveillant de la chouette de la sagesse.",
    arrival:"Comme Ulysse retrouvant Ithaque après vingt ans d'errance, votre odyssée s'achève ici.",
    members:["Joueur 1","Joueur 2","Joueur 3"],
    color:"#5a8fd4", colorLight:"#2a5a9a", bg:"rgba(90,143,212,0.12)", border:"rgba(90,143,212,0.32)",
    route:["eglise","mairie","cave","secret","fontaine"],
    emblem:'./emblem-grec.webp',
    bgTexture:'./bg-grec.webp'
  },
  nordique: {
    key:"nordique", name:"Équipe Nordique", mascot:"", tagline:"Les Guerriers du Valhalla",
    flavor:"Guerriers du Valhalla ! Odin a tracé votre saga sur les feuilles d'Yggdrasil. Le corbeau noir vole devant vous — suivez-le dans les ruelles d'Orschwihr.",
    arrival:"Comme Sigurd de retour de sa quête, vos exploits seront chantés au mead-hall ce soir.",
    members:["Joueur 4","Joueur 5","Joueur 6"],
    color:"#c8c8c8", colorLight:"#5a5a5a", bg:"rgba(160,160,160,0.10)", border:"rgba(160,160,160,0.28)",
    route:["mairie","secret","fontaine","eglise","cave"],
    emblem:'./emblem-nordique.webp',
    bgTexture:'./bg-nordique.webp'
  },
  hindou: {
    key:"hindou", name:"Équipe Hindoue", mascot:"", tagline:"Les Disciples du Dharma",
    flavor:"Disciples du Dharma ! Le tigre sacré ouvre la voie. Chaque checkpoint est une étape de votre yatra — votre pèlerinage alsacien vers le moksha.",
    arrival:"Votre yatra s'achève. Le moksha vous attend — repos mérité après ce périple.",
    members:["Joueur 7","Joueur 8","Joueur 9"],
    color:"#c080e8", colorLight:"#7a3aa0", bg:"rgba(160,80,200,0.12)", border:"rgba(160,80,200,0.32)",
    route:["cave","fontaine","secret","mairie","eglise"],
    emblem:'./emblem-hindou.webp',
    bgTexture:'./bg-hindou.webp'
  },
  egyptien: {
    key:"egyptien", name:"Équipe Égyptienne", mascot:"", tagline:"Les Enfants du Nil",
    flavor:"Enfants du Nil ! Rà illumine votre chemin à travers les vignes d'Orschwihr. Comme les scribes de Thoth, lisez les indices et percez les secrets du village.",
    arrival:"Comme le soleil de Rà touchant l'horizon, votre odyssée alsacienne s'achève en gloire.",
    members:["Joueur 10","Joueur 11","Joueur 12"],
    color:"#d4a02a", colorLight:"#9a7010", bg:"rgba(212,160,42,0.12)", border:"rgba(212,160,42,0.32)",
    route:["fontaine","secret","cave","eglise","mairie"],
    emblem:'./emblem-egyptien.webp',
    bgTexture:'./bg-egyptien.webp'
  }
};

const ENIGMES = {
  eglise:   "[PLACEHOLDER — à remplir après repérage]",
  fontaine: "[PLACEHOLDER — à remplir après repérage]",
  mairie:   "[PLACEHOLDER — à remplir après repérage]",
  cave:     "[PLACEHOLDER — à remplir après repérage]",
  secret:   "[PLACEHOLDER — à remplir après repérage]",
  ferme:    "[PLACEHOLDER]"
};

const CPS = {
  eglise:   {name:"L'Église Notre-Dame",    icon:"./cp-eglise.webp",   addr:"Rue de l'Église, Orschwihr",         code:"DAME"},
  fontaine: {name:"La Fontaine Historique", icon:"./cp-fontaine.webp", addr:"Rue de l'Église, Orschwihr",         code:"ONDE"},
  mairie:   {name:"La Mairie",              icon:"./cp-mairie.webp",   addr:"11 rue de Soultzmatt, Orschwihr",    code:"LOIS"},
  cave:     {name:"La Cave",                icon:"./cp-cave.webp",     addr:"[À compléter après repérage]",       code:"VINS"},
  secret:   {name:"Le 5e Lieu",             icon:"./cp-secret.webp",   addr:"[À compléter après repérage]",       code:"????"},
  ferme:    {name:"Votre point de départ",  icon:"",                   addr:"[Adresse du gîte/hébergement]",      code:"FINI"}
};

// ─────────────────────────────────────────────────────────────────
// HINTS : clé = CP venant d'être validé → indices vers le SUIVANT
//
// Routes (5 CP chacune) :
//   Grec     : Base → Église → Mairie → Cave → Secret → Fontaine → Base
//   Nordique : Base → Mairie → Secret → Fontaine → Église → Cave → Base
//   Hindou   : Base → Cave → Fontaine → Secret → Mairie → Église → Base
//   Égyptien : Base → Fontaine → Secret → Cave → Église → Mairie → Base
// ─────────────────────────────────────────────────────────────────
const HINTS = {

  // ── FERME/BASE → 1er checkpoint de chaque équipe ─────────────
  ferme: {
    grec: [  // Base → Église
      "Chaque polis avait son temenos. Dans le village, cherchez l'héritier du monde qu'Olympe a engendré.",
      "On ne m'habite pas, mais on vient me voir pour être habité. J'abrite sans loger et j'élève sans enfanter.",
      "Un édifice de pierre dont le saint a donné son nom à des milliers d'enfants. L'Assomption la consacre.",
      "L'Église Notre-Dame de l'Assomption — Rue de l'Église."
    ],
    nordique: [  // Base → Mairie
      "Odin lisait les runes du destin, mais celui des hommes de Midgard s'écrit sans divinité.",
      "Je garde moins de secrets que de preuves, et bien des instants décisifs passent par moi.",
      "La loi s'affiche sur ce bâtiment que chaque commune possède.",
      "La Mairie — 11 rue de Soultzmatt."
    ],
    hindou: [  // Base → Cave
      "Dionysos lui-même y viendrait en pèlerinage. Ce lieu garde le fruit de la vigne et le labeur des hommes.",
      "Je repose sous la terre ou derrière une lourde porte. Les tonneaux sont mes gardiens.",
      "Un domaine viticole du village produit les grands crus d'Alsace — cherchez l'entrée de leur cave.",
      "La cave viticole — [À préciser après repérage]."
    ],
    egyptien: [  // Base → Fontaine
      "Comme le Nil irrigue les terres d'Égypte, une source ancienne abreuve ce village depuis des siècles.",
      "Mon bassin compte dix faces, ma colonne en compte huit. Les géomètres me reconnaîtraient.",
      "Un monument classé aux Monuments Historiques, une colonne au centre d'un bassin décagonal.",
      "La Fontaine Historique — Rue de l'Église."
    ]
  },

  // ── ÉGLISE → prochaine étape ──────────────────────────────────
  eglise: {
    grec: [  // → Mairie
      "Solon a donné ses lois à Athènes — dans chaque cité, un édifice garde les registres du destin civique.",
      "Je garde moins de secrets que de preuves, et bien des instants décisifs passent par moi.",
      "La loi s'affiche sur ce bâtiment que chaque commune possède.",
      "La Mairie — 11 rue de Soultzmatt."
    ],
    nordique: [  // → Cave (DERNIER CP)
      "Comme Sigurd de retour de sa quête, votre saga approche de son terme. Un dernier secret vous attend.",
      "Dionysos lui-même y viendrait en pèlerinage. Ce lieu garde le fruit de la vigne.",
      "Un domaine viticole du village — cherchez l'entrée de leur cave.",
      "La cave viticole — [À préciser après repérage]."
    ],
    hindou: [  // → Base (DERNIER CP)
      "Votre yatra touche à sa fin. Retournez au point de départ — là où votre odyssée alsacienne a commencé.",
      "Le chemin du retour est le même que celui du départ.",
      "Retournez à votre hébergement.",
      "Votre point de départ — [Adresse du gîte]."
    ],
    egyptien: [  // → Mairie (DERNIER CP)
      "Comme le pharaon régnant depuis son palais, un seul bâtiment administre les destins du village.",
      "Je garde moins de secrets que de preuves, et bien des instants décisifs passent par moi.",
      "La loi s'affiche sur ce bâtiment que chaque commune possède.",
      "La Mairie — 11 rue de Soultzmatt."
    ]
  },

  // ── MAIRIE → prochaine étape ──────────────────────────────────
  mairie: {
    grec: [  // → Cave
      "Dionysos foulait les raisins sous ses pieds nus. Ici, des vignerons alsaciens ont pris le relais.",
      "Je repose sous la terre ou derrière une lourde porte. Les tonneaux sont mes gardiens.",
      "Un domaine viticole du village — cherchez l'entrée de leur cave.",
      "La cave viticole — [À préciser après repérage]."
    ],
    nordique: [  // → Secret
      "Même les dieux d'Asgard avaient leurs sanctuaires cachés. Ce lieu n'est pas sur toutes les cartes.",
      "Je ne me livre pas facilement. Regardez autour de vous, les indices du lieu parleront d'eux-mêmes.",
      "[Indice III — À remplir après repérage]",
      "[Indice IV — À remplir après repérage]"
    ],
    hindou: [  // → Église (DERNIER CP)
      "Aucun Brahmane n'y porte le feu d'Agni, car un seul homme a verticalisé son karma.",
      "On ne m'habite pas, mais on vient me voir pour être habité. J'abrite sans loger et j'élève sans enfanter.",
      "Un édifice de pierre consacré à Notre-Dame — son nom évoque l'élévation vers le ciel.",
      "L'Église Notre-Dame de l'Assomption — Rue de l'Église."
    ],
    egyptien: [  // → Base (DERNIER CP)
      "Comme le soleil de Rà touchant l'horizon, votre odyssée alsacienne s'achève. Retournez au point de départ.",
      "Le chemin du retour est le même que celui du départ.",
      "Retournez à votre hébergement.",
      "Votre point de départ — [Adresse du gîte]."
    ]
  },

  // ── CAVE → prochaine étape ────────────────────────────────────
  cave: {
    grec: [  // → Secret
      "Héphaistos cachait ses forges dans les entrailles de la terre. Un lieu secret vous attend.",
      "Je ne me livre pas facilement. Regardez autour de vous, les indices du lieu parleront d'eux-mêmes.",
      "[Indice III — À remplir après repérage]",
      "[Indice IV — À remplir après repérage]"
    ],
    nordique: [  // → Base (DERNIER CP)
      "Comme Sigurd de retour de sa quête, votre saga s'achève. Retournez au point de départ.",
      "Le chemin du retour est le même que celui du départ.",
      "Retournez à votre hébergement.",
      "Votre point de départ — [Adresse du gîte]."
    ],
    hindou: [  // → Fontaine
      "Comme le Gange purifie les âmes, une source ancienne attend vos libations.",
      "Mon bassin compte dix faces, ma colonne en compte huit. Les géomètres me reconnaîtraient.",
      "Un monument classé aux Monuments Historiques, une colonne au centre d'un bassin décagonal.",
      "La Fontaine Historique — Rue de l'Église."
    ],
    egyptien: [  // → Église
      "Chaque polis avait son temenos. Dans le village, cherchez l'héritier du monde qu'Olympe a engendré.",
      "On ne m'habite pas, mais on vient me voir pour être habité. J'abrite sans loger et j'élève sans enfanter.",
      "Un édifice de pierre consacré à Notre-Dame — son nom évoque l'élévation vers le ciel.",
      "L'Église Notre-Dame de l'Assomption — Rue de l'Église."
    ]
  },

  // ── SECRET → prochaine étape ──────────────────────────────────
  secret: {
    grec: [  // → Fontaine
      "Comme le Nil irrigue les terres d'Égypte, une source ancienne abreuve ce village depuis des siècles.",
      "Mon bassin compte dix faces, ma colonne en compte huit. Les géomètres me reconnaîtraient.",
      "Un monument classé aux Monuments Historiques, une colonne au centre d'un bassin décagonal.",
      "La Fontaine Historique — Rue de l'Église."
    ],
    nordique: [  // → Fontaine
      "Mimir l'honore de sa sagesse. L'eau, source de toute connaissance, jaillit ici sous une forme sculptée.",
      "Mon bassin compte dix faces, ma colonne en compte huit. Les géomètres me reconnaîtraient.",
      "Un monument classé aux Monuments Historiques, une colonne au centre d'un bassin décagonal.",
      "La Fontaine Historique — Rue de l'Église."
    ],
    hindou: [  // → Mairie
      "Ce que Dharma exigeait d'ordonner, les hommes l'ont consacré sans dieu.",
      "Je garde moins de secrets que de preuves, et bien des instants décisifs passent par moi.",
      "La loi s'affiche sur ce bâtiment que chaque commune possède.",
      "La Mairie — 11 rue de Soultzmatt."
    ],
    egyptien: [  // → Cave
      "Dionysos foulait les raisins sous ses pieds nus. Ici, des vignerons alsaciens ont pris le relais.",
      "Je repose sous la terre ou derrière une lourde porte. Les tonneaux sont mes gardiens.",
      "Un domaine viticole du village — cherchez l'entrée de leur cave.",
      "La cave viticole — [À préciser après repérage]."
    ]
  },

  // ── FONTAINE → prochaine étape ────────────────────────────────
  fontaine: {
    grec: [  // → Base (DERNIER CP)
      "Comme Ulysse apercevant Ithaque, votre odyssée alsacienne s'achève. Retournez au point de départ.",
      "Le chemin du retour est le même que celui du départ.",
      "Retournez à votre hébergement.",
      "Votre point de départ — [Adresse du gîte]."
    ],
    nordique: [  // → Église
      "Le temple d'Ásgarðr n'a qu'un héritier à Midgard — un lieu où un seul dieu règne.",
      "On ne m'habite pas, mais on vient me voir pour être habité. J'abrite sans loger et j'élève sans enfanter.",
      "Un édifice de pierre consacré à Notre-Dame — son nom évoque l'élévation vers le ciel.",
      "L'Église Notre-Dame de l'Assomption — Rue de l'Église."
    ],
    hindou: [  // → Secret
      "Même les dieux d'Asgard avaient leurs sanctuaires cachés. Ce lieu n'est pas sur toutes les cartes.",
      "Je ne me livre pas facilement. Regardez autour de vous, les indices du lieu parleront d'eux-mêmes.",
      "[Indice III — À remplir après repérage]",
      "[Indice IV — À remplir après repérage]"
    ],
    egyptien: [  // → Secret
      "Comme Anubis gardait les secrets des morts, ce lieu garde un secret bien vivant.",
      "Je ne me livre pas facilement. Regardez autour de vous, les indices du lieu parleront d'eux-mêmes.",
      "[Indice III — À remplir après repérage]",
      "[Indice IV — À remplir après repérage]"
    ]
  }
};

const LVL = [
  {l:"Indice I",   p:0,  d:"Coriace",       c:"#2a9d6a"},
  {l:"Indice II",  p:3,  d:"Intermédiaire", c:"#d4a017"},
  {l:"Indice III", p:6,  d:"Facile",        c:"#d07030"},
  {l:"Indice IV",  p:10, d:"Très facile",   c:"#b83030"}
];

const ACC = {
  eglise:   ["eglise","église","notre-dame","notre dame","l'église","l'eglise","assomption"],
  fontaine: ["fontaine","la fontaine","fontaine historique"],
  mairie:   ["mairie","la mairie","soultzmatt"],
  cave:     ["cave","la cave","vigne","vignoble","cave viticole"],
  secret:   ["secret","5e lieu","cinquieme lieu","cinquième lieu"],
  ferme:    ["ferme","gite","gîte","depart","départ","base","hébergement","hebergement"]
};

const CITS = {
  grec:[
    {t:"« Γνῶθι σεαυτόν »",s:"Connais-toi toi-même — Delphes"},
    {t:"« Πάντα ῥεῖ »",s:"Tout est en flux — Héraclite"},
    {t:"« Νίκη σύν σοφίᾳ »",s:"La victoire par la sagesse"},
    {t:"« Ἀρχὴ ἥμισυ παντός »",s:"Le début est la moitié du tout — Aristote"}
  ],
  nordique:[
    {t:"« Vegr til Valhöll er þungr »",s:"La route vers le Valhalla est longue"},
    {t:"« Deyr fé, deyja frændr »",s:"Le bétail meurt, les amis meurent — Hávamál"},
    {t:"« Miðgarðr er víðr »",s:"Le Midgard est vaste — Edda"},
    {t:"« Hinn er sannr vinr »",s:"Celui qui dit la vérité est le vrai ami — Hávamál"}
  ],
  hindou:[
    {t:"« चरैवेति चरैवेति »",s:"Avance, toujours avance — Aitareya Brahmana"},
    {t:"« सत्यमेव जयते »",s:"La vérité seule triomphe — Mundaka Upanishad"},
    {t:"« योगः कर्मसु कौशलम् »",s:"Le yoga est l'excellence dans l'action — Bhagavad-Gîtâ"},
    {t:"« अहं ब्रह्मास्मि »",s:"Je suis Brahman — Brihadaranyaka Upanishad"}
  ],
  egyptien:[
    {t:"« Maat ka Ra »",s:"La vérité est l'essence de Rà"},
    {t:"« Nuk pu nuk »",s:"Je suis ce que je suis — Livre des Morts"},
    {t:"« Iri em hotep »",s:"Agis en paix — sagesse égyptienne"},
    {t:"« Per em heru »",s:"Sortir vers la lumière — Livre des Morts"}
  ]
};

const QUIZ = [];

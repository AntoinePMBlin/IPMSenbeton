
import { PatentFamily } from './types';

export const MOCK_FAMILIES: PatentFamily[] = [
  {
    id: 'fam-101',
    name: 'Placo-plâtre Gastronomique',
    patents: [
      { id: 'pat-101', title: 'Plaque de plâtre saveur truffe pour cloisons de luxe', applicationNumber: 'FR20230101A1', countryCode: 'FR', status: 'Granted', filingDate: '2023-01-10', publicationDate: '2024-07-15', abstract: 'Une plaque de plâtre révolutionnaire infusée aux arômes naturels de truffe noire, conçue pour les intérieurs de prestige. Idéale pour une petite faim en cas de réunion prolongée.', inventors: ['Auguste Gusteau', 'Remy Ratatouille'], applicant: 'GastroPlâtre S.A.S.' },
      { id: 'pat-102', title: 'Système de cloison comestible pour open-space', applicationNumber: 'EU20230102B1', countryCode: 'EP', status: 'Pending', filingDate: '2023-02-12', publicationDate: '2024-08-20', abstract: 'Cloisons modulaires et entièrement comestibles, permettant de réorganiser les espaces de travail tout en offrant un en-cas aux employés. Différentes saveurs disponibles.', inventors: ['Willy Wonka'], applicant: 'SnackWall Corp.' },
      { id: 'pat-103', title: 'Enduit de lissage au chocolat, faible en calories', applicationNumber: 'CH20220103A1', countryCode: 'CH', status: 'Granted', filingDate: '2022-11-05', publicationDate: '2024-05-10', abstract: 'Un enduit de finition à base de cacao pur, offrant un fini parfaitement lisse et une odeur envoûtante, sans risque pour la ligne. Ne fond pas.', inventors: ['Henri Nestlé'], applicant: 'ChocoLisse AG' },
      { id: 'pat-104', title: 'Bande à joint en réglisse comestible', applicationNumber: 'US20230104A1', countryCode: 'US', status: 'Abandoned', filingDate: '2023-03-20', publicationDate: '2024-09-25', abstract: 'Bande à joint flexible et résistante fabriquée à partir de réglisse concentrée, permettant une finition parfaite des angles tout en étant une friandise à portée de main.', inventors: ['Candy Man'], applicant: 'SweetBuild Inc.' },
    ],
  },
  {
    id: 'fam-102',
    name: 'Béton à Réaction Émotionnelle',
    patents: [
      { id: 'pat-105', title: 'Composition de béton qui change de couleur selon l\'humeur', applicationNumber: 'JP20240105A', countryCode: 'JP', status: 'Pending', filingDate: '2024-01-15', publicationDate: '2025-07-20', abstract: 'Béton intégrant des cristaux thermo-psychiques qui réagissent aux ondes cérébrales ambiantes, colorant les murs en rose pour la joie ou en bleu pour la mélancolie.', inventors: ['Dr. Emoto', 'Akira Tanaka'], applicant: 'Kansei Concrete Ltd.' },
      { id: 'pat-106', title: 'Mur en béton qui diffuse une musique douce en cas de dispute', applicationNumber: 'CA20230106A1', countryCode: 'CA', status: 'Granted', filingDate: '2023-04-01', publicationDate: '2024-10-05', abstract: 'Des capteurs de décibels et de fréquence vocale analysent les conversations. En cas de tension détectée, le mur vibre pour diffuser une mélodie apaisante.', inventors: ['Céline Dion', 'David Foster'], applicant: 'Zen Concrete Solutions' },
      { id: 'pat-107', title: 'Dalle de béton qui devient moelleuse sous les pieds fatigués', applicationNumber: 'DE20230107C1', countryCode: 'DE', status: 'Pending', filingDate: '2023-05-18', publicationDate: '2024-11-22', abstract: 'Une dalle de sol à densité variable qui s\'assouplit sous la pression prolongée, offrant un confort inégalé après une longue journée de travail.', inventors: ['Hans und Franz'], applicant: 'KomfortBeton GmbH' },
      { id: 'pat-108', title: 'Ciment qui pleure quand on oublie d\'arroser les plantes', applicationNumber: 'BR20220108A', countryCode: 'BR', status: 'Granted', filingDate: '2022-08-30', publicationDate: '2024-03-05', abstract: 'Un ciment hydrophile connecté à des capteurs d\'humidité dans les pots de fleurs. Si la terre est sèche, il suinte de petites gouttes d\'eau pour alerter les propriétaires.', inventors: ['Flora Greenleaf'], applicant: 'Planta Cimento Ltda' },
    ],
  },
  {
    id: 'fam-103',
    name: 'Cimenterie Instantanée et Magique',
    patents: [
        { id: 'pat-109', title: 'Ciment à prise ultra-rapide activée par la formule "Abracadabra"', applicationNumber: 'GB20230109A', countryCode: 'GB', status: 'Granted', filingDate: '2023-06-11', publicationDate: '2024-12-16', abstract: 'Un ciment contenant des nano-robots qui ne s\'activent qu\'à la fréquence sonore spécifique de la formule "Abracadabra", provoquant une prise quasi-instantanée.', inventors: ['Merlin l\'Enchanteur', 'Albus Dumbledore'], applicant: 'Magicrete PLC' },
        { id: 'pat-110', title: 'Truelle auto-nettoyante par lévitation des résidus', applicationNumber: 'IT20240110A1', countryCode: 'IT', status: 'Pending', filingDate: '2024-02-02', publicationDate: '2025-08-08', abstract: 'La truelle émet un champ magnétique pulsé qui fait léviter et éjecte les résidus de mortier, la gardant perpétuellement propre.', inventors: ['Leonardo da Vinci Jr.'], applicant: 'Pulito Attrezzi S.p.A.' },
        { id: 'pat-111', title: 'Bétonnière silencieuse fonctionnant aux pensées positives', applicationNumber: 'WO20230111A1', countryCode: 'WO', status: 'Pending', filingDate: '2023-07-07', publicationDate: '2025-01-12', abstract: 'Le moteur de la toupie est remplacé par un convertisseur d\'ondes thêta. Plus l\'opérateur est heureux, plus le béton est bien mélangé.', inventors: ['Maharishi Mahesh Yogi'], applicant: 'Good Vibes Construction' },
        { id: 'pat-112', title: 'Mortier-colle qui n\'adhère qu\'aux objets laids', applicationNumber: 'FR20220112B1', countryCode: 'FR', status: 'Abandoned', filingDate: '2022-09-01', publicationDate: '2024-03-06', abstract: 'Un adhésif sélectif conçu pour coller et masquer les décorations de mauvais goût. Inefficace sur les œuvres d\'art.', inventors: ['Jean-Paul Gaultier'], applicant: 'Le Bon Goût Bâtiment' },
    ],
  },
  {
    id: 'fam-104',
    name: 'Technologies de Construction Probiotiques',
    patents: [
      { id: 'pat-113', title: 'Béton auto-réparant aux ferments lactiques', applicationNumber: 'US20230113A1', countryCode: 'US', status: 'Granted', filingDate: '2023-08-15', publicationDate: '2025-02-19', abstract: 'Inclusion de bactéries lactiques dormantes qui, au contact de l\'eau dans une fissure, produisent du calcaire pour la reboucher naturellement. Donne au béton un léger goût de yaourt.', inventors: ['Dr. Elie Metchnikoff'], applicant: 'Bio-Concrete Labs' },
      { id: 'pat-114', title: 'Peinture au yaourt pour murs qui purifie l\'air', applicationNumber: 'GR20220114A', countryCode: 'GR', status: 'Granted', filingDate: '2022-10-21', publicationDate: '2024-04-26', abstract: 'Une peinture organique à base de yaourt grec qui capture les COV et diffuse une agréable fraîcheur. Ne pas confondre avec le Tzatziki.', inventors: ['Yiaourtos Papadopoulos'], applicant: 'Hellas Paints' },
      { id: 'pat-115', title: 'Isolation en kombucha expansé', applicationNumber: 'AU20230115A1', countryCode: 'AU', status: 'Pending', filingDate: '2023-09-14', publicationDate: '2025-03-20', abstract: 'Une mère de kombucha (SCOBY) est déshydratée puis réhydratée in situ pour créer une mousse isolante et respirante avec d\'excellentes propriétés thermiques.', inventors: ['Shirley Temple'], applicant: 'Fermenta-Foam Pty Ltd' },
      { id: 'pat-116', title: 'Placo-plâtre anti-moisissure à la pénicilline', applicationNumber: 'GB20220116B1', countryCode: 'GB', status: 'Granted', filingDate: '2022-12-25', publicationDate: '2024-06-30', abstract: 'Des spores de Penicillium sont intégrées dans le plâtre pour empêcher activement la croissance de toute moisissure. Peut causer des réactions chez les personnes allergiques.', inventors: ['Alexander Fleming'], applicant: 'CleanWall Industries' },
    ]
  },
  {
    id: 'fam-105',
    name: 'Enduits Muraux du Futur',
    patents: [
      { id: 'pat-117', title: 'Enduit de finition à affichage holographique', applicationNumber: 'KR20240117A', countryCode: 'KR', status: 'Pending', filingDate: '2024-03-03', publicationDate: '2025-09-08', abstract: 'Un enduit mural contenant des micro-projecteurs qui, une fois alimentés, peuvent transformer n\'importe quel mur en écran holographique 3D.', inventors: ['Kim Lee Park'], applicant: 'Samsung Display & Plaster' },
      { id: 'pat-118', title: 'Crépi extérieur qui génère un champ de force anti-graffiti', applicationNumber: 'US20240118A1', countryCode: 'US', status: 'Pending', filingDate: '2024-04-01', publicationDate: '2025-10-06', abstract: 'Le crépi émet un champ électrostatique à basse énergie qui repousse activement les aérosols de peinture, gardant les façades impeccables.', inventors: ['Nikola Tesla II'], applicant: 'Stark Exteriors' },
      { id: 'pat-119', title: 'Peinture phosphorescente qui raconte des histoires', applicationNumber: 'DK20230119B1', countryCode: 'DK', status: 'Granted', filingDate: '2023-10-02', publicationDate: '2025-04-07', abstract: 'La peinture emmagasine la lumière du jour et la restitue la nuit sous forme de motifs lumineux changeants qui racontent des contes de fées. Idéal pour les chambres d\'enfants.', inventors: ['Hans Christian Andersen'], applicant: 'Lego Paints' },
      { id: 'pat-120', title: 'Mortier capable d\'enregistrer et rejouer les conversations', applicationNumber: 'CN20230120A', countryCode: 'CN', status: 'Abandoned', filingDate: '2023-11-11', publicationDate: '2025-05-16', abstract: 'Un mortier à base de quartz piézoélectrique capable de stocker les vibrations sonores et de les restituer sur commande. Retiré du marché pour des raisons évidentes de confidentialité.', inventors: ['Agent 007'], applicant: 'Hush Mortar Inc.' },
    ]
  },
  {
    id: 'fam-106',
    name: 'Béton Végétal et Écologique',
    patents: [
      { id: 'pat-121', title: 'Béton cellulaire photosynthétique', applicationNumber: 'WO20240121A1', countryCode: 'WO', status: 'Pending', filingDate: '2024-01-20', publicationDate: '2025-07-25', abstract: 'Un béton poreux colonisé par des micro-algues qui réalisent la photosynthèse, produisant de l\'oxygène et donnant une teinte verte au bâtiment.', inventors: ['Patrick Blanc'], applicant: 'Oxy-Crete International' },
      { id: 'pat-122', title: 'Armature pour béton en bambou tressé', applicationNumber: 'VN20220122A', countryCode: 'VN', status: 'Granted', filingDate: '2022-03-15', publicationDate: '2023-09-19', abstract: 'Remplacement de l\'acier par des tiges de bambou tressées et traitées, offrant une résistance à la traction surprenante et une empreinte carbone négative.', inventors: ['Thị Lan Nguyễn'], applicant: 'Bamboo-Steel Vietnam' },
      { id: 'pat-123', title: 'Parpaing contenant un composteur intégré', applicationNumber: 'SE20230123B1', countryCode: 'SE', status: 'Granted', filingDate: '2023-05-22', publicationDate: '2024-11-26', abstract: 'Chaque parpaing possède un compartiment pour les déchets organiques, utilisant la chaleur de la décomposition pour améliorer l\'isolation du mur.', inventors: ['Greta Thunberg'], applicant: 'Eko-Block AB' },
      { id: 'pat-124', title: 'Additif pour ciment à base d\'algues', applicationNumber: 'IS20230124A', countryCode: 'IS', status: 'Pending', filingDate: '2023-08-01', publicationDate: '2025-02-05', abstract: 'Un additif extrait d\'algues islandaises qui confère au béton une élasticité remarquable, le rendant idéal pour les zones sismiques. Odeur de marée non incluse.', inventors: ['Björk Guðmundsdóttir'], applicant: 'Algae-Crete Iceland' },
    ]
  },
   {
    id: 'fam-111',
    name: 'Béton à Lévitation',
    patents: [
      { id: 'pat-141', title: 'Béton supraconducteur pour lévitation magnétique', applicationNumber: 'US20250141A1', countryCode: 'US', status: 'Pending', filingDate: '2025-01-15', publicationDate: '2026-07-20', abstract: 'Composition de béton intégrant des particules d\'YBaCuO qui, refroidies à l\'azote liquide, permettent à la structure de léviter au-dessus d\'un champ magnétique. Coût de refroidissement non inclus.', inventors: ['Elon Musk'], applicant: 'Boring Concrete Co.' },
      { id: 'pat-142', title: 'Système de fondation magnétique pour maisons flottantes', applicationNumber: 'JP20240142A', countryCode: 'JP', status: 'Pending', filingDate: '2024-02-20', publicationDate: '2025-08-25', abstract: 'Les fondations traditionnelles sont remplacées par des électroaimants surpuissants repoussant un champ magnétique terrestre localement amplifié. Permet de déplacer sa maison.', inventors: ['Hayao Miyazaki'], applicant: 'Ghibli Construction' },
      { id: 'pat-143', title: 'Additif anti-gravité pour projection de béton', applicationNumber: 'RU20230143A', countryCode: 'RU', status: 'Granted', filingDate: '2023-03-10', publicationDate: '2024-09-15', abstract: 'Un additif à base de cavorite (matériau fictif) qui annule temporairement la gravité du béton projeté, permettant de construire des plafonds sans aucun support.', inventors: ['H. G. Wells'], applicant: 'Roscosmos Concrete' },
      { id: 'pat-144', title: 'Chaussée en béton à lévitation pour véhicules sans roues', applicationNumber: 'DE20250144C1', countryCode: 'DE', status: 'Pending', filingDate: '2025-03-01', publicationDate: '2026-09-05', abstract: 'Une route intelligente qui génère des coussins magnétiques localisés sous les véhicules compatibles, éliminant la friction et l\'usure des pneus.', inventors: ['Ferdinand Porsche'], applicant: 'Autobahn Maglev GmbH' },
      { id: 'pat-145', title: 'Tuile en béton à sustentation pour toiture auto-ajustable', applicationNumber: 'FR20240145B1', countryCode: 'FR', status: 'Granted', filingDate: '2024-04-05', publicationDate: '2025-10-10', abstract: 'Chaque tuile flotte à quelques millimètres de la charpente, s\'ajustant dynamiquement pour une étanchéité parfaite et une ventilation optimale. Siffle en cas de grand vent.', inventors: ['Philippe Starck'], applicant: 'Toitures du Futur S.A.' },
    ]
  },
  {
    id: 'fam-112',
    name: 'Plâtrerie Thérapeutique',
    patents: [
      { id: 'pat-146', title: 'Cloison sèche enrichie en sels de magnésium', applicationNumber: 'US20230146A1', countryCode: 'US', status: 'Granted', filingDate: '2023-05-19', publicationDate: '2024-11-23', abstract: 'Plâtre transdermique qui libère du magnésium au contact de la peau, favorisant la relaxation musculaire et le sommeil. Recommandé pour les murs de chambres à coucher.', inventors: ['Dr. Andrew Weil'], applicant: 'Wellness Walls Inc.' },
      { id: 'pat-147', title: 'Plafond en plâtre diffusant des ions négatifs', applicationNumber: 'CA20220147A1', countryCode: 'CA', status: 'Granted', filingDate: '2022-06-21', publicationDate: '2023-12-25', abstract: 'Un plâtre spécial qui, sous l\'effet de la chaleur ambiante, génère des ions négatifs, recréant l\'atmosphère d\'une cascade ou d\'une forêt et améliorant l\'humeur.', inventors: ['David Suzuki'], applicant: 'Nature-Plaster Corp.' },
      { id: 'pat-148', title: 'Enduit de lissage à base d\'argile et d\'huiles essentielles', applicationNumber: 'FR20230148B1', countryCode: 'FR', status: 'Pending', filingDate: '2023-10-11', publicationDate: '2025-04-16', abstract: 'Un enduit naturel qui combine les bienfaits de l\'argile et de l\'aromathérapie, avec des capsules d\'huiles essentielles qui se libèrent au fil du temps.', inventors: ['Jeanne Calment'], applicant: 'Provence Enduits & Bien-être' },
      { id: 'pat-149', title: 'Bande à joint qui émet des fréquences sonores apaisantes', applicationNumber: 'DE20240149C1', countryCode: 'DE', status: 'Pending', filingDate: '2024-01-30', publicationDate: '2025-08-04', abstract: 'Intégration de micro-transducteurs piézoélectriques dans la bande à joint, émettant des battements binauraux à basse fréquence pour réduire le stress.', inventors: ['Klaus Meine'], applicant: 'Harmonie Bau GmbH' },
      { id: 'pat-150', title: 'Plaque de plâtre chauffante imitant une pierre chaude', applicationNumber: 'JP20230150A', countryCode: 'JP', status: 'Granted', filingDate: '2023-07-15', publicationDate: '2025-01-19', abstract: 'Plaque de plâtre avec un réseau de fils de carbone qui génère une chaleur douce et pénétrante, simulant une séance de massage aux pierres chaudes. Faible consommation.', inventors: ['Tadashi Yanai'], applicant: 'Uniqlo Home' },
    ]
  }
];

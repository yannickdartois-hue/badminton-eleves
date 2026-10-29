/* aide.js — mode d'emploi de l'appli élève badminton (lu par eps-aide.js) */
window.EPS_AIDE={appli:'Badminton · Élève',bouton:false,publics:[
{id:'eleve',titre:'Élève',chapitres:[
{t:'Commencer (premier cours)',html:`<ol>
<li><b>Mon groupe</b> → <span class="bouton">Scanner le QR de la classe</span> : vise le QR que le professeur affiche.</li>
<li>Choisissez vos noms dans la liste (2 ou 3 élèves par tablette).</li>
<li>Choisissez un <b>code secret à 4 chiffres</b> et retenez-le : il ouvre votre carnet à chaque cours. Un autre groupe ne peut pas le lire.</li>
</ol><p class="astuce">Aux cours suivants : touche le nom de ton groupe sur l’accueil, puis le code.</p>`},
{t:'Mon étoile',html:`<ul><li>Pendant un match, le <b>coach</b> note comment son joueur gagne ses points : <b>0</b> volant au centre ou faute de l’adversaire, <b>1</b> volant non renvoyé hors du centre, <b>2</b> smash non renvoyé, <b>3</b> stratégie annoncée et réalisée, <b>x</b> service raté ou faute sur un volant facile.</li>
<li>L’étoile a 7 axes et 4 niveaux : <b>rouge</b>, <b>jaune</b>, <b>vert</b>, <b>vert foncé</b> (le niveau est aussi écrit en chiffre, de 1 à 4).</li>
<li>Tes 2 axes les plus faibles deviennent tes axes de travail. Refais ton étoile en fin de cycle.</li></ul>`},
{t:'Pendant la séance',html:`<ul><li>La séance du jour s’ouvre toute seule (n° 1 à 9 en haut pour en changer).</li>
<li>Choisis <b>2 axes de travail</b>, puis un exercice du catalogue. Touche l’image pour voir la vidéo (internet nécessaire). Un bandeau jaune « vidéo à vérifier » signale une vidéo dont le titre est incertain.</li>
<li>Coche le <b>niveau atteint</b> : il compte quand un camarade (l’observateur) ou le professeur le <b>vérifie</b>.</li>
<li>Termine par le <b>match à thème</b> de ton axe : coche « validé » quand tu l’as réussi.</li></ul>`},
{t:'Poule et tableau de marque',html:`<ul><li><b>Poule</b> → <span class="bouton">Scanner le QR de la poule</span> (préparé par le professeur), ou saisis la poule à la main. Une poule = un terrain ; une seule tablette par terrain saisit les scores.</li>
<li><b>Tableau de marque</b> : touche le côté du joueur qui gagne l’échange. Celui qui gagne l’échange sert, de la droite si son score est pair. Au temps : chrono, pause, « Fin du match ».</li>
<li>Match de 4 min ou plus : à la mi-temps, le chrono s’arrête et le <b>temps mort</b> du coach s’ouvre (1 min).</li>
<li><b>Projets</b> : annonce comment tu prévois de gagner ; l’arbitre dit après le match s’il est réalisé.</li></ul>`},
{t:'Évaluation finale (séances 8 et 9)',html:`<ul><li>Pour chaque match : bouton <span class="bouton">📝 Analyse</span>. Écris le style de jeu de ton adversaire et ses points forts et faibles, ta stratégie, puis ce que tu changes à la mi-temps et ce que tu retiens après le match.</li>
<li>Onglet Séance : <b>Ma gestion des 15 minutes</b> (échauffement en duo, puis en duel).</li>
<li>Le professeur lit ces analyses pour noter ton projet de jeu (AFL1) et ton analyse (AFL2).</li></ul>`},
{t:'Envoyer en fin de séance',html:`<ul><li><b>Envoyer</b> → <span class="bouton">Montrer le QR code</span> au professeur (un QR par élève, puis un pour la poule), ou envoi en ligne si le professeur l’a activé.</li>
<li>Un bandeau rouge rappelle une séance non envoyée.</li>
<li>Un élève change de groupe : <b>Mon groupe</b> → « … part », puis sur l’autre tablette « Scanner le QR de l’élève qui arrive ».</li></ul>`}]}
]};

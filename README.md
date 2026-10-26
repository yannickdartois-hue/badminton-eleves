# Badminton · Élève (GAREEPS)

Appli élève hors ligne du lycée Georges Pompidou, sur le modèle de l'appli de tennis de table. Une tablette pour 2 ou 3 élèves, 7 terrains.

**En ligne :** https://yannickdartois-hue.github.io/badminton-eleves/ · démo : `…/badminton-eleves/?demo`

- **Étoile** : grille du coach (codes 0, 1, 2, 3, x), étoile à 7 axes et 4 niveaux (rouge, jaune, vert, vert foncé), pistes de travail.
- **Séance** (1 à 9) : 2 axes, exercice du catalogue GAREEPS badminton (13 thèmes, 44 exercices), niveau atteint vérifié par un observateur, match à thème validé.
- **Poule** : une poule = un terrain. Matchs **au temps** (2 à 6 min, égalité = nul) ou **en points** (1 set de 11, 15 ou 21 ; 2 sets gagnants ; 2 sets secs de 11). Classement : victoire 3, nul 2, défaite 1, forfait 0 ; égalité : matchs entre ex aequo, différence de sets, de points. Format proposé : au temps en séances 1 à 3, en points ensuite, matchs de 4 min en séance 9 (évaluation GAREEPS). Match de 4 min ou plus : à la mi-temps, le chrono s'arrête et le temps mort du coach s'ouvre.
- **Rencontre de binômes** (forme de l'épreuve) : A1–B1, A2–B2, A1–B2, A2–B1, puis le double, en 2 sets secs de 11 ; à 1 set partout, le total des points départage. Mode d'entraînement : la note suit la grille GAREEPS (outil prof).
- **Tableau de marque** : chaque échange = 1 point, le gagnant de l'échange sert, de la droite si son score est pair. Au temps : compte à rebours, pause, « Fin du match ». Codes du coach, projets de jeu, temps mort guidé.
- **Règles** : comptage, service, gestes techniques, code du coach, les 13 matchs à thème.
- **Envoyer** : QR code par élève (+ un pour la poule), ou fichiers JSON à déposer dans le Nuage.

## Illustrations et vidéos
- **Images** : découpées dans le document « BAD cycle complet, dernière version » (fiches GAREEPS) : les 44 exercices des thèmes 1 à 12 et 10 matchs à thème, dans `img/` (`exN.jpg`, `mtN.jpg`), listés dans `images.js` et dans `sw.js` (`IMAGES`). Les matchs à thème 4, 6 et 13 (et les exercices du double D1 à D3) n'ont pas d'image dans le document : l'appli montre le schéma de terrain du cycle.
- **Vidéos** : `videos.js`, une ligne par vidéo (même format que le tennis de table). Vide pour l'instant : à remplir quand la chaîne PeerTube sera de nouveau en ligne.

## Fichiers
- `donnees.js` : données GAREEPS reprises de `cycle-badminton` (cycle-badminton-old.html), sans modification. Le thème 13 (double) vient de l'outil du cycle : le carnet d'origine en a 12.
- `schemas.js` : schémas de terrain, copie de `badminton-donnees.js` du dépôt cycle-badminton.
- `logique.js`, `scan.js`, `qrcode.js`, `jsqr.js` : copiés dans **badminton-prof** ; garder la même version dans les deux dépôts.
- Après une modification : augmenter `CACHE` dans `sw.js`.

QR : `BDE1:` + JSON compact compressé (deflate-raw, base64url). Codes secrets des groupes, copie de secours chiffrée, transfert d'élève, démo : comme l'appli de tennis de table.

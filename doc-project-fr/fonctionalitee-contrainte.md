# CAE1D - Fonctionalités et contraintes

## Fonctions principales

Cette partie liste les exigences fermes de fonctionalité du projet.

- Calculer et afficher n'importe quel automate cellulaire tels qu'ils sont défini dans [présentation des automates cellulaires [2]](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-automate-cellulaire.md).

  - Le comportement des bords de l'automate cellulaire doit être paramétrable (état fixe, topologie circulaire, etc...).
  - L'automate cellulaire dois pouvoir défiler indéfiniment.

- Faire varier la vitesse de calcul et défilement de l'automates cellulaire
- Mettre le défilement de l'automate en pose
- Afficher la propagation des effet du changement d'une cellule
- Intervenir sur une cellule pour forcer un état ; il s'en suit le recalcul de l'état des cellules qui dépendent ce la cellule modifiée
- Demander le calcul d'un saut, un certain nombre de générations dans le futur

## Fonctionalités secondaires

Cette partie liste les objectifs de fonctionalité plus flexibles du projet.

- Détecter et colorer des motifs horizontaux décrits par l'utilisateur
- Détecter et colorer les motifs de "grille" décrits par l'utilisateur (notablement pour la règle 110 et ses soeurs)
- Automate cellulaire de taille horizontale supérieur à celle la taille de l'écran
- Paramétrage du comportement l'automate cellulaire lors du redimentionnement de l'affichage
- Remplacement du moteur de calcul des générations de cellules pour le calcul des sauts
- Scriptage temporel et sur évènement de l'automate cellulaire et de la configuration de l'explorateur (permettre à un développeur de scénariser une expérience scripté pour un utilisateur novice)
- Définition d'automate cellulaire sous forme de code source utilisateur

Le support des fonctionalités suivantes pourra faire l'objet d'un travail de réflexion ou d'exploration, qui pourra être être pris en compte dans la conception des interfaces:

- Utilisation de code source utilisateur pour les sauts

## Contraintes non fonctionelles

Cette partie liste les contraintes d'environnement d'execution et de peformance du projet, ainsi que des contraites de modularité sur la structure du projet.

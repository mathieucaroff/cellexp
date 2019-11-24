# CAE1D - Fonctionnalités et contraintes

## Fonctions principales

Cette partie liste les exigences fermes de fonctionnalité du projet.

- Calculer et afficher n'importe quel automate cellulaire tels qu'ils sont définis dans [présentation des automates cellulaires [2]](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-automate-cellulaire.md).

  - Le comportement des bords de l'automate cellulaire doit être paramétrable (état fixe, topologie circulaire, etc...).
  - L'automate cellulaire doit pouvoir défiler indéfiniment.

- Faire varier la vitesse de calcul et de défilement de l'automate cellulaire
- Mettre le défilement de l'automate en pause
- Afficher la propagation des effets du changement d'une cellule
- Intervenir sur une cellule pour forcer un état ; il s'ensuit le recalcul de l'état des cellules qui dépendent de la cellule modifiée
- Demander le calcul d'un saut, un certain nombre de générations dans le futur

## Fonctionnalités secondaires

Cette partie liste les objectifs de fonctionnalité plus flexibles du projet.

- Détecter et colorer des motifs horizontaux décrits par l'utilisateur
- Détecter et colorer les motifs de "grille" décrits par l'utilisateur (notablement pour la règle 110 et ses soeurs)
- Automate cellulaire de taille horizontale supérieure à celle la taille de l'écran
- Paramétrage du comportement l'automate cellulaire lors du redimensionnement de l'affichage
- Remplacement du moteur de calcul des générations de cellules pour le calcul des sauts
- Scriptage temporel et sur évènement de l'automate cellulaire et de la configuration de l'explorateur (permettre à un développeur de scénariser une expérience scriptée pour un utilisateur novice)
- Définition d'automate cellulaire sous forme de code source utilisateur

Le support des fonctionnalités suivantes pourra faire l'objet d'un travail de réflexion ou d'exploration, qui pourra être pris en compte dans la conception des interfaces:

- Utilisation de code source utilisateur pour les sauts

## Contraintes non fonctionelles

Cette partie liste les contraintes d'environnement d'exécution et de performance du projet, ainsi que des contraintes de modularité sur la structure du projet.

# CAE1D - Explorateur d'automate cellulaire unidimensionnel

Un automate cellulaire est un simulateur basé sur une grille de cellules. À chaque pas de temps, un nouvel état est calculé pour chaque cellule, à partir de son état précédent et de l'état des cellules voisines.

Les automates cellulaires (AC) existent avec des grilles de différentes dimensions. L'AC le plus célèbre est le jeu de la vie, de John Horton Conway. C'est un AC de dimension 2. En dimension 1, l'AC le plus connu est la règle 110. Elle partage avec le jeu de la vie, la caractéristique de Turing-completness, aussi dite universalité: tout calcule discret peut-être simulé dans ces automates cellulaires.

Aux premiers abords, les automates cellulaires sont intéressants pour leur aspects ludique. Cependant, malgrès leur remarquable simplicité, ils affichent des comportement d'une grande complexité. Ainsi, les automates cellulaires sont étudiés en sciences de l'information. Il constituent d'une part des sujets d'enseignement avec d'intéressantes qualités pédagogiques, et d'autres part d'utils modèles théorique. On peu distinguer deux approches dans l'étude des automates cellulaires:

- (E1) La recherche d'automates cellulaire simple et intéressants et leur propriétés
- (E2) La construction d'automates cellulaires aux propriétés spécifiques, pouvant s'insiprer de situation réelles

Malgrès l'utilité des automates cellulaires, les outils riches en fonctionalités permettant leur exploration et de visualisation sont peu nombreux. Pour les automates cellulaires 2D, Golly est incontestablement l'outils avec le plus de fonctionalité. On trouve aussi LifeViewer, un simulateur web gratuit, mais propriétaire. Pour les automates cellulaires 1D, aucun outils ne se démarque : l'outils qui propose le plus de fonctialités est Wolfram Alpha.

Ce projet vise à produire cet outil : un explorateur d'automate cellulaire 1D web.

## Existant

### Conceptes et définitions

#### Automates cellulaires

Se référer à la [présentation des automates cellulaires [2]](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-automate-cellulaire.md).

## Cahier des charges logiciel

### Fonctions principales

Cette partie liste les exigences fermes de fonctionalité du projet.

- Calculer et afficher n'importe quel automate cellulaire tels qu'ils sont défini dans [présentation des automates cellulaires [2]](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-automate-cellulaire.md).

  - Le comportement des bords de l'automate cellulaire doit être paramétrable (état fixe, topologie circulaire, etc...).
  - L'automate cellulaire dois pouvoir défiler indéfiniment.

- Faire varier la vitesse de calcul et défilement de l'automates cellulaire
- Mettre le défilement de l'automate en pose
- Afficher la propagation des effet du changement d'une cellule
- Intervenir sur une cellule pour forcer un état ; il s'en suit le recalcul de l'état des cellules qui dépendent ce la cellule modifiée
- Demander le calcul d'un saut, un certain nombre de générations dans le future

### Fonctionalités secondaires

Cette partie liste les objectifs de fonctionalité plus flexibles du projet.

- Détecter et colorer des motifs horizontaux décrits par l'utilisateur
- Détecter et colorer les motifs de "grille" décrits par l'utilisateur (notablement pour la règle 110 et ses soeurs)
- Automate cellulaire de taille horizontale supérieur à celle la taille de l'écran
- Paramétrage du comportement l'automate cellulaire lors du redimentionnement de l'affichage
- Remplacement du moteur de calcul des générations de cellules pour le calcul des sauts
- Scriptage temporel et sur évènement de l'automate cellulaire et de la configuration de l'explorateur (permettre à un développeur de scénariser une expérience scripté pour un utilisateur novice)

Le support des fonctionalités suivantes pourra faire l'objet d'un travail de réflexion ou d'exploration, qui pourra être être pris en compte dans la conception des interfaces:

- Utilisation de code utilisateur pour

### Contraintes non fonctionelles

Cette partie liste les contraintes d'environnement d'execution et de peformance du projet, ainsi que des contraites de modularité sur la structure du projet.

### Esprit de design

## Références

1. Le glossaire en français du projet [glossaire](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/glossaire.md)
2. La présentation du concepte d'[automate cellulaire](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-automate-cellulaire.md)
3. La présentation des [profils d'utilisateur](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/presentation-profile-utilisateur.md)

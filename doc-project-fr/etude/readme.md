# CAE1D - Explorateur d'automate cellulaire unidimensionnel

_Le [glossaire] défini la plupart des termes techniques utilisés_

Un automate cellulaire est un simulateur basé sur une grille de cellules. À chaque pas de temps, un nouvel état est calculé pour chaque cellule, à partir de son état précédent et de l'état des cellules voisines.

Les automates cellulaires (AC) existent avec des grilles de différentes dimensions. L'AC le plus célèbre est le jeu de la vie, de John Horton Conway. C'est un AC de dimension 2. En dimension 1, l'AC le plus connu est la règle 110. Elle partage avec le jeu de la vie, la caractéristique de Turing-completness, aussi dite universalité : tout calcul discret peut-être simulé dans ces automates cellulaires.

Au premier abord, les automates cellulaires sont intéressants pour leur aspect ludique. Cependant, malgré leur remarquable simplicité, ils affichent des comportements d'une grande complexité. Ainsi, les automates cellulaires sont étudiés en sciences de l'information. Ils constituent d'une part des sujets d'enseignement avec d'intéressantes qualités pédagogiques, et d'autre part d'utiles modèles théoriques. On peut distinguer deux approches dans l'étude des automates cellulaires :

- (E1) La recherche d'automates cellulaires simples et intéressants et la recherche de leurs propriétés
- (E2) La construction d'automates cellulaires aux propriétés spécifiques, pouvant s'inspirer de situations réelles

Malgré l'utilité des automates cellulaires, les outils riches en fonctionnalités permettant leur exploration et leur visualisation sont peu nombreux. Pour les automates cellulaires 2D, Golly est incontestablement l'outil avec le plus de fonctionnalités. On trouve aussi LifeViewer, un simulateur web gratuit, mais propriétaire. Pour les automates cellulaires 1D, aucun outil ne se démarque : l'outil qui propose le plus de fonctionnalités est Wolfram Alpha.

Ce projet vise à produire cet outil : un explorateur d'automate cellulaire 1D web.

1. [Automates cellulaires](./automate-cellulaire.md)
2. [Fonctionnalités](./fonctionnalite.md)
3. [Roadmap](./roadmap.md)

_La [bibliographie](./bibliographie.md) liste des ressources utiles_

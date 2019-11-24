# CAE1D - Explorateur d'automate cellulaire unidimensionnel

Un automate cellulaire est un simulateur basé sur une grille de cellules. À chaque pas de temps, un nouvel état est calculé pour chaque cellule, à partir de son état précédent et de l'état des cellules voisines.

Les automates cellulaires (AC) existent avec des grilles de différentes dimensions. L'AC le plus célèbre est le jeu de la vie, de John Horton Conway. C'est un AC de dimension 2. En dimension 1, l'AC le plus connu est la règle 110. Elle partage avec le jeu de la vie, la caractéristique de Turing-completness, aussi dite universalité: tout calcule discret peut-être simulé dans ces automates cellulaires.

Aux premiers abords, les automates cellulaires sont intéressants pour leur aspects ludique. Cependant, malgé leur remarquable simplicité, ils affichent des comportement d'une grande complexité. Ainsi, les automates cellulaires sont étudiés en sciences de l'information. Il constituent d'une part des sujets d'enseignement avec d'intéressantes qualités pédagogiques, et d'autres part d'utiles modèles théorique. On peu distinguer deux approches dans l'étude des automates cellulaires:

- (E1) La recherche d'automates cellulaire simple et intéressants et leur propriétés
- (E2) La construction d'automates cellulaires aux propriétés spécifiques, pouvant s'inspirer de situation réelles

Malgrès l'utilité des automates cellulaires, les outils riches en fonctionalités permettant leur exploration et de visualisation sont peu nombreux. Pour les automates cellulaires 2D, Golly est incontestablement l'outils avec le plus de fonctionalité. On trouve aussi LifeViewer, un simulateur web gratuit, mais propriétaire. Pour les automates cellulaires 1D, aucun outils ne se démarque : l'outils qui propose le plus de fonctialités est Wolfram Alpha.

Ce projet vise à produire cet outil : un explorateur d'automate cellulaire 1D web.

1. [Glossaire](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/glossaire.md)
2. [État de l'art](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/glossaire.md)
3. [Fonctionalités et contraintes](https://github.com/mathieucaroff/cellular-automaton-explorer-1d/blob/master/doc-project-fr/fonctionalitee-contrainte.md)

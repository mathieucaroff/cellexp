# Presentation du concepte d'automate cellulaire

Voire:
https://fr.wikipedia.org/wiki/Automate_cellulaire

Une partie du contenu ci-dessous est extrait des pages wikipédia en lien (le 2019-11-12). Le reste du contenu est original.

## Automate cellulaire

Un automate cellulaire est un simulateur basé sur une grille de cellule. À chaque pas de temps, un nouvel état est calculé pour chaque cellule, à partir de son état précédent et de l'état des cellules voisines. Chaque pas de temps corresponds à une génération de cellule.

Dans les automates cellulaires standards, la liste complète des états que peu prendre une cellule est prédéfinie et est statique. De même, le voisinage de cellule est clairement identifé par l'ensemble des positions relatives des cellules du voisinage. La rêgle d'évolution est alors défini comme une fonction qui associe à chaque cellule un nouvel état en fonction de la liste des états des cellule du voisinage. Ainsi, avec les notations suivantes:

n: dimension de l'automate cellulaire
Z^n: espace des position des cellules de l'automate
S: ensemble des état possibles pour une cellule
V, partie de Z^n: ensemble définissant la forme des voisinages

la fonction d'évolution est alors un élément de:

S ^ (S ^ V)

## Exemple

### Le jeu de la vie

Voire:
https://fr.wikipedia.org/wiki/Jeu_de_la_vie

Le jeu de la vie est un automate cellulaire imaginé par John Horton Conway en 1970 et qui est probablement le plus connu de tous les automates cellulaires. Malgré des règles très simples, le jeu de la vie est Turing-complet.

Le « jeu » se déroule sur une grille à deux dimensions, théoriquement infinie (mais de longueur et de largeur finies et plus ou moins grandes dans la pratique), dont les cases — qu’on appelle des « cellules », par analogie avec les cellules vivantes — peuvent prendre deux états distincts : « vivante » ou « morte ».

À chaque étape, l’évolution d’une cellule est entièrement déterminée par l’état de ses huit voisines de la façon suivante :
Une chute de « bombes » non périodique.

- Une cellule morte possédant exactement trois voisines vivantes devient vivante (elle naît).
- Une cellule vivante possédant deux ou trois voisines vivantes le reste, sinon elle meurt.

### Les automates cellulaires élémentaires

Les automates cellulaire élémentaires figure parmis les automates cellulaire les plus simples qui puissent être concus. Ils sont au nombre de 256. Ils sont définits par les caractéristiques suivantes:

- Dimensionalité d de 1: Le réseau est simplement E = **Z**
- 2 états possibles: 0 ou 1 - mort ou vivant - Q = {0, 1}
- Voisinages de 3 cellules: V = {-1, 0, 1}

Notons q et v les cardinals de Q et V. La formule donnant le nombre de rêgles d'évolution en fontion du nombre d'état et de la taille des voisinages est:

`q ** (q ** v)`

Dans ces condition, les rêgles d'évolution sont au nombre de `2 ** (2 ** 3),` soit `2 ** 8`, d'ou 256 rêgles d'évolution possibles.

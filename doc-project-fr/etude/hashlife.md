# Hashlife

Hashlife est un algorithme de calcul d'automate cellulaire permettant d'accélérer le calcul des automates cellulaires présentant des régularités, au prix d'une consomation de la mémoire vive plus élevée.

Cet article présente le principe de fonctionnement de Hashlife. Ce principe de fonctionnement s'applique à des automates cellulaires en dimension arbitraire, avec des voisinages de taille arbitraire et un nombre d'état arbitraire.

## Automate simple

Dans cet article, par soucis de simplicité, le fonctionnement de hashlife ne sera décrit que pour les automates que nous appelerons "automates simples". Ils s'agit des automates de **dimension 1**, avec des voisinages de **deux cellules** et avec **trois états** possible par cellule (trois couleurs). Nous supposerons que la simulation de ces automates est réalisé dans un espace infini.

## Stratégie

Hashlife permet l'accélération des calculs de simulation d'un automate cellulaire. Cette accélération combine plusieurs stratégies :

- Réaliser les opérations sur des blocs de cellules, plutôt que sur des cellules seules.
- Calculer plusieurs générations dans le future, plutôt que calculer les générations une par une.
- Réutiliser les résultats précédemment calculés.

Pour expliquer comment ces principes sont mis en place par Hashlife, nous allons présenter un concepte de notre crue : les automates d'accélérations

## Automate d'accélération

Un automate d'accélération est un automate construit à partir d'un autre automate, permettant un calcul accéléré de celui-ci, mais avec une utilisation plus importante de la mémoire vive. Nous allons décrire `a`, la fonction de construction d'un automate d'accélération à partir d'un automate donné.

Soit Z un automate simple. Appelons A son automate d'accélération : A = a(Z).

A à les caractéristiques suivantes:

- A est de dimension 1 (comme Z)
- A à un voisinage de taille 2 (comme Z)
- A à 9 états (3 x 3, Z ayant 3 états)

A combine les états de Z deux à deux. Les états de A sont **composites**. Il est possible d'extraire deux états de Z d'un état de A. Nous allons voire comment le calcul d'une génération de A corresponds au calcul de deux générations de Z.

### Règle locale de transition d'un automate d'accélération

Notons A.f règle de transition locale de A et Z.f la règle de transition locale de Z. A ayant des voisinages de taille 2, A.f accèpte en entré l'état de deux cellules. Notons ces états P et R.

On décomposes ces deux états de A en quatre états de Z : P devient p et q, et R devient r et s. On applique trois fois la fonction Z.f, obtenant trois nouveaux états : u, v et w :

u = Z.f(p, q)
v = Z.f(q, r)
w = Z.f(r, s)

Appliquons deux fois de plus la fonction Z.f pour obtenir x et y:

x = Z.f(u, v)
y = Z.f(v, w)

Combinons les deux états de Z, "x" et "y", en un état X de A. X est l'état de sorti produit par la règle de transition locale de A :

A.f(P, R) = X

***Ce document est en cours d'écriture***

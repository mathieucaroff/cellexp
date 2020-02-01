# Hashlife

- _Le [glossaire](./glossaire.md) définit la plupart des termes techniques utilisés._

- _Cet article fait référence au concept d'automate cellulaire tel qu'il est présenté dans l'article [Automate cellulaire](./automate-cellulaire.md)._

---

Hashlife est un algorithme de calcul d'automate cellulaire permettant d'accélérer le calcul des automates cellulaires présentant des régularités. Le contrepartie de cette accélération est une consomation de la mémoire vive plus élevée.

Cet article présente le principe de fonctionnement de Hashlife. Ce principe de fonctionnement s'applique à des automates cellulaires en dimension arbitraire, avec des voisinages de taille arbitraire et un nombre d'état arbitraire.

## Automate simple

Dans cet article, par soucis de simplicité, le fonctionnement de hashlife ne sera décrit que pour les automates que nous appelerons "automates simples". Ils s'agit des automates de **dimension 1**, avec des voisinages de **deux cellules**. Il n'y a pas de contrainte sur le nombre d'états ni sur la règle de transition locale. Par ailleurs, nous supposerons que la simulation de ces automates est réalisé dans un espace infini.

## Stratégie

L'algorithme Hashlife permet l'accélération des calculs de simulation d'un automate cellulaire. Cette accélération combine plusieurs stratégies :

- Réaliser les opérations sur des blocs de cellules, plutôt que sur des cellules seules.
- Calculer plusieurs générations dans le futur, plutôt que calculer les générations une par une.
- Réutiliser les résultats précédemment calculés.

Pour expliquer comment Hashlife applique ces principes, nous allons présenter un concept de notre crue : les **automates d'accélérations**.

## Automate d'accélération

Un automate d'accélération (A) est un automate construit à partir d'un autre automate (Z), permettant un calcul accéléré de (Z), au prix d'une utilisation plus importante de la mémoire vive. Nous allons décrire (Fa) : la fonction de construction d'un automate d'accélération à partir d'un automate donné.

Soit Z un automate simple à 3 états. Z est donc de dimension 1 et à un voisinage de taille 2.

Appelons A l'automate d'accélération de Z : A = Fa(Z).

A à alors les caractéristiques suivantes:

- A est de dimension 1 (comme Z)
- A à un voisinage de taille 2 (comme Z)
- A à 9 états (3 x 3, Z ayant 3 états)

A combine les états de Z deux à deux. Les états de A sont **composites**. Il est possible d'extraire deux états de Z d'un état de A. Nous allons voire comment le calcul d'une génération de A corresponds au calcul de deux générations de Z.

### Règle locale de transition d'un automate d'accélération

Notons `A.f` règle de transition locale de A et `Z.f` la règle de transition locale de Z. A ayant des voisinages de taille 2, A.f accèpte en entré l'état de deux cellules. Notons ces états P et R.

On décomposes ces deux états de A en quatre états de Z : P devient p et q, et R devient r et s. On applique trois fois la fonction Z.f, obtenant trois nouveaux états : u, v et w :

```
u = Z.f(p, q)
v = Z.f(q, r)
w = Z.f(r, s)
```

u, v et w ne sont que des états intermédiaires. Appliquons donc deux fois de plus la fonction Z.f pour obtenir x et y:

```
x = Z.f(u, v)
y = Z.f(v, w)
```

Combinons les deux états de Z, "x" et "y", en un état X de A. X est l'état de sorti produit par la règle de transition locale de A :

```
A.f(P, R) = X
```

Cette construction de la règle de transition locale de l'automate accéléré A
calcul donc deux générations de l'automate d'origine Z.

- Réaliser les opérations sur des blocs de cellules, plutôt que sur des cellules seules.
- Calculer plusieurs générations dans le futur, plutôt que calculer les générations une par une.
- Réutiliser les résultats précédemment calculés.

### Accélération efféctive des calculs

L'automate d'accélération A évolue deux fois plus rapidement que l'automate Z.
Cependant, cet accélération ne sera efféctive que si le calcul de A est suffisament rapide : Si le calcul d'une génération de A est plus lent que le calcul de deux générations de Z, aucun gains en vitesse de calcul n'est retiré.

Pour assuré une bonne vitesse de calcul pour A, la solution est de **mémoïsé**
la fonction A.f : à chaque fois qu'on calcul A.f pour un argument (P, R), on
enregistre cet arguments, ainsi que le résultat associé (X). Pour tout les
calculs future de A.f, il sera possible d'éviter de ré-effectuer des calculs
déjà faits en se référents au résultats enregistrés.

## Automates d'accélération imbriqués

Dans le premier exemple d'automate d'accélération que nous avons donné, le
principe était appliqué à Z : un automate simple à trois états. Cependant, le
principe décrit fonctionne quelque soit le nombre d'état de l'automate auquel on
l'applique, pourvue que cet automate soit effectivement **simple**.

Remarquons maintenant que A, l'automate d'accélération résultant de Z, est
effectivement simple. En effet, Fa, la fonction de construction d'automate d'accélération est une fonction qui s'applique à un automate simple et qui produit un automate simple. _Remarquons juste que le nombre d'états de l'automate d'accélération est le carré du nombre d'état de son automate d'origine._

Les automates d'accélérations sont des automates simples (i.e. automates de dimension 1, avec des voisinages de taille 2), il est possible de leur appliqué
la fonction Fa et ainsi de produire des automates d'accélération d'automates
d'accélération. On peut ainsi définir un automate B: `B = Fa(A) = Fa(Fa(Z))`.

Cette procédure ne se limite pas à deux applications successive de Fa. Nous
pouvons appliqué Fa autant de fois que nous le désirons, et ainsi produire des
automates de vitesse arbitraire.

Dans la suite de ce document, nous utiliserons la notations `(f ^ N)`, ou `f`
est une fonction, et `N` est un entier naturel pour désigner la composition de
`f` avec elle-même `N` fois. Si `N` vaut 0, `(f ^ N)` est la fonction identité.

Ainsi:

```
(Fa ^ 0)(Z) = Z
(Fa ^ 1)(Z) = Fa(Z)
(Fa ^ 2)(Z) = Fa(Fa(Z))
(Fa ^ 3)(Z) = Fa(Fa(Fa(Z)))
```

**_Ce document est en cours d'écriture_**

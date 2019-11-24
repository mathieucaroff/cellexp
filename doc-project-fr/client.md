# Souhaits du client

_Expression des besoins_

Pour chaque fonctionnalité, le client exprime différentes idées qu'il a du produit final, associé à différents niveaux de satisfaction. Ces idées sont triées par ordre croissant de satisfaction.

## Affichage

- une cellule par pixel

### Zoom

Attentes:

- le changement de zoom doit préserver les couleurs affichées. Si de nouvels
  couleurs apparaissent, cela doit être parcequ'une fonctionnalité le demande

Souhaits:

- agrandir: plusieurs pixel par cellule
- minimap affichant la position et la taille de la caméra
- possibilité d'afficher une grille séparant les carreaux

- à un niveau de zoom élevé (pas de minimum spécifié), possibilité d'afficher
  les cellules commes des disques plutôt que des carreaux

## UI Simple

### UIS entrées

#### UISE Configuration de l'automate

- Menu déroulant permettant de charger des automates 1d populaires
  - CA élémentaires: r110, r30, ...
  - CA avec plus de 2 états: (?)
  - CA avec de plus grand voisinages: (?)

### UIS affichage

#### Widget Carte d'identité de l'automate (_à-la_ Wolfram Alpha)

### UIS interaction

## UI Difficile

### UID entrées

#### UIDE Configuration de l'automate

### UID affichage

#### Widget comparaison de CA

#### Widget CA non-déterministes

### UID interaction

## API Developpeur

- Interface de scriptage de l'automate

## Contraintes techniques

---

- Affichage d'automates cellulaires arbitraires
- Performance de l'affichage: fluide en full HD 1 cellule par pixel
- ...

* la prise en charge de tout les automates cellulaires unidimensionnels
* la performance d'affichage et de calcul de l'automate
* la détection de motifs, aidant l'étude des automates cellulaires
* l'éducation sur les automates cellulaires
* le support de la plateforme web

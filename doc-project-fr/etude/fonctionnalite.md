# CAE1D - Fonctionnalités et contraintes

_Le [glossaire](./glossaire.md) définit la plupart des termes techniques utilisés_

L'explorateur d'automates cellulaires 1D vise un publique intéressés par les automates cellulaires. Les utilisateurs souhaitent connaître les automates cellulaires plus en détail, même si leurs connaissances sur le sujet peuvent être limitées. Ils peuvent être développeurs ou non.

## Vue d'ensemble

L'application est constituée d'un ensemble de composants qui interagissent entre eux :

Le **calculateur-afficheur** reçoit la description d'un automate cellulaire et d'un état initial, calcule et affiche cette automate cellulaire.

Le **configurateur du calculateur-afficheur** présente une interface qui affiche la configuration du calculateur-afficheur et permet sa modification.

L'**éditeur de règles** affiche un automate cellulaire élémentaire et permet de le modifier. Les propriétés de l'automate cellulaire sont rapportées.

## Calculateur-afficheur

### Fonctionnalités principales du calculateur-afficheur

#### Automate cellulaire

- Calcul et affichage des 256 automates cellulaires élémentaires (**Fca-compute**, **Fca-show**)
  - La taille de l'espace dans lequel l'automate est calculé est paramétrable. Il peut être borné à droite, à gauche ou infini (**Fca-size**).
    - Le comportement des bords de l'automate cellulaire est paramétrable (état fixe, topologie circulaire, etc...) (**Fca-border**).
- L'application propose au minimum 4 thèmes de coloration des cellules (**Fca-theme**).

Les fonctionnalités (**Fca-compute**) et (**Fca-show**) interagissent avec l'éditeur de règles, et permettent un changement de règle à chaud. Voir (**Fedit-bases**).

Les fonctionnalités (**Fca-size**), (**Fca-border**) et (**Fca-theme**) sont contrôlées par le configurateur du calculateur-afficheur. Voir (**Fconfig-size**), (**Fconfig-border**) et (**Fconfig-theme**).

#### Défilement, zoom et navigabilité

- Le défilement de l'automate peut être mis en pause (**Fnav-pause**).
- Le calcul d'un saut peut être demandé. Cela met en pause le défilement de l'automate cellulaire, avant, pendant, et après le saut (**Fnav-jump**).
- La vitesse de défilement de l'automate cellulaire peut être réduite et accélérée (**Fnav-speed**) :
  - Réduction au minimum jusqu'à 1 génération par seconde
  - Accélération au minimum jusqu'à 300 générations par seconde
- Le niveau de zoom de l'affichage peut être modifier par l'utilisateur et afficher plus d'une cellule par pixel (**Fnav-zoom**).
- Lorsque la taille de la fenêtre contenant le calculateur-afficheur est augmentée, le zoom augmente pour que l'automate occupe la totalité de l'espace disponible en largeur (**Fnav-resize**). Ce comportement peut être désactivé.
- Lorsque un automate cellulaire est plus large que la zone d'affichage, il est possible de déplacer la zone d'affichage horizontalement avec la souris ou avec le clavier (**Fnav-pan-horiz**). De même, lorsque l'historique d'un automate cellulaire est trop long pour être affiché dans la zone d'affichage, il est possible de déplacer la zone d'affichage verticalement. Un tel déplacement interrompt le défilement de l'automate cellulaire (**Fnav-pan-vert**). Le déplacement vertical n'est pas tenu de permettre de remonter jusqu'au début de l'automate cellulaire. Cependant, il doit permettre, pour un automate cellulaire calculé sur un espace borné de 1000 cellules de large, de remonter de 60 000 générations.

#### Détection de motifs

- Les motifs horizontaux spécifiés par l'utilisateur sont détectés et colorés différemment à l'affichage (**Fpattern-horiz**).
  - La coloration du motif peut prendre en compte la position horizontale et verticale du motif pour sélectionner une couleur. Ceci est utile pour la coloration de motifs de **grilles** suivant leur alignement (**Fpattern-grid**).

### Fonctionnalités secondaires du calculateur-afficheur

#### Détection de motifs

- Les motifs peuvent être extraits de l'afficheur par sélection d'une zone par l'utilisateur (**Fpattern-select**).
- L'application dispose d'une banque de motifs communs pour une ou plusieurs règles élémentaires (**Fpattern-110**).

#### Défilement et zoom

- Mode pas à pas : En mode pause, il est possible de faire défiler l'automate cellulaire d'une seul génération, sur commande. Si l'automate n'est pas en pause, la commande de pas à pas le met en pause (**Fnav-step**).
- Paramétrage du comportement de l'afficheur et de l'automate cellulaire lors du redimensionnement de l'affichage (**Fnav-custom-resize**).
- Le zoom de l'affichage peut être modifier par l'utilisateur et afficher plus d'une cellule par pixel (**Fnav-zoom**).

#### Minimap

Une carte de l'ensemble des cellules actives (calculées) de l'automate cellulaire est affichée dans l'un des coins du calculateur-afficheur (**Fminimap**). Cette carte permet d'afficher la taille de la partie visible de l'automate cellulaire, comparée à celle de l'automate complet.

#### Automates cellulaires

Il est possible d'afficher des automates cellulaires ayant un jusqu'à 10 états
(**Fca-10state**).

#### Interpretation musicale du ruban

- Il est possible d'associé un son à chaque état et de lire successivement le son correspondant à chaque cellule d'un ruban de l'automate cellulaire. (**Fmusic-play**).
  - Il est possible de choisir entre une lecture de gauche à droite et de droite à gauche (**Fmusic-direction**).
  - Il est possible de former des groupes de 2 ou 3 cellules et ainsi de former des états complexes, associés à une plus grande diversité de sons.

#### API, scriptage

Le calculateur afficheur offre une API Javascript et Typescript qui permet de modifier sa configuration et d'effectuer toutes les actions que l'utilisateur peut effectuer (**Fscripting**).

L'API permet le scriptage temporel et le scriptage sur évènement de l'automate cellulaire et de la configuration de l'explorateur. Le développeur peut ainsi scénariser une expérience scriptée pour un utilisateur novice.

## Configurateur du calculateur-afficheur

### Fonctionnalités principales

Cette interface met à disposition de l'utilisateur l'ensemble des possibilités de configuration du calculateur-afficheur. Il affiche la configuration actuellement utilisée. Il permet le changement de la configuration à froid ou à chaud (**Fconfig-hot**). Il n'y a donc pas besoin de recharger l'automate cellulaire pour appliquer les configurations.

- Le thème de l'automate peut être modifié (**Fconfig-theme**). Voir (**Fca-theme**).
- La taille de l'espace dans lequel l'automate est calculé peut être modifiée (**Fconfig-border**). Voir (**Fca-size**).
- Le comportement des bords peut être modifié (**Fconfig-border**). Voir (**Fca-border**).

On trouve aussi les fonctionnalités suivantes :

- **Fconfig-pause** pour **Fnav-pause**
- **Fconfig-speed** pour **Fnav-speed**
- **Fconfig-zoom** pour **Fnav-zoom**
- **Fconfig-pos-x** pour **Fnav-pan-horiz**
- **Fconfig-pos-t** pour **Fnav-pan-vert**
- **Fconfig-pattern-horiz** pour **Fpattern-horiz**
- **Fconfig-pattern-grid** pour **Fpattern-grid**

### Fonctionnalités secondaires

Lorsque deux éléments de configuration sont incompatibles, certaines options peuvent être rendues indisponibles. Le configurateur-afficheur retranscrira l'état de disponibilité dans la manière dont l'interface s'affiche et permettra de savoir la raison pour laquelle une configuration est indisponible (**Fconfig-reason**).

L'utilisateur pourra décider du comportement à adopter lorsque l'automate est redimensionné, parmi un ensemble de comportements utiles (**Fca-custom-redimension** et **Fconfig-custom-redimension**).

L'initialisation des cellules de la simulation de l'AC pourra être réalisée de manière précise grace à un DSL dédié documenté (**Fconfig-specific-initialisation**).

On trouve encore les fonctionnalités suivantes :

- **Fconfig-step-by-step** pour **Fnav-step**
- **Fconfig-custom-resize** pour **Fnav-custom-resize**

### Éditeur de règles

L'éditeur de règles affiche un automate cellulaire unidimensionnel et permet d'y apporter des modifications.

Ses fonctionnalités principales sont les suivantes:

- L'écriture de la règle dans différentes bases (**Fedit-bases**) : les bases 10, 2, 4, 8 et 16.
- L'affichage de l'application de l'automate à l'entrée 1000101110. Ceci affiche les chiffres binaires de l'écriture du numéro de la règle dans l'ordre
  (40125376) plutôt que (76543210), ce qui permet une lecture condensée (**Finfo-condensed**).
- Les règles de transition locale obtenue par symétrie horizontale ou par symétrie des couleurs peuvent être chargées. Si l'automate est horizontalement auto-symétrique, cela est indiqué (**Fload-symmetry**).
- Les cellules parents ignorées par la règle de transition locale sont indiquées (**Finfo-ignore**).
- Les cellules parents pour lesquelles la règle de transition locale est linéaire sont indiquées (**Finfo-linear**).
- Si l'automate cellulaire est totalisateur, c'est à dire qu'elle ne dépend que de la somme des états du voisinage, cela est indiqué (**Finfo-totalistic**).
- Suivant le nombre de bits à 1, l'éditeur indiquera si la règle est équilibré en couleur, ou bien biaisée vers la mort ou bien biaisé vers la vie (**Finfo-color-tendency**).
- L'éditeur indiquera si la règle a tendance à produire des cellules de couleur même couleur que la couleur dominante de leur voisinage, ou si a contrario elles tendent à être de la couleur opposée (**Finfo-scintillement**).

Optionnellement, l'éditeur de règle pourra prendre en charge les automates cellulaires unidimensionnels avec des voisinages de taille arbitraire, et avec un nombre arbitraire d'états.

### Prévisualiseur de règles

Ce composant est entièrement optionnel.

Ce composant permet de voir comment une règle traite différents motifs (**Fpreview**). Il s'agit simplement d'instances de calculateur-afficheur préconfigurées pour afficher entre 3 et 5 générations, à partir d'un motif très régulier.

Ces instances seront modifiées pour permettre la détection d'une éventuelle répétition d'un motif, signalant l'existence d'une grille.

## Contraintes non fonctionnelles

Cette partie liste les contraintes d'environnement d'exécution et de performance du projet, ainsi que des contraintes de modularité sur la structure du projet.

Environnement :

- Le logiciel doit fonctionner sans installation, **sous forme d'application web**, sur la dernière version publique du navigateur Chrome. Ceci pose des contraintes sur les langages qui peuvent être utilisés pour la réalisation de l'application.
- L'afficheur-calculateur doit pouvoir être utilisé en plein écran ou embarqué dans une page.

Performance :

- Un automate cellulaire calculé sur un espace borné de 1000 cellules de large, doit pouvoir défiler sur 300 000 générations.
- L'affichage doit pouvoir fonctionner à 60 fps sur Chrome avec un zoom de une cellule par pixel, sur un écran Full HD.
- L'utilisateur peut fixer une limite d'utilisation de la RAM de 200 Mo ou plus. L'application assure le respect de cette consigne.

[Revenir à l'accueil](.)

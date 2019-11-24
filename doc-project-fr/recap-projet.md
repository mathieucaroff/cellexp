# Explorateur d'automate cellulaire unidimensionnel

Ce projet à pour but la création d'un explorateur d'automate cellulaire
unidimensionnel.

Les enjeux de ce projet sont:

- la prise en charge de tout les automates cellulaires unidimensionnels
- la performance d'affichage et de calcul de l'automate
- la détection de motifs, aidant l'étude des automates cellulaires
- l'éducation sur les automates cellulaires
- la réutilisabilité du code (modularité, documentation interne)
- le support de la plateforme web

À ces enjeux sont associé des recommandations techniques:

- produire un logiciel modulaire, avec des interfaces claires
- utiliser un algorithme de calcul de l'état des cellules aproprié aux besoins
- assurer la performance de l'affichage :
  60 fps pour un écran Full HD avec une cellule par pixel, à une vitesse de
  défliement de 60 cellules par seconde
- proposer une API documentée pour les utilisateurs-développeurs. Proposer une
  interface avancée pour les utilisateurs avertis cherchant à réaliser des
  automates spécifiques et potentiellement complexes. Enfin, proposer une
  interface simple pour les utilisateurs débutants.

## Organisation de projet

Le projet suivra un cycle de vie itératif, inspiré de Scrum.

Chaque fonctionnalité sera présentées par écrit, par le client, accéptée ou
refusée par le développeur, puis spécifiées par le client et le développeur
conjoins, et finalement concue, puis réalisée par le développeur. Ces
différentes activités seront mesurées en temps. Pour chaque fonctionnalité,
la durée de la conception et de la réalisation seront estimées, puis comparées
à la duree effective lors de la revue de sprint suivante.

Pour permettre le contrôle du déroulement du projet par un tiers parti, une
solution logicielle de gestion de projet itératif sera mise en place. Par
exemple le Taiga.io de IMT Atlantique pourra être utilisé.

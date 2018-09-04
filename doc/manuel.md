# Manuel utilisateur

Ce document à pour but d'expliquer les différentes fonctionnalités du programme ainsi que le déploiement du logiciel sur une machine.

## Préambule

### Description

ElectroProject est un logiciel permettant de gérer des projets.
Avec ce programme, il est possible de créer un diagrammes de GanTT qui indique quelles sont les tâches qui doivent être complétées dans le projet et par quelles personnes.
De plus, il est possible de mettre à disposition le fichier sur un repository git, par exemple. En effet, les fichiers générés sont au format texte, ce qui les rend facilement editables et parfaitement compatibles avec un gestionnaire de version.

## Installation

Cette section donne des informations concernant l'installation de l'application sur Windows et Linux.
L'application est susceptible de fonctionner sur d'autres systèmes, mais n'est pas "officiellement" supporté.

### Windows



### Linux



## Fonctionnement

Cette section explique comment fonctionne le logiciel.

### Nouveau projet

Pour créer un nouveau fichier, il y a deux manières de procéder:
1. en passant par le menu principal (à l'ouverture de l'application) et en cliquant sur "New"
2. en passant par la barre d'outil et en cliquant sur "File" puis "New"

Le programme demande d'entrer un nom pour le projet (aucune relation avec le nom fichier).
Une fois le nom choisit, presser sur "Confirm" pour débuter la gestion de projet.

### Ouvrir un fichier

Pour ouvrir un fichier, il existe deux possibilités:
1. en passant par le menu principal (à l'ouverture de l'application) et en cliquant sur "Open"
2. en passant par la barre d'outil en cliquant sur "Open" ou en sélectionnant un fichier récemment ouvert sous "Recents files..."

Lorsqu'une action d'ouverture est demandée sur les boutons "Open", une boîte de dialogue permettant la sélection d'un fichier s'ouvre.
Une fois le fichier sélectionné et accepté, le programme de gestion de projet est prêt à être utilisé.

### Gérer une liste de membres

Dans le menu à gauche se trouve la gestion de membres, l'icone correspondant est la suivante : ICONE

- Pour ajouter des membres, il faut presser sur l'icone ICONE. Cette icone ouvre une boîte de dialogue permettant d'insérer le nom d'une personne et la couleur attrbiuée à cette personne.
- Pour modifier un membre, il faut presser sur l'icone ICONE se trouvant sur la droite. Cette icone ouvre une boîte de dialogue permettant de modifier les informations existantes.
- Pour supprimer un membre, il faut presser sur l'icone ICONE se trouvant sur la droite. Une boîte de dialogue s'ouvre afin de confirmer le choix de suppression.

### Gérer une liste de tâches



### Affichage du diagramme et actions possibles

Dans le menu à gauche se trouve l'icone ICONE qui permet d'afficher le diagramme de GanTT.

Sur cette page se trouve plusieurs boutons qui effectue les opérations suivantes:
- l'ajout d'une nouvelle tâche (raccourci)
- la désactivation des filtres et tris
- le trie des tâches selon le nom
- le filtrage pour obtenir que les tâches relatives à une personne

Concernant le diagramme, il est possible de modifier les dates de débuts et de fins en utilisants la souris.
Pour cela, il faut se positionner sur l'un des bords d'une tâches et de faire un clic enfoncé et bouger la souris.

### Système d'onglets

Le programme comporte un système d'onglets pour les fichiers permettant de naviguer entre les différents projets ouverts. Chaque fichier (nouveau ou ouvert) s'ajoute dans le système d'onglets de fichiers. La croix sur la droite permet de fermer l'onglet (pas de sauvegarde automatique des données).

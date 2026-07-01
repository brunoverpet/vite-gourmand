# Choix techniques — Vite & Gourmand

## AdonisJS v7 (Node.js)

Framework back-end MVC choisi pour sa cohérence et sa complétude : ORM intégré (Lucid), système de validation, gestion des sessions, envoi de mails, routage et middleware — tout est fourni sans configuration externe. Il remplace avantageusement des combinaisons Express + bibliothèques tierces qui auraient nécessité plus d'intégration manuelle.

## Inertia.js

Utilisé comme pont entre AdonisJS et React. Il permet de construire une SPA (Single Page Application) sans écrire d'API REST : le contrôleur renvoie directement des données à la page React, comme un rendu de vue classique. Ce choix évite la duplication de logique entre une API et un client, et simplifie l'authentification côté serveur.

## Tailwind CSS + shadcn/ui

Tailwind permet d'écrire le style directement dans les composants sans fichiers CSS séparés, ce qui accélère le développement. shadcn/ui fournit des composants accessibles (formulaires, dialogues, menus déroulants) basés sur Radix UI, évitant de les réécrire depuis zéro.

## PostgreSQL

Base de données relationnelle pour toutes les données métier (utilisateurs, menus, commandes, avis). Choix motivé par la robustesse, la gestion des contraintes d'intégrité (clés étrangères), et la compatibilité native avec Lucid ORM. Hébergée sur [Neon](https://neon.tech) en production.

## MongoDB

Base de données NoSQL utilisée exclusivement pour les statistiques de commandes. Chaque commande acceptée génère un document dans MongoDB, permettant des agrégations rapides (chiffre d'affaires par menu, nombre de commandes) sans impacter les tables PostgreSQL. Hébergée sur [MongoDB Atlas](https://www.mongodb.com/atlas) en production.

## Docker

Les bases de données PostgreSQL et MongoDB sont conteneurisées via Docker Compose en local. Cela garantit un environnement identique entre développeurs et simplifie la mise en place locale. L'application elle-même est également buildée en image Docker pour le déploiement sur Render.

## Envoi d'emails : SMTP

L'envoi d'emails repose sur le protocole SMTP standard, configurable via les variables `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — indépendamment du fournisseur.

En développement, [Mailtrap](https://mailtrap.io) est utilisé comme sandbox SMTP pour intercepter les emails sans les envoyer réellement, permettant de tester les mails de confirmation, de réinitialisation de mot de passe et de notification sans risque.

En production, ces mêmes variables pointent vers un fournisseur SMTP réel (Gmail au moment du déploiement) : le code ne dépend d'aucun fournisseur spécifique, seuls l'hôte et les identifiants changent.

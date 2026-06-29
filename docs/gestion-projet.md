# Gestion de projet — Vite & Gourmand

## Méthode

La gestion du projet a été organisée selon une approche **Kanban** via Trello, avec un découpage en tâches atomiques classées par domaine fonctionnel.

Lien du tableau : [https://trello.com/invite/b/6a1803ff369a48d7140252aa/ATTI70b010ea0ecc808eb5d057fa7c84098e7ADD76FD/vite-gourmand](https://trello.com/invite/b/6a1803ff369a48d7140252aa/ATTI70b010ea0ecc808eb5d057fa7c84098e7ADD76FD/vite-gourmand)

## Organisation du tableau

Le tableau est divisé en listes représentant l'avancement des tâches :

| Liste | Rôle |
|---|---|
| À Faire — Fondations & Auth | Tâches liées à l'architecture de base, authentification, rôles |
| À Faire — Catalogue & Commandes | Tâches liées aux menus, commandes, espace utilisateur |
| À Faire — Back-Office & Stats | Tâches liées au dashboard admin, statistiques, documentation |
| En Cours | Tâche en cours de développement |
| Test | Tâche développée, en cours de vérification |
| Terminé | Tâches complétées et validées |

## Découpage des tâches

Chaque carte Trello correspond à une fonctionnalité précise du brief. Les tâches ont été priorisées dans cet ordre :

1. **Fondations** — mise en place de l'environnement, base de données, authentification, rôles
2. **Catalogue** — gestion des menus, plats, allergènes, filtres
3. **Commandes** — formulaire de commande, calcul du prix, suivi par statuts, emails
4. **Back-office** — espace employé, espace admin, statistiques NoSQL
5. **Documentation** — README, MCD, diagrammes, charte graphique, livrables ECF

## Branches Git

Le projet suit la convention de branches du brief :

- `main` — branche principale, contient le code stable livré
- `developp` — branche de développement, intègre les fonctionnalités testées

Chaque fonctionnalité est développée sur `developp` puis mergée vers `main` une fois validée.

## Conventions de commits

Les commits suivent la convention **Conventional Commits** :

```
type(scope): description
```

Types utilisés : `feat`, `fix`, `chore`, `refactor`, `docs`, `perf`.

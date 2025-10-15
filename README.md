# Kata Panier

---
## Description

Cette application est une plateforme e-commerce simple développée en Angular 20.  
Elle inclut les fonctionnalités suivantes :

- Gestion de produits (`ProductPage`, `Product`)
- Gestion du panier (`CartPage`, `Cart`, `CartSummary`)
- Filtrage des produits par catégorie (`CategoryFilter`)
- Compteur de panier en temps réel (`CartCounter`)
- Architecture basée sur des **signaux Angular** (`signal`, `computed`, `effect`) pour gérer l’état global
- Utilisation de composants **standalone Angular 20**
- Simulation de persistance locale via `LocalStorageService`
- Communication avec un backend via `ProductApi` (HTTP)

---

## Technologies utilisées

- Angular 20 avec **standalone components**
- Angular Signals (`signal`, `computed`, `effect`)
- Angular Material pour UI (`MatCard`, `MatToolbar`, `MatButton`, `MatIcon`, etc.)
- RxJS pour la gestion des observables
- TypeScript strict et Reactive Forms
- Jest pour les tests unitaires
- LocalStorage pour la persistance du panier

---
## Prérequis

- **Node.js** (version 18 ou plus récente)  
  [Télécharger ici](https://nodejs.org/)
- **npm** (inclus avec Node.js)
- **Angular CLI** (version 20 ou supérieure)
  ```bash
  npm install -g @angular/cli
  ```

## Installation

```bash
# Installer les dépendances
npm install

#Lancer l’application
# Pour dev server une configuration spécifique, 
# pour utiliser des données simulées avec MSW :
ng serve --configuration=mock 

# L'application sera disponible sur http://localhost:4200

# Tests unitaires
# Lancer Jest
jest

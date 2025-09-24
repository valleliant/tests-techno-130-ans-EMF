# Tests Techno 130 ans EMF - Version TEST

## Description

Application Next.js pour captive portal (UniFi) célébrant les 130 ans de l'École des Métiers de Fribourg.

**Version TEST** : Cette version ne communique pas avec les serveurs web (LED/Horloges) et utilise uniquement des simulations locales.

## Architecture

### Fonctionnalités
- ✅ **File d'attente en mémoire** avec accès exclusif (un seul utilisateur à la fois)
- ✅ **Questions depuis JSON local** (`data/questions.json`)
- ✅ **Simulation d'affichage** via logs console (pas de réseau)
- ✅ **Interface web simple** pour parcourir les questions
- ✅ **Pas de dépendances DB** (Prisma/PostgreSQL supprimés)

### Structure
```
├── data/
│   └── questions.json          # Questions en FR/DE
├── src/
│   ├── lib/
│   │   ├── questions.ts        # Chargement des questions
│   │   ├── queue.ts           # File d'attente + mutex
│   │   └── displaySim.ts      # Simulation LED (logs)
│   ├── app/
│   │   ├── start/             # Page d'entrée dans la file
│   │   ├── queue/             # Page de file d'attente  
│   │   ├── questions/         # Sélection des questions
│   │   └── api/
│   │       ├── queue/         # API file d'attente
│   │       ├── questions/     # API questions
│   │       └── submit/        # API soumission
│   └── ...
```

## Installation

```bash
# Installation des dépendances
npm install

# Build de production
npm run build

# Démarrage
npm start
```

## Configuration

Copiez `.env.local.example` vers `.env.local` pour personnaliser :

```bash
cp .env.local.example .env.local
```

Variables disponibles :
- `DISPLAY_DELAY_MS` : Délai simulation LED (défaut: 1500ms)

## Usage

1. **Démarrage** : Accédez à `/guest/s/default` (ou `/` pour redirection auto)
2. **File d'attente** : Cliquez "Entrer dans la file" → redirigé vers `/queue`
3. **Attente** : La page poll votre position toutes les 2s
4. **Questions** : Quand votre tour arrive, accédez à `/questions`
5. **Simulation** : Cliquez une question → simulation d'affichage via logs
6. **Fin** : Redirection automatique vers `/merci`

## API Routes

- `POST /api/queue/enqueue` → `{ ticketId }`
- `GET /api/queue/position?ticketId=...` → `{ position }`
- `POST /api/queue/start` + `{ ticketId }` → `{ ok, reason? }`
- `POST /api/submit` + `{ questionId }` → `{ ok }`
- `GET /api/questions` → `Question[]`

## Logs de simulation

```bash
[QUEUE] Enqueue: abc-def-123, position: 1
[QUEUE] Session started for ticket: abc-def-123, remaining queue: 0
[API] Soumission question 1: Quel est l'événement de 1895 ?
[SIM:LED] QUESTION > Quel est l'événement de 1895 ?
[SIM:LED] ANSWER   > Fondation de l'école.
```

## Développement

```bash
# Mode développement avec hot-reload
npm run dev
```

## Architecture technique

- **Next.js 15** avec TypeScript strict
- **File d'attente** : En mémoire (process unique) avec mutex
- **Questions** : JSON statique lu via `fs.readFile`
- **Simulation** : `console.log` uniquement, délai configurable
- **UI** : Tailwind CSS + Radix UI components
- **Pas de DB** ni connexions réseau externes

## Critères d'acceptation ✅

- ✅ Aucune dépendance/code DB restant
- ✅ `data/questions.json` comme seule source de questions
- ✅ File d'attente empêche accès simultané
- ✅ `/api/submit` fait simulation uniquement (logs)
- ✅ App fonctionne offline (LAN uniquement)
- ✅ TypeScript strict, logs clairs


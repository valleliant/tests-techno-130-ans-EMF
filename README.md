# Tests Techno 130 ans EMF - Version TEST

## Description

Application Next.js pour captive portal (UniFi) célébrant les 130 ans de l'École des Métiers de Fribourg.

**Version TEST** : Cette version ne communique pas avec les serveurs web (LED/Horloges) et utilise uniquement des simulations locales.

## Architecture

### Fonctionnalités
- ✅ **File d'attente Redis** avec accès exclusif atomique (un seul utilisateur à la fois)
- ✅ **Questions depuis JSON local** (`data/questions.json`)
- ✅ **Simulation d'affichage** via logs console (pas de réseau)
- ✅ **Interface web simple** pour parcourir les questions
- ✅ **Pas de dépendances DB** (Prisma/PostgreSQL supprimés)
- ✅ **Robustesse multi-processus** via Redis

### Structure
```
├── data/
│   └── questions.json          # Questions en FR/DE
├── src/
│   ├── lib/
│   │   ├── questions.ts        # Chargement des questions
│   │   ├── redis.ts           # Connexion Redis
│   │   ├── queue.redis.ts     # File d'attente Redis atomique
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
# Installation des dépendances (inclut Redis et ULID)
npm install

# Build de production
npm run build

# Démarrage
npm start
```

## Configuration

Créez un fichier `.env.local` pour personnaliser :

```bash
# Configuration Redis
REDIS_URL=redis://127.0.0.1:6379

# Configuration simulation
DISPLAY_DELAY_MS=1500
```

Variables disponibles :
- `REDIS_URL` : URL de connexion Redis (défaut: `redis://127.0.0.1:6379`)
- `DISPLAY_DELAY_MS` : Délai simulation LED (défaut: 1500ms)

## Prérequis

- **Node.js 18+**
- **Redis Server** en fonctionnement sur le port 6379 (ou URL personnalisée)

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
- `POST /api/queue/release` + `{ ticketId }` → `{ ok }` (libère session)
- `GET /api/queue/status?ticketId=...` → `{ activeTicketId, position }`
- `POST /api/submit` + `{ questionId, ticketId }` → `{ ok }`
- `GET /api/questions` → `Question[]`

## Logs de simulation

```bash
[API][enqueue] ticket created { ticketId: '01HWCRP2XB3JDFK8', at: '2024-01-15T...' }
[API][start] started { ticketId: '01HWCRP2XB3JDFK8' }
[API][submit] Soumission question 1: Quel est l'événement de 1895 ?
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
- **File d'attente** : Redis avec scripts Lua atomiques (multi-processus safe)
- **Questions** : JSON statique lu via `fs.readFile`
- **Simulation** : `console.log` uniquement, délai configurable
- **UI** : Tailwind CSS + Radix UI components
- **Redis** : Backend de file d'attente robuste et partagée
- **ULID** : Identifiants uniques pour les tickets

## Critères d'acceptation ✅

- ✅ Aucune dépendance/code DB restant (hors Redis)
- ✅ `data/questions.json` comme seule source de questions
- ✅ File d'attente Redis empêche accès simultané (atomique)
- ✅ `/api/submit` fait simulation uniquement (logs)
- ✅ App robuste en multi-processus via Redis
- ✅ TypeScript strict, logs clairs avec ULID
- ✅ Migration complète : ancien code en mémoire supprimé

## Migration Redis ✅

- ✅ **Ancienne queue en mémoire supprimée** (`lib/queue.ts`)
- ✅ **Redis implémenté** avec scripts Lua atomiques
- ✅ **Toutes les routes API migrées** vers Redis
- ✅ **Session locks avec TTL** (90s auto-expiration)
- ✅ **Tickets ULID** au lieu d'UUIDs crypto
- ✅ **Compatible multi-processus** et résistant aux redémarrages


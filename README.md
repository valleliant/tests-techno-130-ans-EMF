# Questionnaire captif EMF

Application Next.js 14 simplifiée pour portail OpenNDS : aucune interaction client-side, uniquement des formulaires HTML classiques et des redirections GET.

## Architecture

- `/questions` : choix de la langue (FR/DE)
- `/questions/categories` : choix d’une catégorie en fonction de la langue
- `/questions/list` : sélection d’une question (radios, formulaire GET)
- `/questions/submit` : route serveur qui enregistre la question dans Redis puis redirige vers la file d’attente
- `/questions/queue` : file d’attente HTML avec meta refresh (toutes les 5 s)

### Structure
```
├── data/
│   └── questions.json          # Questions FR/DE classées par catégorie
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout minimal (HTML/CSS inline uniquement)
│   │   ├── page.tsx            # Redirection immédiate vers /questions
│   │   └── questions/
│   │       ├── page.tsx
│   │       ├── categories/page.tsx
│   │       ├── list/page.tsx
│   │       ├── submit/route.ts
│   │       └── queue/
│   │           ├── head.tsx      # Meta refresh 5 s
│   │           └── page.tsx
│   └── lib/
│       ├── redis.ts            # Client ioredis + safeRedisOperation
│       └── types.ts            # Question / QueueEntry / QuestionsData
```

## Données

`data/questions.json` contient les questions FR/DE exactement comme indiqué dans le brief (catégories `technologie`, `loisirs`, `general`, etc.). Le chargement se fait côté serveur via import direct.

## Intégration avec le portail captif (OpenNDS)

### 1. Page d’entrée à utiliser dans le portail

Dans la configuration du portail captif, pointez simplement vers :

- `http://<ip_du_raspberry>:3000/questions`

L’application n’essaie plus d’ouvrir Internet : elle collecte les réponses et affiche uniquement la file d’attente interne.

### 2. Enchaînement des pages (flux utilisateur complet)

1. **Choix de langue**
   - `GET /questions`
   - Boutons envoyant `lang=fr|de`

2. **Choix de catégorie**
   - `GET /questions/categories?lang=fr`
   - Boutons vers `GET /questions/list?lang=fr&category=technologie`

3. **Liste de questions**
   - `GET /questions/list?lang=fr&category=technologie`
   - Radio `questionId` puis `GET /questions/submit?lang=fr&category=technologie&questionId=2`

4. **Soumission**
   - `/questions/submit` enregistre la question dans Redis puis redirige vers la file :
     - `GET /questions/queue?userId=abc123&lang=fr`

5. **File d’attente**
   - `GET /questions/queue?userId=abc123&lang=fr`
   - Affiche la position + temps estimé, meta refresh automatique toutes les 5 secondes

### 3. Récupération manuelle des pages (debug / tests)

Depuis n’importe quel client (ou depuis le portail), vous pouvez tester les pages avec `curl` ou un navigateur :

```bash
# Page d’entrée (choix de langue)
curl "http://<ip_du_raspberry>:3000/questions"

# Page catégories FR
curl "http://<ip_du_raspberry>:3000/questions/categories?lang=fr"

# Liste des questions FR / technologie
curl "http://<ip_du_raspberry>:3000/questions/list?lang=fr&category=technologie"

# Soumission d’une question
curl -i "http://<ip_du_raspberry>:3000/questions/submit?lang=fr&category=technologie&questionId=2"

# File d’attente (auto refresh côté navigateur)
curl "http://<ip_du_raspberry>:3000/questions/queue?userId=abc123&lang=fr"
```

En production, seul le premier appel (`/` ou `/questions`) doit être utilisé par le portail captif ; les autres URLs sont enchaînées automatiquement par les formulaires HTML.

## Configuration

Créer `.env.local` à la racine :
```
REDIS_HOST=localhost
REDIS_PORT=6379
```

`safeRedisOperation` bascule automatiquement en mode fallback si Redis est absent. La route `/questions/queue` affiche alors un message dédié.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

## Logs importants

- `[CATEGORIES] Lang: fr, Categories: technologie, loisirs, general`
- `[QUESTIONS LIST] Lang: fr, Category: technologie, Count: 3`
- `[SUBMIT] Received - Lang: fr, Category: technologie, QuestionId: 2`
- `[REDIS] Successfully added to queue: { ... }`
- `[SUBMIT] Redirecting to queue page with userId: abc123`
- `[QUEUE] UserId: abc123, Queue length: 4`
- `[QUEUE] Position: 2/4, Estimated time: 60s`

## Contraintes respectées

- Aucune dépendance Tailwind / Radix / UI client → HTML + CSS inline uniquement
- Aucun composant client (`'use client'`) ni hooks React
- Toutes les interactions se font via formulaires GET et redirections serveur
- Redis géré via `ioredis` + fallback robuste
- TypeScript strict + imports absolus `@/`

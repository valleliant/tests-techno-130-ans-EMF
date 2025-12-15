## Documentation du projet – Portail captif EMF (130 ans)

### 1. Introduction

Ce projet est une application **Next.js (App Router)** servant de **portail captif** pour l’EMF à l’occasion des 130 ans.  
L’objectif est de proposer aux visiteurs un **questionnaire multilingue** (FR/DE) qui :

- enregistre leur choix de question,
- gère une **file d’attente** partagée,
- affiche la question/réponse sur un **panneau LED (WLED)** et un **afficheur 4 digits** (Arduino/ESP32),
- déclenche ensuite la **déconnexion OpenNDS** du client.

Le tout est conçu pour fonctionner dans l’environnement d’un portail captif : les pages retournent du **HTML complet**, avec des **formulaires simples** (méthode GET) et uniquement **un peu de JavaScript** sur la page d’affichage finale pour le compte à rebours et l’appel d’API `/api/disconnect`.

---

### 2. Vue d’ensemble de l’architecture

- **Framework** : Next.js 14 (App Router, `src/app`).
- **Stockage de la file d’attente** : Redis (`ioredis`).
- **Données métier** : `data/questions.json` (questions par langue et par catégorie).
- **Micro‑contrôleurs** :
  - panneau LED avec **WLED**, piloté via `HTTP POST` JSON (`src/lib/wled.ts`) ;
  - **afficheur 4 digits** piloté en `HTTP POST` form‑urlencoded (`src/lib/numberDisplay.ts`).
- **Portail captif** : OpenNDS, contrôlé via CGI `disconnect.cgi` à travers la route `src/app/api/disconnect/route.ts`.

Organisation principale :

```text
├── data/
│   └── questions.json          # Questions FR/DE classées par catégorie
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout global (HTML/CSS minimal)
│   │   ├── page.tsx            # Redirection vers /questions en conservant les query params
│   │   ├── api/
│   │   │   └── disconnect/
│   │   │       └── route.ts    # API: déconnexion OpenNDS + avance de la file
│   │   └── questions/
│   │       ├── page.tsx               # Choix de la langue
│   │       ├── categories/page.tsx    # Choix de la catégorie
│   │       ├── list/page.tsx          # Liste des questions
│   │       ├── queue/page.tsx         # File d’attente (Redis)
│   │       └── display/page.tsx       # Affichage question + compte à rebours
│   └── lib/
│       ├── redis.ts            # Client ioredis + helper safeRedisOperation
│       ├── types.ts            # Question / QueueEntry / QuestionsData
│       ├── wled.ts             # Envoi du texte à WLED
│       └── numberDisplay.ts    # Envoi de l’ID à l’afficheur 4 digits
```

Flux utilisateur global :

1. OpenNDS redirige l’utilisateur vers l’app (avec `clientip`, `clientmac`, etc.).
2. `/` → redirection vers `/questions` en conservant les paramètres.
3. `/questions` : **choix de la langue** (FR/DE).
4. `/questions/categories` : **choix de la catégorie**.
5. `/questions/list` : **choix d’une question**.
6. `/questions/queue` : entrée dans la **file d’attente Redis** + affichage de la position.
7. Si l’utilisateur arrive en **tête de file**, redirection vers `/questions/display`.
8. `/questions/display` : envoi de la question aux **Arduino/ESP32**, affichage du compte à rebours, appel de `/api/disconnect`.
9. `/api/disconnect` : déclenche la **déconnexion OpenNDS** et **avance la file**.

---

### 3. Modèle de données et fichier `data/questions.json`

#### 3.1. Types métiers (`src/lib/types.ts`)

- **`Question`**
  - `id` : identifiant (string), utilisé aussi pour l’afficheur 4 digits.
  - `question` : texte affiché sur les pages HTML.
  - `reponse_detaillee` : texte (long) affiché sur le panneau LED (WLED).

- **`QuestionsData`**
  - Structure hiérarchique : `langue` → `catégorie` → tableau de `Question`.

- **`QueueEntry`**
  - Donnée stockée dans Redis pour chaque entrée de file :
    - `id`, `question`, `reponse_detaillee` ;
    - `lang`, `category` ;
    - `timestamp` (ISO) ;
    - `userId` (identifiant unique généré par `nanoid`).

#### 3.2. Contenu de `data/questions.json`

Le fichier `data/questions.json` contient la totalité des questions, par exemple :

- `fr.metiers_actuels[]`, `fr.histoire_ecole[]`, etc.
- `de.aktuelle_berufe[]`, `de.geschichte_schule[]`, etc.

Chaque entrée a la forme :

```json
{
  "id": "1",
  "question": "En quelle année le métier d'électronicien a débuté ?",
  "reponse_detaillee": "1977, début de la formation de mécanicien-électronicien"
}
```

Ce fichier est importé côté serveur dans les pages (`questions/page.tsx`, `.../categories`, `.../list`, `.../queue`) sous forme de `QuestionsData`.

---

### 4. Communication avec Redis – File d’attente des questions

#### 4.1. Initialisation et helper (`src/lib/redis.ts`)

- Création d’un client Redis global via `ioredis`, à partir des variables d’environnement :
  - `REDIS_HOST` (par défaut `localhost`) ;
  - `REDIS_PORT` (par défaut `6379`).
- Gestion de la disponibilité :
  - un booléen `redisAvailable` indique si la connexion est active.
  - en cas d’erreur : logs + passage en mode indisponible.

- **`safeRedisOperation(operation, fallbackValue, operationName)`**
  - Encapsule un appel Redis dans un `try/catch` centralisé.
  - Si Redis n’est pas dispo ou l’opération échoue, renvoie **une valeur de repli** (`fallbackValue`) et logge un message clair.
  - Utilisé partout où Redis est appelé pour **éviter de casser le portail** si Redis tombe.

#### 4.2. Écriture dans la file – ajout d’une question (`questions/queue/page.tsx`)

Cas d’arrivée **initiale** sur `/questions/queue` (depuis `/questions/list`) :

1. La page lit `lang`, `category`, `questionId` et **aucun `userId`** dans `searchParams`.
2. Elle récupère la bonne question dans `questionsData`.
3. Elle génère un identifiant utilisateur `userId = nanoid(10)`.
4. Elle construit un `QueueEntry` complet à partir de la question et des paramètres.
5. Elle appelle :
   - `safeRedisOperation(async () => redis.rpush('questions:queue', JSON.stringify(entry)), false, 'RPUSH questions:queue (from list)')`.
6. Elle renvoie une page HTML qui **redirige immédiatement** (meta refresh `0`) vers `/questions/queue?userId=...&lang=...&clientip=...&clientmac=...`.

La file d’attente est représentée par une **liste Redis** `questions:queue` :

- **tête** de liste (`lindex 0`) : question actuellement affichée ou en cours d’affichage ;
- éléments suivants : questions en attente.

#### 4.3. Lecture de la file et position (`questions/queue/page.tsx`)

Cas où un `userId` est présent dans l’URL :

1. La page récupère le contenu complet de la liste Redis via `lrange('questions:queue', 0, -1)` sous `safeRedisOperation`.
2. Elle parse chaque élément JSON en `QueueEntry`.
3. Si Redis est indisponible ou la liste est vide :
   - affiche une page de fallback (“Redis n’est pas disponible pour le moment. Revenez plus tard.”).
4. Sinon :
   - cherche la position de l’entrée correspondant au `userId` (`findIndex`) ;
   - calcule une **estimation de temps** (`position * 30` secondes, soit 30 s par personne) et l’affiche en minutes/secondes.
   - si l’**utilisateur est en position 1**, la page renvoie une **redirection immédiate** vers `/questions/display?userId=...`.
   - sinon, affiche :
     - la question,
     - la position `position / total`,
     - le temps estimé,
     - une mention que la page se rafraîchit automatiquement toutes les 5 secondes (`<meta httpEquiv="refresh" content="5" />`).

---

### 5. Pages Next.js – Génération des pages HTML pour OpenNDS

#### 5.1. Layout global (`src/app/layout.tsx`)

- Définit les **métadonnées** (titre, description) et le `viewport`.
- Rend un `<html lang="fr">` avec un `<body>` minimaliste, adapté à un portail captif.

#### 5.2. Redirection racine (`src/app/page.tsx`)

- Récupère tous les `searchParams` (y compris des paramètres OpenNDS comme `tok`, `hid`, `clientip`, `clientmac`) et les copie vers un nouvel `URLSearchParams`.
- Redirige vers `/questions` en conservant ces paramètres :
  - permet à OpenNDS de passer ses infos jusqu’aux pages internes du portail.

#### 5.3. Choix de la langue (`src/app/questions/page.tsx`)

- Affiche une page HTML complète pour **sélectionner la langue**.
- Récupère `clientip` et `clientmac` des `searchParams` pour les réinjecter en champs cachés.
- Propose deux formulaires simple :
  - `GET /questions/categories?lang=fr&clientip=...&clientmac=...`
  - `GET /questions/categories?lang=de&clientip=...&clientmac=...`
- Pas de JavaScript, uniquement HTML/CSS inline → compatible avec OpenNDS.

#### 5.4. Choix de la catégorie (`src/app/questions/categories/page.tsx`)

- Vérifie que `lang` est présente et valide (FR/DE).
- Charge les catégories disponibles pour cette langue depuis `questionsData`.
- Utilise `categoryLabels` pour montrer des labels lisibles (ex. “🛠️ Métiers actuels”).
- Génère un formulaire par catégorie :
  - `GET /questions/list?lang=<lang>&category=<cat>&clientip=...&clientmac=...`
- Ajoute un bouton Retour vers `/questions` (toujours avec `clientip`, `clientmac`).

#### 5.5. Liste des questions (`src/app/questions/list/page.tsx`)

- Valide `lang` et `category`.
- Charge le tableau de `Question` correspondant.
- Trois cas :
  - paramètres manquants : page “Paramètres manquants” + bouton Retour `/questions`.
  - aucune question dans la catégorie : page “Aucune question pour cette catégorie”.
  - cas nominal :
    - formulaire `GET` vers `/questions/queue` avec :
      - `lang`, `category`, `clientip`, `clientmac` (inputs hidden) ;
      - une liste d’inputs `radio` `name="questionId"` pour chaque question.

#### 5.6. File d’attente (`src/app/questions/queue/page.tsx`)

Rôle central : **interface entre les choix utilisateur** et la **file Redis**.

- Si arrivée **sans `userId`** (depuis `/questions/list`) :
  - crée une entrée `QueueEntry`,
  - la pousse dans Redis (`rpush`),
  - redirige vers `/questions/queue?userId=...`.

- Si arrivée **avec `userId`** :
  - lit toute la liste Redis ;
  - calcule la position/temps estimé ;
  - si **position 1** → redirige vers `/questions/display` ;
  - sinon, affiche une page avec :
    - la question,
    - la position,
    - le temps estimé,
    - un meta refresh toutes les 5 s.

Cette page ne communique pas directement avec les Arduino : elle prépare juste l’utilisateur à l’affichage.

#### 5.7. Page d’affichage (`src/app/questions/display/page.tsx`)

Rôle : **point de synchronisation** entre l’utilisateur et les Arduino/ESP32.

1. Vérifie la présence de `userId`. Si absent : page d’erreur.
2. Lit la **tête de file** Redis (`lrange 0 0`).
3. Si Redis est indisponible ou la file vide :
   - envoie un **message par défaut** aux afficheurs :
     - WLED : `ECOLE DES METIERS DE FRIBOURG` ;
     - afficheur 4 digits : ID `255`.
   - affiche une page indiquant “Aucune question en attente d’affichage”.
4. Sinon, parse la tête de file en `QueueEntry` `currentEntry` et vérifie que `currentEntry.userId === userId` :
   - si non, l’utilisateur n’est plus en tête → redirection immédiate vers `/questions/queue` (mise à jour de sa position).
   - si oui, l’utilisateur est réellement en tête :
     - envoie à WLED le texte `reponse_detaillee` (ou `question` à défaut) via `sendQuestionToWled`.
     - envoie à l’afficheur 4 digits `id` (ou `255` si parsing raté) via `sendQuestionIdToDisplay`.
5. Rend une page HTML avec :
   - badge “🎉 EN COURS D’AFFICHAGE” ;
   - la question ;
   - un **compte à rebours 30 s** (timer + barre de progression).
   - un script inline qui :
     - décrémente le temps toutes les secondes,
     - met à jour l’affichage,
     - à la fin, appelle `/api/disconnect` en POST avec `userId`, `clientip`, `clientmac`,
     - puis remplace le `body` par un écran “Merci, vous allez être déconnecté…”.

C’est la seule page qui exécute du JavaScript côté client, de manière contrôlée.

---

### 6. Communication avec les Arduino / ESP32

#### 6.1. Afficheur texte WLED (`src/lib/wled.ts`)

- **URL** :
  - par défaut `http://192.168.2.120/json/state` (surchargé par la variable `WLED_URL` le cas échéant).

- **Normalisation du texte** :
  - suppression des accents (`NFD` + filtrage des diacritiques) ;
  - passage en **majuscules** ;
  - troncature au besoin (longueur max 64 caractères) avec `...`.

- **Payload envoyé** :
  - champ principal `seg[0].n = <texte>` ;
  - paramètres de segment adaptés pour l’effet texte défilant WLED (effet `fx=122`, vitesse `sx`, etc.) ;
  - couleur définie dans `col` (RGB).

- **Fonction principale** : `sendQuestionToWled(textInput: string)` :
  - normalise le texte ;
  - construit le JSON complet attendu par WLED ;
  - fait un `fetch` `POST` JSON avec un timeout de 3 s.

Cette fonction est appelée :

- depuis `questions/display/page.tsx` pour afficher la question ou la réponse détaillée ;
- depuis `/api/disconnect` (via `advanceQueueIfHeadMatches`) lorsque la file devient vide, pour remettre un texte “idle” (“ECOLE DES METIERS DE FRIBOURG”).

#### 6.2. Afficheur 4 digits (`src/lib/numberDisplay.ts`)

- **URL** :
  - `NUMBER_DISPLAY_URL` ou par défaut `http://192.168.2.130/data`.

- **Fonction** : `sendQuestionIdToDisplay(id: number)` :
  - nettoie l’ID (entier, fallback 255) ;
  - construit un body `application/x-www-form-urlencoded` : `datain=<id>` ;
  - envoie la requête en `POST` avec timeout de 3 s.

Utilisation :

- depuis `questions/display/page.tsx` pour afficher l’ID de la question choisie ;
- depuis `/api/disconnect` quand la file d’attente devient vide (ID `255` = état d’attente).

---

### 7. Intégration avec OpenNDS – API `/api/disconnect`

Fichier : `src/app/api/disconnect/route.ts`.

#### 7.1. Rôle

- Recevoir un POST du navigateur (après le compte à rebours) contenant :
  - `clientip` et/ou `clientmac` ;
  - `userId` (identifiant de file).
- Appeler la passerelle OpenNDS sur :
  - `http://<OPENNDS_GATEWAY>/cgi-bin/disconnect.cgi` (gateway configurable via `OPENNDS_GATEWAY`, défaut `192.168.1.1`).
- **Avancer la file d’attente** dans Redis si l’utilisateur en cours est bien en tête.
- Répondre au navigateur avec un JSON `success: true` dans tous les cas (même si la gateway renvoie une erreur) pour ne pas bloquer l’UX.

#### 7.2. Fonction `advanceQueueIfHeadMatches(userId)`

1. Vérifie que `userId` est présent.
2. Lit la tête de file Redis (`lindex('questions:queue', 0)`).
3. Si la tête est absente ou invalide :
   - log et sortie sans action.
4. Parse la tête en `QueueEntry` et compare `head.userId` avec `userId` reçu.
5. Si ça correspond :
   - `lpop('questions:queue')` → on retire la tête de file.
   - on log l’élément qui vient de terminer son affichage.
   - on teste si la file est désormais vide (`lindex(0)`) :
     - si oui, on envoie l’état “idle” aux Arduino :
       - `sendQuestionToWled('ECOLE DES METIERS DE FRIBOURG')` ;
       - `sendQuestionIdToDisplay(255)`.

Cette fonction est toujours appelée via `safeRedisOperation` pour rester robuste.

#### 7.3. Handler `POST`

- Récupère `clientip`, `clientmac`, `userId` du body JSON.
- Compose l’URL de la gateway OpenNDS.
- Fait un `fetch` `POST` JSON vers `disconnect.cgi` (avec timeout 5 s).
- Essaie de parser la réponse en JSON (mais ne l’exige pas).
- Appelle ensuite `advanceQueueIfHeadMatches(userId)` quel que soit le résultat du `fetch`.
- Renvoie une réponse JSON `success: true` avec un message explicite.

Ce design garantit que, même si la gateway OpenNDS a un souci, la **file d’attente côté Redis continue à avancer** et les visiteurs ne restent pas bloqués.

---

### 8. Configuration et scripts

#### 8.1. Variables d’environnement

Dans un fichier `.env.local` à la racine :

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
WLED_URL=http://192.168.2.120/json/state
NUMBER_DISPLAY_URL=http://192.168.2.130/data
OPENNDS_GATEWAY=192.168.1.1
```

- Si `WLED_URL` ou `NUMBER_DISPLAY_URL` ne sont pas définies, les valeurs par défaut du code sont utilisées.
- Si Redis n’est pas disponible, `safeRedisOperation` renvoie des valeurs de fallback et les pages affichent un message d’attente plutôt que d’échouer.

#### 8.2. Commandes npm

```bash
npm install
npm run dev      # développement
npm run build    # build de production
npm start        # exécution du build
npm run lint     # linting
```

---

### 9. Résumé des parties les plus importantes

- **File d’attente Redis** :
  - ajout dans `questions/queue/page.tsx` (entrée depuis la liste de questions) ;
  - lecture/position dans `questions/queue/page.tsx` ;
  - tête de file + envoi aux Arduino dans `questions/display/page.tsx` ;
  - sortie de file dans `/api/disconnect` via `advanceQueueIfHeadMatches`.

- **Communication Arduino / ESP32** :
  - `src/lib/wled.ts` : envoi du texte normalisé à WLED (panneau LED) ;
  - `src/lib/numberDisplay.ts` : envoi de l’ID à l’afficheur 4 digits ;
  - appels dans `questions/display/page.tsx` et `/api/disconnect`.

- **Intégration OpenNDS** :
  - pages HTML complètes, sans framework côté client (sauf JS minimal du timer) ;
  - conservation de `clientip` / `clientmac` via les champs cachés ;
  - déconnexion gérée par `/api/disconnect`, appelée automatiquement après le compte à rebours.

Ce document sert de vue d’ensemble technique pour administrer, maintenir ou faire évoluer le portail captif EMF.


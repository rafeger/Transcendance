# Spécification du jeu — règles du quiz & protocole temps réel

> Issues #7 (spécification), #20 (salons), #21 (moteur), #23 (écran de jeu)
> Statut : **v2** — alignée sur le code de la branche 21 (salons d'Andrea, #20, inclus).
> **Le serveur fait autorité.** Le client affiche, le serveur décide (timer, score, bonne réponse).

Dans les tableaux, la colonne **Statut** indique ce qui existe déjà :
**fait** = présent sur la branche 21 · **commit N** = prévu, avec son numéro dans le découpage #21/#23.

## 0. Changements depuis la v1

- **Transport** : socket.io (déjà en place) au lieu d'un WebSocket brut sur `/ws/game`.
- **Réponses aux requêtes** : accusés de réception socket.io (`{ ok, code }`) au lieu de `reqId`, `answer:ack` et `error`.
- **Authentification** : refus au handshake avec `connect_error` (`UNAUTHORIZED`) au lieu du code de fermeture `4001`.
- **Plusieurs onglets** autorisés pour un même joueur (au lieu de « la nouvelle connexion remplace l'ancienne », code `4002`).
- **Questions** : tirées de notre base (5 296 questions OpenTDB importées par #16), plus d'appel à OpenTDB pendant une partie.
- **Réglages** : 2 à 6 joueurs ; le réglage « type de question » est retiré en v1 ; plus de boosts.
- **Règles ajoutées** : départage, tolérance de latence (300 ms), rematch dans le même salon, grâce de 5 s dans le lobby.
- **Persistance** : sur les tables existantes `Game` / `GamePlayer`, avec un `Game` créé dès le lancement.
- **Salons** : nom et salon public / privé (liste des salons publics) ajoutés par #20.

---

## 1. Règles du quiz

### 1.1 Format d'une partie

| Paramètre                  | Valeur par défaut | Choix possibles                            | Fixé à               |
| -------------------------- | ----------------- | ------------------------------------------ | -------------------- |
| Joueurs max                | 4                 | 2 à 6                                      | la création du salon |
| Nombre de questions        | 5                 | 5 / 10 / 15                                | le lancement         |
| Catégorie                  | Mix (`null`)      | une catégorie OpenTDB (`opentdbId`) ou Mix | le lancement         |
| Difficulté                 | Mix (`null`)      | `easy` / `medium` / `hard` ou Mix          | le lancement         |
| Temps par question         | 15 s              | fixe                                       | —                    |
| Tolérance de latence       | 300 ms            | fixe                                       | —                    |
| Temps de révélation        | 4 s               | fixe                                       | —                    |
| Compte à rebours de départ | 3 s               | fixe                                       | —                    |

L'hôte (créateur du salon) choisit les paramètres dans le `LOBBY`. Ils sont figés au lancement.
Les types de questions (QCM à 4 choix, Vrai / Faux) sont mélangés : le réglage « type » de la v1 est retiré, faute de colonne pour le filtrer dans `Game`.

### 1.2 Déroulement

1. Un joueur crée un salon (il en devient l'hôte) ; les autres le rejoignent par son code ou depuis la liste des salons publics.
2. Chaque joueur, hôte compris, se déclare prêt. Quand **tous** sont prêts et qu'il y a **au moins 2 joueurs**, l'hôte peut lancer.
3. Au lancement, le serveur crée la partie en base et tire les questions **avant** le compte à rebours. S'il n'y en a pas assez, le lancement est refusé (`QUESTIONS_UNAVAILABLE`) et le salon reste dans le `LOBBY`.
4. Compte à rebours de 3 s.
5. Pour chaque question :
   - tous les joueurs voient la même question au même moment ;
   - chacun envoie **une seule** réponse, définitive ;
   - la question se termine quand **tous les joueurs connectés ont répondu** ou quand le **timer expire** ; sans réponse, c'est 0 point.
6. Révélation (4 s) : bonne réponse, réponse de chaque joueur, points gagnés, classement.
7. Après la dernière question : écran de fin, résultats enregistrés en base.
8. L'hôte peut relancer une partie dans le même salon (**rematch**) : retour au `LOBBY`, mêmes joueurs, tout le monde « non prêt ».

### 1.3 Barème

Une mauvaise réponse ou une absence de réponse rapporte **0 point** (pas de points négatifs).

Une bonne réponse rapporte :

```
points = round( base × (0.5 + 0.5 × temps_restant / temps_total) )
```

| Difficulté | `base` | Réponse instantanée | Réponse à la dernière seconde |
| ---------- | ------ | ------------------- | ----------------------------- |
| easy       | 100    | 100                 | ~50                           |
| medium     | 200    | 200                 | ~100                          |
| hard       | 300    | 300                 | ~150                          |

- `temps_restant` est calculé **par le serveur, à la réception** de la réponse (jamais à partir d'une heure envoyée par le client), puis borné entre 0 et `temps_total`.
- La difficulté utilisée est celle de la question (en Mix, une même partie mélange les barèmes).

**Départage** du classement : score décroissant, puis nombre de bonnes réponses décroissant, puis temps cumulé des bonnes réponses croissant. Les joueurs forfait sont classés derniers.

### 1.4 Déconnexion et abandon

| Situation                      | Comportement                                                                                                                                           | Statut    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Déconnexion dans le `LOBBY`    | Le joueur a **5 s** pour revenir (un F5 ne le fait pas sortir). Passé ce délai, il est retiré du salon.                                                | fait      |
| L'hôte quitte le `LOBBY`       | L'hôte passe au joueur arrivé le plus tôt ; s'il n'en reste aucun, le salon est supprimé.                                                              | fait      |
| Déconnexion pendant la partie  | La partie continue. Le joueur a **15 s** pour revenir et reprend à la question en cours (il récupère l'état complet). Les questions manquées valent 0. | commit 13 |
| Pas de retour en 15 s          | Le joueur est marqué forfait et classé dernier.                                                                                                        | commit 13 |
| Un seul joueur restant         | La partie s'arrête, le joueur restant gagne par forfait.                                                                                               | commit 13 |
| `room:leave` pendant la partie | Forfait immédiat (pas de délai).                                                                                                                       | commit 13 |

« Déconnecté » veut dire : **aucun** onglet de ce joueur n'est connecté. La condition « tous ont répondu » ne compte que les joueurs connectés.

### 1.5 Questions

Les questions viennent de **notre base** : le seed (#16) importe 5 296 questions OpenTDB, soit quasiment tout leur catalogue. Le jeu n'appelle pas OpenTDB pendant une partie (plus de rate limit ni de session token à gérer).

Le tirage est fait par `QuestionsService` (#17) :

- au lancement, une ligne `Game` est créée avec la catégorie et la difficulté choisies, puis `pickQuestion(gameId, count)` tire `count` questions au hasard qui correspondent et les inscrit dans `GameQuestion` (ordre = `position`) ;
- les choix de chaque question sont mélangés de façon **stable pour une partie** (`md5(gameId-answerId)`) et reçoivent les identifiants `"a"`, `"b"`, `"c"`, `"d"` : un joueur qui se reconnecte retrouve les mêmes lettres ;
- la bonne réponse **reste sur le serveur** : seuls les champs publics partent dans `question:new` (voir §2.5).

| Point                                                                                                   | Statut                           |
| ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Tirage + mélange des choix                                                                              | branche 17, intégrée au commit 8 |
| Mix (catégorie et/ou difficulté à `null`) : colonnes rendues optionnelles + filtre `IS NULL OR …`       | commits 5 et 8                   |
| `countAvailable(categoryOpentdbId, difficulty)` : nombre de questions disponibles, sans créer de `Game` | commit 8                         |
| Erreur typée `NotEnoughQuestionsError`, traduite en `QUESTIONS_UNAVAILABLE`                             | commit 8                         |
| Vrai / Faux dans un ordre fixe (True puis False)                                                        | facultatif                       |

Le nombre de questions disponibles est vérifié **dès que l'hôte change les réglages** (pas seulement au lancement) : 6 combinaisons catégorie / difficulté sur 72 ont moins de 15 questions.

### 1.6 Anti-triche

- La bonne réponse n'est jamais envoyée avant la révélation : `question:new` est construit champ par champ (ni `correctChoiceId`, ni id de question en base).
- Une seule réponse par joueur et par question, même avec plusieurs onglets ; les suivantes sont rejetées (`ALREADY_ANSWERED`).
- Réponse reçue après `deadline` + 300 ms → rejetée (`TOO_LATE`).
- Pendant la question, les autres joueurs voient **qui** a répondu, jamais **ce qu'il** a répondu.

### 1.7 Hors périmètre v2

- Bot / mode solo : on garde l'idée, mais rien n'est prévu dans #21 / #23.
- Matchmaking automatique.
- Appel en direct à OpenTDB.

---

## 2. Protocole temps réel (socket.io)

### 2.1 Connexion et authentification — fait

- **Transport** : socket.io, namespace par défaut, chemin `/socket.io/`. En production, Nginx le transmet au backend derrière HTTPS (`https://localhost:8443`) ; en dev, Vite le transmet (`http://localhost:5173`). Jamais de connexion directe au port du backend depuis le navigateur.
- **Client** : un seul socket partagé (`frontend/src/lib/socket.ts`), `io({ autoConnect: false, withCredentials: true })`. Il est connecté après la connexion de l'utilisateur et déconnecté à sa déconnexion (`AuthContext`).
- **Authentification** : le JWT est dans le cookie `access_token` (`httpOnly`, `Secure`, `SameSite=Lax`, 1 h), envoyé automatiquement au handshake. Le backend enchaîne deux middlewares socket.io **avant** d'accepter la connexion :
  1. vérification du JWT → `socket.data.userId` (nombre, `User.id`) ;
  2. chargement du profil en base → `socket.data.profile` (`displayName`, `avatarUrl`).
- **Refus** (cookie absent, JWT invalide ou expiré, utilisateur introuvable) : le client reçoit `connect_error` avec `err.message === 'UNAUTHORIZED'`. Socket.io ne retente pas tout seul après un refus : le front doit renvoyer vers la page de connexion.
- **Plusieurs onglets** : chaque onglet a son propre socket, tous rattachés au même `userId`. Les messages d'un salon sont diffusés à **tous** les sockets de ses joueurs (canal `room:<code>`).
- **Expiration** : le JWT n'est vérifié qu'au handshake. Un socket ouvert survit à l'expiration du token ; une reconnexion après expiration est refusée.
- **Origin** : non vérifiée pour l'instant. Le risque est faible, car le cookie `SameSite=Lax` n'est pas envoyé depuis un autre site. Vérification prévue dans #31 (`allowRequest`).

### 2.2 Format des messages — fait

Chaque message est un événement socket.io : son **nom** remplace le `type` de la v1 (format `domaine:action`), et son contenu est un objet JSON.

Les types TypeScript de tous les événements, payloads, codes d'erreur et constantes sont dans `backend/src/game/protocol.ts` (`ClientToServerEvents`, `ServerToClientEvents`). Toute modification du protocole se fait là **et** dans cette spec.

**Client → serveur, avec accusé de réception.** Le client passe un callback (ou utilise `emitWithAck`). Le serveur y répond toujours par :

```ts
type Ack<T> = ({ ok: true } & T) | { ok: false; code: ErrorCode };
```

```ts
const res = await socket
  .timeout(5000)
  .emitWithAck('room:join', { roomCode: 'k7q2pm' });
if (!res.ok) showError(res.code); // ex. 'ROOM_FULL'
```

**Serveur → client** : `socket.on('room:state', (room) => …)`. Les messages du jeu (`game:*`, `question:*`, `player:*`) portent en plus `ts`, l'heure serveur en epoch ms (voir §2.6).

**Payload invalide** (champ manquant, en trop, mauvais type) : l'accusé de réception vaut `{ ok: false, code: 'BAD_MESSAGE', details: [...] }`, où `details` liste les problèmes (utile pour déboguer le front). Si le client n'a pas passé de callback, le serveur émet à la place l'événement `exception` (comportement de Nest).

**Limites** :

- taille max d'un message client : **4 Ko** ; au-delà, socket.io coupe la connexion (raison côté client : `transport close`) ;
- heartbeat : celui de socket.io (ping toutes les 25 s, coupure après 20 s sans réponse) ; Nginx coupe après 120 s d'inactivité ;
- limite de 20 messages / s : prévue dans #31.

### 2.3 États d'un salon

```
            room:start                    3 s                   tous ont répondu / timeout
  LOBBY ───────────────▶ (COUNTDOWN) ──────────▶ (QUESTION) ─────────────────────────▶ (REVEAL)
    ▲                                                 ▲                                    │
    │ room:rematch (hôte)                             └────────── question suivante ──────┤
    │                                                                                      │ dernière question
    └──────────────────────────────── FINISHED ◀───────────────────────────────────────────┘
```

- `RoomState.state` vaut `LOBBY`, `PLAYING` ou `FINISHED`. Les phases entre parenthèses sont celles de la partie en cours (`GameState.phase`, commit 9) pendant que le salon est en `PLAYING`. Aujourd'hui (#20), seuls `LOBBY` et `PLAYING` existent.
- Un salon en `PLAYING` ou `FINISHED` n'apparaît pas dans la liste des salons publics et refuse les nouveaux joueurs.
- Une action impossible dans l'état actuel répond `{ ok: false, code: 'INVALID_STATE' }`.

### 2.4 Messages client → serveur

| Événement       | Payload                                   | Condition                                | Effet / réponse                                                                                                                  | Statut                      |
| --------------- | ----------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `session:sync`  | —                                         | connecté                                 | `{ ok, rooms: RoomSummary[], currentRoom: RoomState \| null }` (+ `currentGame` au commit 13). À envoyer à chaque (re)connexion. | fait                        |
| `room:create`   | `{ name, maxPlayers, isPublic }`          | dans aucun salon                         | Crée le salon, l'émetteur devient hôte. `{ ok, room }`                                                                           | fait                        |
| `room:join`     | `{ roomCode }`                            | dans aucun salon (ou déjà dans celui-ci) | Rejoint un salon en `LOBBY`. Code insensible à la casse et aux espaces. `{ ok, room }`                                           | fait                        |
| `room:leave`    | —                                         | —                                        | Quitte le salon (rien si on n'est dans aucun salon ; forfait si partie en cours, commit 13). `{ ok }`                            | fait                        |
| `room:ready`    | `{ ready: boolean }`                      | `LOBBY`                                  | Change son statut « prêt ». `{ ok }`                                                                                             | fait                        |
| `room:settings` | `{ questionCount, category, difficulty }` | `LOBBY`, hôte                            | Modifie les réglages, remet tout le monde « non prêt ». Vérifie les questions disponibles. `{ ok }`                              | fait (questions : commit 8) |
| `room:start`    | —                                         | `LOBBY`, hôte, ≥ 2 joueurs, tous prêts   | Verrouille le salon (`PLAYING`) puis lance la partie. `{ ok }`                                                                   | commit 9 (règles : fait)    |
| `answer:submit` | `{ questionIndex, choiceId }`             | phase `QUESTION`                         | Enregistre la réponse (une seule fois), sans dire si elle est juste. `{ ok }`                                                    | commit 9                    |
| `room:rematch`  | —                                         | `FINISHED`, hôte                         | Retour au `LOBBY`, mêmes joueurs, tous « non prêt ». `{ ok }`                                                                    | commit 13                   |
| `room:kick`     | `{ userId }`                              | `LOBBY`, hôte                            | Retire un joueur (bouton « Remove » du lobby).                                                                                   | facultatif                  |

Validation des payloads :

- `name` : 1 à 30 caractères (espaces de début et de fin retirés) ; `maxPlayers` : entier de 2 à 6 ; `isPublic` : booléen ;
- `roomCode` : chaîne de 1 à 10 caractères ;
- `questionCount` ∈ {5, 10, 15} ; `category` : `opentdbId` existant ou `null` ; `difficulty` ∈ {`easy`, `medium`, `hard`} ou `null`.

### 2.5 Messages serveur → client

| Événement             | Destinataires                      | Payload                                                                                                                                             | Statut    |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `room:state`          | tous les sockets du salon          | `RoomState` complet, à chaque changement                                                                                                            | fait      |
| `lobby:rooms`         | tous les sockets connectés         | `RoomSummary[]`, à chaque changement de la liste des salons publics                                                                                 | fait      |
| `room:closed`         | tous les sockets du joueur sortant | `{ code }` — le joueur n'est plus dans ce salon (départ ou fin du délai de grâce)                                                                   | fait      |
| `game:countdown`      | salon                              | `{ ts, startsAt }`                                                                                                                                  | commit 9  |
| `question:new`        | salon                              | `{ ts, index, total, category, difficulty, type, text, choices: [{ id, text }], deadline, durationMs }`                                             | commit 9  |
| `question:progress`   | salon                              | `{ ts, index, answered: userId[] }`                                                                                                                 | commit 9  |
| `question:reveal`     | salon                              | `{ ts, index, correctChoiceId, results: [{ userId, choiceId \| null, correct, points, responseMs \| null }], scores: [{ userId, score }], nextAt }` | commit 9  |
| `game:over`           | salon                              | `{ ts, ranking: [{ userId, score, correctCount, totalCorrectMs, forfeit, rank }], winnerId \| null, gameId }`                                       | commit 9  |
| `player:disconnected` | salon                              | `{ ts, userId, graceUntil }`                                                                                                                        | commit 13 |
| `player:reconnected`  | salon                              | `{ ts, userId }`                                                                                                                                    | commit 13 |
| `player:forfeit`      | salon                              | `{ ts, userId }`                                                                                                                                    | commit 13 |

Dans `question:new`, `category` est le **nom** de la catégorie (pour l'affichage), `difficulty` vaut `easy` / `medium` / `hard`, `type` vaut `multiple` ou `boolean`, `text` est du **texte brut** (à afficher comme texte, jamais via `dangerouslySetInnerHTML`). `deadline` est un instant serveur (epoch ms).

`RoomState` (champs marqués _commit N_ : à venir) :

```json
{
  "code": "K7Q2PM",
  "name": "Salon de raph",
  "isPublic": true,
  "state": "LOBBY",
  "hostId": 12,
  "maxPlayers": 4,
  "settings": { "questionCount": 5, "category": null, "difficulty": null },
  "players": [
    {
      "userId": 12,
      "displayName": "raph",
      "avatarUrl": "/api/avatars/default.svg",
      "ready": true,
      "connected": true
    }
  ]
}
```

- `connected` : _commit 13_ ; `state: "FINISHED"` : utilisé à partir du commit 9.
- Les joueurs sont dans l'ordre d'arrivée (le premier est l'hôte d'origine).
- Le code fait 6 caractères, tirés d'un alphabet sans `0`, `O`, `1`, `I` ni `L` (lisible à voix haute).

`RoomSummary` (liste des salons publics en `LOBBY`) :

```json
{
  "code": "K7Q2PM",
  "name": "Salon de raph",
  "hostName": "raph",
  "playerCount": 1,
  "maxPlayers": 4
}
```

**Reconnexion pendant une partie** (commit 13) : `session:sync` renvoie aussi `currentGame`, l'état de la partie en cours (phase, scores, question en cours sous la forme de `question:new` + `myAnswer: choiceId | null`), pour que le client se réaffiche sans état local.

### 2.6 Synchronisation du temps

Les horloges du client et du serveur ne sont pas alignées. Le serveur envoie des instants absolus (`deadline`, `startsAt`, `nextAt`) **et** son heure `ts` sur chaque message de jeu. Le client calcule :

```
offset  = ts - Date.now()                 // à la réception
restant = deadline - (Date.now() + offset)
```

Le timer affiché est purement visuel : seule l'heure du serveur compte pour accepter une réponse.

### 2.7 Codes d'erreur

Renvoyés dans l'accusé de réception (`{ ok: false, code }`) ; la connexion reste ouverte.

| `code`                  | Cas                                                                                                | Statut   |
| ----------------------- | -------------------------------------------------------------------------------------------------- | -------- |
| `ROOM_NOT_FOUND`        | Code de salon inconnu                                                                              | fait     |
| `ROOM_FULL`             | Salon plein                                                                                        | fait     |
| `ALREADY_IN_ROOM`       | Le joueur est déjà dans un autre salon                                                             | fait     |
| `INVALID_STATE`         | Action impossible dans l'état actuel (ou hors d'un salon)                                          | fait     |
| `BAD_MESSAGE`           | Payload mal formé ; l'accusé contient aussi `details` (voir §2.2)                                  | fait     |
| `NOT_HOST`              | Action réservée à l'hôte                                                                           | fait     |
| `NOT_ENOUGH_PLAYERS`    | Lancement avec moins de 2 joueurs ou des joueurs non prêts                                         | commit 9 |
| `QUESTIONS_UNAVAILABLE` | Pas assez de questions pour ces réglages ; l'accusé contient aussi `available` (nombre disponible) | commit 8 |
| `ALREADY_ANSWERED`      | Deuxième réponse à la même question                                                                | commit 9 |
| `WRONG_QUESTION`        | `questionIndex` différent de la question en cours                                                  | commit 9 |
| `TOO_LATE`              | Réponse après `deadline` + 300 ms                                                                  | commit 9 |
| `INVALID_CHOICE`        | `choiceId` qui n'existe pas pour cette question                                                    | commit 9 |
| `UNAUTHORIZED`          | Socket sans identité (ne devrait pas arriver : le handshake l'aurait refusé)                       | fait     |
| `INTERNAL_ERROR`        | Erreur inattendue côté serveur (détail dans les logs du backend, jamais envoyé au client)          | fait     |
| `RATE_LIMITED`          | Trop de messages (> 20 / s)                                                                        | #31      |

**Connexion refusée ou coupée** (remplace les codes de fermeture de la v1) :

| Ce que voit le client                         | Cause                                                          |
| --------------------------------------------- | -------------------------------------------------------------- |
| `connect_error`, `message === 'UNAUTHORIZED'` | Cookie absent, JWT invalide ou expiré, utilisateur introuvable |
| `disconnect`, raison `transport close`        | Message de plus de 4 Ko, ou réseau coupé                       |
| `disconnect`, raison `io server disconnect`   | Coupé volontairement par le serveur                            |

### 2.8 Exemple de séquence (duel)

```
A → room:create {name, maxPlayers:2, isPublic:true}   ← ack {ok, room:{code:"K7Q2PM"}}
                                                       S → A    room:state {players:[A]}
                                                       S → tous lobby:rooms [...]
B → room:join {roomCode:"k7q2pm"}                      ← ack {ok, room}
                                                       S → A,B  room:state {players:[A,B]}
A → room:settings {questionCount:10, category:null, difficulty:"medium"}   ← ack {ok}
                                                       S → A,B  room:state
A → room:ready {ready:true}                            S → A,B  room:state
B → room:ready {ready:true}                            S → A,B  room:state
A → room:start                                         ← ack {ok}   (Game créé, 10 questions tirées)
                                                       S → A,B  game:countdown {ts, startsAt}
                                                       S → A,B  question:new {index:0, choices:[a,b,c,d], deadline}
B → answer:submit {questionIndex:0, choiceId:"c"}      ← ack {ok}
                                                       S → A,B  question:progress {answered:[B]}
A → answer:submit {questionIndex:0, choiceId:"a"}      ← ack {ok}
                                                       S → A,B  question:reveal {correctChoiceId:"c", results, scores, nextAt}
   … ×10 …
                                                       S → A,B  game:over {ranking, winnerId:B, gameId}
A → room:rematch                                       ← ack {ok}
                                                       S → A,B  room:state {state:"LOBBY"}
```

---

## 3. Persistance

Les salons vivent **en mémoire** du backend (une seule instance : ne pas activer `@socket.io/cluster-adapter`). Une partie lancée est enregistrée dans les tables existantes :

| Moment        | Écriture                                                                                                                                                                                                                        | Statut    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `room:start`  | `Game` créé (statut `IN_PROGRESS`, catégorie et difficulté, `null` pour Mix ; titre = code du salon ; mode `DUEL` à 2 joueurs, `MULTIPLAYER` au-delà) + `GameQuestion` par le tirage. `Game.id` = `gameId`.                     | commit 8  |
| Fin de partie | En une transaction : `Game` passe en `FINISHED` (ou `CANCELLED` si arrêt anticipé), `endedAt` ; une ligne `GamePlayer` par joueur (score, bonnes réponses, forfait, rang) ; `User.totalScore` et `User.gamesPlayed` mis à jour. | commit 14 |

Migration nécessaire (commit 5) : `Game.categoryId` et `Game.difficulty` optionnels (Mix) ; ajout de `correctCount`, `forfeit` et `rank` dans `GamePlayer`. `Game.title` reste obligatoire : il reçoit le code du salon.

Ces données alimentent l'historique et les statistiques du profil (page stats, #38 : score, rang, adversaires par partie).

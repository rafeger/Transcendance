# Spécification du jeu — règles du quiz & protocole WebSocket

> Issue #7 — `[Jeu] Spécifier les règles du quiz et le protocole WebSocket`
> Statut : **brouillon v1** — à valider par l'équipe avant implémentation.
> **le serveur fait autorité**. Le client affiche, le serveur décide (timer, score, bonne réponse).

---

## 1. Règles du quiz

### 1.1 Format d'une partie

| Paramètre | Valeur par défaut | Choix possibles |
|---|---|---|
| Joueurs | 2 | 2 à 6 |
| Nombre de questions | 5 | 5 / 10 / 15 | ou slider ?
| Catégorie | Mix | n'importe quelle catégorie OpenTDB |
| Difficulté | Mix | `easy` / `medium` / `hard` / mix |
| Type de question | Fixe | tjr 4 choix (peut etre modif par boosts in game) |
| Temps par question | 15 s | fixe |
| Temps de révélation | 4 s | fixe |
| Compte à rebours de départ | 3 s | fixe |

L'hôte (créateur du salon) choisit les paramètres. Les paramètres sont figés au lancement.

### 1.2 Déroulement

1. Les joueurs rejoignent un salon (`LOBBY`).
2. Chaque joueur se déclare prêt. Quand tous sont prêts et qu'il y a au moins 2 joueurs, l'hôte peut lancer. Si pas 2 joueur offrir possibilite dajouter un bot ?
3. Le serveur récupère les questions **avant** le compte à rebours. Si erreur du fetch des questions alors erreur cote client affiche
4. Compte à rebours de 3 s (`COUNTDOWN`).
5. Pour chaque question (`QUESTION`) :
   - tous les joueurs voient la même question en même temps ;
   - chacun envoie **une seule** réponse, définitive ;
   - la question se termine quand **tous les joueurs connectés ont répondu** ou quand le **timer expire**. Si le timer expire, compte comme fausse reponse
6. Révélation (`REVEAL`, 4 s) : bonne réponse, réponse de chaque joueur, points gagnés, classement.
7. Après la dernière question : écran de fin (`FINISHED`), résultats enregistrés en base.

### 1.3 Barème

Une mauvaise réponse ou une absence de réponse rapporte **0 point** (pas de points négatifs).

Une bonne réponse rapporte :

```
points = round( base × (0.5 + 0.5 × temps_restant / temps_total) )
```
Ainsi la rapidite de reponse rentre en compte dans le calcul des points, une reponse rapide est recompensee.

| Difficulté | `base` | Réponse instantanée | Réponse à la dernière seconde |
|---|---|---|---|
| easy | 100 | 100 | ~50 |
| medium | 200 | 200 | ~100 |
| hard | 300 | 300 | ~150 |

- Pour calculer le temps restant, cela se fait cote serv a la reception de la reponse, pas du cote client sinn on peut tricher en modifiant lhorodatage etc fin bon ca arrivera pas mais faut y penser


### 1.4 Déconnexion et abandon

| Situation | Comportement |
|---|---|
| Déconnexion pendant la partie | La partie continue. Le joueur a **15 s** pour se reconnecter et reprend à la question en cours (il récupère l'état complet). Les questions manquées valent 0. |
| Pas de reconnexion en 15 s | Le joueur est marqué `forfeit`. Il est classé dernier. |
| Un seul joueur restant | La partie s'arrête, le joueur restant gagne par forfait. |
| Message `room:leave` pendant la partie | Forfait immédiat (pas de délai). |
| Déconnexion dans le `LOBBY` | Le joueur est retiré du salon. Si c'était l'hôte, le salon est transféré au joueur arrivé le plus tôt ; s'il n'en reste aucun, le salon est supprimé. |

La condition « tous ont répondu » ne prend en compte que les joueurs **connectés**.

### 1.5 Questions (OpenTDB)

Contraintes de l'API publique d'OpenTDB à respecter :

- **1 requête toutes les 5 s par IP** → ne jamais appeler OpenTDB par question ; charger toutes les questions d'une partie **en une seule requête** , et sérialiser les appels côté serveur (file d'attente globale).
- Utiliser un **session token** par salon pour éviter les doublons ; gérer les codes retour :
  - `0` OK · `1` pas assez de questions · `2` paramètre invalide · `3` token introuvable · `4` token épuisé (faire un reset) · `5` rate limit (réessayer après 5 s).
- Fallback recommandé : un cache local de questions en base, utilisé si OpenTDB échoue ou rate-limit (sinon la défense dépend d'un service externe). On peut peut etre charger un set de 1000 questions en interne sur la database perso, a voir la taille que ca prends.

Côté serveur, chaque question est normalisée :

- les choix (bonne + mauvaises) sont **mélangés par le serveur** et reçoivent un identifiant (`"a"`, `"b"`, `"c"`, `"d"`) ;
- la bonne réponse **reste en mémoire serveur** et n'est envoyée qu'à la révélation.
- Si on prends des sets de questions en booleen. Il faut gerer ce cas qu niveau du stockage dans la database. Normaliser la maniere de stocker les reponses.

### 1.6 Anti-triche

- La bonne réponse n'est jamais présente dans `question:new` (cote client).
- Une seule réponse acceptée par joueur et par question ; les suivantes sont rejetées (`ALREADY_ANSWERED`).
- Réponse reçue après la `deadline` → rejetée (`TOO_LATE`).
- Pendant la question, les autres joueurs voient **qui** a répondu, mais pas linformation de ce quils ont repondu. Donc un petit voyant en mode X a valide sa reponse.
- PAS DE REPONSE A LECRIT ? si lon restreint le type de reponse a un click entre 4 options pas de risque de prompt injection, dabus de valeurs inconnues etc etc.

---

## 2. Protocole WebSocket

### 2.1 Connexion et authentification

- Endpoint : `wss://<host>/ws/game` (derrière le reverse proxy HTTPS, **jamais** de `ws://` en clair).
- Authentification : le navigateur ne peut pas mettre d'en-tête `Authorization` sur un WebSocket. Deux options :
  - **Recommandé** : cookie `httpOnly; Secure; SameSite=Strict` contenant le JWT, lu au handshake HTTP. Connexion refusée si absent/invalide.
  - Alternative : premier message `auth` avec le token, à envoyer dans les 5 s sinon fermeture `4001`.
  - Ne **pas** mettre le token dans l'URL (`?token=`) : il fuit dans les logs du proxy.
- Vérifier l'en-tête `Origin` au handshake.
- Une seule connexion de jeu active par utilisateur : une nouvelle connexion remplace l'ancienne (l'ancienne est fermée avec `4002`). C'est aussi le mécanisme de reconnexion.

### 2.2 Format des messages

Tout est en JSON, un objet par trame.

**Client → serveur**

```json
{ "type": "answer:submit", "reqId": "c-42", "payload": { "questionIndex": 3, "choiceId": "b" } }
```

**Serveur → client**

```json
{ "type": "answer:ack", "reqId": "c-42", "ts": 1761665000123, "payload": { "questionIndex": 3 } }
```

| Champ | Sens |
|---|---|
| `type` | Nom du message, format `domaine:action`. |
| `reqId` | Optionnel, fourni par le client. Le serveur le renvoie dans la réponse directe (`ack` ou `error`) pour faire la correspondance. |
| `ts` | Heure serveur (epoch ms), présente sur tous les messages serveur. |
| `payload` | Contenu ; toujours un objet (éventuellement vide). |

Taille max d'un message client : **4 Ko** (au-delà : fermeture `1009`).

### 2.3 Machine à états d'un salon

```
            room:start           3 s                     tous répondu / timeout
  LOBBY ───────────────▶ COUNTDOWN ──────▶ QUESTION ─────────────────────────▶ REVEAL
    ▲                                         ▲                                  │
    │                                         └──────── question suivante ──────┤
    │                                                                            │ dernière question
    └──────────── (rejouer : nouveau salon) ◀──────── FINISHED ◀─────────────────┘
```

Un message reçu dans un état où il n'a pas de sens renvoie `error` avec le code `INVALID_STATE`.

### 2.4 Messages client → serveur

| `type` | Payload | État requis | Effet |
|---|---|---|---|
| `room:create` | `{ settings }` | aucun salon | Crée un salon, l'émetteur devient hôte. |
| `room:join` | `{ roomCode }` | aucun salon | Rejoint un salon en `LOBBY`. |
| `room:leave` | `{}` | dans un salon | Quitte (forfait si partie en cours). |
| `room:ready` | `{ ready: boolean }` | `LOBBY` | Change son statut prêt. |
| `room:settings` | `{ settings }` | `LOBBY`, hôte | Modifie les paramètres (remet tout le monde « non prêt »). |
| `room:start` | `{}` | `LOBBY`, hôte | Lance la partie si ≥ 2 joueurs, tous prêts. |
| `answer:submit` | `{ questionIndex, choiceId }` | `QUESTION` | Envoie sa réponse (une seule fois). |
| `matchmaking:join` | `{ settings? }` | aucun salon | *(si module matchmaking)* entre dans la file. |
| `matchmaking:leave` | `{}` | en file | Quitte la file. |

`settings` :

```json
{ "questionCount": 10, "category": 9, "difficulty": "medium", "type": "multiple", "maxPlayers": 2 }
```

`category`, `difficulty` et `type` peuvent valoir `null` (= mix).

Le battement de cœur utilise les **ping/pong natifs du protocole WebSocket** (pas de message applicatif) : le serveur ping toutes les 20 s et ferme la connexion sans pong au bout de 40 s. (valeurs variables, jcrois que cest juste la convention)

### 2.5 Messages serveur → client

| `type` | Destinataires | Payload |
|---|---|---|
| `session:ready` | le client | `{ userId, protocolVersion: 1, currentRoom: RoomState \| null }` — envoyé juste après la connexion ; `currentRoom` non nul = reconnexion. |
| `room:state` | tout le salon | `RoomState` complet — envoyé à chaque changement dans le `LOBBY`. |
| `game:countdown` | tout le salon | `{ startsAt }` |
| `question:new` | tout le salon | `{ index, total, category, difficulty, type, text, choices: [{id, text}], deadline, durationMs }` |
| `answer:ack` | l'émetteur | `{ questionIndex }` — réponse enregistrée (sans dire si elle est juste). |
| `question:progress` | tout le salon | `{ index, answered: [userId] }` |
| `question:reveal` | tout le salon | `{ index, correctChoiceId, results: [{ userId, choiceId \| null, correct, points, responseMs \| null }], scores: [{ userId, score }], nextAt }` |
| `player:disconnected` | tout le salon | `{ userId, graceUntil }` |
| `player:reconnected` | tout le salon | `{ userId }` |
| `player:forfeit` | tout le salon | `{ userId }` |
| `game:over` | tout le salon | `{ ranking: [{ userId, score, correctCount, totalCorrectMs, forfeit }], winnerId \| null, matchId }` |
| `match:found` | joueurs appariés | `{ roomCode }` *(matchmaking)* |
| `error` | l'émetteur | `{ code, message }` |

`RoomState` :

```json
{
  "code": "K7Q2PM",
  "state": "LOBBY",
  "hostId": 12,
  "settings": { "questionCount": 10, "category": null, "difficulty": null, "type": null, "maxPlayers": 2 },
  "players": [
    { "userId": 12, "displayName": "raph", "avatarUrl": "/avatars/12.png", "ready": true, "connected": true, "score": 0 }
  ],
  "question": null
}
```

En cas de reconnexion pendant une partie, `question` contient la question en cours (même forme que `question:new`) plus `myAnswer: choiceId | null`, afin que le client puisse se réafficher sans état local.

### 2.6 Synchronisation du temps

Les horloges client et serveur ne sont pas alignées. Le serveur envoie des instants absolus (`deadline`, `startsAt`, `nextAt`) **et** `ts` sur chaque message. Le client calcule :

```
offset = ts - Date.now()          // à la réception
restant = deadline - (Date.now() + offset)
```

Le timer affiché est purement visuel ; seule l'heure serveur compte pour accepter une réponse.

### 2.7 Codes d'erreur

**Erreurs applicatives** (message `error`, la connexion reste ouverte) :

| `code` | Cas |
|---|---|
| `BAD_MESSAGE` | JSON invalide, `type` inconnu, payload mal formé |
| `INVALID_STATE` | Action impossible dans l'état actuel du salon |
| `NOT_HOST` | Action réservée à l'hôte |
| `ROOM_NOT_FOUND` | Code de salon inconnu |
| `ROOM_FULL` | Salon plein |
| `ALREADY_IN_ROOM` | Le joueur est déjà dans un salon |
| `NOT_ENOUGH_PLAYERS` | Lancement avec < 2 joueurs ou joueurs non prêts |
| `ALREADY_ANSWERED` | Deuxième réponse à la même question |
| `WRONG_QUESTION` | `questionIndex` différent de la question en cours |
| `TOO_LATE` | Réponse après la deadline |
| `INVALID_CHOICE` | `choiceId` inexistant |
| `QUESTIONS_UNAVAILABLE` | OpenTDB et le cache ont échoué |
| `RATE_LIMITED` | Trop de messages (> 20 / s) |

**Codes de fermeture WebSocket** : IMPORTANT IMPORTANT

| Code | Sens |
|---|---|
| `1000` | Fermeture normale |
| `1008` | Origin refusée |
| `1009` | Message trop gros |
| `4001` | Non authentifié / token invalide ou expiré |
| `4002` | Remplacé par une nouvelle connexion du même utilisateur |
| `4003` | Expulsé (abus, rate limit répété) |

### 2.8 Exemple de séquence (duel)

```
A → room:create {settings}           S → A  room:state {code:"K7Q2PM", players:[A]}
B → room:join {roomCode:"K7Q2PM"}    S → A,B room:state {players:[A,B]}
A → room:ready {ready:true}          S → A,B room:state
B → room:ready {ready:true}          S → A,B room:state
A → room:start                       (serveur charge 10 questions OpenTDB)
                                     S → A,B game:countdown {startsAt}
                                     S → A,B question:new {index:0, choices:[a,b,c,d], deadline}
B → answer:submit {0, "c"}           S → B   answer:ack
                                     S → A,B question:progress {answered:[B]}
A → answer:submit {0, "a"}           S → A   answer:ack
                                     S → A,B question:reveal {correctChoiceId:"c", results, scores, nextAt}
   … ×10 …
                                     S → A,B game:over {ranking, winnerId:B, matchId}
```

---

## 3. Persistance (fin de partie)

À `FINISHED`, le serveur enregistre en une transaction :

- `matches` : id, date de début/fin, paramètres, gagnant (nullable si nul) ;
- `match_players` : match, utilisateur, score, nombre de bonnes réponses, temps cumulé, forfait, rang.

Ces tables alimentent l'historique et les statistiques des profils. Les salons en cours restent **en mémoire** (pas en base).

---

## 4. Points à trancher en équipe

- [ ] 2 joueurs seulement (duel) ou jusqu'à 6 (plus sympa pour la correction on pourra tous se co avec le correcteur) ? → impacte l'UI du classement.
- [ ] Matchmaking automatique ou salons par code uniquement ? (imo salon par code uniquement, sinon match contre des bots ?)
- [ ] Mode solo / contre une IA (avec des pincettes IA) (module IA du sujet) ?
- [ ] Bonus de série (ex. +10 % par bonne réponse consécutive) ? est ce que on recompense les chains wins ?
- [ ] Cache local de questions : qui l'alimente (script d'import au build ?) ? (solution que je propose plus haut -> Seed versionne, on recup X questions une seule fois et on les commit dans le JSON du repo, ca marche meme sans reseau dcp utile pour la corretion.) -> on save ca cote serveur
- [ ] A TESTER !!!! la generation du seed pour les appels a openTDB est a tester pour voir si on arrive a grep les questions de cette maniere ! (lire lapi de openDTB)

## 5. Définition de « terminé » pour l'issue #7

- [ ] Ce document relu et validé par les 5 membres.
- [ ] Types partagés front/back créés à partir du §2 (fichier commun, ex. `shared/protocol.ts`).
- [ ] Issues d'implémentation créées : serveur WS + machine à états, intégration OpenTDB, écran de jeu front, persistance des matchs.

# Contribuer à Transcendance

## Cycle d'une tâche
1. Ouvrir son issue → Development → Create a branch (source : `main`).
2. `git fetch origin && git switch <nom-de-la-branche>`
3. Commits petits et fréquents, au format ci-dessous.
4. `git push`, puis ouvrir une PR avec `Closes #<numéro>`.
5. Un coéquipier relit et approuve → « Squash and merge ».

## Règles
- Jamais de push direct sur `main`.
- Une issue = une branche = une PR.
- Récupérer `main` régulièrement : `git fetch origin && git merge origin/main`
- Jamais de `.env`, `node_modules`, `dist` ni certificat dans Git.
- Jamais d'upload par l'interface web de GitHub : toujours passer par `git`.

## Messages de commit
Format : `type(zone): description (#issue)`
Types : `feat`, `fix`, `docs`, `chore`, `build`, `test`.
Exemple : `feat(auth): add register endpoint (#8)`

## Style de code
- `.editorconfig` et `.prettierrc` à la racine valent pour tout le dépôt.
- ESLint : chaque projet garde la config générée par son outil (Vite, Nest CLI).
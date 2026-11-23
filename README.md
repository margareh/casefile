# Murder mystery web app

## Set up
1. Edit `characters.source.json`: names, descriptions, hidden skills, side quests, three rounds of clues, each player's passphrase, and the three round codes you will announce.
2. Run `node build.mjs`. This encrypts everything private into `data.json`.
3. Test locally: `python3 -m http.server`, then open http://localhost:8000.
4. Publish: commit `index.html` and `data.json` (not the source file, it is in `.gitignore`), then turn on GitHub Pages in the repo settings.

## How it works
- Names and descriptions are public. Skills and side quests unlock with the player's passphrase.
- Each round's clue needs the passphrase plus the round code, so nobody can read ahead.
- Notes and side-quest checkboxes stay in each player's browser and are never shared.

## Notes
- Anyone can download `data.json`, so use 3+ random words for passphrases and round codes. Re-run the build and redeploy to change anything.
- Keep `characters.source.json` private. It holds every secret and passphrase in plain text.
- The sample passphrases are in the source file. Replace them before your party.

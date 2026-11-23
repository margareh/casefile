# Murder mystery web app

## Set up
1. Edit `characters.source.json`: names, descriptions, hidden skills, side quests, passphrases, round codes, clues, and jail.
2. Run `node build.mjs` to encrypt everything private into `data.json`.
3. Test locally: `python3 -m http.server`, then open http://localhost:8000.
4. Publish: commit `index.html`, `style.css`, `data.json` and `images/` (not the source file, it is in `.gitignore`), then turn on GitHub Pages.

## Pictures
Each character has an `image` path, such as `images/fell.jpg`. The sample files are placeholder silhouettes. Replace them with real pictures (square works best) and update the path. Images are public. With no image, the app shows the character's initials.

## Clues
Each round holds a list of clues per character. The sample uses two. They are locked by the player's passphrase plus that round's code.

## Jail
Players track jail themselves. Each character on the Cast tab has a checkbox per round ("In jail: Round 1, 2, 3"). Marks are private to each player's browser. The character is tagged and greyed out when marked for the latest round the player has unlocked.

## Notes
- Anyone can download `data.json`, so use 3+ random words for passphrases and round codes.
- Keep `characters.source.json` private. It holds every secret in plain text.
- The sample passphrases are in the source file. Replace them before your party.

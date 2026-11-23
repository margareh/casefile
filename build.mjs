// Usage: node build.mjs  ->  reads characters.source.json, writes data.json
import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';

const ITER = 310000;
const norm = s => s.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');

function encrypt(obj, secret) {
  const salt = randomBytes(16), iv = randomBytes(12);
  const key = pbkdf2Sync(norm(secret), salt, ITER, 32, 'sha256');
  const c = createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final(), c.getAuthTag()]);
  return { s: salt.toString('base64'), i: iv.toString('base64'), c: ct.toString('base64') };
}

const src = JSON.parse(readFileSync('characters.source.json', 'utf8'));
const out = {
  title: src.title, intro: src.intro, iter: ITER,
  characters: src.characters.map(ch => {
    if (ch.passphrase.trim().split(/\s+/).length < 3) console.warn(`Weak passphrase for ${ch.name}: use 3+ words.`);
    if (ch.rounds.length !== src.roundCodes.length) throw new Error(`${ch.name}: need ${src.roundCodes.length} rounds`);
    return {
      id: ch.id, name: ch.name, description: ch.description,
      base: encrypt({ skills: ch.skills, sideQuests: ch.sideQuests }, ch.passphrase),
      // each round is locked by the player's passphrase AND the round code you announce
      rounds: ch.rounds.map((r, n) => encrypt({ clue: r }, `${ch.passphrase}|${src.roundCodes[n]}`))
    };
  })
};
writeFileSync('data.json', JSON.stringify(out));
console.log(`Built data.json for ${out.characters.length} characters, ${src.roundCodes.length} rounds.`);

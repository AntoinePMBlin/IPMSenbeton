// expose webcrypto si absent (node:crypto.webcrypto)
if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  const { webcrypto } = await import('node:crypto');
  globalThis.crypto = webcrypto;
}
// démarre Vite (utilise process.argv pour passer les commandes comme "build" ou rien pour dev)
import('./node_modules/vite/bin/vite.js');
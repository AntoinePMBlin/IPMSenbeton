import { webcrypto } from 'node:crypto';

// Expose l'API Web Crypto globalement
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

// Importe et exécute Vite avec le bon chemin
const { createServer, build } = await import('vite');

// Gestion des commandes
const command = process.argv[2];
if (command === 'build') {
  await build();
} else {
  const server = await createServer();
  await server.listen();
}
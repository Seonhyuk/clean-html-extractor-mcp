#!/usr/bin/env node

import { createServer } from './server/createServer.js';

async function main() {
  await createServer();
}

main();

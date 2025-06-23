import app from './app.js';
import { initOracle } from '../config/db.config.js';

async function start() {
  try {
    await initOracle();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server up at http://localhost:${port}`));
  } catch (err) {
    console.error('Startup failed', err);
    process.exit(1);
  }
}

start();

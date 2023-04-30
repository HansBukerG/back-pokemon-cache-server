import app from './src/app.js';
import logger from './src/utils/logger.utils.js';

const main = () => {
  logger.info('API cache server by HansBukerG');
  app();
};

main();
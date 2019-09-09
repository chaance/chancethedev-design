/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-useless-escape */

const chalk = require('chalk');

/**
 * Create a logger to be used in a handler. This is typically just for
 * formatting the output, adding a prefix, and connecting the output with
 * box-drawing ASCII characters.
 * @returns {object}
 */
function createLogger(command) {
  let start;

  /**
   * Display the given message with a box character. This also includes
   * formatting for the logger prefix and box character itself.
   * @param {string} boxCharacter
   * @param {string?} message
   * @returns {void}
   */
  function log(boxCharacter, message = '') {
    console.log(chalk`{yellow ${command} ▐} {gray ${boxCharacter}} ${message}`);
  }

  return {
    info(message) {
      log('┣', chalk.gray(message));
    },
    start(message) {
      start = Date.now();
      log('┏', message);
    },
    stop(message) {
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      if (message) {
        log('┗', message);
      } else {
        log('┗', chalk`{gray Done in {italic ${duration}s}}`);
      }
    },
    newline() {
      log('┃');
    },
  };
}

/**
 * Display the banner in the console, typically at the beginning of a handler
 * @returns {void}
 */
function displayBanner() {
  console.log(`
           __
          |  \
  _______ | $$____    ______   _______    _______   ______
 /       \| $$    \  |      \ |       \  /       \ /      \
|  $$$$$$$| $$$$$$$\  \$$$$$$\| $$$$$$$\|  $$$$$$$|  $$$$$$\
| $$      | $$  | $$ /      $$| $$  | $$| $$      | $$    $$
| $$_____ | $$  | $$|  $$$$$$$| $$  | $$| $$_____ | $$$$$$$$
 \$$     \| $$  | $$ \$$    $$| $$  | $$ \$$     \ \$$     \
  \$$$$$$$ \$$   \$$  \$$$$$$$ \$$   \$$  \$$$$$$$  \$$$$$$$
`);
}

module.exports = {
  createLogger,
  displayBanner,
};

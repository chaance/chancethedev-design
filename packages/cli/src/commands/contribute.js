/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  command: 'contribute <command>',
  desc: 'get started contributing',
  builder(yargs) {
    yargs.commandDir('contribute');
  },
};

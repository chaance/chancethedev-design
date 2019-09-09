/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-process-exit */

const { reporter } = require('@chancethedev/cli-reporter');
const bundlers = require('../bundlers');
const path = require('path');

async function bundle(entrypoint, options, info) {
  const { cwd } = info;
  const extension = path.extname(entrypoint);

  if (!bundlers.has(extension)) {
    reporter.error(
      `Invalid extension: \`${extension}\` on entrypoint: \`${entrypoint}\``
    );
    process.exit(1);
  }

  try {
    const bndl = bundlers.get(extension);
    await bndl(path.join(cwd, entrypoint), options, info);
  } catch (error) {
    reporter.error(`Unexpected error occurred while bundling ${entrypoint}:`);
    console.log(error);
    process.exit(1);
  }

  reporter.success('Done! 🍻');
}

module.exports = bundle;

/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-process-exit */

const fs = require('fs-extra');
const path = require('path');

async function findPackageFolder(entrypoint) {
  let packageFolder = entrypoint;

  while (packageFolder !== '/' && path.dirname(packageFolder) !== '/') {
    packageFolder = path.dirname(packageFolder);
    const packageJsonPath = path.join(packageFolder, 'package.json');

    try {
      if (await fs.pathExists(packageJsonPath)) {
        break;
      }
    } catch (err) {
      // TODO:
      throw Error(err);
    }
  }

  return packageFolder;
}

module.exports = findPackageFolder;

#!/usr/bin/env node
/* eslint-disable no-process-exit */

/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

// Inspired by Create React App
// https://github.com/facebook/create-react-app/blob/next/packages/create-react-app/index.js

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', error => {
  console.error(error);
});

const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 8) {
  console.error(
    chalk.red(
      `You are running Node ${currentNodeVersion}.\n` +
        `chancethedev-upgrade requires Node 8 or higher, please update your ` +
        `version of Node.`
    )
  );
  process.exit(1);
}

const main = require('../src/cli');

main(process).catch(error => {
  console.error(error);
  process.exit(1);
});

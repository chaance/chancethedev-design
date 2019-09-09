/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { pascalCase } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const findPackageFolder = require('../tools/findPackageFolder');

async function bundle(entrypoint, options) {
  const globals = options.globals ? formatGlobals(options.globals) : {};
  const { name } = options;
  const packageFolder = await findPackageFolder(entrypoint);

  const outputFolders = [
    {
      format: 'esm',
      directory: path.join(packageFolder, 'es'),
    },
    {
      format: 'cjs',
      directory: path.join(packageFolder, 'lib'),
    },
    {
      format: 'umd',
      directory: path.join(packageFolder, 'umd'),
    },
  ];

  await Promise.all(outputFolders.map(({ directory }) => fs.remove(directory)));

  const jsEntrypoint = path.join(
    outputFolders.find(folder => folder.format === 'esm').directory,
    'index.js'
  );
  const packageJsonPath = path.join(packageFolder, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {} } = packageJson;

  const bndl = await rollup({
    input: entrypoint,
    external: Object.keys(dependencies),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
              },
            },
          ],
        ],
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        module: true,
      }),
      commonjs({
        include: ['node_modules/**'],
        extensions: ['.js'],
      }),
    ],
  });
  await bndl.write({
    format: 'esm',
    file: jsEntrypoint,
  });

  await Promise.all(
    outputFolders
      .filter(folder => folder.type !== 'esm')
      .map(({ format, directory }) => {
        const outputOptions = {
          format,
          file: jsEntrypoint.replace(/\/es\//, `/${path.basename(directory)}/`),
        };

        if (format === 'umd') {
          outputOptions.name = name;
          outputOptions.globals = {
            ...formatDependenciesIntoGlobals(dependencies),
            ...globals,
          };
        }

        return bndl.write(outputOptions);
      })
  );
}

function formatGlobals(string) {
  const mappings = string.split(',').map(mapping => {
    return mapping.split('=');
  });
  return mappings.reduce(
    (acc, [pkg, global]) => ({
      ...acc,
      [pkg]: global,
    }),
    {}
  );
}

function formatDependenciesIntoGlobals(dependencies) {
  return Object.keys(dependencies).reduce((acc, key) => {
    const parts = key.split('/').map((identifier, i) => {
      if (i === 0) {
        return identifier.replace(/@/, '');
      }
      return identifier;
    });

    return {
      ...acc,
      [key]: pascalCase(parts.join(' ')),
    };
  }, {});
}

module.exports = bundle;

/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassRenderer } = require('@chancethedev/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('colors.scss', () => {
  it('should emit no side-effects if mixins are included', async () => {
    const { calls } = await render(`
@import '../scss/mixins';
$test: test(mixin-exists(chancethedev--colors));
$test: test(global-variable-exists(chancethedev--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(false);
  });

  it('should include color variables as globals if the mixin is called', async () => {
    const { calls } = await render(`
@import '../scss/mixins';
@include chancethedev--colors();
$test: test(variable-exists(chancethedev--blue-50));
$test: test(global-variable-exists(chancethedev--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(true);
  });

  it('should include color variables in the default entrypoint', async () => {
    const { calls } = await render(`
@import '../scss/colors';
$test: test(mixin-exists(chancethedev--colors));
$test: test(variable-exists(chancethedev--blue-50));
$test: test(global-variable-exists(chancethedev--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(true);
    expect(calls[2][0].getValue()).toBe(true);
  });
});

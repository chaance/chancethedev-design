# @chancethedev/colors

> Colors for digital and software products using the chancethedev Design System. A fork of [`@carbon/colors`](https://github.com/carbon-design-system/carbon/blob/master/packages/colors/README.md).

## Getting started

TODO

## Usage

You can use the `@chancethedev/colors` module in your JavaScript, in addition to your Sass.

### Sass

In Sass, you can import the files individual by doing:

```scss
@import '@chancethedev/colors/scss/colors';
```

This file automatically includes the `chancethedev--colors` mixin which initializes
all the color variables for the design system.

These color variables follow the naming convention: `$chancethedev--<swatch>-<grade>`.
For example:

```scss
$chancethedev--blue-50;
$chancethedev--cool-gray-10;
$chancethedev--black-100;
$chancethedev--white-0;
```

You can also use the shorthand form of these colors by dropping the `chancethedev--`
namespace:

```scss
$blue-50;
$cool-gray-10;
$black-100;
$white-0;
```

_Note: the shorthand variables require that you do not have any other
conflicting variables in your setup. Namespaced variables are always preferred
for this reason, unless you are confident that no collisions will occur._

If you would like you choose when these variables are defined, then you can call
the `chancethedev--colors` mixin directly by importing the following file:

```scss
@import '@chancethedev/colors/scss/mixins';

// ...
@include chancethedev--colors();
```

Alongside the color variables detailed above, we also provide a map of colors so
that you can programmatically use these values. This map is called
`$chancethedev--colors` and each key is the name of a swatch. The value of these
swatches is also a map, but each key is now the grade. In code, this looks like
the following:

<!-- prettier-ignore-start -->

```scss
$chancethedev--colors: (
  'blue': (
    10: #edf4ff,
    // ...
  )
);
```

<!-- prettier-ignore-end -->

You can include this variable by including `@chancethedev/colors/scss/colors` or
calling the `chancethedev--colors()` mixin directly.

### JavaScript

For JavaScript, you can import and use this module by doing the following in
your code:

```js
// ESM
import { black, blue, warmGray } from '@chancethedev/colors';

// CommonJS
const { black, blue, warmGray } = require('@chancethedev/colors');
```

Each color swatch is exported as a variable, and each color name is also
exported as an object that can be called by specifying grade, for example:

```js
black;
blue[50]; // Using the `blue` object.
warmGray100; // Using the `warmGray100` variable.
```

## 📖 API Documentation

If you're looking for `@chancethedev/colors` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

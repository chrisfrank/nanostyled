# Nanostyled

Nanostyled is a tiny library (< 1 Kb unminified) for building styled React
components. It tries to combine the flexible, component-based API of CSS-in-JS
libraries with the extremely low overhead of plain CSS:

|            | Low overhead | Flexible, component-based API |
| ---------- | ------------ | ----------------------------- |
| Plain CSS  | ✅           | ❌                            |
| CSS-in-JS  | ❌           | ✅                            |
| nanostyled | ✅           | ✅                            |

Like the CSS-in-JS libraries that inspired it -- 💕 to
[styled-components][styled-components] -- nanostyled lets you build UI elements
with complex default styles, then tweak those styles throughout your app via
props:

```jsx
<Button>A nice-looking button</Button>
<Button color="blue">A nice-looking button that is blue.</Button>
```

_Unlike_ a CSS-in-JS library, nanostyled doesn't use any CSS-in-JS. Instead,
it's designed to accompany a **functional CSS framework** like
[Tachyons][tachyons], [Tailwind][tailwind], or [Basscss][basscss]. Nanostyled
makes functional CSS less verbose and easier to extract into props-controlled
components.

Read the [introductory blog post][intro] for more context, or peruse the docs
below:

---

- [Install](#install)
- [Use](#use)
  - [A nanostyled Button](#a-nanostyled-button)
  - [A more flexible Button](#a-more-flexible-button)
- [Sharing style props across multiple components](#sharing-style-props-across-multiple-components)
- [UMD and CJS builds:](#umd-and-cjs-builds)
  - [UMD](#umd)
  - [CJS](#cjs)
- [Performance](#performance)
- [Server-Side Rendering](#server-side-rendering)
- [Related Projects](#related-projects)
- [## Contributing](#-contributing)
  - [Bugs](#bugs)
  - [Pull requests](#pull-requests)
- [License](#license)

## Install

```
npm install nanostyled
```

## Use

Nanostyled works by mapping _style props_ onto class names from your functional
CSS framework of choice.

### A nanostyled Button

```jsx
import nanostyled from 'nanostyled';
// This example uses CSS classes from Tachyons
import 'tachyons/css/tachyons.css';

// A Button via three style props:
const Button = nanostyled('button', {
  color: 'white',
  bg: 'bg-blue',
  base: 'fw7 br3 pa2 sans-serif f4 bn input-reset',
});

const App = () => (
  <div>
    <Button>Base Button</Button>
    <Button bg="bg-yellow">Yellow Button</Button>
  </div>
);

/* rendering <App /> produces this markup:
<div>
  <button class="white bg-blue fw7 br3 pa2 sans-serif f4 bn input-reset">Base Button</button>
  <button class="white bg-yellow fw7 br3 pa2 sans-serif f4 bn input-reset">Yellow Button</button>
</div>
*/
```

When a `nanostyled(element)` renders, it consumes its style props and merges
them into an HTML class string, as per above.

Which style props to use is up to you. The `<Button>` above has an API that
would make it easy to restyle color or background-color via the `color` and `bg`
props, but hard to change other styles without totally rewriting the `base`
prop.

### A more flexible Button

By using more (and more explicit) style props, we can make a more flexible
button:

```jsx
import nanostyled from 'nanostyled';
import 'tachyons/css/tachyons.css';

const FlexibleButton = nanostyled('button', {
  color: 'white', // white text
  bg: 'bg-blue', // blue background
  weight: 'fw7', // bold font
  radius: 'br3', // round corners
  padding: 'pa2', // some padding
  typeface: 'sans-serif', // sans-serif font
  fontSize: 'f4', // font size #4 in the Tachyons font scale
  base: 'bn input-reset', // remove border and appearance artifacts
});
```

Rendering a stock `<FlexibleButton />` will produce the same markup as its
simpler relative. But it's much easier to render alternate styles:

```jsx
<FlexibleButton bg="bg-light-green" color="black" weight="fw9" radius="br4">
  Button with a green background, black text, heavier font, and rounder corners
</FlexibleButton>
```

When you need a variation that you didn't plan for in your style props, you can
still use the `className` prop:

```jsx
<FlexibleButton className="dim pointer">
  A button that dims on hover and sets the cursor to 'pointer'
</FlexibleButton>
```

## Sharing style props across multiple components

If you're building multi-component UI kits with nanostyled, I recommend sharing
at least a few basic style props across all your components. Otherwise it gets
hard to remember which components support, say, a `color` prop, and which ones
don't.

I usually start here:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import nanostyled from 'nanostyled';
import 'tachyons/css/tachyons.css';

// The keys in this styleProps will determine which style props
// our nanostyled elements will accept:
const styleProps = {
  bg: null,
  color: null,
  margin: null,
  padding: null,
  font: null,
  css: null,
};

/* 
Why choose those keys, in particular? For everything except `css`, 
it's because the elements in the UI kit probably will have some default 
bg, color, margin, padding, or font we'll want to be able to easily override via props.

The `css` prop is an exception. I just like being able to use it instead of `className`.
*/

// Box will support all styleProps, but only use them when we explicitly pass values
const Box = nanostyled('div', styleProps);
/*
<Box>Hi!</Box>
renders <div>Hi!</div>

<Box color="red">Hi!</Box>
renders <div class="red">Hi!</div>
*/

// Button will also support all styleProps, and will use some of them by default
const Button = nanostyled('button', {
  ...styleProps,
  bg: 'bg-blue',
  color: 'white',
  padding: 'pa2',
  font: 'fw7',
  // I use a 'base' prop to declare essential component styles that I'm unlikely to override
  base: 'input-reset br3 dim pointer bn',
});
/*
<Button>Hi!</Button>
renders
<button class="bg-blue white pa2 dim pointer bn input-reset>Hi!</button>
*/

// Heading uses styleProps, plus some extra props for fine-grained control over typography
const Heading = nanostyled('h1', {
  ...styleProps,
  size: 'f1',
  weight: 'fw7',
  tracking: 'tracked-tight',
  leading: 'lh-title',
});

// Putting them all together....
const App = () => (
  <Box padding="pa3" font="sans-serif">
    <Heading>Styling with Nanostyled</Heading>
    <Heading tracking={null} tag="h2" size="f3" weight="fw6">
      A brief overview
    </Heading>
    <Heading
      tag="h3"
      weight="fw4"
      size="f5"
      tracking={null}
      css="bt pv3 b--light-gray"
    >
      Here are some buttons:
    </Heading>
    <Button>Base Button</Button>
    <Button css="w-100 mv3" padding="pa3" bg="bg-green">
      Wide Green Padded Button
    </Button>
    <Box css="flex">
      <Button css="w-50" margin="mr2" bg="bg-gold">
        50% Wide, Gold
      </Button>
      <Button css="w-50" margin="ml2" bg="bg-red">
        50% wide, Red
      </Button>
    </Box>
  </Box>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

This full example is [available on CodeSandbox][codesandbox] for you to
experiment with.

## UMD and CJS builds:

### UMD

You can load `dist/nanostyled.umd.js` to make `window.nanostyled` available in a
browser.

The UMD build is also available on [unpkg][unpkg]: https://unpkg.com/nanostyled

### CJS

In an environment that doesn't support ES6 modules, you can require the CJS
build:

```js
const nanostyled = require('nanostyled/dist/nanostyled.cjs.js');
```

## Performance

In a rudimentary benchmark (`test/benchmark.js`), a nanostyled Button renders ~
1.5x more quickly than a similar Button built with styled-components.

In addition to rendering components more quickly, nanostyled is also ~ two
orders of magnitude smaller than styled-components over the wire:

| |Nanostyled | styled-components| |min + gzip |0.4 kB |15.3 kB | |3G download
time |12ms |305ms |

Note, though, that this is only a half-comparison, because nanostyled isn't much
use without also including a Functional CSS framework.

Still, Tachyons is only 15k, and browsers parse CSS more quickly than JS.

## Server-Side Rendering

When rendering on a server, just use nanostyled normally. It requires no
additional configuration.

## Related Projects

- [Tachyons][tachyons]
- [Tailwind][tailwind]
- [Styled Components][styled-components]
- [Basscss][basscss]

## Contributing

---

### Bugs

Please open [an issue](https://github.com/chrisfrank/nanostyled/issues) on
Github.

### Pull requests

PRs are welcome. Please include tests! See `test/nanostyled.test.js` for the
format to follow.

## License

MIT

[styled-components]: https://www.styled-components.com/
[adam-wathan]:
  https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
[tachyons]: http://tachyons.io/
[tailwind]: https://tailwindcss.com/
[unpkg]: https://unpkg.com/
[codesandbox]: https://codesandbox.io/s/3r8l4rr8p1
[intro]: https://dev.to/chrisfrank/introducing-nanostyled-2p6k
[basscss]: http://basscss.com

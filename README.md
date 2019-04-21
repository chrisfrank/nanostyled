# Nanostyled

Nanostyled is a tiny library (< 1 Kb) for building styled UI elements in React
and Preact.

Like a CSS-in-JS library, nanostyled encapsulates complex styles into simple,
tweakable components:

```jsx
<Button>A nice-looking button</Button>
<Button color="blue">A nice-looking button that is blue</Button>
```

Unlike a CSS-in-JS library, nanostyled doesn't parse CSS in JS, which makes your
bundle smaller, your components faster, and your server-side-rendering a breeze.

|            | Low overhead | Props-controlled, component-based API | Zero-config SSR |
| ---------- | ------------ | ------------------------------------- | --------------- |
| nanostyled | ✅           | ✅                                    | ✅              |
| CSS-in-JS  | ❌           | ✅                                    | ❌              |
| Plain CSS  | ✅           | ❌                                    | ✅              |

---

<!-- vim-markdown-toc GFM -->

* [Install](#install)
* [Use](#use)
  * [A nanostyled Button](#a-nanostyled-button)
  * [A more flexible Button](#a-more-flexible-button)
  * [A full starter UI Kit](#a-full-starter-ui-kit)
* [Use in Preact and other React-like libraries](#use-in-preact-and-other-react-like-libraries)
* [API Reference](#api-reference)
* [Performance](#performance)
* [Server-Side Rendering](#server-side-rendering)
* [Related Projects](#related-projects)
* [Browser Support](#browser-support)
* [Contributing](#contributing)
  * [Bugs](#bugs)
  * [Pull requests](#pull-requests)
* [License](#license)

<!-- vim-markdown-toc -->

---

## Install

```
npm install nanostyled
```

## Use

Nanostyled works by mapping **style props** onto class names from your
[atomic CSS framework][adam-wathan] of choice, like [Tachyons][tachyons] or
[Tailwind][tailwind].

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
```

Rendering `<App />` produces this markup:

```html
<div>
  <button class="white bg-blue fw7 br3 pa2 sans-serif f4 bn input-reset">Base Button</button>
  <button class="white bg-yellow fw7 br3 pa2 sans-serif f4 bn input-reset">Yellow Button</button>
</div>
```

When a nanostyled component renders, it consumes its style props and merges them
into an HTML class string, as per above.

Which style props to use is up to you. In the `<Button>` above, it would be

- Easy to change text color via the `color` prop
- Easy to change background color via the `bg` prop
- Hard to change other styles without totally rewriting the `base` prop

### A more flexible Button

By using more style props, we can make a more flexible button:

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

### A full starter UI Kit

Here's a [proof-of-concept UI kit on CodeSandbox][codesandbox].

## Use in Preact and other React-like libraries

Under the hood, nanostyled is built as a library-agnostic factory function.
To use it in Preact without a compatibility layer, import the factory directly:

```javascript
import { h } from 'preact';
import nanoFactory from 'nanostyled/factory';
const nanostyled = nanoFactory(h);

const Button = nanostyled('button', {
  bg: 'bg-blue',
  color: 'white',
});
```

## API Reference

`nanostyled(tag, styleProps)`

The `nanostyled` function takes two arguments:

1. tag (String) - the name of an HTML element
2. styleProps (Object) - an object that maps component props to CSS class names

```jsx
const Paragraph = nanostyled('p', {
  font: 'serif',
  size: 'f4',
});
```

`nanostyled` returns a component, which will render styleProps into the
HTML `class` attribute, and pass all other props directly to the rendered
element, _with one exception_:

You can use the special `as` prop to change the HTML element rendered by a
nanostyled component. If, say, you've made a nanostyled `button`, but you want
it to render as an `a` tag sometimes, do this:

```jsx
const Button = nanostyled('button', { color: 'white', bg: 'black' });

<Button>A button</Button>
<Button as="a">Looks like a button, is a link</Button>
```

## Performance

In a rudimentary benchmark (`test/benchmark.js`), a nanostyled Button renders ~
2x more quickly than a similar Button built with styled-components.

In addition to rendering components more quickly, nanostyled is also almost two
orders of magnitude smaller than styled-components over the wire:

|                   | nanostyled | styled-components |
| ----------------- | ---------- | ----------------- |
| size (min + gzip) | 0.4 kB     | 15.3 kB           |
| 3G download time  | 12ms       | 305ms             |

## Server-Side Rendering

When rendering on a server, just use nanostyled normally.

## Related Projects

- [Tachyons][tachyons]
- [Tailwind][tailwind]
- [Styled Components][styled-components]
- [Tachyons Components](https://github.com/jxnblk/tachyons-components)

## Browser Support
Nanostyled aims to run in any browser that implements ES5, including IE 9+.
if you discover otherwise, please file an issue.

## Contributing

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

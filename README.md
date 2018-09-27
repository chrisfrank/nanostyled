# Nanostyled

Nanostyled is a tiny library (< 1 Kb unminified) for building styled React components.

Like a CSS-in-JS library (e.g. the excellent [styled-components][styled-components]), nanostyled lets you build UI elements with default styles, then tweak those styles throughout your app via component props:

```jsx
<Button>A nice-looking button</Button>
<Button color="blue">A nice-looking button that is also blue.</Button>
```

Unlike a CSS-in-JS library, nanostyled doesn't use any CSS-in-JS. Instead, it's designed to accompany a functional CSS framework like [Tachyons][tachyons] or [Tailwind][tailwind].

## Install

```
npm install nanostyled
```

## Use

```jsx
// import nanostyled
import nanostyled from 'nanostyled';
// import a functional-CSS framework
import 'tachyons/css/tachyons.css';

// Create a button by assigning your framework's CSS class names to props:
const Button = nanostyled('button', {
  bg: 'bg-blue',
  color: 'white',
  weight: 'b',
  padding: 'pa3',
  radius: 'br3',
});

// render some buttons!
const App = () => (
  <main>
    // Use the button somewhere else in your app
    <Button>Click Me</Button>
    // Render a variant with a red background, black text, and no specifed font
    weight
    <Button bg="bg-red" color="black" weight={null}>
      Red Button
    </Button>
  </main>
);
```

Rendering that app will produce this HTML markup:

```html
<main>
  <button class="bg-blue white b pa3 br3">Click Me</button>
  <button class="bg-red black pa3 br3">Red Button</button>
</main>
```

## Nanostyled solves two practical issues with using functional-CSS.

### Problem 1: Ugly, verbose markup

The basic premise of a functional CSS framework is that you build components by chaining tiny CSS classes.

A styled `<button>` element, using classes from [tailwind.css][tailwind], looks like this in JSX:

```jsx
<button class="bg-blue text-white font-bold py-2 px-4 rounded">Click Me</button>
```

That's a button with a blue background, white text, bold font, some padding, and rounded corners.

> ### holy hell this is the worst thing I've ever seen
>
> [Adam Wathan][adam-wathan], creator of Tailwind

So true.

You can, of course, extract the verbosity to a component:

```jsx
const Button = ({ className = '', ...props }) => (
  <button
    className={`bg-blue text-white font-bold py-2 px-4 rounded ${className}`}
    {...props}
  />
);

// Now you get clean markup throughout your app
// <Button>Nice Looking Button</Button>
```

**But fixing the verbosity problem by making a component creates a second problem**.

### Problem 2: It's hard to override default styles

We've hard-coded a blue background into our `<Button>` component in problem 1. What if we want a red background?

We could try using a className:

```jsx
<Button className="bg-red">Red?</Button>
```

But `bg-red` won't replace `bg-blue` in the rendered HTML. They'll just both render:

```html
<button class="bg-blue text-white font-bold py-2 px-4 rounded bg-red">Red?</button>
```

With both CSS classes present, we don't know which one will apply without looking at the CSS. The button might be blue; it might be red; we don't know. Madness.

By using `nanostyled` to explicitly map props to CSS classes, this problem goes away.

```jsx
const Button = nanostyled('button', {
  bg: 'bg-blue',
  base: 'text-white font-bold py-2 px-4 rounded',
});

// <Button>Blue</Button> renders this markup:
// <button class="bg-blue text-white font-bold py-2 px-4 rounded">Blue</button>
//
// <Button bg="bg-red">Red</Button> renders this markup:
// <button class="bg-red text-white font-bold py-2 px-4 rounded">Blue</button>
```

The props you decide to use for styling are up to you. In the `<Button>` above, there's no good way to change a button's font weight (or anything else in the `base` prop) without rewriting the whole `base` prop every time you want to tweak something. A more flexible Button API might look like this:

```jsx
const Button = nanostyled('button', {
  bg: 'bg-blue',
  color: 'text-white',
  weight: 'font-bold',
  padding: 'py-2 px-4',
  radius: 'rounded',
});
```

Now any of these props can be overridden with alternative CSS classes:

```jsx
<Button bg="bg-purple" color="text-yellow" weight="font-normal" radius={null}>
  A purple and yellow button with normal weight font and sharp corners
</Button>
```

[styled-components]: https://www.styled-components.com/
[adam-wathan]: https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
[tachyons]: http://tachyons.io/
[tailwind]: https://tailwindcss.com/

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.3 - 2019-04-21

### Added
- Support Preact without `preact/compat` via `nanostyled/factory`
    ```javascript
    import { h } from 'preact';
    import nanoFactory from 'nanostyled/factory';
    const nanostyled = nanoFactory(h);

    const Button = nanostyled('button', {
      bg: 'bg-blue',
      color: 'white',
    });
    ```

### Changed
- Rename `props.tag` to `props.as`, to match Styled Components and Emotion.
  To upgrade, use the new prop name on components that override the default tag:
  ```jsx
  // old
  <Button tag="a">Looks like a button, is a link</Button>

  // new
  <Button as="a">Looks like a button, is a link</Button>
  ```


### Fixed
- Trim README
- Support IE without polyfills or Babel transforms

## 0.2 - 2018-10-29
First public release

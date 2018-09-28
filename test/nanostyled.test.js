const React = require('react');
const TestRenderer = require('react-test-renderer');
const nanostyled = require('../dist/nanostyled.umd.js');

const renderJSON = (Component, props) =>
  TestRenderer.create(React.createElement(Component, props)).toJSON();

describe('a button', () => {
  let Button = nanostyled('button', {
    margin: 'ma3',
    padding: 'ph3',
  });

  it('renders designprops as className', () => {
    let res = renderJSON(Button);
    expect(res.props.className).toEqual('ma3 ph3');
  });

  it('has a displayname', () => {
    expect(Button.displayName).toEqual('nanostyled-button');
  });

  it('filters style props from rendered output', () => {
    let res = renderJSON(Button);
    expect(res.props.margin).toEqual(undefined);
  });

  describe('with custom style props', () => {
    it('overwrites styleprops with truthy custom props', () => {
      let res = renderJSON(Button, { margin: 'ma1', padding: 'pa1' });
      expect(res.props.className).toEqual('ma1 pa1');
    });

    it('overwrites styleprops with falsy custom props', () => {
      let res = renderJSON(Button, { margin: null, padding: 'pa1' });
      expect(res.props.className).toEqual('pa1');
    });
  });

  it('passes props.className', () => {
    let res = renderJSON(Button, { className: 'custom' });
    expect(res.props.className).toEqual('custom ma3 ph3');
  });

  it('passes props.style', () => {
    let style = { whiteSpace: 'nowrap' };
    let res = renderJSON(Button, { style });
    expect(res.props.style).toEqual(style);
  });

  describe('with a tag prop', () => {
    it('renders the custom tag instead of the default', () => {
      let res = renderJSON(Button, { tag: 'a' });
      expect(res.type).toEqual('a');
    });

    it('filters the tag prop from DOM attributes', () => {
      let res = renderJSON(Button, { tag: 'a' });
      expect(res.props.tag).toEqual(undefined);
    });
  });
});

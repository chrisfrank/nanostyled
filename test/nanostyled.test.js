const React = require('react');
const TestRenderer = require('react-test-renderer');
const nanostyled = require('../index.js');

const renderJSON = (Component, props) =>
  TestRenderer.create(React.createElement(Component, props)).toJSON();

// nanostyled works with plain elements and with full React classes
class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.extras = () => ({ extra: 'props' });
  }

  render() {
    return React.createElement(
      'button',
      Object.assign({}, this.props, this.extras())
    );
  }
}

function FunctionComponent(props) {
  const extras = { testing: 'a function component' };

  return React.createElement('button', Object.assign({}, props, extras));
}

[TestComponent, FunctionComponent, 'button'].forEach(elem => {
  describe('a button', () => {
    let Button = nanostyled(elem, {
      margin: 'ma3',
      padding: 'ph3',
    });

    it('renders style props as className', () => {
      let res = renderJSON(Button);
      expect(res.props.className).toEqual('ma3 ph3');
    });

    it('has a displayname', () => {
      expect(Button.displayName).toEqual(`nanostyled-${elem}`);
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

    describe('with an +as+ prop', () => {
      it('renders the custom tag instead of the default', () => {
        let res = renderJSON(Button, { as: 'a' });
        expect(res.type).toEqual('a');
      });

      it('filters the +as+ prop from DOM attributes', () => {
        let res = renderJSON(Button, { as: 'a' });
        expect(res.props.as).toEqual(undefined);
      });
    });
  });
});

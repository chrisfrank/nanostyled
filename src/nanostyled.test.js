const React = require('react');
const { render } = require('react-dom');
const styled = require('./index');

const renderDiv = async (Component, props) => {
  let div = document.createElement('div');
  await render(React.createElement(Component, props), div);
  return div;
};

describe('a button', () => {
  let Button = styled('button', {
    margin: 'ma3',
    padding: 'ph3',
  });

  it('renders designprops as className', async done => {
    let div = await renderDiv(Button);
    expect(div.querySelector('button').className).toEqual('ma3 ph3');
    done();
  });

  it('has a displayname', () => {
    expect(Button.displayName).toEqual('nanostyled-button');
  });

  it('filters style props from DOM attributes', async done => {
    let div = await renderDiv(Button);
    expect(div.querySelector('button').getAttribute('margin')).toEqual(null);
    done();
  });

  describe('with custom style props', () => {
    it('overwrites styleprops with truthy custom props', async done => {
      let div = await renderDiv(Button, { margin: 'ma1', padding: 'pa1' });
      expect(div.querySelector('button').className).toEqual('ma1 pa1');
      done();
    });

    it('overwrites styleprops with falsy custom props', async done => {
      let div = await renderDiv(Button, { margin: null, padding: 'pa1' });
      expect(div.querySelector('button').className).toEqual('pa1');
      done();
    });
  });

  it('passes props.className', async done => {
    let div = await renderDiv(Button, { className: 'custom' });
    expect(div.querySelector('button').className).toEqual('custom ma3 ph3');
    done();
  });

  describe('with a tag prop', () => {
    it('renders the custom tag instead of the default', async done => {
      let div = await renderDiv(Button, { tag: 'a' });
      expect(div.querySelector('button')).toEqual(null);
      done();
    });

    it('filters the tag prop from DOM attributes', async done => {
      let div = await renderDiv(Button, { tag: 'a' });
      expect(div.querySelector('a').getAttribute('tag')).toEqual(null);
      done();
    });
  });
});

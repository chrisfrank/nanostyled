const React = require('react');
const { JSDOM } = require('jsdom');
const { renderToString } = require('react-dom/server');
const bm = require('benchmark');
const styled = require('styled-components');
const nanostyled = require('../src');

const dom = new JSDOM('');

const NanoButton = nanostyled('button', {
  padding: 'ph3',
  margin: 'ma2',
  display: 'db',
  color: 'bg-black white hover-red',
});

const StyledButton = styled.default.button({
  padding: '1em',
  margin: '1em',
  display: 'block',
  color: 'white',
  background: 'black',
  '&:hover': {
    color: 'red',
  },
});

const props = { children: 'Click Me' };

const testDiv = () => dom.window.document.createElement('div');

let suite = new bm.Suite();

suite.add('nanostyled', () =>
  renderToString(React.createElement(NanoButton, props), testDiv())
);

suite.add('sc', () =>
  renderToString(React.createElement(StyledButton, props), testDiv())
);

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.run({ async: true });

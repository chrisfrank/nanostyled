const React = require('react');
const TestRenderer = require('react-test-renderer');
const bm = require('benchmark');
const styled = require('styled-components');
const nanostyled = require('../dist/nanostyled.cjs.js');

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

const renderButton = button =>
  TestRenderer.create(React.createElement(button, { children: 'Click Me' }));

let suite = new bm.Suite();

suite.add('nanostyled', () => renderButton(NanoButton));

suite.add('sc', () => renderButton(StyledButton));

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.run({ async: true });

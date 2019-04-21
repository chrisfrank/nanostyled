'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

// wrap nanostyled in a factory that can accept any React-compatible
// +createElement+ function. Works with React, Preact, Inferno, etc
function factory(createElement) {
  return function nanostyled(tag, styleProps) {
    var Component = function(props) {
      var separatedProps = Object.keys(styleProps).reduce(
        function(memo, key) {
          var style = props[key] === undefined ? styleProps[key] : props[key];
          if (style) memo.styles.push(style);
          delete memo.notStyles[key];
          return memo;
        },
        {
          styles: [props.className].filter(Boolean),
          notStyles: assign({}, props),
        }
      );

      var passedProps = assign(separatedProps.notStyles, {
        className: separatedProps.styles.join(' '),
        as: undefined,
      });

      return createElement(props.as || tag, passedProps);
    };

    Component.displayName = 'nanostyled-'.concat(tag);
    return Component;
  };
}

// borrow IE-compatible Object.assign from @developit/preact
function assign(obj, props) {
  for (var i in props) obj[i] = props[i];
  return obj;
}

var nanostyled = factory(React.createElement);

module.exports = nanostyled;

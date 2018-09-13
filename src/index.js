const React = require('react');

const nanostyled = (tag, styleProps) => {
  let Chemical = props => {
    let { css, filteredProps } = Object.keys(styleProps).reduce(
      (memo, key, index) => {
        memo.css.push(props[key] || styleProps[key]);
        delete memo.filteredProps[key];
        return memo;
      },
      {
        css: [],
        filteredProps: Object.assign({}, props),
      }
    );

    let passedProps = Object.assign(filteredProps, {
      className: css.join(' '),
      tag: undefined,
    });
    return React.createElement(props.tag || tag, passedProps);
  };
  Chemical.displayName = `nanostyled-${tag}`;
  return Chemical;
};

module.exports = nanostyled;

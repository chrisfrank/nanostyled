(function(f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.nanostyled = f();
  }
})(function() {
  var define, module, exports;
  return (function() {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = 'function' == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = 'MODULE_NOT_FOUND'), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function(r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = 'function' == typeof require && require, i = 0;
        i < t.length;
        i++
      )
        o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function(require, module, exports) {
          (function(global) {
            const React =
              typeof window !== 'undefined'
                ? window['React']
                : typeof global !== 'undefined'
                  ? global['React']
                  : null;

            const nanostyled = (tag, styleProps) => {
              let Component = props => {
                let { css, filteredProps } = Object.keys(styleProps).reduce(
                  (memo, key, index) => {
                    let style =
                      props[key] === undefined ? styleProps[key] : props[key];
                    if (style) memo.css.push(style);
                    delete memo.filteredProps[key];
                    return memo;
                  },
                  {
                    css: [props.className].filter(Boolean),
                    filteredProps: Object.assign({}, props),
                  }
                );

                let passedProps = Object.assign(filteredProps, {
                  className: css.join(' '),
                  tag: undefined,
                });
                return React.createElement(props.tag || tag, passedProps);
              };

              Component.displayName = `nanostyled-${tag}`;
              return Component;
            };

            module.exports = nanostyled;
          }.call(
            this,
            typeof global !== 'undefined'
              ? global
              : typeof self !== 'undefined'
                ? self
                : typeof window !== 'undefined'
                  ? window
                  : {}
          ));
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

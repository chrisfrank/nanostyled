(function() {
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
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          const { nanostyled } = require('../index');
          window.nanostyled = nanostyled;
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/example/_window.js',
          '/example'
        ));
      },
      { '../index': 2, _process: 7, buffer: 4, timers: 13 },
    ],
    2: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          const React = require('react');

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

          module.exports = {
            default: nanostyled,
            nanostyled: nanostyled,
          };
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/index.js',
          '/'
        ));
      },
      { _process: 7, buffer: 4, react: 12, timers: 13 },
    ],
    3: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          'use strict';

          exports.byteLength = byteLength;
          exports.toByteArray = toByteArray;
          exports.fromByteArray = fromByteArray;

          var lookup = [];
          var revLookup = [];
          var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

          var code =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          for (var i = 0, len = code.length; i < len; ++i) {
            lookup[i] = code[i];
            revLookup[code.charCodeAt(i)] = i;
          }

          // Support decoding URL-safe base64 strings, as Node.js does.
          // See: https://en.wikipedia.org/wiki/Base64#URL_applications
          revLookup['-'.charCodeAt(0)] = 62;
          revLookup['_'.charCodeAt(0)] = 63;

          function getLens(b64) {
            var len = b64.length;

            if (len % 4 > 0) {
              throw new Error('Invalid string. Length must be a multiple of 4');
            }

            // Trim off extra bytes after placeholder bytes are found
            // See: https://github.com/beatgammit/base64-js/issues/42
            var validLen = b64.indexOf('=');
            if (validLen === -1) validLen = len;

            var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);

            return [validLen, placeHoldersLen];
          }

          // base64 is 4/3 + up to two characters of the original data
          function byteLength(b64) {
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
          }

          function _byteLength(b64, validLen, placeHoldersLen) {
            return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
          }

          function toByteArray(b64) {
            var tmp;
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];

            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

            var curByte = 0;

            // if there are placeholders, only get up to the last complete 4 chars
            var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

            for (var i = 0; i < len; i += 4) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 18) |
                (revLookup[b64.charCodeAt(i + 1)] << 12) |
                (revLookup[b64.charCodeAt(i + 2)] << 6) |
                revLookup[b64.charCodeAt(i + 3)];
              arr[curByte++] = (tmp >> 16) & 0xff;
              arr[curByte++] = (tmp >> 8) & 0xff;
              arr[curByte++] = tmp & 0xff;
            }

            if (placeHoldersLen === 2) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 2) |
                (revLookup[b64.charCodeAt(i + 1)] >> 4);
              arr[curByte++] = tmp & 0xff;
            }

            if (placeHoldersLen === 1) {
              tmp =
                (revLookup[b64.charCodeAt(i)] << 10) |
                (revLookup[b64.charCodeAt(i + 1)] << 4) |
                (revLookup[b64.charCodeAt(i + 2)] >> 2);
              arr[curByte++] = (tmp >> 8) & 0xff;
              arr[curByte++] = tmp & 0xff;
            }

            return arr;
          }

          function tripletToBase64(num) {
            return (
              lookup[(num >> 18) & 0x3f] +
              lookup[(num >> 12) & 0x3f] +
              lookup[(num >> 6) & 0x3f] +
              lookup[num & 0x3f]
            );
          }

          function encodeChunk(uint8, start, end) {
            var tmp;
            var output = [];
            for (var i = start; i < end; i += 3) {
              tmp =
                ((uint8[i] << 16) & 0xff0000) +
                ((uint8[i + 1] << 8) & 0xff00) +
                (uint8[i + 2] & 0xff);
              output.push(tripletToBase64(tmp));
            }
            return output.join('');
          }

          function fromByteArray(uint8) {
            var tmp;
            var len = uint8.length;
            var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
            var parts = [];
            var maxChunkLength = 16383; // must be multiple of 3

            // go through the array every three bytes, we'll deal with trailing stuff later
            for (
              var i = 0, len2 = len - extraBytes;
              i < len2;
              i += maxChunkLength
            ) {
              parts.push(
                encodeChunk(
                  uint8,
                  i,
                  i + maxChunkLength > len2 ? len2 : i + maxChunkLength
                )
              );
            }

            // pad the end with zeros, but make sure to not forget the extra bytes
            if (extraBytes === 1) {
              tmp = uint8[len - 1];
              parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + '==');
            } else if (extraBytes === 2) {
              tmp = (uint8[len - 2] << 8) + uint8[len - 1];
              parts.push(
                lookup[tmp >> 10] +
                  lookup[(tmp >> 4) & 0x3f] +
                  lookup[(tmp << 2) & 0x3f] +
                  '='
              );
            }

            return parts.join('');
          }
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/base64-js/index.js',
          '/node_modules/base64-js'
        ));
      },
      { _process: 7, buffer: 4, timers: 13 },
    ],
    4: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
          /* eslint-disable no-proto */

          'use strict';

          var base64 = require('base64-js');
          var ieee754 = require('ieee754');

          exports.Buffer = Buffer;
          exports.SlowBuffer = SlowBuffer;
          exports.INSPECT_MAX_BYTES = 50;

          var K_MAX_LENGTH = 0x7fffffff;
          exports.kMaxLength = K_MAX_LENGTH;

          /**
           * If `Buffer.TYPED_ARRAY_SUPPORT`:
           *   === true    Use Uint8Array implementation (fastest)
           *   === false   Print warning and recommend using `buffer` v4.x which has an Object
           *               implementation (most compatible, even IE6)
           *
           * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
           * Opera 11.6+, iOS 4.2+.
           *
           * We report that the browser does not support typed arrays if the are not subclassable
           * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
           * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
           * for __proto__ and has a buggy typed array implementation.
           */
          Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

          if (
            !Buffer.TYPED_ARRAY_SUPPORT &&
            typeof console !== 'undefined' &&
            typeof console.error === 'function'
          ) {
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by ' +
                '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
            );
          }

          function typedArraySupport() {
            // Can typed array instances can be augmented?
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function() {
                  return 42;
                },
              };
              return arr.foo() === 42;
            } catch (e) {
              return false;
            }
          }

          Object.defineProperty(Buffer.prototype, 'parent', {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.buffer;
            },
          });

          Object.defineProperty(Buffer.prototype, 'offset', {
            enumerable: true,
            get: function() {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.byteOffset;
            },
          });

          function createBuffer(length) {
            if (length > K_MAX_LENGTH) {
              throw new RangeError(
                'The value "' + length + '" is invalid for option "size"'
              );
            }
            // Return an augmented `Uint8Array` instance
            var buf = new Uint8Array(length);
            buf.__proto__ = Buffer.prototype;
            return buf;
          }

          /**
           * The Buffer constructor returns instances of `Uint8Array` that have their
           * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
           * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
           * and the `Uint8Array` methods. Square bracket notation works as expected -- it
           * returns a single octet.
           *
           * The `Uint8Array` prototype remains unmodified.
           */

          function Buffer(arg, encodingOrOffset, length) {
            // Common case.
            if (typeof arg === 'number') {
              if (typeof encodingOrOffset === 'string') {
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              }
              return allocUnsafe(arg);
            }
            return from(arg, encodingOrOffset, length);
          }

          // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
          if (
            typeof Symbol !== 'undefined' &&
            Symbol.species != null &&
            Buffer[Symbol.species] === Buffer
          ) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
              enumerable: false,
              writable: false,
            });
          }

          Buffer.poolSize = 8192; // not used by this implementation

          function from(value, encodingOrOffset, length) {
            if (typeof value === 'string') {
              return fromString(value, encodingOrOffset);
            }

            if (ArrayBuffer.isView(value)) {
              return fromArrayLike(value);
            }

            if (value == null) {
              throw TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
                  'or Array-like Object. Received type ' +
                  typeof value
              );
            }

            if (
              isInstance(value, ArrayBuffer) ||
              (value && isInstance(value.buffer, ArrayBuffer))
            ) {
              return fromArrayBuffer(value, encodingOrOffset, length);
            }

            if (typeof value === 'number') {
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            }

            var valueOf = value.valueOf && value.valueOf();
            if (valueOf != null && valueOf !== value) {
              return Buffer.from(valueOf, encodingOrOffset, length);
            }

            var b = fromObject(value);
            if (b) return b;

            if (
              typeof Symbol !== 'undefined' &&
              Symbol.toPrimitive != null &&
              typeof value[Symbol.toPrimitive] === 'function'
            ) {
              return Buffer.from(
                value[Symbol.toPrimitive]('string'),
                encodingOrOffset,
                length
              );
            }

            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
                'or Array-like Object. Received type ' +
                typeof value
            );
          }

          /**
           * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
           * if value is a number.
           * Buffer.from(str[, encoding])
           * Buffer.from(array)
           * Buffer.from(buffer)
           * Buffer.from(arrayBuffer[, byteOffset[, length]])
           **/
          Buffer.from = function(value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length);
          };

          // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
          // https://github.com/feross/buffer/pull/148
          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;

          function assertSize(size) {
            if (typeof size !== 'number') {
              throw new TypeError('"size" argument must be of type number');
            } else if (size < 0) {
              throw new RangeError(
                'The value "' + size + '" is invalid for option "size"'
              );
            }
          }

          function alloc(size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
              return createBuffer(size);
            }
            if (fill !== undefined) {
              // Only pay attention to encoding if it's a string. This
              // prevents accidentally sending in a number that would
              // be interpretted as a start offset.
              return typeof encoding === 'string'
                ? createBuffer(size).fill(fill, encoding)
                : createBuffer(size).fill(fill);
            }
            return createBuffer(size);
          }

          /**
           * Creates a new filled Buffer instance.
           * alloc(size[, fill[, encoding]])
           **/
          Buffer.alloc = function(size, fill, encoding) {
            return alloc(size, fill, encoding);
          };

          function allocUnsafe(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : checked(size) | 0);
          }

          /**
           * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
           * */
          Buffer.allocUnsafe = function(size) {
            return allocUnsafe(size);
          };
          /**
           * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
           */
          Buffer.allocUnsafeSlow = function(size) {
            return allocUnsafe(size);
          };

          function fromString(string, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
              encoding = 'utf8';
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding);
            }

            var length = byteLength(string, encoding) | 0;
            var buf = createBuffer(length);

            var actual = buf.write(string, encoding);

            if (actual !== length) {
              // Writing a hex string, for example, that contains invalid characters will
              // cause everything after the first invalid character to be ignored. (e.g.
              // 'abxxcd' will be treated as 'ab')
              buf = buf.slice(0, actual);
            }

            return buf;
          }

          function fromArrayLike(array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0;
            var buf = createBuffer(length);
            for (var i = 0; i < length; i += 1) {
              buf[i] = array[i] & 255;
            }
            return buf;
          }

          function fromArrayBuffer(array, byteOffset, length) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError('"offset" is outside of buffer bounds');
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError('"length" is outside of buffer bounds');
            }

            var buf;
            if (byteOffset === undefined && length === undefined) {
              buf = new Uint8Array(array);
            } else if (length === undefined) {
              buf = new Uint8Array(array, byteOffset);
            } else {
              buf = new Uint8Array(array, byteOffset, length);
            }

            // Return an augmented `Uint8Array` instance
            buf.__proto__ = Buffer.prototype;
            return buf;
          }

          function fromObject(obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              var buf = createBuffer(len);

              if (buf.length === 0) {
                return buf;
              }

              obj.copy(buf, 0, 0, len);
              return buf;
            }

            if (obj.length !== undefined) {
              if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                return createBuffer(0);
              }
              return fromArrayLike(obj);
            }

            if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
              return fromArrayLike(obj.data);
            }
          }

          function checked(length) {
            // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
            // length is NaN (which is otherwise coerced to zero.)
            if (length >= K_MAX_LENGTH) {
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum ' +
                  'size: 0x' +
                  K_MAX_LENGTH.toString(16) +
                  ' bytes'
              );
            }
            return length | 0;
          }

          function SlowBuffer(length) {
            if (+length != length) {
              // eslint-disable-line eqeqeq
              length = 0;
            }
            return Buffer.alloc(+length);
          }

          Buffer.isBuffer = function isBuffer(b) {
            return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
          };

          Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array))
              a = Buffer.from(a, a.offset, a.byteLength);
            if (isInstance(b, Uint8Array))
              b = Buffer.from(b, b.offset, b.byteLength);
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            }

            if (a === b) return 0;

            var x = a.length;
            var y = b.length;

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return true;
              default:
                return false;
            }
          };

          Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) {
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            }

            if (list.length === 0) {
              return Buffer.alloc(0);
            }

            var i;
            if (length === undefined) {
              length = 0;
              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }

            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for (i = 0; i < list.length; ++i) {
              var buf = list[i];
              if (isInstance(buf, Uint8Array)) {
                buf = Buffer.from(buf);
              }
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              }
              buf.copy(buffer, pos);
              pos += buf.length;
            }
            return buffer;
          };

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length;
            }
            if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
              return string.byteLength;
            }
            if (typeof string !== 'string') {
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
                  'Received type ' +
                  typeof string
              );
            }

            var len = string.length;
            var mustMatch = arguments.length > 2 && arguments[2] === true;
            if (!mustMatch && len === 0) return 0;

            // Use a for loop to avoid recursion
            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return len;
                case 'utf8':
                case 'utf-8':
                  return utf8ToBytes(string).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return len * 2;
                case 'hex':
                  return len >>> 1;
                case 'base64':
                  return base64ToBytes(string).length;
                default:
                  if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
                  }
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.byteLength = byteLength;

          function slowToString(encoding, start, end) {
            var loweredCase = false;

            // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
            // property of a typed array.

            // This behaves neither like String nor Uint8Array in that we set start/end
            // to their upper/lower bounds if the value passed is out of range.
            // undefined is handled specially as per ECMA-262 6th Edition,
            // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
            if (start === undefined || start < 0) {
              start = 0;
            }
            // Return early if start > this.length. Done here to prevent potential uint32
            // coercion fail below.
            if (start > this.length) {
              return '';
            }

            if (end === undefined || end > this.length) {
              end = this.length;
            }

            if (end <= 0) {
              return '';
            }

            // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
            end >>>= 0;
            start >>>= 0;

            if (end <= start) {
              return '';
            }

            if (!encoding) encoding = 'utf8';

            while (true) {
              switch (encoding) {
                case 'hex':
                  return hexSlice(this, start, end);

                case 'utf8':
                case 'utf-8':
                  return utf8Slice(this, start, end);

                case 'ascii':
                  return asciiSlice(this, start, end);

                case 'latin1':
                case 'binary':
                  return latin1Slice(this, start, end);

                case 'base64':
                  return base64Slice(this, start, end);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return utf16leSlice(this, start, end);

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = (encoding + '').toLowerCase();
                  loweredCase = true;
              }
            }
          }

          // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
          // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
          // reliably in a browserify context because there could be multiple different
          // copies of the 'buffer' package in use. This method works even for Buffer
          // instances that were created from another copy of the `buffer` package.
          // See: https://github.com/feross/buffer/issues/154
          Buffer.prototype._isBuffer = true;

          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }
            return this;
          };

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }
            return this;
          };

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }
            return this;
          };

          Buffer.prototype.toString = function toString() {
            var length = this.length;
            if (length === 0) return '';
            if (arguments.length === 0) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };

          Buffer.prototype.toLocaleString = Buffer.prototype.toString;

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b))
              throw new TypeError('Argument must be a Buffer');
            if (this === b) return true;
            return Buffer.compare(this, b) === 0;
          };

          Buffer.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.INSPECT_MAX_BYTES;
            str = this.toString('hex', 0, max)
              .replace(/(.{2})/g, '$1 ')
              .trim();
            if (this.length > max) str += ' ... ';
            return '<Buffer ' + str + '>';
          };

          Buffer.prototype.compare = function compare(
            target,
            start,
            end,
            thisStart,
            thisEnd
          ) {
            if (isInstance(target, Uint8Array)) {
              target = Buffer.from(target, target.offset, target.byteLength);
            }
            if (!Buffer.isBuffer(target)) {
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. ' +
                  'Received type ' +
                  typeof target
              );
            }

            if (start === undefined) {
              start = 0;
            }
            if (end === undefined) {
              end = target ? target.length : 0;
            }
            if (thisStart === undefined) {
              thisStart = 0;
            }
            if (thisEnd === undefined) {
              thisEnd = this.length;
            }

            if (
              start < 0 ||
              end > target.length ||
              thisStart < 0 ||
              thisEnd > this.length
            ) {
              throw new RangeError('out of range index');
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }
            if (thisStart >= thisEnd) {
              return -1;
            }
            if (start >= end) {
              return 1;
            }

            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;

            if (this === target) return 0;

            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);

            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
          // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
          //
          // Arguments:
          // - buffer - a Buffer to search
          // - val - a string, Buffer, or number
          // - byteOffset - an index into `buffer`; will be clamped to an int32
          // - encoding - an optional encoding, relevant is val is a string
          // - dir - true for indexOf, false for lastIndexOf
          function bidirectionalIndexOf(
            buffer,
            val,
            byteOffset,
            encoding,
            dir
          ) {
            // Empty buffer means no match
            if (buffer.length === 0) return -1;

            // Normalize byteOffset
            if (typeof byteOffset === 'string') {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff;
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000;
            }
            byteOffset = +byteOffset; // Coerce to Number.
            if (numberIsNaN(byteOffset)) {
              // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
              byteOffset = dir ? 0 : buffer.length - 1;
            }

            // Normalize byteOffset: negative offsets start from the end of the buffer
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
              if (dir) return -1;
              else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0;
              else return -1;
            }

            // Normalize val
            if (typeof val === 'string') {
              val = Buffer.from(val, encoding);
            }

            // Finally, search either indexOf (if dir is true) or lastIndexOf
            if (Buffer.isBuffer(val)) {
              // Special case: looking for empty string/buffer always fails
              if (val.length === 0) {
                return -1;
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === 'number') {
              val = val & 0xff; // Search for a byte value [0-255]
              if (typeof Uint8Array.prototype.indexOf === 'function') {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }

            throw new TypeError('val must be string, number or Buffer');
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase();
              if (
                encoding === 'ucs2' ||
                encoding === 'ucs-2' ||
                encoding === 'utf16le' ||
                encoding === 'utf-16le'
              ) {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }
                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i];
              } else {
                return buf.readUInt16BE(i * indexSize);
              }
            }

            var i;
            if (dir) {
              var foundIndex = -1;
              for (i = byteOffset; i < arrLength; i++) {
                if (
                  read(arr, i) ===
                  read(val, foundIndex === -1 ? 0 : i - foundIndex)
                ) {
                  if (foundIndex === -1) foundIndex = i;
                  if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength)
                byteOffset = arrLength - valLength;
              for (i = byteOffset; i >= 0; i--) {
                var found = true;
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }
                if (found) return i;
              }
            }

            return -1;
          }

          Buffer.prototype.includes = function includes(
            val,
            byteOffset,
            encoding
          ) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };

          Buffer.prototype.indexOf = function indexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };

          Buffer.prototype.lastIndexOf = function lastIndexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length) {
              length = remaining;
            } else {
              length = Number(length);
              if (length > remaining) {
                length = remaining;
              }
            }

            var strLen = string.length;

            if (length > strLen / 2) {
              length = strLen / 2;
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16);
              if (numberIsNaN(parsed)) return i;
              buf[offset + i] = parsed;
            }
            return i;
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(
              utf8ToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length);
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(
              utf16leToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          Buffer.prototype.write = function write(
            string,
            offset,
            length,
            encoding
          ) {
            // Buffer#write(string)
            if (offset === undefined) {
              encoding = 'utf8';
              length = this.length;
              offset = 0;
              // Buffer#write(string, encoding)
            } else if (length === undefined && typeof offset === 'string') {
              encoding = offset;
              length = this.length;
              offset = 0;
              // Buffer#write(string, offset[, length][, encoding])
            } else if (isFinite(offset)) {
              offset = offset >>> 0;
              if (isFinite(length)) {
                length = length >>> 0;
                if (encoding === undefined) encoding = 'utf8';
              } else {
                encoding = length;
                length = undefined;
              }
            } else {
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            }

            var remaining = this.length - offset;
            if (length === undefined || length > remaining) length = remaining;

            if (
              (string.length > 0 && (length < 0 || offset < 0)) ||
              offset > this.length
            ) {
              throw new RangeError('Attempt to write outside buffer bounds');
            }

            if (!encoding) encoding = 'utf8';

            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'hex':
                  return hexWrite(this, string, offset, length);

                case 'utf8':
                case 'utf-8':
                  return utf8Write(this, string, offset, length);

                case 'ascii':
                  return asciiWrite(this, string, offset, length);

                case 'latin1':
                case 'binary':
                  return latin1Write(this, string, offset, length);

                case 'base64':
                  // Warning: maxLength not taken into account in base64Write
                  return base64Write(this, string, offset, length);

                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return ucs2Write(this, string, offset, length);

                default:
                  if (loweredCase)
                    throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          };

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];

            var i = start;
            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence =
                firstByte > 0xef
                  ? 4
                  : firstByte > 0xdf
                    ? 3
                    : firstByte > 0xbf
                      ? 2
                      : 1;

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte;
                    }
                    break;
                  case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xc0) === 0x80) {
                      tempCodePoint =
                        ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f);
                      if (tempCodePoint > 0x7f) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0xc) |
                        ((secondByte & 0x3f) << 0x6) |
                        (thirdByte & 0x3f);
                      if (
                        tempCodePoint > 0x7ff &&
                        (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                      ) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80 &&
                      (fourthByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0x12) |
                        ((secondByte & 0x3f) << 0xc) |
                        ((thirdByte & 0x3f) << 0x6) |
                        (fourthByte & 0x3f);
                      if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint;
                      }
                    }
                }
              }

              if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xfffd;
                bytesPerSequence = 1;
              } else if (codePoint > 0xffff) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000;
                res.push(((codePoint >>> 10) & 0x3ff) | 0xd800);
                codePoint = 0xdc00 | (codePoint & 0x3ff);
              }

              res.push(codePoint);
              i += bytesPerSequence;
            }

            return decodeCodePointsArray(res);
          }

          // Based on http://stackoverflow.com/a/22747272/680742, the browser with
          // the lowest limit is Chrome, with 0x10000 args.
          // We go 1 magnitude less, for safety
          var MAX_ARGUMENTS_LENGTH = 0x1000;

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
            }

            // Decode in chunks to avoid "call stack size exceeded".
            var res = '';
            var i = 0;
            while (i < len) {
              res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
              );
            }
            return res;
          }

          function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7f);
            }
            return ret;
          }

          function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }
            return ret;
          }

          function hexSlice(buf, start, end) {
            var len = buf.length;

            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;

            var out = '';
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }
            return out;
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }
            return res;
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === undefined ? len : ~~end;

            if (start < 0) {
              start += len;
              if (start < 0) start = 0;
            } else if (start > len) {
              start = len;
            }

            if (end < 0) {
              end += len;
              if (end < 0) end = 0;
            } else if (end > len) {
              end = len;
            }

            if (end < start) end = start;

            var newBuf = this.subarray(start, end);
            // Return an augmented `Uint8Array` instance
            newBuf.__proto__ = Buffer.prototype;
            return newBuf;
          };

          /*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0)
              throw new RangeError('offset is not uint');
            if (offset + ext > length)
              throw new RangeError('Trying to access beyond buffer length');
          }

          Buffer.prototype.readUIntLE = function readUIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            return val;
          };

          Buffer.prototype.readUIntBE = function readUIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }

            var val = this[offset + --byteLength];
            var mul = 1;
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }

            return val;
          };

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };

          Buffer.prototype.readUInt16LE = function readUInt16LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | (this[offset + 1] << 8);
          };

          Buffer.prototype.readUInt16BE = function readUInt16BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return (this[offset] << 8) | this[offset + 1];
          };

          Buffer.prototype.readUInt32LE = function readUInt32LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16)) +
              this[offset + 3] * 0x1000000
            );
          };

          Buffer.prototype.readUInt32BE = function readUInt32BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] * 0x1000000 +
              ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            );
          };

          Buffer.prototype.readIntLE = function readIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readIntBE = function readIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 0x80)) return this[offset];
            return (0xff - this[offset] + 1) * -1;
          };

          Buffer.prototype.readInt16LE = function readInt16LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | (this[offset + 1] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt16BE = function readInt16BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | (this[offset] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt32LE = function readInt32LE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] |
              (this[offset + 1] << 8) |
              (this[offset + 2] << 16) |
              (this[offset + 3] << 24)
            );
          };

          Buffer.prototype.readInt32BE = function readInt32BE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] << 24) |
              (this[offset + 1] << 16) |
              (this[offset + 2] << 8) |
              this[offset + 3]
            );
          };

          Buffer.prototype.readFloatLE = function readFloatLE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };

          Buffer.prototype.readFloatBE = function readFloatBE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };

          Buffer.prototype.readDoubleLE = function readDoubleLE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };

          Buffer.prototype.readDoubleBE = function readDoubleBE(
            offset,
            noAssert
          ) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (value > max || value < min)
              throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range');
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var mul = 1;
            var i = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUIntBE = function writeUIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUInt8 = function writeUInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 0xff;
            return offset + 4;
          };

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };

          Buffer.prototype.writeIntLE = function writeIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeIntBE = function writeIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeInt8 = function writeInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeInt16LE = function writeInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };

          Buffer.prototype.writeInt16BE = function writeInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };

          Buffer.prototype.writeInt32LE = function writeInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
          };

          Buffer.prototype.writeInt32BE = function writeInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (value < 0) value = 0xffffffff + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length)
              throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                4,
                3.4028234663852886e38,
                -3.4028234663852886e38
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeFloatBE = function writeFloatBE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, false, noAssert);
          };

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                8,
                1.7976931348623157e308,
                -1.7976931348623157e308
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, false, noAssert);
          };

          // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
          Buffer.prototype.copy = function copy(
            target,
            targetStart,
            start,
            end
          ) {
            if (!Buffer.isBuffer(target))
              throw new TypeError('argument should be a Buffer');
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;

            // Copy 0 bytes; we're done
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;

            // Fatal error conditions
            if (targetStart < 0) {
              throw new RangeError('targetStart out of bounds');
            }
            if (start < 0 || start >= this.length)
              throw new RangeError('Index out of range');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');

            // Are we oob?
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }

            var len = end - start;

            if (
              this === target &&
              typeof Uint8Array.prototype.copyWithin === 'function'
            ) {
              // Use built-in when available, missing from IE11
              this.copyWithin(targetStart, start, end);
            } else if (
              this === target &&
              start < targetStart &&
              targetStart < end
            ) {
              // descending copy from end
              for (var i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(
                target,
                this.subarray(start, end),
                targetStart
              );
            }

            return len;
          };

          // Usage:
          //    buffer.fill(number[, offset[, end]])
          //    buffer.fill(buffer[, offset[, end]])
          //    buffer.fill(string[, offset[, end]][, encoding])
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            // Handle string cases:
            if (typeof val === 'string') {
              if (typeof start === 'string') {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === 'string') {
                encoding = end;
                end = this.length;
              }
              if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string');
              }
              if (
                typeof encoding === 'string' &&
                !Buffer.isEncoding(encoding)
              ) {
                throw new TypeError('Unknown encoding: ' + encoding);
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0);
                if (
                  (encoding === 'utf8' && code < 128) ||
                  encoding === 'latin1'
                ) {
                  // Fast path: If `val` fits into a single byte, use that numeric value.
                  val = code;
                }
              }
            } else if (typeof val === 'number') {
              val = val & 255;
            }

            // Invalid ranges are not set to a default, so can range check early.
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError('Out of range index');
            }

            if (end <= start) {
              return this;
            }

            start = start >>> 0;
            end = end === undefined ? this.length : end >>> 0;

            if (!val) val = 0;

            var i;
            if (typeof val === 'number') {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val)
                ? val
                : Buffer.from(val, encoding);
              var len = bytes.length;
              if (len === 0) {
                throw new TypeError(
                  'The value "' + val + '" is invalid for argument "value"'
                );
              }
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }

            return this;
          };

          // HELPER FUNCTIONS
          // ================

          var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

          function base64clean(str) {
            // Node takes equal signs as end of the Base64 encoding
            str = str.split('=')[0];
            // Node strips out invalid characters like \n and \t from the string, base64-js does not
            str = str.trim().replace(INVALID_BASE64_RE, '');
            // Node converts strings with length < 2 to ''
            if (str.length < 2) return '';
            // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
            while (str.length % 4 !== 0) {
              str = str + '=';
            }
            return str;
          }

          function toHex(n) {
            if (n < 16) return '0' + n.toString(16);
            return n.toString(16);
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i);

              // is surrogate component
              if (codePoint > 0xd7ff && codePoint < 0xe000) {
                // last char was a lead
                if (!leadSurrogate) {
                  // no lead yet
                  if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  }

                  // valid lead
                  leadSurrogate = codePoint;

                  continue;
                }

                // 2 leads in a row
                if (codePoint < 0xdc00) {
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                  leadSurrogate = codePoint;
                  continue;
                }

                // valid surrogate pair
                codePoint =
                  (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                  0x10000;
              } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
              }

              leadSurrogate = null;

              // encode utf8
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break;
                bytes.push(codePoint);
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break;
                bytes.push(
                  (codePoint >> 0x6) | 0xc0,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break;
                bytes.push(
                  (codePoint >> 0xc) | 0xe0,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break;
                bytes.push(
                  (codePoint >> 0x12) | 0xf0,
                  ((codePoint >> 0xc) & 0x3f) | 0x80,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else {
                throw new Error('Invalid code point');
              }
            }

            return bytes;
          }

          function asciiToBytes(str) {
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              // Node's code seems to be doing this and not & 0x7F..
              byteArray.push(str.charCodeAt(i) & 0xff);
            }
            return byteArray;
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break;

              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }

            return byteArray;
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break;
              dst[i + offset] = src[i];
            }
            return i;
          }

          // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
          // the `instanceof` check but they should be treated as of that type.
          // See: https://github.com/feross/buffer/issues/166
          function isInstance(obj, type) {
            return (
              obj instanceof type ||
              (obj != null &&
                obj.constructor != null &&
                obj.constructor.name != null &&
                obj.constructor.name === type.name)
            );
          }
          function numberIsNaN(obj) {
            // For IE11 support
            return obj !== obj; // eslint-disable-line no-self-compare
          }
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/buffer/index.js',
          '/node_modules/buffer'
        ));
      },
      { _process: 7, 'base64-js': 3, buffer: 4, ieee754: 5, timers: 13 },
    ],
    5: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var nBits = -7;
            var i = isLE ? nBytes - 1 : 0;
            var d = isLE ? -1 : 1;
            var s = buffer[offset + i];

            i += d;

            e = s & ((1 << -nBits) - 1);
            s >>= -nBits;
            nBits += eLen;
            for (
              ;
              nBits > 0;
              e = e * 256 + buffer[offset + i], i += d, nBits -= 8
            ) {}

            m = e & ((1 << -nBits) - 1);
            e >>= -nBits;
            nBits += mLen;
            for (
              ;
              nBits > 0;
              m = m * 256 + buffer[offset + i], i += d, nBits -= 8
            ) {}

            if (e === 0) {
              e = 1 - eBias;
            } else if (e === eMax) {
              return m ? NaN : (s ? -1 : 1) * Infinity;
            } else {
              m = m + Math.pow(2, mLen);
              e = e - eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
          };

          exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c;
            var eLen = nBytes * 8 - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            var i = isLE ? 0 : nBytes - 1;
            var d = isLE ? 1 : -1;
            var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

            value = Math.abs(value);

            if (isNaN(value) || value === Infinity) {
              m = isNaN(value) ? 1 : 0;
              e = eMax;
            } else {
              e = Math.floor(Math.log(value) / Math.LN2);
              if (value * (c = Math.pow(2, -e)) < 1) {
                e--;
                c *= 2;
              }
              if (e + eBias >= 1) {
                value += rt / c;
              } else {
                value += rt * Math.pow(2, 1 - eBias);
              }
              if (value * c >= 2) {
                e++;
                c /= 2;
              }

              if (e + eBias >= eMax) {
                m = 0;
                e = eMax;
              } else if (e + eBias >= 1) {
                m = (value * c - 1) * Math.pow(2, mLen);
                e = e + eBias;
              } else {
                m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                e = 0;
              }
            }

            for (
              ;
              mLen >= 8;
              buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
            ) {}

            e = (e << mLen) | m;
            eLen += mLen;
            for (
              ;
              eLen > 0;
              buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
            ) {}

            buffer[offset + i - d] |= s * 128;
          };
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/ieee754/index.js',
          '/node_modules/ieee754'
        ));
      },
      { _process: 7, buffer: 4, timers: 13 },
    ],
    6: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

          'use strict';
          /* eslint-disable no-unused-vars */
          var getOwnPropertySymbols = Object.getOwnPropertySymbols;
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var propIsEnumerable = Object.prototype.propertyIsEnumerable;

          function toObject(val) {
            if (val === null || val === undefined) {
              throw new TypeError(
                'Object.assign cannot be called with null or undefined'
              );
            }

            return Object(val);
          }

          function shouldUseNative() {
            try {
              if (!Object.assign) {
                return false;
              }

              // Detect buggy property enumeration order in older V8 versions.

              // https://bugs.chromium.org/p/v8/issues/detail?id=4118
              var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
              test1[5] = 'de';
              if (Object.getOwnPropertyNames(test1)[0] === '5') {
                return false;
              }

              // https://bugs.chromium.org/p/v8/issues/detail?id=3056
              var test2 = {};
              for (var i = 0; i < 10; i++) {
                test2['_' + String.fromCharCode(i)] = i;
              }
              var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                return test2[n];
              });
              if (order2.join('') !== '0123456789') {
                return false;
              }

              // https://bugs.chromium.org/p/v8/issues/detail?id=3056
              var test3 = {};
              'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
                test3[letter] = letter;
              });
              if (
                Object.keys(Object.assign({}, test3)).join('') !==
                'abcdefghijklmnopqrst'
              ) {
                return false;
              }

              return true;
            } catch (err) {
              // We don't expect any of the above to throw, but better to be safe.
              return false;
            }
          }

          module.exports = shouldUseNative()
            ? Object.assign
            : function(target, source) {
                var from;
                var to = toObject(target);
                var symbols;

                for (var s = 1; s < arguments.length; s++) {
                  from = Object(arguments[s]);

                  for (var key in from) {
                    if (hasOwnProperty.call(from, key)) {
                      to[key] = from[key];
                    }
                  }

                  if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) {
                      if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                      }
                    }
                  }
                }

                return to;
              };
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/object-assign/index.js',
          '/node_modules/object-assign'
        ));
      },
      { _process: 7, buffer: 4, timers: 13 },
    ],
    7: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          // shim for using process in browser
          var process = (module.exports = {});

          // cached from whatever global is present so that test runners that stub it
          // don't break things.  But we need to wrap it in a try catch in case it is
          // wrapped in strict mode code which doesn't define any globals.  It's inside a
          // function because try/catches deoptimize in certain engines.

          var cachedSetTimeout;
          var cachedClearTimeout;

          function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
          }
          function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
          }
          (function() {
            try {
              if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
              } else {
                cachedSetTimeout = defaultSetTimout;
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout;
            }
            try {
              if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
              } else {
                cachedClearTimeout = defaultClearTimeout;
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout;
            }
          })();
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              //normal enviroments in sane situations
              return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if (
              (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
              setTimeout
            ) {
              cachedSetTimeout = setTimeout;
              return setTimeout(fun, 0);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedSetTimeout(fun, 0);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
              }
            }
          }
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              //normal enviroments in sane situations
              return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if (
              (cachedClearTimeout === defaultClearTimeout ||
                !cachedClearTimeout) &&
              clearTimeout
            ) {
              cachedClearTimeout = clearTimeout;
              return clearTimeout(marker);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedClearTimeout(marker);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
              }
            }
          }
          var queue = [];
          var draining = false;
          var currentQueue;
          var queueIndex = -1;

          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return;
            }
            draining = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }

          function drainQueue() {
            if (draining) {
              return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
              currentQueue = queue;
              queue = [];
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              queueIndex = -1;
              len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
          }

          process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
              for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
              }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue);
            }
          };

          // v8 likes predictible objects
          function Item(fun, array) {
            this.fun = fun;
            this.array = array;
          }
          Item.prototype.run = function() {
            this.fun.apply(null, this.array);
          };
          process.title = 'browser';
          process.browser = true;
          process.env = {};
          process.argv = [];
          process.version = ''; // empty string to avoid regexp issues
          process.versions = {};

          function noop() {}

          process.on = noop;
          process.addListener = noop;
          process.once = noop;
          process.off = noop;
          process.removeListener = noop;
          process.removeAllListeners = noop;
          process.emit = noop;
          process.prependListener = noop;
          process.prependOnceListener = noop;

          process.listeners = function(name) {
            return [];
          };

          process.binding = function(name) {
            throw new Error('process.binding is not supported');
          };

          process.cwd = function() {
            return '/';
          };
          process.chdir = function(dir) {
            throw new Error('process.chdir is not supported');
          };
          process.umask = function() {
            return 0;
          };
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/process/browser.js',
          '/node_modules/process'
        ));
      },
      { _process: 7, buffer: 4, timers: 13 },
    ],
    8: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /**
           * Copyright (c) 2013-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          'use strict';

          var printWarning = function() {};

          if (process.env.NODE_ENV !== 'production') {
            var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
            var loggedTypeFailures = {};

            printWarning = function(text) {
              var message = 'Warning: ' + text;
              if (typeof console !== 'undefined') {
                console.error(message);
              }
              try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
              } catch (x) {}
            };
          }

          /**
           * Assert that the values match with the type specs.
           * Error messages are memorized and will only be shown once.
           *
           * @param {object} typeSpecs Map of name to a ReactPropType
           * @param {object} values Runtime values that need to be type-checked
           * @param {string} location e.g. "prop", "context", "child context"
           * @param {string} componentName Name of the component for error messages.
           * @param {?Function} getStack Returns the component stack.
           * @private
           */
          function checkPropTypes(
            typeSpecs,
            values,
            location,
            componentName,
            getStack
          ) {
            if (process.env.NODE_ENV !== 'production') {
              for (var typeSpecName in typeSpecs) {
                if (typeSpecs.hasOwnProperty(typeSpecName)) {
                  var error;
                  // Prop type validation may throw. In case they do, we don't want to
                  // fail the render phase where it didn't fail before. So we log it.
                  // After these have been cleaned up, we'll let them throw.
                  try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== 'function') {
                      var err = Error(
                        (componentName || 'React class') +
                          ': ' +
                          location +
                          ' type `' +
                          typeSpecName +
                          '` is invalid; ' +
                          'it must be a function, usually from the `prop-types` package, but received `' +
                          typeof typeSpecs[typeSpecName] +
                          '`.'
                      );
                      err.name = 'Invariant Violation';
                      throw err;
                    }
                    error = typeSpecs[typeSpecName](
                      values,
                      typeSpecName,
                      componentName,
                      location,
                      null,
                      ReactPropTypesSecret
                    );
                  } catch (ex) {
                    error = ex;
                  }
                  if (error && !(error instanceof Error)) {
                    printWarning(
                      (componentName || 'React class') +
                        ': type specification of ' +
                        location +
                        ' `' +
                        typeSpecName +
                        '` is invalid; the type checker ' +
                        'function must return `null` or an `Error` but returned a ' +
                        typeof error +
                        '. ' +
                        'You may have forgotten to pass an argument to the type checker ' +
                        'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                        'shape all require an argument).'
                    );
                  }
                  if (
                    error instanceof Error &&
                    !(error.message in loggedTypeFailures)
                  ) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;

                    var stack = getStack ? getStack() : '';

                    printWarning(
                      'Failed ' +
                        location +
                        ' type: ' +
                        error.message +
                        (stack != null ? stack : '')
                    );
                  }
                }
              }
            }
          }

          module.exports = checkPropTypes;
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/prop-types/checkPropTypes.js',
          '/node_modules/prop-types'
        ));
      },
      { './lib/ReactPropTypesSecret': 9, _process: 7, buffer: 4, timers: 13 },
    ],
    9: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /**
           * Copyright (c) 2013-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          'use strict';

          var ReactPropTypesSecret =
            'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

          module.exports = ReactPropTypesSecret;
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/prop-types/lib/ReactPropTypesSecret.js',
          '/node_modules/prop-types/lib'
        ));
      },
      { _process: 7, buffer: 4, timers: 13 },
    ],
    10: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /** @license React v16.5.0
           * react.development.js
           *
           * Copyright (c) 2013-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          'use strict';

          if (process.env.NODE_ENV !== 'production') {
            (function() {
              'use strict';

              var _assign = require('object-assign');
              var checkPropTypes = require('prop-types/checkPropTypes');

              // TODO: this is special because it gets imported during build.

              var ReactVersion = '16.5.0';

              // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
              // nor polyfill, then a plain number is used for performance.
              var hasSymbol = typeof Symbol === 'function' && Symbol.for;

              var REACT_ELEMENT_TYPE = hasSymbol
                ? Symbol.for('react.element')
                : 0xeac7;
              var REACT_PORTAL_TYPE = hasSymbol
                ? Symbol.for('react.portal')
                : 0xeaca;
              var REACT_FRAGMENT_TYPE = hasSymbol
                ? Symbol.for('react.fragment')
                : 0xeacb;
              var REACT_STRICT_MODE_TYPE = hasSymbol
                ? Symbol.for('react.strict_mode')
                : 0xeacc;
              var REACT_PROFILER_TYPE = hasSymbol
                ? Symbol.for('react.profiler')
                : 0xead2;
              var REACT_PROVIDER_TYPE = hasSymbol
                ? Symbol.for('react.provider')
                : 0xeacd;
              var REACT_CONTEXT_TYPE = hasSymbol
                ? Symbol.for('react.context')
                : 0xeace;
              var REACT_ASYNC_MODE_TYPE = hasSymbol
                ? Symbol.for('react.async_mode')
                : 0xeacf;
              var REACT_FORWARD_REF_TYPE = hasSymbol
                ? Symbol.for('react.forward_ref')
                : 0xead0;
              var REACT_PLACEHOLDER_TYPE = hasSymbol
                ? Symbol.for('react.placeholder')
                : 0xead1;

              var MAYBE_ITERATOR_SYMBOL =
                typeof Symbol === 'function' && Symbol.iterator;
              var FAUX_ITERATOR_SYMBOL = '@@iterator';

              function getIteratorFn(maybeIterable) {
                if (
                  maybeIterable === null ||
                  typeof maybeIterable !== 'object'
                ) {
                  return null;
                }
                var maybeIterator =
                  (MAYBE_ITERATOR_SYMBOL &&
                    maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
                  maybeIterable[FAUX_ITERATOR_SYMBOL];
                if (typeof maybeIterator === 'function') {
                  return maybeIterator;
                }
                return null;
              }

              /**
               * Use invariant() to assert state which your program assumes to be true.
               *
               * Provide sprintf-style format (only %s is supported) and arguments
               * to provide information about what broke and what you were
               * expecting.
               *
               * The invariant message will be stripped in production, but the invariant
               * will remain to ensure logic does not differ in production.
               */

              var validateFormat = function() {};

              {
                validateFormat = function(format) {
                  if (format === undefined) {
                    throw new Error(
                      'invariant requires an error message argument'
                    );
                  }
                };
              }

              function invariant(condition, format, a, b, c, d, e, f) {
                validateFormat(format);

                if (!condition) {
                  var error = void 0;
                  if (format === undefined) {
                    error = new Error(
                      'Minified exception occurred; use the non-minified dev environment ' +
                        'for the full error message and additional helpful warnings.'
                    );
                  } else {
                    var args = [a, b, c, d, e, f];
                    var argIndex = 0;
                    error = new Error(
                      format.replace(/%s/g, function() {
                        return args[argIndex++];
                      })
                    );
                    error.name = 'Invariant Violation';
                  }

                  error.framesToPop = 1; // we don't care about invariant's own frame
                  throw error;
                }
              }

              // Relying on the `invariant()` implementation lets us
              // preserve the format and params in the www builds.

              // Exports ReactDOM.createRoot

              // Experimental error-boundary API that can recover from errors within a single
              // render phase

              // Suspense
              var enableSuspense = false;
              // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:

              // In some cases, StrictMode should also double-render lifecycles.
              // This can be confusing for tests though,
              // And it can be bad for performance in production.
              // This feature flag can be used to control the behavior:

              // To preserve the "Pause on caught exceptions" behavior of the debugger, we
              // replay the begin phase of a failed component inside invokeGuardedCallback.

              // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:

              // Warn about legacy context API

              // Gather advanced timing metrics for Profiler subtrees.

              // Track which interactions trigger each commit.

              // Only used in www builds.

              // Only used in www builds.

              /**
               * Forked from fbjs/warning:
               * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
               *
               * Only change is we use console.warn instead of console.error,
               * and do nothing when 'console' is not supported.
               * This really simplifies the code.
               * ---
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var lowPriorityWarning = function() {};

              {
                var printWarning = function(format) {
                  for (
                    var _len = arguments.length,
                      args = Array(_len > 1 ? _len - 1 : 0),
                      _key = 1;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 1] = arguments[_key];
                  }

                  var argIndex = 0;
                  var message =
                    'Warning: ' +
                    format.replace(/%s/g, function() {
                      return args[argIndex++];
                    });
                  if (typeof console !== 'undefined') {
                    console.warn(message);
                  }
                  try {
                    // --- Welcome to debugging React ---
                    // This error was thrown as a convenience so that you can use this stack
                    // to find the callsite that caused this warning to fire.
                    throw new Error(message);
                  } catch (x) {}
                };

                lowPriorityWarning = function(condition, format) {
                  if (format === undefined) {
                    throw new Error(
                      '`lowPriorityWarning(condition, format, ...args)` requires a warning ' +
                        'message argument'
                    );
                  }
                  if (!condition) {
                    for (
                      var _len2 = arguments.length,
                        args = Array(_len2 > 2 ? _len2 - 2 : 0),
                        _key2 = 2;
                      _key2 < _len2;
                      _key2++
                    ) {
                      args[_key2 - 2] = arguments[_key2];
                    }

                    printWarning.apply(undefined, [format].concat(args));
                  }
                };
              }

              var lowPriorityWarning$1 = lowPriorityWarning;

              /**
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var warningWithoutStack = function() {};

              {
                warningWithoutStack = function(condition, format) {
                  for (
                    var _len = arguments.length,
                      args = Array(_len > 2 ? _len - 2 : 0),
                      _key = 2;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 2] = arguments[_key];
                  }

                  if (format === undefined) {
                    throw new Error(
                      '`warningWithoutStack(condition, format, ...args)` requires a warning ' +
                        'message argument'
                    );
                  }
                  if (condition) {
                    return;
                  }
                  if (typeof console !== 'undefined') {
                    var _console;

                    var stringArgs = args.map(function(item) {
                      return '' + item;
                    });
                    (_console = console).error.apply(
                      _console,
                      ['Warning: ' + format].concat(stringArgs)
                    );
                  }
                  try {
                    // --- Welcome to debugging React ---
                    // This error was thrown as a convenience so that you can use this stack
                    // to find the callsite that caused this warning to fire.
                    var argIndex = 0;
                    var message =
                      'Warning: ' +
                      format.replace(/%s/g, function() {
                        return args[argIndex++];
                      });
                    throw new Error(message);
                  } catch (x) {}
                };
              }

              var warningWithoutStack$1 = warningWithoutStack;

              var didWarnStateUpdateForUnmountedComponent = {};

              function warnNoop(publicInstance, callerName) {
                {
                  var _constructor = publicInstance.constructor;
                  var componentName =
                    (_constructor &&
                      (_constructor.displayName || _constructor.name)) ||
                    'ReactClass';
                  var warningKey = componentName + '.' + callerName;
                  if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                    return;
                  }
                  warningWithoutStack$1(
                    false,
                    "Can't call %s on a component that is not yet mounted. " +
                      'This is a no-op, but it might indicate a bug in your application. ' +
                      'Instead, assign to `this.state` directly or define a `state = {};` ' +
                      'class property with the desired state in the %s component.',
                    callerName,
                    componentName
                  );
                  didWarnStateUpdateForUnmountedComponent[warningKey] = true;
                }
              }

              /**
               * This is the abstract API for an update queue.
               */
              var ReactNoopUpdateQueue = {
                /**
                 * Checks whether or not this composite component is mounted.
                 * @param {ReactClass} publicInstance The instance we want to test.
                 * @return {boolean} True if mounted, false otherwise.
                 * @protected
                 * @final
                 */
                isMounted: function(publicInstance) {
                  return false;
                },

                /**
                 * Forces an update. This should only be invoked when it is known with
                 * certainty that we are **not** in a DOM transaction.
                 *
                 * You may want to call this when you know that some deeper aspect of the
                 * component's state has changed but `setState` was not called.
                 *
                 * This will not invoke `shouldComponentUpdate`, but it will invoke
                 * `componentWillUpdate` and `componentDidUpdate`.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} callerName name of the calling function in the public API.
                 * @internal
                 */
                enqueueForceUpdate: function(
                  publicInstance,
                  callback,
                  callerName
                ) {
                  warnNoop(publicInstance, 'forceUpdate');
                },

                /**
                 * Replaces all of the state. Always use this or `setState` to mutate state.
                 * You should treat `this.state` as immutable.
                 *
                 * There is no guarantee that `this.state` will be immediately updated, so
                 * accessing `this.state` after calling this method may return the old value.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {object} completeState Next state.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} callerName name of the calling function in the public API.
                 * @internal
                 */
                enqueueReplaceState: function(
                  publicInstance,
                  completeState,
                  callback,
                  callerName
                ) {
                  warnNoop(publicInstance, 'replaceState');
                },

                /**
                 * Sets a subset of the state. This only exists because _pendingState is
                 * internal. This provides a merging strategy that is not available to deep
                 * properties which is confusing. TODO: Expose pendingState or don't use it
                 * during the merge.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {object} partialState Next partial state to be merged with state.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} Name of the calling function in the public API.
                 * @internal
                 */
                enqueueSetState: function(
                  publicInstance,
                  partialState,
                  callback,
                  callerName
                ) {
                  warnNoop(publicInstance, 'setState');
                },
              };

              var emptyObject = {};
              {
                Object.freeze(emptyObject);
              }

              /**
               * Base class helpers for the updating state of a component.
               */
              function Component(props, context, updater) {
                this.props = props;
                this.context = context;
                // If a component has string refs, we will assign a different object later.
                this.refs = emptyObject;
                // We initialize the default updater but the real one gets injected by the
                // renderer.
                this.updater = updater || ReactNoopUpdateQueue;
              }

              Component.prototype.isReactComponent = {};

              /**
               * Sets a subset of the state. Always use this to mutate
               * state. You should treat `this.state` as immutable.
               *
               * There is no guarantee that `this.state` will be immediately updated, so
               * accessing `this.state` after calling this method may return the old value.
               *
               * There is no guarantee that calls to `setState` will run synchronously,
               * as they may eventually be batched together.  You can provide an optional
               * callback that will be executed when the call to setState is actually
               * completed.
               *
               * When a function is provided to setState, it will be called at some point in
               * the future (not synchronously). It will be called with the up to date
               * component arguments (state, props, context). These values can be different
               * from this.* because your function may be called after receiveProps but before
               * shouldComponentUpdate, and this new state, props, and context will not yet be
               * assigned to this.
               *
               * @param {object|function} partialState Next partial state or function to
               *        produce next partial state to be merged with current state.
               * @param {?function} callback Called after state is updated.
               * @final
               * @protected
               */
              Component.prototype.setState = function(partialState, callback) {
                !(
                  typeof partialState === 'object' ||
                  typeof partialState === 'function' ||
                  partialState == null
                )
                  ? invariant(
                      false,
                      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
                    )
                  : void 0;
                this.updater.enqueueSetState(
                  this,
                  partialState,
                  callback,
                  'setState'
                );
              };

              /**
               * Forces an update. This should only be invoked when it is known with
               * certainty that we are **not** in a DOM transaction.
               *
               * You may want to call this when you know that some deeper aspect of the
               * component's state has changed but `setState` was not called.
               *
               * This will not invoke `shouldComponentUpdate`, but it will invoke
               * `componentWillUpdate` and `componentDidUpdate`.
               *
               * @param {?function} callback Called after update is complete.
               * @final
               * @protected
               */
              Component.prototype.forceUpdate = function(callback) {
                this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
              };

              /**
               * Deprecated APIs. These APIs used to exist on classic React classes but since
               * we would like to deprecate them, we're not going to move them over to this
               * modern base class. Instead, we define a getter that warns if it's accessed.
               */
              {
                var deprecatedAPIs = {
                  isMounted: [
                    'isMounted',
                    'Instead, make sure to clean up subscriptions and pending requests in ' +
                      'componentWillUnmount to prevent memory leaks.',
                  ],
                  replaceState: [
                    'replaceState',
                    'Refactor your code to use setState instead (see ' +
                      'https://github.com/facebook/react/issues/3236).',
                  ],
                };
                var defineDeprecationWarning = function(methodName, info) {
                  Object.defineProperty(Component.prototype, methodName, {
                    get: function() {
                      lowPriorityWarning$1(
                        false,
                        '%s(...) is deprecated in plain JavaScript React classes. %s',
                        info[0],
                        info[1]
                      );
                      return undefined;
                    },
                  });
                };
                for (var fnName in deprecatedAPIs) {
                  if (deprecatedAPIs.hasOwnProperty(fnName)) {
                    defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
                  }
                }
              }

              function ComponentDummy() {}
              ComponentDummy.prototype = Component.prototype;

              /**
               * Convenience component with default shallow equality check for sCU.
               */
              function PureComponent(props, context, updater) {
                this.props = props;
                this.context = context;
                // If a component has string refs, we will assign a different object later.
                this.refs = emptyObject;
                this.updater = updater || ReactNoopUpdateQueue;
              }

              var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
              pureComponentPrototype.constructor = PureComponent;
              // Avoid an extra prototype jump for these methods.
              _assign(pureComponentPrototype, Component.prototype);
              pureComponentPrototype.isPureReactComponent = true;

              // an immutable object with a single mutable value
              function createRef() {
                var refObject = {
                  current: null,
                };
                {
                  Object.seal(refObject);
                }
                return refObject;
              }

              /**
               * Keeps track of the current owner.
               *
               * The current owner is the component who should own any components that are
               * currently being constructed.
               */
              var ReactCurrentOwner = {
                /**
                 * @internal
                 * @type {ReactComponent}
                 */
                current: null,
                currentDispatcher: null,
              };

              var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

              var describeComponentFrame = function(name, source, ownerName) {
                var sourceInfo = '';
                if (source) {
                  var path = source.fileName;
                  var fileName = path.replace(BEFORE_SLASH_RE, '');
                  {
                    // In DEV, include code for a common special case:
                    // prefer "folder/index.js" instead of just "index.js".
                    if (/^index\./.test(fileName)) {
                      var match = path.match(BEFORE_SLASH_RE);
                      if (match) {
                        var pathBeforeSlash = match[1];
                        if (pathBeforeSlash) {
                          var folderName = pathBeforeSlash.replace(
                            BEFORE_SLASH_RE,
                            ''
                          );
                          fileName = folderName + '/' + fileName;
                        }
                      }
                    }
                  }
                  sourceInfo =
                    ' (at ' + fileName + ':' + source.lineNumber + ')';
                } else if (ownerName) {
                  sourceInfo = ' (created by ' + ownerName + ')';
                }
                return '\n    in ' + (name || 'Unknown') + sourceInfo;
              };

              var Resolved = 1;

              function refineResolvedThenable(thenable) {
                return thenable._reactStatus === Resolved
                  ? thenable._reactResult
                  : null;
              }

              function getComponentName(type) {
                if (type == null) {
                  // Host root, text node or just invalid type.
                  return null;
                }
                {
                  if (typeof type.tag === 'number') {
                    warningWithoutStack$1(
                      false,
                      'Received an unexpected object in getComponentName(). ' +
                        'This is likely a bug in React. Please file an issue.'
                    );
                  }
                }
                if (typeof type === 'function') {
                  return type.displayName || type.name || null;
                }
                if (typeof type === 'string') {
                  return type;
                }
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                    return 'AsyncMode';
                  case REACT_FRAGMENT_TYPE:
                    return 'Fragment';
                  case REACT_PORTAL_TYPE:
                    return 'Portal';
                  case REACT_PROFILER_TYPE:
                    return 'Profiler';
                  case REACT_STRICT_MODE_TYPE:
                    return 'StrictMode';
                  case REACT_PLACEHOLDER_TYPE:
                    return 'Placeholder';
                }
                if (typeof type === 'object') {
                  switch (type.$$typeof) {
                    case REACT_CONTEXT_TYPE:
                      return 'Context.Consumer';
                    case REACT_PROVIDER_TYPE:
                      return 'Context.Provider';
                    case REACT_FORWARD_REF_TYPE:
                      var renderFn = type.render;
                      var functionName =
                        renderFn.displayName || renderFn.name || '';
                      return functionName !== ''
                        ? 'ForwardRef(' + functionName + ')'
                        : 'ForwardRef';
                  }
                  if (typeof type.then === 'function') {
                    var thenable = type;
                    var resolvedThenable = refineResolvedThenable(thenable);
                    if (resolvedThenable) {
                      return getComponentName(resolvedThenable);
                    }
                  }
                }
                return null;
              }

              var ReactDebugCurrentFrame = {};

              var currentlyValidatingElement = null;

              function setCurrentlyValidatingElement(element) {
                {
                  currentlyValidatingElement = element;
                }
              }

              {
                // Stack implementation injected by the current renderer.
                ReactDebugCurrentFrame.getCurrentStack = null;

                ReactDebugCurrentFrame.getStackAddendum = function() {
                  var stack = '';

                  // Add an extra top frame while an element is being validated
                  if (currentlyValidatingElement) {
                    var name = getComponentName(
                      currentlyValidatingElement.type
                    );
                    var owner = currentlyValidatingElement._owner;
                    stack += describeComponentFrame(
                      name,
                      currentlyValidatingElement._source,
                      owner && getComponentName(owner.type)
                    );
                  }

                  // Delegate to the injected renderer-specific implementation
                  var impl = ReactDebugCurrentFrame.getCurrentStack;
                  if (impl) {
                    stack += impl() || '';
                  }

                  return stack;
                };
              }

              var ReactSharedInternals = {
                ReactCurrentOwner: ReactCurrentOwner,
                // Used by renderers to avoid bundling object-assign twice in UMD bundles:
                assign: _assign,
              };

              {
                _assign(ReactSharedInternals, {
                  // These should not be included in production.
                  ReactDebugCurrentFrame: ReactDebugCurrentFrame,
                  // Shim for React DOM 16.0.0 which still destructured (but not used) this.
                  // TODO: remove in React 17.0.
                  ReactComponentTreeHook: {},
                });
              }

              /**
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var warning = warningWithoutStack$1;

              {
                warning = function(condition, format) {
                  if (condition) {
                    return;
                  }
                  var ReactDebugCurrentFrame =
                    ReactSharedInternals.ReactDebugCurrentFrame;
                  var stack = ReactDebugCurrentFrame.getStackAddendum();
                  // eslint-disable-next-line react-internal/warning-and-invariant-args

                  for (
                    var _len = arguments.length,
                      args = Array(_len > 2 ? _len - 2 : 0),
                      _key = 2;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 2] = arguments[_key];
                  }

                  warningWithoutStack$1.apply(
                    undefined,
                    [false, format + '%s'].concat(args, [stack])
                  );
                };
              }

              var warning$1 = warning;

              var hasOwnProperty = Object.prototype.hasOwnProperty;

              var RESERVED_PROPS = {
                key: true,
                ref: true,
                __self: true,
                __source: true,
              };

              var specialPropKeyWarningShown = void 0;
              var specialPropRefWarningShown = void 0;

              function hasValidRef(config) {
                {
                  if (hasOwnProperty.call(config, 'ref')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'ref')
                      .get;
                    if (getter && getter.isReactWarning) {
                      return false;
                    }
                  }
                }
                return config.ref !== undefined;
              }

              function hasValidKey(config) {
                {
                  if (hasOwnProperty.call(config, 'key')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'key')
                      .get;
                    if (getter && getter.isReactWarning) {
                      return false;
                    }
                  }
                }
                return config.key !== undefined;
              }

              function defineKeyPropWarningGetter(props, displayName) {
                var warnAboutAccessingKey = function() {
                  if (!specialPropKeyWarningShown) {
                    specialPropKeyWarningShown = true;
                    warningWithoutStack$1(
                      false,
                      '%s: `key` is not a prop. Trying to access it will result ' +
                        'in `undefined` being returned. If you need to access the same ' +
                        'value within the child component, you should pass it as a different ' +
                        'prop. (https://fb.me/react-special-props)',
                      displayName
                    );
                  }
                };
                warnAboutAccessingKey.isReactWarning = true;
                Object.defineProperty(props, 'key', {
                  get: warnAboutAccessingKey,
                  configurable: true,
                });
              }

              function defineRefPropWarningGetter(props, displayName) {
                var warnAboutAccessingRef = function() {
                  if (!specialPropRefWarningShown) {
                    specialPropRefWarningShown = true;
                    warningWithoutStack$1(
                      false,
                      '%s: `ref` is not a prop. Trying to access it will result ' +
                        'in `undefined` being returned. If you need to access the same ' +
                        'value within the child component, you should pass it as a different ' +
                        'prop. (https://fb.me/react-special-props)',
                      displayName
                    );
                  }
                };
                warnAboutAccessingRef.isReactWarning = true;
                Object.defineProperty(props, 'ref', {
                  get: warnAboutAccessingRef,
                  configurable: true,
                });
              }

              /**
               * Factory method to create a new React element. This no longer adheres to
               * the class pattern, so do not use new to call it. Also, no instanceof check
               * will work. Instead test $$typeof field against Symbol.for('react.element') to check
               * if something is a React Element.
               *
               * @param {*} type
               * @param {*} key
               * @param {string|object} ref
               * @param {*} self A *temporary* helper to detect places where `this` is
               * different from the `owner` when React.createElement is called, so that we
               * can warn. We want to get rid of owner and replace string `ref`s with arrow
               * functions, and as long as `this` and owner are the same, there will be no
               * change in behavior.
               * @param {*} source An annotation object (added by a transpiler or otherwise)
               * indicating filename, line number, and/or other information.
               * @param {*} owner
               * @param {*} props
               * @internal
               */
              var ReactElement = function(
                type,
                key,
                ref,
                self,
                source,
                owner,
                props
              ) {
                var element = {
                  // This tag allows us to uniquely identify this as a React Element
                  $$typeof: REACT_ELEMENT_TYPE,

                  // Built-in properties that belong on the element
                  type: type,
                  key: key,
                  ref: ref,
                  props: props,

                  // Record the component responsible for creating this element.
                  _owner: owner,
                };

                {
                  // The validation flag is currently mutative. We put it on
                  // an external backing store so that we can freeze the whole object.
                  // This can be replaced with a WeakMap once they are implemented in
                  // commonly used development environments.
                  element._store = {};

                  // To make comparing ReactElements easier for testing purposes, we make
                  // the validation flag non-enumerable (where possible, which should
                  // include every environment we run tests in), so the test framework
                  // ignores it.
                  Object.defineProperty(element._store, 'validated', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: false,
                  });
                  // self and source are DEV only properties.
                  Object.defineProperty(element, '_self', {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: self,
                  });
                  // Two elements created in two different places should be considered
                  // equal for testing purposes and therefore we hide it from enumeration.
                  Object.defineProperty(element, '_source', {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: source,
                  });
                  if (Object.freeze) {
                    Object.freeze(element.props);
                    Object.freeze(element);
                  }
                }

                return element;
              };

              /**
               * Create and return a new ReactElement of the given type.
               * See https://reactjs.org/docs/react-api.html#createelement
               */
              function createElement(type, config, children) {
                var propName = void 0;

                // Reserved names are extracted
                var props = {};

                var key = null;
                var ref = null;
                var self = null;
                var source = null;

                if (config != null) {
                  if (hasValidRef(config)) {
                    ref = config.ref;
                  }
                  if (hasValidKey(config)) {
                    key = '' + config.key;
                  }

                  self = config.__self === undefined ? null : config.__self;
                  source =
                    config.__source === undefined ? null : config.__source;
                  // Remaining properties are added to a new props object
                  for (propName in config) {
                    if (
                      hasOwnProperty.call(config, propName) &&
                      !RESERVED_PROPS.hasOwnProperty(propName)
                    ) {
                      props[propName] = config[propName];
                    }
                  }
                }

                // Children can be more than one argument, and those are transferred onto
                // the newly allocated props object.
                var childrenLength = arguments.length - 2;
                if (childrenLength === 1) {
                  props.children = children;
                } else if (childrenLength > 1) {
                  var childArray = Array(childrenLength);
                  for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                  }
                  {
                    if (Object.freeze) {
                      Object.freeze(childArray);
                    }
                  }
                  props.children = childArray;
                }

                // Resolve default props
                if (type && type.defaultProps) {
                  var defaultProps = type.defaultProps;
                  for (propName in defaultProps) {
                    if (props[propName] === undefined) {
                      props[propName] = defaultProps[propName];
                    }
                  }
                }
                {
                  if (key || ref) {
                    var displayName =
                      typeof type === 'function'
                        ? type.displayName || type.name || 'Unknown'
                        : type;
                    if (key) {
                      defineKeyPropWarningGetter(props, displayName);
                    }
                    if (ref) {
                      defineRefPropWarningGetter(props, displayName);
                    }
                  }
                }
                return ReactElement(
                  type,
                  key,
                  ref,
                  self,
                  source,
                  ReactCurrentOwner.current,
                  props
                );
              }

              /**
               * Return a function that produces ReactElements of a given type.
               * See https://reactjs.org/docs/react-api.html#createfactory
               */

              function cloneAndReplaceKey(oldElement, newKey) {
                var newElement = ReactElement(
                  oldElement.type,
                  newKey,
                  oldElement.ref,
                  oldElement._self,
                  oldElement._source,
                  oldElement._owner,
                  oldElement.props
                );

                return newElement;
              }

              /**
               * Clone and return a new ReactElement using element as the starting point.
               * See https://reactjs.org/docs/react-api.html#cloneelement
               */
              function cloneElement(element, config, children) {
                !!(element === null || element === undefined)
                  ? invariant(
                      false,
                      'React.cloneElement(...): The argument must be a React element, but you passed %s.',
                      element
                    )
                  : void 0;

                var propName = void 0;

                // Original props are copied
                var props = _assign({}, element.props);

                // Reserved names are extracted
                var key = element.key;
                var ref = element.ref;
                // Self is preserved since the owner is preserved.
                var self = element._self;
                // Source is preserved since cloneElement is unlikely to be targeted by a
                // transpiler, and the original source is probably a better indicator of the
                // true owner.
                var source = element._source;

                // Owner will be preserved, unless ref is overridden
                var owner = element._owner;

                if (config != null) {
                  if (hasValidRef(config)) {
                    // Silently steal the ref from the parent.
                    ref = config.ref;
                    owner = ReactCurrentOwner.current;
                  }
                  if (hasValidKey(config)) {
                    key = '' + config.key;
                  }

                  // Remaining properties override existing props
                  var defaultProps = void 0;
                  if (element.type && element.type.defaultProps) {
                    defaultProps = element.type.defaultProps;
                  }
                  for (propName in config) {
                    if (
                      hasOwnProperty.call(config, propName) &&
                      !RESERVED_PROPS.hasOwnProperty(propName)
                    ) {
                      if (
                        config[propName] === undefined &&
                        defaultProps !== undefined
                      ) {
                        // Resolve default props
                        props[propName] = defaultProps[propName];
                      } else {
                        props[propName] = config[propName];
                      }
                    }
                  }
                }

                // Children can be more than one argument, and those are transferred onto
                // the newly allocated props object.
                var childrenLength = arguments.length - 2;
                if (childrenLength === 1) {
                  props.children = children;
                } else if (childrenLength > 1) {
                  var childArray = Array(childrenLength);
                  for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                  }
                  props.children = childArray;
                }

                return ReactElement(
                  element.type,
                  key,
                  ref,
                  self,
                  source,
                  owner,
                  props
                );
              }

              /**
               * Verifies the object is a ReactElement.
               * See https://reactjs.org/docs/react-api.html#isvalidelement
               * @param {?object} object
               * @return {boolean} True if `object` is a ReactElement.
               * @final
               */
              function isValidElement(object) {
                return (
                  typeof object === 'object' &&
                  object !== null &&
                  object.$$typeof === REACT_ELEMENT_TYPE
                );
              }

              var SEPARATOR = '.';
              var SUBSEPARATOR = ':';

              /**
               * Escape and wrap key so it is safe to use as a reactid
               *
               * @param {string} key to be escaped.
               * @return {string} the escaped key.
               */
              function escape(key) {
                var escapeRegex = /[=:]/g;
                var escaperLookup = {
                  '=': '=0',
                  ':': '=2',
                };
                var escapedString = ('' + key).replace(escapeRegex, function(
                  match
                ) {
                  return escaperLookup[match];
                });

                return '$' + escapedString;
              }

              /**
               * TODO: Test that a single child and an array with one item have the same key
               * pattern.
               */

              var didWarnAboutMaps = false;

              var userProvidedKeyEscapeRegex = /\/+/g;
              function escapeUserProvidedKey(text) {
                return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
              }

              var POOL_SIZE = 10;
              var traverseContextPool = [];
              function getPooledTraverseContext(
                mapResult,
                keyPrefix,
                mapFunction,
                mapContext
              ) {
                if (traverseContextPool.length) {
                  var traverseContext = traverseContextPool.pop();
                  traverseContext.result = mapResult;
                  traverseContext.keyPrefix = keyPrefix;
                  traverseContext.func = mapFunction;
                  traverseContext.context = mapContext;
                  traverseContext.count = 0;
                  return traverseContext;
                } else {
                  return {
                    result: mapResult,
                    keyPrefix: keyPrefix,
                    func: mapFunction,
                    context: mapContext,
                    count: 0,
                  };
                }
              }

              function releaseTraverseContext(traverseContext) {
                traverseContext.result = null;
                traverseContext.keyPrefix = null;
                traverseContext.func = null;
                traverseContext.context = null;
                traverseContext.count = 0;
                if (traverseContextPool.length < POOL_SIZE) {
                  traverseContextPool.push(traverseContext);
                }
              }

              /**
               * @param {?*} children Children tree container.
               * @param {!string} nameSoFar Name of the key path so far.
               * @param {!function} callback Callback to invoke with each child found.
               * @param {?*} traverseContext Used to pass information throughout the traversal
               * process.
               * @return {!number} The number of children in this subtree.
               */
              function traverseAllChildrenImpl(
                children,
                nameSoFar,
                callback,
                traverseContext
              ) {
                var type = typeof children;

                if (type === 'undefined' || type === 'boolean') {
                  // All of the above are perceived as null.
                  children = null;
                }

                var invokeCallback = false;

                if (children === null) {
                  invokeCallback = true;
                } else {
                  switch (type) {
                    case 'string':
                    case 'number':
                      invokeCallback = true;
                      break;
                    case 'object':
                      switch (children.$$typeof) {
                        case REACT_ELEMENT_TYPE:
                        case REACT_PORTAL_TYPE:
                          invokeCallback = true;
                      }
                  }
                }

                if (invokeCallback) {
                  callback(
                    traverseContext,
                    children,
                    // If it's the only child, treat the name as if it was wrapped in an array
                    // so that it's consistent if the number of children grows.
                    nameSoFar === ''
                      ? SEPARATOR + getComponentKey(children, 0)
                      : nameSoFar
                  );
                  return 1;
                }

                var child = void 0;
                var nextName = void 0;
                var subtreeCount = 0; // Count of children found in the current subtree.
                var nextNamePrefix =
                  nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

                if (Array.isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    nextName = nextNamePrefix + getComponentKey(child, i);
                    subtreeCount += traverseAllChildrenImpl(
                      child,
                      nextName,
                      callback,
                      traverseContext
                    );
                  }
                } else {
                  var iteratorFn = getIteratorFn(children);
                  if (typeof iteratorFn === 'function') {
                    {
                      // Warn about using Maps as children
                      if (iteratorFn === children.entries) {
                        !didWarnAboutMaps
                          ? warning$1(
                              false,
                              'Using Maps as children is unsupported and will likely yield ' +
                                'unexpected results. Convert it to a sequence/iterable of keyed ' +
                                'ReactElements instead.'
                            )
                          : void 0;
                        didWarnAboutMaps = true;
                      }
                    }

                    var iterator = iteratorFn.call(children);
                    var step = void 0;
                    var ii = 0;
                    while (!(step = iterator.next()).done) {
                      child = step.value;
                      nextName = nextNamePrefix + getComponentKey(child, ii++);
                      subtreeCount += traverseAllChildrenImpl(
                        child,
                        nextName,
                        callback,
                        traverseContext
                      );
                    }
                  } else if (type === 'object') {
                    var addendum = '';
                    {
                      addendum =
                        ' If you meant to render a collection of children, use an array ' +
                        'instead.' +
                        ReactDebugCurrentFrame.getStackAddendum();
                    }
                    var childrenString = '' + children;
                    invariant(
                      false,
                      'Objects are not valid as a React child (found: %s).%s',
                      childrenString === '[object Object]'
                        ? 'object with keys {' +
                          Object.keys(children).join(', ') +
                          '}'
                        : childrenString,
                      addendum
                    );
                  }
                }

                return subtreeCount;
              }

              /**
               * Traverses children that are typically specified as `props.children`, but
               * might also be specified through attributes:
               *
               * - `traverseAllChildren(this.props.children, ...)`
               * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
               *
               * The `traverseContext` is an optional argument that is passed through the
               * entire traversal. It can be used to store accumulations or anything else that
               * the callback might find relevant.
               *
               * @param {?*} children Children tree object.
               * @param {!function} callback To invoke upon traversing each child.
               * @param {?*} traverseContext Context for traversal.
               * @return {!number} The number of children in this subtree.
               */
              function traverseAllChildren(
                children,
                callback,
                traverseContext
              ) {
                if (children == null) {
                  return 0;
                }

                return traverseAllChildrenImpl(
                  children,
                  '',
                  callback,
                  traverseContext
                );
              }

              /**
               * Generate a key string that identifies a component within a set.
               *
               * @param {*} component A component that could contain a manual key.
               * @param {number} index Index that is used if a manual key is not provided.
               * @return {string}
               */
              function getComponentKey(component, index) {
                // Do some typechecking here since we call this blindly. We want to ensure
                // that we don't block potential future ES APIs.
                if (
                  typeof component === 'object' &&
                  component !== null &&
                  component.key != null
                ) {
                  // Explicit key
                  return escape(component.key);
                }
                // Implicit key determined by the index in the set
                return index.toString(36);
              }

              function forEachSingleChild(bookKeeping, child, name) {
                var func = bookKeeping.func,
                  context = bookKeeping.context;

                func.call(context, child, bookKeeping.count++);
              }

              /**
               * Iterates through children that are typically specified as `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
               *
               * The provided forEachFunc(child, index) will be called for each
               * leaf child.
               *
               * @param {?*} children Children tree container.
               * @param {function(*, int)} forEachFunc
               * @param {*} forEachContext Context for forEachContext.
               */
              function forEachChildren(children, forEachFunc, forEachContext) {
                if (children == null) {
                  return children;
                }
                var traverseContext = getPooledTraverseContext(
                  null,
                  null,
                  forEachFunc,
                  forEachContext
                );
                traverseAllChildren(
                  children,
                  forEachSingleChild,
                  traverseContext
                );
                releaseTraverseContext(traverseContext);
              }

              function mapSingleChildIntoContext(bookKeeping, child, childKey) {
                var result = bookKeeping.result,
                  keyPrefix = bookKeeping.keyPrefix,
                  func = bookKeeping.func,
                  context = bookKeeping.context;

                var mappedChild = func.call(
                  context,
                  child,
                  bookKeeping.count++
                );
                if (Array.isArray(mappedChild)) {
                  mapIntoWithKeyPrefixInternal(
                    mappedChild,
                    result,
                    childKey,
                    function(c) {
                      return c;
                    }
                  );
                } else if (mappedChild != null) {
                  if (isValidElement(mappedChild)) {
                    mappedChild = cloneAndReplaceKey(
                      mappedChild,
                      // Keep both the (mapped) and old keys if they differ, just as
                      // traverseAllChildren used to do for objects as children
                      keyPrefix +
                        (mappedChild.key &&
                        (!child || child.key !== mappedChild.key)
                          ? escapeUserProvidedKey(mappedChild.key) + '/'
                          : '') +
                        childKey
                    );
                  }
                  result.push(mappedChild);
                }
              }

              function mapIntoWithKeyPrefixInternal(
                children,
                array,
                prefix,
                func,
                context
              ) {
                var escapedPrefix = '';
                if (prefix != null) {
                  escapedPrefix = escapeUserProvidedKey(prefix) + '/';
                }
                var traverseContext = getPooledTraverseContext(
                  array,
                  escapedPrefix,
                  func,
                  context
                );
                traverseAllChildren(
                  children,
                  mapSingleChildIntoContext,
                  traverseContext
                );
                releaseTraverseContext(traverseContext);
              }

              /**
               * Maps children that are typically specified as `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenmap
               *
               * The provided mapFunction(child, key, index) will be called for each
               * leaf child.
               *
               * @param {?*} children Children tree container.
               * @param {function(*, int)} func The map function.
               * @param {*} context Context for mapFunction.
               * @return {object} Object containing the ordered map of results.
               */
              function mapChildren(children, func, context) {
                if (children == null) {
                  return children;
                }
                var result = [];
                mapIntoWithKeyPrefixInternal(
                  children,
                  result,
                  null,
                  func,
                  context
                );
                return result;
              }

              /**
               * Count the number of children that are typically specified as
               * `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrencount
               *
               * @param {?*} children Children tree container.
               * @return {number} The number of children.
               */
              function countChildren(children) {
                return traverseAllChildren(
                  children,
                  function() {
                    return null;
                  },
                  null
                );
              }

              /**
               * Flatten a children object (typically specified as `props.children`) and
               * return an array with appropriately re-keyed children.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
               */
              function toArray(children) {
                var result = [];
                mapIntoWithKeyPrefixInternal(children, result, null, function(
                  child
                ) {
                  return child;
                });
                return result;
              }

              /**
               * Returns the first child in a collection of children and verifies that there
               * is only one child in the collection.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenonly
               *
               * The current implementation of this function assumes that a single child gets
               * passed without a wrapper, but the purpose of this helper function is to
               * abstract away the particular structure of children.
               *
               * @param {?object} children Child collection structure.
               * @return {ReactElement} The first and only `ReactElement` contained in the
               * structure.
               */
              function onlyChild(children) {
                !isValidElement(children)
                  ? invariant(
                      false,
                      'React.Children.only expected to receive a single React element child.'
                    )
                  : void 0;
                return children;
              }

              function readContext(context, observedBits) {
                var dispatcher = ReactCurrentOwner.currentDispatcher;
                !(dispatcher !== null)
                  ? invariant(
                      false,
                      'Context.unstable_read(): Context can only be read while React is rendering, e.g. inside the render method or getDerivedStateFromProps.'
                    )
                  : void 0;
                return dispatcher.readContext(context, observedBits);
              }

              function createContext(defaultValue, calculateChangedBits) {
                if (calculateChangedBits === undefined) {
                  calculateChangedBits = null;
                } else {
                  {
                    !(
                      calculateChangedBits === null ||
                      typeof calculateChangedBits === 'function'
                    )
                      ? warningWithoutStack$1(
                          false,
                          'createContext: Expected the optional second argument to be a ' +
                            'function. Instead received: %s',
                          calculateChangedBits
                        )
                      : void 0;
                  }
                }

                var context = {
                  $$typeof: REACT_CONTEXT_TYPE,
                  _calculateChangedBits: calculateChangedBits,
                  // As a workaround to support multiple concurrent renderers, we categorize
                  // some renderers as primary and others as secondary. We only expect
                  // there to be two concurrent renderers at most: React Native (primary) and
                  // Fabric (secondary); React DOM (primary) and React ART (secondary).
                  // Secondary renderers store their context values on separate fields.
                  _currentValue: defaultValue,
                  _currentValue2: defaultValue,
                  // These are circular
                  Provider: null,
                  Consumer: null,
                  unstable_read: null,
                };

                context.Provider = {
                  $$typeof: REACT_PROVIDER_TYPE,
                  _context: context,
                };
                context.Consumer = context;
                context.unstable_read = readContext.bind(null, context);

                {
                  context._currentRenderer = null;
                  context._currentRenderer2 = null;
                }

                return context;
              }

              function lazy(ctor) {
                var thenable = null;
                return {
                  then: function(resolve, reject) {
                    if (thenable === null) {
                      // Lazily create thenable by wrapping in an extra thenable.
                      thenable = ctor();
                      ctor = null;
                    }
                    return thenable.then(resolve, reject);
                  },

                  // React uses these fields to store the result.
                  _reactStatus: -1,
                  _reactResult: null,
                };
              }

              function forwardRef(render) {
                {
                  if (typeof render !== 'function') {
                    warningWithoutStack$1(
                      false,
                      'forwardRef requires a render function but was given %s.',
                      render === null ? 'null' : typeof render
                    );
                  } else {
                    !(render.length === 2)
                      ? warningWithoutStack$1(
                          false,
                          'forwardRef render functions accept two parameters: props and ref. ' +
                            'Did you forget to use the ref parameter?'
                        )
                      : void 0;
                  }

                  if (render != null) {
                    !(render.defaultProps == null && render.propTypes == null)
                      ? warningWithoutStack$1(
                          false,
                          'forwardRef render functions do not support propTypes or defaultProps. ' +
                            'Did you accidentally pass a React component?'
                        )
                      : void 0;
                  }
                }

                return {
                  $$typeof: REACT_FORWARD_REF_TYPE,
                  render: render,
                };
              }

              function isValidElementType(type) {
                return (
                  typeof type === 'string' ||
                  typeof type === 'function' ||
                  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                  type === REACT_FRAGMENT_TYPE ||
                  type === REACT_ASYNC_MODE_TYPE ||
                  type === REACT_PROFILER_TYPE ||
                  type === REACT_STRICT_MODE_TYPE ||
                  type === REACT_PLACEHOLDER_TYPE ||
                  (typeof type === 'object' &&
                    type !== null &&
                    (typeof type.then === 'function' ||
                      type.$$typeof === REACT_PROVIDER_TYPE ||
                      type.$$typeof === REACT_CONTEXT_TYPE ||
                      type.$$typeof === REACT_FORWARD_REF_TYPE))
                );
              }

              /**
               * ReactElementValidator provides a wrapper around a element factory
               * which validates the props passed to the element. This is intended to be
               * used only in DEV and could be replaced by a static type checker for languages
               * that support it.
               */

              var propTypesMisspellWarningShown = void 0;

              {
                propTypesMisspellWarningShown = false;
              }

              function getDeclarationErrorAddendum() {
                if (ReactCurrentOwner.current) {
                  var name = getComponentName(ReactCurrentOwner.current.type);
                  if (name) {
                    return '\n\nCheck the render method of `' + name + '`.';
                  }
                }
                return '';
              }

              function getSourceInfoErrorAddendum(elementProps) {
                if (
                  elementProps !== null &&
                  elementProps !== undefined &&
                  elementProps.__source !== undefined
                ) {
                  var source = elementProps.__source;
                  var fileName = source.fileName.replace(/^.*[\\\/]/, '');
                  var lineNumber = source.lineNumber;
                  return (
                    '\n\nCheck your code at ' +
                    fileName +
                    ':' +
                    lineNumber +
                    '.'
                  );
                }
                return '';
              }

              /**
               * Warn if there's no key explicitly set on dynamic arrays of children or
               * object keys are not valid. This allows us to keep track of children between
               * updates.
               */
              var ownerHasKeyUseWarning = {};

              function getCurrentComponentErrorInfo(parentType) {
                var info = getDeclarationErrorAddendum();

                if (!info) {
                  var parentName =
                    typeof parentType === 'string'
                      ? parentType
                      : parentType.displayName || parentType.name;
                  if (parentName) {
                    info =
                      '\n\nCheck the top-level render call using <' +
                      parentName +
                      '>.';
                  }
                }
                return info;
              }

              /**
               * Warn if the element doesn't have an explicit key assigned to it.
               * This element is in an array. The array could grow and shrink or be
               * reordered. All children that haven't already been validated are required to
               * have a "key" property assigned to it. Error statuses are cached so a warning
               * will only be shown once.
               *
               * @internal
               * @param {ReactElement} element Element that requires a key.
               * @param {*} parentType element's parent's type.
               */
              function validateExplicitKey(element, parentType) {
                if (
                  !element._store ||
                  element._store.validated ||
                  element.key != null
                ) {
                  return;
                }
                element._store.validated = true;

                var currentComponentErrorInfo = getCurrentComponentErrorInfo(
                  parentType
                );
                if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                  return;
                }
                ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

                // Usually the current owner is the offender, but if it accepts children as a
                // property, it may be the creator of the child that's responsible for
                // assigning it a key.
                var childOwner = '';
                if (
                  element &&
                  element._owner &&
                  element._owner !== ReactCurrentOwner.current
                ) {
                  // Give the component that originally created this child.
                  childOwner =
                    ' It was passed a child from ' +
                    getComponentName(element._owner.type) +
                    '.';
                }

                setCurrentlyValidatingElement(element);
                {
                  warning$1(
                    false,
                    'Each child in an array or iterator should have a unique "key" prop.' +
                      '%s%s See https://fb.me/react-warning-keys for more information.',
                    currentComponentErrorInfo,
                    childOwner
                  );
                }
                setCurrentlyValidatingElement(null);
              }

              /**
               * Ensure that every element either is passed in a static location, in an
               * array with an explicit keys property defined, or in an object literal
               * with valid key property.
               *
               * @internal
               * @param {ReactNode} node Statically passed child of any type.
               * @param {*} parentType node's parent's type.
               */
              function validateChildKeys(node, parentType) {
                if (typeof node !== 'object') {
                  return;
                }
                if (Array.isArray(node)) {
                  for (var i = 0; i < node.length; i++) {
                    var child = node[i];
                    if (isValidElement(child)) {
                      validateExplicitKey(child, parentType);
                    }
                  }
                } else if (isValidElement(node)) {
                  // This element was passed in a valid location.
                  if (node._store) {
                    node._store.validated = true;
                  }
                } else if (node) {
                  var iteratorFn = getIteratorFn(node);
                  if (typeof iteratorFn === 'function') {
                    // Entry iterators used to provide implicit keys,
                    // but now we print a separate warning for them later.
                    if (iteratorFn !== node.entries) {
                      var iterator = iteratorFn.call(node);
                      var step = void 0;
                      while (!(step = iterator.next()).done) {
                        if (isValidElement(step.value)) {
                          validateExplicitKey(step.value, parentType);
                        }
                      }
                    }
                  }
                }
              }

              /**
               * Given an element, validate that its props follow the propTypes definition,
               * provided by the type.
               *
               * @param {ReactElement} element
               */
              function validatePropTypes(element) {
                var type = element.type;
                var name = void 0,
                  propTypes = void 0;
                if (typeof type === 'function') {
                  // Class or functional component
                  name = type.displayName || type.name;
                  propTypes = type.propTypes;
                } else if (
                  typeof type === 'object' &&
                  type !== null &&
                  type.$$typeof === REACT_FORWARD_REF_TYPE
                ) {
                  // ForwardRef
                  var functionName =
                    type.render.displayName || type.render.name || '';
                  name =
                    functionName !== ''
                      ? 'ForwardRef(' + functionName + ')'
                      : 'ForwardRef';
                  propTypes = type.propTypes;
                } else {
                  return;
                }
                if (propTypes) {
                  setCurrentlyValidatingElement(element);
                  checkPropTypes(
                    propTypes,
                    element.props,
                    'prop',
                    name,
                    ReactDebugCurrentFrame.getStackAddendum
                  );
                  setCurrentlyValidatingElement(null);
                } else if (
                  type.PropTypes !== undefined &&
                  !propTypesMisspellWarningShown
                ) {
                  propTypesMisspellWarningShown = true;
                  warningWithoutStack$1(
                    false,
                    'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
                    name || 'Unknown'
                  );
                }
                if (typeof type.getDefaultProps === 'function') {
                  !type.getDefaultProps.isReactClassApproved
                    ? warningWithoutStack$1(
                        false,
                        'getDefaultProps is only used on classic React.createClass ' +
                          'definitions. Use a static property named `defaultProps` instead.'
                      )
                    : void 0;
                }
              }

              /**
               * Given a fragment, validate that it can only be provided with fragment props
               * @param {ReactElement} fragment
               */
              function validateFragmentProps(fragment) {
                setCurrentlyValidatingElement(fragment);

                var keys = Object.keys(fragment.props);
                for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  if (key !== 'children' && key !== 'key') {
                    warning$1(
                      false,
                      'Invalid prop `%s` supplied to `React.Fragment`. ' +
                        'React.Fragment can only have `key` and `children` props.',
                      key
                    );
                    break;
                  }
                }

                if (fragment.ref !== null) {
                  warning$1(
                    false,
                    'Invalid attribute `ref` supplied to `React.Fragment`.'
                  );
                }

                setCurrentlyValidatingElement(null);
              }

              function createElementWithValidation(type, props, children) {
                var validType = isValidElementType(type);

                // We warn in this case but don't throw. We expect the element creation to
                // succeed and there will likely be errors in render.
                if (!validType) {
                  var info = '';
                  if (
                    type === undefined ||
                    (typeof type === 'object' &&
                      type !== null &&
                      Object.keys(type).length === 0)
                  ) {
                    info +=
                      ' You likely forgot to export your component from the file ' +
                      "it's defined in, or you might have mixed up default and named imports.";
                  }

                  var sourceInfo = getSourceInfoErrorAddendum(props);
                  if (sourceInfo) {
                    info += sourceInfo;
                  } else {
                    info += getDeclarationErrorAddendum();
                  }

                  var typeString = void 0;
                  if (type === null) {
                    typeString = 'null';
                  } else if (Array.isArray(type)) {
                    typeString = 'array';
                  } else if (
                    type !== undefined &&
                    type.$$typeof === REACT_ELEMENT_TYPE
                  ) {
                    typeString =
                      '<' + (getComponentName(type.type) || 'Unknown') + ' />';
                    info =
                      ' Did you accidentally export a JSX literal instead of a component?';
                  } else {
                    typeString = typeof type;
                  }

                  warning$1(
                    false,
                    'React.createElement: type is invalid -- expected a string (for ' +
                      'built-in components) or a class/function (for composite ' +
                      'components) but got: %s.%s',
                    typeString,
                    info
                  );
                }

                var element = createElement.apply(this, arguments);

                // The result can be nullish if a mock or a custom function is used.
                // TODO: Drop this when these are no longer allowed as the type argument.
                if (element == null) {
                  return element;
                }

                // Skip key warning if the type isn't valid since our key validation logic
                // doesn't expect a non-string/function type and can throw confusing errors.
                // We don't want exception behavior to differ between dev and prod.
                // (Rendering will throw with a helpful message and as soon as the type is
                // fixed, the key warnings will appear.)
                if (validType) {
                  for (var i = 2; i < arguments.length; i++) {
                    validateChildKeys(arguments[i], type);
                  }
                }

                if (type === REACT_FRAGMENT_TYPE) {
                  validateFragmentProps(element);
                } else {
                  validatePropTypes(element);
                }

                return element;
              }

              function createFactoryWithValidation(type) {
                var validatedFactory = createElementWithValidation.bind(
                  null,
                  type
                );
                validatedFactory.type = type;
                // Legacy hook: remove it
                {
                  Object.defineProperty(validatedFactory, 'type', {
                    enumerable: false,
                    get: function() {
                      lowPriorityWarning$1(
                        false,
                        'Factory.type is deprecated. Access the class directly ' +
                          'before passing it to createFactory.'
                      );
                      Object.defineProperty(this, 'type', {
                        value: type,
                      });
                      return type;
                    },
                  });
                }

                return validatedFactory;
              }

              function cloneElementWithValidation(element, props, children) {
                var newElement = cloneElement.apply(this, arguments);
                for (var i = 2; i < arguments.length; i++) {
                  validateChildKeys(arguments[i], newElement.type);
                }
                validatePropTypes(newElement);
                return newElement;
              }

              var React = {
                Children: {
                  map: mapChildren,
                  forEach: forEachChildren,
                  count: countChildren,
                  toArray: toArray,
                  only: onlyChild,
                },

                createRef: createRef,
                Component: Component,
                PureComponent: PureComponent,

                createContext: createContext,
                forwardRef: forwardRef,

                Fragment: REACT_FRAGMENT_TYPE,
                StrictMode: REACT_STRICT_MODE_TYPE,
                unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
                unstable_Profiler: REACT_PROFILER_TYPE,

                createElement: createElementWithValidation,
                cloneElement: cloneElementWithValidation,
                createFactory: createFactoryWithValidation,
                isValidElement: isValidElement,

                version: ReactVersion,

                __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
              };

              if (enableSuspense) {
                React.Placeholder = REACT_PLACEHOLDER_TYPE;
                React.lazy = lazy;
              }

              var React$2 = Object.freeze({
                default: React,
              });

              var React$3 = (React$2 && React) || React$2;

              // TODO: decide on the top-level export form.
              // This is hacky but makes it work with both Rollup and Jest.
              var react = React$3.default || React$3;

              module.exports = react;
            })();
          }
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/react/cjs/react.development.js',
          '/node_modules/react/cjs'
        ));
      },
      {
        _process: 7,
        buffer: 4,
        'object-assign': 6,
        'prop-types/checkPropTypes': 8,
        timers: 13,
      },
    ],
    11: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          /** @license React v16.5.0
           * react.production.min.js
           *
           * Copyright (c) 2013-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          'use strict';
          var m = require('object-assign'),
            n = 'function' === typeof Symbol && Symbol.for,
            p = n ? Symbol.for('react.element') : 60103,
            q = n ? Symbol.for('react.portal') : 60106,
            r = n ? Symbol.for('react.fragment') : 60107,
            t = n ? Symbol.for('react.strict_mode') : 60108,
            u = n ? Symbol.for('react.profiler') : 60114,
            v = n ? Symbol.for('react.provider') : 60109,
            w = n ? Symbol.for('react.context') : 60110,
            x = n ? Symbol.for('react.async_mode') : 60111,
            y = n ? Symbol.for('react.forward_ref') : 60112;
          n && Symbol.for('react.placeholder');
          var z = 'function' === typeof Symbol && Symbol.iterator;
          function A(a, b, d, c, e, g, h, f) {
            if (!a) {
              a = void 0;
              if (void 0 === b)
                a = Error(
                  'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
                );
              else {
                var k = [d, c, e, g, h, f],
                  l = 0;
                a = Error(
                  b.replace(/%s/g, function() {
                    return k[l++];
                  })
                );
                a.name = 'Invariant Violation';
              }
              a.framesToPop = 1;
              throw a;
            }
          }
          function B(a) {
            for (
              var b = arguments.length - 1,
                d =
                  'https://reactjs.org/docs/error-decoder.html?invariant=' + a,
                c = 0;
              c < b;
              c++
            )
              d += '&args[]=' + encodeURIComponent(arguments[c + 1]);
            A(
              !1,
              'Minified React error #' +
                a +
                '; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ',
              d
            );
          }
          var C = {
              isMounted: function() {
                return !1;
              },
              enqueueForceUpdate: function() {},
              enqueueReplaceState: function() {},
              enqueueSetState: function() {},
            },
            D = {};
          function E(a, b, d) {
            this.props = a;
            this.context = b;
            this.refs = D;
            this.updater = d || C;
          }
          E.prototype.isReactComponent = {};
          E.prototype.setState = function(a, b) {
            'object' !== typeof a && 'function' !== typeof a && null != a
              ? B('85')
              : void 0;
            this.updater.enqueueSetState(this, a, b, 'setState');
          };
          E.prototype.forceUpdate = function(a) {
            this.updater.enqueueForceUpdate(this, a, 'forceUpdate');
          };
          function F() {}
          F.prototype = E.prototype;
          function G(a, b, d) {
            this.props = a;
            this.context = b;
            this.refs = D;
            this.updater = d || C;
          }
          var H = (G.prototype = new F());
          H.constructor = G;
          m(H, E.prototype);
          H.isPureReactComponent = !0;
          var I = { current: null, currentDispatcher: null },
            J = Object.prototype.hasOwnProperty,
            K = { key: !0, ref: !0, __self: !0, __source: !0 };
          function L(a, b, d) {
            var c = void 0,
              e = {},
              g = null,
              h = null;
            if (null != b)
              for (c in (void 0 !== b.ref && (h = b.ref),
              void 0 !== b.key && (g = '' + b.key),
              b))
                J.call(b, c) && !K.hasOwnProperty(c) && (e[c] = b[c]);
            var f = arguments.length - 2;
            if (1 === f) e.children = d;
            else if (1 < f) {
              for (var k = Array(f), l = 0; l < f; l++) k[l] = arguments[l + 2];
              e.children = k;
            }
            if (a && a.defaultProps)
              for (c in ((f = a.defaultProps), f))
                void 0 === e[c] && (e[c] = f[c]);
            return {
              $$typeof: p,
              type: a,
              key: g,
              ref: h,
              props: e,
              _owner: I.current,
            };
          }
          function M(a, b) {
            return {
              $$typeof: p,
              type: a.type,
              key: b,
              ref: a.ref,
              props: a.props,
              _owner: a._owner,
            };
          }
          function N(a) {
            return 'object' === typeof a && null !== a && a.$$typeof === p;
          }
          function escape(a) {
            var b = { '=': '=0', ':': '=2' };
            return (
              '$' +
              ('' + a).replace(/[=:]/g, function(a) {
                return b[a];
              })
            );
          }
          var O = /\/+/g,
            P = [];
          function Q(a, b, d, c) {
            if (P.length) {
              var e = P.pop();
              e.result = a;
              e.keyPrefix = b;
              e.func = d;
              e.context = c;
              e.count = 0;
              return e;
            }
            return { result: a, keyPrefix: b, func: d, context: c, count: 0 };
          }
          function R(a) {
            a.result = null;
            a.keyPrefix = null;
            a.func = null;
            a.context = null;
            a.count = 0;
            10 > P.length && P.push(a);
          }
          function S(a, b, d, c) {
            var e = typeof a;
            if ('undefined' === e || 'boolean' === e) a = null;
            var g = !1;
            if (null === a) g = !0;
            else
              switch (e) {
                case 'string':
                case 'number':
                  g = !0;
                  break;
                case 'object':
                  switch (a.$$typeof) {
                    case p:
                    case q:
                      g = !0;
                  }
              }
            if (g) return d(c, a, '' === b ? '.' + T(a, 0) : b), 1;
            g = 0;
            b = '' === b ? '.' : b + ':';
            if (Array.isArray(a))
              for (var h = 0; h < a.length; h++) {
                e = a[h];
                var f = b + T(e, h);
                g += S(e, f, d, c);
              }
            else if (
              (null === a || 'object' !== typeof a
                ? (f = null)
                : ((f = (z && a[z]) || a['@@iterator']),
                  (f = 'function' === typeof f ? f : null)),
              'function' === typeof f)
            )
              for (a = f.call(a), h = 0; !(e = a.next()).done; )
                (e = e.value), (f = b + T(e, h++)), (g += S(e, f, d, c));
            else
              'object' === e &&
                ((d = '' + a),
                B(
                  '31',
                  '[object Object]' === d
                    ? 'object with keys {' + Object.keys(a).join(', ') + '}'
                    : d,
                  ''
                ));
            return g;
          }
          function U(a, b, d) {
            return null == a ? 0 : S(a, '', b, d);
          }
          function T(a, b) {
            return 'object' === typeof a && null !== a && null != a.key
              ? escape(a.key)
              : b.toString(36);
          }
          function V(a, b) {
            a.func.call(a.context, b, a.count++);
          }
          function aa(a, b, d) {
            var c = a.result,
              e = a.keyPrefix;
            a = a.func.call(a.context, b, a.count++);
            Array.isArray(a)
              ? W(a, c, d, function(a) {
                  return a;
                })
              : null != a &&
                (N(a) &&
                  (a = M(
                    a,
                    e +
                      (!a.key || (b && b.key === a.key)
                        ? ''
                        : ('' + a.key).replace(O, '$&/') + '/') +
                      d
                  )),
                c.push(a));
          }
          function W(a, b, d, c, e) {
            var g = '';
            null != d && (g = ('' + d).replace(O, '$&/') + '/');
            b = Q(b, g, c, e);
            U(a, aa, b);
            R(b);
          }
          function ba(a, b) {
            var d = I.currentDispatcher;
            null === d ? B('277') : void 0;
            return d.readContext(a, b);
          }
          var X = {
              Children: {
                map: function(a, b, d) {
                  if (null == a) return a;
                  var c = [];
                  W(a, c, null, b, d);
                  return c;
                },
                forEach: function(a, b, d) {
                  if (null == a) return a;
                  b = Q(null, null, b, d);
                  U(a, V, b);
                  R(b);
                },
                count: function(a) {
                  return U(
                    a,
                    function() {
                      return null;
                    },
                    null
                  );
                },
                toArray: function(a) {
                  var b = [];
                  W(a, b, null, function(a) {
                    return a;
                  });
                  return b;
                },
                only: function(a) {
                  N(a) ? void 0 : B('143');
                  return a;
                },
              },
              createRef: function() {
                return { current: null };
              },
              Component: E,
              PureComponent: G,
              createContext: function(a, b) {
                void 0 === b && (b = null);
                a = {
                  $$typeof: w,
                  _calculateChangedBits: b,
                  _currentValue: a,
                  _currentValue2: a,
                  Provider: null,
                  Consumer: null,
                  unstable_read: null,
                };
                a.Provider = { $$typeof: v, _context: a };
                a.Consumer = a;
                a.unstable_read = ba.bind(null, a);
                return a;
              },
              forwardRef: function(a) {
                return { $$typeof: y, render: a };
              },
              Fragment: r,
              StrictMode: t,
              unstable_AsyncMode: x,
              unstable_Profiler: u,
              createElement: L,
              cloneElement: function(a, b, d) {
                null === a || void 0 === a ? B('267', a) : void 0;
                var c = void 0,
                  e = m({}, a.props),
                  g = a.key,
                  h = a.ref,
                  f = a._owner;
                if (null != b) {
                  void 0 !== b.ref && ((h = b.ref), (f = I.current));
                  void 0 !== b.key && (g = '' + b.key);
                  var k = void 0;
                  a.type && a.type.defaultProps && (k = a.type.defaultProps);
                  for (c in b)
                    J.call(b, c) &&
                      !K.hasOwnProperty(c) &&
                      (e[c] = void 0 === b[c] && void 0 !== k ? k[c] : b[c]);
                }
                c = arguments.length - 2;
                if (1 === c) e.children = d;
                else if (1 < c) {
                  k = Array(c);
                  for (var l = 0; l < c; l++) k[l] = arguments[l + 2];
                  e.children = k;
                }
                return {
                  $$typeof: p,
                  type: a.type,
                  key: g,
                  ref: h,
                  props: e,
                  _owner: f,
                };
              },
              createFactory: function(a) {
                var b = L.bind(null, a);
                b.type = a;
                return b;
              },
              isValidElement: N,
              version: '16.5.0',
              __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: I,
                assign: m,
              },
            },
            Y = { default: X },
            Z = (Y && X) || Y;
          module.exports = Z.default || Z;
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/react/cjs/react.production.min.js',
          '/node_modules/react/cjs'
        ));
      },
      { _process: 7, buffer: 4, 'object-assign': 6, timers: 13 },
    ],
    12: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          'use strict';

          if (process.env.NODE_ENV === 'production') {
            module.exports = require('./cjs/react.production.min.js');
          } else {
            module.exports = require('./cjs/react.development.js');
          }
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/react/index.js',
          '/node_modules/react'
        ));
      },
      {
        './cjs/react.development.js': 10,
        './cjs/react.production.min.js': 11,
        _process: 7,
        buffer: 4,
        timers: 13,
      },
    ],
    13: [
      function(require, module, exports) {
        (function(
          process,
          global,
          Buffer,
          __argument0,
          __argument1,
          __argument2,
          __argument3,
          setImmediate,
          clearImmediate,
          __filename,
          __dirname
        ) {
          var nextTick = require('process/browser.js').nextTick;
          var apply = Function.prototype.apply;
          var slice = Array.prototype.slice;
          var immediateIds = {};
          var nextImmediateId = 0;

          // DOM APIs, for completeness

          exports.setTimeout = function() {
            return new Timeout(
              apply.call(setTimeout, window, arguments),
              clearTimeout
            );
          };
          exports.setInterval = function() {
            return new Timeout(
              apply.call(setInterval, window, arguments),
              clearInterval
            );
          };
          exports.clearTimeout = exports.clearInterval = function(timeout) {
            timeout.close();
          };

          function Timeout(id, clearFn) {
            this._id = id;
            this._clearFn = clearFn;
          }
          Timeout.prototype.unref = Timeout.prototype.ref = function() {};
          Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
          };

          // Does not start the time, just sets up the members needed.
          exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = msecs;
          };

          exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId);
            item._idleTimeout = -1;
          };

          exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);

            var msecs = item._idleTimeout;
            if (msecs >= 0) {
              item._idleTimeoutId = setTimeout(function onTimeout() {
                if (item._onTimeout) item._onTimeout();
              }, msecs);
            }
          };

          // That's not how node.js implements it but the exposed api is the same.
          exports.setImmediate =
            typeof setImmediate === 'function'
              ? setImmediate
              : function(fn) {
                  var id = nextImmediateId++;
                  var args =
                    arguments.length < 2 ? false : slice.call(arguments, 1);

                  immediateIds[id] = true;

                  nextTick(function onNextTick() {
                    if (immediateIds[id]) {
                      // fn.call() is faster so we optimize for the common use-case
                      // @see http://jsperf.com/call-apply-segu
                      if (args) {
                        fn.apply(null, args);
                      } else {
                        fn.call(null);
                      }
                      // Prevent ids from leaking
                      exports.clearImmediate(id);
                    }
                  });

                  return id;
                };

          exports.clearImmediate =
            typeof clearImmediate === 'function'
              ? clearImmediate
              : function(id) {
                  delete immediateIds[id];
                };
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
              ? self
              : typeof window !== 'undefined'
                ? window
                : {},
          require('buffer').Buffer,
          arguments[3],
          arguments[4],
          arguments[5],
          arguments[6],
          require('timers').setImmediate,
          require('timers').clearImmediate,
          '/node_modules/timers-browserify/main.js',
          '/node_modules/timers-browserify'
        ));
      },
      { _process: 7, buffer: 4, 'process/browser.js': 7, timers: 13 },
    ],
  },
  {},
  [1]
);

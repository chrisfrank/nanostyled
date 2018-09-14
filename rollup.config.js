module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'nanostyled',
    format: 'umd',
  },
  external: ['react'],
};

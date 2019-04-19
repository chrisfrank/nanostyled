import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      globals: {
        'react': 'React',
      },
    },
    external: ['react'],
  },
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify 
    // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['react'],
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
  },
  {
    input: 'src/factory.js',
    output: [
      { file: 'factory.js', format: 'cjs' },
    ],
  },
];

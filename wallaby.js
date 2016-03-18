module.exports = function (w) {
  return {
    files: [
      'package.json',
      'src/**/*.ts',
      '!src/**/*.spec.ts'
    ],

    tests: [
      'src/**/*.spec.ts'
    ],

    env: {
      type: 'node'
    },

    compilers: {
      '**/*.ts': w.compilers.typeScript({
        module: 1,
        typescript: require('typescript'),
        emitDecoratorMetadata: true,
        experimentalDecorators: true
      })
    }
  };
};
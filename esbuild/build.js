const { build } = require('esbuild')

const { dependencies } = require('../package.json')

const shared = {
  bundle: true,
  entryPoints: ['./src/index.ts'],
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  target: ['esnext'],
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
})

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
})

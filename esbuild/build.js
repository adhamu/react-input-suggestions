const { build } = require('esbuild')

const { dependencies } = require('../package.json')

const common = {
  bundle: true,
  entryPoints: ['./src/index.ts'],
  external: Object.keys(dependencies || {}),
  logLevel: 'info',
  minify: true,
  sourcemap: false,
  target: ['esnext'],
}

build({
  ...common,
  format: 'esm',
  outfile: './dist/index.esm.js',
})

build({
  ...common,
  format: 'cjs',
  outfile: './dist/index.js',
})

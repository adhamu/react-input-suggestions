const { arge } = require('arge')
const chokidar = require('chokidar')
const esbuild = require('esbuild')
const liveServer = require('live-server')

const root = './public'

const { build = false, dev = false, watch = false } = arge(process.argv)

const common = {
  bundle: true,
  jsx: 'automatic',
  sourcemap: false,
}

if (build) {
  const options = {
    ...common,
    entryPoints: ['./src/index.ts'],
    external: Object.keys(require('./package.json').dependencies || {}),
    logLevel: 'info',
    minify: true,
    target: ['esnext'],
  }

  esbuild.build({
    ...options,
    format: 'esm',
    outfile: './dist/index.esm.js',
  })

  esbuild.build({
    ...options,
    format: 'cjs',
    outfile: './dist/index.js',
  })
}

if (dev) {
  ;(async () => {
    const builder = await esbuild.build({
      ...common,
      define: {
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      },
      entryPoints: ['./src/example/index.tsx'],
      incremental: true,
      minify: !watch,
      outfile: `./${root}/script.js`,
    })

    if (!watch) {
      process.exit(0)
    }

    chokidar
      .watch('./src/**/*.{ts,tsx}', {
        interval: 0,
      })
      .on('all', () => {
        builder.rebuild()
      })

    liveServer.start({
      open: true,
      port: +process.env.PORT || 8080,
      root,
    })
  })()
}

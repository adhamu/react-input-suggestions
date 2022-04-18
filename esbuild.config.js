const path = require('path')

const chokidar = require('chokidar')
const esbuild = require('esbuild')
const liveServer = require('live-server')

const root = './public'

const build = process.argv[2] === 'build' || false
const dev = process.argv[2] === 'dev' || false
const watch = (dev && process.argv[3] === '--watch') || false

const common = {
  bundle: true,
  inject: [path.join(__dirname, './react-shim.js')],
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

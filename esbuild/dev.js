const chokidar = require('chokidar')
const { build } = require('esbuild')
const liveServer = require('live-server')

const entryPoints = ['src/example/index.tsx']
const root = 'public'
const outfile = `${root}/script.js`

const watch = process.argv[2] === '--watch' || false

;(async () => {
  const builder = await build({
    bundle: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    },
    entryPoints,
    incremental: true,
    minify: process.env.NODE_ENV === 'production',
    outfile,
    sourcemap: false,
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

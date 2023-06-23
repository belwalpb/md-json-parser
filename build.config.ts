import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    // Change outDir, default is 'dist'
    outDir: 'lib',

    // Generates .d.ts declaration file
    declaration: true,

    clean: true,

    failOnWarn: false,

    rollup: {
        inlineDependencies: false,
        emitCJS: false,
        esbuild: {
          minify: true
        }
    }
})
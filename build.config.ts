import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    // Change outDir, default is 'dist'
    outDir: 'lib',

    // Generates .d.ts declaration file
    declaration: true,

    rollup: {
        inlineDependencies: false
    }
})
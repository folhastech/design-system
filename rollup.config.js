//thanks to https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id),
})
export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        dir: "dist",
        format: "es",
        exports: "named",
        preserveModules: true, // Keep directory structure and files
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      dir: "dist",
      format: "es",
      exports: "named",
      preserveModules: true, // Keep directory structure and files
    },
  }),
]

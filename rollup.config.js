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
        preserveModules: true,
        entryFileNames: ({ name }) => `${name}/index.js`, // Use this to generate the desired structure
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      dir: "dist",
      format: "es",
      exports: "named",
      preserveModules: true,
    },
  }),
]

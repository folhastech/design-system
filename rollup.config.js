import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"
import postcss from "rollup-plugin-postcss"

export default [
  {
    input: "src/index.ts",
    plugins: [
      esbuild(),
      postcss({
        plugins: [],
        inject: true,
      }),
    ],
    output: [
      {
        dir: "dist",
        format: "es",
        exports: "named",
        preserveModules: true,
        entryFileNames: ({ name }) =>
          `${name.replace(/^.*[\\\/]/, "")}/index.js`,
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      dir: "dist",
      format: "es",
      exports: "named",
      preserveModules: true,
      entryFileNames: ({ name }) =>
        `${name.replace(/^.*[\\\/]/, "")}/index.d.ts`,
    },
  },
]

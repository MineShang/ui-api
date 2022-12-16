import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import scss from "rollup-plugin-scss";

export default [
  {
    input: "src/index.ts",
    plugins: [esbuild({ minify: true })],
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.mjs",
        format: "es",
        sourcemap: true,
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
      file: "dist/types.d.ts",
      format: "es",
    },
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'output.js',
      format: 'esm'
    },
    plugins: [
      scss({
        name: 'output.css',
        // Literal asset filename, bypasses the automated filenaming transformations
        fileName: 'output.css',
        // Callback that will be called ongenerate with two arguments:
        // - styles: the contents of all style tags combined: 'body { color: green }'
        // - styleNodes: an array of style objects: { filename: 'body { ... }' }
        output: function (styles, styleNodes) {
          writeFileSync('bundle.css', styles)
        },
      })
    ]
  },
];

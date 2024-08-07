import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import packageJson from "./package.json" assert { type: "json" };
import { babel } from '@rollup/plugin-babel';

export default [
  {
    preferBuiltins: true,
    exportConditions: ["node"],
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        inlineDynamicImports: true,
        interop: 'auto'
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        inlineDynamicImports: true
      },
    ],
    plugins: [
      commonjs({
        include: ['./src/**', 'node_modules/**'],
      }),
      babel({
        exclude: 'node_modules/**',
        sourceType: "unambiguous",
        presets: [
          '@babel/env',
          ['es2015', { 'modules': false }]
        ],
        plugins: ["transform-remove-strict-mode"]
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      resolve({ exportConditions: ["node"], browser: true, moduleDirectories: ['node_modules'] })
    ],
    external: ["react", "react-dom", "@material-ui/core"],
    //Suppress "Module level directives cause errors when bundled" warning - currently no proper fix for this (ref: https://github.com/TanStack/query/issues/5175)
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    }
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{
      file: "dist/index.d.ts", format: "esm", inlineDynamicImports: true
    }],
    plugins: [dts()],
    external: [/\.css$/]
  },
];
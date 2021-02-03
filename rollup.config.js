import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
const isDev = process.env.NODE_ENV !== 'production';

import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
// import { eslint } from 'rollup-plugin-eslint'

export default {
    input: 'src/index.ts',
    // output: {
    //   file: (!isDev && 'bundle.min.js') || 'bundle.js',
    //   format: 'umd',
    //   name: 'util'
    // },
    output: [
        {
            file: (!isDev && pkg.main) || 'lib/bundle.cjs.js',
            format: 'cjs',
        },
        {
            file: (!isDev && pkg.module) || 'lib/bundle.esm.js',
            format: 'esm',
        },
        {
            file: (!isDev && pkg.browser) || 'lib/bundle.umd.js',
            format: 'umd',
            name: 'util',
        },
    ],
    plugins: [
        json(),
        resolve(),
        commonjs({
            namedExports: {
                // 对应 module ：name
                '@wxa/core': ['diff'],
            },
        }),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                },
            },
            check:false
        }),
        !isDev && terser(),
    ],
    // external: ['jquery']
};

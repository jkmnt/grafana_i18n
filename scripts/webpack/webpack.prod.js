'use strict';

const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ({ locale } = {}) => {
  const ttag_cfg = {}

  if (locale == 'default')
    locale = undefined

  if (locale) {
    console.log(`Building for locale ${locale}`);
    ttag_cfg.resolve = { translations: `${locale}.po` }
  }
  else {
    console.log(`Building for default locale, extracting pot`);
    ttag_cfg.resolve = { translations: `default` }
    ttag_cfg.extract = { output: 'app.pot' }
  }

  const suffix = locale ? `_${locale}` : '';

  return merge(common, {

    // override the common output
    output: {
      path: path.resolve(__dirname, `../../public/build${suffix}`),
      filename: '[name].[hash].js',
      // Keep publicPath relative for host.com/grafana/ deployments
      publicPath: `public/build${suffix}/`,
    },

    mode: 'production',

    // emit no source maps for localized builds
    devtool: locale ? undefined : 'source-map',

    entry: {
      dark: './public/sass/grafana.dark.scss',
      light: './public/sass/grafana.light.scss',
    },

    module: {
      // Note: order is bottom-to-top and/or right-to-left
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/, /\.test.tsx?$/, /\.story.tsx?$/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                // caching is disabled since it confuses the gettext which must extract all resources at once.
                // ... and caching is not the best idea for production builds anyway
                // cacheDirectory: true,
                babelrc: false,
                // Note: order is top-to-bottom and/or left-to-right
                plugins: [
                  ['ttag', ttag_cfg],
                  [
                    require('@rtsao/plugin-proposal-class-properties'),
                    {
                      loose: true,
                    },
                  ],
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-syntax-dynamic-import', // needed for `() => import()` in routes.ts
                  'angularjs-annotate',
                ],
                // Note: order is bottom-to-top and/or right-to-left
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: 'last 3 versions',
                      },
                      useBuiltIns: 'entry',
                      corejs: 3,
                      modules: false,
                    },
                  ],
                  [
                    '@babel/preset-typescript',
                    {
                      allowNamespaces: true,
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        require('./sass.rule.js')({
          sourceMap: false,
          preserveUrl: false,
        }),
      ],
    },
    optimization: {
      nodeEnv: 'production',
      minimizer: [
        new TerserPlugin({
          cache: false,
          parallel: false,
          sourceMap: locale ? false : true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
	  // no need for typecheck the localized builds
      locale ?
        function() {}
        :
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            enabled: true,
            files: ['public/app/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}'],
          },
          typescript: {
            mode: 'write-references',
            memoryLimit: 4096,
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
          },
        }),
      new MiniCssExtractPlugin({
        filename: 'grafana.[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../../public/views/error.html'),
        template: path.resolve(__dirname, '../../public/views/error-template.html'),
        inject: false,
        excludeChunks: ['dark', 'light'],
        chunksSortMode: 'none',
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../../public/views/index${suffix}.html`),
        template: path.resolve(__dirname, '../../public/views/index-template.html'),
        inject: false,
        excludeChunks: ['manifest', 'dark', 'light'],
        chunksSortMode: 'none',
      }),
      function () {
        this.hooks.done.tap('Done', function (stats) {
          if (stats.compilation.errors && stats.compilation.errors.length) {
            console.log(stats.compilation.errors);
            process.exit(1);
          }
        });
      },
    ],
  })
};

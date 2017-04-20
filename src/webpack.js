const BundleTracker = require('webpack-bundle-tracker');
const webpack = require('webpack');

const config = {
    context: __dirname
   ,entry: {
        path: [
            './index.ts'
        ]
    }
   ,output: {
        path: __dirname + '/build/'
       ,pathinfo: true
       ,filename: '[name].js'
    }
   ,devtool: 'source-map'
   ,plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }) 
       ,new webpack.NoEmitOnErrorsPlugin()
       ,new BundleTracker({filename:'./build/webpack-stats.json'})
       ,new webpack.optimize.UglifyJsPlugin({ compress: {drop_console: true}, output: { comments: false, quote_style: 3 }})
    ]
   ,module: {
        rules: [
            {enforce: 'pre', test: /\.tsx?$/, loader: "tslint-loader"}
           ,{test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
};

module.exports = config;

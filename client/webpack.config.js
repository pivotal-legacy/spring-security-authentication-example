var path = require("path");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: '../src/main/resources/static/dist/',
        filename: 'bundle.js'
    },
    node: {
      fs: 'empty'
    },
    module: {
        loaders: [
            {
              test: /aws-sdk/,
              loaders: [
                'transform?aws-sdk/dist-tools/transform'
              ]
            },
            {
                test: /\.(css|scss)$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    }
};

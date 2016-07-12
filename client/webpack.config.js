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

const { merge } = require(`webpack-merge`);
const common = require(`./webpack.common`);
const path = require(`path`);

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        static: {
            directory: path.join(process.cwd(), 'Build')
        },
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/
    }
});
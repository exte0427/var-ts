const path = require(`path`);

module.exports = {
    entry: './Work/router.tsx',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',  // Or 'ts' if you don't need tsx
                        target: 'es2015'
                    }
                },

                exclude: /node_modules/,
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|tiff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[ext]/[name].[ext]",
                        }
                    },
                ],
            },
            {
                test: /\.mp4$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "video"
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'dist.js',
        path: path.resolve(process.cwd(), 'Build'),
    }
};
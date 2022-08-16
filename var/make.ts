import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import { Log } from './console';

export namespace Make {

    const install = (name: string, g = false) => {
        if (g)
            cp.execSync(`npm i -g ${name}`);
        else
            cp.execSync(`npm i ${name}`);
        Log.success(`${name} installed`);
    }

    const npmInstall = () => {
        install(`var-web`);

        install(`typescript`);

        install(`webpack`);
        install(`webpack-dev-server`);
        install(`webpack-cli`);

        install(`style-loader`);
        install(`css-loader`);
        install(`esbuild-loader`);

        install(`npx`, true);
    }

    const tsconfig =
        `
{
    "compilerOptions": {
      "outDir": "./Build/",
      "noImplicitAny": false,
      "module": "CommonJS",
      "target": "es5",
      "jsx": "react",
      "jsxFactory": "Var.Create.el",
      "allowJs": true,
      "esModuleInterop": true,
      "moduleResolution": "node"
    }
}
`;
    const webpack =
        `const path = require('path');

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
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'Build'),
    },
    mode: 'development',

    devServer: {
        static: {
            directory: path.join(__dirname, 'Build')
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
};

`;
    const router =
        `import { Var } from "var-web";
import { App } from "./app"

// your first app
Var.Path.start({
    "/": (<App />)
});
`;

    const main =
        `/* css file */
`;
    const indexHtml =
        `
<!DOCTYPE html>
<html lang="kr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Var App</title>
</head>

<body>
    <script src="./dist.js"></script>
</body>
        
</html>
`

    const app =
        `import { Var } from "var-web";
import "./main.css"

export class App extends Var.Dom {
    onRender = () => (
        <div>Hello, World!</div>
    );
}
`

    const copyFile = () => {

        // folder
        fs.mkdirSync(path.join(process.cwd(), `Build`));
        fs.mkdirSync(path.join(process.cwd(), `Work`));
        fs.mkdirSync(path.join(process.cwd(), `Asset`));

        // setting file
        fs.writeFileSync(path.join(process.cwd(), `tsconfig.json`), tsconfig);
        fs.writeFileSync(path.join(process.cwd(), `webpack.config.js`), webpack);

        // router.tsx app.tsx main.css
        fs.writeFileSync(path.join(process.cwd(), `Work`, `router.tsx`), router);
        fs.writeFileSync(path.join(process.cwd(), `Work`, `app.tsx`), app);
        fs.writeFileSync(path.join(process.cwd(), `Work`, `main.css`), main);

        // server.ts index.html
        fs.writeFileSync(path.join(process.cwd(), `Build`, `index.html`), indexHtml);
    }

    const editPackage = () => {
        const myPackage = JSON.parse(
            fs.readFileSync(path.join(process.cwd(), `package.json`), { encoding: 'utf8' })
        );

        myPackage[`scripts`][`start`] = `npx webpack-dev-server`;

        fs.writeFileSync(path.join(process.cwd(), `package.json`), JSON.stringify(myPackage), { encoding: 'utf8' });
    }

    export const varProject = () => {
        npmInstall();
        Log.success("npm modules are installed");
        copyFile();
        Log.success("files are copied");
        editPackage();
        Log.success("package is edited");
    }
}
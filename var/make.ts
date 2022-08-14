import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import { Log } from './console';

export namespace Make {
    export const runProject = () => {
        cp.exec(`webpack`, (err, stdout, stderr) => {
            if (err) {
                Log.error("Something went wrong..");
                console.log(err);
            }
            else {
                cp.execSync(`ts-node Build/server`);
                Log.success(`Server Started!`);
            }
        });
    }

    const npmInstall = () => {
        cp.execSync(`npm i var-web var-webserver typescript ts-node webpack ts-loader style-loader css-loader webpack-cli`);
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
        `
const path = require('path');

module.exports = {
    entry: './Work/router.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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
    mode: 'development'
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
    const server =
        `
import { Server } from 'var-webserver';

// start server
Server.start(process.env.PORT || \`3000\`);
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
    <script src="/Build/dist.js"></script>
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
        fs.writeFileSync(path.join(process.cwd(), `Build`, `server.ts`), server);
        fs.writeFileSync(path.join(process.cwd(), `Build`, `index.html`), indexHtml);
    }

    export const varProject = () => {
        npmInstall();
        Log.success("npm modules are installed");
        copyFile();
        Log.success("files are copied");
    }
}
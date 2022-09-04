import fs from 'fs';
import path from 'path';
import { Log } from './console';

import { Npm } from './install';
import { Make } from './make';

export namespace Parse {

    const getFile = (dir: string) => {
        const nowList = {};
        fs.readdirSync(dir).map(file => {
            if (file !== `node_modules` && file !== `package.json` && file !== `package-lock.json` && file !== `dist.js`) {
                const fileDir = path.join(dir, file);

                if (fs.lstatSync(fileDir).isDirectory())
                    nowList[file] = getFile(fileDir);
                else
                    nowList[file] = fs.readFileSync(fileDir, { encoding: "utf-8" });
            }
        });

        return nowList;
    }

    export const start = () => {
        const dir = path.join(__dirname, `..`, `sample`);
        const packageDir = path.join(dir, `package.json`);
        const packageDes: any = JSON.parse(fs.readFileSync(packageDir, { encoding: "utf-8" }));

        const npmList = packageDes[`dependencies`];
        const installList: Array<string> = [];

        for (const name in npmList) {
            if (name === `var-web`)
                installList.push(`npm i ${name}`);
            else
                installList.push(`npm i ${name}@${npmList[name].substring(1)}`);
        }

        Npm.init();
        Npm.install(installList);
        Log.success(`packages are all installed`);

        Npm.setStart(path.join(process.cwd(), "package.json"), packageDes[`scripts`]);
        Log.success(`package.json is edited`);

        const fileList = getFile(dir);
        Make.files(fileList, process.cwd());
        Log.success(`files are copied`);
        Log.success(`Var Ts!`);
    }
}
import cp from 'child_process';
import fs from 'fs';

import { Log } from './console';

export namespace Npm {
    export const install = (names: Array<string>) => {
        let index = 0;
        names.map(name => {
            index++;
            cp.execSync(name);
            Log.success(`packages are installed (${index}/${names.length})`);
        });
    }

    export const init = () => {
        cp.execSync(`npm init -y`);
    }

    export const setStart = (packageDir: string, script: any) => {
        const packageJson = JSON.parse(fs.readFileSync(packageDir, { encoding: "utf-8" }));
        packageJson[`scripts`] = script;

        fs.writeFileSync(packageDir, JSON.stringify(packageJson), { encoding: "utf-8" });
    }
}
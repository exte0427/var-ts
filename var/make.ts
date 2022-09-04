import fs from 'fs';
import path from 'path';

export namespace Make {
    export const files = (json: any, dir: string) => {
        for (const name in json) {
            if (typeof json[name] === `string`)
                fs.writeFileSync(path.join(dir, name), json[name], { encoding: "utf-8" });
            else {
                const dirPath = path.join(dir, name);

                fs.mkdirSync(dirPath);
                files(json[name], dirPath);
            }
        }
    }
}
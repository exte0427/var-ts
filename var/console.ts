import chalk from 'chalk';

export namespace Log {
    const varLogo = chalk.bgRed("Var.Ts")

    export const success = (desc: string) => {
        console.log(varLogo, chalk.bgGreen("Success"), chalk.green(desc));
    }

    export const error = (desc: string) => {
        console.log(varLogo, chalk.bgRed("Success"), chalk.red(desc));
    }
}
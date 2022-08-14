#!/usr/bin/env node
import { Command } from 'commander';
import { Make } from './make';

const program = new Command();

program
    .name(`var-ts`)
    .description(`cli for making var-ts app`);

program.command(`new`)
    .description(`make new var-ts app`)
    .action((str, option) => {
        Make.varProject();
    });

program.command(`run`)
    .description(`run var-ts app`)
    .action((str, option) => {
        Make.runProject();
    });

program.parse(process.argv);
#!/usr/bin/env node
import { Command } from 'commander';
import { Parse } from './parse';

const program = new Command();

program
    .name(`var-ts`)
    .description(`cli for making var-ts app`);

program.command(`new`)
    .description(`make new var-ts app`)
    .action((str, option) => {
        Parse.start();
    });

program.parse(process.argv);
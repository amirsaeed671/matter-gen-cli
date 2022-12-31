#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const args = [
    {
        name: "--meta",
        description: "pass values in comma separated string i.e --meta 'id,title,date'",
    },
];
function main() {
    const passedArgs = process.argv.slice(2);
    validateArguments(passedArgs);
    const [id, title, date] = passedArgs[1].split(",");
    generateTemplate({ title, date, id });
}
main();
function validateArguments(cliArgs) {
    if (cliArgs.length > 2) {
        printHelp();
        process.exit(1);
    }
    const argumentName = cliArgs[0];
    const value = cliArgs[1];
    if (!argumentName || !value) {
        printHelp();
        process.exit(1);
    }
    else if (value.split(",").length !== 3) {
        printHelp();
        process.exit(1);
    }
}
function generateTemplate({ title, id, date, }) {
    const fileContent = fs_1.default
        .readFileSync("./src/template/template.md", "utf8")
        .replace(/\{\{title\}\}/g, title)
        .replace(/\{\{date\}\}/g, date);
    (0, child_process_1.exec)(`echo '${fileContent}' > ${process.cwd()}/${id}.md`);
    console.log(`${id}.md is generated successfully on directory: ${process.cwd()}`);
    process.exit(0);
}
function printHelp() {
    // Print all the available arguments
    console.log("List of available arguments: \n\n");
    args.forEach((ag) => {
        console.log(`${ag.name} :        ${ag.description}\n`);
    });
}

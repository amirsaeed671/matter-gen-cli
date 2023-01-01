#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const matter_gen_cli_config_1 = __importDefault(require("./matter-gen-cli.config"));
const args = [
    {
        name: "--meta",
        description: "*pass values in comma separated string i.e --meta 'id,title,date'",
    },
    {
        name: "--outDir",
        description: "provide the path where output file will be created, default is current directory",
    },
    {
        name: "--config",
        description: "path to a config file which returns a object",
    },
];
function main() {
    const passedArgs = process.argv.slice(2);
    validateArguments(passedArgs);
    const [id, title, date] = passedArgs[1].split(",");
    generateTemplate({ title, date, id });
}
function validateArguments(cliArgs) {
    if (cliArgs.length > 6) {
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
    const readStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "../", "templates", "blog-post.md"));
    let data = "";
    readStream.on("data", (chunk) => {
        data += chunk;
    });
    readStream.on("end", () => {
        const fileContent = data
            .replace(/\{\{title\}\}/g, title)
            .replace(/\{\{date\}\}/g, date);
        const writeStream = fs_1.default.createWriteStream(`${matter_gen_cli_config_1.default.outDir}/${id}.md`, "utf8");
        writeStream.write(fileContent);
        writeStream.on("finish", () => {
            console.log(`${id}.md is generated successfully on directory: ${process.cwd()}`);
            process.exit(0);
        });
    });
}
function printHelp() {
    // Print all the available arguments
    console.log("List of available arguments: \n");
    console.log("-----------------------------\n");
    args.forEach((ag) => {
        console.log(`${ag.name} :  ${ag.description}\n`);
    });
    console.log("-----------------------------\n");
}
// Run main program
main();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const configArgIndex = process_1.argv.indexOf("--config");
const outDirIndex = process_1.argv.indexOf("--outDir");
let overrides = {};
if (configArgIndex > -1 && typeof process_1.argv[configArgIndex + 1] === "string") {
    overrides = require(process_1.argv[configArgIndex + 1]);
}
if (outDirIndex > -1 && typeof process_1.argv[outDirIndex + 1] === "string") {
    overrides.outDir = process_1.argv[outDirIndex + 1];
}
exports.default = Object.assign({ outDir: process.cwd() }, overrides);

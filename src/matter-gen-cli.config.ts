import { argv } from "process";

export interface cliConfig {
  outDir?: string;
}

const configArgIndex = argv.indexOf("--config");
const outDirIndex = argv.indexOf("--outDir");

let overrides: cliConfig = {};

if (configArgIndex > -1 && typeof argv[configArgIndex + 1] === "string") {
  overrides = require(argv[configArgIndex + 1]);
}

if (outDirIndex > -1 && typeof argv[outDirIndex + 1] === "string") {
  overrides.outDir = argv[outDirIndex + 1];
}

export default {
  outDir: process.cwd(),
  ...overrides,
} as cliConfig;

#!/usr/bin/env node

import fs from "fs";
import path from "path";

const args = [
  {
    name: "--meta",
    description:
      "pass values in comma separated string i.e --meta 'id,title,date'",
  },
];

function main() {
  const passedArgs = process.argv.slice(2);

  validateArguments(passedArgs);

  const [id, title, date] = passedArgs[1].split(",");

  generateTemplate({ title, date, id });
}

main();

function validateArguments(cliArgs: string[]) {
  if (cliArgs.length > 2) {
    printHelp();
    process.exit(1);
  }

  const argumentName = cliArgs[0];
  const value = cliArgs[1];

  if (!argumentName || !value) {
    printHelp();

    process.exit(1);
  } else if (value.split(",").length !== 3) {
    printHelp();
    process.exit(1);
  }
}

function generateTemplate({
  title,
  id,
  date,
}: {
  title: string;
  date: string;
  id: string;
}): void {
  const readStream = fs.createReadStream(
    path.join(__dirname, "../", "templates", "blog-post.md")
  );
  let data = "";

  readStream.on("data", (chunk) => {
    data += chunk;
  });

  readStream.on("end", () => {
    const fileContent = data
      .replace(/\{\{title\}\}/g, title)
      .replace(/\{\{date\}\}/g, date);
    const writeStream = fs.createWriteStream(
      `${process.cwd()}/${id}.md`,
      "utf8"
    );

    writeStream.write(fileContent);

    writeStream.on("finish", () => {
      console.log(
        `${id}.md is generated successfully on directory: ${process.cwd()}`
      );
      process.exit(0);
    });
  });
}

function printHelp() {
  // Print all the available arguments
  console.log("List of available arguments: \n\n");
  args.forEach((ag) => {
    console.log(`${ag.name} :        ${ag.description}\n`);
  });
}

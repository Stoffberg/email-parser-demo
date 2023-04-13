import fs from "fs";
import Yargs from "yargs/yargs";
import { ParsedMail, simpleParser } from "mailparser";
import sortParsedMails from "../index";
import { writeJsonToFile } from "src/helpers";

const test = async () => {
  const argv = await Yargs(process.argv.slice(2))
    .option("file", {
      alias: "f",
      type: "string",
      description: "Path to the file containing raw email data",
    })
    .option("method", {
      alias: "m",
      choices: ["date", "thread", "both"],
      description: "Sorting method",
    })
    .option("write", {
      alias: "w",
      type: "boolean",
      description: "Write the sorted emails to a JSON file",
    })
    .option("name", {
      alias: "o",
      type: "string",
      description: "File name for the JSON file",
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Print verbose output",
    })
    .demandOption(["file", "method"]).argv;

  fs.readFile(argv.file, async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      process.exit(1);
    }

    let sortedEmails: ParsedMail[] | ParsedMail[][] = [];

    if (argv.file.endsWith(".eml")) {
      const parsed_email = await simpleParser(data.toString());
      sortedEmails = [parsed_email];
    } else {
      const rawEmails = data.toString().split(/(?=^From .*$)/m);
      const parsedEmailPromises = rawEmails.map((rawEmail) => simpleParser(rawEmail));
      const parsedEmails = await Promise.all(parsedEmailPromises);

      console.log(rawEmails.length, "emails parsed");

      sortedEmails = sortParsedMails(parsedEmails, argv.method === "both" ? "date/thread" : (argv.method as "date" | "thread"));
    }

    if (argv.verbose) console.log(`Sorted emails: ${JSON.stringify(sortedEmails, null, 2)}`);
    if (argv.write) writeJsonToFile(sortedEmails, argv.name || "sorted-emails.json");
  });
};

void test();

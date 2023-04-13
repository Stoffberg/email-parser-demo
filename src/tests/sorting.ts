import fs from "fs";
import Yargs from "yargs/yargs";
import { ParsedMail, simpleParser } from "mailparser";
import sortParsedMails from "../index";
import { writeJsonToFile } from "src/helpers";
import { convert } from "html-to-text";

const output = (emails: Array<any>, options: { verbose?: boolean; write?: boolean; name?: string }) => {
  if (options.verbose) console.log(`Sorted emails: ${JSON.stringify(emails, null, 2)}`);
  if (options.write) writeJsonToFile(emails, options.name || "sorted-emails.json");
};

const removePreviousEmails = (textContent: string) => {
  const lastIndex = textContent.indexOf("From:");
  return lastIndex !== -1 ? textContent.substring(0, lastIndex).trim() : textContent;
};

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
    .option("reduced", {
      alias: "r",
      type: "boolean",
      description: "Reduce the output to only text",
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

    let sortedEmails: (ParsedMail | ParsedMail[])[] = [];

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

    sortedEmails = sortedEmails.map((email) => {
      if (Array.isArray(email)) return email.map((e) => ({ ...e, attachments: [] } as ParsedMail));
      return { ...email, attachments: [] } as ParsedMail;
    });

    if (argv.reduced) {
      const reducedEmails = sortedEmails.map((email) => {
        if (Array.isArray(email)) return email.map((e) => removePreviousEmails(convert(e.text || e.textAsHtml || e.html || "")));
        return removePreviousEmails(convert(email.text || email.textAsHtml || email.html || ""));
      });
      output(reducedEmails, argv);
    } else {
      output(sortedEmails, argv);
    }
  });
};

void test();

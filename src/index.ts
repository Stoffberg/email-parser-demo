import fs from "fs";

import { TEST_SET_1, TEST_SET_2 } from "./data";

type ParsedEmail = {
  messageId: string;
  inReplyTo: string | null;
  date: Date;
  rawEmail: string;
};

function parseDateString(dateString: string): Date {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateParts = dateString.match(/([A-Za-z]{3}), (\d{1,2}) ([A-Za-z]{3}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) ([-+]\d{4})/);

  if (dateParts) {
    const year = parseInt(dateParts[4], 10);
    const month = monthNames.indexOf(dateParts[3]);
    const day = parseInt(dateParts[2], 10);
    const hour = parseInt(dateParts[5], 10);
    const minute = parseInt(dateParts[6], 10);
    const second = parseInt(dateParts[7], 10);
    const timezoneOffset = parseInt(dateParts[8], 10) / 100;

    return new Date(year, month, day, hour - timezoneOffset, minute, second);
  }

  return new Date();
}

function parseEmail(rawEmail: string): ParsedEmail {
  const messageIdRegex = /Message-ID: (<.*?>)/;
  const inReplyToRegex = /In-Reply-To: (<.*?>)/;
  const dateRegex = /Date: (.*)/;

  const messageIdMatch = rawEmail.match(messageIdRegex);
  const inReplyToMatch = rawEmail.match(inReplyToRegex);
  const dateMatch = rawEmail.match(dateRegex);

  const messageId = messageIdMatch ? messageIdMatch[1] : "";
  const inReplyTo = inReplyToMatch ? inReplyToMatch[1] : null;
  const date = dateMatch ? parseDateString(dateMatch[1]) : new Date();

  return { messageId, inReplyTo, date, rawEmail };
}

function buildEmailTree(emails: ParsedEmail[]): Map<string, ParsedEmail[]> {
  const emailTree = new Map<string, ParsedEmail[]>();

  for (const email of emails) {
    const parentId = email.inReplyTo || "root";
    const children = emailTree.get(parentId) || [];
    children.push(email);
    emailTree.set(parentId, children);
  }

  return emailTree;
}

function traverseEmailTree(emailTree: Map<string, ParsedEmail[]>): ParsedEmail[][] {
  const chains: ParsedEmail[][] = [];
  const rootNodes = Array.from(emailTree.values())
    .flat()
    .filter((email) => email.inReplyTo === null);

  for (const rootNode of rootNodes) {
    const chain: ParsedEmail[] = [rootNode];
    let currentEmail = rootNode;

    while (true) {
      const children = emailTree.get(currentEmail.messageId);

      if (!children || children.length === 0) {
        break;
      }

      children.sort((a, b) => a.date.getTime() - b.date.getTime());
      const nextEmail = children[0];
      chain.push(nextEmail);
      currentEmail = nextEmail;
    }

    chains.push(chain);
  }

  return chains;
}

function writeJsonToFile(obj: object, fileName: string): void {
  const jsonString = JSON.stringify(obj, null, 2);
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON file successfully written to ${fileName}`);
    }
  });
}

const rawEmails = [...TEST_SET_1, ...TEST_SET_2];
const parsedEmails = rawEmails.map(parseEmail);
const emailTree = buildEmailTree(parsedEmails);
const sortedEmailChains = traverseEmailTree(emailTree);
writeJsonToFile(sortedEmailChains, "output.json");

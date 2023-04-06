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

    // add email to tree even if it doesn't have a valid inReplyTo value
    if (!emailTree.has(email.messageId)) {
      emailTree.set(email.messageId, []);
    }
  }

  return emailTree;
}

function traverseEmailTree(emailTree: Map<string, ParsedEmail[]>): ParsedEmail[][] {
  const chains: ParsedEmail[][] = [];
  const rootNodes = emailTree.get("root") || [];
  emailTree.delete("root");

  for (const rootNode of rootNodes) {
    const chain: ParsedEmail[] = [rootNode];
    let children = emailTree.get(rootNode.messageId);
    emailTree.delete(rootNode.messageId);

    if (rootNode.messageId === "<SNT128-W654AE084F66FD2255A6D287D24@example.com>") console.log(children);

    while (children && children.length > 0) {
      const child = children.pop();
      if (!child) continue;
      chain.push(child);
      children = [...children, ...(emailTree.get(child.messageId) || [])];
      emailTree.delete(child.messageId);
    }

    chains.push(chain);
  }

  chains.forEach((chain) => {
    chain.sort((a, b) => a.date.getTime() - b.date.getTime());
  });

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

function mapToObject<T>(map: Map<string, T>): Record<string, T> {
  const obj: Record<string, T> = {};

  for (const [key, value] of map) {
    obj[key] = value;
  }

  return obj;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

const rawEmails = [...TEST_SET_1, ...TEST_SET_2];
const parsedEmails = rawEmails.map(parseEmail);
const shuffledEmails = shuffleArray(parsedEmails);

const emailTree = buildEmailTree(shuffledEmails);
writeJsonToFile(mapToObject(emailTree), "emailTree.json");

const sortedEmailChains = traverseEmailTree(emailTree);
writeJsonToFile(sortedEmailChains, "output.json");

import { type ParsedMail } from "mailparser";

type SortingFunction = (emails: ParsedMail[], method: "date" | "thread" | "date/thread") => ParsedMail[] | ParsedMail[][];
const sortParsedMails: SortingFunction = (emails, method) => {
  if (method === "date") return emails.sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));

  if (method === "thread") {
    const emailTree = buildEmailTree(emails);
    return traverseEmailTree(emailTree, false);
  }

  if (method === "date/thread") {
    const emailTree = buildEmailTree(emails);
    return traverseEmailTree(emailTree, true);
  }

  return emails;
};

function buildEmailTree(emails: ParsedMail[]): Map<string, ParsedMail[]> {
  const emailTree = new Map<string, ParsedMail[]>();

  for (const email of emails) {
    const parentId = email.inReplyTo || "root";
    const children = emailTree.get(parentId) || [];
    children.push(email);
    emailTree.set(parentId, children);

    // add email to tree even if it doesn't have a valid inReplyTo value
    if (email.messageId && !emailTree.has(email.messageId)) {
      emailTree.set(email.messageId, []);
    }
  }

  return emailTree;
}

function traverseEmailTree(emailTree: Map<string, ParsedMail[]>, sortByDate: boolean): ParsedMail[][] {
  const chains: ParsedMail[][] = [];
  const rootNodes = emailTree.get("root") || [];
  emailTree.delete("root");

  for (const rootNode of rootNodes) {
    const chain: ParsedMail[] = [rootNode];
    let children = rootNode.messageId ? emailTree.get(rootNode.messageId) : [];
    if (rootNode.messageId) emailTree.delete(rootNode.messageId);

    while (children && children.length > 0) {
      const child = children.pop();
      if (!child) continue;
      chain.push(child);
      children = [...children, ...(child.messageId ? emailTree.get(child.messageId) || [] : [])];
      if (child.messageId) emailTree.delete(child.messageId);
    }

    chains.push(chain);
  }

  if (sortByDate)
    chains.forEach((chain) => {
      chain.sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));
    });

  return chains;
}

export default sortParsedMails;

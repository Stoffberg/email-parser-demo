import fs from "fs";

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

export { parseDateString, writeJsonToFile, mapToObject, shuffleArray };

import { Readable } from "stream";
import * as fs from "fs";

export async function generateJsonFileFromBuffer(
  buffer: Buffer,
  localToSave: string
) {
  return new Promise((resolve, reject) => {
    let offset = 0;

    fs.writeFileSync(localToSave, "");
    const writableStream = fs.createWriteStream(localToSave);
    const chunks = [];

    const readableStream = new Readable({
      highWaterMark: 1024,
      read(size) {
        const chunk = buffer.slice(offset, offset + size);
        offset += chunk.length;
        this.push(chunk.length > 0 ? chunk : null);
      },
      encoding: "utf-8",
    });

    readableStream.on("data", (chunk) => {
      writableStream.write(chunk);
    });

    readableStream.on("end", () => {
      writableStream.end();
      resolve(chunks);
    });

    readableStream.on("error", (err) => {
      reject(err);
    });
  });
}

export function checkActualDateItsBiggerThanDateToPauseProcess() {
  return (
    new Date(process.env.DATE_TO_PAUSE_JOB) > new Date() ||
    process.env.DATE_TO_PAUSE_JOB === ""
  );
}

//used to inform a date as a nodejs environment variable that will control whether the file process can restart
export function setDateToPauseJob() {
  const dateToPauseProcess = new Date();
  process.env.DATE_TO_PAUSE_JOB = `${dateToPauseProcess.getFullYear()}-${
    dateToPauseProcess.getMonth
  }-${dateToPauseProcess.getDate}`;
  return "pause";
}

export function managerFileJob(filesToProcess: string[], count: number) {
  if (count <= filesToProcess.length) return filesToProcess[count];
  else {
    process.env.MEMORY_STATE = String(0);
    return setDateToPauseJob();
  }
}

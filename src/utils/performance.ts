import * as os from "os";

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
}

export function performanceResult(start: number, end: number) {
  const totalDuration = end - start;
  const cpuUsage = os
    .cpus()
    .reduce((total, cpu) => total + cpu.times.user + cpu.times.sys, 0);
  const cpuUsageAverage =
    ((cpuUsage / (totalDuration / 1000)) * 100) / os.cpus().length;

  const memoryUsage = process.memoryUsage().heapUsed;

  return {
    totalDuration: `${totalDuration.toFixed(2)} ms`,
    cpuUsageAverage: `${(
      Math.round(Number(cpuUsageAverage.toFixed(2))) / 10000
    ).toFixed(2)}%`,
    memoryUsage: formatBytes(memoryUsage),
  };
}

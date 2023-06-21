import * as os from "os-utils";

export async function getCpuUsage(totalDuration): Promise<number> {
  return new Promise((resolve) => {
    os.cpuUsage((cpuUsage) => {
      const cpuUsageAverage = (cpuUsage * 100) / os.cpuCount();
      const cpuUsageAveragePerDuration =
        cpuUsageAverage / (totalDuration / 1000);
      resolve(cpuUsageAveragePerDuration);
    });
  });
}

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
}

export async function performanceResult(start: number, end: number) {
  const totalDuration = end - start;
  const cpuUsage = await getCpuUsage(totalDuration);
  const cpuUsageAverage = (cpuUsage / totalDuration) * 1000;

  const memoryUsage = process.memoryUsage().heapUsed;

  return {
    total_duration: `${totalDuration.toFixed(2)} ms`,
    cpu_usage_average: `${(cpuUsageAverage * 100).toFixed(2)}%`,
    memory_usage: formatBytes(memoryUsage),
  };
}

export enum JobProcessStatusEnum {
  Success = "Success",
  Error = "Error",
  Pause = "Pause",
}

export interface JobPerformanceModel {
  total_duration: string;
  cpu_usage_average: string;
  memory_usage: string;
}

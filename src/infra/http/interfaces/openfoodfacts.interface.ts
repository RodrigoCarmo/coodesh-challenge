export interface OpenFoodFactInterface {
  getAvailableFileNames(): Promise<string[]>;
  getFile(filename: string): Promise<any>;
}

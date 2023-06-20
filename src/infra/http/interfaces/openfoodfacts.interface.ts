export interface OpenFoodFactInterface {
  getAvailableFileNames(): Promise<any>;
  getFile(filename: string): Promise<any>;
}

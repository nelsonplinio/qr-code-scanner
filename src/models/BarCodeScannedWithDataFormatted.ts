import { BarCodeScannerData } from './BarCodeScannerData';

export type BarCodeScannedWithDataFormatted = BarCodeScannerData & {
  header?: string;
  timeFormatted: string;
};

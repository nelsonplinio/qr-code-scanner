import React from 'react';

import { HistoryLinkScannedProvider } from './historyLinkScanned';
import { ScannerOptionsModalProvider } from './scannedOptionsModal';

const AppProvider: React.FC = ({ children }) => {
  return (
    <HistoryLinkScannedProvider>
      <ScannerOptionsModalProvider>{children}</ScannerOptionsModalProvider>
    </HistoryLinkScannedProvider>
  );
};

export { AppProvider };

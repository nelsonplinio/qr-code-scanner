import React from 'react';

import { FavorityProvider } from './favorityLinks';
import { HistoryLinkScannedProvider } from './historyLinkScanned';
import { ScannerOptionsModalProvider } from './scannedOptionsModal';

const AppProvider: React.FC = ({ children }) => {
  return (
    <FavorityProvider>
      <HistoryLinkScannedProvider>
        <ScannerOptionsModalProvider>{children}</ScannerOptionsModalProvider>
      </HistoryLinkScannedProvider>
    </FavorityProvider>
  );
};

export { AppProvider };

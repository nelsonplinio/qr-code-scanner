import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';

import { ScannerOptionsModalProvider } from './src/hooks/scannedOptionsModal';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#24292e" style="light" />
      <ScannerOptionsModalProvider>
        <Routes />
      </ScannerOptionsModalProvider>
    </>
  );
};

export { App };

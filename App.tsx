import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';

import { AppProvider } from './src/hooks';
import { UpdateModal } from './src/components/UpdateModal';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#24292e" style="light" />
      <AppProvider>
        <Routes />
        <UpdateModal />
      </AppProvider>
    </>
  );
};

export { App };

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/Routes';

import { AppProvider } from './src/hooks';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#24292e" style="light" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export { App };

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Routes } from './src/Routes';

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#24292e" style="light" />
      <Routes />
    </>
  );
};

export { App };

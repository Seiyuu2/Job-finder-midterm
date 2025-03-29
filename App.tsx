// App.tsx
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeContext';
import { SavedJobsProvider } from './context/SavedJobsContext';

export default function App() {
  return (
    <ThemeProvider>
      <SavedJobsProvider>
        <AppNavigator />
      </SavedJobsProvider>
    </ThemeProvider>
  );
}

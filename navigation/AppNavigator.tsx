// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import { ThemeContext } from '../context/ThemeContext';

export type RootStackParamList = {
  JobFinderScreen: undefined;
  SavedJobsScreen: undefined; // updated: no parameter needed now
  ApplicationFormScreen: { job?: any; fromSaved?: boolean } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="JobFinderScreen"
          component={JobFinderScreen}
          options={{
            title: 'Job Finder',
            headerRight: () => (
              <HeaderThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            ),
          }}
        />
        <Stack.Screen
          name="SavedJobsScreen"
          component={SavedJobsScreen}
          options={{ title: 'Saved Jobs' }}
        />
        <Stack.Screen
          name="ApplicationFormScreen"
          component={ApplicationFormScreen}
          options={{ title: 'Apply' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import { TouchableOpacity, Text } from 'react-native';
type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const HeaderThemeToggle: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => (
  <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
    <Text style={{ color: isDarkMode ? '#FFF' : '#007bff' }}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Text>
  </TouchableOpacity>
);

export default AppNavigator;

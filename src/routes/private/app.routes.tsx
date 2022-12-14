/* Rotas publicas */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../../pages/Home';

const App = createNativeStackNavigator();

export const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="SignIn" component={Home} />
    </App.Navigator>
  );
};

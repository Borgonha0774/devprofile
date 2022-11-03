import React from 'react';
import { Home } from './src/pages/Home';
/* Acesso ao tema global no app */
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';

/* Importar fontes para uso global */
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

const App: React.FunctionComponent = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;

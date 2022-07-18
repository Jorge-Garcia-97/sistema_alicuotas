import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { AppRouter } from './routes/AppRouter';
import { Provider } from "react-redux";
import { store } from "./reducer/store";

function App() {
  return (
    <ChakraProvider theme={theme}>      
        <Provider store={store}>
          <AppRouter />
        </Provider>    
    </ChakraProvider>
  );
}

export default App;

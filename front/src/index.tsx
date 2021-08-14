import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { createTheme, ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import App from './App';
import store from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#317bda',
    },
    secondary: {
      main: '#31cfda',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

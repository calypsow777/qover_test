import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import App from './App';

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
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

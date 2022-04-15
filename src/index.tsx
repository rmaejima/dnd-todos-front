import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ress';
import './global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import * as theme from 'utils/theme';
import { Router } from 'Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
    <ToastContainer autoClose={1000} />
  </React.StrictMode>,
);

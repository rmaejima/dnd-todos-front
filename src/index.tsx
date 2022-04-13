import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ress';
import './global.css';
import { ThemeProvider } from 'styled-components';

import App from './App';
import * as theme from 'utils/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

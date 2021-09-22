import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';
import './App.css';

dotenv.config();

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

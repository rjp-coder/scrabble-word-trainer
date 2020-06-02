import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

import '../styles/index.css';
import '../styles/menu.css';
import '../styles/gapFillQuiz.css';

ReactDOM.hydrate(
  <App initialData={window.__R_DATA.initialData} />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Web3OnboardProvider } from '@web3-onboard/react';

import './index.css';
import App from './components/App';
import web3Onboard from './web3-onboard';

ReactDOM.render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

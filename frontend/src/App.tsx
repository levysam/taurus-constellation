import React from 'react';
import { setConfiguration } from 'react-grid-system';
import './styles/global.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

setConfiguration({
  gutterWidth: 20,
});

const App: React.FC = () => (
  <Router>
    <Routes />
  </Router>
);

export default App;

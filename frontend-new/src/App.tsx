import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import FingermanRun from './Fingerman'


ReactDOM.render(
  <FingermanRun width="700" height="300" speed="10" />
  ,
  document.getElementById('root')
);

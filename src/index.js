import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { connect } from './database';

async function start() {
  const db = await connect();
  const app = <App db={db} />;
  ReactDOM.render(app, document.getElementById('root'));
  registerServiceWorker();
}

start();

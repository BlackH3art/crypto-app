import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { TransactionProvider } from './context/TransactionContext'
import { IcoProvider } from './context/IcoContext';

ReactDOM.render(
  <TransactionProvider>
    <IcoProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </IcoProvider>
  </TransactionProvider>,
  document.getElementById('root')
)

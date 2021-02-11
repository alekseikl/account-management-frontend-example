import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TransactionsPage from './TransactionsPage'

function App() {
  return (
    <Provider store={store}>
      <TransactionsPage />
    </Provider>
  )
}

export default App;

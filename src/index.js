import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//cấu hình redux
import {rootReducer} from './redux/rootReducer';
//provider là component kết nối redux store vs component react
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();

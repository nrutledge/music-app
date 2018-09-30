import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import App from './components/Studio/Studio';
import reducer from './reducers/index.js';
//import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);
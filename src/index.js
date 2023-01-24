import React, {Suspense , useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css';
import './i18next'
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/index";

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter>
      <Suspense fallback={(<div>Loading ...</div>)}>
          <App />
          </Suspense>
      </BrowserRouter>
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

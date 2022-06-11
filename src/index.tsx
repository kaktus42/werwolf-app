import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
import reducer from "./reducers";

import './index.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

declare let window: any;

const store = configureStore({
  reducer,
  devTools: true
})

const renderReactDom = () => {
  const container = document.getElementById('root');
  const mainJsx = (
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>
  );

  ReactDOM.render(mainJsx, container);

  // const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  // root.render(mainJsx);
};

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  }, false);
} else {
  renderReactDom();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

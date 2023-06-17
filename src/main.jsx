import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-right" />
  </Provider>
  // </React.StrictMode>
);

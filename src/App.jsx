import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import RouterComponent from './routers';
import config from './config';
import { gapi } from 'gapi-script';
import isDarkMode from './utils/isDarkMode';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks';

function App() {
  const [color] = useLocalStorage('primary-color', '#ffa500');
  document.querySelector(':root').style.setProperty('--primary-color', `${color}`);

  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: config.CLIENT_ID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  return <RouterComponent />;
}

export default App;

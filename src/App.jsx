import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import RouterComponent from './routers';
import { CLIENT_ID } from './config';
import { useLocalStorage } from './hooks';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

function App() {
  const [color, setColor] = useLocalStorage('primary-color', '#ffa500');
  document.querySelector(':root').style.setProperty('--primary-color', `${color}`);

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: CLIENT_ID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  return <RouterComponent />;
}

export default App;

import React, { useEffect } from 'react';
import RouterComponent from './routers';
import { useLocalStorage } from './hooks';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

function App() {
  const [color, _] = useLocalStorage('primary-color', '#ffa500');
  document.querySelector(':root').style.setProperty('--primary-color', `${color}`);

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return <RouterComponent />;
}

export default App;

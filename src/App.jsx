import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import RouterComponent from './routers';
import { CLIENT_ID } from './config';

function App() {
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

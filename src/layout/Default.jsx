import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Sidebar, Header } from '../components';
import { useLocalStorage } from '../hooks';
import { colorSelector } from '../app/primaryColorSlice';
import { useSelector } from 'react-redux';

const DefaultLayout = ({ children }) => {
  const [open, _] = useState(false);

  const color = useSelector(colorSelector);
  const theme = useLocalStorage('theme', 'light')[0];

  return (
    <>
      <div
        className={`flex w-screen min-h-full dark:bg-slate-900 text-black dark:text-white`}
        style={{ background: theme === 'light' && color + '33' }}
      >
        <Sidebar open={open} className={clsx(open && '!block')} />
        <div className="ml-0 h-screen flex-1 items-start sm:ml-16 md:ml-64 overflow-x-hidden">
          <Header />
          <div
            className={`w-full min-h-full py-3 px-12 flex-1 dark:bg-slate-900 overflow-x-hidden`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;

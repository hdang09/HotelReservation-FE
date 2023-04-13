import React, { useState } from 'react';
import clsx from 'clsx';

import { Sidebar, Header } from '../components';
import { colorSelector, themeSelector } from '../app/settingsSlice';
import { useSelector } from 'react-redux';

const DefaultLayout = ({ children }) => {
  const [open, _] = useState(false);

  const color = useSelector(colorSelector);
  const theme = useSelector(themeSelector);

  return (
    <>
      <div
        className={`flex w-screen min-h-full bg-white dark:bg-slate-900 text-black dark:text-white`}
      >
        <Sidebar open={open} className={clsx(open && '!block')} />
        <main
          className="pb-16 sm:pb-0 ml-0 h-screen flex-1 items-start sm:ml-16 md:ml-64 overflow-x-hidden"
          style={{ background: theme === 'light' && color + '33' }}
        >
          <Header />
          <section
            className={`w-full py-3 px-6 md:px-12 flex-1 dark:bg-slate-900 overflow-x-hidden`}
          >
            {children}
          </section>
        </main>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;

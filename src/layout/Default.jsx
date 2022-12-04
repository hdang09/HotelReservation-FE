import React, { useState } from 'react';
import clsx from 'clsx';

import { Sidebar, Header } from '../components';

const DefaultLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-screen min-h-full bg-[#EEF0F4] dark:bg-slate-900 text-black dark:text-white">
        <Sidebar open={open} className={clsx(open && '!block')} />
        <div className="ml-0 h-screen flex-1 items-start sm:ml-16 md:ml-64 overflow-x-hidden">
          <Header />
          <div className="w-full min-h-full p-5 flex-1 bg-[#EEF0F4] dark:bg-slate-900 overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;

import React, { useState } from 'react';
import clsx from 'clsx';

import { Sidebar, Header } from '../components';

const DefaultLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex w-screen">
        <Sidebar open={open} className={clsx(open && '!block')} />
        <div className="ml-0 h-screen flex-1 items-start sm:ml-16 md:ml-64">
          <Header />
          <div className="w-full h-full p-5 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;

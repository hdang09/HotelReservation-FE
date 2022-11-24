import React from 'react';
import { Toggle, Input } from '../components';

const Settings = () => {
  const [color, setColor] = React.useState('#ffa500');
  return (
    <>
      <div className="flex items-center my-4">
        <h2 className="inline-block mr-2 font-bold">Dark Theme</h2>
        <Toggle />
      </div>
      <div className="flex items-center my-4">
        <h2 className="inline-block mr-2 font-bold">Change default color: </h2>
        <input type="color" className="w-10 h-10" value={color} />
        <Input noLabel value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className="flex items-center my-4">
        <a className="inline-block mr-2 font-bold text-black">Reset to default color: </a>
      </div>
    </>
  );
};

Settings.propTypes = {};

export default Settings;

import React, { useEffect } from 'react';
import { TbPaint, TbPaintOff } from 'react-icons/tb';
import { Input } from '../components';
import { useLocalStorage } from '../hooks';

const Settings = () => {
  const [color, setColor] = useLocalStorage('primary-color', '#ffa500');
  useEffect(() => {
    document.querySelector(':root').style.setProperty('--primary-color', `${color}`);
  }, [color]);

  const resetDefault = () => setColor('#ffa500');

  return (
    <>
      <div className="block max-w-[35rem] bg-white p-4 rounded-lg drop-shadow m-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {/* <div className="flex items-center my-4">
          <h2 className="inline-block mr-2 font-medium">Dark Theme</h2>
          <Toggle />
        </div> */}

        <div className="flex items-center my-4">
          <h2 className="inline-flex items-center mr-2 font-medium">
            <TbPaint /> <span className="mx-2">Change default color:</span>
          </h2>
          <input
            type="color"
            className="w-10 h-10"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Input noLabel value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className="flex items-center my-4">
          <a
            className="inline-flex items-center mr-2 font-medium text-black cursor-pointer"
            onClick={resetDefault}
          >
            <TbPaintOff /> <span className="mx-2">Reset to default color:</span>
          </a>
        </div>
      </div>
    </>
  );
};

Settings.propTypes = {};

export default Settings;

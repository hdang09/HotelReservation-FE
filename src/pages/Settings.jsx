import React, { useEffect, useState } from 'react';
import { TbPaint, TbPaintOff, TbSun, TbMoon } from 'react-icons/tb';
import { RiComputerLine } from 'react-icons/ri';
import { Input } from '../components';
import { useLocalStorage } from '../hooks';
import { useDispatch } from 'react-redux';
import { set } from '../app/primaryColorSlice';
const Settings = () => {
  const [color, setColor] = useLocalStorage('primary-color', '#ffa500');
  const [reRender, setReRender] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector(':root').style.setProperty('--primary-color', `${color}`);
    dispatch(set(color));
  }, [color]);

  const resetDefault = () => setColor('#ffa500');

  const THEMES = [
    {
      name: 'Light',
      icon: <TbSun />,
      isActive: localStorage.theme === 'light',
      onClick() {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        setReRender(!reRender);
      },
    },
    {
      name: 'Dark',
      icon: <TbMoon />,
      isActive: localStorage.theme === 'dark',
      onClick() {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        setReRender(!reRender);
      },
    },
    {
      name: 'System',
      icon: <RiComputerLine />,
      isActive: localStorage.theme === undefined,
      onClick() {
        localStorage.removeItem('theme');
        setReRender(!reRender);

        if (
          localStorage.theme === 'dark' ||
          (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    },
  ];

  return (
    <>
      <div className="block max-w-[35rem] bg-white dark:bg-slate-800 p-6 rounded-xl drop-shadow-lg m-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="flex justify-center my-4 flex-col">
          <div className="inline-flex items-center mr-2 font-medium text-black dark:text-white">
            <TbSun /> <h2 className="mx-2">Theme</h2>
          </div>
          <div className="flex justify-between">
            {THEMES.map((theme) => {
              const active = theme.isActive ? 'bg-primary text-white' : 'border-primary border-2';
              return (
                <div
                  key={theme.name}
                  className={`${active} flex items-center w-[30%] border-dashed px-4 py-2  hover:opacity-80 cursor-pointer`}
                  onClick={theme.onClick}
                >
                  {theme.icon} <span className="px-2">{theme.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center my-4">
          <div className="inline-flex items-center mr-2 font-medium text-black dark:text-white">
            <TbPaint /> <h2 className="mx-2 ">Default color:</h2>
          </div>
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
            className="inline-flex items-center mr-2 font-medium text-black dark:text-white cursor-pointer"
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

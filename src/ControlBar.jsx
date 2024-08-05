import React from 'react';

function ControlBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white p-4 transition-transform duration-300 ${
        isOpen ? 'transform translate-y-0' : 'transform translate-y-full'
      }`}
    >
      <div className="flex justify-around">
        <button className="bg-blue-500 p-2 rounded">Button 1</button>
        <button className="bg-blue-500 p-2 rounded">Button 2</button>
        <button className="bg-blue-500 p-2 rounded">Button 3</button>
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={() => setIsOpen(false)}
      >
        Close Controls
      </button>
    </div>
  );
}

export default ControlBar;

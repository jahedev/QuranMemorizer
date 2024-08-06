import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  ExpandOutlined,
  ArrowsAltOutlined,
  CopyOutlined,
  CopyFilled,
} from "@ant-design/icons";

function ControlBar({
  isOpen,
  setIsOpen,
  isSinglePage,
  togglePageMode,
  extendHeight,
  toggleExtendHeight,
  nextPage,
  prevPage,
  rightPage,
  leftPage,
  setRightPage,
}) {
  const inputRef = useRef(null);

  const handleChangePageNumber = (event) => {
    let page = parseInt(event.target.value, 10);
    if (isNaN(page) || page < 1) setRightPage(1);
    else if (page > 603) {
      if (isSinglePage) setRightPage(604);
      else setRightPage(603);
    } else setRightPage(page);
  };

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current.select();
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("focus", handleFocus);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex flex-col gap-5 justify-center bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white p-4 transition-transform duration-300 ${
        isOpen ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      <div className='flex justify-center items-center gap-4'>
        <select
          id='surah-select'
          name='surah-select'
          className='bg-white dark:bg-gray-800 border dark:text-gray-100   border-gray-300 text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base lg:text-lg'
        >
          <option data-page-number='1' value='surah-1'>
            Al-Fatihah (The Opening)
          </option>
        </select>
        <input
          id='page-number'
          type='number'
          autoComplete='off'
          placeholder='1-604'
          className='w-20 bg-white dark:bg-gray-800 border dark:text-gray-100   border-gray-300 text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base lg:text-lg'
          value={rightPage}
          onChange={handleChangePageNumber}
          ref={inputRef}
        ></input>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <Button text={<StepBackwardOutlined />} onClick={nextPage} />
        <Button text={<StepForwardOutlined />} onClick={prevPage} />
        <Button
          text={isSinglePage ? <CopyOutlined /> : <CopyFilled />}
          onClick={togglePageMode}
        />
        <Button text={<ArrowsAltOutlined />} onClick={toggleExtendHeight} />
        <Button text={<ExpandOutlined />} onClick={() => toggleFullScreen()} />
      </div>
      <div className='flex justify-center items-center px-3 pb-3'>
        <Button
          bgColor='bg-red-500 w-7/12'
          text='Close Controls'
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

ControlBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isSinglePage: PropTypes.bool.isRequired,
  togglePageMode: PropTypes.func.isRequired,
  extendHeight: PropTypes.bool.isRequired,
  setExtendHeight: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  rightPage: PropTypes.number.isRequired,
  leftPage: PropTypes.number.isRequired,
  setRightPage: PropTypes.func.isRequired,
};

export default ControlBar;

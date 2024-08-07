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
import SurahSelector from "./SurahSelector";
import { getPageBySurah } from "../utils/quranUtils";

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
  surahNumber
}) {
  const inputRef = useRef(null);

  const changePage = (pageNumber) => {
    if (isNaN(pageNumber) || pageNumber < 1) setRightPage(1);
    else if (pageNumber > 603) {
      if (isSinglePage) setRightPage(604);
      else setRightPage(603);
    } else if (!isSinglePage && pageNumber % 2 == 0) setRightPage(pageNumber-1)
    else setRightPage(pageNumber);
  }

  const handleChangePageNumber = (event) => {
    let pageNumber = parseInt(event.target.value, 10);
    changePage(pageNumber)
  };

  const hideKeyboard = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.blur();
    }
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
        <SurahSelector pageNumber={rightPage} changePage={changePage} />
        <input
          id='page-number'
          type='number'
          autoComplete='off'
          placeholder='1-604'
          onKeyDown={hideKeyboard}
          step={isSinglePage ? '1' : '2'}
          className='w-20 bg-white dark:bg-gray-800 border dark:text-gray-100   border-gray-300 text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm md:text-base lg:text-lg'
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
          bgColor='bg-red-500 w-7/12 sm:w-5/12 lg:w-1/4 hover:border-gray-200'
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
  toggleExtendHeight: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  rightPage: PropTypes.number.isRequired,
  leftPage: PropTypes.number.isRequired,
  setRightPage: PropTypes.func.isRequired,
  surahNumber: PropTypes.number.isRequired
};

export default ControlBar;

import { ControlFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Button from "./components/Button";
import ControlBar from "./components/ControlBar";
import Page from "./components/Page";
import useLocalStorage from "./hooks/useLocalStorage";
import {getSurahByPage} from "./utils/quranUtils"

function App() {
  const [isOpen, setIsOpen] = useLocalStorage("isOpen", false);
  // const [isOpen, setIsOpen] = useState(false);
  const [extendHeight, setExtendHeight] = useLocalStorage(
    "extendHeight",
    false
  );
  const [isSinglePage, setIsSinglePage] = useLocalStorage("isSinglePage", true);
  const [rightPage, setRightPage] = useLocalStorage("rightPage", 1);
  // const [rightPage, setRightPage] = useState(1);
  const leftPage = rightPage + 1 <= 604 ? rightPage + 1 : 604;
  const surahNumber = getSurahByPage(rightPage);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'd') {
      prevPage();
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      nextPage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextPage = () => {
    if (isSinglePage) {
      setRightPage((prev) => (prev < 604 ? prev + 1 : 604));
    } else {
      setRightPage((prev) => (prev + 2 <= 603 ? prev + 2 : 603));
    }
  };

  // Function to navigate to the previous page(s)
  const prevPage = () => {
    if (isSinglePage) {
      setRightPage((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setRightPage((prev) => (prev - 2 >= 1 ? prev - 2 : 1));
    }
  };

  const togglePageMode = () => {
    if (isSinglePage && rightPage >= 604) setRightPage(() => 603);
    if (isSinglePage && rightPage % 2 == 0)
      setRightPage((prev) => (prev - 1 >= 1 ? prev - 1 : 1));
    setIsSinglePage(!isSinglePage);
  };

  const toggleExtendHeight = () => {
    setExtendHeight(!extendHeight);
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => prevPage(),
    onSwipedRight: () => nextPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // To enable swipe handling with mouse events for testing
  });

  return (
    <>
      <div
        {...swipeHandlers}
        className={
          "quran-memorizer bg-slate-300 dark:bg-slate-700 flex flex-col justify-center items-center w-screen object-contain " +
          (extendHeight ? "overflow-y-auto w-screen" : "min-h-screen h-screen")
        }
      >
        <div
          id='image-container'
          className='image-container flex justify-center items-center w-full h-full box-border'
        >
          {!isSinglePage && (
            <Page
              rightSide={false}
              pageNumber={leftPage}
              halfWidth={isSinglePage}
              extendHeight={extendHeight}
            />
          )}
          <Page
            rightSide={true}
            halfWidth={isSinglePage}
            pageNumber={rightPage}
            extendHeight={extendHeight}
          />
        </div>
        {/* Open Control Bar using Button  */}
        {!isOpen && (
          <Button
            text={<ControlFilled />}
            onClick={() => setIsOpen(true)}
            bgColor='bg-sky-600 text-2xl text-white px-2 py-1 fixed bottom-4 right-4 shadow-lg'
          />
        )}
        <ControlBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          extendHeight={extendHeight}
          toggleExtendHeight={toggleExtendHeight}
          isSinglePage={isSinglePage}
          togglePageMode={togglePageMode}
          nextPage={nextPage}
          prevPage={prevPage}
          rightPage={rightPage}
          leftPage={leftPage}
          setRightPage={setRightPage}
          surahNumber={surahNumber}
        />
      </div>
    </>
  );
}

export default App;

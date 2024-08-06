import { useState } from "react";
import ControlBar from "./components/ControlBar";
import { UpCircleOutlined } from "@ant-design/icons";
import Page from "./components/Page";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSwipeable } from "react-swipeable";

function App() {
  const [isOpen, setIsOpen] = useLocalStorage("isOpen", false);
  const [extendHeight, setExtendHeight] = useLocalStorage(
    "extendHeight",
    false
  );
  const [isSinglePage, setIsSinglePage] = useLocalStorage("isSinglePage", true);
  const [rightPage, setRightPage] = useState(1);
  const leftPage = rightPage + 1 <= 604 ? rightPage + 1 : 604;

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
    if (isSinglePage && rightPage >= 604) setRightPage(603);
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
      {/* full width: quran-memorizer bg-slate-300 dark:bg-slate-700 flex flex-col justify-center items-center overflow-y-auto w-screen */}
      <div
        {...swipeHandlers}
        className={
          "quran-memorizer bg-slate-300 dark:bg-slate-700 flex flex-col justify-center items-center w-screen object-contain " +
          (extendHeight ? "overflow-y-auto w-screen" : "min-h-screen h-screen")
        }
      >
        {/* image-container when full width: add max-w-7xl */}
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
          <button
            className='bg-blue-500 text-white p-3 pl-4 pr-4 fixed bottom-4 right-4 shadow-lg'
            onClick={() => setIsOpen(true)}
          >
            <UpCircleOutlined />
          </button>
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
        />
        {/* <div className="controls">
          <button id="next-page" className="nav-button">&#x2B05; Next</button>
          <button id="prev-page" className="nav-button">Previous &#x27A1;</button>
          <button id="single-page" className="nav-button">&#x1F4C4; Single</button>
          <button id="full-screen" className="nav-button">&#x26F6; Fullscreen</button>
          <select id="surah-select" name="surah-select">
            <option data-page-number="1" value="surah-1">Al-Fatihah (The Opening)</option>
          </select>
          <input id="page-number" type="number" autoComplete="off" placeholder="1-604" value="1"></input>
        </div> */}
      </div>
    </>
  );
}

export default App;

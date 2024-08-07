import PropTypes from "prop-types";
import { useState } from "react";

import { surahNames, getSurahByPage, getPageBySurah } from "../utils/quranUtils";

export default function SurahSelector({pageNumber, changePage}) {

  const [surahNumber, setSurahNumber] = useState(getSurahByPage(pageNumber))

  const handleSurahChange = (event) => {
    event.preventDefault();
    const newSurahNumber = Number(event.target.value);
    setSurahNumber(newSurahNumber);
    console.log(`surah change: surah- ${newSurahNumber}, page-${getPageBySurah(Number(newSurahNumber))}`);
    changePage(getPageBySurah(newSurahNumber));
  };

  // const handleSurahChange = (event) => {
  //   const newSurahNumber = parseInt(event.target.value);
  //   console.log('New Surah Number:', newSurahNumber);
    
  //   setSurahNumber(newSurahNumber);
    
  //   const newPageNumber = getPageBySurah(newSurahNumber);
  //   console.log('New Page Number:', newPageNumber);
    
  //   changePage(newPageNumber);
  // };
  

  return (
    <>
      <select
        id='surah-select'
        name='surah-select'
        value={surahNumber}
        onChange={handleSurahChange}
        className='bg-white dark:bg-gray-800 border dark:text-gray-100 border-gray-300 text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm md:text-base lg:text-lg w-48 md:w-64'
      >
        {surahNames.map((surah, index) => (
          <option key={index} value={index + 1}>
            {index + 1}. {surah}
          </option>
        ))}
      </select>
    </>
  );
}

SurahSelector.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

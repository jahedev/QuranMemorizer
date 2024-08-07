import React from "react";
import PropTypes from "prop-types";

import { surahNames, getSurahByPage, getPageBySurah } from "../utils/quranUtils";

export default function SurahSelector({surahNumber, surahChanged}) {

  const handleSurahChange = (event) => {
    surahChanged(Number(event.target.value));
  };

  return (
    <>
      <select
        id='surah-select'
        name='surah-select'
        value={surahNumber}
        onChange={handleSurahChange}
        className='bg-white dark:bg-gray-800 border dark:text-gray-100   border-gray-300 text-gray-700 py-1 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm md:text-base lg:text-lg w-48 md:w-64'
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
  surahNumber: PropTypes.number.isRequired,
  surahChanged: PropTypes.func.isRequired
};

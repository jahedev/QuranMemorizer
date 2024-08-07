// Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, bgColor }) => {
  if (typeof bgColor !== 'string') bgColor = 'bg-sky-600'
  return (
    <button onClick={onClick} className={'nav-button text-white font-bold py-2 px-4 rounded text-sm md:text-base lg:text-lg transition duration-300 ease-in-out transform hover:scale-105 ' + bgColor}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string
};

export default Button;

import React from "react";
import { UserContext } from "../main";
import { useContext } from "react";
import PropTypes from 'prop-types';

function Page({
  rightSide = false,
  pageNumber = 1,
  extendHeight = false,
  halfWidth = true,
}) {


  const { pages_location } = useContext(UserContext);
  const side = rightSide ? 'right' : 'left';
  return (
    <>
      <img
        id={side + "-page"}
        className={
          "page-image select-none object-" +
          side +
          (extendHeight
            ? " box-border m-0 object-contain "
            : "  box-border m-0 h-screen object-contain") +
          (halfWidth ? "" : " max-w-1/2")
        }
        src={
          pages_location +
          "tajweed-" +
          pageNumber.toString().padStart(3, "0") +
          ".jpg"
        }
      />
    </>
  );
}

Page.propTypes = {
  rightSide: PropTypes.bool,
  pageNumber: PropTypes.number.isRequired,
  extendHeight: PropTypes.bool,
  halfWidth: PropTypes.bool,
};

export default Page;
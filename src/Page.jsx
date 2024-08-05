import React from "react";
import { UserContext } from './main'
import { useContext } from "react";

export default function Page({ side = "right", pageNumber=1, extendHeight=false, halfWidth=true}) {
  const { pages_location } = useContext(UserContext);
  return (
    <>
      <img
        id={side + '-page'}
        className={'page-image object-' + {side} + (extendHeight ? ' box-border m-0 object-contain' : '  box-border m-0 max-h-full max-w-1/2 object-contain') + halfWidth && 'max-w-1/2'}
        src={pages_location + '/tajweed-' + pageNumber.toString().padStart(3, '0') + '.jpg'}
      />
    </>
  );
}

/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import SideBar from '../utilites/SideBar';
import ShortsShow from './Shorts/ShortsShow';

function ShortsPage(){

  return (
    <div>
      <SideBar/>
      <ShortsShow/>
    </div>
  )
}

export default ShortsPage;
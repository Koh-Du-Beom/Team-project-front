/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SideBar from '../utilites/SideBar';
import HomeYoutubeUI from './Home/HomeYoutubeUI';
import HomeShortsUI from './Home/HomeShortsUI';

function HomePage(){

  return (
    <div>
      <SideBar/>
      <HomeYoutubeUI/>
      <HomeShortsUI/>
    </div>
  )
}

export default HomePage;
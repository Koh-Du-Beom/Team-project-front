/*eslint-disable*/
import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import NavBarIcon from '../../utilites/NavBarIcon';
import getYoutubeData from './getYoutubeData';

const ShortsContainer = styled.div`
  margin-top: 10px;
  padding-top: 20px;
  position: relative;
`

const ShortsLogo = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
`

const GridContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  padding: 1rem;
  max-width: 100%;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  overflow: hidden;
  position: relative;
  aspect-ratio: 9 / 16;
  width: 100%;
  background-color: #000; // 로딩 중이거나 이미지가 없을 때의 배경색
  border-radius: 8px; // 영상의 모서리를 둥글게 처리
  margin-bottom: 1rem; // 영상 간의 간격 조정

  // 화면 크기에 따른 유연한 크기 조정을 위한 미디어 쿼리
  @media (max-width: 299px) {
    min-width: 100px; // 매우 작은 화면에서의 최소 가로 크기 조정
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius:50%;
  margin-right:8px;
`

const StyledYouTube = styled(YouTube)`
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;


const VideoContainer = styled.div`
  background: rgba(0, 0, 0, 0);
  color: black;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const VideoTitleWrapper = styled.div`
  flex: 1; /* Take remaining space */
  display: flex;
  flex-direction: column;
  margin-left: 8px; 
  overflow: hidden;
  `;

const VideoTitle = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-line; 
`;

const VideoInfo = styled.div`
  font-size: 13px;
  color: gray;
  display: flex;
  align-items: center;
`;
const UploaderText = styled.span`
  margin-right: 8px;
`;

function HomeShortsUI() {
  
  const {shortsData : videoInfo} = getYoutubeData(); 

  const playersRef = useRef({});
  const timeoutsRef = useRef({});

  const onReady = (event, id) => {
    playersRef.current[id] = event.target;
  }

  const onMouseEnter = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }
    timeoutsRef.current[id] = setTimeout(() => {
      playersRef.current[id]?.playVideo();
    }, 300); // Delay playing video for 1 second after mouse enter
  };

  const onMouseLeave = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      timeoutsRef.current[id] = null;
    }
    playersRef.current[id]?.stopVideo(); // Pause the video instead of stopping
  };

  const opts = {
    playerVars: {
      autoplay: 0, // Disable autoplay to prevent the video from playing on load
      modestbranding: 1, // Hide the Youtube logo as much as possible
      controls: 0, // Hide all video controls
      disablekb: 1, // Disable keyboard controls
      fs: 0, // Hide the full screen button
      iv_load_policy: 3, // Hide video annotations by default
      showinfo: 0, // Hide video title and uploader before video starts playing
      rel: 0, // Do not show related videos when playback ends
      origin: 'https://localhost:3000'
    },
  };

  return (
    <ShortsContainer>
      <ShortsLogo>
        <NavBarIcon
          src = "../../../images/shorts.svg"
          alt = "shortslogo"
        />Shorts
      </ShortsLogo>
      

      <GridContainer>
  {videoInfo.map((data) => (
    <div key={data.id}>
      <VideoWrapper
        onMouseEnter={() => onMouseEnter(data.id)}
        onMouseLeave={() => onMouseLeave(data.id)}
      >
        <StyledYouTube
          videoId={data.videoId}
          opts={opts}
          onReady={(event) => onReady(event, data.id)}
        />
      </VideoWrapper>
      <VideoContainer>
        <ProfileImage src={data.profile} alt="profile" />
        <VideoTitleWrapper>
          <VideoTitle>{data.title}</VideoTitle>
          <VideoInfo>
            <UploaderText>{data.uploader}</UploaderText>
            · {data.viewCount}
          </VideoInfo>
        </VideoTitleWrapper>
      </VideoContainer>
    </div>
  ))}
</GridContainer>
    </ShortsContainer>
    
  );
}

export default HomeShortsUI;

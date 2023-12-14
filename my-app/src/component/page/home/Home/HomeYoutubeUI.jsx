/*eslint-disable*/
import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import getYoutubeData from './getYoutubeData';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const VideoWrapper = styled.div`
display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  margin: 15px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius:50%;
  margin-right:8px;
`


const StyledYouTube = styled(YouTube)`
  iframe {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @media (min-width: 768px) {
      /* Adjust height for screens 768 pixels and larger */
      height: 250px; /* Adjust this value as needed */
    }

    @media (min-width: 1024px) {
      /* Adjust height for screens 1024 pixels and larger */
      height: 300px; /* Adjust this value as needed */
    }
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

function HomeYoutubeUI() {
  const {longData : videoInfo} = getYoutubeData();
  
  const playersRef = useRef({});
  const timeoutsRef = useRef({});

  const onReady = (event, id) => {
    playersRef.current[id] = event.target;
  };

  const onMouseEnter = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }
    timeoutsRef.current[id] = setTimeout(() => {
      playersRef.current[id]?.playVideo();
    }, 300);
  };

  const onMouseLeave = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      timeoutsRef.current[id] = null;
    }
    playersRef.current[id]?.stopVideo();
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
    <GridContainer>
      {videoInfo.map((data) => (
        <VideoWrapper
          key={data.id}
          onMouseEnter={()=> onMouseEnter(data.id)}
          onMouseLeave={()=> {onMouseLeave(data.id)}}
        >
          <StyledYouTube
            videoId={data.videoId}
            opts={opts}
            onReady={(event) => onReady(event, data.id)}
          />
          <VideoContainer>
            <ProfileImage src={data.profile} alt="Profile"/>
            <VideoTitleWrapper>
              <VideoTitle>{data.title}</VideoTitle>
              <VideoInfo>
                <UploaderText>{data.uploader}</UploaderText>
                · {data.viewcount}
              </VideoInfo>
            </VideoTitleWrapper>
          </VideoContainer>

        </VideoWrapper>
      ))}
     
    </GridContainer>
  );
}

export default HomeYoutubeUI;
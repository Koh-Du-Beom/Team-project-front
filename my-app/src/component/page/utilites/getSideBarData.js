/*eslint-disable*/

const getSideBarData = (navigate) => {
  return {
    navItems : [
      {
        id: 1,
        src: "../../../images/homeIcon.png",
        alt: "homeIcon",
        content: 'Home',
        onClick: ()=>{navigate('/home')}
      },
      {
        id: 2,
        src: "../../../images/shorts.svg",
        alt: "shortslogo",
        content: 'Shorts',
        onClick: ()=>{navigate('/shorts')}
      }
    ],
    dropdownNavItems : [
      {
        id: 1,
        src: "../../../images/gameIcon.png",
        alt: "gameIcon",
        content: '게임',
      },
      {
        id: 2,
        src: "../../../images/sportsIcon.png",
        alt: "sportsIcon",
        content: '스포츠',
      },
      {
        id: 3,
        src: "../../../images/studyIcon.png",
        alt: "studyIcon",
        content: "학습",
      },
      {
        id: 4,
        src: "../../../images/musicIcon.png",
        alt: "musicIcon",
        content: '음악',
      },
      {
        id: 5,
        src: "../../../images/movieIcon.png",
        alt: "movieIcon",
        content: '영화',
      },
      {
        id: 6,
        src: "../../../images/shoppingIcon.png",
        alt: "shoppingIcon",
        content: '쇼핑',
      },
    ],
  }
}



export default getSideBarData;
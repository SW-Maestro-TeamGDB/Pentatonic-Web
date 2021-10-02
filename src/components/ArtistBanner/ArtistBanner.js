import styled from 'styled-components';
import { Carousel } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import ArtistBannerContents from '../ArtistBannerContents/ArtistBannerContents';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const ArtistBanner = () => {
  const tempData = [
    {
      id: 1,
      name: '무지성 밴드',
      title: 'Han',
      singer: 'Berhana',
      image: 'https://i.ytimg.com/vi/Chezi1Ojjtc/maxresdefault.jpg',
      type: 'band',
    },
    {
      id: 2,
      title: '이종민',
      singer: '@jongmin',
      image:
        'https://penta-tonic.s3.ap-northeast-2.amazonaws.com/1630505095528-jongminfire.jpeg',
      type: 'artist',
    },
    {
      id: 3,
      name: '박지성 밴드',
      title: 'Something About Us',
      singer: 'Daft Punk',
      image: 'https://pbs.twimg.com/media/Eu4zvhKWgAM85gy.jpg:large',
      type: 'band',
    },
    {
      id: 2,
      title: '고대백',
      singer: '@GDB',
      image:
        'https://avatars.githubusercontent.com/u/86421641?s=400&u=86dd054aeb4b0f6c1988509261e7e84437f360e0&v=4',
      type: 'artist',
    },
  ];

  const showContents = () => {
    return Array.from({ length: 4 }, () => 0).map((v, i) => {
      return <ArtistBannerContents data={tempData[i]} />;
    });
  };

  return (
    <BannerContainer>
      <CustomCarousel dotPosition="bottom" autoplay>
        {showContents()}
      </CustomCarousel>
    </BannerContainer>
  );
};

const CustomCarousel = styled(Carousel)`
  width: 100%;
  height: 16vw;
  position: relative;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  cursor: pointer;

  border-radius: 15px;
  overflow: hidden;
`;

export default ArtistBanner;

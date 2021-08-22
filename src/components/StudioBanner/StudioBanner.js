import react from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import StudioBannerContents from '../StudioBannerContents/StudioBannerContents';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const StudioBanner = () => {
  const tempData = [
    {
      id: 1,
      title: 'Han',
      singer: 'Berhana',
      image: 'https://i.ytimg.com/vi/Chezi1Ojjtc/maxresdefault.jpg',
    },
    {
      id: 2,
      title: 'Roll',
      singer: 'The Internet',
      image:
        'https://w.namu.la/s/6397238de77fb85cfc7fecbb63f01136119bf5fda326c451ee51f93e3dfbb1553fbf1839dbeab17f4a71deea38ab81175aeaf260754afb59927e4272852cc70666ec4ff05337e77f9b908e5370f8b8c07953f6120223307ab46f67744ea15f75',
    },
    {
      id: 3,
      title: 'Something About Us',
      singer: 'Daft Punk',
      image: 'https://pbs.twimg.com/media/Eu4zvhKWgAM85gy.jpg:large',
    },
    {
      id: 4,
      title: 'Fix You',
      singer: 'Coldplay',
      image:
        'https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2912,h_1456,c_limit/coldplay.jpg',
    },
  ];

  const showContents = () => {
    return Array.from({ length: 4 }, () => 0).map((v, i) => {
      return <StudioBannerContents data={tempData[i]} />;
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
  height: 22vw;
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

export default StudioBanner;

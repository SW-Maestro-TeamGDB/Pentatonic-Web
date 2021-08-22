import react from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const StudioBannerContents = (props) => {
  const { data } = props;
  return (
    <CarouselContents to={`/lounge/cover/${data ? data.id : '1'}`}>
      <Background url={data.image} />
      <BannerContents>
        <CoverRecommendTitleContainer>
          <CoverRecommendTitle>이런 커버 어때요?</CoverRecommendTitle>
        </CoverRecommendTitleContainer>
        <CoverInfoContainer>
          <SongTitle>{data.title}</SongTitle>
          <Singer>{data.singer}</Singer>
        </CoverInfoContainer>
        <CountContainer>
          <LikeCount>
            <CustomIcon src={ViewIcon} /> {parseInt(Math.random() * 300 + 200)}
          </LikeCount>
          <SpacingSpan />
          <ViewCount>
            <CustomIcon src={ThumbIcon} /> {parseInt(Math.random() * 500 + 600)}
          </ViewCount>
          <SpacingSpan />
        </CountContainer>
      </BannerContents>
    </CarouselContents>
  );
};

const CarouselContents = styled(Link)`
  width: 100%;
  height: 22vw;
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const CoverInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  filter: brightness(40%);

  &:hover {
    filter: brightness(70%);
    transform: scale(1.05);
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vw;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;

  ${Background} {
    filter: brightness(50%);

    &:hover {
      filter: brightness(70%);
    }
  }
`;

const BannerContents = styled.div`
  position: absolute;
  bottom: 15%;
  display: flex;
  flex-direction: column;
  left: 3%;
`;

const CoverRecommendTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CoverRecommendTitle = styled.div`
  color: white;
  font-size: 1.3vw;
  font-weight: 800;
  line-height: 2.5;
  letter-spacing: -0.4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongTitle = styled.span`
  font-weight: 900;
  font-size: 3.5vw;
  color: white;

  display: flex;
  justify-content: flex-start;

  line-height: 1;
  letter-spacing: 2px;
`;

const Singer = styled.span`
  font-weight: 900;
  font-size: 1.5vw;
  color: white;

  display: flex;
  justify-content: flex-start;

  margin-left: 2vw;
`;

const CountContainer = styled.span`
  display: flex;
  align-items: center;
  color: #bababa;
  margin-top: 1vw;
`;

const LikeCount = styled.span`
  font-size: 0.8vw;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ViewCount = styled.span`
  font-size: 0.8vw;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomIcon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  filter: invert(80%) sepia(0%) saturate(468%) hue-rotate(238deg)
    brightness(96%) contrast(86%);
  margin: 0 0.5vw;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

export default StudioBannerContents;

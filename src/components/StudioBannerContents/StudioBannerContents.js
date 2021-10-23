import react from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'antd';
import { media, Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const StudioBannerContents = (props) => {
  const { data } = props;
  return (
    <CarouselContents to={`/lounge/cover/${data.bandId}`}>
      <Background url={data.backGroundURI} />
      <BannerContents>
        <CoverRecommendTitleContainer>
          <CoverRecommendTitle>이런 커버 어때요?</CoverRecommendTitle>
        </CoverRecommendTitleContainer>
        <CoverInfoContainer>
          <SongTitle>{data.song.name}</SongTitle>
          <Singer>{data.song.artist}</Singer>
        </CoverInfoContainer>
        <CountContainer>
          <LikeCount>
            <CustomIcon src={ViewIcon} /> {data.viewCount}
          </LikeCount>
          <SpacingSpan />
          <ViewCount>
            <CustomIcon src={ThumbIcon} /> {data.likeCount}
          </ViewCount>
          <SpacingSpan />
        </CountContainer>
      </BannerContents>
    </CarouselContents>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: all 0.3s ease-in-out;
  filter: brightness(50%) blur(1px);
`;

const CarouselContents = styled(Link)`
  width: 100%;
  height: 20rem;
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &:hover {
    ${Background} {
      filter: brightness(70%);
      transform: scale(1.1);
    }
  }
`;

const CoverInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  ${media.small} {
    width: 100%;
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
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 2;
  letter-spacing: -0.4px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 1.1rem;
    line-height: 2;
  }
`;

const SongTitle = styled.span`
  font-weight: 900;
  font-size: 3.5rem;
  max-width: 40rem;
  color: white;

  display: flex;
  justify-content: flex-start;

  line-height: 1.3;
  letter-spacing: -2px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${media.small} {
    font-size: 2rem;
    max-width: 70vw;
    letter-spacing: -1px;
  }
`;

const Singer = styled.span`
  font-weight: 900;
  font-size: 1.8rem;
  color: white;

  display: flex;
  justify-content: flex-start;

  margin-left: 2vw;

  ${media.small} {
    font-size: 1rem;
    margin-left: 1.2rem;

    max-width: 20vw;
    width: auto;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CountContainer = styled.span`
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: 0.7rem;
`;

const LikeCount = styled.span`
  font-size: 0.9rem;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.small} {
    font-size: 0.7rem;
    width: 1rem;
    margin: 0 8px 1px;
  }
`;

const ViewCount = styled.span`
  font-size: 0.9rem;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.small} {
    font-size: 0.7rem;
    width: 1rem;
    margin: 0 8px 1px;
  }
`;

const CustomIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(100%);
  margin: 0 0.5vw 2px;

  ${media.small} {
    font-size: 0.7rem;
    width: 1rem;
    margin: 0 6px 1px;
  }
`;

const SpacingSpan = styled.span`
  margin: 0 3px;
`;

export default StudioBannerContents;

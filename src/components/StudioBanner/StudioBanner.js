import react from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import StudioBannerContents from '../StudioBannerContents/StudioBannerContents';
import { media } from '../../lib/Media';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const GET_RECOMMEND_BAND = gql`
  query Query {
    getRecommendBand {
      bandId
      name
      backGroundURI
      likeCount
      viewCount
      song {
        name
        artist
      }
    }
  }
`;

const StudioBanner = () => {
  const { data } = useQuery(GET_RECOMMEND_BAND);

  const showContents = () => {
    if (data)
      return data.getRecommendBand.map((v, i) => {
        return (
          <StudioBannerContents data={v} key={`StudioBannerConents-${i}`} />
        );
      });
  };

  return (
    <BannerContainer>
      <CarouselContainer>
        <CoverRecommendTitleContainer>
          <CoverRecommendTitle>이런 커버 어때요?</CoverRecommendTitle>
        </CoverRecommendTitleContainer>
        <CustomCarousel usel dotPosition="bottom" autoplay>
          {showContents()}
        </CustomCarousel>
      </CarouselContainer>
    </BannerContainer>
  );
};

const CarouselContainer = styled.div`
  width: 100%;
  height: 20rem;
  position: relative;
`;

const CoverRecommendTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 8%;
  left: 3%;
  z-index: 2;
  border-radius: 10px;

  padding: 0 1rem;
  background-color: rgba(150, 150, 150, 0.8);

  ${media.small} {
    top: 7%;
    left: 4%;
  }
`;

const CoverRecommendTitle = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 2;
  letter-spacing: -1px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 0.9rem;
    line-height: 2;
  }
`;

const CustomCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
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

  ${media.small} {
    border-radius: 0;
  }
`;

export default StudioBanner;

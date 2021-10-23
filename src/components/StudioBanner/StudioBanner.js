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
      <CustomCarousel dotPosition="bottom" autoplay>
        {showContents()}
      </CustomCarousel>
    </BannerContainer>
  );
};

const CustomCarousel = styled(Carousel)`
  width: 100%;
  height: 20rem;
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

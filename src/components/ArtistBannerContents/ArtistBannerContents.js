import react from 'react';
import styled from 'styled-components';
import { Carousel, Card } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { sessionIconMatch } from '../../lib/sessionIconMatch';

import ArtistRank from '../../images/ArtistRank.jpeg';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const ArtistBannerContents = (props) => {
  const { data, type } = props;

  return (
    <CarouselContents
      to={
        type === 'band' ? `/lounge/cover/${data.bandId}` : `/profile/${data.id}`
      }
    >
      <Background url={type === 'band' ? data.backGroundURI : ArtistRank} />
      {type === 'band' ? null : (
        <ProfileContainer>
          <ProfileImage src={data.profileURI} />
        </ProfileContainer>
      )}
      <BannerContents>
        <CoverRecommendTitleContainer>
          <CoverRecommendTitle>
            주목받기 시작하는 라이징 {type === 'band' ? '밴드' : '아티스트'}를
            확인해보세요
          </CoverRecommendTitle>
        </CoverRecommendTitleContainer>
        <CoverInfoContainer>
          {type === 'band' ? (
            <>
              <Title>{data.name}</Title>
              <Desc>
                {data.song.name} - {data.song.artist}
              </Desc>
            </>
          ) : (
            <>
              <Title>{data.username}</Title>
              <Desc>@ {data.id} </Desc>
            </>
          )}
        </CoverInfoContainer>
      </BannerContents>
    </CarouselContents>
  );
};

const CarouselContents = styled(Link)`
  width: 100%;
  height: 18rem;
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const CoverInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: all 0.3s ease-in-out;
  filter: brightness(50%) blur(2px);

  &:hover {
    filter: brightness(70%);
    transform: scale(1.05);
  }
`;

const ProfileContainer = styled.div`
  width: 15rem;
  height: 15rem;
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 30px;
  filter: brightness(90%);
  object-fit: cover;
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
  font-size: 0.9vw;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.4px;
  padding-left: 0.2vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 3.5vw;
  color: white;

  display: flex;
  justify-content: flex-start;

  line-height: 1;
  letter-spacing: 2px;
`;

const Desc = styled.span`
  font-weight: 900;
  font-size: 24px;
  color: white;

  margin-top: 1vw;

  display: flex;
  justify-content: flex-start;
  line-height: 1;
  letter-spacing: -1px;
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

export default ArtistBannerContents;

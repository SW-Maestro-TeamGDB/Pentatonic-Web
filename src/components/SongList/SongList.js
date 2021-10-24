import react from 'react';
import styled from 'styled-components';
import { media, Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import DifficultyIcon from '../DifficultyIcon';
import { useMediaQuery } from 'react-responsive';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { changeGenreToKorean } from '../../lib/changeGenreToKorean';

const SongList = (props) => {
  const { link, data } = props;
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  const isXSMobile = useMediaQuery({
    query: '(max-width:500px)',
  });

  const showSession = () => {
    return data.instrument
      .map((v) => changeSessionNameToKorean(v.position))
      .join(',');
  };

  return (
    <SongInformLink to={link}>
      {data ? (
        <>
          <SongImg img={data.songImg} />
          <SongDataContainer>
            <SongTitleContainer>
              {data.name}
              {data.weeklyChallenge ? (
                <WeeklyBanner>{isXSMobile ? 'W' : 'Weekly'}</WeeklyBanner>
              ) : null}
            </SongTitleContainer>
            <ArtistContainer>{data.artist}</ArtistContainer>
            {!isDesktop ? (
              <SessionContainer>{showSession()}</SessionContainer>
            ) : null}
            {isXSMobile ? (
              <IconContainer>
                <DifficultyIcon value={data.level} />
              </IconContainer>
            ) : null}
          </SongDataContainer>
          <SongMetaContainer>
            <SongGenreContainer>
              {changeGenreToKorean(data.genre)}
            </SongGenreContainer>
            {isMobile && !isXSMobile ? (
              <DifficultyContainer>
                <IconContainer>
                  <DifficultyIcon value={data.level} />
                </IconContainer>
              </DifficultyContainer>
            ) : null}
          </SongMetaContainer>
          {isDesktop ? (
            <SessionContainer>{showSession()}</SessionContainer>
          ) : null}
          {isMobile ? null : (
            <DifficultyContainer>
              <IconContainer>
                <DifficultyIcon value={data.level} />
              </IconContainer>
            </DifficultyContainer>
          )}
        </>
      ) : (
        <SkeletonContainer>
          <Skeleton.Button
            size={'large'}
            active
            style={{ width: '10rem', height: '5.5rem' }}
          />
          <Spacing width={'5%'} />
          <Skeleton
            title={{ width: '95%' }}
            paragraph={{ width: '95%', rows: 1 }}
            active
          />
        </SkeletonContainer>
      )}
    </SongInformLink>
  );
};

const SongDataContainer = styled.div`
  min-width: 35%;
  width: 35rem;
  padding-left: 2rem;

  ${media.medium} {
    min-width: 45%;
  }

  ${media.small} {
    padding-left: 1.5rem;
    width: 70%;
  }

  ${media.xsmall} {
    min-width: 80%;
  }
`;

const SongMetaContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;

  ${media.medium} {
    padding: 0 1rem;
  }

  ${media.small} {
    width: 20%;
    flex-direction: column;
    padding: 0;
  }
`;

const SongGenreContainer = styled.div`
  font-size: 1rem;
  font-weight: 700;
  background-color: rgba(100, 100, 100, 0.4);
  color: #fff;
  width: auto;
  padding: 0.2rem 1rem;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.five} {
    display: none;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 7rem;
  width: 100%;
  align-items: center;
`;

const Spacing = styled.div`
  width: ${(props) => props.width};
`;

const SongInformLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10rem;
  position: relative;

  color: black;

  &:hover {
    color: black;
  }

  ${media.small} {
    height: 8rem;
  }
`;

const WeeklyBanner = styled.div`
  width: auto;
  padding: 0.6vh 1vw;
  color: white;
  font-size: 0.8rem;
  border-radius: 1rem;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    padding: 3px 12px;
  }

  ${media.five} {
    padding: 2px 6px;
  }
`;

const SongImg = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 15px;
  min-width: 9rem;
  height: 80%;
  box-sizing: border-box;

  ${media.small} {
    min-width: 6rem;
    width: 6rem;
    height: 6rem;
  }
`;

const IconContainer = styled.div`
  width: 80%;
  min-width: 7rem;

  ${media.five} {
    width: 3rem;
    margin-top: 0.5rem;
    transform: translateX(-5px);
  }
`;

const SongTitleContainer = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.7rem;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    font-size: 1.2rem;
  }

  ${media.five} {
    font-size: 1.1rem;
  }
`;

const ArtistContainer = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1rem;
  color: #666;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.small} {
    font-size: 0.8rem;
  }

  ${media.five} {
    font-size: 0.8rem;
    font-weight: 800;
  }
`;

const SessionContainer = styled.div`
  width: 35%;
  font-size: 0.9rem;
  color: #222222;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1.5rem;

  ${media.medium} {
    padding-left: 0;
    width: 100%;
    margin-top: 3px;
    font-size: 0.8rem;
    color: #666;
  }

  ${media.small} {
    font-size: 0.8rem;
  }

  ${media.xsmall} {
    font-size: 0.6rem;
  }
`;

const DifficultyContainer = styled.div`
  width: 30%;
  font-size: 1rem;
  color: #222222;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;

  ${media.small} {
    padding-left: 0;
    padding-right: 0;
    justify-content: center;
    margin-top: 1rem;
  }

  ${media.xsmall} {
    width: 100%;
  }
`;

export default SongList;

import react from 'react';
import styled from 'styled-components';
import { media, Default, Mobile } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import DifficultyIcon from '../DifficultyIcon';
import { sessionIconMatch } from '../../lib/sessionIconMatch';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

import vocal from '../../images/Session/vocal.svg';
import tempData from '../../data/songs/tempData.json';

const SongGrid = (props) => {
  const { idx, data } = props;

  const showSession = (session) => {
    return session.map((v) => {
      return (
        <InstrumentIcon
          key={`${idx}+${v.position}`}
          src={sessionIconMatch(v.position)}
        />
      );
    });
  };

  return (
    <CustomLink to={`/studio/band/${data.songId}`}>
      <CoverContainer>
        <ImageContainer>
          {data ? (
            <>
              <CoverImage src={data.songImg} />
              <RecordIcon src={vocal} />
              <DifficultyContainer>Lv.{data.level}</DifficultyContainer>
            </>
          ) : (
            <>
              <Skeleton.Button
                style={{ width: '50rem', height: '50rem' }}
                active
              />
            </>
          )}
        </ImageContainer>
        <DataContainer>
          {data ? (
            <>
              <CoverInform>
                <CoverTitle>{data.name}</CoverTitle>
                <CoverArtist>{data.artist}</CoverArtist>
                <SessionInform>{showSession(data.instrument)}</SessionInform>
              </CoverInform>
            </>
          ) : (
            <Skeleton
              title={{ width: '100%' }}
              paragraph={{ width: '100%', rows: 0 }}
              active
            />
          )}
        </DataContainer>
      </CoverContainer>
    </CustomLink>
  );
};

const CustomLink = styled(Link)`
  color: black;
  transition: all ease-in-out 0.3s;
  border-radius: 1rem;
  z-index: 1;
  overflow: hidden;
`;

const RecordIcon = styled.img`
  position: absolute;
  z-index: 3;
  width: 5vw;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  filter: invert();
`;

const CoverImage = styled.img`
  width: 100%;
  min-height: 160px;
  border-radius: 10px;
  transition: all ease-in-out 0.3s;
  object-fit: cover;
  z-index: 2;
  filter: brightness(80%);

  ${media.small} {
    overflow: hidden;
    border-radius: 1rem;
    filter: brightness(50%);
    transition: none;
  }
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 2vh 0;
  color: black;
  border-radius: 1rem;

  ${media.small} {
    margin: 0;
    overflow: hidden;
  }

  &:hover ${RecordIcon} {
    width: 2.5rem;
    visibility: visible;
    transition: all ease-in-out 0.3s;

    opacity: 1;
  }

  &:hover ${CoverImage} {
    transform: scale(1.15);
    filter: brightness(60%);
  }

  ${media.small} {
    &:hover {
      ${CoverImage} {
        transform: none;
        filter: brightness(60%);
      }

      ${RecordIcon} {
        width: 2.5rem;
        visibility: none;
        transition: none;
        opacity: 0;
      }
    }
  }
`;

const ImageContainer = styled.div`
  height: 10rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 95%;

  ${media.small} {
    border-radius: 1rem;
    width: 100%;
    overflow: hidden;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 8px;
`;

const CoverInform = styled.div`
  width: 100%;
  color: black;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-overflow: ellipsis;

  position: relative;

  ${media.small} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const CoverMeta = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  position: relative;
`;

const InstrumentIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 0.2vw;
  opacity: 0.3;
`;

const CoverTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 100%;

  // 텍스트 생략표현
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    font-size: 1rem;
    font-weight: 900;
    width: 100%;
    color: black;
  }
`;

const CoverArtist = styled.div`
  font-size: 12px;
  color: #999;
  text-align: left;
  width: 100%;

  // 텍스트 생략표현
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    color: #999;
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1.2;
    width: 100%;
    text-align: left;
  }
`;

const SessionInform = styled.div`
  width: 40%;
  height: auto;
  position: absolute;
  right: 0;
  bottom: 8%;
  display: flex;
  flex: row;
  align-items: center;
  justify-content: flex-end;

  ${media.small} {
    width: auto;
  }
`;

const DifficultyContainer = styled.span`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border-radius: 10px;

  position: absolute;
  bottom: 10px;
  z-index: 2;
  width: auto;
  right: 8px;
  background-color: rgba(220, 220, 220, 0.5);

  color: #fff;
  font-weight: 900;
  letter-spacing: -1px;

  ${media.small} {
    position: absolute;
    bottom: 10px;
    z-index: 2;
    width: auto;
    right: 8px;
    background-color: rgba(245, 245, 245, 0.4);
    letter-spacing: 0px;

    color: #fff;
    font-weight: 800;
  }
`;

const LikeCount = styled.span`
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

export default SongGrid;

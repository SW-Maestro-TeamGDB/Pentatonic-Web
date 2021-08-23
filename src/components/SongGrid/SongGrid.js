import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import DifficultyIcon from '../DifficultyIcon';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';
import FixYou from '../../images/TempData/FixYou.png';

import drum from '../../images/Session/drum.svg';
import guitar from '../../images/Session/guitar.svg';
import piano from '../../images/Session/piano.svg';
import vocal from '../../images/Session/vocal.svg';

import tempData from '../../data/songs/tempData.json';

const SongGrid = (props) => {
  const { idx } = props;

  const showSession = (session) => {
    return session.map((v) => {
      return (
        <InstrumentIcon
          key={`${idx}+${v.session}`}
          src={sessionMatch(v.session)}
        />
      );
    });
  };

  const sessionMatch = (v) => {
    if (v === 'guitar') return guitar;
    else if (v === 'drum') return drum;
    else if (v === 'piano') return piano;
    else if (v === 'vocal') return vocal;
  };

  return (
    <CustomLink to={`/studio/band/${idx}`}>
      <CoverContainer>
        <ImageContainer>
          <CoverImage src={tempData[idx].img} />
          <RecordIcon src={vocal} />
        </ImageContainer>
        <DataContainer>
          <CoverInform>
            <CoverTitle>{tempData[idx].title}</CoverTitle>
            <CoverArtist>{tempData[idx].artist}</CoverArtist>
          </CoverInform>
          <CoverMeta>
            <DifficultyContainer>
              <DifficultyIcon value={tempData[idx].difficulty} />
            </DifficultyContainer>
            <SessionInform>{showSession(tempData[idx].sessions)}</SessionInform>
          </CoverMeta>
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

  filter: brightness(300%);
`;

const CoverImage = styled.img`
  width: 100%;
  min-height: 160px;
  border-radius: 10px;
  transition: all ease-in-out 0.3s;
  object-fit: cover;
  z-index: 2;
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

  &:hover ${RecordIcon} {
    width: 2.5rem;
    visibility: visible;
    transition: all ease-in-out 0.3s;

    opacity: 1;
  }

  &:hover ${CoverImage} {
    transform: scale(1.15);
    filter: brightness(50%);
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
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 0.7vw;
`;

const CoverInform = styled.div`
  width: 100%;
  color: black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;

  position: relative;
`;

const CoverMeta = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5vw;
  position: relative;
`;

const InstrumentIcon = styled.img`
  width: 1em;
  height: 1rem;
  margin-right: 0.2vw;
`;

const CoverTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  width: 70%;

  // 텍스트 생략표현
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CoverArtist = styled.div`
  font-size: 12px;
  color: rgb(50, 50, 50);

  width: 30%;

  // 텍스트 생략표현
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SessionInform = styled.div`
  width: 40%;
  height: auto;
  position: absolute;
  right: 0;
  display: flex;
  flex: row;
  align-items: center;
  justify-content: flex-end;
`;

const DifficultyContainer = styled.span`
  display: flex;
  align-items: center;
  width: 40%;
`;

const LikeCount = styled.span`
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ViewCount = styled.span`
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

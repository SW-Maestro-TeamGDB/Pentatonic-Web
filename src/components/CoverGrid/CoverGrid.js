import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import HeadPhoneIcon from '../../images/HeadPhoneIcon.svg';

import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';

import drum from './drum.svg';
import guitar from './guitar.svg';
import piano from './piano.svg';
import vocal from './vocal.svg';

const CoverGrid = (props) => {
  const { idx } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  const showSession = (session) => {
    console.log(session);
    return session.map((v) => {
      return <InstrumentIcon key={`${idx}+${v}`} src={sessionMatch(v)} />;
    });
  };

  const sessionMatch = (v) => {
    if (v === 'guitar') return guitar;
    else if (v === 'drum') return drum;
    else if (v === 'piano') return piano;
    else if (v === 'vocal') return vocal;
  };

  const tempData = [
    {
      cover: '사이키델릭',
      title: `Borderline`,
      singer: 'Tame Impala',
      img: TameImpala,
      session: ['guitar', 'vocal', 'piano'],
    },
    {
      cover: '3인 혁오',
      title: `위잉위잉`,
      singer: '혁오',
      img: Hyukoh,
      session: ['guitar', 'vocal', 'drum'],
    },
    {
      cover: 'Cross The Road',
      title: `Hey Jude`,
      singer: 'The Beatles',
      img: Beatles,
      session: ['guitar', 'vocal', 'piano', 'drum'],
    },
    {
      cover: '구름밴드',
      title: `Numb`,
      singer: 'Men I Trust',
      img: MenITrust,
      session: ['guitar', 'vocal'],
    },
    {
      cover: '코리아 톰 요크',
      title: `No Suprises`,
      singer: 'Radio Head',
      img: NoSurprises,
      session: ['piano', 'vocal', 'drum'],
    },
    {
      cover: '실력은 필요없어',
      title: `Summer`,
      singer: 'The Volunteers',
      img: TheVolunteers,
      session: ['guitar', 'vocal', 'drum'],
    },
  ];

  return (
    <CustomLink to={`/lounge/cover/${idx}`}>
      <CoverContainer>
        <ImageContainer>
          <CoverImage src={tempData[idx].img} />
          <HeadPhoneImage src={HeadPhoneIcon} />
        </ImageContainer>
        <DataContainer>
          <CoverInform>
            <CoverTitle>{tempData[idx].cover}</CoverTitle>
            <SongInform>
              {tempData[idx].title} - {tempData[idx].singer}
            </SongInform>
          </CoverInform>
          <CoverMeta>
            <CountContainer>
              <LikeCount>
                <CustomIcon src={ViewIcon} />{' '}
                {parseInt(Math.random() * 300 + 200)}
              </LikeCount>
              <SpacingSpan />
              <ViewCount>
                <CustomIcon src={ThumbIcon} />{' '}
                {parseInt(Math.random() * 500 + 600)}
              </ViewCount>
              <SpacingSpan />
            </CountContainer>
            <SessionInform>{showSession(tempData[idx].session)}</SessionInform>
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

const HeadPhoneImage = styled.img`
  position: absolute;
  z-index: 3;
  width: 5rem;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
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

  &:hover ${HeadPhoneImage} {
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
  margin-top: 14px;
`;

const CoverInform = styled.div`
  width: 100%;
  color: black;
`;

const CoverMeta = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  position: relative;
`;

const InstrumentIcon = styled.img`
  width: 1em;
  height: 1rem;
  margin-right: 0.2vw;
`;

const CustomIcon = styled.img`
  width: 1em;
  height: 1rem;
  filter: invert(80%) sepia(0%) saturate(468%) hue-rotate(238deg)
    brightness(96%) contrast(86%);
  margin-right: 0.2vw;
`;

const CoverTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 14px;
  color: rgb(50, 50, 50);
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

const CountContainer = styled.span`
  display: flex;
  align-items: center;
  color: #bababa;
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

export default CoverGrid;

import react, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';
import FixYou from '../../images/TempData/FixYou.png';

import PlayIcon from '../../images/PlayIcon.svg';
import PauseIcon from '../../images/PauseIcon.png';

import instrument from '../../pages/CoverMaking/inst.mp3';

const LibraryList = (props) => {
  const { idx, id, edit } = props;
  const [audioState, setAudioState] = useState(0); // 0:정지 , 1:재생 , 2:일시정지
  const [inst, setInst] = useState();
  const instRef = useRef();

  useEffect(() => {
    instRef.current = inst;
  }, [inst]);

  const randomTitle = [
    '멋진 밴드',
    '기가막힌 밴드',
    '무지성 합주',
    'On the next level',
    'WarmPlay',
    'Fix Everything',
    '사이키델릭',
    '구름밴드',
    'Cross the road',
    '코리아 락 밴드',
    '실력따윈 필요없어',
    '초보방',
  ];
  const titleSize = randomTitle.length;

  const tempData = [
    {
      cover: `${randomTitle[parseInt(Math.random() * titleSize)]}`,
      title: `Fix You`,
      singer: 'ColdPlay',
      img: FixYou,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 3 },
        { session: 'vocal', maxMember: 3, currentMember: 1 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '사이키델릭',
      title: `Borderline`,
      singer: 'Tame Impala',
      img: TameImpala,
      sessions: [
        { session: 'guitar', maxMember: 3, currentMember: 1 },
        { session: 'piano', maxMember: 2, currentMember: 1 },
        { session: 'vocal', maxMember: 3, currentMember: 0 },
      ],
    },
    {
      cover: '3인 혁오',
      title: `위잉위잉`,
      singer: '혁오',
      img: Hyukoh,
      sessions: [
        { session: 'guitar', maxMember: 2, currentMember: 2 },
        { session: 'vocal', maxMember: 4, currentMember: 4 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: 'Cross The Road',
      title: `Hey Jude`,
      singer: 'The Beatles',
      img: Beatles,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 1 },
        { session: 'piano', maxMember: 1, currentMember: 1 },
        { session: 'vocal', maxMember: 4, currentMember: 4 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '구름밴드',
      title: `Numb`,
      singer: 'Men I Trust',
      img: MenITrust,
      sessions: [
        { session: 'guitar', maxMember: 5, currentMember: 4 },
        { session: 'vocal', maxMember: 2, currentMember: 1 },
      ],
    },
    {
      cover: '코리아 톰 요크',
      title: `No Suprises`,
      singer: 'Radio Head',
      img: NoSurprises,
      sessions: [
        { session: 'piano', maxMember: 1, currentMember: 1 },
        { session: 'vocal', maxMember: 3, currentMember: 2 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '실력은 필요없어',
      title: `Summer`,
      singer: 'The Volunteers',
      img: TheVolunteers,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 3 },
        { session: 'vocal', maxMember: 3, currentMember: 1 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
  ];

  const onClickStart = () => {
    inst.play();
    setAudioState(1);
  };

  const onClickPause = () => {
    inst.pause();
    setAudioState(2);
  };

  const onClickIcon = () => {
    if (audioState === 1) {
      inst.pause();
      setAudioState(2);
    } else {
      inst.play();
      setAudioState(1);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.src = instrument;
    setInst(audio);

    return () => {
      instRef.current.pause();
      instRef.current.currentTime = 0;
    };
  }, []);

  return (
    <CoverContainer>
      <ImageContainer>
        <CoverImage src={tempData[idx].img} />
      </ImageContainer>
      <Spacing width={'2%'} />
      <CoverInform>
        <CoverTitle>{tempData[idx].cover}</CoverTitle>
        <SongInform>
          {tempData[idx].title} - {tempData[idx].singer}
        </SongInform>
      </CoverInform>
      {edit ? <CoverTime>2021-07-10</CoverTime> : null}
      <Spacing width={'3%'} />
      {edit ? (
        <>
          <DeleteContainer>
            <CustomEditOutlined />
            <CustomDeleteFilled />
          </DeleteContainer>
          <Spacing width={'10%'} />
        </>
      ) : null}
      <IconContainer onClick={onClickIcon}>
        {audioState === 1 ? (
          <CustomPauseIcon src={PauseIcon} />
        ) : (
          <CustomPlayIcon src={PlayIcon} />
        )}
      </IconContainer>
      <Spacing width={'5%'} />
    </CoverContainer>
  );
};

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 1vw;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  position: relative;

  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const CustomPlayIcon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const CustomPauseIcon = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const IconContainer = styled.div`
  width: 5vw;
  height: 3vw;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #6236ff;
  border-radius: 1rem;
  color: #6236ff;

  &:hover {
    background-color: #6236ff;

    ${CustomPlayIcon} {
      filter: invert(100%);
    }

    ${CustomPauseIcon} {
      filter: invert(100%);
    }
  }
`;

const Spacing = styled.div`
  width: ${(props) => props.width};
`;

const CoverTime = styled.div`
  font-size: 0.8vw;
  width: 20%;
`;

const DeleteContainer = styled.div`
  width: 10%;
  font-size: 2em;
`;

const CustomEditOutlined = styled(EditOutlined)`
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: gray;
  }

  margin-right: 20%;
`;

const CustomDeleteFilled = styled(DeleteFilled)`
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: rgba(255, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  margin: 1vh 1vw;
  display: flex;
  align-items: center;
  width: 6vw;
  height: 4vw;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  height: 100%;
`;

const CoverInform = styled.div`
  width: 75%;
  color: black;
  padding-left: 1vw;
`;

const CoverMeta = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomIcon = styled.img`
  width: 1vw;
`;

const CoverTitle = styled.div`
  font-size: 1.5vw;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 1vw;
  color: rgb(100, 100, 100);
`;

export default LibraryList;

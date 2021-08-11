import react from 'react';
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

const LibraryList = (props) => {
  const { idx, id, edit } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

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
    <CoverContainer>
      <ImageContainer>
        <CoverImage src={tempData[idx].img} />
      </ImageContainer>
      <Spacing />
      <CoverInform>
        <CoverTitle>{tempData[idx].title}</CoverTitle>
        <SongInform>
          {tempData[idx].title} - {tempData[idx].singer}
        </SongInform>
      </CoverInform>
      <CoverTime>2021-07-{parseInt(Math.random() * 20 + 10)}</CoverTime>
      {edit ? (
        <DeleteContainer>
          <CustomEditOutlined />
          <CustomDeleteFilled />
        </DeleteContainer>
      ) : null}
    </CoverContainer>
  );
};

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0.7vw 0;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const Spacing = styled.div`
  width: 2%;
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
  height: 5vw;
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

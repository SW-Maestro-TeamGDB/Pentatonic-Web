import react, { useState } from 'react';
import { Space, Dropdown, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongList from '../../components/SongList';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage/PageImage';
import GenreButton from '../../components/GenreButton/GenreButton';
import GridContainer from '../../components/GridContainer/GridContainer';

import tempData from '../../data/songs/tempData.json';

const StudioBandCover = () => {
  const [genre, setGenre] = useState('전체');
  const [difficulty, setDifficulty] = useState('전체');

  const showTempCover = () =>
    [0, 1, 2, 3]
      .filter(
        (v) => difficulty === tempData[v].difficulty || difficulty === '전체',
      )
      .map((v) => {
        return (
          <SongList
            link={`/studio/band/${v}`}
            id={v}
            key={`SongList + ${v}`}
            data={tempData[v]}
          />
        );
      });

  return (
    <PageContainer>
      <PageTitle>밴드 커버녹음</PageTitle>
      <PageDesc>
        펜타토닉에서 제공하는 반주에 맞춰 밴드 음악을 녹음 해보세요
      </PageDesc>
      <SearchBar placeholder="아티스트나 곡을 입력해주세요" />
      <SubContainer>
        <ButtonContainer>
          <GenreButton genre={genre} setGenre={setGenre} />
          <Spacing />
          <DifficultyButton
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </ButtonContainer>
        <MakingCoverButton
          link={`/studio/band/free/cover`}
          title="자유곡 커버 만들기"
        />
      </SubContainer>
      <SongContainer>{showTempCover()}</SongContainer>
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 0.5em 0 3rem;
  width: 80%;
  text-align: center;
`;

const Spacing = styled.div`
  width: 1rem;
`;

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  width: 93%;

  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const SubContainer = styled.div`
  margin: 4rem 0 1rem;
  position: relative;
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MakingIconImg = styled.img`
  width: 1rem;
  margin-right: 0.5rem;
`;

const MakingCoverLink = styled(Link)`
  position: absolute;
  right: 1rem;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomButton = styled.span`
  cursor: pointer;
  font-size: 1rem;
`;
const CustomMenu = styled(Menu)`
  min-width: 7rem;
  text-align: center;
`;

export default StudioBandCover;

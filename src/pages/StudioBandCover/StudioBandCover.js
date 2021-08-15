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

const StudioBandCover = () => {
  const [genre, setGenre] = useState('전체');
  const [difficulty, setDifficulty] = useState('전체');

  return (
    <PageContainer>
      <PageTitle>밴드 커버</PageTitle>
      <PageDesc>
        펜타토닉에서 제공하는 반주에 맞춰 밴드 음악을 커버해보세요
      </PageDesc>
      <SearchBar placeholder="아티스트나 곡을 입력해주세요" />
      <SubContainer>
        <ButtonContainer>
          <GenreButton genre={genre} setGenre={setGenre} />
          <DifficultyButton
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </ButtonContainer>
        <MakingCoverButton
          link={`/studio/band/1/cover`}
          title="자유곡 커버 만들기"
        />
      </SubContainer>
      <SongContainer>
        <SongList link="/studio/band/1" />
      </SongContainer>
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 0.5em 0 3rem;
  width: 80%;
  text-align: center;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
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

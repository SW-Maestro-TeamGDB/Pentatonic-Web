import react, { useState } from 'react';
import { Space, Dropdown, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage';
import GenreButton from '../../components/GenreButton/GenreButton';
import GridContainer from '../../components/GridContainer/GridContainer';

const LoungeSoloCovers = () => {
  const [genre, setGenre] = useState('전체');

  const tempCover = () =>
    Array.from({ length: 30 }, () => 0).map((v, i) => {
      return (
        <CoverGrid
          id={parseInt(Math.random() * 100)}
          key={i}
          idx={parseInt(Math.random() * 5)}
        />
      );
    });

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        title="떠오르는 솔로커버"
      />
      <PageDesc>새롭게 떠오르는 솔로 커버를 감상해보세요</PageDesc>
      <SearchBar />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverLink
          to={`/studio/cover/${parseInt(Math.random() * 10000)}`}
        >
          <MakingIconImg src={MakingIcon} />
          <CustomButton>새로운 커버 만들기</CustomButton>
        </MakingCoverLink>
      </SubContainer>
      <GridContainer width="70%">{tempCover()}</GridContainer>
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 3rem 0;
  width: 50%;
  text-align: center;
`;

const SubContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
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

export default LoungeSoloCovers;

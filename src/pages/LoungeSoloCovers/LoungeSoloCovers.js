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
          id={parseInt(Math.random() * 6)}
          key={i}
          idx={parseInt(Math.random() * 6)}
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
      <SearchBar placeholder="커버 제목을 입력해주세요" />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverLink to={`/studio/solo`}>
          <CustomButton>
            새로운 커버 만들기
            <MakingIconImg src={MakingIcon} />
          </CustomButton>
        </MakingCoverLink>
      </SubContainer>
      <GridContainer width="95%" templateColumn="250px">
        {tempCover()}
      </GridContainer>
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 3rem 0;
  width: 80%;
  text-align: center;
`;

const SubContainer = styled.div`
  margin: 4rem 0 1rem;
  position: relative;
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MakingIconImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
  filter: invert(100%);
`;

const MakingCoverLink = styled(Link)`
  position: absolute;
  right: 1rem;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomButton = styled.div`
  cursor: pointer;
  min-width: 12em;
  padding: 0.8vh 0.7vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

export default LoungeSoloCovers;

import react, { useState } from 'react';
import { Space, Dropdown, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage/PageImage';
import GenreButton from '../../components/GenreButton/GenreButton';
import GridContainer from '../../components/GridContainer/GridContainer';

const LoungeBandCovers = () => {
  const [genre, setGenre] = useState('전체');
  const genreMenu = (
    <CustomMenu>
      <Menu.Item key={0} onClick={() => setGenre('전체')}>
        전체
      </Menu.Item>
      <Menu.Item key={1} onClick={() => setGenre('락')}>
        락
      </Menu.Item>
      <Menu.Item key={2} onClick={() => setGenre('R&B')}>
        R&B
      </Menu.Item>
      <Menu.Item key={3} onClick={() => setGenre('발라드')}>
        발라드
      </Menu.Item>
      <Menu.Item key={4} onClick={() => setGenre('댄스')}>
        댄스
      </Menu.Item>
      <Menu.Item key={5} onClick={() => setGenre('POP')}>
        POP
      </Menu.Item>
    </CustomMenu>
  );

  const tempCover = () =>
    Array.from({ length: 30 }, () => 0).map((v, i) => {
      return (
        <CoverGrid
          id={parseInt(Math.random() * 100)}
          key={i}
          idx={parseInt(Math.random() * 6)}
        />
      );
    });

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        title="떠오르는 밴드커버"
        position="top"
      />
      <PageDesc>새롭게 떠오르는 밴드 커버를 감상하고 참여해보세요</PageDesc>
      <SearchBar placeholder="커버 제목, 아티스트, 곡을 입력해주세요" />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverLink to={`/studio/band`}>
          <MakingIconImg src={MakingIcon} />
          <CustomButton>새로운 커버 만들기</CustomButton>
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
  margin: 5rem 0 1rem;
  position: relative;
  width: 93%;
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

export default LoungeBandCovers;

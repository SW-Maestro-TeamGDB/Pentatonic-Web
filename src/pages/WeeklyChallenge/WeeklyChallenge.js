import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage';
import GridContainer from '../../components/GridContainer/GridContainer';

const WeeklyChallenge = () => {
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
        imgUrl="https://media.pitchfork.com/photos/6064da2beef32a677ce9dbfc/2:1/w_2560%2Cc_limit/Tame-Impala.jpg"
        title="Tame Impala - 'Cause I'm a man"
        centered
      />
      <PageDesc>
        테임 임팔라는 오스트레일리아의 4인조 사이키델릭 밴드이다. 멤버는 케빈
        파커, 도미닉 심퍼, 닉 올브룩, 제이 왓슨 으로 이루어져 있다. 그들의
        밴드명은 임팔라 영양의 이름에서 따왔다.
      </PageDesc>
      <SearchBar />
      <SubContainer>
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
  margin-top: 2rem;
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

export default WeeklyChallenge;

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
          id={parseInt(Math.random() * 6)}
          key={i}
          idx={parseInt(Math.random() * 6)}
        />
      );
    });

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://w.namu.la/s/8f16d9ad8ac378b6d2339ce927bbc9d6431dbf5277b241bf363ffa61cf5496caf1611f471aca282ff14bd8e544135b8f5edbbfebb6f942603cc9563f130a548cf40005956d405598ed3f6067522ad7b6aaf067e05dbc1e79085d5b90fb90ab5f9947a0cd3108efda6f8008666a1627cc"
        title="Fix You - Coldplay"
        position="top"
      />
      <PageDesc>
        콜드플레이(영어: Coldplay)는 1996년 영국 런던 UCL에서 결성된 얼터너티브
        록 밴드이다. <br /> 밴드의 멤버는 그룹의 보컬이자 피아니스트,
        기타리스트인 크리스 마틴, 리드 기타리스트 조니 버클랜드, 베이스 가이
        베리먼, 그리고 드러머와 기타 악기 연주를 맡은 윌 챔피언이다.
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
  margin: 2rem 0;
  position: relative;
  width: 100%;
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

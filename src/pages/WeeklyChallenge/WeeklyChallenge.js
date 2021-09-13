import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage';
import GridContainer from '../../components/GridContainer/GridContainer';

const QUERY_BAND = gql`
  query Query($queryBandFilter: QueryBandInput!) {
    queryBand(filter: $queryBandFilter) {
      backGroundURI
      song {
        artist
        name
      }
      name
      session {
        position
      }
      likeCount
      bandId
    }
  }
`;

const WeeklyChallenge = () => {
  const tempCover = () => {
    if (data) {
      return data.queryBand.map((v, i) => {
        return <CoverGrid key={`bandData+${i}`} data={v} />;
      });
    }
  };

  const { data } = useQuery(QUERY_BAND, {
    variables: {
      queryBandFilter: {
        type: 'NAME',
      },
    },
  });

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2912,h_1456,c_limit/coldplay.jpg"
        title="Fix You - Coldplay"
        position="top"
      />
      <PageDesc>
        콜드플레이(영어: Coldplay)는 1996년 영국 런던 UCL에서 결성된 얼터너티브
        록 밴드이다. <br /> 밴드의 멤버는 그룹의 보컬이자 피아니스트,
        기타리스트인 크리스 마틴, 리드 기타리스트 조니 버클랜드, 베이스 가이
        베리먼, 그리고 드러머와 기타 악기 연주를 맡은 윌 챔피언이다.
      </PageDesc>
      <SearchBar placeholder="커버 제목을 입력해주세요" />
      <SubContainer>
        <MakingCoverButton
          link={`/studio/band/weekly/cover`}
          title="새로운 커버 만들기"
        />
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
  justify-content: flex-end;
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

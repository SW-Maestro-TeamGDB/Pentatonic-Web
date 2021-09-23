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

const QUERY_SONG = gql`
  query Query($querySongFilter: QuerySongInput!) {
    querySong(filter: $querySongFilter) {
      name
      artist
      songImg
      band {
        bandId
        name
        backGroundURI
        likeCount
        session {
          position
        }
      }
    }
  }
`;

const WeeklyChallenge = () => {
  const loadCover = () => {
    if (data?.querySong.length > 0) {
      const title = songData.name;
      const artist = songData.artist;

      return songData.band.map((v, i) => {
        return (
          <CoverGrid
            key={`bandData+${i}`}
            data={v}
            title={title}
            artist={artist}
          />
        );
      });
    }
  };

  const { data } = useQuery(QUERY_SONG, {
    variables: {
      querySongFilter: {
        weeklyChallenge: true,
        type: 'ALL',
      },
    },
  });

  const songData = data?.querySong[0];

  return (
    <PageContainer>
      <PageImage
        imgUrl={songData ? songData.songImg : null}
        title={songData ? `${songData.name} - ${songData.artist}` : null}
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
        {loadCover()}
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

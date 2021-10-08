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
      songId
      band {
        bandId
        name
        backGroundURI
        likeCount
        viewCount
        session {
          position
        }
      }
    }
  }
`;

const WeeklyChallenge = ({ match }) => {
  const content = match.params?.content;
  const { data } = useQuery(QUERY_SONG, {
    variables: {
      querySongFilter: {
        weeklyChallenge: true,
        type: 'ALL',
      },
    },
  });

  const loadCover = () => {
    if (data?.querySong.length > 0) {
      const title = songData.name;
      const artist = songData.artist;

      if (content) {
        const filteredData = songData.band.filter((v) =>
          v.name.includes(content),
        );

        if (filteredData.length > 0) {
          return (
            <GridContainer width="95%" templateColumn="250px" autoFill>
              {filteredData.map((v, i) => {
                return (
                  <CoverGrid
                    key={`bandData+${i}`}
                    data={v}
                    title={title}
                    artist={artist}
                  />
                );
              })}
            </GridContainer>
          );
        } else {
          return <NoCover>등록된 커버가 없습니다</NoCover>;
        }
      }
      return (
        <GridContainer width="95%" templateColumn="250px" autoFill>
          {songData.band.map((v, i) => {
            return (
              <CoverGrid
                key={`bandData+${i}`}
                data={v}
                title={title}
                artist={artist}
              />
            );
          })}
        </GridContainer>
      );
    } else {
      return <NoCover>등록된 커버가 없습니다</NoCover>;
    }
  };

  const tempDesc = (
    <>
      콜드플레이(영어: Coldplay)는 1996년 영국 런던 UCL에서 결성된 얼터너티브록
      밴드이다. <br /> 밴드의 멤버는 그룹의 보컬이자 피아니스트,기타리스트인
      크리스 마틴, 리드 기타리스트 조니 버클랜드, 베이스 가이베리먼, 그리고
      드러머와 기타 악기 연주를 맡은 윌 챔피언이다.
    </>
  );

  const songData = data?.querySong[0];

  return (
    <PageContainer>
      <PageImage
        imgUrl={songData ? songData.songImg : null}
        title={songData ? `${songData.name} - ${songData.artist}` : null}
        position="top"
      />
      <PageDesc>
        {content ? (
          <SearchResult>
            <SearchContent>'{content}'</SearchContent>검색 결과입니다
          </SearchResult>
        ) : (
          tempDesc
        )}
      </PageDesc>
      <SearchBar
        placeholder="커버 제목을 입력해주세요"
        sort="weekly"
        searching={content}
      />
      <SubContainer>
        <MakingCoverButton
          link={songData ? `/studio/band/${songData.songId}/cover` : ``}
          title="새로운 커버 만들기"
        />
      </SubContainer>
      {loadCover()}
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 3rem 0;
  width: 80%;
  text-align: center;

  white-space: pre-line; // 개행 유지
  word-break: break-all; // width 벗어날 경우 줄바꿈
`;

const SearchContent = styled.span`
  color: #6236ff;
  font-size: 24px;
  font-weight: 800;
  padding: 0 0.5rem;
`;

const SearchResult = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  display: flex;
  justify-content: center;
  align-items: center;
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

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default WeeklyChallenge;

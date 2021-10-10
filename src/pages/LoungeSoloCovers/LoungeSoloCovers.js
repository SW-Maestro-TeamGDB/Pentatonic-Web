import react, { useState, useEffect } from 'react';
import { Space, Dropdown, Menu, Button } from 'antd';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage';
import GenreButton from '../../components/GenreButton/GenreButton';
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton';
import GridContainer from '../../components/GridContainer/GridContainer';

const QUERY_BAND = gql`
  query Query($queryBandFilter: QueryBandInput!) {
    queryBand(filter: $queryBandFilter) {
      bands {
        backGroundURI
        song {
          artist
          name
          weeklyChallenge
        }
        name
        isSoloBand
        isFreeBand
        likeCount
        viewCount
        bandId
        session {
          position
        }
      }
    }
  }
`;

const LoungeSoloCovers = ({ match }) => {
  const content = match.params?.content;
  const [genre, setGenre] = useState('전체');
  const [difficulty, setDifficulty] = useState('전체');
  const [bandFilter, setBandFilter] = useState({
    type: 'ALL',
    content: match.params?.content,
    isSoloBand: true,
  });

  const loadSoloCover = () => {
    if (data) {
      const filtered = data.queryBand.bands.filter(
        (v) => !v.isFreeBand && !v.song.weeklyChallenge,
      );

      if (filtered.length > 0)
        return (
          <GridContainer width="95%" templateColumn="250px" autoFill>
            {filtered.map((v, i) => {
              return <CoverGrid key={`bandData+${i}`} data={v} />;
            })}
          </GridContainer>
        );
      else {
        return <NoCover>등록된 커버가 없습니다</NoCover>;
      }
    }
  };

  const { data } = useQuery(QUERY_BAND, {
    variables: {
      queryBandFilter: bandFilter,
    },
  });

  useEffect(() => {
    if (genre !== '전체') {
      setBandFilter({ ...bandFilter, genre: genre });
    }
  }, [genre]);

  useEffect(() => {
    if (difficulty !== '전체') {
      setBandFilter({ ...bandFilter, level: difficulty });
    }
  }, [difficulty]);

  useEffect(() => {
    setBandFilter({ ...bandFilter, content: content });
  }, [content]);

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        title="솔로 커버"
      />
      <PageDesc>
        {content ? (
          <SearchResult>
            <SearchContent>'{content}'</SearchContent>검색 결과입니다
          </SearchResult>
        ) : (
          '유저들의 솔로 커버를 감상 해보세요'
        )}
      </PageDesc>
      <SearchBar
        placeholder="커버 제목, 커버 소개를 입력해주세요"
        sort="solo"
        searching={content}
      />
      <SubContainer>
        <ButtonContainer>
          <GenreButton genre={genre} setGenre={setGenre} />
          <Spacing />
          <DifficultyButton
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </ButtonContainer>
        <MakingCoverButton link={`/studio/solo`} title="새로운 커버 만들기" />
      </SubContainer>
      {loadSoloCover()}
    </PageContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
`;

const Spacing = styled.div`
  width: 1rem;
`;

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
  justify-content: space-between;
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

export default LoungeSoloCovers;

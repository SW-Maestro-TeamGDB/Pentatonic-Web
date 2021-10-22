import react, { useState, useEffect } from 'react';
import { Space, Dropdown, Menu, Button } from 'antd';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage/PageImage';
import GenreButton from '../../components/GenreButton/GenreButton';
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton';
import GridContainer from '../../components/GridContainer/GridContainer';
import { useMediaQuery } from 'react-responsive';
import { media, Default } from '../../lib/Media';

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

const LoungeBandCovers = ({ match }) => {
  const content = match.params?.content;
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '160px' : '220px';
  const [genre, setGenre] = useState('전체');
  const [difficulty, setDifficulty] = useState('전체');
  const [bandFilter, setBandFilter] = useState({
    type: 'ALL',
    content: content,
    isSoloBand: false,
    isFreeSong: false,
    weeklyChallenge: false,
  });

  const loadBandCover = () => {
    if (data) {
      const coverData = data.queryBand.bands;

      if (coverData.length > 0)
        return (
          <GridContainer width="95%" templateColumn={COVER_WIDTH} autoFill>
            {coverData.map((v, i) => {
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
    } else {
      let tempFilter = { ...bandFilter };
      delete tempFilter.genre;
      setBandFilter(tempFilter);
    }
  }, [genre]);

  useEffect(() => {
    if (difficulty !== '전체') {
      setBandFilter({ ...bandFilter, level: difficulty });
    } else {
      let tempFilter = { ...bandFilter };
      delete tempFilter.level;
      setBandFilter(tempFilter);
    }
  }, [difficulty]);

  useEffect(() => {
    setBandFilter({ ...bandFilter, content: content });
  }, [content]);

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        title="밴드 커버"
        desc="유저들의 밴드 커버를 감상하고 참여해보세요"
        position="top"
      />
      <PageDesc>
        {content ? (
          <SearchResult>
            <SearchContent>'{content}'</SearchContent>검색 결과입니다
          </SearchResult>
        ) : null}
      </PageDesc>
      <SearchBar
        placeholder="커버 제목, 커버 소개, 곡 제목, 유저 아이디"
        sort="band"
        searching={content}
        match={match}
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
        <Default>
          <MakingCoverButton link={`/studio/band`} title="새로운 커버 만들기" />
        </Default>
      </SubContainer>
      {loadBandCover()}
      <PageSpacing />
    </PageContainer>
  );
};

const PageSpacing = styled.div`
  height: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;

  ${media.small} {
    margin: 1rem 0;
    justify-content: flex-start;
  }
`;

const Spacing = styled.div`
  width: 1rem;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 1.5rem 0;
  width: 80%;
  text-align: center;
`;

const SearchContent = styled.span`
  color: #6236ff;
  font-size: 24px;
  font-weight: 800;
  padding: 0 0.5rem;

  ${media.small} {
    font-size: 20px;
  }
`;

const SearchResult = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 14px;
  }
`;

const SubContainer = styled.div`
  margin: 4rem 0 1rem;
  position: relative;
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${media.small} {
    margin: 1.5rem 0;
  }
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

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;

  ${media.small} {
    font-size: 1rem;
    height: 10rem;
    padding-bottom: 0.5rem;
    font-weight: 700;
  }
`;

export default LoungeBandCovers;

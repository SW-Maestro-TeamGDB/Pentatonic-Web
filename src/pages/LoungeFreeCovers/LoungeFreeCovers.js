import react, { useState, useEffect, useRef } from 'react';
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
import GridContainer from '../../components/GridContainer/GridContainer';

const QUERY_BANDS = gql`
  query Query($queryBandFilter: QueryBandInput!, $queryBandFirst: Int!) {
    queryBand(filter: $queryBandFilter, first: $queryBandFirst) {
      bands {
        isFreeBand
        song {
          name
          artist
        }
        backGroundURI
        name
        session {
          position
        }
        likeCount
        viewCount
        bandId
      }
    }
  }
`;

const LoungeBandCovers = ({ match }) => {
  const [genre, setGenre] = useState('전체');
  const [bandFilter, setBandFilter] = useState({
    type: 'ALL',
    content: match.params?.content,
    isFreeSong: true,
  });
  const content = match.params?.content;
  const coverRef = useRef();

  const loadFreeCover = () => {
    if (data) {
      const coverData = data.queryBand.bands;

      if (coverData.length > 0)
        return (
          <GridContainer width="95%" templateColumn="250px" autoFill>
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

  const { data } = useQuery(QUERY_BANDS, {
    variables: {
      queryBandFilter: bandFilter,
      queryBandFirst: 10,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (genre !== '전체') {
      setBandFilter({ ...bandFilter, genre: genre });
    }
  }, [genre]);

  useEffect(() => {
    setBandFilter({ ...bandFilter, content: content });
  }, [content]);

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        title="자유곡 커버"
        position="top"
      />
      <PageDesc>
        {content ? (
          <SearchResult>
            <SearchContent>'{content}'</SearchContent>검색 결과입니다
          </SearchResult>
        ) : (
          '유저들이 자유롭게 녹음한 커버를 감상하고 참여해보세요'
        )}
      </PageDesc>
      <SearchBar
        placeholder="커버 제목, 커버 소개를 입력해주세요"
        sort="free"
        searching={content}
      />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverButton
          link={`/studio/band/free/cover`}
          title="새로운 커버 만들기"
        />
      </SubContainer>
      <CoverContainer ref={coverRef}>{loadFreeCover()}</CoverContainer>
    </PageContainer>
  );
};

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 3rem 0;
  width: 80%;
  text-align: center;
`;

const CoverContainer = styled.div`
  width: 100%;
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
  justify-content: space-between;
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
`;

export default LoungeBandCovers;

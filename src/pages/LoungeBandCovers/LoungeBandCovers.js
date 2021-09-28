import react, { useState } from 'react';
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

const QUERY_BAND = gql`
  query Query($queryBandsFilter: QueryBandInput!) {
    queryBands(filter: $queryBandsFilter) {
      bands {
        backGroundURI
        song {
          artist
          name
        }
        name
        isSoloBand
        likeCount
        bandId
        session {
          position
        }
      }
    }
  }
`;

const LoungeBandCovers = () => {
  const [genre, setGenre] = useState('전체');

  const loadBandCover = () => {
    if (data) {
      return data.queryBands.bands
        .filter((v) => !v.isSoloBand)
        .map((v, i) => {
          return <CoverGrid key={`bandData+${i}`} data={v} />;
        });
    }
  };

  const { data } = useQuery(QUERY_BAND, {
    variables: {
      queryBandsFilter: {
        type: 'ALL',
      },
    },
  });

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        title="밴드 커버"
        position="top"
      />
      <PageDesc>유저들의 밴드 커버를 감상하고 참여해보세요</PageDesc>
      <SearchBar placeholder="커버 제목, 아티스트, 곡을 입력해주세요" />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverButton link={`/studio/band`} title="새로운 커버 만들기" />
      </SubContainer>
      <GridContainer width="95%" templateColumn="250px" autoFill>
        {loadBandCover()}
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

export default LoungeBandCovers;

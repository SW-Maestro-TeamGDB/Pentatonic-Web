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

  // const tempCover = () =>
  //   Array.from({ length: 30 }, () => 0).map((v, i) => {
  //     return (
  //       <CoverGrid
  //         id={parseInt(Math.random() * 100)}
  //         key={i}
  //         idx={parseInt(Math.random() * 6 + 1)}
  //       />
  //     );
  //   });

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
        imgUrl="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        title="자유곡 커버"
        position="top"
      />
      <PageDesc>유저들이 자유롭게 녹음한 커버를 감상하고 참여해보세요</PageDesc>
      <SearchBar placeholder="커버 제목, 아티스트, 곡을 입력해주세요" />
      <SubContainer>
        <GenreButton genre={genre} setGenre={setGenre} />
        <MakingCoverButton link={`/studio/band`} title="새로운 커버 만들기" />
      </SubContainer>
      <GridContainer width="95%" templateColumn="250px" autoFill>
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
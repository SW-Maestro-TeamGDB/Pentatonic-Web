import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RankList from '../../components/RankList';

const GET_RANKED_USER = gql`
  query Query {
    getRankedUser {
      username
      profileURI
      id
      followerCount
    }
  }
`;

const ArtistRank = () => {
  const [rankList, setRankList] = useState();
  const { data } = useQuery(GET_RANKED_USER, {
    onCompleted: (data) => {
      setRankList(data.getRankedUser);
    },
  });

  const showBandRank = () => {
    if (rankList)
      return rankList.map((v, i) => {
        return (
          <RankList key={`tempBand+${i}`} data={v} type={'user'} rank={i + 1} />
        );
      });
  };

  return (
    <PageContainer width="40%" minWidth="700px">
      <PageTitle>아티스트 랭킹</PageTitle>
      <PageDesc>좋아요를 가장 많이 받은 아티스트는 누굴까요?</PageDesc>
      <RankItem>{showBandRank()}</RankItem>
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-top: 1rem;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

const RankItem = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export default ArtistRank;

import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RankList from '../../components/RankList';
import SearchBar from '../../components/SearchBar';

const QUERY_USER = gql`
  query Query($username: String!) {
    queryUser(username: $username) {
      id
      username
      followerCount
      profileURI
    }
  }
`;

const SearchPage = ({ match }) => {
  const content = match.params?.content;
  const [searchList, setSearchList] = useState();
  const { data } = useQuery(QUERY_USER, {
    variables: {
      username: content,
    },
    onCompleted: (data) => {
      setSearchList(data.queryUser);
    },
  });

  const showSearchResult = () => {
    if (searchList && searchList.length > 0)
      return searchList.map((v, i) => {
        return <RankList key={`tempBand+${i}`} data={v} type={'user'} />;
      });
    else {
      return <NoCover>해당하는 유저가 없습니다</NoCover>;
    }
  };

  return (
    <PageContainer width="40%" minWidth="700px">
      <SearchResult>
        <SearchContent>'{content}'</SearchContent>검색 결과입니다
      </SearchResult>
      <SearchBar
        placeholder="닉네임을 입력하세요"
        sort="artist"
        searching={content}
      />
      <SearchResultContainer>{showSearchResult()}</SearchResultContainer>
    </PageContainer>
  );
};

const SearchContent = styled.span`
  color: #6236ff;
  font-size: 30px;
  font-weight: 800;
  padding: 0 0.5rem;
`;

const SearchResult = styled.div`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -1px;
  margin: 1.5rem 0 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

const SearchResultContainer = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const NoCover = styled.div`
  font-size: 24px;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default SearchPage;

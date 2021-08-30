import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/cache';
import PageContainer from '../../components/PageContainer';
import LibraryList from '../../components/LibraryList';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id) {
    getUserInfo(userId: $getUserInfoUserId) {
      library {
        coverId
        songId
        coverURI
        date
      }
    }
  }
`;

const Library = () => {
  const [libraryData, setLibraryData] = useState([]);
  const userData = useQuery(GET_CURRENT_USER);
  const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setLibraryData(...libraryData, data.getUserInfo.library);
    },
  });

  useEffect(() => {
    if (userData.data.user) {
      getUserInfo({
        variables: {
          getUserInfoUserId: userData.data.user.id,
        },
      });
    }
  }, [userData]);

  const loadLibrary = () => {
    if (libraryData.length > 0)
      return libraryData
        .slice(0, libraryData.length)
        .reverse()
        .map((v) => {
          return (
            <LibraryList
              data={v}
              key={v.coverId}
              edit={true}
              libraryData={libraryData}
              setLibraryData={setLibraryData}
            />
          );
        });
  };

  useEffect(() => {
    loadLibrary();
  }, [libraryData]);

  return (
    <PageContainer width="52%">
      <PageTitle>라이브러리</PageTitle>
      <Spacing />
      <LibraryContainer>
        {libraryData ? (
          loadLibrary()
        ) : (
          <NoLibraryText>저장된 라이브러리가 없습니다</NoLibraryText>
        )}
      </LibraryContainer>
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-top: 1rem;
`;

const Spacing = styled.div`
  height: 3rem;
`;

const NoLibraryText = styled.div`
  text-align: center;
  color: #666666;
  font-size: 1.2rem;
  font-weight: 700;
`;

const LibraryContainer = styled.div`
  width: 100%;
`;

export default Library;

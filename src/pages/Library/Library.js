import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/cache';
import PageContainer from '../../components/PageContainer';
import LibraryList from '../../components/LibraryList';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import { StopOutlined } from '@ant-design/icons';
import { media } from '../../lib/Media';

import LoginAuth from '../../lib/LoginAuth';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      username
      library {
        position
        coverURI
        coverId
        date
        name
        song {
          songId
          songImg
          name
          artist
        }
      }
    }
  }
`;

const Library = () => {
  const [loadLibraryState, setLoadLibraryState] = useState(true);
  const [libraryData, setLibraryData] = useState([]);
  const userData = useQuery(GET_CURRENT_USER);
  const [getUserInfo, { loading, error, data }] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setLibraryData(data.getUserInfo.library);
      setLoadLibraryState(false);
    },
    onError: (error) => {
      console.log(error);
      setLoadLibraryState(false);
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
    if (libraryData && userData?.data?.user)
      return libraryData
        .slice(0, libraryData.length)
        .reverse()
        .map((v) => {
          return (
            <LibraryList
              data={v}
              key={v.coverId}
              edit={true}
              setLibraryData={setLibraryData}
              getUserInfo={getUserInfo}
              userId={userData.data.user.id}
            />
          );
        });
  };

  useEffect(() => {
    if (libraryData) {
      loadLibrary();
    }
  }, [libraryData]);

  // 언마운트시 libraryData 초기화
  useEffect(() => {
    return () => {
      setLibraryData([]);
    };
  }, []);

  return (
    <LoginAuth>
      <PageContainer width="55%" minWidth="900px">
        <PageTitle>
          {userData?.data?.user?.username ? (
            <>
              <Username>{userData.data.user.username}</Username>
              님의 라이브러리
            </>
          ) : null}
        </PageTitle>
        <Spacing />
        <LibraryContainer>
          {libraryData && libraryData.length > 0 ? (
            loadLibrary()
          ) : (
            <>
              {loadLibraryState ? null : loading ? null : (
                <NoDataContainer>
                  <CustomStopOutlined />
                  <NoLibrary>저장된 라이브러리가 없습니다</NoLibrary>
                </NoDataContainer>
              )}
            </>
          )}
        </LibraryContainer>
      </PageContainer>
    </LoginAuth>
  );
};

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;

  ${media.small} {
    font-size: 1.2rem;
    margin-top: 2rem;
  }
`;

const Username = styled.span`
  font-size: 2rem;
  font-weight: 800;
  margin-right: 6px;

  ${media.small} {
    font-size: 1.5rem;
  }
`;

const Spacing = styled.div`
  height: 3rem;

  ${media.small} {
    height: 2rem;
  }
`;

const LibraryContainer = styled.div`
  width: 100%;

  ${media.small} {
    width: 93%;
  }
`;

const NoLibrary = styled.div`
  color: #bbb;
  font-size: 2rem;
  font-weight: 700;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 1.4rem;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25rem;
`;

const CustomStopOutlined = styled(StopOutlined)`
  font-size: 12rem;
  color: #bbb;
  margin-bottom: 2rem;

  ${media.small} {
    font-size: 8rem;
  }
`;

export default Library;

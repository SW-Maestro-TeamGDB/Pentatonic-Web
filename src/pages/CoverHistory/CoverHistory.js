import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import LibraryList from '../../components/LibraryList';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import GridContainer from '../../components/GridContainer';
import CoverGrid from '../../components/CoverGrid';
import { StopOutlined } from '@ant-design/icons';
import { media } from '../../lib/Media';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      username
      band {
        song {
          name
          artist
        }
        name
        backGroundURI
        likeCount
        viewCount
        bandId
      }
    }
  }
`;

const CoverHistory = ({ match }) => {
  const ID = match.params.id;
  const coverWidth = 220;

  const [userData, setUserData] = useState();
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {
      getUserInfoUserId: ID,
    },
    onCompleted: (data) => {
      setUserData(data.getUserInfo);
    },
  });

  const showCover = () => {
    return userData.band.map((v) => <CoverGrid key={v.bandId} data={v} />);
  };

  return (
    <PageContainer width="55%" minWidth="900px">
      {userData ? (
        <PageTitle>
          <Username>{userData.username}</Username>님의 커버 히스토리
        </PageTitle>
      ) : null}
      <Spacing />
      <CoverContainer>
        {userData && userData.band.length > 0 ? (
          <GridContainer templateColumn={`${coverWidth}px`} autoFill>
            {showCover()}
          </GridContainer>
        ) : (
          <>
            {loading ? null : (
              <NoDataContainer>
                <CustomStopOutlined />
                <NoCoverData>참여한 커버가 없습니다</NoCoverData>
              </NoDataContainer>
            )}
          </>
        )}
      </CoverContainer>
    </PageContainer>
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

const CoverContainer = styled.div`
  ${media.small} {
    width: 90%;
  }
`;

const Spacing = styled.div`
  height: 3rem;
`;

const Username = styled.span`
  font-size: 2rem;
  font-weight: 800;
  margin-right: 6px;

  ${media.small} {
    font-size: 1.5rem;
  }
`;

const NoCoverData = styled.div`
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

export default CoverHistory;

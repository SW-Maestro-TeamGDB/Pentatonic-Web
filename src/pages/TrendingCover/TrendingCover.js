import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import LibraryList from '../../components/LibraryList';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import GridContainer from '../../components/GridContainer';
import CoverGrid from '../../components/CoverGrid';
import { StopOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { media } from '../../lib/Media';

const GET_TREND_BANDS = gql`
  query Query {
    getTrendBands {
      backGroundURI
      song {
        name
        artist
      }
      name
      session {
        position
      }
      likeCount
      viewCount
      bandId
      isSoloBand
      isFreeBand
    }
  }
`;

const TrendingCover = ({ match }) => {
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '160px' : '200px';
  const type = match.params.id;
  const { data } = useQuery(GET_TREND_BANDS, {
    fetchPolicy: 'cache-first',
    variables: {
      queryBandFilter: {
        type: 'ALL',
      },
    },
  });

  const showCover = () => {
    if (data) {
      const filtered = data.getTrendBands.filter((v) =>
        type === 'band' ? !v.isSoloBand : v.isSoloBand,
      );

      if (filtered.length > 0)
        return (
          <GridContainer templateColumn={COVER_WIDTH} autoFill>
            {filtered.map((v, i) => {
              return (
                <CoverGrid key={`bandData+${v.bandId}`} data={v} autoFill />
              );
            })}
          </GridContainer>
        );
      else {
        return (
          <NoDataContainer>
            <CustomStopOutlined />
            <NoCoverData>
              최근 떠오르는 {type === 'band' ? '밴드 커버' : '솔로 커버'}가
              없습니다
            </NoCoverData>
          </NoDataContainer>
        );
      }
    }
  };

  return (
    <PageContainer width="55%" minWidth="900px">
      <PageTitle>
        새롭게 떠오르는{' '}
        <CoverType>{type === 'band' ? '밴드 커버' : '솔로 커버'}</CoverType>를{' '}
        <br />
        감상하고 참여해보세요
      </PageTitle>
      <Spacing />
      <CoverContainer>{data ? showCover() : null}</CoverContainer>
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;

  text-align: center;

  ${media.small} {
    font-size: 1.2rem;
    margin-top: 2rem;
  }
`;

const CoverContainer = styled.div`
  ${media.small} {
    width: 90%;
    padding-bottom: 1rem;
  }
`;

const Spacing = styled.div`
  width: 100%;
  margin: 1.5rem 0;
`;

const CoverType = styled.span`
  font-size: 1.8rem;
  font-weight: 800;
  margin-right: 5px;

  ${media.small} {
    font-size: 1.4rem;
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

export default TrendingCover;

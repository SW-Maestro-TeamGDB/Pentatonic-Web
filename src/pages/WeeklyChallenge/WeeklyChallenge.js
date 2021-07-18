import react, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverList from '../../components/CoverList/CoverList';

const WeeklyChallenge = () => {
  return (
    <PageContainer>
      <PageTitle></PageTitle>
      <PageDesc></PageDesc>
      <SearchBar />
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 4rem;
`;

const PageDesc = styled.div`
  font-size: 2rem;
`;

export default WeeklyChallenge;

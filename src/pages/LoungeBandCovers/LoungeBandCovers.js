import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';

const LoungeBandCovers = () => {
  return (
    <PageContainer>
      <h3>떠오르는 밴드 커버</h3>
      <SearchBar />
    </PageContainer>
  );
};

export default LoungeBandCovers;

import react, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';

const ArtistHome = () => {
  return (
    <PageContainer>
      <h3>아티스트 홈</h3>
    </PageContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  color: black;
  background-color: white;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1.5vh 1vw;
  height: 70vh;
  width: 70%;
  margin-top: 3vh;
`;

export default ArtistHome;

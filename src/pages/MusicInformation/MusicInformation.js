import react, { useState } from 'react';
import styled from 'styled-components';

const MusicInformation = () => {
  return (
    <MenuContainer>
      <h3>음원 상세 페이지</h3>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  color: black;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1.5vh 1vw;
  height: 70vh;
  width: 70%;
  margin-top: 3vh;
`;

export default MusicInformation;

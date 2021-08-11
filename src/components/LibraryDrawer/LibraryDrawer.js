import react, { useEffect } from 'react';
import styled from 'styled-components';
import LibraryList from '../LibraryList/LibraryList';

const LibraryDrawer = (props) => {
  const loadLibrary = () =>
    Array.from({ length: 10 }, () => 0).map((v, i) => {
      return (
        <LibraryList
          id={parseInt(Math.random() * 100)}
          key={i}
          idx={parseInt(Math.random() * 6)}
          edit={false}
        />
      );
    });

  return (
    <DrawerContainer>
      <Title>라이브러리</Title>
      <LibaryContainer>{loadLibrary()}</LibaryContainer>
      <SubmitButtonConatiner>
        <SubmitButton>참여하기</SubmitButton>
      </SubmitButtonConatiner>
    </DrawerContainer>
  );
};

const Title = styled.div`
  font-size: 2vw;
  height: 4vw;
  font-weight: 800;
  border-bottom: 1px solid #eee;
  width: 90%;
  text-align: center;
  position: absolute;
  top: 1vw;
`;

const SubmitButtonConatiner = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 6vw;
  z-index: 2;
`;

const LibaryContainer = styled.div`
  z-index: 1;
  width: 100%;
  position: absolute;
  top: 5vw;
  height: 90%;
  overflow-y: scroll;
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  bottom: 0%;
  width: 90%;
  height: 3.5vw;
  border: none;
  color: white;
  font-size: 1.3vw;
  font-weight: 700;
  cursor: pointer;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  background-size: 500%;
  &:hover {
    animation: gradient 3s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default LibraryDrawer;

import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';

const RecordEdit = (props) => {
  const { audioFile, setAudioFile } = props;
  const audio = new Audio(audioFile);

  return (
    <Container>
      {audioFile ? (
        <audio controls src={audioFile} autoPlay={true} />
      ) : (
        '오디오 파일이 없습니다'
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 70vh;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomPlayIcon = styled.img`
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  &:hover {
    color: rgb(100, 100, 100);
    transform: scale(1.1);
  }
`;

const CustomStopIcon = styled.img`
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
  }
`;

export default RecordEdit;

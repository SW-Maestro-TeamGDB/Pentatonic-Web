import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';

const RecordEdit = (props) => {
  const { audioFile, setAudioFile, inst } = props;

  const audio = new Audio(audioFile);
  const audioCtx = new AudioContext();
  const audioSource = audioCtx.createMediaElementSource(audio);
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 1;
  const gainConnected = audioSource.connect(gainNode);
  gainConnected.connect(audioCtx.destination);

  const volumeUp = () => {
    if (gainNode.gain.value > 2) {
      gainNode.gain.value = 2;
    } else {
      gainNode.gain.value += 0.1;
    }
  };

  const volumeDown = () => {
    if (gainNode.gain.value < 0) {
      gainNode.gain.value = 0;
    } else {
      gainNode.gain.value -= 0.1;
    }
  };

  const onClickStart = () => {
    console.log('play');
    inst.play();
    audio.play();
  };

  const onClickStop = () => {
    console.log('stop');
    inst.pause();
    audio.pause();
    inst.currentTime = 0;
    audio.currentTime = 0;
  };

  return (
    <Container>
      <button onClick={() => onClickStart()}>시작</button>
      <button onClick={() => onClickStop()}>중지</button>

      <br />
      <br />
      <button onClick={() => volumeUp()}>볼륨 업</button>
      <button onClick={() => volumeDown()}>볼륨 다운</button>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 70vh;
  position: relative;
`;

export default RecordEdit;

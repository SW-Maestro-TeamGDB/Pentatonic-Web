import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import './AudioPlayer.css';

import instrument from '../CoverMaking/inst.mp3';

const RecordEdit = (props) => {
  const { audioFile, setAudioFile, inst } = props;

  const audio = new Audio(audioFile);
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaElementSource(audio);
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5;
  const gainConnected = audioSource.connect(gainNode);
  gainConnected.connect(audioContext.destination);

  // 리버브
  const mix = 0.5;
  const [time, setTime] = useState(0.001);
  const [decay, setDecay] = useState(0.001);

  const generateImpulseResponse = () => {
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * time;
    const impulse = audioContext.createBuffer(2, length, sampleRate);

    const leftImpulse = impulse.getChannelData(0);
    const rightImpulse = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      leftImpulse[i] =
        (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      rightImpulse[i] =
        (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }

    return impulse;
  };

  const inputNode = audioContext.createGain();
  const wetGainNode = audioContext.createGain();
  const dryGainNode = audioContext.createGain();
  const reverbNode = audioContext.createConvolver();
  const outputNode = audioContext.createGain();

  audioSource.connect(inputNode);

  // Dry 소스 노드 연결
  inputNode.connect(dryGainNode);
  dryGainNode.connect(outputNode);
  dryGainNode.gain.value = 1 - mix;

  // IR을 생성하여 Convolver의 오디오 버퍼에 입력해준다.
  reverbNode.buffer = generateImpulseResponse();

  // Wet 소스 노드 연결
  inputNode.connect(reverbNode);
  reverbNode.connect(wetGainNode);
  wetGainNode.connect(outputNode);
  wetGainNode.gain.vaule = mix;

  outputNode.connect(audioContext.destination);
  //리버브 끝

  const volumeUp = () => {
    if (gainNode.gain.value > 2) {
      gainNode.gain.value = 2;
    } else {
      gainNode.gain.value += 0.2;
    }
  };

  const volumeDown = () => {
    if (gainNode.gain.value < 0) {
      gainNode.gain.value = 0;
    } else {
      gainNode.gain.value -= 0.2;
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
      <AudioPlayerContainer>
        <AudioPlayer
          src={audioFile ? audioFile.url : null}
          onPlay={() => console.log('play')}
          onPause={() => console.log('pause')}
          onClickStop={() => console.log('stop')}
          onSeeked={() => {
            console.log('seeked');
          }}
          onSeeking={() => console.log('seeking')}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            <div>-</div>,
            RHAP_UI.CURRENT_LEFT_TIME,
          ]}
        />
      </AudioPlayerContainer>
      {/* <button onClick={() => onClickStart()}>시작</button>
      <button onClick={() => onClickStop()}>중지</button>

      <br />
      <br />
      <button onClick={() => volumeUp()}>볼륨 업</button>
      <button onClick={() => volumeDown()}>볼륨 다운</button>
      <br />
      <br />
      <h2>리버브: {time} </h2>
      <button
        onClick={() => {
          setTime(time + 0.1);
          setDecay(decay + 0.1);
        }}
      >
        리버브 +
      </button>
      <button
        onClick={() => {
          setTime(time - 0.1);
          setDecay(decay - 0.1);
        }}
      >
        리버브 -
      </button> */}
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 70vh;
  position: relative;
`;

const AudioPlayerContainer = styled.div`
  margin-top: 3rem;
`;

export default RecordEdit;

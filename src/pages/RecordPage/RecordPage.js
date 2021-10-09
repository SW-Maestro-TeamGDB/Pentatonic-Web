import react, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { Progress, Modal, notification } from 'antd';
import RecordModal from '../../components/RecordModal/RecordModal';
import MicAuthModal from '../../components/MicAuthModal';
import AudioVisualizer from '../../components/AudioVisualizer';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import RetryIcon from '../../images/RetryIcon.svg';
import PauseIcon from '../../images/PauseIcon.png';
import SaveIcon from '../../images/SaveIcon.svg';
import tempLyric from './lyrics.json';
import { LeftOutlined, PauseOutlined } from '@ant-design/icons';
import hihat from './hihat.mp3';

const RecordPage = (props) => {
  const {
    setPage,
    setAudioFile,
    audioDuration,
    inst,
    bandData,
    songData,
    isFreeCover,
  } = props;
  const [countdown, setCountDown] = useState(4);
  const [audioCtx, setAudioCtx] = useState();
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(0); // 0: 정지 , 1: 녹음, 2: 일시정지
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [count, setCount] = useState(0);
  const [micAuthModalToggle, setMicAuthModalToggle] = useState(false);

  const isMobile = useMediaQuery({
    query: '(max-width:1024px)',
  });

  const canSave = ((onRec === 0 && audioUrl) || onRec === 2) && countdown === 4;

  // wav 파일 저장
  const [sampleRate, setSampleRate] = useState();
  const [leftChannel, setLeftChannel] = useState([]);
  const [rightChannel, setRightChannel] = useState([]);
  const [recordingLength, setRecordingLength] = useState(0);

  const mergeBuffers = (channelBuffer, recordingLength) => {
    let result = new Float32Array(recordingLength);
    let offset = 0;
    let lng = channelBuffer.length;
    for (let i = 0; i < lng; i++) {
      let buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  };

  const interleave = (leftChannel, rightChannel) => {
    let length = leftChannel.length + rightChannel.length;
    let result = new Float32Array(length);

    let inputIndex = 0;

    for (let index = 0; index < length; ) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  };

  const writeUTFBytes = (view, offset, string) => {
    let lng = string.length;
    for (let i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // 카운트다운
  const [countdownState, setCountDownState] = useState(false);
  const [second, setSecond] = useState();
  const [minute, setMinute] = useState();
  const [audioSecond, setAudioSecond] = useState(parseInt(audioDuration) % 60);
  const [audioMinute, setAudioMinute] = useState(parseInt(audioDuration) / 60);

  // 언마운트를 위한 useRef
  const mediaRef = useRef();
  const analyserRef = useRef();
  const sourceRef = useRef();
  const streamRef = useRef();
  const audioCtxRef = useRef();

  useEffect(() => {
    audioCtxRef.current = audioCtx;
  }, [audioCtx]);

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  useEffect(() => {
    mediaRef.current = media;
  }, [media]);

  useEffect(() => {
    analyserRef.current = analyser;
  }, [analyser]);

  useEffect(() => {
    sourceRef.current = source;
  }, [source]);

  //

  const hihatSound = new Audio();
  hihatSound.src = hihat;

  // 카운트 다운

  const runCountDown = () => {
    if (countdown > 1 && countdown <= 4) {
      hihatSound.currentTime = 0;
      hihatSound.play();
    }
    setCountDown((countdown) => countdown - 1);
  };

  // const startCountDown = () => {
  //   setCountDownState(true);
  //   runCountDown();
  //   setTimeout(() => {
  //     runCountDown();
  //     setTimeout(() => {
  //       runCountDown();
  //       setTimeout(() => {
  //         setCountDown(4);
  //         setOnRec(1);
  //         onRecAudio();
  //         setCountDownState(false);
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // };

  const startCountDown = () => {
    setCountDownState(true);
    runCountDown();
  };

  // countdown interval => useEffect로 1초마다 생성후 제거
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 1 && countdown < 4 && countdownState === true) {
        runCountDown();
      } else {
        if (countdown === 1) {
          setCountDownState(false);
          setCountDown(4);
          setOnRec(1);
          onRecAudio();
        }

        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  // 모달
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {
    setModalToggle(true);
  }, []);

  // 가사
  const lyrics = tempLyric.lyrics;
  const lyricsLength = lyrics.length;
  const [lyricsIndex, setLyricsIndex] = useState(0);
  const [endTime, setEndTime] = useState(lyrics[0].end);

  useEffect(() => {
    if (count > endTime && lyricsIndex < lyricsLength - 1) {
      setEndTime(lyrics[lyricsIndex + 1].end);
      setLyricsIndex(lyricsIndex + 1);
    }

    const time = count;
    const remain = audioDuration - count;

    setSecond(time % 60);
    setMinute(parseInt(time / 60));

    setAudioSecond(remain % 60);
    setAudioMinute(parseInt(remain / 60));
  }, [count]);

  const init = () => {
    if (onRec === 1) {
      offRecAudio();
    }
    // 배경음악 중지 및 초기화
    if (inst) {
      inst.pause();
      inst.currentTime = 0;
    }
    setEndTime(lyrics[0].end);
    setLyricsIndex(0);
  };

  const onClickStart = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => startCountDown())
      .catch(() => setMicAuthModalToggle(true));
  };

  const onClickStop = () => {
    init();
    setPage(0);
  };

  const onClickPause = () => {
    if (inst) inst.pause();
    if (audioCtx) audioCtx.suspend();
    if (media && media.state === 'recording') {
      media.pause();
    }
    setOnRec(2);
  };

  const onClickResume = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (inst) inst.play();
        audioCtx.resume();
        if (media.state === 'paused') {
          media.resume();
        }
        setOnRec(1);
      })
      .catch(() => setMicAuthModalToggle(true));
  };

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioCtx(audioCtx);

    // wav 파일 저장
    setSampleRate(audioCtx.sampleRate);

    let bufferSize = 2048;

    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    // const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    const analyser = audioCtx.createScriptProcessor(bufferSize, 2, 2); // 테스트
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      init();

      if (inst) inst.play();
      mediaRecorder.start();

      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      setOnRec(1);

      analyser.onaudioprocess = function (e) {
        let left = e.inputBuffer.getChannelData(0);
        let right = e.inputBuffer.getChannelData(1);

        if (mediaRecorder.state === 'recording') {
          setCount(parseInt(e.playbackTime));

          // wav 파일 저장
          setLeftChannel((prev) => [...prev, new Float32Array(left)]);
          setRightChannel((prev) => [...prev, new Float32Array(right)]);
          setRecordingLength((recordingLength) => recordingLength + bufferSize);
        }

        if (mediaRecorder.state === 'paused') {
          setOnRec(2);
          mediaRecorder.pause();
        }
        // 곡 길이만큼 시간 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > audioDuration) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          init();

          // 녹음 중지
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
          setOnRec(0);

          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
          };
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setOnRec(0); // false 로 수정
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    if (media && media.state === 'recording') media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const makeAudioFile = () => {
    let leftBuffer = mergeBuffers(leftChannel, recordingLength);
    let rightBuffer = mergeBuffers(rightChannel, recordingLength);
    let interleaved = interleave(leftBuffer, rightBuffer);
    let buffer = new ArrayBuffer(44 + interleaved.length * 2);
    let view = new DataView(buffer);
    // RIFF chunk descriptor
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);
    // write the PCM samples
    let lng = interleaved.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < lng; i++) {
      view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
      index += 2;
    }
    const type = 'audio/mp3';
    // our final binary blob
    const blob = new Blob([view], { type: type });
    // 파일 이름 cover.mp3
    const file = new File([blob], 'cover.mp3', {
      lastModified: new Date().getTime(),
      type: type,
    });
    const audioUrl = URL.createObjectURL(blob);
    setAudioUrl(audioUrl);
    setAudioFile({
      blob: blob,
      url: audioUrl,
      file: file,
      type,
    });
  };

  const onSubmitAudioFile = () => {
    if (parseInt(count) < 60) {
      return notification['warning']({
        key: 'audioNotification',
        description: '1분 이상의 녹음만 저장 가능합니다',
        placement: 'bottomRight',
        duration: 3,
      });
    }

    makeAudioFile();

    if (onRec === 2) {
      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      if (media.state === 'recording') media.stop();
      // 메서드가 호출 된 노드 연결 해제
      analyser.disconnect();
      source.disconnect();
    }

    init();
    setPage(2);
  };

  // 페이지 벗어날시 반주 재생과 녹음 중지
  useEffect(() => {
    return () => {
      // 언마운트시 state 값 useRef로 접근

      // audicContext가 만들어졌을 경우만 (카운트다운 제외)
      if (audioCtxRef.current) {
        streamRef.current.getAudioTracks().forEach(function (track) {
          track.stop();
        });

        if (mediaRef.current.state === 'recording') mediaRef.current.stop();
        analyserRef.current.disconnect();
        sourceRef.current.disconnect();
      }

      init();
      setCountDownState(false);
    };
  }, []);

  const showRecordingState = useMemo(() => {
    if (countdown !== 4) {
      return <CountDownText>{countdown}</CountDownText>;
    }

    if (onRec === 0) {
      return (
        <CustomPlayIcon
          src={audioCtx ? RetryIcon : PlayIcon}
          onClick={onClickStart}
        />
      );
    } else if (onRec === 1) {
      // return <CustomPauseIcon onClick={onClickPause} />;
      return (
        <PauseIconContainer>
          <CustomPauseIcon src={PauseIcon} onClick={onClickPause} />
        </PauseIconContainer>
      );
    } else if (onRec === 2) {
      return <CustomPlayIcon src={PlayIcon} onClick={onClickResume} />;
    }
  }, [onRec, countdown]);

  const showAudioDuration = useMemo(() => {
    return (
      <ProgressContainer>
        <CustomProgress
          percent={(count / audioDuration) * 100}
          showInfo={false}
          strokeColor="black"
        />
        <TimeContainer>
          <CurrentTimeContainer>
            {minute}
            {':'}
            {second < 10 ? '0' + second : second}
          </CurrentTimeContainer>
          <RemainTimeContainer>
            {'- '}
            {audioMinute}
            {':'}
            {audioSecond < 10 ? '0' + audioSecond : audioSecond}
          </RemainTimeContainer>
        </TimeContainer>
      </ProgressContainer>
    );
  }, [audioDuration, count, minute, second, audioMinute, audioSecond]);

  const showVisualizer = useMemo(() => {
    return (
      <AudioVisualizer
        audioCtx={audioCtx}
        source={sourceRef.current}
        width={'500rem'}
        height={'180rem'}
      ></AudioVisualizer>
    );
  }, [audioCtx, sourceRef.current]);

  const showLyrics = useMemo(() => {
    return (
      <LyricsContainer>
        <CurrentLyrics>{lyrics[lyricsIndex].text}</CurrentLyrics>
        <NextLyrics>
          {lyricsIndex < lyricsLength - 1 ? lyrics[lyricsIndex + 1].text : 'ㅤ'}
        </NextLyrics>
      </LyricsContainer>
    );
  }, [lyrics, lyricsIndex]);

  const showBackground = useMemo(() => {
    return (
      <Background url={isFreeCover ? bandData.backGroundURI : songData.songImg}>
        <BackwardButton onClick={() => onClickStop()}>
          <LeftOutlined />
          <BackwardText>커버 정보 입력</BackwardText>
        </BackwardButton>
        <BackgroundBlur>
          <IconContainer canSave={canSave}>
            {showRecordingState}
            {canSave ? (
              <CustomPlayIcon
                src={SaveIcon}
                onClick={() => onSubmitAudioFile()}
              />
            ) : null}
          </IconContainer>
          {isFreeCover ? null : showLyrics}
          <VisualizerContainer onRec={onRec}>
            {showVisualizer}
          </VisualizerContainer>
        </BackgroundBlur>
      </Background>
    );
  }, [onRec, audioCtx, countdown, lyrics, lyricsIndex, sourceRef.current]);

  const showRecordModal = useMemo(() => {
    <RecordModal modalToggle={modalToggle} setModalToggle={setModalToggle} />;
  }, [modalToggle]);

  const showMicAuthModal = useMemo(() => {
    <MicAuthModal
      modalToggle={micAuthModalToggle}
      setModalToggle={setMicAuthModalToggle}
    />;
  }, [micAuthModalToggle]);

  return (
    <Container>
      {/* <RecordModal modalToggle={modalToggle} setModalToggle={setModalToggle} /> */}
      {/* <MicAuthModal
        modalToggle={micAuthModalToggle}
        setModalToggle={setMicAuthModalToggle}
      /> */}
      {showRecordModal}
      {showMicAuthModal}
      {showBackground}
      {/* <Background url={isFreeCover ? bandData.backGroundURI : songData.songImg}>
        <BackwardButton onClick={() => onClickStop()}>
          <LeftOutlined />
          <BackwardText>커버 정보 입력</BackwardText>
        </BackwardButton>
        <BackgroundBlur>
          <IconContainer canSave={canSave}>
            {showRecordingState}
            {canSave ? (
              <CustomPlayIcon
                src={SaveIcon}
                onClick={() => onSubmitAudioFile()}
              />
            ) : null}
          </IconContainer>
          {isFreeCover ? null : showLyrics}
          {isMobile ? null : (
            <VisualizerContainer onRec={onRec}>
              {showVisualizer}
            </VisualizerContainer>
          )}
        </BackgroundBlur>
      </Background> */}
      {isFreeCover ? null : showAudioDuration}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;
`;

const CurrentTimeContainer = styled.div`
  font-weight: 800;
`;

const RemainTimeContainer = styled.div`
  font-weight: 800;
  color: #6236ff;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: ${(props) => (props.canSave ? 'space-between' : 'center')};
  align-items: center;
  width: 20%;
`;

const VisualizerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -55%);
  width: 100%;
  height: 25rem;
  z-index: -1;
  visibility: ${(props) => (props.onRec === 1 ? 'visible' : 'hidden')};

  -webkit-filter: blur(2px) brightness(80%);
  filter: blur(2px) brightness(80%);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background: url(${(props) => (props.url ? props.url : null)});
  background-size: cover;
  margin-top: 5vh;
  height: 60vh;
  z-index: 1;
  position: relative;
  border-radius: 1rem;
`;

const BackgroundBlur = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(2px) brightness(40%);
  backdrop-filter: blur(2px) brightness(40%);
  z-index: 2;
  border-radius: 1rem;
`;

const SubmitContainer = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3vh;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

const BackwardButton = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: 1.2rem;
  top: 5%;
  left: 2%;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    color: lightgray;
  }
`;

const CountDownText = styled.div`
  font-size: 5rem;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
`;

const BackwardText = styled.span`
  margin-left: 1rem;
  font-size: 80%;
`;

const CurrentLyrics = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

const NextLyrics = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(50, 50, 50);
`;

const LyricsContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, 0);
  width: 85%;

  background: rgba(255, 255, 255, 0.8);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
`;

const ProgressContainer = styled.div`
  padding: 0 0.5rem;
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TimeContainer = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const SaveIconImg = styled.img`
  filter: invert(100%);
  margin-left: 0.5rem;
`;

const CustomProgress = styled(Progress)`
  width: 100%;
`;

const CustomSaveIcon = styled.img`
  filter: invert(100%);
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  &:hover {
    /* color: rgb(100, 100, 100); */
    transform: scale(1.03);
  }
`;

const CustomPlayIcon = styled.img`
  filter: invert(100%);
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  &:hover {
    /* color: rgb(100, 100, 100); */
    transform: scale(1.03);
  }
`;

const CustomPauseIcon = styled.img`
  filter: invert(100%);
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  opacity: 0;
`;

const PauseIconContainer = styled.div`
  width: 50rem;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${CustomPauseIcon} {
      transform: scale(1.03);
      opacity: 1;
    }
  }
`;

export default RecordPage;

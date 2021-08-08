import react, { useState, useEffect, useCallback, useRef } from 'react';
import { Progress, Modal, notification } from 'antd';
import RecordModal from '../../components/RecordModal/RecordModal';
import MicAuthModal from '../../components/MicAuthModal';
// import AudioVisualizer from '../../components/AudioVisualizer';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import RetryIcon from '../../images/RetryIcon.svg';
import SaveIcon from '../../images/SaveIcon.svg';
import tempLyric from './lyrics.json';
import { LeftOutlined, PauseOutlined } from '@ant-design/icons';
import hihat from './hihat.mp3';

const RecordPage = (props) => {
  const { setPage, setAudioFile, audioDuration, inst } = props;
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

  const hihatSound = new Audio();
  hihatSound.src = hihat;

  // 카운트 다운

  const startCountDown = () => {
    hihatSound.play();
    setCountDown(3);
    setTimeout(() => {
      hihatSound.play();
      setCountDown(2);
      setTimeout(() => {
        hihatSound.play();
        setCountDown(1);
        setTimeout(() => {
          setCountDown(4);
          setOnRec(1);
          onRecAudio();
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // const startCountDown = () => {
  //   setCountDown(3);
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (countdown > 0 && countdown < 4) {
  //       setCountDown((countdown) => countdown - 1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   if (countdown <= 0) {
  //     setCountDown(4);
  //     setOnRec(1);
  //     onRecAudio();
  //   }

  //   return () => clearInterval(interval);
  // }, [countdown]);

  const showRecordingState = () => {
    if (countdown !== 4) {
      return <CountDownText>{countdown}</CountDownText>;
    }

    if (onRec === 0) {
      return (
        <CustomPlayIcon
          src={audioUrl ? RetryIcon : PlayIcon}
          onClick={onClickStart}
        />
      );
    } else if (onRec === 1) {
      return <CustomPauseIcon onClick={onClickPause} />;
    } else if (onRec === 2) {
      return <CustomPlayIcon src={PlayIcon} onClick={onClickResume} />;
    }
  };

  // 모달
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {
    // console.log(onRec);
  }, [onRec]);

  useEffect(() => {
    setModalToggle(true);
  }, []);

  // 임시 가사
  const lyrics = tempLyric.lyrics;
  const lyricsLength = lyrics.length;
  const [lyricsIndex, setLyricsIndex] = useState(0);
  const [endTime, setEndTime] = useState(lyrics[0].end);

  // 매 count 갱신마다 렌더하므로 방법 고민해볼것
  useEffect(() => {
    if (count > endTime && lyricsIndex < lyricsLength - 1) {
      setEndTime(lyrics[lyricsIndex + 1].end);
      setLyricsIndex(lyricsIndex + 1);
    }
  }, [count]);

  const init = () => {
    // 배경음악 중지 및 초기화
    inst.pause();
    inst.currentTime = 0;
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
    if (onRec === 1) offRecAudio();
    init();
    setPage(0);
  };

  const onClickPause = () => {
    inst.pause();
    audioCtx.suspend();
    if (media.state === 'recording') {
      media.pause();
    }
    setOnRec(2);
  };

  const onClickResume = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        inst.play();
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
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        init();
        inst.play();
        mediaRecorder.start();

        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
        setOnRec(1);

        analyser.onaudioprocess = function (e) {
          if (mediaRecorder.state === 'recording') {
            setCount(e.playbackTime);
          }
          if (mediaRecorder.state === 'paused') {
            setOnRec(2);
            mediaRecorder.pause();
          }
          // 30초 지나면 자동으로 음성 저장 및 녹음 중지
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
              setAudioFile(window.URL.createObjectURL(e.data));
              // setOnRec(0);
            };
          } else {
            // setOnRec(1);
          }
        };
      })
      .catch(() => {
        // setMicAuthModalToggle(true);
      });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(0); // false 로 수정
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const goToNextPage = () => {};

  const onSubmitAudioFile = () => {
    if (parseInt(count) < 60) {
      return notification['warning']({
        key: 'audioNotification',
        message: '',
        description: '1분 이상의 녹음만 저장 가능합니다',
        placement: 'bottomRight',
        duration: 3,
      });
    }

    media.ondataavailable = (e) => {
      setAudioFile(window.URL.createObjectURL(e.data));
    };

    if (onRec === 1) {
      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      media.stop();
      // 메서드가 호출 된 노드 연결 해제
      analyser.disconnect();
      source.disconnect();
    }

    init();
    setPage(2);
  };

  return (
    <Container>
      <RecordModal modalToggle={modalToggle} setModalToggle={setModalToggle} />
      <MicAuthModal
        modalToggle={micAuthModalToggle}
        setModalToggle={setMicAuthModalToggle}
      />
      <BackwardButton onClick={() => onClickStop()}>
        <LeftOutlined />
        <BackwardText>커버 정보 입력</BackwardText>
      </BackwardButton>
      <IconContainer>{showRecordingState()}</IconContainer>
      <LyricsContainer>
        <CurrentLyrics>{lyrics[lyricsIndex].text}</CurrentLyrics>
        <NextLyrics>
          {lyricsIndex < lyricsLength - 1 ? lyrics[lyricsIndex + 1].text : 'ㅤ'}
        </NextLyrics>
      </LyricsContainer>
      <ProgressContainer>
        {/* audioDuration의 길이를 알기 떄문에 animation 형식으로 바꾸는것 고려 */}
        <CustomProgress
          percent={(count / audioDuration) * 100}
          showInfo={false}
          strokeColor="black"
        />
      </ProgressContainer>
      {/* <VisualizerContainer>
        {audioCtx && onRec === 1 ? (
          <AudioVisualizer audioCtx={audioCtx}></AudioVisualizer>
        ) : null}
      </VisualizerContainer> */}
      {((onRec === 0 && audioUrl) || onRec === 2) && countdown === 4 ? (
        <SubmitContainer>
          <SubmitButton
            onClick={() => onSubmitAudioFile()}
            disabled={count < 60}
          >
            저장하기
            <SaveIconImg src={SaveIcon} />
          </SubmitButton>
        </SubmitContainer>
      ) : null}
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 40%;
  z-index: 2;
`;

const VisualizerContainer = styled.div`
  height: 60%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const SubmitContainer = styled.div`
  height: 2rem;
  position: absolute;
  bottom: 5%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  z-index: 2;
  font-size: 1.2rem;
  top: 5%;
  left: 0%;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: gray;
  }
`;

const CountDownText = styled.div`
  font-size: 6rem;
  font-weight: 900;
`;

const BackwardText = styled.span`
  margin-left: 1rem;
  font-size: 80%;
`;

const CurrentLyrics = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
`;

const NextLyrics = styled.div`
  font-size: 1.2rem;
  color: rgba(160, 160, 160);
`;

const LyricsContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 25%;
  transform: translate(-50%, -50%);
  width: 40vw;
  z-index: 2;
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const SaveIconImg = styled.img`
  filter: invert(100%);
  margin-left: 0.5rem;
`;

const CustomProgress = styled(Progress)`
  width: 40vw;
`;

const CustomPlayIcon = styled.img`
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  width: 4rem;
  height: 4rem;

  &:hover {
    color: rgb(100, 100, 100);
    transform: scale(1.05);
  }
`;

const CustomPauseIcon = styled(PauseOutlined)`
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  font-size: 5rem;
  color: lightgray;
  width: 5rem;
  text-align: center;

  &:hover {
    color: black;
    transform: scale(1.05);
  }
`;

export default RecordPage;

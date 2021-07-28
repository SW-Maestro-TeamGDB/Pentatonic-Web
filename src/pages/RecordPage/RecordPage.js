import react, { useState, useEffect, useCallback } from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';
import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import RetryIcon from '../../images/RetryIcon.svg';
import SaveIcon from '../../images/SaveIcon.svg';

const RecordPage = (props) => {
  const { setPage, setAudioFile, audioDuration } = props;
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [count, setCount] = useState(0);

  const onClickStop = () => {
    offRecAudio();
    setPage(0);
  };

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        setCount(e.playbackTime);
        // 30초 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > audioDuration) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setAudioFile(window.URL.createObjectURL(e.data));
            setOnRec(true);
            // setPage(2);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(false); // false 로 수정
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

  const onSubmitAudioFile = () => {
    if (audioUrl) {
      setAudioFile(window.URL.createObjectURL(audioUrl)); // 오디오 파일 url로 저장
      setPage(2);
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio',
    });
  };

  return (
    <Container>
      <IconContainer>
        {onRec ? (
          <CustomPlayIcon
            src={audioUrl ? RetryIcon : PlayIcon}
            onClick={onRecAudio}
          />
        ) : (
          <CustomStopIcon src={StopIcon} onClick={onClickStop} />
        )}
        {onRec && audioUrl ? (
          <CustomPlayIcon src={SaveIcon} onClick={onSubmitAudioFile} />
        ) : null}
      </IconContainer>
      <ProgressContainer>
        <CustomProgress
          percent={(count / audioDuration) * 100}
          showInfo={false}
          strokeColor="black"
        />
      </ProgressContainer>
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
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomProgress = styled(Progress)`
  width: 30rem;
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

export default RecordPage;

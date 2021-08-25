import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import GridContainer from '../../components/GridContainer/GridContainer';
import UploadCompleteModal from '../../components/UploadCompleteModal';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import RecordEditSlider from '../../components/RecordEditSlider';

import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

import './AudioPlayer.css';

const CREATE_BAND = gql`
  mutation Mutation($createBandInput: CreateBandInput!) {
    createBand(input: $createBandInput) {
      bandId
    }
  }
`;

const UPLOAD_COVER_FILE = gql`
  mutation Mutation($uploadCoverFileInput: UploadCoverFileInput!) {
    uploadCoverFile(input: $uploadCoverFileInput)
  }
`;

const UPLOAD_COVER = gql`
  mutation UploadCoverMutation($uploadCoverInput: UploadCoverInput!) {
    uploadCover(input: $uploadCoverInput) {
      coverId
      coverURI
    }
  }
`;

const JOIN_BAND = gql`
  mutation JoinBandMutation($joinBandInput: JoinBandInput!) {
    joinBand(input: $joinBandInput)
  }
`;

const RecordEdit = (props) => {
  const {
    setPage,
    audioFile,
    inst,
    bandData,
    bandId,
    setBandId,
    selectedSession,
    session,
  } = props;
  // 업로드 모달
  const [modalToggle, setModalToggle] = useState(false);
  const [coverURI, setCoverURI] = useState();
  const [coverId, setCoverId] = useState();
  const [modalLoading, setModalLoading] = useState(true);

  console.log(audioFile);

  // slider value
  const [volume, setVolume] = useState(50);
  const [sync, setSync] = useState(-20);
  const [reverb, setReverb] = useState(0);
  const [gain, setGain] = useState(0);

  const [uploadCoverFile, uploadCoverFileResult] = useMutation(
    UPLOAD_COVER_FILE,
    {
      fetchPolicy: 'no-cache',
      onError: (error) => {
        console.log(error);
      },
      onCompleted: (data) => {
        setCoverURI(data.uploadCoverFile);
        uploadCover({
          variables: {
            uploadCoverInput: {
              cover: {
                name: bandData.name,
                coverURI: data.uploadCoverFile,
                songId: bandData.songId,
                position: selectedSession,
              },
            },
          },
        });
      },
    },
  );

  const [uploadCover, uploadCoverResult] = useMutation(UPLOAD_COVER, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setCoverURI(data.uploadCover.coverURI);
      setCoverId(data.uploadCover.coverId);
      createBand({
        variables: {
          createBandInput: { sessionConfig: session, band: bandData },
        },
      });
    },
  });

  const [createBand, createBandResult] = useMutation(CREATE_BAND, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setBandId(data.createBand.bandId);
      joinBand({
        variables: {
          joinBandInput: {
            band: {
              bandId: data.createBand.bandId,
            },
            session: {
              position: selectedSession,
              coverId: coverId,
            },
          },
        },
      });
    },
  });

  const [joinBand, joinBandResult] = useMutation(JOIN_BAND, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setModalLoading(false);
    },
  });

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

  const onClickStart = (e) => {
    inst.play();
  };

  const onClickPause = () => {
    inst.pause();
  };

  const onClickSeeked = (e) => {
    inst.currentTime = e.target.currentTime;
  };

  const onClickSeeking = () => {
    inst.pause();
  };

  const submitRecord = () => {
    setModalToggle(true);
    uploadCoverFile({
      variables: {
        uploadCoverFileInput: { file: audioFile.file },
      },
    });
  };

  // 언마운트시 반주 정지
  useEffect(() => {
    return () => {
      inst.pause();
      inst.currentTime = 0;
    };
  }, []);

  return (
    <Container>
      <AudioPlayerContainer>
        <AudioPlayer
          src={audioFile ? audioFile.url : null}
          onPlay={() => onClickStart()}
          onPause={() => onClickPause()}
          onClickStop={() => console.log('stop')}
          onSeeked={(e) => {
            onClickSeeked(e);
          }}
          onSeeking={() => console.log('seeking')}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          autoPlay={false}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            <div>-</div>,
            RHAP_UI.CURRENT_LEFT_TIME,
          ]}
        />
      </AudioPlayerContainer>
      <EditConatiner>
        <GridContainer>
          <RecordEditSlider
            value={volume}
            setValue={setVolume}
            title="볼륨 조절"
            desc={`${volume}%`}
            max={100}
            min={0}
          />
          <RecordEditSlider
            value={sync}
            setValue={setSync}
            title="싱크 조절"
            desc={`${sync}ms`}
            max={200}
            min={-500}
            unit={5}
          />
          <RecordEditSlider
            value={reverb}
            setValue={setReverb}
            title="리버브"
            desc={`${reverb}%`}
            max={100}
            min={0}
          />
          <RecordEditSlider
            value={gain}
            setValue={setGain}
            title="게인"
            desc={`${gain}%`}
            max={100}
            min={0}
          />
        </GridContainer>
      </EditConatiner>
      <ButtonConatiner>
        <BackwardButton onClick={() => setPage(1)}>
          다시 녹음하기
        </BackwardButton>
        <SubmitButton onClick={submitRecord}>업로드</SubmitButton>
      </ButtonConatiner>
      <UploadCompleteModal
        setModalToggle={setModalToggle}
        modalToggle={modalToggle}
        modalLoading={modalLoading}
      />
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
  width: 90%;
  position: relative;
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AudioPlayerContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const EditConatiner = styled.div`
  display: flex;
  margin: 3rem 0;
  width: 100%;
`;

const ButtonConatiner = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  justify-content: space-evenly;
`;

const BackwardButton = styled.div`
  border-radius: 10px;
  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

const BackwardText = styled.span`
  margin-left: 1rem;
  font-size: 80%;
`;

const SubmitButton = styled.div`
  border-radius: 10px;
  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  background-size: 500%;

  display: flex;
  justify-content: center;
  align-items: center;

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

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const CustomSlider = styled(Slider)`
  width: 80%;
`;

const SliderPlusIcon = styled(PlusOutlined)`
  width: 10%;
  cursor: pointer;
  color: gray;
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;

  &:hover {
    color: #000000;
  }
`;

const SliderMinusIcon = styled(MinusOutlined)`
  width: 10%;
  cursor: pointer;
  color: gray;
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;
  &:hover {
    color: #000000;
  }
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const SliderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const SliderValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

export default RecordEdit;

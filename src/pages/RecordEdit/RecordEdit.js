import react, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import GridContainer from '../../components/GridContainer/GridContainer';
import UploadCompleteModal from '../../components/UploadCompleteModal';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import RecordEditSlider from '../../components/RecordEditSlider';
import { createSilentAudio } from 'create-silent-audio';
import Pizzicato from 'pizzicato';

import PlayIcon from '../../images/PlayIcon.svg';
import StopIcon from '../../images/StopIcon.svg';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

import '../../styles/AudioPlayer.css';

const UPLOAD_FREE_SONG = gql`
  mutation UploadFreeSongMutation($uploadFreeSongInput: UploadFreeSongInput!) {
    uploadFreeSong(input: $uploadFreeSongInput)
  }
`;

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
    setInst,
    bandData,
    setBandData,
    bandId,
    setBandId,
    selectedSession,
    session,
    cover,
    isFreeCover,
    userId,
    songData,
    instDuration,
    audioDuration,
    existingInst,
    history,
  } = props;
  // 업로드 모달
  const [modalToggle, setModalToggle] = useState(false);
  const [coverURI, setCoverURI] = useState();
  const [coverId, setCoverId] = useState();
  const [modalLoading, setModalLoading] = useState(true);

  const [audioState, setAudioState] = useState(0); // 0: 정지 , 1:재생, 2:일시정지
  const [reverbEffect, setReverbEffect] = useState();

  // slider value
  const [volume, setVolume] = useState(80);
  const [sync, setSync] = useState(0);
  const [reverb, setReverb] = useState(0);
  const [gain, setGain] = useState(0);

  // 녹음 사운드
  const [recordSound, setRecordSound] = useState();
  // 언마운트를 위한 녹음 사운드 ref
  const recordSoundRef = useRef();
  const loadingRef = useRef();

  const [uploadCoverFile, uploadCoverFileResult] = useMutation(
    UPLOAD_COVER_FILE,
    {
      fetchPolicy: 'no-cache',
      onError: (error) => {
        console.log(error);
      },
      onCompleted: (data) => {
        setCoverURI(data.uploadCoverFile);
        if (isFreeCover) {
          uploadFreeSong({
            variables: {
              uploadFreeSongInput: {
                song: {
                  name: songData.name,
                  songURI: data.uploadCoverFile,
                  artist: songData.artist,
                  songImg: bandData.backGroundURI,
                },
              },
            },
          });
        } else {
          uploadCover({
            variables: {
              uploadCoverInput: {
                cover: {
                  name: bandData.name,
                  coverURI: data.uploadCoverFile,
                  songId: songData.songId,
                  position: selectedSession,
                },
                filter: {
                  syncDelay: sync / 1000,
                  reverb: (reverb / 100) * 6,
                },
              },
            },
          });
        }
      },
    },
  );

  const [uploadFreeSong, uploadFreeSongResult] = useMutation(UPLOAD_FREE_SONG, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      alert('Error');
      console.log(error);
    },
    onCompleted: (data) => {
      setBandData({ ...bandData, songId: data.uploadFreeSong });
      uploadCover({
        variables: {
          uploadCoverInput: {
            cover: {
              name: bandData.name,
              coverURI: coverURI,
              songId: data.uploadFreeSong,
              position: selectedSession,
            },
            filter: {
              syncDelay: sync / 1000,
              reverb: (reverb / 100) * 6,
            },
          },
        },
      });
    },
  });

  const [uploadCover, uploadCoverResult] = useMutation(UPLOAD_COVER, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setCoverId(data.uploadCover.coverId);
      if (cover) {
        createBand({
          variables: {
            createBandInput: { sessionConfig: session, band: bandData },
          },
        });
      } else {
        setModalLoading(false);
      }
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

  const onClickStart = (e) => {
    if (inst) {
      inst.play();
    }
    if (recordSound) {
      const tempTime = inst.currentTime - sync * 0.001;

      recordSound.play(
        tempTime < 0 ? -tempTime : 0,
        tempTime >= 0 ? tempTime : 0,
      );
    }
    if (existingInst && instDuration > inst.currentTime) {
      existingInst.play();
    }
    setAudioState(1);
  };

  const onClickPause = () => {
    if (inst) inst.pause();
    if (existingInst) existingInst.pause();
    if (recordSound) recordSound.pause();
    setAudioState(2);
  };

  const onClickSeeked = (e) => {
    if (inst) {
      inst.currentTime = e.target.currentTime;
      if (audioState === 1) {
        inst.play();
      }
    }
    if (recordSound) {
      recordSound.stop();

      const tempTime = inst.currentTime - sync * 0.001;

      recordSound.play(
        tempTime < 0 ? -tempTime : 0,
        tempTime >= 0 ? tempTime : 0,
      );

      if (audioState !== 1) {
        recordSound.pause();
      }
    }
    if (existingInst) {
      if (instDuration > e.target.currentTime) {
        existingInst.currentTime = e.target.currentTime;
        if (audioState === 1) existingInst.play();
      } else {
        existingInst.pause();
      }

      if (audioState !== 1 && !existingInst.paused) {
        existingInst.pause();
      }
    }
  };

  const onClickSeeking = (e) => {
    if (inst) {
      inst.pause();
    }
    if (recordSound) {
      recordSound.stop();
    }
    if (existingInst) {
      existingInst.pause();
    }
  };

  const submitRecord = () => {
    setModalToggle(true);
    uploadCoverFile({
      variables: {
        uploadCoverFileInput: { file: audioFile.file },
      },
    });
  };

  useEffect(() => {
    const temp = new Pizzicato.Sound(audioFile?.url);
    window.scrollTo(0, 0);

    // effect test
    // const temp = new Pizzicato.Sound(inst.src);
    setRecordSound(temp);

    const tempReverb = new Pizzicato.Effects.Reverb({
      time: 0.1,
      decay: 0.1,
      reverse: false,
      mix: 0.5,
    });
    setReverbEffect(tempReverb);

    if (instDuration) {
      const audio = new Audio();
      audio.src = createSilentAudio(audioDuration);
      setInst(audio);
    }

    // 언마운트시 반주 및 녹음파일 정지
    return () => {
      if (inst) {
        inst.pause();
        inst.currentTime = 0;
        if (existingInst) {
          existingInst.pause();
          existingInst.currentTime = 0;
        }
      }

      if (recordSoundRef) {
        recordSoundRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (recordSound) {
      recordSound.volume = volume * 0.01;
      const tempReverb = new Pizzicato.Effects.Reverb({
        time: 0.01,
        decay: 0.01,
        reverse: false,
        mix: 0.5,
      });
      setReverbEffect(tempReverb);
      recordSound.addEffect(tempReverb);
      recordSoundRef.current = recordSound;
    }
  }, [recordSound]);

  useEffect(() => {
    if (recordSound) {
      recordSound.volume = volume * 0.01;
    }
  }, [volume]);

  useEffect(() => {
    loadingRef.current = modalLoading;
  }, [modalLoading]);

  const changeSync = (sync) => {
    if (recordSound) {
      recordSound.stop();
      const tempTime = inst.currentTime - sync * 0.001;

      recordSound.play(
        tempTime < 0 ? -tempTime : 0,
        tempTime >= 0 ? tempTime : 0,
      );

      if (audioState !== 1) {
        recordSound.pause();
      }
    }
  };

  const addReverbEffect = (value) => {
    if (recordSound && reverbEffect) {
      recordSound.effects.forEach((v) => {
        recordSound.removeEffect(v);
      });

      const tempReverb = new Pizzicato.Effects.Reverb({
        time: (value / 100) * 3 + 0.01,
        decay: (value / 100) * 3,
        reverse: false,
        mix: (value / 100) * 0.5,
      });
      setReverbEffect(tempReverb);
      recordSound.addEffect(tempReverb);
    }

    if (value === 0) {
      recordSound.effects.forEach((v) => {
        recordSound.removeEffect(v);
      });
    }
  };

  useEffect(() => {
    const unBlock = history.block((location, action) => {
      if (!loadingRef.current) return true;
      else return `페이지를 이동하면 녹음 정보가 삭제됩니다. 이동하시겠습니까?`;
    });

    return () => {
      unBlock();
    };
  }, [history]);

  const showAudioPlayer = useMemo(() => {
    return (
      <AudioPlayerContainer>
        <AudioPlayer
          src={audioFile ? audioFile.url : null}
          onPlay={() => onClickStart()}
          onPause={() => onClickPause()}
          onSeeked={(e) => {
            onClickSeeked(e);
          }}
          onSeeking={(e) => {
            onClickSeeking(e);
          }}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          autoPlay={false}
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            <span className="dash">-</span>,
            RHAP_UI.CURRENT_LEFT_TIME,
          ]}
          volume={0}
        />
      </AudioPlayerContainer>
    );
  }, [
    audioFile,
    recordSound,
    onClickSeeked,
    onClickSeeking,
    onClickStart,
    onClickPause,
  ]);

  const showVolumeSlider = useMemo(() => {
    return (
      <RecordEditSlider
        value={volume}
        setValue={setVolume}
        title="볼륨 조절"
        desc={`${volume}%`}
        max={100}
        min={0}
      />
    );
  }, [volume]);

  const showSyncSlider = useMemo(() => {
    return (
      <RecordEditSlider
        value={sync}
        setValue={setSync}
        title="싱크 조절"
        desc={`${sync}ms`}
        max={0}
        min={-1000}
        unit={50}
        onAfterChange={() => changeSync(sync)}
        disable={isFreeCover}
        disableDesc="자유곡 커버 생성 시 싱크 조절이 불가능합니다"
      />
    );
  }, [sync]);

  const showReverbSlider = useMemo(() => {
    return (
      <RecordEditSlider
        value={reverb}
        setValue={setReverb}
        title="리버브"
        desc={`${reverb}db`}
        max={100}
        min={0}
        unit={5}
        onAfterChange={() => addReverbEffect(reverb)}
      />
    );
  }, [reverb]);

  const showGainSlider = useMemo(() => {
    return (
      <RecordEditSlider
        value={gain}
        setValue={setGain}
        title="게인"
        desc={`${gain}db`}
        max={100}
        min={0}
        unit={5}
        disable={true}
        disableDesc="게인효과는 프리미엄 회원에게 제공됩니다"
      />
    );
  }, [gain]);

  const showUploadCompleteModal = useMemo(() => {
    return (
      <UploadCompleteModal
        setModalToggle={setModalToggle}
        modalToggle={modalToggle}
        modalLoading={modalLoading}
        bandId={bandId}
        cover={cover}
      />
    );
  }, [modalToggle, modalLoading]);

  return (
    <Container>
      {showAudioPlayer}
      <EditConatiner>
        <GridContainer>
          {showVolumeSlider}
          {showSyncSlider}
          {showReverbSlider}
          {showGainSlider}
        </GridContainer>
      </EditConatiner>
      <ButtonConatiner>
        <BackwardButton
          onClick={() => {
            if (existingInst) setInst(existingInst);
            setPage(1);
          }}
        >
          다시 녹음하기
        </BackwardButton>
        <SubmitButton onClick={submitRecord}>업로드</SubmitButton>
      </ButtonConatiner>
      {showUploadCompleteModal}
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

const SpacingWithDash = styled.div``;

export default RecordEdit;

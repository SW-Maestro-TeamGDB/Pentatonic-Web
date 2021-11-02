import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Steps } from 'antd';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import instrument from '../CoverMaking/inst.mp3';
import RecordForm from '../RecordForm';
import { useMediaQuery } from 'react-responsive';
import { media, Desktop, Mobile, mobileCheck } from '../../lib/Media';
import LoginAuth from '../../lib/LoginAuth';
import NotFoundPage from '../NotFoundPage';

const { Step } = Steps;

const GET_SONG = gql`
  query Query($getSongSongId: ObjectID!) {
    getSong(songId: $getSongSongId) {
      name
      songImg
      duration
      artist
      lyrics
      instrument {
        position
        instURI
      }
    }
  }
`;

const RecordMaking = ({ match, history }) => {
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();
  const [sessionData, setSessionData] = useState();
  const [lyrics, setLyrics] = useState();
  const pageUrl = match.url;
  const songId = match.params.id;
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const [bandId, setBandId] = useState();
  const [bandData, setBandData] = useState({
    name: null,
    introduce: null,
    backGroundURI: null,
    songId: songId,
  });
  const [songData, setSongData] = useState();
  const [selectedSession, setSelectedSession] = useState(); // 녹음 참여 세션

  const { data } = useQuery(GET_SONG, {
    variables: {
      getSongSongId: songId,
    },
    onCompleted: (data) => {
      if (data.getSong.lyrics)
        setLyrics(JSON.parse(data.getSong.lyrics).lyrics);
      setSongData({
        ...songData,
        name: data.getSong.name,
        artist: data.getSong.artist,
        songImg: data.getSong.songImg,
        songId: songId,
      });
      setAudioDuration(parseInt(data.getSong.duration));
      setSessionData(data.getSong.instrument);
    },
    onError: (error) => {
      alert('에러');
      console.log(error);
    },
  });

  const initBandData = () => {
    setBandData({
      name: null,
      introduce: null,
      backGroundURI: null,
      songId: songId,
    });
  };

  const pages = [
    {
      description: '라이브러리 정보 입력',
      content: (
        <RecordForm
          setPage={setPage}
          audioDuration={audioDuration}
          pageUrl={pageUrl}
          bandData={bandData}
          setBandData={setBandData}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          setInst={setInst}
          songData={songData}
          sessionData={sessionData}
          initBandData={initBandData}
        />
      ),
    },
    {
      description: '녹음',
      content: (
        <RecordPage
          setPage={setPage}
          setAudioFile={setAudioFile}
          audioDuration={audioDuration}
          inst={inst}
          bandData={bandData}
          songData={songData}
          setInst={setInst}
          history={history}
          lyrics={lyrics}
        />
      ),
    },
    {
      description: '음원 편집',
      content: (
        <RecordEdit
          setPage={setPage}
          audioFile={audioFile}
          inst={inst}
          bandData={bandData}
          bandId={bandId}
          setBandId={setBandId}
          selectedSession={selectedSession}
          songData={songData}
          setInst={setInst}
          history={history}
        />
      ),
    },
  ];

  return (
    <>
      {isDesktop && !mobileCheck() ? (
        <LoginAuth>
          <PageContainer>
            <CustomSteps progressDot current={page}>
              {pages.map((item) => (
                <Step
                  progressDot
                  key={item.description}
                  description={item.description}
                />
              ))}
            </CustomSteps>
            <StepContents>{pages[page].content}</StepContents>
          </PageContainer>
        </LoginAuth>
      ) : (
        <NotFoundPage
          desc="커버녹음은 데스크탑 환경에서 가능합니다"
          icon={true}
        />
      )}
    </>
  );
};

const CustomSteps = styled(Steps)`
  width: 80%;
  margin-top: 1rem;
`;

const StepContents = styled.div`
  width: 100%;
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); */
  display: flex;
  justify-content: center;
  margin-bottom: 3vh;
`;

export default RecordMaking;

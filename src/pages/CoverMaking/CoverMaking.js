import react, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { Steps } from 'antd';
import PageContainer from '../../components/PageContainer';
import { GET_CURRENT_USER } from '../../apollo/cache';
import { useMediaQuery } from 'react-responsive';
import { media, Desktop, Mobile, mobileCheck } from '../../lib/Media';
import NotFoundPage from '../NotFoundPage';

import CoverForm from '../CoverForm';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';

import LoginAuth from '../../lib/LoginAuth';

const GET_SONG = gql`
  query Query($getSongSongId: ObjectID!) {
    getSong(songId: $getSongSongId) {
      name
      songImg
      duration
      artist
      instrument {
        position
        instURI
      }
    }
  }
`;

const { Step } = Steps;

const CoverMaking = ({ match, history }) => {
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();
  const [sessionData, setSessionData] = useState();
  const [userId, setUserId] = useState();
  const pageUrl = match.url;
  const songId = match.params.id;
  const isFreeCover = match.params.id === 'free';
  const isSolo = match.path.indexOf('band') === -1;
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const [bandId, setBandId] = useState();
  const [bandData, setBandData] = useState({
    name: null,
    introduce: null,
    backGroundURI: null,
    songId: songId,
    isSoloBand: isSolo,
  });
  const [songData, setSongData] = useState();

  const [session, setSession] = useState([]); // 세션 데이터
  const [selectedSession, setSelectedSession] = useState(); // 녹음 참여 세션

  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.user) {
      setUserId(data.user.id);
    }
  }, [data]);

  const [getSong] = useLazyQuery(GET_SONG, {
    fetchPolicy: 'network-only',
    variables: {
      getSongSongId: songId,
    },
    onCompleted: (data) => {
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

  useEffect(() => {
    if (songId !== 'free') getSong();
  }, [songId]);

  const initBandData = () => {
    setBandData({
      name: null,
      introduce: null,
      backGroundURI: null,
      songId: songId,
      isSoloBand: isSolo,
    });
  };

  const pages = [
    {
      description: '커버 정보 입력',
      content: (
        <CoverForm
          setPage={setPage}
          audioDuration={audioDuration}
          pageUrl={pageUrl}
          bandData={bandData}
          setBandData={setBandData}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          session={session}
          setSession={setSession}
          setInst={setInst}
          songData={songData}
          sessionData={sessionData}
          initBandData={initBandData}
          isFreeCover={isFreeCover}
          isSolo={isSolo}
          setSongData={setSongData}
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
          setInst={setInst}
          bandData={bandData}
          songData={songData}
          isFreeCover={isFreeCover}
          history={history}
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
          setBandData={setBandData}
          bandId={bandId}
          setBandId={setBandId}
          selectedSession={selectedSession}
          session={session}
          cover={true}
          isFreeCover={isFreeCover}
          userId={userId}
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

export default CoverMaking;

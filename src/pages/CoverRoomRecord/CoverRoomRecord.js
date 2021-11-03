import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Steps } from 'antd';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import instrument from '../CoverMaking/inst.mp3';
import ParticipationForm from '../ParticipationForm';
import NotFoundPage from '../NotFoundPage';
import { useMediaQuery } from 'react-responsive';
import { media, Desktop, Mobile, mobileCheck } from '../../lib/Media';

import LoginAuth from '../../lib/LoginAuth';

const { Step } = Steps;

const GET_BAND = gql`
  query Query($getBandBandId: ObjectID!) {
    getBand(bandId: $getBandBandId) {
      backGroundURI
      creator {
        id
        username
      }
      session {
        position
        maxMember
        cover {
          coverBy {
            id
            username
            profileURI
          }
          coverURI
          coverId
          name
          position
        }
      }
      name
      song {
        name
        songId
        artist
        duration
        lyrics
        instrument {
          instURI
          position
        }
      }
    }
  }
`;

const CoverRoomRecord = ({ match, history }) => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();
  const [instDuration, setInstDuration] = useState();
  const [sessionData, setSessionData] = useState();
  const [existingInst, setExistingInst] = useState();
  const [lyrics, setLyrics] = useState();
  const pageUrl = match.url;
  const bandId = match.params.id;
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const selectedSession = location?.state?.selectedSession;

  const [bandData, setBandData] = useState({
    name: null,
    introduce: null,
    backGroundURI: null,
    songId: null,
  });
  const [songData, setSongData] = useState();

  const { data } = useQuery(GET_BAND, {
    variables: {
      getBandBandId: bandId,
      commentFirst: 10,
    },
    onCompleted: (data) => {
      const band = data.getBand;
      if (band.song.lyrics) setLyrics(JSON.parse(data.getSong.lyrics).lyrics);
      setBandData(band);
      setSongData({
        name: band.name,
        artist: band.creator.username,
        songImg: band.backGroundURI,
        songId: band.song.songId,
      });
      setAudioDuration(parseInt(band.song.duration));
    },
  });

  const initBandData = () => {
    setBandData({
      name: null,
      introduce: null,
      backGroundURI: null,
      songId: null,
    });
  };

  const pages = [
    {
      description: '라이브러리 정보 입력',
      content: (
        <ParticipationForm
          setPage={setPage}
          audioDuration={audioDuration}
          pageUrl={pageUrl}
          bandData={bandData}
          setBandData={setBandData}
          selectedSession={selectedSession}
          setInst={setInst}
          songData={songData}
          sessionData={sessionData}
          initBandData={initBandData}
          setExistingInst={setExistingInst}
          setInstDuration={setInstDuration}
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
          instDuration={instDuration}
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
          audioDuration={audioDuration}
          inst={inst}
          setInst={setInst}
          bandData={bandData}
          bandId={bandId}
          selectedSession={selectedSession}
          songData={songData}
          instDuration={instDuration}
          existingInst={existingInst}
          history={history}
        />
      ),
    },
  ];

  return (
    <>
      {!isMobile && !mobileCheck() ? (
        selectedSession ? (
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
          <NotFoundPage />
        )
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

export default CoverRoomRecord;

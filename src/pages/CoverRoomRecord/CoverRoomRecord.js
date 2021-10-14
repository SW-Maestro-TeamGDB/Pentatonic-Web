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
        instrument {
          instURI
          position
        }
      }
    }
  }
`;

const CoverRoomRecord = ({ match }) => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();
  const [sessionData, setSessionData] = useState();
  const pageUrl = match.url;
  const bandId = match.params.id;

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
          selectedSession={selectedSession}
          songData={songData}
        />
      ),
    },
  ];

  return selectedSession ? (
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
    <NotFoundPage desc="올바르지 않은 접근입니다" />
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

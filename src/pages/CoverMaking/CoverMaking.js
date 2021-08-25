import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import PageContainer from '../../components/PageContainer';
import CoverForm from '../CoverForm';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import instrument from './inst.mp3';

const { Step } = Steps;

const CoverMaking = ({ match }) => {
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();
  const pageUrl = match.url;

  const [bandId, setBandId] = useState();
  const [bandData, setBandData] = useState({
    name: null,
    introduce: null,
    backGroundURI: null,
    songId: '611824fd287e5b0012e18160',
  });
  const [session, setSession] = useState([]); // 세션 데이터
  const [selectedSession, setSelectedSession] = useState(null); // 녹음 참여 세션

  // 샘플 오디오
  const audio = new Audio();
  audio.src = instrument;

  useEffect(() => {
    setInst(audio);
  }, []);

  useEffect(() => {
    setAudioDuration(115);
  }, []);

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
          session={session}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <CustomSteps progressDot current={page}>
        {pages.map((item) => (
          <Step
            progressDot
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </CustomSteps>
      <StepContents>{pages[page].content}</StepContents>
    </PageContainer>
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

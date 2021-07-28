import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import CoverForm from '../CoverForm';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';

const CoverMaking = () => {
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();

  useEffect(() => {
    setAudioDuration(Math.random() * 10 + 3);
  }, []);

  const showPage = () => {
    if (page === 0) {
      return <CoverForm setPage={setPage} audioDuration={audioDuration} />;
    } else if (page === 1) {
      return (
        <RecordPage
          setPage={setPage}
          setAudioFile={setAudioFile}
          audioDuration={audioDuration}
        />
      );
    } else if (page === 2) {
      return <RecordEdit audioFile={audioFile} setAudioFile={setAudioFile} />;
    }
  };

  return <PageContainer>{showPage()}</PageContainer>;
};

export default CoverMaking;

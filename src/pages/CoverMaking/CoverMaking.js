import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import CoverForm from '../CoverForm';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import instrument from './inst.mp3';

const CoverMaking = () => {
  const [page, setPage] = useState(0);
  const [audioFile, setAudioFile] = useState();
  const [audioDuration, setAudioDuration] = useState();
  const [inst, setInst] = useState();

  // 샘플 오디오
  const audio = new Audio();
  audio.src = instrument;

  useEffect(() => {
    setInst(audio);
  }, []);

  useEffect(() => {
    setAudioDuration(Math.random() * 10 + 42);
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
          inst={inst}
        />
      );
    } else if (page === 2) {
      return <RecordEdit audioFile={audioFile} setAudioFile={setAudioFile} />;
    }
  };

  return <PageContainer>{showPage()}</PageContainer>;
};

export default CoverMaking;

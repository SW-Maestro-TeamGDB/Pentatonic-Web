import react, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';

const CoverMaking = (props) => {
  const { setPage, audioDuration } = props;

  return (
    <PageContainer>
      <h1>커버 폼 페이지</h1>
      <br />
      <h2>길이 : {Math.floor(audioDuration)}초</h2>
      <br />
      <h2 onClick={() => setPage(1)} style={{ cursor: 'pointer' }}>
        다음으로
      </h2>
    </PageContainer>
  );
};

export default CoverMaking;

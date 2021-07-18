import react, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';

const CoverInformation = ({ match }) => {
  console.log(match);
  return (
    <PageContainer>
      <h3>커버 룸</h3>
      <h3>커버 ID : {match.params.id}</h3>
    </PageContainer>
  );
};

export default CoverInformation;

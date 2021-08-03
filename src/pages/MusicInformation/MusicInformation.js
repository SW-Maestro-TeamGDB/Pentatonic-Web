import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';

const MusicInformation = (match) => {
  return (
    <PageContainer>
      <h2>음원 상세 페이지</h2>
      <Link to={match.url + '/cover'}>
        <h3>커버하기</h3>
      </Link>
    </PageContainer>
  );
};

export default MusicInformation;

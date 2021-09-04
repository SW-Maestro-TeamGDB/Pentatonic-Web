import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RankList from '../../components/RankList';

// tempData
import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';

const BandRank = () => {
  const tempBand = [
    {
      backgroundURI: Hyukoh,
      name: '3인 혁오',
      likeCount: '730',
      bandId: 2,
    },
    {
      backgroundURI: NoSurprises,
      name: '코리아 톰 요크',
      likeCount: '530',
      bandId: 5,
    },
    {
      backgroundURI: TheVolunteers,
      name: '실력은 필요없어',
      likeCount: '340',
      bandId: 6,
    },
    {
      backgroundURI: TameImpala,
      name: '사이키델릭',
      likeCount: '130',
      bandId: 1,
    },
  ];

  const repeatArr = (arr, num) => {
    let temp = [];

    for (let i = 0; i < num; i++) {
      temp = temp.concat(arr);
    }

    return temp;
  };

  const showBandRank = () => {
    return repeatArr(tempBand, 5).map((v, i) => {
      return (
        <RankList key={`tempBand+${i}`} data={v} type={'band'} rank={i + 1} />
      );
    });
  };

  return (
    <PageContainer width="40%">
      <PageTitle>밴드 랭킹</PageTitle>
      <PageDesc>좋아요를 가장 많이 받은 밴드는 누굴까요?</PageDesc>
      <RankItem>{showBandRank()}</RankItem>
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-top: 1rem;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;

const RankItem = styled.div`
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export default BandRank;

import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import DifficultyIcon from '../DifficultyIcon';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';

import drum from '../../images/Session/drum.svg';
import guitar from '../../images/Session/guitar.svg';
import piano from '../../images/Session/piano.svg';
import vocal from '../../images/Session/vocal.svg';

const PositionGrid = (props) => {
  const { id } = props;

  const tempData = [
    {
      icon: vocal,
      name: 'VOCAL',
      level: 4,
      rank: parseInt(Math.random() * 10 + 1),
    },
    {
      icon: guitar,
      name: 'ACOUSTIC_GUITAR',
      level: 3,
      rank: parseInt(Math.random() * 50 + 10),
    },
    {
      icon: drum,
      name: 'DRUM',
      level: 2,
      rank: parseInt(Math.random() * 100 + 100),
    },
    {
      icon: piano,
      name: 'KEYBOARD',
      level: 1,
      rank: parseInt(Math.random() * 1000 + 100),
    },
  ];

  return (
    <Container>
      <SessionIcon src={tempData[id].icon} />
      <SessionTitle>
        {changeSessionNameToKorean(tempData[id].name)}
      </SessionTitle>
      <SessionMeta>
        <SessionLevel>
          <DifficultyIcon value={tempData[id].level} />
        </SessionLevel>
        <SessionRank>{tempData[id].rank}위</SessionRank>
      </SessionMeta>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: 10rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;

  color: #666;
  letter-spacing: -0.5px;
`;

const SessionMeta = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.8rem;

  padding: 0.5rem 0;
  background-color: rgba(153, 127, 249, 0.04);
  border-radius: 10px;
`;

const SessionIcon = styled.img`
  width: 3.5rem;
  margin-top: 0.5rem;
  opacity: 0.3;
  opacity: 0.3;
`;

const SessionTitle = styled.div`
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 0.9rem;
`;

const SessionRank = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const SessionLevel = styled.div`
  width: 50%;
`;

export default PositionGrid;

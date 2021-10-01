import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import DifficultyIcon from '../DifficultyIcon';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { sessionIconMatch } from '../../lib/sessionIconMatch';

import ThumbIcon from '../../images/ThumbIcon.svg';

const PositionGrid = (props) => {
  const { position, like, width } = props;

  return (
    <Container width={width}>
      <SessionIcon src={sessionIconMatch(position)} />
      <SessionTitle>{changeSessionNameToKorean(position)}</SessionTitle>
      <SessionMeta>
        <SessionLevel>
          <DifficultyIcon value={1} />
        </SessionLevel>
        <SessionRank>
          <CustomIcon src={ThumbIcon} />
          {like ? like : 0}
        </SessionRank>
      </SessionMeta>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: 10rem;
  width: ${(props) => (props.width ? props.width : 'auto')};

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

const CustomIcon = styled.img`
  width: 12px;
  height: 12px;
  filter: invert(80%) sepia(0%) saturate(468%) hue-rotate(238deg)
    brightness(96%) contrast(86%);
  margin-right: 10px;
`;

export default PositionGrid;

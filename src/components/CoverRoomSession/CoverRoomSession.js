import react, { useEffect, useState, useCallback } from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';
import CoverRoomSessionItem from '../CoverRoomSessionItem';

const CoverRoomSession = (props) => {
  const { session, setSession, setVisibleDrawer, sessionTitle, total, now } =
    props;
  const [selectedSession, setSelectedSession] = useState();

  const onClickParticipate = () => {
    setVisibleDrawer(true);
  };

  const showSessionContents = () => {
    return Array.from({ length: now }, () => 0).map((v, i) => {
      return (
        <CoverRoomSessionItem
          key={`${sessionTitle}+${i}`}
          count={i}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
        />
      );
    });
  };

  return (
    <CoverRoomSessionContainer>
      <Header>
        <BoardTitle>
          <SessionTitle>{sessionTitle}</SessionTitle>
          <SessionCount>
            {now}/{total}
          </SessionCount>
        </BoardTitle>
        {now !== total ? (
          <BoardLink onClick={() => onClickParticipate()}>참여하기</BoardLink>
        ) : null}
      </Header>
      <SessionContainer>
        {now ? (
          showSessionContents()
        ) : (
          <NoSession>참여한 세션이 없습니다</NoSession>
        )}
      </SessionContainer>
    </CoverRoomSessionContainer>
  );
};

const CoverRoomSessionContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1rem;
`;

const SessionContainer = styled.div`
  width: 100%;
  min-height: 5rem;
  display: flex;
  flex-direction: row;
`;

const NoSession = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: gray;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90%;
`;

const SessionTitle = styled.div`
  font-size: 24px;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const SessionCount = styled.div`
  margin-left: 8px;
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const BoardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const BoardLink = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #6236ff;
  position: absolute;
  right: 0;
  cursor: pointer;
`;

export default CoverRoomSession;

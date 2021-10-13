import react, { useEffect, useState, useCallback } from 'react';
import { Collapse, Drawer } from 'antd';

import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../../apollo/cache';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import CoverRoomSessionItem from '../CoverRoomSessionItem';
import LibraryDrawer from '../LibraryDrawer/LibraryDrawer';
import ParticipationModal from '../ParticipationModal';

import AuthModal from '../../components/AuthModal';

const CoverRoomSession = (props) => {
  const {
    session,
    setSession,
    setVisibleDrawer,
    sessionTitle,
    total,
    now,
    cover,
    creator,
    userId,
    bandId,
    songId,
    getSession,
    setLibraryFilter,
    sessionData,
    history,
    match,
  } = props;
  const [selectedSession, setSelectedSession] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const [participationModal, setParticipationModal] = useState(false);
  const { data } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  });

  const onClickLibrary = () => {
    setParticipationModal(false);
    setVisibleDrawer(true);
  };

  const onClickParticipate = () => {
    if (data.isLoggedIn) {
      setParticipationModal(true);
      // setVisibleDrawer(true);
      setLibraryFilter({ songId: songId, position: sessionData.position });
    } else {
      setModalToggle(true);
      setLibraryFilter({ songId: songId, position: sessionData.position });
    }
  };

  useEffect(() => {
    const coverURI = cover[selectedSession]?.coverURI;
    if (coverURI) {
      setSession([...session, coverURI]);
    }
  }, [selectedSession]);

  const showSessionContents = () => {
    return cover.map((v, i) => {
      return (
        <CoverRoomSessionItem
          key={`${sessionTitle}+${v.coverId}`}
          data={v}
          count={i}
          session={session}
          setSession={setSession}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          creator={creator}
          bandId={bandId}
          edit={
            userId === v.coverBy.id
              ? 'creator'
              : userId === creator
              ? 'master'
              : null
          }
          getSession={getSession}
          setLibraryFilter={setLibraryFilter}
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
          <BoardLink
            onClick={() => {
              onClickParticipate();
            }}
          >
            참여하기
          </BoardLink>
        ) : null}
      </Header>
      <SessionContainer>
        {now ? (
          showSessionContents()
        ) : (
          <NoSession>참여한 세션이 없습니다</NoSession>
        )}
      </SessionContainer>
      <ParticipationModal
        modalToggle={participationModal}
        setModalToggle={setParticipationModal}
        onClickLeftButton={() =>
          history.push({
            pathname: `/lounge/record/${match.params.id}`,
            state: { selectedSession: sessionData.position },
          })
        }
        onClickRightButton={() => onClickLibrary()}
      />
      <AuthModal
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        action={() => setParticipationModal(true)}
      />
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

  margin: 1.2rem 0 0.5rem;
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
  font-size: 20px;
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

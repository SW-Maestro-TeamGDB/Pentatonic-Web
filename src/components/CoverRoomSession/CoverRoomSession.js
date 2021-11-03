import react, { useEffect, useState, useCallback } from 'react';
import { Collapse, Drawer } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../../apollo/cache';
import styled from 'styled-components';
import { media, Default, mobileCheck } from '../../lib/Media';
import CoverRoomSessionItem from '../CoverRoomSessionItem';
import LibraryDrawer from '../LibraryDrawer/LibraryDrawer';
import ParticipationModal from '../ParticipationModal';
import { useMediaQuery } from 'react-responsive';

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
    participation,
  } = props;
  const [selectedSession, setSelectedSession] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const [participationModal, setParticipationModal] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const { data } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  });

  const onClickLibrary = () => {
    setParticipationModal(false);
    setVisibleDrawer(true);
  };

  const onClickParticipate = () => {
    if (data.isLoggedIn) {
      if (!mobileCheck()) setParticipationModal(true);
      else {
        onClickLibrary();
      }
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
          cover={cover}
          participation={participation}
        />
      );
    });
  };

  return (participation && now) || !participation ? (
    <CoverRoomSessionContainer>
      <Header>
        <BoardTitle>
          <SessionTitle>{sessionTitle}</SessionTitle>
          <SessionCount>
            {now}/{total}
          </SessionCount>
        </BoardTitle>
        {now !== total && !participation ? (
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
      {!participation ? (
        <>
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
            action={() => onClickParticipate()}
          />
        </>
      ) : null}
    </CoverRoomSessionContainer>
  ) : null;
};

const CoverRoomSessionContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1rem;

  ${media.small} {
    margin-top: 0;
  }
`;

const SessionContainer = styled.div`
  width: 100%;
  min-height: 5rem;
  display: flex;
  height: auto;
  margin: 1.2rem 0 0.5rem;
  overflow-x: hidden;

  ${media.small} {
    margin: 0.8rem 0 1rem;
  }
`;

const NoSession = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: gray;

  ${media.small} {
    font-size: 0.9rem;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90%;

  ${media.small} {
    width: 100%;
    margin-bottom: 0;
  }
`;

const SessionTitle = styled.div`
  font-size: 20px;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: row;

  ${media.small} {
    font-size: 1.2rem;
  }
`;

const SessionCount = styled.div`
  margin-left: 8px;
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  flex-direction: row;

  ${media.small} {
    font-size: 0.9rem;
  }
`;

const BoardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: row;

  ${media.small} {
    font-size: 1.2rem;
  }
`;

const BoardLink = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #6236ff;
  position: absolute;
  right: 0;
  cursor: pointer;

  ${media.small} {
    font-size: 0.9rem;
    display: flex;
  }
`;

export default CoverRoomSession;

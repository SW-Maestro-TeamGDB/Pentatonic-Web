import react, { useEffect, useState, useCallback } from 'react';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';
import SessionContentsItem from '../SessionContentsItem/SessionContentsItem';

const SessionContents = (props) => {
  const {
    session,
    setSession,
    sessionSet,
    setSessionSet,
    selectedSession,
    setSelectedSession,
  } = props;

  const onClickDelete = (title, index) => {
    // 세션 종류 저장하는 set 삭제
    let temp = sessionSet;
    temp.delete(title);
    setSessionSet(temp);

    // 세션 삭제
    setSession([...session.filter((v, i) => i !== index)]);

    // 현재 선택된 세션 삭제할 경우 선택 세션 초기화
    if (title === selectedSession) {
      console.log(title, selectedSession);
      setSelectedSession(null);
    }
  };

  const showSessionContents = useCallback(() => {
    return session.map((v, index) => {
      return (
        <SessionContentsItem
          title={v.session}
          number={v.member}
          index={index}
          onClickDelete={onClickDelete}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          key={'sessionItem' + index}
        />
      );
    });
  }, [session, selectedSession]);

  return <GridContainer>{showSessionContents()}</GridContainer>;
};

export default SessionContents;

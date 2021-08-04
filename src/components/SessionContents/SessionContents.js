import { Collapse } from 'antd';
import react, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';
import SessionContentsItem from '../SessionContentsItem/SessionContentsItem';

const SessionContents = (props) => {
  const { session, setSession, sessionSet, setSessionSet } = props;

  const onClickDelete = (title, index) => {
    let temp = sessionSet;
    temp.delete(title);
    setSessionSet(temp);
    setSession([...session.filter((v, i) => i !== index)]);
  };

  const showSessionContents = useCallback(() => {
    return session.map((v, index) => {
      return (
        <SessionContentsItem
          title={v.session}
          number={v.member}
          index={index}
          onClickDelete={onClickDelete}
          key={'sessionItem' + index}
        />
      );
    });
  }, [session]);

  return (
    <GridContainer templateColumn="1fr 1fr">
      {showSessionContents()}
    </GridContainer>
  );
};

export default SessionContents;

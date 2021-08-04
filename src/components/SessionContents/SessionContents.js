import { Collapse } from 'antd';
import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';
import SessionContentsItem from '../SessionContentsItem/SessionContentsItem';

const SessionContents = (props) => {
  const { session, setSession } = props;

  const onClickDelete = (index) => {
    let temp = session;
    temp.splice(index);
    setSession(temp);
  };

  const showSessionContents = () => {
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
  };

  return (
    <GridContainer templateColumn="1fr 1fr">
      {showSessionContents()}
    </GridContainer>
  );
};

export default SessionContents;

import { Collapse } from 'antd';
import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';

const SessionContentsItem = (props) => {
  const { title, number, index, onClickDelete } = props;

  return (
    <SessionContentsContainer>
      <SessionTitle>{title}</SessionTitle>
      <SessionMember>0/{number}</SessionMember>
      <DeleteContainer onClick={() => onClickDelete(index)}>X</DeleteContainer>
    </SessionContentsContainer>
  );
};

const SessionContentsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SessionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  width: 70%;
  text-align: center;
`;

const SessionMember = styled.div`
  font-size: 1rem;
  width: 20%;
  text-align: right;
  color: gray;
`;

const DeleteContainer = styled.div`
  width: 10%;
  text-align: right;
  cursor: pointer;
`;

export default SessionContentsItem;

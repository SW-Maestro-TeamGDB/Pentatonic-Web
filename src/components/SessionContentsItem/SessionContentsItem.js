import { Collapse } from 'antd';
import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';

const SessionContentsItem = (props) => {
  const {
    title,
    number,
    index,
    onClickDelete,
    selectedSession,
    setSelectedSession,
  } = props;

  const SessionContentsContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    color: ${selectedSession === title ? 'white' : 'gray'};
    background-color: ${selectedSession === title ? 'gray' : 'white'};
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${selectedSession === title ? 'gray' : '#f0f0f0'};
    }
  `;

  const selected = () => {
    return selectedSession === title ? true : false;
  };

  return (
    <SessionContentsContainer>
      <SessionMeta
        onClick={() => {
          setSelectedSession(title);
        }}
      >
        <SessionTitle>
          {title}{' '}
          {selected() ? <SelectedContainer>SELECTED</SelectedContainer> : null}
        </SessionTitle>
        <SessionMember>
          {selected() ? '1' : '0'}/{number}
        </SessionMember>
      </SessionMeta>
      <DeleteContainer onClick={() => onClickDelete(title, index)}>
        X
      </DeleteContainer>
    </SessionContentsContainer>
  );
};

const SessionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  width: 80%;
  text-align: left;
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const SessionMember = styled.div`
  font-size: 1rem;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DeleteContainer = styled.div`
  width: 12%;
  cursor: pointer;
  text-align: center;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: black;
  }
`;

const SelectedContainer = styled.div`
  margin-left: 5%;
  color: white;
  font-size: 0.5em;
  display: flex;
  align-items: center;
`;

const SessionMeta = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
`;

export default SessionContentsItem;

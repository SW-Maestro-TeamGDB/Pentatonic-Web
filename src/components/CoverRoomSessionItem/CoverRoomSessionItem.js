import { Collapse } from 'antd';
import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';

import UserAvatar from '../../images/UserAvatar.svg';

const CoverRoomSessionItem = (props) => {
  const { selectedSession, setSelectedSession, count } = props;
  const selected = selectedSession === count;

  const onClickSession = () => {
    if (selected) {
      setSelectedSession(null);
    } else {
      setSelectedSession(count);
    }
  };

  return (
    <SessionContentsContainer>
      <ImgContainer>
        <SessionImg
          onClick={() => onClickSession()}
          src={UserAvatar}
          selected={selected}
        />
      </ImgContainer>
      <SessionId to={`/profile/${count}`}>USER{count + 1}</SessionId>
    </SessionContentsContainer>
  );
};

const ImgContainer = styled.div`
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;

const SessionImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  transition: opacity 0.3s ease;

  object-fit: cover;
`;

const SessionId = styled(Link)`
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: black;

  &:hover {
    color: black;
  }
`;

const SessionContentsContainer = styled.div`
  display: flex;
  width: 100px;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s ease-in-out;

  /* &:hover {
    background-color: ${(props) => (props.selected ? 'gray' : '#f0f0f0')};
  } */
`;

export default CoverRoomSessionItem;

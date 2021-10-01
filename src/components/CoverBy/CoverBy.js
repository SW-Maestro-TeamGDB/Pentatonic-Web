import react, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Drawer } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../../apollo/cache';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import GridContainer from '../GridContainer/GridContainer';
import CoverRoomSessionItem from '../CoverRoomSessionItem';
import PositionGrid from '../PositionGrid';
import LibraryDrawer from '../LibraryDrawer/LibraryDrawer';

import { sessionIconMatch } from '../../lib/sessionIconMatch';

import AuthModal from '../../components/AuthModal';

const CoverBy = (props) => {
  const { data } = props;
  const coverData = data.cover[0];

  return (
    <CoverRoomSessionContainer>
      <Header>
        <BoardTitle>
          <SessionTitle>COVER BY</SessionTitle>
        </BoardTitle>
      </Header>
      <SessionContainer>
        <SessionWrapper>
          <ImgContainer>
            <SessionImg src={coverData.coverBy.profileURI} />
          </ImgContainer>
          <SessionIdContainer>
            <SessionIdWrapper>
              <CreatorIcon>★</CreatorIcon>
              <SessionId to={`/profile/${coverData.coverBy.id}`}>
                {coverData.coverBy.username}
              </SessionId>
            </SessionIdWrapper>
          </SessionIdContainer>
        </SessionWrapper>
        <PositionWrapper>
          <PositionGrid id={1} key={1} width="20rem" />
        </PositionWrapper>
      </SessionContainer>
    </CoverRoomSessionContainer>
  );
};

const CoverRoomSessionContainer = styled.div`
  width: 100%;
  position: relative;
`;

const PositionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3rem;
`;

const SessionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const SessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NoSession = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: gray;
`;

const PositionImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 2rem;
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
  flex-direction: row;
  letter-spacing: -2px;

  font-weight: 900;
  padding-left: 5px;
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

const SessionContentsContainer = styled.div`
  display: flex;
  width: 100px;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  flex-direction: column;

  position: relative;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  width: 8rem;
  height: 8rem;
  border-radius: 15px;
  margin-left: 5px;
`;

const SessionImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const SessionIdContainer = styled.div`
  cursor: pointer;
  font-weight: 900;

  color: black;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 5px;
  max-width: 8rem;
`;

const CreatorIcon = styled.div`
  border-radius: 100%;
  background-color: #6236ff;
  color: #fae100;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 1rem;
  min-height: 1rem;

  font-size: 0.6rem;
  font-weight: 900;

  margin-right: 6px;
`;

const SessionId = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: black;
  font-size: 1.1rem;

  &:hover {
    color: black;
  }
`;

const SessionIdWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default CoverBy;

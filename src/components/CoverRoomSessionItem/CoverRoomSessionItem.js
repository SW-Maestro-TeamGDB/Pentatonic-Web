import react, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import GridContainer from '../GridContainer/GridContainer';
import { CloseOutlined } from '@ant-design/icons';
import QuestionModal from '../QuestionModal';

import UserAvatar from '../../images/UserAvatar.svg';

const GET_USER_INFORM = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      profileURI
    }
  }
`;

const LEAVE_BAND = gql`
  mutation Mutation($leaveBandInput: LeaveBandInput!) {
    leaveBand(input: $leaveBandInput)
  }
`;

const CoverRoomSessionItem = (props) => {
  const {
    selectedSession,
    setSelectedSession,
    session,
    setSession,
    count,
    data,
    creator,
    bandId,
    edit,
    getSession,
  } = props;
  const selected = selectedSession === count;
  const [profileURI, setProfileURI] = useState();
  const [leaveModal, setLeaveModal] = useState(false);
  const [getUserProfile] = useLazyQuery(GET_USER_INFORM, {
    onCompleted: (data) => {
      setProfileURI(data.getUserInfo.profileURI);
    },
  });

  const [leaveBand, leaveBandResult] = useMutation(LEAVE_BAND, {
    onCompleted: (data) => {
      console.log(data);
      setLeaveModal(false);
      getSession();
    },
  });

  useEffect(() => {
    if (data.coverBy) {
      getUserProfile({ variables: { getUserInfoUserId: data.coverBy } });
    }
  }, [data]);

  const onClickSession = () => {
    if (selected) {
      setSelectedSession(null);
      removeSession();
    } else {
      setSelectedSession(count);
    }
  };

  const removeSession = () => {
    setSession(session.filter((uri) => uri !== data.coverURI));
  };

  const onClickLeaveBand = () => {
    leaveBand({
      variables: {
        leaveBandInput: {
          band: {
            bandId: bandId,
          },
          session: {
            coverId: data.coverId,
          },
        },
      },
    });
  };

  return (
    <SessionContentsContainer>
      {data && profileURI ? (
        <>
          <ImgContainer>
            {edit ? (
              <LeaveButton onClick={() => setLeaveModal(true)}>
                <CloseOutlined />
              </LeaveButton>
            ) : null}
            <SessionImg
              onClick={() => onClickSession()}
              src={profileURI}
              selected={selected}
            />
          </ImgContainer>
          <SessionIdContainer to={`/profile/${data.coverBy}`}>
            {creator === data.coverBy ? <CreatorIcon>★</CreatorIcon> : null}
            <SessionId>{data.coverBy}</SessionId>
          </SessionIdContainer>
          <QuestionModal
            modalToggle={leaveModal}
            setModalToggle={setLeaveModal}
            text={
              edit === 'master'
                ? '해당 세션을 추방하시겠습니까?'
                : '밴드를 나가시겠습니까?'
            }
            desc={
              edit === 'master'
                ? '세션을 추방하게 되면 되돌릴 수 없습니다'
                : '밴드를 나가게 되면 선택한 커버가 밴드에서 제외됩니다'
            }
            afterRequest={onClickLeaveBand}
          />
        </>
      ) : null}
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

const LeaveButton = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  opacity: 0.5;

  left: 5.3rem;
  cursor: pointer;
  z-index: 2;

  &:hover {
    opacity: 0.8;
  }
`;

const SessionId = styled.div`
  width: 4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: center;
`;

const SessionIdContainer = styled(Link)`
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 7rem;

  &:hover {
    color: black;
  }
`;

const CreatorIcon = styled.div`
  border-radius: 100%;
  background-color: #6236ff;
  color: #fae100;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 16px;
  height: 16px;

  font-size: 10px;
  font-weight: 900;

  margin-right: 5px;
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

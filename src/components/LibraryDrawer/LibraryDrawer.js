import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { notification } from 'antd';
import { GET_CURRENT_USER } from '../../apollo/cache';
import styled from 'styled-components';
import LibraryList from '../LibraryList/LibraryList';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      library {
        coverId
        coverURI
        songId
        name
        position
      }
    }
  }
`;

const JOIN_BAND = gql`
  mutation JoinBandMutation($joinBandInput: JoinBandInput!) {
    joinBand(input: $joinBandInput)
  }
`;

const LibraryDrawer = (props) => {
  const { visible, filter, setFilter, onClose, getSession, bandId } = props;
  const [filteredData, setFilteredData] = useState([]);
  const [libraryData, setLibraryData] = useState([]);
  const [selectedCover, setSelectedCover] = useState();
  const userData = useQuery(GET_CURRENT_USER);
  const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
    filter: 'no-cahce',
    onCompleted: (data) => {
      setLibraryData(data.getUserInfo.library);
    },
  });

  const [joinBand, joinBandResult] = useMutation(JOIN_BAND, {
    onCompleted: (data) => {
      onClose();
      setFilter();
      getSession();
      notification['success']({
        key: 'successEditTitle',
        message: '',
        description: '밴드에 참여했습니다',
        placement: 'bottomRight',
        duration: 3,
      });
    },
    onError: (error) => {
      notification['error']({
        key: 'errorEditTitle',
        message: '',
        description: `${error.message}`,
        placement: 'bottomRight',
        duration: 3,
      });
    },
  });

  useEffect(() => {
    if (libraryData.length > 0 && filter) {
      const temp = libraryData.filter(
        (v) => v.songId === filter.songId && v.position === filter.position,
      );
      setFilteredData(temp);
    }
  }, [filter]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  useEffect(() => {
    if (userData.data.user) {
      getUserInfo({
        variables: {
          getUserInfoUserId: userData.data.user.id,
        },
      });
    }
  }, [userData.data.user]);

  useEffect(() => {
    setSelectedCover();
  }, [visible]);

  const loadLibrary = () =>
    filteredData.map((v, i) => {
      return (
        <LibraryList
          data={v}
          key={v.coverId}
          visible={visible}
          selectedCover={selectedCover}
          setSelectedCover={setSelectedCover}
        />
      );
    });

  const onClickSubmit = () => {
    if (selectedCover) {
      joinBand({
        variables: {
          joinBandInput: {
            band: {
              bandId: bandId,
            },
            session: {
              coverId: selectedCover,
              position: filter.position,
            },
          },
        },
      });
    }
  };

  return (
    <DrawerContainer>
      <Title>라이브러리</Title>
      <LibaryContainer>
        {filteredData.length > 0 ? (
          loadLibrary()
        ) : (
          <NoLibraryText>참여 할 수 있는 라이브러리가 없습니다</NoLibraryText>
        )}
      </LibaryContainer>
      <SubmitButtonConatiner>
        <SubmitButton onClick={() => onClickSubmit()} disabled={!selectedCover}>
          참여하기
        </SubmitButton>
      </SubmitButtonConatiner>
    </DrawerContainer>
  );
};

const Title = styled.div`
  font-size: 2vw;
  height: 7%;
  font-weight: 800;
  border-bottom: 1px solid #eee;
  width: 90%;
  text-align: center;
  position: absolute;
  top: 1vw;
`;

const SubmitButtonConatiner = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 13%;
  z-index: 2;
`;

const NoLibraryText = styled.div`
  text-align: center;
  color: #666666;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1.5rem;
`;

const LibaryContainer = styled.div`
  z-index: 1;
  width: 100%;
  position: absolute;
  top: 11%;
  height: 77%;
  overflow-y: scroll;
  padding: 0 1vw;
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  width: 80%;
  height: 60%;
  border: none;
  color: white;
  font-size: 1.3vw;
  font-weight: 700;
  cursor: pointer;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  background-size: 500%;

  &:hover {
    animation: gradient 3s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:disabled {
    background-image: linear-gradient(to right, #666, #777);
    color: #eee;
    cursor: not-allowed;
  }
`;

export default LibraryDrawer;

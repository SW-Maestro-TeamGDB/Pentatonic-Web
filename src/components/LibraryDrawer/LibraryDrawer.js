import react, { useEffect, useState, useRef } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { notification } from 'antd';
import { GET_CURRENT_USER } from '../../apollo/cache';
import styled from 'styled-components';
import LibraryList from '../LibraryList/LibraryList';
import { useMediaQuery } from 'react-responsive';
import { StopOutlined, LoadingOutlined } from '@ant-design/icons';
import { media, Default, Mobile } from '../../lib/Media';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      library {
        position
        coverURI
        coverId
        date
        name
        song {
          songId
          songImg
          name
          artist
        }
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
  const [audioState, setAudioState] = useState(0); // 0:정지 , 1:재생 , 2:일시정지
  const [selectedCover, setSelectedCover] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const instRef = useRef();
  const userData = useQuery(GET_CURRENT_USER);
  const [getUserInfo, { loading, error, data }] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
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
        (v) =>
          v.song.songId === filter.songId && v.position === filter.position,
      );
      setFilteredData(temp);
    }
  }, [filter, libraryData]);

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
    if (selectedAudio) instRef.current = selectedAudio;
  }, [selectedAudio]);

  useEffect(() => {
    if (!visible) {
      setSelectedCover();
      setSelectedAudio();
      setAudioState(0);

      if (instRef.current) {
        instRef.current.pause();
        instRef.current.currentTime = 0;
      }
    }
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
          instRef={instRef}
          selectedAudio={selectedAudio}
          setSelectedAudio={setSelectedAudio}
          audioState={audioState}
          setAudioState={setAudioState}
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
          <>
            {loading ? (
              <LoadingContainer>
                <LoadingOutlined />
              </LoadingContainer>
            ) : (
              <NoDataContainer>
                <CustomStopOutlined />
                <NoLibraryText>
                  참여 할 수 있는 라이브러리가 없습니다
                  <Mobile>
                    <br /> 데스크탑에서 커버를 녹음해서 참여해주세요
                  </Mobile>
                </NoLibraryText>
              </NoDataContainer>
            )}
          </>
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
  font-size: 1.5rem;
  height: 7%;
  font-weight: 800;
  border-bottom: 1px solid #eee;
  width: 90%;
  text-align: center;
  position: absolute;
  top: 3%;

  ${media.small} {
    font-size: 1.2rem;
    top: 2.5%;
  }
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

  ${media.small} {
    height: 18%;
  }
`;

const NoLibraryText = styled.div`
  text-align: center;
  color: #666666;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1.5rem;

  ${media.small} {
    font-size: 1rem;
  }
`;

const LibaryContainer = styled.div`
  z-index: 1;
  width: 100%;
  position: absolute;
  top: 11%;
  height: 77%;
  overflow-y: scroll;
  padding: 0 1vw;

  ${media.small} {
    padding: 0 1rem;
  }
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

  ${media.small} {
    font-size: 1rem;
    height: 50%;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: #6236ff;
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25rem;
`;

const CustomStopOutlined = styled(StopOutlined)`
  font-size: 12rem;
  color: #bbb;
  margin-bottom: 2rem;

  ${media.small} {
    font-size: 8rem;
  }
`;

export default LibraryDrawer;

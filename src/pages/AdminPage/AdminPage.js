import react, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  currentUserVar,
  isLoggedInVar,
  IS_LOGGED_IN,
  GET_CURRENT_USER,
} from '../../apollo/cache';
import { media, Default, Mobile } from '../../lib/Media';
import {
  Upload,
  message,
  Button,
  notification,
  Collapse,
  Select,
  Input,
  Radio,
} from 'antd';
import {
  LeftOutlined,
  PictureOutlined,
  CustomerServiceOutlined,
  UploadOutlined,
  PlusCircleFilled,
  OrderedListOutlined,
} from '@ant-design/icons';

import tempLyric from './lyrics.json';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import GenreButton from '../../components/GenreButton/GenreButton';
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton';
import NotFoundPage from '../NotFoundPage';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import sessionType from '../../data/sessionType.json';
import dotenv from 'dotenv';
dotenv.config();

const UPLOAD_SONG = gql`
  mutation UploadSongMutation($input: UploadSongInput!) {
    uploadSong(input: $input) {
      songId
    }
  }
`;

const UPLOAD_INSTRUMENT = gql`
  mutation UploadInstrumentMutation($input: UploadInstrumentInput!) {
    uploadInstrument(input: $input) {
      instId
      name
      instURI
    }
  }
`;

const UPLOAD_COVER_FILE = gql`
  mutation UploadCoverFileMutation($input: UploadCoverFileInput!) {
    uploadCoverFile(input: $input)
  }
`;

const UPLOAD_IMAGE_FILE = gql`
  mutation Mutation($uploadImageFileInput: UploadImageInput!) {
    uploadImageFile(input: $uploadImageFileInput)
  }
`;

const UPDATE_SONG = gql`
  mutation UpdateSongMutation($input: UpdateSongInput!) {
    updateSong(input: $input) {
      songId
    }
  }
`;

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

const AdminPage = ({ history }) => {
  const [page, setPage] = useState(1);
  const [code, setCode] = useState();
  const [codeCheck, setCodeCheck] = useState(false);
  const [songData, setSongData] = useState({
    name: null,
    songURI: null,
    songImg: null,
    genre: null,
    artist: null,
    album: null,
    weeklyChallenge: null,
    releaseDate: null,
    level: null,
  });
  const [instData, setInstData] = useState({
    songId: null,
    name: null,
    instURI: null,
    position: null,
  });
  const [genre, setGenre] = useState();
  const [level, setLevel] = useState(0);
  const [songImage, setSongImage] = useState();
  const [songURI, setSongURI] = useState();
  const [songId, setSongId] = useState();
  const [error, setError] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [instError, setInstError] = useState();
  const [changeError, setChangeError] = useState();
  const [addedInst, setAddedInst] = useState([]);
  const [lyrics, setLyrics] = useState();
  const admin = process.env.REACT_APP_ADMIN_ID.split(',');

  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'network-only' });

  const [updateSong] = useMutation(UPDATE_SONG, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      alert('수정되었습니다');
    },
    onError: (error) => {
      setChangeError(error.message);
    },
  });

  const [uploadSong] = useMutation(UPLOAD_SONG, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setInstData({ ...instData, songId: data.uploadSong.songId });
      setPage(2);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [uploadImage, uploadImageResult] = useMutation(UPLOAD_IMAGE_FILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      // console.log(error);
    },
    onCompleted: (data) => {
      setSongData({ ...songData, songImg: data.uploadImageFile });
    },
  });

  const [uploadCoverFile, uploadCoverFileResult] = useMutation(
    UPLOAD_COVER_FILE,
    {
      fetchPolicy: 'no-cache',
      onError: (error) => {
        // console.log(error);
      },
      onCompleted: (data) => {
        setSongData({ ...songData, songURI: data.uploadCoverFile });
      },
    },
  );

  const [uploadInstFile, uploadFileResult] = useMutation(UPLOAD_COVER_FILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      // console.log(error);
    },
    onCompleted: (data) => {
      setInstData({ ...instData, instURI: data.uploadCoverFile });
    },
  });

  const [uploadInstrument, uploadInstrumentResult] = useMutation(
    UPLOAD_INSTRUMENT,
    {
      fetchPolicy: 'no-cache',
      onError: (error) => {
        setInstError(error.message);
      },
      onCompleted: (data) => {
        console.log(data);
        setAddedInst([
          ...addedInst,
          {
            name: data.uploadInstrument.name,
            instURI: data.uploadInstrument.instURI,
          },
        ]);
        initInst();
      },
    },
  );

  const onClickDownloadSampleLyrics = () => {
    const lyricFile = new Blob([JSON.stringify(tempLyric)], {
      type: 'application/json',
    });
    const lyricPath = window.URL.createObjectURL(lyricFile);
    const link = document.createElement('a');
    link.href = lyricPath;
    link.download = 'sampleLyric.json';
    link.click();
    link.remove();
  };

  const imageFileCheck = (file) => {
    const acceptType = ['image/png', 'image/jpeg', 'image/bmp'];

    if (acceptType.indexOf(file.type) == -1) {
      notification['warning']({
        key: 'imagFilyTypeNotification',
        message: '이미지 파일 형식 오류',
        description: `png , jpeg , bmp 형식의 파일만 업로드 할 수 있습니다`,
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      return false;
    }
    return true;
  };

  const jsonFileCheck = (file) => {
    const acceptType = ['application/json'];

    if (acceptType.indexOf(file.type) == -1) {
      notification['warning']({
        key: 'imagFilyTypeNotification',
        message: '가사 파일 형식 오류',
        description: `application/json 형식의 파일만 업로드 할 수 있습니다`,
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      return false;
    }
    return true;
  };

  const audioFileCheck = (file) => {
    const acceptType = ['audio/mp3', 'audio/mpeg3', 'audio/mpeg'];

    if (acceptType.indexOf(file.type) == -1) {
      notification['warning']({
        key: 'imagFilyTypeNotification',
        message: '오디오 파일 형식 오류',
        description: `mp3 형식의 파일만 업로드 할 수 있습니다`,
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      return false;
    }
    return true;
  };

  const submitImageFile = (data) => {
    if (imageFileCheck(data.file)) {
      uploadImage({
        variables: {
          uploadImageFileInput: { file: data.file },
        },
      });
    }
  };

  const submitSongFile = (data) => {
    if (audioFileCheck(data.file)) {
      uploadCoverFile({
        variables: {
          input: { file: data.file },
        },
      });
    }
  };

  const sumbitButtonToSecond = () => {
    if (year && month && day && year > 0 && month > 0 && day > 0)
      uploadSong({
        variables: {
          input: {
            code: code,
            song: {
              ...songData,
              releaseDate: `${year}-${month}-${day}`,
            },
          },
        },
      });
    else {
      setError('발매날짜가 정확하지 않습니다');
    }
  };

  const submitInstFile = (data) => {
    if (audioFileCheck(data.file)) {
      uploadInstFile({
        variables: {
          input: { file: data.file },
        },
      });
    }
  };

  const initInst = () => {
    setInstData({
      ...instData,
      name: null,
      instURI: null,
      position: null,
    });
  };

  const showSessionType = () => {
    return sessionType.map((v, i) => {
      return (
        <Option key={v.session}>
          <Centered>{changeSessionNameToKorean(v.session)}</Centered>
        </Option>
      );
    });
  };

  const showAddedInst = () => {
    if (addedInst && addedInst.length > 0) {
      return addedInst.map((v, i) => {
        return (
          <div key={`inst+${i}`}>
            {i + 1}.{v.name} : {v.instURI}
          </div>
        );
      });
    } else {
      return '추가된 반주가 없습니다';
    }
  };

  const addInstButton = () => {
    uploadInstrument({
      variables: {
        input: {
          code: code,
          instrument: instData,
        },
      },
    });
  };

  const handleLyrics = (e) => {
    if (jsonFileCheck(e)) {
      const fileReader = new FileReader();
      fileReader.readAsText(e, 'UTF-8');
      fileReader.onload = (e) => {
        setSongData({ ...songData, lyrics: e.target.result });
      };
    }
  };

  const changeSongData = () => {
    updateSong({
      variables: {
        input: {
          code: code,
          song: {
            songId: songId,
            lyrics: songData.lyrics,
          },
        },
      },
    });
  };

  const showPage = () => {
    if (page === 1) {
      return (
        <>
          <EditTitle>업로드 된 곡 수정하기</EditTitle>
          <InputContainer>
            <CustomDescription>
              이미 업로드 된 곡을 수정하려면 버튼을 눌러주세요
            </CustomDescription>
            <SubmitButton onClick={() => setPage(3)}>
              업로드 된 곡 수정하기
            </SubmitButton>
          </InputContainer>
          <EditTitle>새로운 곡 등록하기</EditTitle>
          <InputContainer>
            <CustomTitle>업로드 코드</CustomTitle>
            <CustomDescription>업로드 코드를 입력해주세요</CustomDescription>
            <CustomInput
              placeholder="코드를 입력하세요"
              value={code || ''}
              onChange={(e) => setCode(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <CustomTitle>곡 정보 입력</CustomTitle>
            <CustomDescription>곡 정보를 입력해주세요</CustomDescription>
            <CustomInput
              placeholder="곡 제목"
              value={songData.name || ''}
              onChange={(e) =>
                setSongData({ ...songData, name: e.target.value })
              }
            />
            <CustomInput
              placeholder="가수 이름"
              value={songData.artist || ''}
              onChange={(e) =>
                setSongData({ ...songData, artist: e.target.value })
              }
            />
            <CustomInput
              placeholder="앨범 이름"
              value={songData.album || ''}
              onChange={(e) =>
                setSongData({ ...songData, album: e.target.value })
              }
            />
            <DateContainer>
              <CustomDateInput
                placeholder="발매년도"
                value={year || ''}
                maxLength={4}
                onChange={(e) => setYear(e.target.value)}
              />
              <DateText>-</DateText>
              <CustomDateInput
                placeholder="발매월"
                value={month || ''}
                maxLength={2}
                onChange={(e) => setMonth(e.target.value)}
              />
              <DateText>-</DateText>
              <CustomDateInput
                placeholder="발매일"
                value={day || ''}
                maxLength={2}
                onChange={(e) => setDay(e.target.value)}
              />
            </DateContainer>
          </InputContainer>
          <InputContainer>
            <CustomTitle>노래 이미지</CustomTitle>
            <CustomDescription>
              노래를 나타낼 대표 커버 이미지를 올려주세요
            </CustomDescription>
            <CustomDragger
              customRequest={(data) => submitImageFile(data)}
              maxCount={1}
              showUploadList={false}
            >
              {songData.songImg ? (
                <CoverImage src={songData.songImg} />
              ) : (
                <>
                  <CustomPictureIcon />
                </>
              )}
            </CustomDragger>
            {songData.songImg ? (
              <UploadText>
                사진 변경을 원한다면 클릭하거나 파일을 드래그 해주세요.
              </UploadText>
            ) : null}
          </InputContainer>
          <InputContainer>
            <CustomTitle>노래 파일</CustomTitle>
            <CustomDescription>
              모든 파트가 합쳐진 노래 파일을 올려주세요
            </CustomDescription>
            <CustomDragger
              customRequest={(data) => submitSongFile(data)}
              maxCount={1}
              showUploadList={false}
            >
              <>{songData.songURI ? songData.songURI : <CustomMusicIcon />}</>
            </CustomDragger>
            {songData.songURI ? (
              <UploadText>
                업로드 되었습니다. 변경을 원하시면 클릭해주세요.
              </UploadText>
            ) : null}
          </InputContainer>
          <InputContainer>
            <CustomTitle>가사 파일</CustomTitle>
            <CustomDescription>
              가사 파일 (JSON형식)을 올려주세요
              <DownloadButton onClick={onClickDownloadSampleLyrics}>
                샘플파일 다운로드
              </DownloadButton>
            </CustomDescription>
            <CustomDragger
              customRequest={(data) => handleLyrics(data.file)}
              maxCount={1}
              showUploadList={false}
            >
              <>{songData?.lyrics ? songData.lyrics : <CustomLyricIcon />}</>
            </CustomDragger>
            {songData?.lyrics ? (
              <UploadText>
                업로드 되었습니다. 변경을 원하시면 클릭해주세요.
              </UploadText>
            ) : null}
          </InputContainer>
          <InputContainer>
            <CustomTitle>장르와 난이도</CustomTitle>
            <CustomDescription>
              노래의 장르와 난이도를 선택해주세요
            </CustomDescription>
            <ButtonContainer>
              <GenreButton genre={genre} setGenre={setGenre} admin />
              <Spacing />
              <DifficultyButton
                difficulty={level}
                setDifficulty={setLevel}
                admin
              />
            </ButtonContainer>
          </InputContainer>
          <InputContainer>
            <CustomTitle>WeeklyChallenge</CustomTitle>
            <CustomDescription>WeeklyChallenge 노래인가요?</CustomDescription>
            <CustomRadioGroup
              size="large"
              buttonStyle="solid"
              value={songData.weeklyChallenge}
              onChange={(e) =>
                setSongData({
                  ...songData,
                  weeklyChallenge: e.target.value,
                })
              }
            >
              <RadioButtonContainer>
                <CustomRadio value={true}>네</CustomRadio>
                <CustomRadio value={false}>아니요</CustomRadio>
              </RadioButtonContainer>
            </CustomRadioGroup>
          </InputContainer>
          <ErrorContainer>
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          </ErrorContainer>
          <SubmitButton onClick={() => sumbitButtonToSecond()}>
            다음으로
          </SubmitButton>
        </>
      );
    } else if (page === 2) {
      return (
        <>
          <EditTitle>{songData?.name} 반주 추가</EditTitle>
          <InputContainer>
            <CustomTitle>반주 추가</CustomTitle>
            <CustomDescription>
              노래를 구성할 반주를 추가해주세요
            </CustomDescription>
            <AddedInstContainer>{showAddedInst()}</AddedInstContainer>
            <CustomCollapse
              expandIcon={({ isActive }) => <PlusCircleFilled />}
              ghost={true}
              accordion={true}
            >
              <Panel header={'추가하기'} key="1">
                <InstContainer>
                  <InputContainer>
                    <CustomTitle>반주 이름</CustomTitle>
                    <CustomDescription>
                      반주 이름을 입력해주세요
                    </CustomDescription>
                    <CustomInput
                      placeholder="반주 이름"
                      value={instData.name || ''}
                      onChange={(e) =>
                        setInstData({ ...instData, name: e.target.value })
                      }
                    />
                  </InputContainer>
                  <InputContainer>
                    <CustomTitle>반주 파일</CustomTitle>
                    <CustomDescription>
                      반주 파일을 올려주세요
                    </CustomDescription>
                    <CustomDragger
                      customRequest={(data) => submitInstFile(data)}
                      maxCount={1}
                      showUploadList={false}
                    >
                      <>
                        {instData.instURI ? (
                          instData.instURI
                        ) : (
                          <CustomMusicIcon />
                        )}
                      </>
                    </CustomDragger>
                    {instData.instURI ? (
                      <UploadText>
                        업로드 되었습니다. 변경을 원하시면 클릭해주세요.
                      </UploadText>
                    ) : null}
                  </InputContainer>
                  <InputContainer>
                    <CustomTitle>포지션</CustomTitle>
                    <CustomDescription>
                      반주의 포지션을 선택해주세요
                    </CustomDescription>
                    <SessionSelect
                      defaultValue="세션 선택"
                      value={instData.position}
                      dropdownMatchSelectWidth="100%"
                      onChange={(value) => {
                        setInstData({ ...instData, position: value });
                      }}
                    >
                      {showSessionType()}
                    </SessionSelect>
                  </InputContainer>
                  <ErrorContainer>
                    {instError ? (
                      <ErrorMessage>{instError}</ErrorMessage>
                    ) : null}
                  </ErrorContainer>
                  <SubmitButton onClick={() => addInstButton()}>
                    추가하기
                  </SubmitButton>
                </InstContainer>
              </Panel>
            </CustomCollapse>
          </InputContainer>
          <EditTitle>새로운 곡 등록하기</EditTitle>
          <InputContainer>
            <CustomDescription>
              새로운 곡을 등록하려면 버튼을 눌러주세요
            </CustomDescription>
            <SubmitButton onClick={() => setPage(1)}>
              새로운 곡 등록
            </SubmitButton>
          </InputContainer>
        </>
      );
    } else if (page === 3) {
      return (
        <>
          <EditTitle>업로드 된 곡 수정하기</EditTitle>
          <InputContainer>
            <CustomTitle>업로드 코드</CustomTitle>
            <CustomDescription>업로드 코드를 입력해주세요</CustomDescription>
            <CustomInput
              placeholder="코드를 입력하세요"
              value={code || ''}
              onChange={(e) => setCode(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <CustomTitle>Song ID</CustomTitle>
            <CustomDescription>Song objectID를 입력해주세요</CustomDescription>
            <CustomInput
              placeholder="id를 입력하세요"
              value={songId || ''}
              onChange={(e) => setSongId(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <CustomTitle>가사 파일</CustomTitle>
            <CustomDescription>
              가사 파일 (JSON형식)을 올려주세요
              <DownloadButton onClick={onClickDownloadSampleLyrics}>
                샘플파일 다운로드
              </DownloadButton>
            </CustomDescription>
            <CustomDragger
              customRequest={(data) => handleLyrics(data.file)}
              maxCount={1}
              showUploadList={false}
            >
              <>{songData?.lyrics ? songData.lyrics : <CustomLyricIcon />}</>
            </CustomDragger>
            {songData?.lyrics ? (
              <UploadText>
                업로드 되었습니다. 변경을 원하시면 클릭해주세요.
              </UploadText>
            ) : null}
          </InputContainer>
          <InputContainer>
            <CustomTitle>Instrument 포지션 변경</CustomTitle>
            <CustomDescription>
              반주 포지션 변경은 MongoDB에서 해주세요
            </CustomDescription>
          </InputContainer>
          {changeError ? <ErrorMessage>{changeError}</ErrorMessage> : null}
          <SubmitButton onClick={changeSongData}>수정하기</SubmitButton>
          <EditTitle>새로운 곡 등록하기</EditTitle>
          <InputContainer>
            <CustomDescription>
              새로운 곡을 등록하려면 버튼을 눌러주세요
            </CustomDescription>
            <SubmitButton onClick={() => setPage(1)}>
              새로운 곡 등록
            </SubmitButton>
          </InputContainer>
        </>
      );
    }
  };

  useEffect(() => {
    setSongData({ ...songData, genre: genre });
  }, [genre]);

  useEffect(() => {
    setSongData({ ...songData, level: level });
  }, [level]);

  useEffect(() => {
    if (songId) setInstData({ ...instData, songId: songId });
  }, [songId]);

  useEffect(() => {
    const unBlock = history.block(
      `페이지를 이동하면 곡 정보가 삭제됩니다. 이동하시겠습니까?`,
    );

    return () => {
      unBlock();
    };
  }, [history]);

  return (
    <>
      {data?.user && admin.includes(data.user.id) ? (
        <PageContainer>
          <FormContainer>{showPage()}</FormContainer>
        </PageContainer>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

const SessionSelect = styled(Select)`
  width: 100%;
`;

const EditTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin: 2rem 0;
  padding: 0 1rem;

  border-top: 1px solid rgba(200, 200, 200, 0.5);
  border-bottom: 1px solid rgba(200, 200, 200, 0.5);
  background-color: #eee;
`;

const DownloadButton = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #1890ff;
  }
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
`;

const AddedInstContainer = styled.div`
  display: flex;
  height: 8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(240, 240, 240, 1);
  border-radius: 1rem;
`;

const InstContainer = styled.div`
  border: 3px solid rgba(240, 240, 240, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CustomCollapse = styled(Collapse)`
  background-color: white;
  border: none;
  width: 100%;
  text-align: center;
`;

const Divider = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid rgba(230, 230, 230, 0.8);
`;

const FormContainer = styled.div`
  padding: 0rem 2rem 3rem;
  width: 70%;
`;

const ErrorContainer = styled.div`
  height: auto;
  width: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Centered = styled.span`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const Spacing = styled.div`
  width: 1rem;
`;

const CustomRadioGroup = styled(Radio.Group)`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;

  ${media.small} {
    margin-top: 5px;
    margin-bottom: 1rem;
  }
`;

const CustomRadio = styled(Radio)`
  font-size: 1rem;
`;

const RadioButtonContainer = styled.div`
  width: 30%;
  position: absolute;
  display: flex;
  justify-content: space-between;

  ${media.small} {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 2rem 0 1rem;
`;

const ButtonContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`;

const CustomTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CustomDescription = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.2rem 0 1rem;
  color: #3d3d3d;
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DateText = styled.span`
  font-size: 1rem;
  padding-right: 1rem;
`;

const CustomDateInput = styled.input`
  width: 30%;
  color: black;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 1rem 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const CustomPictureIcon = styled(PictureOutlined)`
  font-size: 4rem;
  margin-top: 0.5rem;
  color: gray;
  transition: all 0.3s ease-in-out !important;
`;

const CustomMusicIcon = styled(CustomerServiceOutlined)`
  font-size: 4rem;
  margin-top: 0.5rem;
  color: gray;
  transition: all 0.3s ease-in-out !important;
`;

const CustomLyricIcon = styled(OrderedListOutlined)`
  font-size: 4rem;
  margin-top: 0.5rem;
  color: gray;
  transition: all 0.3s ease-in-out !important;
`;

const UploadText = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: gray;
  text-align: center;
  transition: all 0.3s ease-in-out !important;
`;

const CustomDragger = styled(Dragger)`
  background-color: transparent !important;
  border: 2px solid lightgray !important;
  border-radius: 0.8rem !important;
  padding: 1rem 0 !important;

  &:hover {
    ${CustomPictureIcon} {
      color: #444444;
    }

    ${UploadText} {
      color: #444444;
    }

    border: 2px solid gray !important;
  }
`;

const CoverImage = styled.img`
  height: 15vw;
  max-width: 80%;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: rgba(98, 54, 255, 0.9);
  margin: 1rem 0 3rem;
  width: 100%;
  height: 4rem;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-weight: 700;

  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }
`;

export default AdminPage;

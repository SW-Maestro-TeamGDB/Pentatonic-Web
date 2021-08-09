import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { DeleteFilled } from '@ant-design/icons';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const LibraryList = (props) => {
  const { idx, id } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  return (
    <>
      <CoverContainer>
        <ImageContainer>
          <CoverImage src={randomImg} />
        </ImageContainer>
        <Spacing />
        <CoverInform>
          <CoverTitle>커버 타이틀</CoverTitle>
          <SongInform>원곡 정보</SongInform>
        </CoverInform>
        <CoverTime>2021-07-05</CoverTime>
        <DeleteContainer>
          <CustomDeleteFilled />
        </DeleteContainer>
      </CoverContainer>
    </>
  );
};

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0.5vh 0;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const Spacing = styled.div`
  width: 3%;
`;

const CoverTime = styled.div`
  font-size: 1rem;
  width: 15%;
`;

const DeleteContainer = styled.div`
  width: 7%;
  font-size: 2em;
`;

const CustomDeleteFilled = styled(DeleteFilled)`
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: rgba(255, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  margin: 1vw;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 10%;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5vw;
`;

const CoverInform = styled.div`
  width: 75%;
  color: black;
  padding-left: 1vw;
`;

const CoverMeta = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomIcon = styled.img`
  width: 1vw;
`;

const CoverTitle = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 1.2em;
  color: rgb(100, 100, 100);
`;

export default LibraryList;

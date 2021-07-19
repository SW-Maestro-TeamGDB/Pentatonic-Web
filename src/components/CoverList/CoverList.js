import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

const CoverList = (props) => {
  const { idx, id } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  return (
    <Link to={`/lounge/cover/${id}`}>
      <CoverContainer>
        <ImageContainer>
          <CoverImage src={randomImg} />
        </ImageContainer>
        <CoverInform>
          <CoverTitle>커버 타이틀</CoverTitle>
          <SongInform>원곡 정보</SongInform>
          <SessionInform>참여 세션</SessionInform>
        </CoverInform>
        <CoverMeta>
          <LikeCount>
            <CustomIcon src={ViewIcon} />
            <SpacingSpan />
            {parseInt(Math.random() * 300)}
          </LikeCount>
          <ViewCount>
            <CustomIcon src={ThumbIcon} />
            <SpacingSpan />
            {parseInt(Math.random() * 300)}
          </ViewCount>
        </CoverMeta>
      </CoverContainer>
    </Link>
  );
};

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 25vw;
  height: auto;
  margin: 0.5vh 0;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const ImageContainer = styled.div`
  margin: 1vw;
  width: 6vw;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5vw;
`;

const CoverInform = styled.div`
  width: 60%;
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
  font-size: 1.2vw;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 0.9vw;
  color: rgb(50, 50, 50);
`;

const SessionInform = styled.div`
  font-size: 0.7vw;
  color: rgb(50, 50, 50);
  margin-top: 2vh;
`;

const LikeCount = styled.span`
  margin: 0.3vw 0;
  font-size: 0.7vw;
  text-align: left;
`;
const ViewCount = styled.span`
  margin: 0.3vw 0;
  font-size: 0.7vw;
  text-align: left;
`;

const SpacingSpan = styled.span`
  margin: 0 0.3vw;
`;

export default CoverList;

import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import thumbIcon from '../../images/thumbIcon.svg';
import viewIcon from '../../images/viewIcon.svg';

const CoverList = (props) => {
  const { idx, id } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  console.log(idx);

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
            <img src={viewIcon} width="20px" />
            <SpacingSpan />
            {parseInt(Math.random() * 300)}
          </LikeCount>
          <ViewCount>
            <img src={thumbIcon} width="20px" />
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
  height: 9rem;
  width: 26vw;
  margin: 0.3rem 0;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const ImageContainer = styled.div`
  margin: 1rem;
  width: 7em;
  height: 7em;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

const CoverInform = styled.div`
  width: 60%;
  color: black;
  padding-left: 1rem;
`;

const CoverMeta = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CoverTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 1rem;
  color: rgb(50, 50, 50);
`;

const SessionInform = styled.div`
  font-size: 0.8rem;
  color: rgb(50, 50, 50);
  margin-top: 0.8rem;
`;

const LikeCount = styled.span`
  margin: 0.5rem 0;
  font-weight: 500;
  text-align: left;
`;
const ViewCount = styled.span`
  margin: 0.5rem 0;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

export default CoverList;

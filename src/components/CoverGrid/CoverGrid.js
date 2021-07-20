import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import HeadPhoneIcon from '../../images/HeadPhoneIcon.svg';

const CoverGrid = (props) => {
  const { idx, id } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  return (
    <CustomLink to={`/lounge/cover/${id}`}>
      <CoverContainer>
        <ImageContainer>
          <CoverImage src={randomImg} />
          <HeadPhoneImage src={HeadPhoneIcon} />
        </ImageContainer>
        <DataContainer>
          <CoverInform>
            <CoverTitle>무지성합주</CoverTitle>
            <SongInform>ColdPlay - Fix You</SongInform>
          </CoverInform>
          <CoverMeta>
            <CountContainer>
              <LikeCount>
                <CustomIcon src={ViewIcon} /> {parseInt(Math.random() * 300)}
              </LikeCount>
              <SpacingSpan />
              <ViewCount>
                <CustomIcon src={ThumbIcon} /> {parseInt(Math.random() * 300)}
              </ViewCount>
              <SpacingSpan />
            </CountContainer>
            <SessionInform>
              <CustomIcon src={ViewIcon} />
              <CustomIcon src={ViewIcon} />
              <CustomIcon src={ViewIcon} />
              <CustomIcon src={ViewIcon} />
            </SessionInform>
          </CoverMeta>
        </DataContainer>
      </CoverContainer>
    </CustomLink>
  );
};

const CustomLink = styled(Link)`
  color: black;
  transition: all ease-in-out 0.3s;
  border-radius: 1rem;
  z-index: 1;
`;

const HeadPhoneImage = styled.img`
  position: absolute;
  z-index: 3;
  width: 5rem;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  transition: all ease-in-out 0.3s;
  z-index: 2;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 2vh 0;
  color: black;

  &:hover ${HeadPhoneImage} {
    width: 2.5rem;
    visibility: visible;
    transition: all ease-in-out 0.3s;

    opacity: 1;
  }

  &:hover ${CoverImage} {
    transform: scale(1.2);
    filter: brightness(50%);
  }
`;

const ImageContainer = styled.div`
  height: 10rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 90%;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-top: 0.5rem;
`;

const CoverInform = styled.div`
  width: 80%;
  color: black;
`;

const CoverMeta = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const CustomIcon = styled.img`
  width: 1em;
  height: 1rem;
  filter: invert(80%) sepia(0%) saturate(468%) hue-rotate(238deg)
    brightness(96%) contrast(86%);
  margin-right: 0.2vw;
`;

const CoverTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 16px;
  color: rgb(50, 50, 50);
`;

const SessionInform = styled.div`
  width: 40%;
  height: auto;
`;

const CountContainer = styled.span`
  display: flex;
  align-items: center;
  color: #bababa;
`;

const LikeCount = styled.span`
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
`;
const ViewCount = styled.span`
  margin: 0.3vw 0;
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

export default CoverGrid;

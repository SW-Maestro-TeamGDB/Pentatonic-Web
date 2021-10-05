import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import { sessionIconMatch } from '../../lib/sessionIconMatch';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import HeadPhoneIcon from '../../images/HeadPhoneIcon.svg';

const CoverGrid = (props) => {
  const { idx, title, artist, img, data } = props;
  const category = ['animals', 'arch', 'nature', 'people', 'tech'];
  const randomImg = `https://placeimg.com/300/300/${category[idx]}`;

  const showSession = (session) => {
    return session.map((v, idx) => {
      return (
        <InstrumentIcon
          key={`${idx}+${v.position}`}
          src={sessionIconMatch(v.position)}
        />
      );
    });
  };

  return (
    <CustomLink to={data ? `/lounge/cover/${data.bandId}` : `/`}>
      <CoverContainer>
        <ImageContainer>
          {data?.backGroundURI ? (
            <>
              <CoverImage src={data.backGroundURI} />
              <HeadPhoneImage src={HeadPhoneIcon} />
            </>
          ) : (
            <Skeleton.Button
              style={{ width: '50rem', height: '50rem' }}
              active
            />
          )}
        </ImageContainer>
        <DataContainer>
          {data ? (
            <>
              <CoverInform>
                <CoverTitle>{data.name}</CoverTitle>
                <SongInform>
                  {data.song
                    ? `${data.song.name} - ${data.song.artist}`
                    : title && artist
                    ? `${title} - ${artist}`
                    : null}
                </SongInform>
              </CoverInform>
              <CoverMeta>
                <CountContainer>
                  <LikeCount>
                    <CustomIcon src={ThumbIcon} /> {data.likeCount}
                  </LikeCount>
                  <SpacingSpan />
                  <ViewCount>
                    <CustomIcon src={ViewIcon} /> {data.viewCount}
                  </ViewCount>
                  <SpacingSpan />
                </CountContainer>
                <SessionInform>
                  {!data.session ? null : showSession(data.session)}
                </SessionInform>
              </CoverMeta>
            </>
          ) : (
            <Skeleton
              title={{ width: '100%' }}
              paragraph={{ width: '100%', rows: 1 }}
              active
            />
          )}
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
  min-height: 160px;
  border-radius: 10px;
  transition: all ease-in-out 0.3s;
  object-fit: cover;
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
    transform: scale(1.15);
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
  width: 95%;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
`;

const CoverInform = styled.div`
  width: 100%;
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
  position: relative;
`;

const InstrumentIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 0.2vw;
  opacity: 0.3;
`;

const CustomIcon = styled.img`
  width: 12px;
  height: 12px;
  filter: invert(80%) sepia(0%) saturate(468%) hue-rotate(238deg)
    brightness(96%) contrast(86%);
  margin-right: 0.2vw;
`;

const CoverTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const SongInform = styled.div`
  font-size: 12px;
  color: rgb(50, 50, 50);
`;

const SessionInform = styled.div`
  width: 40%;
  height: auto;
  position: absolute;
  right: 0;
  display: flex;
  flex: row;
  align-items: center;
  justify-content: flex-end;
`;

const CountContainer = styled.span`
  display: flex;
  align-items: center;
  color: #bababa;

  font-weight: 600;
`;

const LikeCount = styled.span`
  font-size: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;
`;
const ViewCount = styled.span`
  font-size: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

export default CoverGrid;

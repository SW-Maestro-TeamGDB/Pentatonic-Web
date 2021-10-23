import react from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import { sessionIconMatch } from '../../lib/sessionIconMatch';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import HeadPhoneIcon from '../../images/HeadPhoneIcon.svg';
import { media, Default, Mobile } from '../../lib/Media';

const CoverGrid = (props) => {
  const { idx, title, artist, img, data } = props;

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
        <Default>
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
        </Default>
        <Mobile>
          <ImageContainer>
            {data?.backGroundURI ? (
              <>
                <CoverImage src={data.backGroundURI} />
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
                    <ViewCount>
                      <CustomIcon src={ViewIcon} /> {data.viewCount}
                    </ViewCount>
                    <SpacingSpan />
                    <LikeCount>
                      <CustomIcon src={ThumbIcon} /> {data.likeCount}
                    </LikeCount>
                    <SpacingSpan />
                  </CountContainer>
                </CoverMeta>
              </>
            ) : (
              <Skeleton.Button
                style={{ width: '50rem', height: '50rem' }}
                active
              />
            )}
          </ImageContainer>
        </Mobile>
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
  border-radius: 1rem;
  transition: all ease-in-out 0.3s;
  object-fit: cover;
  z-index: 2;

  ${media.small} {
    filter: brightness(60%);
    overflow: hidden;
    border-radius: 1rem;
  }
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

  ${media.small} {
    margin: 0;

    &:hover ${CoverImage} {
      transform: none;
      filter: none;
    }

    &:hover ${HeadPhoneImage} {
      visibility: none;
    }
  }

  &:hover ${HeadPhoneImage} {
    width: 2.5rem;
    visibility: visible;
    transition: all ease-in-out 0.3s;

    opacity: 1;
  }

  &:hover ${CoverImage} {
    transform: scale(1.15);
    filter: brightness(50%);
    overflow: hidden;
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

  ${media.small} {
    border-radius: 1rem;
    overflow: hidden;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 8px;
`;

const CoverInform = styled.div`
  width: 100%;
  color: black;

  ${media.small} {
    position: absolute;
    z-index: 2;
    bottom: 7%;
    left: 12px;
    color: white;
  }
`;

const CoverMeta = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  position: relative;

  ${media.small} {
    position: absolute;
    z-index: 2;
    top: 10%;
    right: 8px;
    color: white;
    justify-content: flex-end;
    margin-top: 0;
  }
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

  ${media.small} {
    filter: invert(100%);
    height: 0.8rem;
    width: 0.8rem;
    margin-right: 5px;
    padding-bottom: 3px;
  }
`;

const CoverTitle = styled.div`
  font-size: 16px;
  font-weight: 700;

  ${media.small} {
    font-size: 1.4rem;
    font-weight: 900;
    line-height: 1.7;
    max-width: 90%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SongInform = styled.div`
  font-size: 12px;
  color: #999;
  font-weight: 600;

  ${media.small} {
    color: white;
    font-size: 0.75rem;
    line-height: 1;
    max-width: 90%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

  ${media.small} {
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    color: #fff;
    font-size: 0.8rem;
  }
`;

const LikeCount = styled.span`
  font-size: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const ViewCount = styled.span`
  font-size: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const SpacingSpan = styled.span`
  margin: 0 5px;

  ${media.small} {
    margin-bottom: 3px;
  }
`;

export default CoverGrid;

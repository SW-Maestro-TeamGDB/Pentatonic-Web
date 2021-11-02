import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { media, Default, Mobile } from '../../lib/Media';
import { Link } from 'react-router-dom';

import ThumbIcon from '../../images/ThumbIcon.svg';
import HeartIcon from '../../images/HeartIcon.svg';

const RankList = (props) => {
  const { type, data, rank } = props;

  const rankColor = (rank) => {
    if (rank === 1) {
      return '#f7b500';
    } else if (rank === 2) {
      return '#B9B9B9';
    } else if (rank === 3) {
      return '#B27968';
    } else return '#fff';
  };

  const bandType = type === 'band';
  const link = bandType
    ? `/lounge/cover/${data.bandId}`
    : `/profile/${data.id}`;

  return (
    <RankListContainer>
      {rank ? (
        <RankContainer>
          <RankIcon color={rankColor(rank)}>{rank}</RankIcon>
        </RankContainer>
      ) : null}
      <CustomLink to={link}>
        <RankListImg img={bandType ? data.backGroundURI : data.profileURI} />
      </CustomLink>
      <ListTitle>
        <CustomLink to={link}>
          {bandType ? data.name : data.username}
          <IdText>{bandType ? null : `(@${data.id})`}</IdText>
          <SongText>
            {bandType
              ? `${data.song.name} - ${data.song.artist}`
              : data.introduce}
          </SongText>
        </CustomLink>
      </ListTitle>
      <Default>{rank ? null : <RankContainer> </RankContainer>}</Default>
      <CountContainer>
        {bandType ? (
          <CustomIcon src={ThumbIcon} />
        ) : (
          <CustomHeartIcon src={HeartIcon} />
        )}
        <CountText> {bandType ? data.likeCount : data.followerCount}</CountText>
      </CountContainer>
    </RankListContainer>
  );
};

const RankListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 4rem;
  position: relative;

  margin-bottom: 1.5em;
  color: black;

  &:hover {
    color: black;
  }

  ${media.small} {
    margin-bottom: 1.5rem;
  }
`;

const RankListImg = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 10px;
  width: 4.5em;
  height: 4.5em;
  box-sizing: border-box;

  ${media.small} {
    width: 4rem;
    height: 4rem;
  }
`;

const SongText = styled.div`
  font-size: 12px;
  margin-top: 3px;
  color: #aaa;

  width: 13em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.medium} {
    width: 10vw;
  }

  ${media.five} {
    width: 7rem;
  }

  ${media.small} {
    font-size: 0.75rem;
    width: 8rem;
  }
`;

const RankContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3%;
  margin-left: 2%;

  ${media.small} {
    width: 10%;
    margin-left: 0;
  }
`;

const RankIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  color: ${(props) => (props.color === '#fff' ? '000' : '#fff')};
  font-weight: 700;
  line-height: 1;

  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 1.2rem;
    height: 1.2rem;
    font-size: 0.8em;
  }
`;

const ListTitle = styled.div`
  width: 40%;
  height: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  padding-left: 3rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.small} {
    padding-left: 1rem;
    font-size: 1rem;
    letter-spacing: -1px;
    width: 50%;
  }
`;

const CountText = styled.div`
  width: 2rem;
  text-align: center;

  ${media.small} {
    font-size: 0.8rem;
    padding-left: 5px;
  }
`;

const CustomIcon = styled.img`
  width: 14px;
  filter: invert(25%) sepia(39%) saturate(0%) hue-rotate(199deg) brightness(93%)
    contrast(92%);

  ${media.small} {
    width: 0.7rem;
  }
`;

const CustomHeartIcon = styled.img`
  width: 14px;
  filter: invert(11%) sepia(85%) saturate(5263%) hue-rotate(357deg)
    brightness(90%) contrast(115%);

  ${media.small} {
    width: 0.7rem;
  }
`;

const CountContainer = styled.div`
  width: 25%;
  font-size: 14px;
  color: #444444;
  font-weight: 600;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;

  ${media.small} {
    width: 20%;
  }
`;

const IdText = styled.span`
  color: lightgray;
  font-size: 0.8rem;
  padding-left: 0.5rem;
`;

const CustomLink = styled(Link)`
  color: black;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #888;
  }
`;

export default RankList;

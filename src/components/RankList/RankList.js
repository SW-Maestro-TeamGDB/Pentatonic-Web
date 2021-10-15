import react, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { media } from '../../lib/Media';
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
      ) : (
        <RankContainer> </RankContainer>
      )}
      <CustomLink to={link}>
        <RankListImg img={bandType ? data.backGroundURI : data.profileURI} />
      </CustomLink>
      <ListTitle>
        <CustomLink to={link}>
          {bandType ? data.name : data.username}
          <SongText>
            {bandType ? `${data.song.name} - ${data.song.artist}` : null}
          </SongText>
        </CustomLink>
        <IdText>{bandType ? null : `(@${data.id})`}</IdText>
      </ListTitle>
      <CountContainer>
        <CustomIcon src={bandType ? ThumbIcon : HeartIcon} />
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
`;

const SongText = styled.div`
  font-size: 12px;
  margin-top: 3px;
  color: #aaa;
`;

const RankContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3%;
  margin-left: 2%;
`;

const RankIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  color: ${(props) => (props.color === '#fff' ? '000' : '#fff')};
  font-weight: 700;

  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const CountText = styled.div`
  width: 2rem;
  text-align: center;
`;

const CustomIcon = styled.img`
  width: 14px;
  filter: invert(25%) sepia(39%) saturate(0%) hue-rotate(199deg) brightness(93%)
    contrast(92%);
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
  justify-content: flex-start;
  padding-right: 1rem;
`;

const IdText = styled.div`
  color: lightgray;
  font-size: 0.8rem;
  padding-left: 0.5rem;
`;

const CustomLink = styled(Link)`
  color: black;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #888;
  }
`;

export default RankList;

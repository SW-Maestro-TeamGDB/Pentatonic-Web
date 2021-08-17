import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import DifficultyIcon from '../DifficultyIcon';

const SongList = (props) => {
  const { link, data } = props;

  return (
    <SongInformLink to={link}>
      <SongImg img={data.img} />
      <SongTitleContainer>
        {data.title}
        {data.weekly ? <WeeklyBanner>Weekly</WeeklyBanner> : null}
      </SongTitleContainer>
      <ArtistContainer>{data.artist}</ArtistContainer>
      <SessionContainer>보컬,기타,드럼,베이스</SessionContainer>
      <DifficultyContainer>
        난이도
        <IconContainer>
          <DifficultyIcon value={data.difficulty} />
        </IconContainer>
      </DifficultyContainer>
    </SongInformLink>
  );
};

const SongInformLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 7rem;
  position: relative;

  color: black;

  &:hover {
    color: black;
  }
`;

const WeeklyBanner = styled.div`
  width: auto;
  padding: 0.6vh 1vw;
  color: white;
  font-size: 0.8rem;
  border-radius: 1rem;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongImg = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 15px;
  width: 15%;
  height: 80%;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  width: 60%;
  margin-left: 1rem;
`;

const SongTitleContainer = styled.div`
  width: 30%;
  height: 100%;
  text-align: left;
  font-size: 1.3rem;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const ArtistContainer = styled.div`
  width: 20%;
  text-align: left;
  font-size: 1.1rem;
  color: #222222;
  font-weight: 600;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SessionContainer = styled.div`
  width: 25%;
  font-size: 0.9rem;
  color: #222222;
  font-weight: 500;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DifficultyContainer = styled.div`
  width: 25%;
  font-size: 1rem;
  color: #222222;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`;

export default SongList;

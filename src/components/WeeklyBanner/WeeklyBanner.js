import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { useQuery, gql } from '@apollo/client';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const QUERY_SONG = gql`
  query Query($querySongFilter: QuerySongInput!) {
    querySong(filter: $querySongFilter) {
      name
      artist
      songImg
    }
  }
`;

const WeeklyBanner = () => {
  const { data } = useQuery(QUERY_SONG, {
    variables: {
      querySongFilter: {
        weeklyChallenge: true,
        type: 'ALL',
      },
    },
  });

  const songData = data?.querySong[0];

  return (
    <BannerContainer>
      <Link to="/lounge/weekly">
        <Background url={songData ? songData.songImg : null} />
        <BannerContents>
          <WeeklyChallengeTitleContainer>
            <WeeklyChallengeTitle>Weekly Challenge</WeeklyChallengeTitle>
          </WeeklyChallengeTitleContainer>
          <SongTitle>{songData ? songData.name : null}</SongTitle>
          <Singer>{songData ? songData.artist : null}</Singer>
        </BannerContents>
      </Link>
    </BannerContainer>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: ${(props) => (props.url ? `url(${props.url})` : null)};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  ${media.small} {
    border-radius: 0px;

    &:hover {
      transform: none;
    }
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vw;
  min-height: 20rem;
  width: 100%;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  ${media.small} {
    border-radius: 0px;
  }

  ${Background} {
    filter: brightness(60%);

    ${media.small} {
      &:hover {
        filter: none;
      }
    }

    &:hover {
      filter: brightness(80%);
    }
  }
`;

const BannerContents = styled.div`
  position: absolute;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  right: 3%;
`;

const WeeklyChallengeTitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WeeklyChallengeTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 15px;
  width: 200px;
  height: 40px;
  border-radius: 30px;
  line-height: 1;
  letter-spacing: -0.4px;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 1.1rem;
  }
`;

const SongTitle = styled.span`
  font-weight: 900;
  font-size: 60px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1.3;
  letter-spacing: 2px;

  ${media.small} {
    font-size: 2.8rem;
  }
`;

const Singer = styled.span`
  font-weight: 900;
  font-size: 24px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;

  ${media.small} {
    font-size: 1.8rem;
  }
`;

export default WeeklyBanner;

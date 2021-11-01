import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import ArtistBannerContents from '../ArtistBannerContents/ArtistBannerContents';
import { media } from '../../lib/Media';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

import FocusriteAd from '../../images/Ads/focusrite_ad.png';
import JflaAd from '../../images/Ads/jfla_ad.png';
import SonyAd from '../../images/Ads/sony_ad.png';

const ArtistBanner = (props) => {
  const { artistData, bandData } = props;
  const [randomArtist, setRandomArtist] = useState();
  const [randomBand, setRandomBand] = useState();
  const [mixedData, setMixedData] = useState();

  const showContents = () => {
    if (randomArtist && randomBand) {
      let temp = [];
      let idx = 0;

      while (idx < randomArtist.length - 1 && idx < randomBand.length - 1) {
        if (idx < randomArtist.length - 1) {
          temp.push({ data: artistData[randomArtist[idx]], type: 'artist' });
        }
        if (idx < randomBand.length - 1) {
          temp.push({ data: bandData[randomBand[idx]], type: 'band' });
        }

        idx += 1;
      }

      return temp.map((v, i) => {
        return (
          <ArtistBannerContents
            data={v.data}
            type={v.type}
            key={`ArtistBanner+${i}`}
          />
        );
      });
    }
  };

  const selectRandomIdx = (data, type) => {
    const lastIdx = data.length >= 10 ? 10 : data.length;
    const limit = lastIdx > 1 ? 3 : lastIdx;
    let set = new Set();

    while (set.size < limit) {
      set.add(parseInt(Math.random() * lastIdx));
    }

    if (type === 'artist') {
      setRandomArtist([...set]);
    } else {
      setRandomBand([...set]);
    }
  };

  useEffect(() => {
    if (artistData) selectRandomIdx(artistData, 'artist');
  }, [artistData]);

  useEffect(() => {
    if (bandData) selectRandomIdx(bandData, 'band');
  }, [bandData]);

  return (
    <BannerContainer>
      <CustomCarousel dotPosition="bottom" autoplay>
        {/* <BannerImage src={FocusriteAd} />
        <BannerImage src={JflaAd} />
        <BannerImage src={SonyAd} /> */}
        {showContents()}
      </CustomCarousel>
    </BannerContainer>
  );
};

const CustomCarousel = styled(Carousel)`
  width: 100%;
  /* height: 28rem; */
  height: 20rem;
  position: relative;

  /* ${media.small} {
    height: 70vw;
  } */
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  cursor: pointer;

  border-radius: 15px;
  overflow: hidden;

  ${media.small} {
    border-radius: 0;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  /* height: 28rem; */
  height: 20rem;
  object-fit: cover;
  /* 
  ${media.small} {
    height: 70vw;
  } */
`;

export default ArtistBanner;

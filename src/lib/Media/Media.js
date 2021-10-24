import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1023 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const mobileCheck = () => {
  console.log(navigator.platform.toLocaleLowerCase());
  console.log(navigator.userAgent);

  return !'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(
    navigator.platform.toLocaleLowerCase() >= 0,
  );
};

const mediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

const media = {
  xxxlarge: mediaQuery(2200),
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1200),
  medium: mediaQuery(1024),
  small: mediaQuery(768),
  five: mediaQuery(500),
  xsmall: mediaQuery(375),
  se: mediaQuery(340),
  fold: mediaQuery(295),
};

export { Desktop, Tablet, Mobile, Default, media, mobileCheck };

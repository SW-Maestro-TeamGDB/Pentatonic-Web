import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';

const PageContainer = ({ children, width }) => {
  return <Container width={width}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  align-items: center;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
  padding: 1.5vh 1vw;
  height: auto;
  width: ${(props) => (props.width ? `${props.width}` : '60%')};
  min-width: ${(props) => (props.width ? `${props.width}` : '1000px')};
  margin-top: 3vh;

  ${media.medium} {
    width: 90%;
    min-width: 600px;
  }

  ${media.small} {
    width: 90%;
    margin-top: 0;
  }
`;

export default PageContainer;

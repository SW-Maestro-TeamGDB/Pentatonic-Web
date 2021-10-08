import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';

const PageContainer = ({ children, width, minWidth }) => {
  return (
    <Container width={width} minWidth={minWidth}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  align-items: center;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
  padding: 1rem;
  height: auto;
  width: ${(props) => (props.width ? `${props.width}` : '60%')};
  min-width: ${(props) =>
    props.minWidth
      ? `${props.minWidth}`
      : props.width
      ? props.width
      : '1000px'};
  margin-top: 1.5rem;

  ${media.medium} {
    width: 90%;
    min-width: 600px;
  }

  ${media.small} {
    width: 90%;
    min-width: 0px;
    margin-top: 1rem;
  }
`;

export default PageContainer;

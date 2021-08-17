import react from 'react';
import PageContainer from '../../components/PageContainer';
import LibraryList from '../../components/LibraryList';
import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';

const Library = () => {
  const loadLibrary = () =>
    Array.from({ length: 5 }, () => 0).map((v, i) => {
      return (
        <LibraryList
          id={parseInt(Math.random() * 100)}
          key={i}
          idx={parseInt(Math.random() * 7)}
          edit={true}
        />
      );
    });

  return (
    <PageContainer>
      <PageTitle>라이브러리</PageTitle>
      <Spacing />
      <LibraryContainer>{loadLibrary()}</LibraryContainer>
    </PageContainer>
  );
};

const PageTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
`;

const Spacing = styled.div`
  height: 2rem;
`;

const LibraryContainer = styled.div`
  width: 100%;
`;

export default Library;

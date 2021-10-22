import react, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';
import { media } from '../../lib/Media';

const SearchBar = (props) => {
  const { placeholder, afterRequest, sort, searching, match } = props;
  const [inputText, setInputText] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    if (inputText) {
      if (searching) history.push(`${inputText}`);
      else history.push(`${sort}/search/${inputText}`);
    } else {
      const idx = match.path.indexOf('/search');
      const artist = match.path.indexOf('artist');

      if (searching && artist == -1)
        history.replace(`${match.path.slice(0, idx)}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <SearchBarContainer>
      <CustomInput
        placeholder={placeholder ? placeholder : null}
        onChange={(v) => setInputText(v.target.value)}
        onKeyPress={handleKeyPress}
      />
      <CustomIcon src={SearchIcon} onClick={handleSubmit} />
    </SearchBarContainer>
  );
};

const CustomInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  margin-left: 1rem;
  font-family: 'NanumSquare';
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;
  position: absolute;
  padding-left: 1.5rem;
  padding-right: 7%;

  border-radius: 1rem;
  border: 3px solid rgba(98, 54, 255, 0);
  background-color: rgba(98, 54, 255, 0.03);

  outline: none;

  &:hover {
    border: 3px solid rgba(98, 54, 255, 0.05);
  }

  &:focus {
    border: 3px solid rgba(98, 54, 255, 0.1);
  }

  ::placeholder {
    font-size: 16px;
  }

  ${media.small} {
    padding-left: 1rem;
    padding-right: 3rem;
    margin-left: 0;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;

  position: relative;

  ${media.small} {
    width: 90%;
    padding-left: 0;
  }
`;

const CustomIcon = styled.img`
  width: 1.2rem;
  cursor: pointer;
  filter: invert(38%) sepia(91%) saturate(5568%) hue-rotate(241deg)
    brightness(101%) contrast(101%);
  opacity: 0.3;
  position: absolute;
  right: 0;

  ${media.small} {
    right: 5px;
  }
`;

export default SearchBar;

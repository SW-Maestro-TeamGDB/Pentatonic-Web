import react, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobilemyMenu = (props) => {
  const { setMenuToggle } = props;
  return (
    <div
      onClick={() => setMenuToggle(false)}
      style={{
        position: 'absolute',
        zindex: '2',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: '3',
          position: 'absolute',
          color: 'black',
          backgroundColor: 'white',
          left: '0',
          width: '40%',
          height: '100%',
          border: '1px solid lightgray',
          alignItems: 'center',
        }}
      >
        <Link to="/profile">마이페이지</Link>
        <Link to="/liked">좋아요 누른 커버</Link>
        <Link to="/library">라이브러리</Link>
        <Link to="/">로그아웃</Link>
      </div>
    </div>
  );
};

export default MobilemyMenu;

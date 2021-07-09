import react from 'react';
import { Link } from 'react-router-dom';

const MyMenu = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        zIndex: '2',
        position: 'absolute',
        color: 'black',
        backgroundColor: 'white',
        right: '40px',
        border: '1px solid black',
      }}
    >
      <Link to="/profile">마이페이지</Link>
      <Link to="/liked">좋아요 누른 커버</Link>
      <Link to="/library">라이브러리</Link>
      <Link to="/">로그아웃</Link>
    </div>
  );
};

export default MyMenu;

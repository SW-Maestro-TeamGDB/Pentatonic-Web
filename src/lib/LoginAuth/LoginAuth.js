import react, { useEffect, useState } from 'react';
import AuthModal from '../../components/AuthModal';
import { useHistory } from 'react-router-dom';

const LoginAuth = ({ children, action }) => {
  const userInfo = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');

  const [modalToggle, setModalToggle] = useState(true);

  if (userInfo && token) return <>{children}</>;
  else
    return (
      <AuthModal
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        pageAuth
      />
    );
};

export default LoginAuth;

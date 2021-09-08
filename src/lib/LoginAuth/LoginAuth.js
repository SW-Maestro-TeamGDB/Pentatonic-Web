import react, { useEffect, useState } from 'react';
import AuthModal from '../../components/AuthModal';
import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../../apollo/cache';
import { useHistory } from 'react-router-dom';

const LoginAuth = ({ children }) => {
  // const userInfo = localStorage.getItem('userInfo');
  // const token = localStorage.getItem('token');
  // const isLogged = userInfo && token;

  const { data } = useQuery(IS_LOGGED_IN, {});

  const [modalToggle, setModalToggle] = useState(true);

  if (data?.isLoggedIn) {
    return <>{children}</>;
  } else
    return (
      <AuthModal
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        pageAuth
      />
    );
};

export default LoginAuth;

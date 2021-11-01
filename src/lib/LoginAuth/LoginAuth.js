import react, { useEffect, useState } from 'react';
import AuthModal from '../../components/AuthModal';
import { gql, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/cache';
import { useHistory } from 'react-router-dom';

const LoginAuth = ({ children }) => {
  const { data } = useQuery(GET_CURRENT_USER, {});

  const [modalToggle, setModalToggle] = useState(true);

  if (data?.user) {
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

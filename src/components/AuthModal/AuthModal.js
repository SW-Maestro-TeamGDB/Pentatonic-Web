import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import LoginModal from '../LoginModal';
import FindAccountModal from '../FindAccoutModal/FindAccountModal';
import FindIdModal from '../FindIdModal.js/FindIdModal';
import FindPasswordModal from '../FindPasswordModal';
import { media } from '../../lib/Media';

import { useHistory } from 'react-router-dom';

const AuthModal = (props) => {
  const { modalToggle, setModalToggle, action, pageAuth = 'false' } = props;
  const [pageStep, setPageStep] = useState(0);
  const [login, setLogin] = useState();

  const history = useHistory();

  const closeModal = () => {
    setModalToggle(false);
  };

  useEffect(() => {
    setPageStep(0);
  }, [modalToggle]);

  const showModal = () => {
    if (pageStep === 0) {
      return (
        <LoginModal
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          closeModal={closeModal}
          setPageStep={setPageStep}
          action={action}
          setLogin={setLogin}
        />
      );
    } else if (pageStep === 1) {
      return (
        <FindAccountModal
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          closeModal={closeModal}
          setPageStep={setPageStep}
        />
      );
    } else if (pageStep === 2) {
      return (
        <FindIdModal
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          closeModal={closeModal}
          setPageStep={setPageStep}
        />
      );
    } else if (pageStep === 3) {
      return (
        <FindPasswordModal
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          closeModal={closeModal}
          setPageStep={setPageStep}
        />
      );
    }
  };

  useEffect(() => {
    if (pageAuth === true && modalToggle === false && !login) {
      return history.goBack();
    }
  }, [modalToggle]);

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      keyboard={false}
      destroyOnClose
      centered
    >
      {showModal()}
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

export default AuthModal;

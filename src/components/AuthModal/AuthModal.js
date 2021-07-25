import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import LoginModal from '../LoginModal';
import FindAccountModal from '../FindAccoutModal/FindAccountModal';
import FindIdModal from '../FindIdModal.js/FindIdModal';
import FindPasswordModal from '../FindPasswordModal';

const AuthModal = (props) => {
  const { modalToggle, setModalToggle } = props;
  const [pageStep, setPageStep] = useState(0);

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

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
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

import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import LoginModal from '../LoginModal';
import FindAccountModal from '../FindAccoutModal/FindAccountModal';
import FindIdModal from '../FindIdModal.js/FindIdModal';
import FindPasswordModal from '../FindPasswordModal';

const RecordModal = (props) => {
  const { modalToggle, setModalToggle } = props;

  const closeModal = () => {
    setModalToggle(false);
  };

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <ModalTitle>녹음 시 주의사항</ModalTitle>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
`;

export default RecordModal;

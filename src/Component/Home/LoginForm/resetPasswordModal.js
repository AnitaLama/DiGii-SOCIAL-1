import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Button, FormInput } from '../../StyledComponents';

const ResetPasswordModal = props => {
  const { isModalVisible, handleOk, handleCancel } = props;
  return (
    <Modal
      title="Reset new password"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[<Button key="resetPassswordModal">Reset</Button>]}
    >
      <FormInput placeholder="Enter new password" />
      <FormInput placeholder="Re-enter new password" />
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  isModalVisible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func
};
export default ResetPasswordModal;

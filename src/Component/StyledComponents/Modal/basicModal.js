import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../../history';
import {
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  Message,
  CenteredDiv
} from './index';
import { Images } from '../../../Theme';
import { WhiteButton } from '../index';
import { Warnings } from '../../Functions';

class BasicModal extends Component {
  constructor() {
    super();
    this.state = {
      checkboxSelected: false
    };
  }

  handleOK = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  logout = () => {
    const { user } = this.props;
    if (user.isStudent) {
      history.push('/student/login');
    } else {
      history.push('/');
    }
  };

  render() {
    const {
      message, strike, index, text, points
    } = this.props;
    const check = message && message === 'You have been excluded from the Message Board.';
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Icon src={Images.digii5.icon} />
              DiGii
            </div>
            {points && (
              <Points>
                <span>{points}</span>
                <Icon src={Images.digii5.DiGiitIconColored} className="small" />
              </Points>
            )}
          </Header>
          {message && <Message>{message}</Message>}
          {index !== -1 && !message && (
            <Message>
              <Warnings index={index} />
            </Message>
          )}
          <CenteredDiv>
            <WhiteButton
              className="roundedShadow short "
              onClick={check ? this.logout : this.handleOK}
            >
              {check ? 'Logout' : 'Back to Chat'}
            </WhiteButton>
          </CenteredDiv>
        </ModalBox>
      </ModalContainer>
    );
  }
}

BasicModal.propTypes = {
  showVideo: PropTypes.func,
  strike: PropTypes.number,
  hideModal: PropTypes.func,
  showCheckButton: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user,
  strike: state.strike.strikes
});

const Modal = connect(mapStateToProps)(BasicModal);

export default Modal;

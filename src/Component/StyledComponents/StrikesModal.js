import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import {
  ModalContainer,
  ModalBox,
  Header,
  Button,
  Avatar,
  Icon,
  Message,
  TermsAndConditionBox,
  Points,
  WhiteButton
} from './index';
import { Colors, Images, flexCentering } from '../../Theme';
import { Warnings, BlacklistedWords } from '../Functions';

const { tint, peach } = Colors.colors;
const User = styled.div`
  ${flexCentering()};
  justify-content: flex-start;
`;
const ModeratedPost = styled.div`
  margin: 20px 0;
  color: #777777;
  span {
    padding: 0 4px;
    margin: 0 4px;
    background: rgba(245, 75, 100, 0.2);
  }
`;

class StrikesModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxSelected: false,
      postText: props.postText
    };
  }

  handleCheckboxClick = e => {
    const { checked } = e.target;
    this.setState({ checkboxSelected: checked });
  };

  handleOK = () => {
    const { hideModal } = this.props;
    // const { hideModal, showVideo, strike } = this.props;
    // if ((strike + 1) % 3 === 0) {
    //   showVideo();
    // } else {
    //   hideModal();
    // }
    hideModal();
  };

  render() {
    const {
      message,
      showCheckButton,
      strike,
      showVideo,
      index,
      user
    } = this.props;
    const { checkboxSelected, postText } = this.state;
    const { avatar, firstname, lastname } = user;
    console.log(postText);
    const newText = BlacklistedWords(postText);
    console.log(newText);
    const hasToShowTutorial = (strike + 1) % 3 === 0;
    return (
      <ModalContainer>
        <ModalBox>
          <User>
            <Avatar avatar={avatar} height={42} />
            {firstname}
            {' '}
            {lastname}
          </User>
          <ModeratedPost
            dangerouslySetInnerHTML={{
              __html: newText
            }}
          />
        </ModalBox>
        <ModalBox>
          <Header>
            <div>
              <Icon src={Images.digii5.icon} />
              Digii
            </div>
            <Points>
              <span>-5</span>
              <Icon src={Images.digii5.DiGiitIconColored} className="small" />
            </Points>
          </Header>
          {message && <Message>{message}</Message>}
          {index !== -1 && !message && (
            <Message>
              <Warnings index={index} />
            </Message>
          )}
          {!hasToShowTutorial && (
            <div>
              {showCheckButton && (
                <TermsAndConditionBox>
                  <input
                    type="checkbox"
                    id="CheckBox"
                    name="CheckBox"
                    onChange={this.handleCheckboxClick}
                  />
                  <span>I understand</span>
                </TermsAndConditionBox>
              )}
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <WhiteButton
                  className={`roundedShadow short ${!checkboxSelected
                    && 'disabled'}`}
                  onClick={this.handleOK}
                >
                  Back to Chat
                </WhiteButton>
              </div>
            </div>
          )}
          {hasToShowTutorial && (
            <div
              style={{
                textAlign: 'center'
              }}
            >
              <Button className={'rounded short\'}'} onClick={showVideo}>
                Watch Tutorial
              </Button>
            </div>
          )}
        </ModalBox>
      </ModalContainer>
    );
  }
}

StrikesModalContainer.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func
};

const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user,
  strike: state.strike.strikes
});

const StrikesModal = connect(mapStateToProps)(StrikesModalContainer);

export default StrikesModal;

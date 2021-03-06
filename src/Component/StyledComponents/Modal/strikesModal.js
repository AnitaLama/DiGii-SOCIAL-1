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
  WhiteButton,
  ContentWrapper
} from '../index';
import { Colors, Images, flexCentering } from '../../../Theme';
import { Warnings, BlacklistedWords } from '../../Functions';
import StrikeActions from '../../../Redux/StrikeRedux';

const { tint, peach } = Colors.colors;
const User = styled.div`
  ${flexCentering()};
  justify-content: flex-start;
  .username {
    text-transform: capitalize;
    font-size: 16px;
    color: #383746;
  }
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
      postText: props.postText,
      imageName: props.imageName,
      banner: props.banner
    };
  }

  handleCheckboxClick = () => {
    const { checkboxSelected } = this.state;
    this.setState({ checkboxSelected: !checkboxSelected });
  };

  handleCheckboxValueChange = e => {
    const { checked } = e.target;
    this.setState({ checkboxSelected: checked });
  };

  handleOK = () => {
    const { hideModal, onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user;
    // const { hideModal, showVideo, strike } = this.props;
    // if ((strike + 1) % 3 === 0) {
    //   showVideo();
    // } else {
    //   hideModal();
    // }
    hideModal();
    onGetStrikesCountOfAUser({ isStudent, id });
  };

  showVideo = () => {
    const { showVideo, onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user;
    onGetStrikesCountOfAUser({ isStudent, id });
    showVideo();
  };

  render() {
    const {
      message,
      showCheckButton,
      strike,
      showVideo,
      index,
      user,
      feeling,
      banner
    } = this.props;
    const { checkboxSelected, postText, imageName } = this.state;
    const { avatar, firstname, lastname } = user;
    const newText = BlacklistedWords(postText);
    const hasToShowTutorial = (strike + 1) % 3 === 0;
    return (
      <ModalContainer>
        <ContentWrapper style={{ display: 'flex' }}>
          <ModalBox>
            <User>
              <Avatar avatar={avatar} height={42} />
              <div>
                <div className="username">
                  {firstname}
                  {' '}
                  {lastname}
                </div>
                {feeling && (
                  <div>
                    - is feeling
                    {' '}
                    {feeling.name}
                    {' '}
                    {feeling.emoji}
                  </div>
                )}
              </div>
            </User>
            <ModeratedPost
              dangerouslySetInnerHTML={{
                __html: newText
              }}
            />
            {imageName && <img src={imageName} style={{ width: '100%' }} />}
            {banner && <img src={banner} style={{ width: '100%' }} />}
          </ModalBox>
          <ModalBox>
            <Header>
              <div>
                <Icon src={Images.digii5.icon} />
                DiGii
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
                  <TermsAndConditionBox onClick={this.handleCheckboxClick}>
                    <input
                      type="checkbox"
                      id="CheckBox"
                      name="CheckBox"
                      checked={this.state.checkboxSelected}
                      onChange={this.handleCheckboxValueChange}
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
                <Button className={'rounded short\'}'} onClick={this.showVideo}>
                  Watch Tutorial
                </Button>
              </div>
            )}
          </ModalBox>
        </ContentWrapper>
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
const mapDispatchToProps = dispatch => ({
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value))
});
const StrikesModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(StrikesModalContainer);

export default StrikesModal;

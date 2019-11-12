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
import { Warnings, BlacklistedWords, StrikedTerms } from '../../Functions';
import StrikeActions from '../../../Redux/StrikeRedux';
import PostActions from '../../../Redux/PostRedux';
import CommentActions from '../../../Redux/CommentRedux';

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
    color: rgba(245, 75, 100, 1);
  }
`;

class StrikesModalContainer extends Component {
  state = {
    checkboxSelected: false
    // postText: props.postText,
    // imageName: props.imageName,
    // banner: props.banner
  };

  handleCheckboxClick = () => {
    const { checkboxSelected } = this.state;
    this.setState({ checkboxSelected: !checkboxSelected });
  };

  handleCheckboxValueChange = e => {
    const { checked } = e.target;
    this.setState({ checkboxSelected: checked });
  };

  handleOK = () => {
    const {
      hideModal,
      user,
      onDisableStrikesModal,
      onDisableCommentStrikesModal
    } = this.props;
    console.log('here hide the modal');

    onDisableStrikesModal();
    onDisableCommentStrikesModal();
    setTimeout(() => {
      hideModal();
    }, 1000);
  };

  showVideo = () => {
    const {
      showVideo,
      hideModal,
      onDisableStrikesModal,
      onDisableCommentStrikesModal
    } = this.props;
    onDisableStrikesModal();
    onDisableCommentStrikesModal();
    showVideo('insult');
    hideModal();
    // setTimeout(() => {
    // }, 1000);

    // const { isStudent, id } = user;
    // onGetStrikesCountOfAUser({ isStudent, id });
  };

  render() {
    const {
      message,
      showCheckButton,
      strike,
      showVideo,
      // index,
      user,
      feeling,
      banner,
      post,
      comment
    } = this.props;
    const { checkboxSelected, postText, imageName } = this.state;
    const { avatar, firstname, lastname } = user;
    const { strikedTerms, strikedPost } = post;
    const { strikedComment, strikedCommentTerms } = comment;
    let newText = '';
    if (strikedPost) {
      newText = BlacklistedWords(strikedPost);
    } else {
      newText = BlacklistedWords(strikedComment);
    }
    newText = strikedPost
      ? StrikedTerms(strikedPost, strikedTerms)
      : StrikedTerms(strikedComment, strikedCommentTerms);

    // const newText = 'hey oh';
    // const hasToShowTutorial = 0;
    const hasToShowTutorial = strike % 3 === 0;
    let index = (strike % 3) - 1;
    index = index >= 0 ? index : 0;
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
  strike: state.strike.strikes,
  post: state.post,
  comment: state.comment
});
const mapDispatchToProps = dispatch => ({
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  onDisableStrikesModal: () => dispatch(PostActions.onDisableStrikesModal()),
  onDisableCommentStrikesModal: () => dispatch(CommentActions.onDisableCommentStrikesModal())
});
const StrikesModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(StrikesModalContainer);

export default StrikesModal;

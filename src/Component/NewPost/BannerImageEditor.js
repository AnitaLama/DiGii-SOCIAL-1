import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  FormInput,
  ButtonWrapper,
  Button,
  Modal
} from '../StyledComponents';
import { Colors, Images } from '../../Theme';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';
import { Moderator } from '../Functions';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const CloseButton = styled.span``;
// const Message = styled.p``;
const Image = styled.img`
  // height: auto;
  @media (max-width: 800px) {
    width: 100%;
  }
  height: 330px;
  width: 750px;
`;
const ImageWrapper = styled.div``;
const ImageBackground = styled.div`
  position: relative;
  width: 100%;
`;
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: ${snow};
`;
const BannerImageModalWrapper = styled.div`
  width: 780px;
  margin: auto;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

class BannerImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      imageURL: null,
      postTypeId: props.postTypeId,
      isModalVisible: false,
      alertMessage: null
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  //
  onFocus = () => {
    const { onFocus } = this.props;
    onFocus();
    // const {
    //   user, disableFirstTimePosting, post, onFocus
    // } = this.props;
    // const { posts } = post;
    // const { id, isFirstTimePosting } = user.user;
    // const checkFirstTimePosting = onFocus(posts, id,isFirstTimePosting);
    //
    // if (checkFirstTimePosting && isFirstTimePosting) {
    //   disableFirstTimePosting();
    // }
  };

  handleTextChange = e => {
    const { handlePostText } = this.props;
    handlePostText(e);
  };

  saveBanner = () => {
    const { data } = this.props;
    this.props.saveBanner(`${url}/${data.Key}`);
    // const {
    //   submitPost,
    //   strike,
    //   user,
    //   onBlockUser,
    //   postText,
    //   showWarning,
    //   resetPostType,
    //   onGetStrikesCountOfAUser,
    //   data,
    //   onSubmitPost
    // } = this.props;
    // const { postTypeId } = this.state;
    // const { isStudent, id } = user.user;
    // const { strikes } = strike;
    // const result = submitPost();
    // onGetStrikesCountOfAUser({ isStudent, id });
    //
    // let isBad = 0;
    // if (result) {
    //   if (strikes > 8 && isStudent) {
    //     // BLOCK THE USER
    //     onBlockUser({ isStudent, id });
    //   }
    //   const check = showWarning(strikes, isStudent, result);
    //   console.log(check);
    //   // if (check) {
    //   //   this.setState({
    //   //     isModalVisible: check.isModalVisible,
    //   //     alertMessage: check.alertMessage
    //   //   });
    //   // }
    //   isBad = 1;
    // }
    // const saveData = {
    //   postPostTypeId: postTypeId,
    //   postIsStudent: isStudent,
    //   postActorId: id,
    //   postBody: `${url}/${data.Key}`,
    //   postText: postText,
    //   postIsBad: isBad,
    //  strikeType: result,
    //   strikeIsStudent: user.user.isStudent,
    //   strikeActorId: user.user.id,
    //   isBad
    // };
    // onSubmitPost(saveData);
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { isModalVisible, alertMessage } = this.state;
    const { hideModal, data, postText } = this.props;
    return (
      <ModalContainer>
        <BannerImageModalWrapper>
          <ModalBox
            style={{
              marginTop: '50px',
              width: '100%'
            }}
          >
            <div className="close">
              <CloseButton onClick={hideModal}>x</CloseButton>
            </div>
            <Header>
              <div>
                <Icon src={Images.digii5.icon} />
                Digii
              </div>
              <Points>
                {/* <span>-5</span>
              <Icon src={Images.digii5.DiGiitIconColored} className="small" />
        */}
                {' '}
              </Points>
            </Header>

            <ImageWrapper>
              <FormInput
                onChange={this.handleTextChange}
                placeholder="What do you want to say?"
                onFocus={this.onFocus}
              />
              <ImageBackground>
                <Image src={`${url}/${data.Key}`} />
                <ImageOverlay
                  style={{
                    fontSize:
                      postText.length < 30
                        ? '55px'
                        : postText.length < 80
                          ? '40px'
                          : '35px'
                  }}
                >
                  {postText}
                </ImageOverlay>
              </ImageBackground>
            </ImageWrapper>

            <ButtonWrapper>
              {/*  <Button className="rounded short" onClick={this.saveBanner}>
              SAVE
            </Button> */}
              <Button className="rounded short" onClick={this.saveBanner}>
                POST
              </Button>
            </ButtonWrapper>
          </ModalBox>
        </BannerImageModalWrapper>
        {isModalVisible && (
          <Modal message={alertMessage} hideModal={this.hideModal} />
        )}
      </ModalContainer>
    );
  }
}

BannerImageModal.propTypes = {
  // hideModal: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
  strike: state.strike
});
const mapDispatchToProps = dispatch => ({
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value)),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerImageModal);

// export default BannerImageModal;

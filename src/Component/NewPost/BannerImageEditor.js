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
import { FilterKeyWords, warnings, PostWrapper } from './index';
import PostActions from '../../Redux/PostRedux';
import LoginActions from '../../Redux/LoginRedux';
import StrikeActions from '../../Redux/StrikeRedux';

const strikeCount = 3;

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const CloseButton = styled.span``;
const Message = styled.p``;
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
  constructor() {
    super();
    this.state = {
      text: '',
      imageURL: null,
      isModalVisible: false,
      alertmessage: null
    };
  }

  componentWillMount() {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
  }

  hideAlertModal = () => {
    this.setState({ isModalVisible: false });
  };

  //
  handleTextChange = e => {
    const { onGetStrikesCountOfAUser, user } = this.props;
    const { isStudent, id } = user.user;
    onGetStrikesCountOfAUser({ isStudent, id });
    const { value } = e.target;
    if (value[value.length - 1] === '@' && value[value.length - 1] === ' ') {
    }
    const { strike } = this.props;
    if (value.trim().length > 500) {
      this.setState({
        isModalVisible: true,
        alertMessage: 'Please keep the length within 500 characters'
      });
      // alert('Please keep the length within 500 characters');
      this.setState({ text: value, hasPost: value.trim().length > 0 });
    } else {
      const blacklistedWord = FilterKeyWords(value);
      if (blacklistedWord) {
        if (strike.strikes >= 9) {
          this.setState({ blockUser: true });
          // onBlockUser({ isStudent, id });
          this.setState({
            blockUser: true,
            isModalVisible: true,
            alertMessage: 'You\'ll be blocked'
          });
        } else {
          let index = strike.strikes < 10 && (strike.strikes % strikeCount) + 1;
          index -= 1;
          this.setState({
            isModalVisible: true,
            alertMessage: `${warnings[index]}`
          });
        }
        this.setState({ isBad: true, strikeType: blacklistedWord });
      } else {
        this.setState({
          isModalVisible: false,
          alertMessage: null
        });
      }
      this.setState({ text: value, hasPost: value.trim().length > 0 });
    }
  };

  saveBanner = () => {
    const { blockUser, text } = this.state;
    const {
      data, user, postTypeId, onSubmitPost, onBlockUser
    } = this.props;
    const { isStudent, id } = user;
    // const data = {};
    const saveData = {
      p_pt_id: postTypeId,
      p_isStudent: isStudent,
      p_actor_id: id,
      p_body: `${url}/${data.Key}`,
      p_text: text
    };
    onSubmitPost(saveData);
    if (blockUser) {
      onBlockUser({ isStudent, id });
    }
  };

  render() {
    const { text, isModalVisible, alertMessage } = this.state;
    const { hideModal, data } = this.props;
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
              />
              <ImageBackground>
                <Image src={`${url}/${data.Key}`} />
                <ImageOverlay
                  style={{
                    fontSize:
                      text.length < 30
                        ? '55px'
                        : text.length < 80
                          ? '40px'
                          : '35px'
                  }}
                >
                  {text}
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
          <Modal message={alertMessage} hideModal={this.hideAlertModal} />
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
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser()),
  disableFirstTimePosting: () => dispatch(LoginActions.onDisableFirstTimePosting()),
  onBlockUser: value => dispatch(LoginActions.onBlockUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerImageModal);

// export default BannerImageModal;

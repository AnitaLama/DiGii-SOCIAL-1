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
  Button
} from '../StyledComponents';
import { Colors, Images } from '../../Theme';
import StrikeActions from '../../Redux/StrikeRedux';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const CloseButton = styled.span``;
const Message = styled.p``;
const Image = styled.img`
  // height: auto;
  width: 100%;
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
  font-size: 18px;
  color: ${snow};
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

  handleTextChange = e => {
    const { value } = e.target;

    this.setState({ text: value });
  };

  saveBanner = () => {
    const { text } = this.state;
    const {
      data, user, postTypeId, onSubmitPost
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
  };

  render() {
    const { text } = this.state;
    const { data } = this.props;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '50px'
          }}
        >
          {/* <div className="close">
            <CloseButton onClick={hideModal}>x</CloseButton>
          </div> */}
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
              <ImageOverlay>{text}</ImageOverlay>
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
      </ModalContainer>
    );
  }
}

BannerImageModal.propTypes = {
  // hideModal: PropTypes.func
};
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  onGetStrikesCountOfAUser: value => dispatch(StrikeActions.onGetStrikesCountOfAUser(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerImageModal);

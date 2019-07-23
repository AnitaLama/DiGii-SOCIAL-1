import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { Colors, Images } from '../../Theme';
import { Button, FormInput } from './index';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;
const ModalContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.32);
  height: 100%;
  width: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalBox = styled.div`
  width: 50%;
  min-width: 50%;
  min-height: 200px;
  margin: auto;
  background: ${snow};
  vertical-align: center;
  border-radius: 40px;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
`;
const Banner = styled.div`
  display: flex;
  min-width: 50%;
  flex-direction: column;
  input {
    width: 50%;
    z-index: 10000;
  }
`;
const Icon = styled.img`
  height: 60px;
  &.small {
    height: 30px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CloseButton = styled.span``;
const Message = styled.p``;
const ButtonWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const Points = styled.div`
  margin: auto 0;
  span {
    margin-right: 6px;
  }
`;
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
`;
class Modal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  handleTextChange = e => {
    const { value } = e.target;
    this.setState({ text: e.target.value });
  };

  render() {
    const { text } = this.state;
    const { message, hideModal } = this.props;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '200px'
          }}
        >
          {/*  <div className="close">
            <CloseButton onClick={hideModal}>x</CloseButton>
          </div> */}
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
          <Message>{message}</Message>

          <ButtonWrapper>
            <Button className="rounded short" onClick={hideModal}>
              OK
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

Modal.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func
};

class ImageModal extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      imageURL: null
    };
  }

  componentDidMount() {
    const { canvas } = this;
    const img = this.bannerImg;
    const image = new window.Image();

    const ctx = canvas.getContext('2d');
    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      // console.log(ctx.toDataURL());
    };
    img.crossOrigin = 'anonymous';
  }

  handleTextChange = e => {
    const { value } = e.target;

    this.setState({ text: value });
  };

  saveBanner = () => {
    const c = this.finalBanner;
    html2canvas(c, {
      allowTaint: true,
      useCORS: true,
      taintTest: false,
      /* proxy:"lib/html2canvas_proxy/html2canvasproxy.php", */
      onrendered(canvas) {
        const result = canvas.toDataURL();
        console.log('result>>>>>>>>>>>');
        console.log(result);
      }
    }).then(canvas => {
      console.log(canvas, { allowTaint: true });
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
    });
  };

  render() {
    const { text } = this.state;
    const { data, hideModal } = this.props;
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
            <canvas ref={r => (this.canvas = r)} />
            <ImageBackground ref={r => (this.finalBanner = r)}>
              <Image
                ref={r => (this.bannerImg = r)}
                src={`${url}/${data.Key}`}
              />
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

ImageModal.propTypes = {
  hideModal: PropTypes.func
};

export { Modal, ImageModal };

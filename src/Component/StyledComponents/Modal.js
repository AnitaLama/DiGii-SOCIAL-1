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
  height: 320px;
  width: 320px;
`;
const ImageWrapper = styled.div``;
const ImageBackground = styled.div`
  position: relative;
  width: 320px;
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
          <div className="close">
            <CloseButton onClick={hideModal}>x</CloseButton>
          </div>
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
    let img = new window.Image();
    img.crossOrigin = 'anonymous';
    img = this.banner;

    const c = this.finalBanner;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
  }

  handleTextChange = e => {
    const { value } = e.target;
    // const splittedWords = value.split(' ');
    // const ctx = this.canvas.getContext('2d');
    // ctx.font = '20px Courier';
    // const x = 50;
    // let y = 50;
    // console.log(x, y);
    // splittedWords.map(item => {
    //   ctx.fillText(value, x, y);
    //   y += 20;
    // });
    this.setState({ text: value });

    const c = this.finalBanner;
    const ctx = c.getContext('2d');
    ctx.fillText(value, 50, 50);
  };

  saveBanner = () => {
    const c = this.finalBanner;
    console.log(c);
    // const imgurl = c.toDataURL();
    // console.log(imgurl);
    // setTimeout(() => {}, 5000);
    // const img = this.banner;
    // const ctx = this.canvas.getContext('2d');
    // ctx.drawImage(img, 0, 0);
    // html2canvas(this.finalBanner)
    //   .then(canvas => {
    //     console.log('canvas', canvas);
    //     const url = canvas.toDataURL();
    //     console.log('canvas url', url);
    //     this.setState({ imgURL: url });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  render() {
    const { text } = this.state;
    const { data, hideModal } = this.props;
    return (
      <ModalContainer>
        <ModalBox
          style={{
            marginTop: '100px'
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
              <span>-5</span>
              <Icon src={Images.digii5.DiGiitIconColored} className="small" />
            </Points>
          </Header>
          {/*  <div>
            <FormInput onChange={this.handleTextChange} />
            <Image
              ref={r => (this.banner = r)}
              src={`${url}/${data.Key}`}
              style={{ display: 'none' }}
            />
          </div> */}

          <ImageWrapper>
            here
            <FormInput onChange={this.handleTextChange} />
            <canvas ref={r => (this.finalBanner = r)} />
            <Image
              ref={r => (this.banner = r)}
              src={`${url}/${data.Key}`}
              style={{ display: 'none' }}
            />
          </ImageWrapper>

          <ButtonWrapper>
            <Button className="rounded short" onClick={this.saveBanner}>
              SAVE
            </Button>
            <Button className="rounded short" onClick={hideModal}>
              OK
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

ImageModal.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func
};

export { Modal, ImageModal };

import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
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
// const Image = styled.img`
//   // height: auto;
//   width: 100%;
// `;
// const ImageWrapper = styled.div``;
// const ImageBackground = styled.div`
//   position: relative;
//   width: 100%;
// `;
// const ImageOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 5;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
//   font-size: 18px;
//   color: ${snow};
// `;
class Modal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  handleTextChange = e => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  render() {
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

// class ImageModal extends Component {
//   constructor() {
//     super();
//     this.state = {
//       text: '',
//       imageURL: null
//     };
//   }
//
//   handleTextChange = e => {
//     const { value } = e.target;
//
//     this.setState({ text: value });
//   };
//
//   saveBanner = () => {
//     const { text } = this.state;
//     const {
//       data, user, postTypeId, onSubmitPost
//     } = this.props;
//     const { isStudent, id } = user;
//     // const data = {};
//     const saveData = {
//       p_pt_id: postTypeId,
//       p_isStudent: isStudent,
//       p_actor_id: id,
//       p_body: `${url}/${data.Key}`,
//       p_text: text
//     };
//     onSubmitPost(saveData);
//   };
//
//   render() {
//     const { text } = this.state;
//     const { data } = this.props;
//     return (
//       <ModalContainer>
//         <ModalBox
//           style={{
//             marginTop: '50px'
//           }}
//         >
//           {/* <div className="close">
//             <CloseButton onClick={hideModal}>x</CloseButton>
//           </div> */}
//           <Header>
//             <div>
//               <Icon src={Images.digii5.icon} />
//               Digii
//             </div>
//             <Points>
//               {/* <span>-5</span>
//               <Icon src={Images.digii5.DiGiitIconColored} className="small" />
//         */}
//               {' '}
//             </Points>
//           </Header>
//
//           <ImageWrapper>
//             <FormInput
//               onChange={this.handleTextChange}
//               placeholder="What do you want to say?"
//             />
//             <ImageBackground>
//               <Image src={`${url}/${data.Key}`} />
//               <ImageOverlay>{text}</ImageOverlay>
//             </ImageBackground>
//           </ImageWrapper>
//
//           <ButtonWrapper>
//             {/*  <Button className="rounded short" onClick={this.saveBanner}>
//               SAVE
//             </Button> */}
//             <Button className="rounded short" onClick={this.saveBanner}>
//               POST
//             </Button>
//           </ButtonWrapper>
//         </ModalBox>
//       </ModalContainer>
//     );
//   }
// }
//
// ImageModal.propTypes = {
//   hideModal: PropTypes.func
// };

class DeleteModal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    const { post, hideDeleteModal } = this.props;
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
          <Message>{post}</Message>

          <ButtonWrapper>
            <Button className="rounded short" onClick={hideDeleteModal}>
              OK
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

DeleteModal.propTypes = {
  message: PropTypes.string,
  hideDeleteModal: PropTypes.func
};

export {
  Modal,
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  ButtonWrapper,
  DeleteModal
};

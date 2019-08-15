import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Colors, Images, flexCentering } from '../../Theme';
import { Button, Avatar } from './index';
import { ShowFeed } from '../Functions';
import TutorialActions from '../../Redux/TutorialRedux';

const {
  snow, tint, peach, blue
} = Colors.colors;
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
  ${flexCentering()}
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
  .slick-slider {
    margin: 0 6px;
  }
  .slick-next,
  .slick-prev {
    &::before {
      color: ${blue};
    }
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
  div:first-of-type {
    display: flex;
    align-items: center;
  }
`;
const Message = styled.p``;
const ButtonWrapper = styled.div`
  margin: auto;
  text-align: center;
  button {
    width: 30% !important;
  }
  display: flex;
  justify-content: space-around;
`;

const Points = styled.div`
  margin: auto 0;
  span {
    margin-right: 6px;
  }
`;

const TermsAndConditionBox = styled.div`
  display: flex;
  flex: auto;
  input {
    width: auto;
  }
`;
class Modal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    const { message, hideModal, showCheckButton } = this.props;
    console.log(showCheckButton);
    return (
      <ModalContainer>
        <ModalBox>
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
          {showCheckButton && (
            <TermsAndConditionBox>
              <input type="checkbox" id="CheckBox" name="CheckBox" checked />
              <label htmlFor="CheckBox">
                I understand and agree to the terms and conditions
              </label>
            </TermsAndConditionBox>
          )}
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

class DeleteModal extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  getContent = () => {
    const { post, user } = this.props;
    return <ShowFeed post={post} user={user} />;

    // return <div>POST</div>;
  };

  deletePost = () => {
    const { post, user, onDeletePost } = this.props;
    const { isStudent, id } = user;
    onDeletePost({
      postId: post.postId,
      isStudent,
      id
    });
  };

  render() {
    const { closeDeleteModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Avatar avatar={avatar} height={60} />
              Digii
            </div>
          </Header>
          <div>{this.getContent()}</div>

          <ButtonWrapper>
            <Button
              className="rounded short"
              onClick={this.deletePost}
              primary={tint}
              secondary={peach}
            >
              Delete
            </Button>
            {' '}
            <Button className="rounded short" onClick={closeDeleteModal}>
              Cancel
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

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.post && props.post.postText
    };
  }

  getContent = () => {
    const { user, post } = this.props;
    return (
      <ShowFeed
        post={{ ...post, edit: true }}
        user={user}
        handlePostChange={this.handlePostChange}
      />
    );
    // return <div>POST</div>;
  };

  onEditPost = () => {
    const { text } = this.state;
    const { post, user, onEditPost } = this.props;
    const data = {
      postText: text,
      postId: post.postId
    };
    onEditPost(data);
  };

  handlePostChange = value => {
    this.setState({ text: value });
  };

  render() {
    const { post, closeEditModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Avatar avatar={avatar} height={60} />
              Digii
            </div>
          </Header>
          <div>{this.getContent()}</div>

          <ButtonWrapper>
            <Button
              className="rounded short"
              primary={tint}
              secondary={peach}
              onClick={this.onEditPost}
            >
              Edit
            </Button>
            {' '}
            <Button className="rounded short" onClick={closeEditModal}>
              Cancel
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    );
  }
}

EditModal.propTypes = {
  message: PropTypes.string,
  hideDeleteModal: PropTypes.func
};

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    font-size: 65px;
    opacity: 0;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const QuestionOptions = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 6px;
  svg {
    float: left;
    color: #88cc00;
    font-size: 22px;
  }
`;
class VideoModalContainer extends Component {
  state = {
    playing: false,
    showQuestions: false,
    userAnswer: []
  };

  componentWillMount() {
    const { onTutorialRequest, type } = this.props;
    onTutorialRequest(type);
  }

  componentDidUpdate(prevProps) {
    const { tutorial } = this.props;
    if (tutorial !== prevProps.tutorial) {
      console.log('PLAYER', prevProps, this.props);
      const player = this.fullscreenVideo;
      player.addEventListener('pause', () => {
        this.setState({ playing: false });
      });
      player.addEventListener('playing', () => {
        this.setState({ playing: true });
      });
      player.addEventListener('ended', () => {
        this.setState({ showQuestions: true });
      });
    }
  }

  getVideo = () => {
    const { tutorial } = this.props;
    const { tutorialList } = tutorial;
    const { tu_path } = tutorialList;
    console.log(tutorialList);
    return (
      <video
        src="https://digii-posts.s3-ap-southeast-2.amazonaws.com/Tutorials/insults.mp4"
        autoPlay
        controls
        ref={r => {
          this.fullscreenVideo = r;
        }}
        style={{
          width: '100%'
        }}
        preload="auto"
        onClick={time => {
          console.log('onclick', time);
        }}
        onTimeUpdate={val => {
          // console.log('on time update', val);
        }}
      >
        <track>Hey</track>
      </video>
    );
  };

  changeAnswer = (index, answer) => {
    console.log('answer', answer);
    const { userAnswer } = this.state;
    userAnswer[index] = answer.tutorialQuestionOptionOption;
    this.setState({ userAnswer });
  };

  getQuestions = questions => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const { userAnswer } = this.state;

    return (
      <Slider
        {...settings}
        style={{
          marginLeft: '5px',
          marginRight: '5px'
        }}
      >
        {questions.map((item, index) => {
          const { tq_questions, tutorials_questions_options } = item;
          return (
            <div>
              <div>{tq_questions}</div>
              {tutorials_questions_options.map(option => {
                const check = userAnswer[index] === option.tutorialQuestionOptionOption;
                console.log('check answer', questions.length - 1, index);
                return (
                  <QuestionOptions
                    onClick={() => {
                      this.changeAnswer(index, option);
                    }}
                    style={{
                      background: check ? 'rgba(52, 52, 52, 0.2)' : null
                    }}
                  >
                    <FaCheck
                      style={{
                        visibility: check ? 'visible' : 'hidden'
                      }}
                    />
                    {option.tutorialQuestionOptionOption}
                  </QuestionOptions>
                );
              })}
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                {questions.length - 1 === index && (
                  <button>Check answers</button>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    );
  };

  render() {
    const {
      message, hideModal, showCheckButton, type, tutorial
    } = this.props;

    const { playing, showQuestions } = this.state;
    const { tutorialPath, tutorials_questions } = tutorial.tutorialList;
    console.log('moderationType in the modal componnet', tutorial);
    if (tutorialPath) {
      return (
        <ModalContainer>
          {!showQuestions && (
            <div
              style={{
                marginTop: '0px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div>
                <video
                  src={tutorialPath}
                  autoPlay
                  controls
                  ref={r => {
                    this.fullscreenVideo = r;
                  }}
                  style={{
                    width: '100%'
                  }}
                  preload="auto"
                  onClick={time => {
                    console.log('onclick', time);
                  }}
                  onTimeUpdate={val => {
                    // console.log('on time update', val);
                  }}
                />

                {/*      <VideoOverlay
                  onClick={() => {
                    // console.log('pause the video');
                    // console.log(this.fullscreenVideo.paused);
                    const player = this.fullscreenVideo;
                    player.paused ? player.play() : player.pause();
                  }}
                >
                  <span>{playing ? <FaPause /> : <FaPlay />}</span>
                </VideoOverlay> */}
              </div>
            </div>
          )}
          {showQuestions && (
            <ModalBox>
              {' '}
              {this.getQuestions(tutorials_questions)}
            </ModalBox>
          )}
        </ModalContainer>
      );
    }
    return <div>LOADING</div>;
  }
}
const mapStateToProps = state => ({
  tutorial: state.tutorial
});
const mapDispatchToProps = dispatch => ({
  onTutorialRequest: value => dispatch(TutorialActions.onTutorialRequest(value))
});
const VideoModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoModalContainer);
export {
  Modal,
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  ButtonWrapper,
  DeleteModal,
  EditModal,
  VideoModal
};

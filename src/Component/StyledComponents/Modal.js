import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Colors, Images, flexCentering } from '../../Theme';
import { Button, Avatar, Loader } from './index';
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
    // console.log(showCheckButton);
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

const QuestionOptionsWrapper = styled.div`
  margin: 10px;
`;
const QuestionOptions = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 6px;
  margin: 6px;
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
    userAnswer: [],
    showVideo: true
  };

  componentWillMount() {
    const { onTutorialRequest, type } = this.props;
    onTutorialRequest(type);
    console.log('save user info in tutorial watchers');
  }

  componentDidUpdate(prevProps) {
    const { tutorial } = this.props;

    const player = this.fullscreenVideo;
    if (tutorial.tutorialList && tutorial.tutorialList.tutorialPath && player) {
      player.addEventListener('pause', () => {
        this.setState({ playing: false });
      });
      player.addEventListener('playing', () => {
        this.setState({ playing: true });
      });
      player.addEventListener('ended', () => {
        console.log('endend');
        this.setState({ showQuestions: true, showVideo: false });
      });
    }
  }

  getVideo = () => {
    const { tutorial } = this.props;
    const { tutorialList } = tutorial;
    const { tu_path } = tutorialList;
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
      >
        <track>Hey</track>
      </video>
    );
  };

  changeAnswer = (index, answer) => {
    const { userAnswer } = this.state;
    userAnswer[index] = {
      answer: answer.tutorialQuestionOptionOption,
      isCorrect: answer.tutorialQuestionOptionIsCorrect
    };
    this.setState({ userAnswer });
  };

  checkTheUserAnswers = () => {
    const { hideModal, user } = this.props;
    const { userAnswer } = this.state;
    const hasUnansweredQuestion = userAnswer.includes(undefined);
    if (hasUnansweredQuestion) {
      console.log('answer all questions');
      alert('Please answer all the questions');
      this.setState({ notice: 'Please answer all the questions.' });
    }
    const hasWrongAnswer = userAnswer.find(
      item => item && item.isCorrect === 0
    );
    console.log('wrong answer', hasWrongAnswer);
    if (hasWrongAnswer) {
      alert('You\'ll have to watch the video again');
      this.setState({ showVideo: true, showQuestions: false, userAnswer: [] });
    }
    if (!hasWrongAnswer) {
      console.log('user>>>>>>>>', user);
      // onSaveTutorialWatchersInfo()
      hideModal();
    }
  };

  goback = index => {
    console.log('goback function', this.slider);
    this.slider.slickPrev();
  };

  slickNext = () => {
    this.slider.slickNext();
  };

  getQuestions = questions => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
      autoplaySpeed: 1000
    };
    const { userAnswer } = this.state;

    return (
      <Slider
        {...settings}
        ref={r => {
          this.slider = r;
        }}
        beforeChange={(oldIndex, newIndex) => {
          console.log(
            'after change',
            oldIndex,
            newIndex,
            newIndex > oldIndex,
            typeof newIndex
          );
          if (newIndex > oldIndex) {
            console.log('after change go back');
            this.goback(oldIndex);
          }
        }}
      >
        {questions.map((item, index) => {
          const { tq_questions, tutorials_questions_options } = item;
          const lastSlide = questions.length - 1 === index;
          const answerSelected = userAnswer[index];
          return (
            <div className="anita">
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                {tq_questions}
              </div>
              <div>
                {tutorials_questions_options.map(option => {
                  const check = userAnswer[index]
                    && userAnswer[index].answer
                      === option.tutorialQuestionOptionOption;

                  return (
                    <QuestionOptions
                      onClick={() => {
                        if (!lastSlide) {
                          // this.slickNext();
                        }
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
              </div>
              <div
                style={{
                  textAlign: lastSlide ? 'center' : 'right'
                }}
              >
                {answerSelected && !lastSlide && (
                  <button className="rounded short" onClick={this.slickNext}>
                    NEXT
                  </button>
                )}
                {lastSlide && (
                  <Button
                    className="rounded short"
                    onClick={this.checkTheUserAnswers}
                  >
                    Check answers
                  </Button>
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

    const { playing, showQuestions, showVideo } = this.state;
    const { tutorialPath, tutorials_questions } = tutorial.tutorialList;
    console.log(tutorial, showVideo);
    return (
      <ModalContainer>
        {!showQuestions && showVideo && (
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
              {!tutorialPath && <Loader size={20} />}
              {tutorialPath && (
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
                />
              )}

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
}
const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  onTutorialRequest: value => dispatch(TutorialActions.onTutorialRequest(value)),
  onSaveTutorialWatchersInfo: value => dispatch(TutorialActions.onSaveTutorialWatchersInfo(value))
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

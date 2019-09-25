import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import Slider from 'react-slick';
import TutorialActions from '../../../Redux/TutorialRedux';
import StrikeActions from '../../../Redux/StrikeRedux';
import {
  ModalContainer,
  ModalBox,
  CenteredDiv,
  QuestionOptions,
  VideoOverlay,
  CenteredElementsModalWrapper
} from './index';
import { Button, Loader, WhiteButton } from '../index';

class VideoModalContainer extends Component {
  state = {
    playing: false,
    showQuestions: false,
    userAnswer: [],
    showVideo: true,
    showFinalMessage: false,
    gotAllQuestionsCorrect: false
  };

  componentWillMount() {
    const { onTutorialRequest, type } = this.props;
    onTutorialRequest(type);
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
        this.saveTutorialWatchersInfo();
        this.setState({ showQuestions: true, showVideo: false });
      });
    }
  }

  changeAnswer = (index, answer) => {
    const { userAnswer } = this.state;
    userAnswer[index] = {
      answer: answer.tutorialQuestionOptionOption,
      isCorrect: answer.tutorialQuestionOptionIsCorrect
    };
    this.setState({ userAnswer });
  };

  checkTheUserAnswers = () => {
    const { userAnswer } = this.state;
    const hasUnansweredQuestion = userAnswer.includes(undefined);
    if (hasUnansweredQuestion) {
      // alert('Please answer all the questions');
      this.setState({ notice: 'Please answer all the questions.' });
    }
    const hasWrongAnswer = userAnswer.find(
      item => item && item.isCorrect === 0
    );

    this.setState({
      showFinalMessage: true,
      userAnswer: [],
      gotAllQuestionsCorrect: !hasWrongAnswer,
      showQuestions: false
    });
  };

  saveTutorialWatchersInfo = () => {
    const { userInfoSaved } = this.state;
    this.setState({ userInfoSaved: true });
    const { user, tutorial, onSaveTutorialWatchersInfo } = this.props;
    const { id } = user;
    const { tutorialId } = tutorial.tutorialList;
    const watchersData = {
      tutorialWatcherTutorialId: tutorialId,
      tutorialWatcherStudentId: id
    };
    if (!userInfoSaved) {
      onSaveTutorialWatchersInfo(watchersData);
    }
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
      >
        {questions.map((item, index) => {
          const { tutorialQuestions, tutorials_questions_options } = item;
          const lastSlide = questions.length - 1 === index;
          const answerSelected = userAnswer[index];
          return (
            <div key={item.tutorialQuestions}>
              <CenteredDiv>{tutorialQuestions}</CenteredDiv>
              <div>
                {tutorials_questions_options.map(option => {
                  const check = userAnswer[index]
                    && userAnswer[index].answer
                      === option.tutorialQuestionOptionOption;

                  return (
                    <QuestionOptions
                      key={option.tutorialQuestionOptionOption}
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
              <CenteredDiv
                style={{
                  textAlign: lastSlide ? 'center' : 'right'
                }}
              >
                {answerSelected && !lastSlide && (
                  <button
                    type="submit"
                    className="nextButton"
                    onClick={this.slickNext}
                  >
                    NEXT »
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
              </CenteredDiv>
            </div>
          );
        })}
      </Slider>
    );
  };

  showFinalMessage = () => {
    const { gotAllQuestionsCorrect } = this.state;
    if (gotAllQuestionsCorrect) {
      return (
        <div>
          {
            'You\'ve answered all the questions correctly. You can return back to chat now.'
          }
        </div>
      );
    }
  };

  watchVideoAgain = () => {
    this.setState({ showVideo: true });
  };

  resetStrikes = () => {
    const { resetStrikes, user, hideModal } = this.props;
    const { isStudent, id } = user;
    hideModal();
    resetStrikes({ isStudent, id });
  };

  render() {
    const { hideModal, tutorial } = this.props;
    const {
      playing,
      showQuestions,
      showVideo,
      showFinalMessage,
      gotAllQuestionsCorrect
    } = this.state;
    const { tutorialPath, tutorials_questions } = tutorial.tutorialList;
    return (
      <ModalContainer>
        {!showQuestions && showVideo && (
          <div
            style={{
              marginTop: '0px',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                position: 'relative'
              }}
            >
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
              {/* <VideoOverlay
                onClick={() => {
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
        {showFinalMessage && !showVideo && !showQuestions && (
          <ModalBox className="centeredModal">
            {!!gotAllQuestionsCorrect && (
              <CenteredElementsModalWrapper className="test">
                <span>
                  {`  You've answered all the questions correctly. You can return
                  now`}
                </span>
                <Button className="short" onClick={this.resetStrikes}>
                  OK
                </Button>
              </CenteredElementsModalWrapper>
            )}
            {!gotAllQuestionsCorrect && (
              <CenteredElementsModalWrapper className="test">
                <span>
                  {
                    'You didn\'t answer all the questions correctly. You\'ll have to watch the video again.'
                  }
                </span>
                <Button className="short" onClick={this.watchVideoAgain}>
                  Watch video again
                </Button>
              </CenteredElementsModalWrapper>
            )}
          </ModalBox>
        )}
      </ModalContainer>
    );
  }
}
VideoModalContainer.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func,
  showCheckButton: PropTypes.bool,
  type: PropTypes.string,
  tutorial: PropTypes.object,
  onSaveTutorialWatchersInfo: PropTypes.func,
  user: PropTypes.object,
  onTutorialRequest: PropTypes.func
};

const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user,
  strike: state.strike.strikes
});
const mapDispatchToProps = dispatch => ({
  onTutorialRequest: value => dispatch(TutorialActions.onTutorialRequest(value)),
  onSaveTutorialWatchersInfo: value => dispatch(TutorialActions.onSaveTutorialWatchersInfo(value)),
  resetStrikes: value => dispatch(StrikeActions.resetStrikes(value))
});

const VideoModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoModalContainer);

export default VideoModal;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormInput,
  Modal,
  StrikesModal,
  VideoModal
} from '../StyledComponents';

class InputBox extends Component {
  state = {
    showBasicModal: false,
    alertMessage: null,
    showStrikeModal: false,
    showVideoModal: false,
    points: null,
    videoType: null
  };

  componentWillReceiveProps(nextProp) {
    const { post, comment } = nextProp;
    const { showStrikeModal } = post;
    if (showStrikeModal && showStrikeModal !== this.state.showStrikeModal) {
      console.log('show post', showStrikeModal, this.state.showStrikeModal);
      this.setState({ showStrikeModal: true });
    }

    if (
      comment.showStrikeModal
      && comment.showStrikeModal !== this.state.showStrikeModal
    ) {
      console.log(
        'show commet',
        comment.showStrikeModal,
        this.state.showStrikeModal
      );
      this.setState({ showStrikeModal: true });
    }
  }
  // componentDidUpdate(prevProps) {
  //   const { post, comment } = this.props;
  //   const { showStrikeModal } = post;
  //   if (showStrikeModal && showStrikeModal !== this.state.showStrikeModal) {
  //   console.log('show post', showStrikeModal, this.state.showStrikeModal);
  //   this.setState({ showStrikeModal: true });
  //   }

  //   if (comment.showStrikeModal && comment.showStrikeModal !== this.state.showStrikeModal) {
  //   console.log('show commet', comment.showStrikeModal, this.state.showStrikeModal);
  //   this.setState({ showStrikeModal: true });
  //   }
  // }

  hideStrikesModal = () => {
    console.log('hide the strikes modal now');
    this.setState({ showStrikeModal: false });
  };

  hideBasicModal = () => {
    this.setState({ showBasicModal: false });
  };

  onFocus = () => {
    const { user } = this.props;
    const { isFirstTimePosting } = user;
    if (isFirstTimePosting) {
      this.setState({
        showBasicModal: true,
        alertMessage: 'Congratulations!!! It\'s your first time posting.',
        points: '+5'
      });
    }
  };

  onChange = e => {
    const { value } = e.target;
    const { onChange } = this.props;
    const { textInput } = this;
    onChange(e);
    if (value.length >= 250) {
      this.setState({
        showBasicModal: true,
        alertMessage: 'Please limit the number of characters to 250'
      });
      textInput.blur();
    }
  };

  showVideo = type => {
    this.setState({ showVideoModal: true, videoType: type });
  };

  hideVideoModal = () => {
    this.setState({ showVideoModal: false });
  };

  render() {
    const {
      showBasicModal,
      alertMessage,
      showStrikeModal,
      showVideoModal
    } = this.state;

    return (
      <div>
        <FormInput
          ref={r => {
            this.textInput = r;
          }}
          {...this.props}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          className="textBox"
        />
        {showBasicModal && (
          <Modal message={alertMessage} hideModal={this.hideBasicModal} />
        )}
        {!!showStrikeModal && (
          <StrikesModal
            hideModal={this.hideStrikesModal}
            showVideo={this.showVideo}
            showCheckButton
          />
        )}
        {showVideoModal && (
          <VideoModal hideModal={this.hideVideoModal} {...this.state} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  post: state.post,
  comment: state.comment
});
export default connect(mapStateToProps)(InputBox);

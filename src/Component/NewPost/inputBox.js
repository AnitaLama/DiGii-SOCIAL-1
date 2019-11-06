import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormTextArea,
  Modal,
  StrikesModal,
  VideoModal
} from '../StyledComponents';

class InputBox extends Component {
  state = {
    showBasicModal: false,
    alertMessage: null,
    showStrikeModal: false,
    showVideoModal: false
  };

  componentDidUpdate(prevProps) {
    const { post } = this.props;
    const { showStrikeModal } = post;
    if (showStrikeModal && showStrikeModal !== this.state.showStrikeModal) {
      this.setState({ showStrikeModal: true });
    }
  }

  hideStrikesModal = () => {
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
        alertMessage: 'congratulations first time'
      });
    }
  };

  onChange = e => {
    const { value } = e.target;
    const { onChange } = this.props;
    onChange(e);
    if (value.length >= 250) {
      this.setState({
        showBasicModal: true,
        alertMessage: 'more than 250'
      });
    }
  };

  showVideo = () => {
    this.setState({ showVideoModal: true });
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
        <FormTextArea
          {...this.props}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
        {showBasicModal && (
          <Modal message={alertMessage} hideModal={this.hideBasicModal} />
        )}
        {showStrikeModal && (
          <StrikesModal
            hideModal={this.hideStrikesModal}
            showVideo={this.showVideo}
            showCheckButton
          />
        )}
        {showVideoModal && <VideoModal hideModal={this.showVideoModal} />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  post: state.post
});
export default connect(mapStateToProps)(InputBox);

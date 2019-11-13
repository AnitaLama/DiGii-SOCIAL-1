import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ModalContainer,
  ModalBox,
  Header,
  ButtonWrapper,
  Button,
  Avatar
} from '..';
import { FaCircle } from 'react-icons/fa';
import { Colors } from '../../../Theme';
import {
  ImageWrapper,
  ImageContainer,
  BannerContainer,
  BannerText,
  PostContent,
  PollWrapper,
  PostText
} from './style';

const { tint, peach } = Colors.colors;

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.post && props.post.postText
    };
  }

  getContent = () => {
    const { post } = this.props;
    const data = post;
    const {
      postText,
      postBanner,
      postBannerText,
      postGif,
      postImage,
      poll
    } = data;
    return (
      <PostContent>
        {postText && <PostText>{postText}</PostText>}
        {postBanner && (
          <ImageWrapper>
            <BannerContainer background={postBanner}>
              <BannerText>{postBannerText}</BannerText>
            </BannerContainer>
          </ImageWrapper>
        )}
        {postGif && (
          <ImageWrapper>
            <ImageContainer src={postGif} />
          </ImageWrapper>
        )}
        {postImage && (
          <ImageWrapper>
            <ImageContainer src={postImage} />
          </ImageWrapper>
        )}
        {poll && (
          <div>
            <PostText className="captions">{poll.pollOptionQuestion}</PostText>
            {poll.poll_options
              && poll.poll_options.map((option, i) => {
                const { poll_responses } = option;

                // const selectedAnswer = hasUserVoted
                // && hasUserVoted.pollResponsePollOptionId === option.pollOptionId;
                return (
                  <PollWrapper
                    // onClick={() => {
                    //   this.selectPollAnswer(option, hasUserVoted);
                    // }}
                    key={`${option}${i}`}
                  >
                    <div>
                      <FaCircle />
                      {option.pollOptionImagePath && (
                        <img
                          src={`${option.pollOptionImagePath}`}
                          alt={`${poll.pollOptionQuestion}-option${i}`}
                        />
                      )}
                      {option.pollOptionText}
                    </div>
                    <span>
                      {poll_responses.slice(0, 3).map(item => {
                        const avatar = item.pollResponseIsStudent
                          ? item.student.avatar
                          : item.user.avatar;
                        return (
                          <Avatar
                            key={`poll_responses-${item}`}
                            avatar={avatar}
                            height={17.75}
                          />
                        );
                      })}
                      {poll_responses.length > 3 && poll_responses.length - 3}
                    </span>
                  </PollWrapper>
                );
              })}
          </div>
        )}
      </PostContent>
    );
    // return <div>POST</div>;
  };

  onEditPost = () => {
    const { text } = this.state;
    const { post, onEditPost } = this.props;
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
    const { closeEditModal, user } = this.props;
    const { avatar } = user;
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Avatar avatar={avatar} height={60} />
              DiGii
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
{" "}
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
  post: PropTypes.object,
  user: PropTypes.object,
  onEditPost: PropTypes.func,
  closeEditModal: PropTypes.func
};

export default EditModal;

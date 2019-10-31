import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FormTextArea, Avatar } from '../StyledComponents';
import { Colors, fontSize, flexCentering } from '../../Theme';

const PostContainer = styled.div`
  word-break: break-word;
`;

const ShowFeedWrapper = styled.div`
  width: 100%;
`;

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const PollWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    svg {
      border: 0;
      margin-right: 4px;
    }
    color: ${Colors.colors.pencil};
    ${fontSize(12)};
  }
  svg {
    color: white;
    border: 1px solid #707070;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    font-size: 8px;
  }
  img {
    height: 22px;
    width: 22px;
    border-radius: 22px;
    margin-right: 10px;
  }
`;
const ImageContainer = styled.div`
  text-align: center;
`;
const Gif = styled.img`
  width: 100%;
  max-width: 250px;
`;

const Banner = styled.img`
  width: 100%;
  @media (max-width: 960px) {
    width: 100%;
    max-width: 250px;
  }
`;
const Video = styled.video`
  width: 100%;
`;
const BannerWrapper = styled.div`
  // background: ${props => `url(${props.image})`};
  width: 100%;
  position:relative;
  div{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;padding: 20px;
    text-align:center;
    ${flexCentering()};
    color: ${snow};
    ${fontSize(20)}
  }
`;

class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props && props.post && props.post.postText
    };
  }

  handleTextChange = e => {
    const { value } = e.target;
    const { handlePostChange } = this.props;
    this.setState({ text: value });
    handlePostChange(value);
  };

  getMessageBoardFeed = () => {
    const { text } = this.state;
    const { post, user, selectPollAnswer } = this.props;
    const {
      postBody, post_type, postText, edit
    } = post;
    const type = post_type && post_type.postTypeTitle;

    if (edit) {
      switch (type) {
        case 'text':
          return <FormTextArea value={text} onChange={this.handleTextChange} />;
        case 'gif':
          return (
            <div>
              <FormTextArea
                value={text}
                className="captions"
                onChange={this.handleTextChange}
              />
              <ImageContainer>
                <Gif src={`${postBody}`} />
              </ImageContainer>
            </div>
          );
        case 'photo/video':
          const { postIsImage } = post;
          if (postIsImage) {
            return (
              <div>
                <FormTextArea
                  className="captions"
                  value={text}
                  onChange={this.handleTextChange}
                />
                <ImageContainer>
                  <Gif src={`${postBody}`} />
                </ImageContainer>
              </div>
            );
          }
          return (
            <div>
              <FormTextArea
                className="captions"
                value={text}
                onChange={this.handleTextChange}
              />
              <ImageContainer>
                {' '}
                <Video src={`${postBody}`} controls />
              </ImageContainer>
            </div>
          );
        case 'poll':
          const { poll } = post;
          const { pollOptionQuestion, poll_options } = poll;

          let { isStudent, id } = user;
          isStudent = isStudent ? 1 : 0;
          return (
            <div>
              <div className="captions">{pollOptionQuestion}</div>
              {poll_options.map((option, i) => {
                const { poll_responses } = option;
                const hasUserVoted = poll_responses.find(
                  item => item.pollResponseIsStudent === isStudent
                    && item.pollResponseCommentatorId === id
                );
                const selectedAnswer = hasUserVoted
                  && hasUserVoted.pollResponsePollOptionId === option.pollOptionId;

                return (
                  <PollWrapper
                    // onClick={() => {
                    //   this.props.selectPollAnswer(option, hasUserVoted);
                    // }}
                    key={`${option}${i}`}
                  >
                    <div>
                      <FaCircle
                        style={{ color: selectedAnswer ? '#707070' : 'white' }}
                      />
                      {option.pollOptionImagePath && (
                        <img
                          src={`${url}/${option.pollOptionImagePath}`}
                          alt={`${pollOptionQuestion}-option${i}`}
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
          );
        case 'banner':
          return (
            <div>
              <FormTextArea
                className="captions"
                value={text}
                onChange={this.handleTextChange}
              />
              <BannerWrapper>
                <Banner src={postBody} />
                <div>
                  {' '}
                  <span
                    style={{
                      fontSize:
                        postText.length < 30
                          ? '1.5rem'
                          : postText.length < 80
                            ? '0.95rem'
                            : '0.8rem',
                      lineHeight:
                        postText.length < 30
                          ? '1.5rem'
                          : postText.length < 80
                            ? '0.95rem'
                            : '0.8rem',
                      wordWrap: 'break-word'
                    }}
                  >
                    {' '}
                    {text}
                  </span>
                </div>
              </BannerWrapper>
            </div>
          );
        case 'tag':
          // const { notificationIsStudent, student, user } = notifications;
          // console.log(notifications);
          // <div>{notificationIsStudent ? student.studentUsername : user.userName}</div>
          return (
            <FormTextArea
              className="captions"
              value={text}
              onChange={this.handleTextChange}
            />
          );
        case 'feeling':
          return <div>{postBody}</div>;
        default:
          return (
            <FormTextArea
              className="captions"
              value={text}
              onChange={this.handleTextChange}
            />
          );
      }
    }
    switch (type) {
      case 'text':
        return <PostContainer>{postText}</PostContainer>;
      case 'gif':
        return (
          <div>
            <PostContainer className="captions">{postText}</PostContainer>
            <ImageContainer>
              {' '}
              <Gif src={`${postBody}`} />
            </ImageContainer>
          </div>
        );
      case 'photo/video':
        const { postIsImage } = post;
        if (postIsImage) {
          return (
            <div>
              <PostContainer className="captions">{postText}</PostContainer>
              <ImageContainer>
                {' '}
                <Gif src={`${postBody}`} />
              </ImageContainer>
            </div>
          );
        }
        return (
          <div>
            <PostContainer className="captions">{postText}</PostContainer>
            <ImageContainer>
              {' '}
              <Video src={`${postBody}`} controls />
            </ImageContainer>
          </div>
        );
      case 'poll':
        const { poll } = post;
        const { pollOptionQuestion, poll_options } = poll;

        let { isStudent, id } = user;
        isStudent = isStudent ? 1 : 0;
        return (
          <div>
            <PostContainer className="captions">
              {pollOptionQuestion}
            </PostContainer>
            {poll_options.map((option, i) => {
              const { poll_responses } = option;
              const hasUserVoted = poll_responses.find(
                item => item.pollResponseIsStudent === isStudent
                  && item.pollResponseCommentatorId === id
              );
              const selectedAnswer = hasUserVoted
                && hasUserVoted.pollResponsePollOptionId === option.pollOptionId;

              return (
                <PollWrapper
                  onClick={() => {
                    selectPollAnswer(post, option, hasUserVoted);
                  }}
                  key={`${option}${i}`}
                >
                  <div>
                    <FaCircle
                      style={{ color: selectedAnswer ? '#707070' : 'white' }}
                    />
                    {option.pollOptionImagePath && (
                      <img
                        src={`${url}/${option.pollOptionImagePath}`}
                        alt={`${pollOptionQuestion}-option${i}`}
                      />
                    )}
                    {option.pollOptionText}
                  </div>
                  <span>
                    {poll_responses.slice(0, 3).map((item, i) => {
                      const avatar = item.pollResponseIsStudent
                        ? item.student.avatar
                        : item.user.avatar;
                      return (
                        <Avatar
                          key={`pollResponse-${item}-${i}`}
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
        );
      case 'banner':
        return (
          <BannerWrapper>
            <Banner src={postBody} />
            <div>
              {' '}
              <span
                style={{
                  fontSize:
                    postText.length < 30
                      ? '1.5rem'
                      : postText.length < 80
                        ? '0.95rem'
                        : '0.8rem',
                  lineHeight:
                    postText.length < 30
                      ? '1.5rem'
                      : postText.length < 80
                        ? '0.95rem'
                        : '0.8rem',
                  wordWrap: 'break-word'
                }}
              >
                {' '}
                {postText}
              </span>
            </div>
          </BannerWrapper>
        );
      case 'tag':
        // const { notificationIsStudent, student, user } = notifications;
        // console.log(notifications);
        // <div>{notificationIsStudent ? student.studentUsername : user.userName}</div>
        return <PostContainer>{postText}</PostContainer>;
      case 'feeling':
        return <PostContainer>{postBody}</PostContainer>;
      default:
        return <PostContainer>{postText}</PostContainer>;
    }
  };

  render() {
    return <ShowFeedWrapper>{this.getMessageBoardFeed()}</ShowFeedWrapper>;
  }
}

ShowData.propTypes = {
  post: PropTypes.object,
  handlePostChange: PropTypes.func
};
export default ShowData;

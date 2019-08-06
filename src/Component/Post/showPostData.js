import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FaCircle } from 'react-icons/fa';
import { FormTextArea, Avatar } from '../StyledComponents';
import {
  Colors, fontSize, grid, boxShadow, flexCentering
} from '../../Theme';

const url = 'https://digii-posts.s3-ap-southeast-2.amazonaws.com';

const { snow } = Colors.colors;

const PostWrapper = styled.div`
  background: ${snow};
  margin: 28px 0;
  padding: 24px;
  border-radius: 40px;
  ${boxShadow()};
  ${grid(2, '1fr')};
`;
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

const Gif = styled.img`
  width: 100%;
`;

const Banner = styled.img`
  width: 100%;
  @media (max-width: 960px) {
    width: 100%;
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
      text: props && props.post && props.post.p_text
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
    const { post, user } = this.props;
    const {
      p_body, post_type, p_text, edit
    } = post;
    const type = post_type && post_type.pt_title;

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
              <Gif src={`${p_body}`} />
            </div>
          );
        case 'photo/video':
          const { p_is_image } = post;
          if (p_is_image) {
            return (
              <div>
                <FormTextArea
                  className="captions"
                  value={text}
                  onChange={this.handleTextChange}
                />
                <Gif src={`${p_body}`} />
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
              <Video src={`${p_body}`} controls />
            </div>
          );
        case 'poll':
          const { poll } = post;
          const { po_question, poll_options } = poll;

          let { isStudent, id } = user;
          isStudent = isStudent ? 1 : 0;
          return (
            <div>
              <div className="captions">{po_question}</div>
              {poll_options.map((option, i) => {
                const { poll_responses } = option;
                const hasUserVoted = poll_responses.find(
                  item => item.pr_is_student === isStudent
                    && item.pr_commentator_id === id
                );
                const selectedAnswer = hasUserVoted && hasUserVoted.pr_popt_id === option.popt_id;

                return (
                  <PollWrapper
                    onClick={() => {
                      this.selectPollAnswer(option, hasUserVoted);
                    }}
                    key={`${option}${i}`}
                  >
                    <div>
                      <FaCircle
                        style={{ color: selectedAnswer ? '#707070' : 'white' }}
                      />
                      {option.popt_image_path && (
                        <img
                          src={`${url}/${option.popt_image_path}`}
                          alt={`${po_question}-option${i}`}
                        />
                      )}
                      {option.popt_text}
                    </div>
                    <span>
                      {poll_responses.slice(0, 3).map(item => {
                        let avatar;

                        avatar = item.pr_is_student
                          ? item.student.avatar
                          : item.user.avatar;
                        return (
                          <Avatar
                            key={avatar.a_id}
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
                <Banner src={p_body} />
                <div>
                  {' '}
                  <span
                    style={{
                      fontSize:
                        text.length < 30
                          ? '45px'
                          : text.length < 80
                            ? '30px'
                            : '25px',
                      lineHeight:
                        text.length < 30
                          ? '40px'
                          : text.length < 80
                            ? '30px'
                            : '25px'
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
          const { notifications } = post;

          // const { n_is_student, student, user } = notifications;
          // console.log(notifications);
          // <div>{n_is_student ? student.st_username : user.u_name}</div>
          return (
            <FormTextArea
              className="captions"
              value={text}
              onChange={this.handleTextChange}
            />
          );

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
        return <div>{p_text}</div>;
      case 'gif':
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Gif src={`${p_body}`} />
          </div>
        );
      case 'photo/video':
        const { p_is_image } = post;
        if (p_is_image) {
          return (
            <div>
              <div className="captions">{p_text}</div>
              <Gif src={`${p_body}`} />
            </div>
          );
        }
        return (
          <div>
            <div className="captions">{p_text}</div>
            <Video src={`${p_body}`} controls />
          </div>
        );
      case 'poll':
        const { poll } = post;
        const { po_question, poll_options } = poll;

        let { isStudent, id } = user;
        isStudent = isStudent ? 1 : 0;
        return (
          <div>
            <div className="captions">{po_question}</div>
            {poll_options.map((option, i) => {
              const { poll_responses } = option;
              const hasUserVoted = poll_responses.find(
                item => item.pr_is_student === isStudent
                  && item.pr_commentator_id === id
              );
              const selectedAnswer = hasUserVoted && hasUserVoted.pr_popt_id === option.popt_id;

              return (
                <PollWrapper
                  onClick={() => {
                    this.selectPollAnswer(option, hasUserVoted);
                  }}
                  key={`${option}${i}`}
                >
                  <div>
                    <FaCircle
                      style={{ color: selectedAnswer ? '#707070' : 'white' }}
                    />
                    {option.popt_image_path && (
                      <img
                        src={`${url}/${option.popt_image_path}`}
                        alt={`${po_question}-option${i}`}
                      />
                    )}
                    {option.popt_text}
                  </div>
                  <span>
                    {poll_responses.slice(0, 3).map(item => {
                      let avatar;

                      avatar = item.pr_is_student
                        ? item.student.avatar
                        : item.user.avatar;
                      return (
                        <Avatar
                          key={avatar.a_id}
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
            <Banner src={p_body} />
            <div>
              {' '}
              <span
                style={{
                  fontSize:
                    p_text.length < 30
                      ? '45px'
                      : p_text.length < 80
                        ? '30px'
                        : '25px',
                  lineHeight:
                    p_text.length < 30
                      ? '40px'
                      : p_text.length < 80
                        ? '30px'
                        : '25px'
                }}
              >
                {' '}
                {p_text}
              </span>
            </div>
          </BannerWrapper>
        );
      case 'tag':
        const { notifications } = post;

        // const { n_is_student, student, user } = notifications;
        // console.log(notifications);
        // <div>{n_is_student ? student.st_username : user.u_name}</div>
        return <div>{p_text}</div>;
      default:
        return <div>{p_text}</div>;
    }
  };

  render() {
    return <div>{this.getMessageBoardFeed()}</div>;
  }
}

export default ShowData;
